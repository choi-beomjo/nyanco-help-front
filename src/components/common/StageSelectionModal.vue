<template>
  <transition name="modal-fade">
    <div class="modal-overlay" v-if="show" @click.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h2>스테이지 선택</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-controls">
            <input type="text" v-model="searchQuery" @keyup.enter="startSearch" placeholder="스테이지 이름으로 검색..." class="search-input">
            <button @click="startSearch" class="search-btn">검색</button>
          </div>
          <div v-if="loading" class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div v-else-if="!stages.length" class="no-data">
            표시할 스테이지가 없습니다.
          </div>
          <div v-else class="item-grid">
            <div v-for="stage in stages" :key="stage.id" class="item-card" @click="selectStage(stage)">
              <i class="fas fa-map-signs item-icon"></i>
              <span class="item-name">{{ stage.name }}</span>
              <span class="item-info">Difficulty: {{ stage.difficulty }}</span>
            </div>
          </div>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">이전</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { fetchList } from '@/services/apiService';
import '@/assets/css/Modal.css';

export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      stages: [],
      loading: false,
      currentPage: 1,
      pageSize: 12,
      totalPages: 1,
      total: 0,
      searchQuery: '',
      isSearching: false,
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.searchQuery = '';
        this.isSearching = false;
        this.currentPage = 1;
        this.fetchStages();
      }
    }
  },
  methods: {
    async fetchStages() {
      this.loading = true;
      try {
        let apiPath = '/api/stage/list';
        const params = { 
          page: this.currentPage, 
          page_size: this.pageSize,
        };

        if (this.isSearching && this.searchQuery) {
          apiPath = '/api/stage/search/name';
          params.name = this.searchQuery;
        }

        const response = await fetchList(apiPath, params);
        this.stages = response.data;
        this.totalPages = Math.ceil(response.total / this.pageSize) || 1;
        this.total = response.total;
      } catch (error) {
        console.error('Error fetching stages in modal:', error);
        this.stages = [];
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },
    startSearch() {
      this.currentPage = 1;
      this.isSearching = this.searchQuery.trim() !== '';
      this.fetchStages();
    },
    selectStage(stage) {
      this.$emit('select', stage);
      this.$emit('close');
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchStages();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchStages();
      }
    },
  }
}
</script> 