import { Module } from 'vuex'
import { State } from '../index'

export interface Block {
  id: number
  x: number
  y: number
  nodes: { id: number; x: number; y: number }[]
}

interface BlocksState {
  blocks: Block[]
}

export const blocksModule: Module<BlocksState, State> = {
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
  },
  mutations: {
    addBlock(state, { id, x, y, nodes }: Block) {
      state.blocks.push({ id, x, y, nodes })
    },
    moveBlock(state, { id, x, y }: { id: number; x: number; y: number }) {
      const block = state.blocks.find((b) => b.id === id)
      if (block) {
        block.x = x
        block.y = y
      }
    },
    removeBlock(state, id: number) {
      state.blocks = state.blocks.filter((b) => b.id !== id)
    },
  },
}
