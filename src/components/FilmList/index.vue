<template>
  <section class="films-list" :class="listClass">
    <slot name="header" />

    <div class="films-list__container">
      <slot name="content" />
    </div>
    <button-component v-if="!isExtra">Show more</button-component>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ButtonComponent from "@/components/ButtonComponent/index.vue";

@Component({
  components: {
    ButtonComponent,
  },
})
export default class FilmList extends Vue {
  @Prop({ type: Boolean, default: false })
  public isExtra!: boolean;

  public get listClass(): Record<string, boolean> {
    return {
      "films-list--extra": this.isExtra,
    };
  }
}
</script>
