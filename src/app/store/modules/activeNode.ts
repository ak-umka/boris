import { Module } from 'vuex'
import { State } from '../index'

interface ActiveNodeState {
  activeNode: number | null
}

export const activeNodeModule: Module<ActiveNodeState, State> = {
  state: {
    activeNode: null,
  },
  mutations: {
    setActiveNode(state, nodeId: number | null) {
      state.activeNode = nodeId
    },
  },
}
