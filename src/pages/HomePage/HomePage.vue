<template>
  <div class="app">
    <Connections />
    <Block v-for="block in blocks" :key="block.id" :block="block" />
    <div class="controls">
      <button @click="addBlock">Добавить блок</button>
      <button @click="clearAllConnections">Удалить все соединения</button>
      <ul>
        <li v-for="connection in connections" :key="connection.from + '-' + connection.to">
          {{ connection.from }} -> {{ connection.to }}
          <button @click="deleteConnection(connection)">Удалить</button>
        </li>
      </ul>
      <ul>
        <li v-for="block in blocks" :key="block.id">
          <button @click="deleteBlock(block.id)">Удалить блок {{ block.id }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Block from '@/features/Block'
import Connections from '@/features/Connections'
import { watch } from 'vue'

export default defineComponent({
  components: { Block, Connections },
  setup() {
    const store = useStore()
    const blocks = computed(() => store.state.blocks.blocks)

    const connections = computed(() => store.state.connections.connections)

    const addBlock = () => {
      store.commit('addBlock', {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        id: store.state.blocks.blocks.length + 1,
        nodes: [
          { id: store.state.blocks.blocks.length * 10 + 0, x: 0, y: 0 },
          { id: store.state.blocks.blocks.length * 10 + 1, x: 100, y: 0 },
          { id: store.state.blocks.blocks.length * 10 + 2, x: 100, y: 100 },
          { id: store.state.blocks.blocks.length * 10 + 3, x: 0, y: 100 },
        ],
      })
    }

    const deleteBlock = (block: { id: number }) => {
      store.commit('removeBlock', block)
    }

    const clearAllConnections = () => {
      store.commit('clearAllConnections')
    }

    const deleteConnection = (connection: { from: number; to: number }) => {
      store.commit('removeConnection', connection)
    }

    watch(blocks, (newBlocks) => {
      if (newBlocks.length === 0) {
        clearAllConnections()
      }
    })

    return {
      addBlock,
      deleteBlock,
      blocks,
      connections,
      clearAllConnections,
      deleteConnection,
    }
  },
})
</script>

<style>
.app {
  display: flex;
  height: 100dvh;
}

.controls {
  margin-left: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
}
</style>
