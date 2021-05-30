<template>
  <h2 class="films-list__title">There are no movies in our database</h2>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NoResults extends Vue {}
</script>
