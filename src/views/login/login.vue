<template>
  <div class="container" :type="$store.getters.user ? 'user': 'noneUser'">
    <div>
      <div class="profile-layout" v-if="$store.getters.user">
        <profile-card :user="$store.getters.user"></profile-card>
      </div>

      <div class="go-drive-button" @click="$router.push('/drive')">드라이브로 이동</div>
      <div class="login-button" @click="onClickLoginButton" v-if="!$store.getters.user">Sign In</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './login.scss';
</style>

<script src='./login.ts'></script>

