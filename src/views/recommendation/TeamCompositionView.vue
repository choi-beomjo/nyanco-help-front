<template>
  <div class="recommendation-container team-composition-theme">
    <div class="recommendation-header">
      <h1 class="recommendation-title">
        <i class="fas fa-users"></i> 조합 추천 등록
      </h1>
    </div>
    
    <p class="form-description">
      특정 스테이지에서 사용한 캐릭터 조합과 결과를 기록하여 다른 유저에게 추천 데이터를 제공해주세요.
    </p>

    <TeamCompositionForm @submit="handleFormSubmit" />
  </div>
</template>

<script>
import TeamCompositionForm from '@/components/recommendation/TeamCompositionForm.vue';
import axios from '@/services/axios';
import '@/assets/css/Recommendation.css';

export default {
  name: 'TeamCompositionView',
  components: {
    TeamCompositionForm,
  },
  methods: {
    async handleFormSubmit(formData) {
      try {
        await axios.post('/api/recommend/team-composition', formData);
        alert('조합 정보가 성공적으로 등록되었습니다!');
        window.location.reload();
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
          console.error('Server Response:', error.response.data);
          alert(`등록에 실패했습니다. 개발자 콘솔(F12)에서 상세 오류를 확인해주세요. (Status: ${error.response.status})`);
        } else {
          alert(`등록에 실패했습니다: ${error.message}`);
        }
      }
    }
  }
}
</script>

<style scoped>
.team-composition-theme .recommendation-title i {
  color: #ff9800; /* Orange theme */
}
.team-composition-theme .form-description {
  background-color: #fff3e0;
  color: #f57c00;
}
.team-composition-theme .submit-btn {
    background: linear-gradient(135deg, #ffb74d, #ff9800);
}
.team-composition-theme .submit-btn:disabled {
    background: #ffe0b2;
}
</style> 