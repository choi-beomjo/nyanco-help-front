<template>
  <div class="enemy-list-container">
    <div class="enemy-list-header">
      <h1 class="enemy-list-title"><i class="fas fa-skull-crossbones"></i> 적 목록</h1>
      <div class="enemy-list-actions">
        <button class="enemy-btn add" @click="goAdd">
          <i class="fas fa-plus"></i> 적 추가
        </button>
        <button class="enemy-btn search" @click="goSearch">
          <i class="fas fa-search"></i> 검색
        </button>
        <BackButton />
      </div>
    </div>
    <div v-if="enemies.length" class="character-card-grid">
      <EnemyItem
        v-for="enemy in enemies"
        :key="enemy.id"
        :enemy="enemy"
        @edit="goToEdit"
        @recommend="recommendEnemy(enemy.id)"
      />
    </div>
    <div v-else class="enemy-list-empty">
      <i class="fas fa-skull-crossbones"></i>
      <p>등록된 적이 없습니다.</p>
    </div>
  </div>
</template>
  
<script>
import "@/assets/css/EnemyList.css";
import EnemyItem from "@/components/enemy/EnemyItem.vue";
import { fetchList } from "@/services/apiService.js";
import BackButton from "@/components/common/BackButton.vue";
import { useRouterActions } from "@/composables/useRouterActions";

export default {
  components:{
    EnemyItem,
    BackButton,
  },
  data() {
    return {
      enemies: [], // 적 데이터 저장
    };
  },
  created() {
    this.fetchEnemies(); // 페이지 생성 시 API 호출
  },
  setup() {
    const { goBack, goToEdit, goAdd } = useRouterActions("enemy");

    return {
      goBack,
      goToEdit,
      goAdd,
    };
  },
  methods: {
    async fetchEnemies() {
      try {
        this.enemies = await fetchList("/api/enemy/list");
      } catch (error) {
        console.error("Error fetching enemies:", error);
      }
    },
    goSearch(){
      this.$router.push("/enemy/search");
    },
    recommendEnemy(id){
      this.$router.push(`/recommend/${id}`)
    }
  },
};
</script>
  