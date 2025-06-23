<template>
  <div class="stage-list-container">
    <div class="stage-list-header">
      <h1 class="stage-list-title"><i class="fas fa-map-signs"></i> 스테이지 목록</h1>
      <div class="stage-list-actions">
        <div class="stage-list-options">
          <select v-model.number="pageSize" class="stage-page-size">
            <option :value="10">10개씩 보기</option>
            <option :value="20">20개씩 보기</option>
            <option :value="50">50개씩 보기</option>
          </select>
        </div>
        <button class="stage-btn add" @click="goAdd">
          <i class="fas fa-plus"></i> 스테이지 추가
        </button>
        <button class="stage-btn back" @click="goBack">
          <i class="fas fa-arrow-left"></i> 뒤로가기
        </button>
      </div>
    </div>
    <div v-if="stages.length" class="character-card-grid">
      <StageItem
        v-for="stage in stages"
        :key="stage.name"
        :stage="stage"
        @edit="goToEdit"
      />
    </div>
    <div v-else class="stage-list-empty">
      <i class="fas fa-map-signs"></i>
      <p>등록된 스테이지가 없습니다.</p>
    </div>
    <div v-if="totalPages > 1" class="stage-pagination">
      <button class="stage-btn page-btn" :disabled="currentPage === 1" @click="prevPage">
        이전
      </button>
      <span class="stage-page-info">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button class="stage-btn page-btn" :disabled="currentPage === totalPages" @click="nextPage">
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
        <button class="stage-btn page-jump-btn" @click="goToPage">이동</button>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/StageList.css";
import StageItem from "@/components/stage/StageItem.vue";
import { fetchList } from "@/services/apiService.js";
import { useRouterActions } from "@/composables/useRouterActions";

export default {
  components: {
    StageItem,
  },
  data() {
    return {
      stages: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
      jumpToPage: null,
    };
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
      this.fetchStages();
    },
    currentPage() {
      this.fetchStages();
    },
  },
  created() {
    this.fetchStages();
  },
  setup() {
    const { goBack, goToEdit, goAdd } = useRouterActions("stage");
    return {
      goBack,
      goToEdit,
      goAdd,
    };
  },
  methods: {
    async fetchStages() {
      try {
        const params = { page: this.currentPage, page_size: this.pageSize };
        const response = await fetchList("/api/stage/list", params);
        this.stages = response.data;
        this.totalPages = Math.ceil(response.total / response.page_size) || 1;
      } catch (error) {
        console.error("Error fetching stages:", error);
        this.stages = [];
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
      this.jumpToPage = null;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script> 