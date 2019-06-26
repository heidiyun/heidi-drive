<template>
  <div class="container" :type="hasUser ? 'user': 'noneUser'">
    <div class="profile-layout">
      <profile-card :user="user"></profile-card>
    </div>

    <div class="go-drive-button" @click="$router.push('/drive')">드라이브로 이동</div>
    <div class="login-button" @click="onClickLoginButton">{{signButtonText}}</div>
    <div @click="$router.push('/drive')">드라이브로 이동</div>
  </div>
</template>

<style lang="scss" scoped>
@import './login.scss';
</style>

<script src='./login.ts'></script>

