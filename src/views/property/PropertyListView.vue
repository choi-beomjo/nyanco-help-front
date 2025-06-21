<template>
  <div class="property-list-container">
    <div class="property-list-header">
      <h1 class="property-list-title"><i class="fas fa-gem"></i> 속성 목록</h1>
      <div class="property-list-actions">
        <button class="property-btn add" @click="goAdd">
          <i class="fas fa-plus"></i> 속성 추가
        </button>
        <button class="property-btn back" @click="goBack">
          <i class="fas fa-arrow-left"></i> 뒤로가기
        </button>
      </div>
    </div>
    <div v-if="properties.length" class="character-card-grid">
      <PropertyItem
        v-for="property in properties"
        :key="property.id"
        :property="property"
        @edit="goToEdit"
      />
    </div>
    <div v-else class="property-list-empty">
      <i class="fas fa-gem"></i>
      <p>등록된 속성이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import "@/assets/css/PropertyList.css";
import PropertyItem from "@/components/property/PropertyItem.vue";
// import BackButton from "@/components/common/BackButton.vue"; // Not used anymore
import axios from "@/services/axios.js";
import { useRouterActions } from "@/composables/useRouterActions";

export default {
  components:{
    PropertyItem,
    // BackButton, // Not used anymore
  },
  data() {
    return {
      properties: [],
    };
  },
  created() {
    this.fetchProperties();
  },
  setup() {
    const { goBack, goToEdit, goAdd } = useRouterActions("property");
    return {
      goBack,
      goToEdit,
      goAdd,
    };
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await axios.get("/api/property/list");
        this.properties = response.data;
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    },
  },
};
</script>
  