<template>
  <form @submit.prevent="submitForm" class="behavior-form">
    <!-- Stage Selection -->
    <div class="form-group">
      <label>스테이지 <span class="required">*</span></label>
      <div class="selection-control">
        <div class="selection-display">
          <span v-if="selectedStageName">{{ selectedStageName }}</span>
          <span v-else class="placeholder">오른쪽 버튼을 눌러 스테이지를 선택하세요</span>
        </div>
        <button type="button" @click="showStageModal = true" class="select-btn">스테이지 선택</button>
      </div>
    </div>
    
    <!-- Team Composition -->
    <div class="form-group team-composition-group">
      <label>캐릭터 조합 ({{ form.characters.length }} / 10) <span class="required">*</span></label>
      <div class="selection-control">
          <div class="selection-display tags-display">
            <span v-if="form.characters.length === 0" class="placeholder">오른쪽 버튼을 눌러 캐릭터를 선택하세요</span>
            <span v-for="char in form.characters" :key="char.id" class="tag">
                {{ char.name }}
            </span>
          </div>
        <button type="button" @click="showCharacterModal = true" class="select-btn">캐릭터 선택</button>
      </div>
    </div>

    <div class="form-grid">
      <!-- Result -->
      <div class="form-group">
        <label for="result">결과</label>
        <select id="result" v-model="form.result">
          <option value="clear">클리어</option>
          <option value="fail">실패</option>
        </select>
      </div>

      <!-- Attempts -->
      <div class="form-group">
        <label for="attempts">시도 횟수</label>
        <input type="number" id="attempts" v-model.number="form.attempts" min="1">
      </div>
      
      <!-- Clear Time -->
      <div class="form-group">
        <label for="clear_time">클리어 시간 (초)</label>
        <input type="number" id="clear_time" v-model.number="form.clear_time" min="0" :disabled="form.result !== 'clear'" placeholder="클리어 시 입력">
      </div>
    </div>

    <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
          <span v-else>조합 추천 등록</span>
        </button>
    </div>
  </form>

  <StageSelectionModal :show="showStageModal" @close="showStageModal = false" @select="handleStageSelect" />
  <CharacterSelectionModal :show="showCharacterModal" :initial-selection="form.characters" @close="showCharacterModal = false" @select="handleCharacterSelect"/>
</template>

<script>
import StageSelectionModal from '@/components/common/StageSelectionModal.vue';
import CharacterSelectionModal from '@/components/common/CharacterSelectionModal.vue';

export default {
    components: { StageSelectionModal, CharacterSelectionModal },
    data() {
        return {
            isSubmitting: false,
            showStageModal: false,
            showCharacterModal: false,
            selectedStageName: '',
            form: {
                stage_id: '',
                user_id: '',
                characters: [],
                team_hash: '',
                result: 'clear',
                clear_time: 0,
                attempts: 1,
            }
        }
    },
    watch: {
        'form.result'(newVal) {
          if (newVal !== 'clear') {
            this.form.clear_time = 0;
          }
        }
    },
    created() {
        this.form.user_id = localStorage.getItem('username') || 'anonymous';
    },
    methods: {
        handleStageSelect(stage) {
            this.form.stage_id = stage.id;
            this.selectedStageName = `${stage.name} (${stage.difficulty})`;
        },
        handleCharacterSelect(selectedCharacters) {
            this.form.characters = selectedCharacters;
        },
        submitForm() {
            if (!this.form.stage_id) {
                alert('스테이지를 선택해주세요.');
                return;
            }
            if (this.form.characters.length === 0) {
              alert('최소 1명 이상의 캐릭터를 선택해주세요.');
              return;
            }
            
            const characterIds = this.form.characters.map(c => c.id);
            const teamHash = [...characterIds].sort((a, b) => a - b).join('-');
            
            const formDataForApi = {
                stage_id: this.form.stage_id,
                user_id: this.form.user_id,
                character_ids: characterIds,
                team_hash: teamHash,
                result: this.form.result,
                clear_time: this.form.clear_time,
                attempts: this.form.attempts,
            };
            
            this.isSubmitting = true;
            this.$emit('submit', formDataForApi);
            
            setTimeout(() => {
                this.isSubmitting = false;
            }, 3000);
        }
    }
}
</script> 