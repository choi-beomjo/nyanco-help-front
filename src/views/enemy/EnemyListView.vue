<template>
  <div class="enemy-list-container">
    <div class="enemy-list-header">
      <h1 class="enemy-list-title"><i class="fas fa-skull-crossbones"></i> 적 목록</h1>
      <div class="enemy-list-actions">
        <div class="enemy-list-options">
          <select v-model.number="pageSize" class="enemy-page-size">
            <option :value="10">10개씩 보기</option>
            <option :value="20">20개씩 보기</option>
            <option :value="50">50개씩 보기</option>
          </select>
        </div>
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
    <div v-if="totalPages > 1" class="enemy-pagination">
      <button class="enemy-btn page-btn" :disabled="currentPage === 1" @click="prevPage">
        이전
      </button>
      <span class="enemy-page-info">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button class="enemy-btn page-btn" :disabled="currentPage === totalPages" @click="nextPage">
        다음
      </button>
      <div class="page-jump-container">
        <input
          type="number"
          class="page-jump-input"
          v-model.number="jumpToPage"
          @keyup.enter="goToPage"
          placeholder="페이지"
        />
        <button class="enemy-btn page-jump-btn" @click="goToPage">이동</button>
      </div>
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
      enemies: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
      jumpToPage: null,
    };
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
      this.fetchEnemies();
    },
    currentPage() {
      this.fetchEnemies();
    }
  },
  created() {
    this.fetchEnemies();
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
        const params = { page: this.currentPage, page_size: this.pageSize };
        const response = await fetchList("/api/enemy/list", params);
        this.enemies = response.data;
        this.totalPages = Math.ceil(response.total / response.page_size) || 1;
      } catch (error) {
        console.error("Error fetching enemies:", error);
        this.enemies = [];
      }
    },
    goToPage() {
      if (
        this.jumpToPage &&
        this.jumpToPage > 0 &&
        this.jumpToPage <= this.totalPages
      ) {
        this.currentPage = this.jumpToPage;
      }
      this.jumpToPage = null; // Reset input
    },
    goSearch(){
      this.$router.push("/enemy/search");
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    recommendEnemy(id){
      this.$router.push(`/recommend/${id}`)
    }
  },
};
</script>
  