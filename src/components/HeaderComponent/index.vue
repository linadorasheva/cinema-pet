<template>
  <header class="header">
    <h1 class="header__logo logo">Cinemaddict</h1>

    <section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="@/assets/images/bitmap@2x.png" alt="Avatar" width="35" height="35" />
    </section>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {}
</script>
