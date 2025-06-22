<template>
  <transition name="modal-fade">
    <div class="modal-overlay" v-if="show" @click.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h2>스테이지 선택</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
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
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchStages();
      }
    }
  },
  methods: {
    async fetchStages() {
      this.loading = true;
      try {
        const params = { 
          page: this.currentPage, 
          page_size: this.pageSize,
        };
        const response = await fetchList('/api/stage/list', params);
        this.stages = response.data;
        this.totalPages = Math.ceil(response.total / this.pageSize) || 1;
        this.total = response.total;
      } catch (error) {
        console.error('Error fetching stages in modal:', error);
      } finally {
        this.loading = false;
      }
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