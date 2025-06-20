<template>
  <div class="character-list-container">
    <div class="character-list-header">
      <h1 class="character-list-title">캐릭터 목록</h1>
      <div class="character-list-actions">
        <div class="character-list-options">
          <select v-model.number="pageSize" class="character-page-size">
            <option :value="10">10개씩 보기</option>
            <option :value="20">20개씩 보기</option>
            <option :value="50">50개씩 보기</option>
          </select>
        </div>
        <button class="character-btn add" @click="goAdd">
          <i class="fas fa-plus"></i> 캐릭터 추가
        </button>
        <button class="character-btn search" @click="goSearch">
          <i class="fas fa-search"></i> 검색
        </button>
        <BackButton />
      </div>
    </div>

    <div v-if="characters.length" class="character-card-grid">
      <CharacterItem
        v-for="character in characters"
        :key="character.id"
        :character="character"
        @edit="goToEdit"
      />
    </div>
    <div v-else class="character-list-empty">
      <i class="fas fa-cat"></i>
      <p>등록된 캐릭터가 없습니다.</p>
    </div>

    <div v-if="totalPages > 1" class="character-pagination">
      <button class="character-btn page-btn" :disabled="currentPage === 1" @click="prevPage">
        이전
      </button>
      <span class="character-page-info">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button class="character-btn page-btn" :disabled="currentPage === totalPages" @click="nextPage">
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
        <button class="character-btn page-jump-btn" @click="goToPage">이동</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "@/services/axios.js"; // Axios로 API 호출
import CharacterItem from "@/components/character/CharacterItem.vue";
import { fetchList } from "@/services/apiService.js";
import BackButton from "@/components/common/BackButton.vue";
import { useRouterActions } from "@/composables/useRouterActions";
import "@/assets/css/CharacterListView.css";

export default {
  components: {
    CharacterItem,
    BackButton,
  },
  data() {
    return {
      characters: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
      jumpToPage: null,
    };
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
      this.fetchCharacters();
    },
    currentPage() {
      this.fetchCharacters();
    }
  },
  created() {
    this.fetchCharacters();
  },
  setup() {
    const { goBack, goToEdit, goAdd } = useRouterActions("character");
    return {
      goBack,
      goToEdit,
      goAdd,
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        const params = { page: this.currentPage, page_size: this.pageSize };
        const response = await fetchList("/api/character/list", params);
        
        // 변경된 API 응답 구조 반영
        this.characters = response.data;
        this.totalPages = Math.ceil(response.total / response.page_size) || 1;
        // this.currentPage = response.page; // 페이지 이동 시 watch에서 처리되므로 중복

      } catch (error) {
        console.error("Error fetching characters:", error);
        alert(`캐릭터 목록을 불러오는데 실패했습니다: ${error.message}`);
        this.characters = [];
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
    goSearch() {
      this.$router.push("/character/search");
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
  