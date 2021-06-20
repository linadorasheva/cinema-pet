<template>
  <section class="films-list" :class="listClass">
    <slot name="header" />

    <div class="films-list__container">
      <film-card v-for="card in options.movies" :options="{ card }" :key="`film-card-${card.id}`" />
    </div>

    <slot name="button" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FilmCard from "@/components/FilmCard/index.vue";
import { IOptions } from "./FilmList.options";

@Component({
  components: {
    FilmCard,
  },
})
export default class FilmList extends Vue {
  @Prop({ required: true })
  public options!: IOptions;

  public get listClass(): Record<string, boolean> {
    return {
      "films-list--extra": this.options.isExtra,
    };
  }
}
</script>
