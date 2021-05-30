<template>
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MainSorting extends Vue {}
</script>
