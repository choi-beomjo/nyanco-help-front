<template>
  <div class="character-card" :class="`form-bg-${character.form}`">
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
        <table class="character-stats-table" :class="`form-bg-${character.form}`">
          <tr>
            <th colspan="4">공격 관련</th>
          </tr>
          <tr>
            <td><b>ATK1</b></td><td>{{ character.atk1 }}</td>
            <td><b>ATK2</b></td><td>{{ character.atk2 }}</td>
          </tr>
          <tr>
            <td><b>ATK3</b></td><td>{{ character.atk3 }}</td>
            <td><b>Back ATK</b></td><td>{{ character.back_atk }}</td>
          </tr>
          <tr>
            <td><b>Pre ATK1</b></td><td>{{ character.pre_atk1 }}</td>
            <td><b>Pre ATK2</b></td><td>{{ character.pre_atk2 }}</td>
          </tr>
          <tr>
            <td><b>Pre ATK3</b></td><td>{{ character.pre_atk3 }}</td>
            <td><b>ATK Type</b></td><td>{{ character.atk_type }}</td>
          </tr>
          <tr>
            <td><b>ATK Freq</b></td><td>{{ character.atk_freq }}</td>
            <td><b>Ability Enabled</b></td><td>{{ character.ability_enabled }}</td>
          </tr>

          <tr><th colspan="4">체력/방어</th></tr>
          <tr>
            <td><b>HP</b></td><td>{{ character.hp }}</td>
            <td><b>KB</b></td><td>{{ character.kb }}</td>
          </tr>

          <tr><th colspan="4">이동/생산</th></tr>
          <tr>
            <td><b>Speed</b></td><td>{{ character.speed }}</td>
            <td><b>Spawn</b></td><td>{{ character.spawn }}</td>
          </tr>
          <tr>
            <td><b>TBA</b></td><td>{{ character.tba }}</td>
            <td><b>Cost</b></td><td>{{ character.cost }}</td>
          </tr>
          <tr>
            <td><b>Range</b></td><td>{{ character.range }}</td>
            <td><b>Long Distance1</b></td><td>{{ character.long_distance1 }}</td>
          </tr>
          <tr>
            <td><b>Long Distance2</b></td><td>{{ character.long_distance2 }}</td>
            <td></td><td></td>
          </tr>

          <tr><th colspan="4">기타</th></tr>
          <tr>
            <td><b>Base ID</b></td><td>{{ character.base_id }}</td>
            <td><b>Form</b></td><td>{{ character.form }}</td>
          </tr>
        </table>
        <div class="character-detail-row">
          <b>Skills</b>
          <span v-for="skill in character.skills" :key="skill.id" class="skill-tag">
            <span v-html="getSkillIcon(skill.name)"></span>
            {{ skill.name }}
          </span>
        </div>
        <div class="character-detail-row">
          <b>Properties</b>
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
