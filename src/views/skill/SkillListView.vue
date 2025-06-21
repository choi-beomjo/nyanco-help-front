<template>
  <div class="skill-list-container">
    <div class="skill-list-header">
      <h1 class="skill-list-title"><i class="fas fa-magic"></i> 스킬 목록</h1>
      <div class="skill-list-actions">
        <button class="skill-btn add" @click="goAdd">
          <i class="fas fa-plus"></i> 스킬 추가
        </button>
        <button class="skill-btn back" @click="goBack">
          <i class="fas fa-arrow-left"></i> 뒤로가기
        </button>
      </div>
    </div>
    <div v-if="skills.length" class="character-card-grid">
      <SkillItem
        v-for="skill in skills"
        :key="skill.id"
        :skill="skill"
        @edit="goToEdit"
      />
    </div>
    <div v-else class="skill-list-empty">
      <i class="fas fa-magic"></i>
      <p>등록된 스킬이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import "@/assets/css/SkillList.css";
import SkillItem from "@/components/skill/SkillItem.vue";
import axios from "@/services/axios.js";
import { useRouterActions } from "@/composables/useRouterActions";

export default {
  components:{
    SkillItem,
  },
  data() {
    return {
      skills: [],
    };
  },
  created() {
    this.fetchSkills();
  },
  setup() {
    const { goBack, goToEdit, goAdd } = useRouterActions("skill");
    return {
      goBack,
      goToEdit,
      goAdd,
    };
  },
  methods: {
    async fetchSkills() {
      try {
        const response = await axios.get("/api/skill/list");
        this.skills = response.data;
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    },
  },
};
</script>
  