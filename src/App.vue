<template>
  <div id="app">
    <TopNavBar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
import TopNavBar from './components/common/TopNavBar.vue';

export default {
  name: 'App',
  components: {
    TopNavBar
  },
  computed: {
    isLoggedIn() {
      // 로컬 스토리지에 토큰이 있는지 확인하여 로그인 상태를 판단합니다.
      // 실제 애플리케이션에서는 Vuex 같은 상태 관리 라이브러리를 사용하는 것이 더 좋습니다.
      return !!localStorage.getItem("token");
    }
  }
};
</script>

<style>
/* 전역 스타일을 여기에 추가할 수 있습니다. */
body {
  margin: 0;
  font-family: 'Nunito', sans-serif;
  background-color: #f4f7f9;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
