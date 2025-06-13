<template>
  <div class="character-card">
    <div class="character-card-top">
      <span class="cat-emoji" v-if="!character.image">🐱</span>
      <img
        v-if="character.image"
        :src="character.image"
        alt="캐릭터 이미지"
        class="character-avatar"
      />
    </div>
    <div class="character-card-info">
      <h2>
        {{ character.name }}
        <span
          class="grade-badge"
          :class="'grade-' + (character.grade || '').toLowerCase().replace(/ /g, '-')"
          v-if="character.grade"
        >
          {{ character.grade }}
        </span>
      </h2>
      <p>{{ character.description }}</p>
    </div>
    <div class="character-card-actions">
      <button class="info-btn" @click="toggleDetail">
        <i :class="showDetail ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        정보 보기
      </button>
      <button class="edit-btn" @click="$emit('edit', character)"><i class="fas fa-edit"></i> 수정</button>
      <button class="delete-btn" @click="$emit('delete', character)"><i class="fas fa-trash"></i> 삭제</button>
    </div>
    <transition name="fade">
      <div v-if="showDetail" class="character-detail">
        <div class="character-detail-row"><b>ID:</b> {{ character.id }}</div>
        <div class="character-detail-row"><b>ATK:</b> {{ character.atk }}</div>
        <div class="character-detail-row"><b>HP:</b> {{ character.hp }}</div>
        <div class="character-detail-row"><b>Range:</b> {{ character.range }}</div>
        <div class="character-detail-row">
          <b>Skills:</b>
          <span v-for="skill in character.skills" :key="skill.id" class="skill-tag">
            <span v-html="getSkillIcon(skill.name)"></span>
            {{ skill.name }}
          </span>
        </div>
        <div class="character-detail-row">
          <b>Properties:</b>
          <span v-for="property in character.properties" :key="property.id" class="property-tag">
            {{ property.name }}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import "@/assets/css/CharacterItem.css";
import "@fortawesome/fontawesome-free/css/all.css"; // Font Awesome Import
import { useIconAndColor } from "@/composables/useIconAndColor";

export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { getSkillIcon, getPropertyColor, getTextColor } = useIconAndColor();
    const showDetail = ref(false);
    const toggleDetail = () => { showDetail.value = !showDetail.value; };
    return {
      getSkillIcon,
      getPropertyColor,
      getTextColor,
      showDetail,
      toggleDetail,
    };
  },
};
</script>
