import Vue from "vue";
import * as Vuex from "vuex";
import { createStore, createMapper, Getters, Mutations, Actions, Module } from "vuex-smart-module";
import { moviesModule } from "./modules/movies";

Vue.use(Vuex);

class MainState {}

class MainGetters extends Getters<MainState> {}

class MainMutations extends Mutations<MainState> {}

class MainActions extends Actions<MainState, MainGetters, MainMutations, MainActions> {}

export const mainModule = new Module({
  state: MainState,
  getters: MainGetters,
  mutations: MainMutations,
  actions: MainActions,
  modules: {
    moviesModule,
  },
});

export const mainMapper = createMapper(mainModule);

export const store = createStore(mainModule, {
  strict: process.env.NODE_ENV !== "production",
});
