<template>
  <div class="home-container">
    <div class="home-card">
      <h1 class="home-title">어서오세요!</h1>
      <p class="home-subtitle">냥코헬프에 오신 것을 환영합니다.</p>

      <!-- 로그인 상태 확인 -->
      <LoginForm v-if="!isLoggedIn" @login-success="handleLogin" />

      <div v-else>
        <div class="user-info-card">
          <span class="user-greeting">👋 안녕하세요, <b>{{ username }}</b> 님!</span>
        </div>

        <div class="home-button-group">
          <button class="home-button home-button-posts" @click="goToPosts">
            <i class="fas fa-comments"></i> 게시판 바로가기
          </button>
          <button class="home-button home-button-logout" @click="logout">
            <i class="fas fa-sign-out-alt"></i> 로그아웃
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/views/auth/LoginForm.vue";
import "@/assets/css/HomeView.css"; // 새로운 스타일 적용

export default {
  components: { LoginForm },
  data() {
    return {
      isLoggedIn: false,
      username: "",
    };
  },
  mounted() {
    // 새로 고침 시 토큰 확인
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      this.isLoggedIn = true;
      this.username = username;
    }
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username");
    },
    goToPosts() {
      this.$router.push("/posts");
    },
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.username = "";
      this.$router.push("/login");
    },
  },
};
</script>
