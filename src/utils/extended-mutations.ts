import { Mutations } from 'vuex-smart-module';

export type IMutate<State> = Partial<State>;

export abstract class ExtendedMutations<State> extends Mutations<State> {
  public mutate(values: IMutate<State>): void {
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const value = values[key as keyof State];
        if (value !== undefined) {
          const stateKey = key as keyof State;
          this.state[stateKey] = value as State[keyof State];
        }
      } else {
        throw new Error(`Not found property ${key} in state or mutate values`);
      }
    }
  }
}
