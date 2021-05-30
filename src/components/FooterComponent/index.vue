<template>
  <footer class="footer">
    <section class="footer__logo logo logo--smaller">Cinemaddict</section>
    <section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FooterComponent extends Vue {}
</script>
