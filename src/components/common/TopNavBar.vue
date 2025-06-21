<template>
  <nav class="top-nav-bar">
    <div class="nav-links">
      <router-link to="/" class="nav-link home-link">
        <i class="fas fa-home"></i> 홈
      </router-link>
      <router-link to="/character-list" class="nav-link character-link">
        <i class="fas fa-cat"></i> 캐릭터
      </router-link>
      <router-link to="/enemy-list" class="nav-link enemy-link">
        <i class="fas fa-skull-crossbones"></i> 적
      </router-link>
      <router-link to="/skill-list" class="nav-link skill-link">
        <i class="fas fa-magic"></i> 스킬
      </router-link>
      <router-link to="/property-list" class="nav-link property-link">
        <i class="fas fa-gem"></i> 속성
      </router-link>
      <router-link to="/stage-list" class="nav-link stage-link">
        <i class="fas fa-map-signs"></i> 스테이지
      </router-link>
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