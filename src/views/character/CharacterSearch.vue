<template>
  <div class="character-search-container">
    <div class="character-search-header">
      <h1 class="character-search-title"><i class="fas fa-search-plus"></i> 캐릭터 상세 검색</h1>
      <BackButton class="character-search-back-btn"/>
    </div>

    <FilterComponent
      ref="filterComponent"
      :skills="skills"
      :properties="properties"
      :page-size="pageSize"
      :current-page="currentPage"
      apiEndpoint="/api/character/search"
      itemType="Character"
      @filter-results="handleFilterResults"
      @search-start="handleSearchStart"
      @search-error="handleSearchEnd"
    />

    <div v-if="isLoading" class="loading-indicator">
      <i class="fas fa-spinner fa-spin"></i> 검색 중...
    </div>

    <div v-else-if="characters.length > 0" class="search-results-container">
       <div class="results-info">
        총 <b>{{ total }}</b>개의 캐릭터를 찾았습니다.
      </div>
      <div class="character-card-grid">
        <CharacterItem
          v-for="character in characters"
          :key="character.id"
          :character="character"
          @edit="goToEdit"
        />
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">이전</button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">다음</button>
      </div>
    </div>

    <div v-else-if="searched" class="no-results">
      <i class="fas fa-cat"></i>
      <p>검색 결과가 없습니다.</p>
    </div>
     <div v-else class="before-search">
      <i class="fas fa-filter"></i>
      <p>원하는 스킬과 속성을 선택하고 검색 버튼을 눌러주세요.</p>
    </div>
  </div>
</template>

<script>
import FilterComponent from "@/components/common/FilterComponent.vue";
import CharacterItem from "@/components/character/CharacterItem.vue";
import BackButton from "@/components/common/BackButton.vue";
import { fetchList } from "@/services/apiService.js";
import { useRouterActions } from "@/composables/useRouterActions";
import { ref } from "vue";
import "@/assets/css/CharacterSearch.css";

export default {
  components: { FilterComponent, CharacterItem, BackButton },
  setup() {
    const { goToEdit } = useRouterActions("character");
    const filterComponent = ref(null);
    return { goToEdit, filterComponent };
  },
  data() {
    return {
      skills: [],
      properties: [],
      characters: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      isLoading: false,
      searched: false, // 검색을 한 번이라도 실행했는지 여부
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize) || 1;
    },
  },
  async created() {
    try {
      this.skills = await fetchList("/api/skill/list");
      this.properties = await fetchList("/api/property/list");
    } catch (error) {
      console.error("Error fetching skills or properties:", error);
    }
  },
  methods: {
    handleFilterResults(results) {
      this.characters = results.data;
      this.total = results.total;
      this.currentPage = results.page;
      this.pageSize = results.page_size;
      this.isLoading = false;
      this.searched = true;
    },
    handleSearchStart() {
      this.isLoading = true;
      this.characters = [];
      this.total = 0;
    },
    handleSearchEnd() {
        this.isLoading = false;
        this.searched = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$nextTick(() => {
          this.triggerSearch();
        });
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.$nextTick(() => {
          this.triggerSearch();
        });
      }
    },
    triggerSearch() {
      if (this.filterComponent) {
        this.filterComponent.filterItems();
      }
    }
  },
};
</script>
  