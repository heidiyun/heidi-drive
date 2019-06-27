<template>
  <div class="container" :type="this.$store.getters.user ? 'user': 'noneUser'">
    <div class="profile-layout">
      <profile-card :user="this.$store.getters.user"></profile-card>
    </div>

    <div class="go-drive-button" @click="$router.push('/drive')">드라이브로 이동</div>
    <div
      class="login-button"
      @click="onClickLoginButton"
      v-if="signButtonText =  this.$store.getters.user ? 'Sign out' : 'Sign in'"
    >{{signButtonText}}</div>
  </div>
</template>

<style lang="scss" scoped>
@import './login.scss';
</style>

<script src='./login.ts'></script>

