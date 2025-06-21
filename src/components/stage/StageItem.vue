<template>
  <div class="character-card stage-card">
    <div class="character-card-info">
      <i class="fas fa-map-signs stage-icon"></i>
      <h2 class="stage-name">{{ stage.name }}</h2>
      <div class="stage-basic-info">
        <span><b>HP:</b> {{ stage.stage_hp }}</span>
        <span><b>Difficulty:</b> {{ stage.difficulty }}</span>
      </div>
    </div>

    <div class="character-card-actions">
      <button class="info-btn" @click="toggleDetail">
        <i :class="showDetail ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        적 정보 보기
      </button>
      <button class="edit-btn" @click="$emit('edit', stage.name)">
        <i class="fas fa-edit"></i> 수정
      </button>
    </div>

    <transition name="fade">
      <div v-if="showDetail" class="character-detail stage-enemy-detail">
        <table class="stage-enemies-table">
          <thead>
            <tr>
              <th>Enemy ID</th>
              <th>Spawn Count</th>
              <th>First Spawn</th>
              <th>Respawn 1</th>
              <th>Respawn 2</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(enemy, index) in stage.enemies" :key="index">
              <td>{{ enemy.enemy_id }}</td>
              <td>{{ enemy.spawn_count }}</td>
              <td>{{ enemy.first_spawn }}</td>
              <td>{{ enemy.respawn1 }}</td>
              <td>{{ enemy.respawn2 }}</td>
              <td>{{ enemy.health }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    stage: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showDetail = ref(false);
    const toggleDetail = () => {
      showDetail.value = !showDetail.value;
    };
    return {
      showDetail,
      toggleDetail,
    };
  },
};
</script> 