<template>
  <div class="profile-card">
    <div class="blank"></div>
    <div class="profile-photo" :style="{backgroundImage : `url(${user.data.photoURL})`}"></div>
    <div class="profile-info">
      <div class="user-name">{{user.data.name}}</div>
      <div class="user-email">{{user.data.email}}</div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import './profile.scss'
</style>

<script src='./profile.ts'>
</script>
