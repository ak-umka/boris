import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  blocks: { id: number; x: number; y: number; nodes: { id: number; x: number; y: number }[] }[]
  connections: { from: number; to: number }[]
  activeNode: number | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    blocks: [
      {
        id: 1,
        x: 100,
        y: 100,
        nodes: [
          { id: 1, x: 0, y: 0 },
          { id: 2, x: 100, y: 0 },
          { id: 3, x: 100, y: 100 },
          { id: 4, x: 0, y: 100 },
        ],
      },
      {
        id: 2,
        x: 300,
        y: 150,
        nodes: [
          { id: 5, x: 0, y: 0 },
          { id: 6, x: 100, y: 0 },
          { id: 7, x: 100, y: 100 },
          { id: 8, x: 0, y: 100 },
        ],
      },
    ],
    connections: [] as { from: number; to: number }[],
    activeNode: null as null | number,
  },
  mutations: {
    addBlock(
      state: State,
      {
        id,
        x,
        y,
        nodes,
      }: { id: number; x: number; y: number; nodes: { id: number; x: number; y: number }[] },
    ) {
      state.blocks.push({ id, x, y, nodes })
    },
    moveBlock(state: State, { id, x, y }: { id: number; x: number; y: number }) {
      const block = state.blocks.find((b) => b.id === id)
      if (block) {
        block.x = x
        block.y = y
      }
    },
    removeBlock(state: State, id: number) {
      state.blocks = state.blocks.filter((b) => b.id !== id)
    },
    setActiveNode(state: State, nodeId: number | null) {
      state.activeNode = nodeId
    },
    addConnection(state: State, { from, to }: { from: number; to: number }) {
      console.log('addConnection', from, to)
      state.connections.push({ from, to })
    },
    clearAllConnections(state: State) {
      state.connections = []
    },
    removeConnection(state: State, { from, to }: { from: number; to: number }) {
      state.connections = state.connections.filter((c) => c.from !== from || c.to !== to)
    },
  },
})
