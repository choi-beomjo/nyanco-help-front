<template>
  <nav class="top-nav-bar">
    <div class="nav-links">
      <router-link to="/" class="nav-link home-link">
        <i class="fas fa-home"></i> 홈
      </router-link>
      <router-link to="/character-list" class="nav-link character-link" active-class="active">
        <i class="fas fa-cat"></i> 캐릭터
      </router-link>
      <router-link to="/enemy-list" class="nav-link enemy-link" active-class="active">
        <i class="fas fa-skull-crossbones"></i> 적
      </router-link>
      <router-link to="/skill-list" class="nav-link skill-link" active-class="active">
        <i class="fas fa-magic"></i> 스킬
      </router-link>
      <router-link to="/property-list" class="nav-link property-link" active-class="active">
        <i class="fas fa-gem"></i> 속성
      </router-link>
      <router-link to="/stage-list" class="nav-link stage-link" active-class="active">
        <i class="fas fa-map-signs"></i> 스테이지
      </router-link>
      <router-link to="/recommendation" class="nav-link recommendation-link" active-class="active">
        <i class="fas fa-thumbs-up"></i> 추천 기록
      </router-link>
      <router-link to="/team-composition" class="nav-link" active-class="active">조합 추천</router-link>
      <router-link to="/stage-character-stats" class="nav-link" active-class="active">통계</router-link>
    </div>
    <div class="nav-actions">
      <!-- 추후 유저 정보나 로그아웃 버튼을 여기에 추가할 수 있습니다. -->
    </div>
  </nav>
</template>

<script>
import "@/assets/css/TopNavBar.css";
export default {
  name: "TopNavBar",
};
</script>

<style>
.nav-link.active[href$="/recommendation"] {
  background-color: #e3f2fd;
  color: #1e88e5;
}
.nav-link.active[href$="/team-composition"] {
  background-color: #fff3e0;
  color: #f57c00;
}
.nav-link.active[href$="/stage-character-stats"] {
  background-color: #f3e5f5;
  color: #8e24aa;
}
</style> 