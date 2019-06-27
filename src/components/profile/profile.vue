<template>
  <div class="profile-card">
    <div class="blank"></div>
    <div
      class="profile-photo"
      v-if="user"
      :style="{backgroundImage : `url(${user.data.photoURL})`}"
    ></div>
    <div class="profile-info">
      <div class="user-name" v-if="user">{{user.data.userName}}</div>
      <div class="user-email" v-if="user">{{user.data.email}}</div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import './profile.scss'
</style>

<script src='./profile.ts'>
</script>
