<template>
  <div class="recommendation-container">
    <div class="recommendation-header">
      <h1 class="recommendation-title">
        <i class="fas fa-thumbs-up"></i> 행동 기록 등록
      </h1>
    </div>
    
    <p class="form-description">
      유저의 스테이지 클리어, 실패, 팀 선택 등 다양한 행동을 기록하여 추천 시스템의 기반 데이터를 마련합니다.
    </p>

    <UserBehaviorForm @submit="handleFormSubmit" />
  </div>
</template>

<script>
import UserBehaviorForm from '@/components/recommendation/UserBehaviorForm.vue';
import axios from '@/services/axios';
import '@/assets/css/Recommendation.css';

export default {
  name: 'RecommendationView',
  components: {
    UserBehaviorForm,
  },
  methods: {
    async handleFormSubmit(formData) {
      try {
        await axios.post('/api/recommend/user-behavior', formData);
        alert('행동 기록이 성공적으로 등록되었습니다!');
        window.location.reload();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert(`등록에 실패했습니다: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};
</script>

<style scoped>
.loading-container, .error-container {
  text-align: center;
  padding: 60px;
  font-size: 1.2rem;
  color: #777;
}
.error-container button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style> 