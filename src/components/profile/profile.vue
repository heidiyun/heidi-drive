<template>
  <div class="profile-card" v-if="user">
    <div class="blank"></div>
    <div class="profile-photo" :style="{backgroundImage : `url(${user.data.photoURL})`}"></div>
    <div class="profile-info">
      <div class="user-name">{{user.data.userName}}</div>
      <div class="user-email">{{user.data.email}}</div>
      <div class="login-button" @click="onClickLoginButton">Sign out</div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import './profile.scss'
</style>

<script src='./profile.ts'>
</script>
