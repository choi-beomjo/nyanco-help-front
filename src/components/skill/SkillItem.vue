<template>
  <div class="character-card skill-card">
    <div class="character-card-info">
      <i class="fas fa-magic skill-icon"></i>
      <h2 class="skill-name">{{ skill.name }}</h2>
    </div>
    <div class="character-card-actions">
      <button class="edit-btn" @click="$emit('edit', skill.id)">
        <i class="fas fa-edit"></i> 수정
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skill: {
      type: Object,
      required: true,
    },
  },
};
</script>