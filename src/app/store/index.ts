import { createStore, Store, ModuleTree } from 'vuex'
import { InjectionKey } from 'vue'
import { blocksModule } from './modules/blocks'
import { connectionsModule } from './modules/connections'
import { activeNodeModule } from './modules/activeNode'

export interface State {
  blocks: { id: number; x: number; y: number; nodes: { id: number; x: number; y: number }[] }[]
  connections: { from: number; to: number }[]
  activeNode: number | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  modules: {
    blocks: blocksModule,
    connections: connectionsModule,
    activeNode: activeNodeModule,
  },
})
