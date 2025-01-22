import { Store } from 'vuex'

declare module 'vue' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

declare module 'vuex' {
  import Vuex from 'vuex/types/index'
  export * from 'vuex/types/index'
  export default Vuex
}
