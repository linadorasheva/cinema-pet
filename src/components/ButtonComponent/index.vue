<template>
  <button class="films-list__show-more">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ButtonComponent extends Vue {}
</script>
