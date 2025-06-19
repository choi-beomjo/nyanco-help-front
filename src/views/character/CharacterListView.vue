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

    <div v-if="enemies.length" class="character-card-grid">
      <CharacterItem
        v-for="character in displayedCharacters"
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
      enemies: [], // 적 데이터 저장
      pageSize: 10,
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.enemies.length / this.pageSize) || 1;
    },
    displayedCharacters() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.enemies.slice(start, end);
    },
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
    },
  },
  created() {
    this.fetchCharacters(); // 페이지 생성 시 API 호출
  },
  setup() {
    const { goBack, goToEdit, goAdd } = useRouterActions("character"); // "skill" 대신 "enemy" 등 다른 값 사용 가능.

    return {
      goBack,
      goToEdit,
      goAdd,
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        this.enemies = await fetchList("/api/character/list");
      } catch (error) {
        console.error("Error fetching characters:", error);
        // 사용자에게 에러 메시지 표시
        alert(`캐릭터 목록을 불러오는데 실패했습니다: ${error.message}`);
        // 빈 배열로 초기화하여 UI가 깨지지 않도록 함
        this.enemies = [];
      }
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
  