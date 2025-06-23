<template>
  <transition name="modal-fade">
    <div class="modal-overlay" v-if="show" @click.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h2>캐릭터 선택 ({{ localSelection.length }} / 10)</h2>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-controls">
            <input type="text" v-model="searchQuery" @keyup.enter="startSearch" placeholder="캐릭터 이름으로 검색..." class="search-input">
            <button @click="startSearch" class="search-btn">검색</button>
          </div>
          <div v-if="loading" class="loading-indicator">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div v-else-if="!characters.length" class="no-data">
            표시할 캐릭터가 없습니다.
          </div>
          <div v-else class="item-grid character-grid">
            <div 
              v-for="char in characters" 
              :key="char.id" 
              class="item-card character-item-card" 
              :class="{ 'selected': isSelected(char.id) }"
              @click="toggleSelection(char)">
              <span class="item-name">{{ char.name }}</span>
              <span class="item-info">Form: {{ char.form }}</span>
            </div>
          </div>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">이전</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
          </div>
        </div>
        <div class="modal-footer">
            <button @click="confirmSelection" class="confirm-btn">선택 완료</button>
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
    initialSelection: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      characters: [],
      loading: false,
      currentPage: 1,
      pageSize: 12,
      totalPages: 1,
      localSelection: [],
      searchQuery: '',
      isSearching: false,
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.localSelection = [...this.initialSelection];
        this.searchQuery = '';
        this.isSearching = false;
        this.currentPage = 1;
        this.fetchCharacters();
      }
    }
  },
  methods: {
    async fetchCharacters() {
      this.loading = true;
      try {
        let apiPath = '/api/character/list';
        const params = { 
          page: this.currentPage, 
          page_size: this.pageSize,
        };

        if (this.isSearching && this.searchQuery) {
          apiPath = '/api/character/search/name';
          params.name = this.searchQuery;
        }

        const response = await fetchList(apiPath, params);
        this.characters = response.data;
        this.totalPages = Math.ceil(response.total / this.pageSize) || 1;
      } catch (error) {
        console.error('Error fetching characters in modal:', error);
        this.characters = [];
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },
    startSearch() {
      this.currentPage = 1;
      this.isSearching = this.searchQuery.trim() !== '';
      this.fetchCharacters();
    },
    isSelected(charId) {
        return this.localSelection.some(c => c.id === charId);
    },
    toggleSelection(char) {
      const index = this.localSelection.findIndex(c => c.id === char.id);
      if (index > -1) {
        this.localSelection.splice(index, 1);
      } else {
        if (this.localSelection.length < 10) {
            this.localSelection.push(char);
        } else {
            alert('최대 10명의 캐릭터만 선택할 수 있습니다.');
        }
      }
    },
    confirmSelection() {
      this.$emit('select', this.localSelection);
      this.$emit('close');
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchCharacters();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchCharacters();
      }
    },
  }
}
</script> 