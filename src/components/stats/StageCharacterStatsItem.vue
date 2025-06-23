<template>
  <div class="stat-card">
    <div class="stat-card-header">
      <h3 class="stat-stage-name">{{ getStageName(stat.stage_id) }}</h3>
      <div class="stat-character-name-wrapper">
        <i class="fas fa-user-shield"></i>
        <span class="stat-character-name">{{ getCharacterName(stat.character_id) }}</span>
      </div>
    </div>
    <div class="stat-card-body">
      <div class="stat-group">
        <div class="stat-item">
          <span class="stat-label">총 사용 횟수</span>
          <span class="stat-value">{{ stat.total_uses }}</span>
        </div>
         <div class="stat-item">
          <span class="stat-label">승률</span>
          <span class="stat-value win-rate">{{ stat.win_rate.toFixed(2) }}%</span>
        </div>
      </div>
      <div class="stat-group">
        <div class="stat-item">
          <span class="stat-label">승리</span>
          <span class="stat-value wins">{{ stat.wins }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">패배</span>
          <span class="stat-value losses">{{ stat.losses }}</span>
        </div>
      </div>
      <div class="stat-item">
        <span class="stat-label">평균 클리어 시간</span>
        <span class="stat-value">{{ stat.avg_clear_time.toFixed(2) }}s</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">인기 점수</span>
        <span class="stat-value">{{ stat.popularity_score.toFixed(2) }}</span>
      </div>
    </div>
    <div class="stat-card-footer">
      <span>마지막 업데이트: {{ new Date(stat.last_updated).toLocaleString() }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stat: Object,
    getStageName: Function,
    getCharacterName: Function,
  }
}
</script> 