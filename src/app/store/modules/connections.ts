import { Module } from 'vuex'
import { State } from '../index'

interface Connection {
  from: number
  to: number
}

interface ConnectionsState {
  connections: Connection[]
}

export const connectionsModule: Module<ConnectionsState, State> = {
  state: {
    connections: [],
  },
  mutations: {
    addConnection(state, { from, to }: Connection) {
      state.connections.push({ from, to })
    },
    clearAllConnections(state) {
      state.connections = []
    },
    removeConnection(state, { from, to }: Connection) {
      state.connections = state.connections.filter((c) => c.from !== from || c.to !== to)
    },
  },
}
