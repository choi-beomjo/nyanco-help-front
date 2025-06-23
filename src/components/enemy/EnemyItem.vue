<template>
  <div class="character-card enemy-card" :class="propertyClass">
    <div class="character-card-top">
      <span class="cat-emoji">😼</span>
    </div>
    <div class="character-card-info">
      <h2>{{ enemy.name }}</h2>
    </div>
    <div class="character-card-actions">
      <button class="info-btn" @click="toggleDetail">
        <i :class="showDetail ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        정보 보기
      </button>
      <button class="edit-btn" @click="$emit('edit', enemy.id)"><i class="fas fa-edit"></i> 수정</button>
      <button class="delete-btn" @click="$emit('recommend', enemy)"><i class="fas fa-magic"></i> 추천</button>
    </div>
    <transition name="fade">
      <div v-if="showDetail" class="character-detail">
        <table class="character-stats-table">
          <tr>
            <th colspan="4">공격 관련</th>
          </tr>
          <tr>
            <td><b>ATK1</b></td><td>{{ enemy.atk1 }}</td>
            <td><b>ATK2</b></td><td>{{ enemy.atk2 }}</td>
          </tr>
          <tr>
            <td><b>ATK3</b></td><td>{{ enemy.atk3 }}</td>
            <td><b>Back ATK</b></td><td>{{ enemy.back_atk }}</td>
          </tr>
          <tr>
            <td><b>Pre ATK1</b></td><td>{{ enemy.pre_atk1 }}</td>
            <td><b>Pre ATK2</b></td><td>{{ enemy.pre_atk2 }}</td>
          </tr>
          <tr>
            <td><b>Pre ATK3</b></td><td>{{ enemy.pre_atk3 }}</td>
            <td><b>ATK Type</b></td><td>{{ enemy.atk_type }}</td>
          </tr>
          <tr>
            <td><b>ATK Freq</b></td><td>{{ enemy.atk_freq }}</td>
            <td></td><td></td>
          </tr>

          <tr><th colspan="4">체력/방어</th></tr>
          <tr>
            <td><b>HP</b></td><td>{{ enemy.hp }}</td>
            <td><b>KB</b></td><td>{{ enemy.kb }}</td>
          </tr>

          <tr><th colspan="4">이동/생산</th></tr>
          <tr>
            <td><b>Speed</b></td><td>{{ enemy.speed }}</td>
            <td><b>TBA</b></td><td>{{ enemy.tba }}</td>
          </tr>
          <tr>
            <td><b>Money</b></td><td>{{ enemy.money }}</td>
            <td><b>Range</b></td><td>{{ enemy.range }}</td>
          </tr>
          <tr>
            <td><b>Long Distance1</b></td><td>{{ enemy.long_distance1 }}</td>
            <td><b>Long Distance2</b></td><td>{{ enemy.long_distance2 }}</td>
          </tr>

          <tr><th colspan="4">기타</th></tr>
          <tr>
            <td><b>Trait</b></td><td>{{ enemy.trait }}</td>
            <td></td><td></td>
          </tr>
        </table>
        <div class="character-detail-row">
          <b>Skills</b>
          <span v-for="skill in enemy.skills" :key="skill.id" class="skill-tag">
            <span v-html="getSkillIcon(skill.name)"></span>
            {{ skill.name }}
          </span>
        </div>
        <div class="character-detail-row">
          <b>Properties</b>
          <span v-for="property in enemy.properties" :key="property.id" class="property-tag"
            :style="{ backgroundColor: getPropertyColor(property.name), color: getTextColor(property.name) }">
            {{ property.name }}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "@/assets/css/CharacterItem.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useIconAndColor } from "@/composables/useIconAndColor";
import { ref, computed } from 'vue';

export default {
  props: {
    enemy: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { getSkillIcon, getPropertyColor, getTextColor } = useIconAndColor();
    const showDetail = ref(false);
    const toggleDetail = () => { showDetail.value = !showDetail.value; };
    
    const propertyClass = computed(() => {
      if (props.enemy.properties && props.enemy.properties.length > 0) {
        const propertyName = props.enemy.properties[0].name.toLowerCase().replace(/\s+/g, '-');
        return `property-bg-${propertyName}`;
      }
      return 'property-bg-default';
    });
    
    return {
      getSkillIcon,
      getPropertyColor,
      getTextColor,
      showDetail,
      toggleDetail,
      propertyClass,
    };
  }
};
</script>
