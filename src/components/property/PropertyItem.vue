<template>
  <div class="character-card property-card">
    <div class="character-card-info">
      <i class="fas fa-gem property-icon"></i>
      <h2 class="property-name">{{ property.name }}</h2>
    </div>
    <div class="character-card-actions">
      <button class="edit-btn" @click="$emit('edit', property.id)">
        <i class="fas fa-edit"></i> 수정
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
};
</script>