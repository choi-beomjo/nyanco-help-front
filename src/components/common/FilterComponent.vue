<template>
    <div class="filter-container">
      <div class="filter-section">
        <h3 class="filter-title"><i class="fas fa-magic"></i> 스킬로 필터링</h3>
        <div class="checkbox-group skills-group">
          <label v-for="skill in skills" :key="skill.id" class="checkbox-label">
            <input type="checkbox" :value="skill.id" v-model="selectedSkills" />
            <span class="checkbox-custom"><i :class="getSkillIcon(skill.name)"></i></span>
            <span class="label-text">{{ skill.name }}</span>
          </label>
        </div>
      </div>

      <div class="filter-section">
        <h3 class="filter-title"><i class="fas fa-gem"></i> 속성으로 필터링</h3>
        <div class="checkbox-group properties-group">
          <label v-for="property in properties" :key="property.id" class="checkbox-label"
            :style="{ '--property-bg': getPropertyColor(property.name), '--property-text': getTextColor(property.name) }">
            <input type="checkbox" :value="property.id" v-model="selectedProperties" />
            <span class="checkbox-custom property-custom"></span>
            <span class="label-text">{{ property.name }}</span>
          </label>
        </div>
      </div>

      <div class="filter-actions">
        <button @click="filterItems" class="filter-btn">
          <i class="fas fa-search"></i> 검색하기
        </button>
      </div>
    </div>
  </template>
  
  <script>
import axios from "@/services/axios";
import "@/assets/css/FilterComponent.css";
import { useIconAndColor } from "@/composables/useIconAndColor.js";

export default {
    props: {
      skills: Array,
      properties: Array,
      apiEndpoint: String,
      itemType: String,
      pageSize: Number,
      currentPage: Number,
    },
    setup() {
    const { getSkillIcon, getPropertyColor, getTextColor } = useIconAndColor();

    return {
      getSkillIcon,
      getPropertyColor,
      getTextColor,
    };
  },
    data() {
      return {
        selectedSkills: [],
        selectedProperties: [],
      };
    },
    methods: {
      async filterItems() {
        this.$emit('search-start');
        try {
          const response = await axios.post(
            this.apiEndpoint,
            {
              skills: this.selectedSkills,
              properties: this.selectedProperties,
            },
            {
              params: {
                page: this.currentPage,
                page_size: this.pageSize,
              }
            }
          );
          // API 응답 전체를 부모로 전달
          this.$emit("filter-results", response.data);
        } catch (error) {
          console.error(`Error filtering ${this.itemType.toLowerCase()}s:`, error);
          alert(`Failed to fetch filtered ${this.itemType.toLowerCase()}s.`);
          this.$emit('search-error');
        }
      },
    },
  };
  </script>
  