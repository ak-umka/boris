<template>
  <svg class="connections">
    <line
      v-for="(connection, index) in connections"
      :key="index"
      :x1="getBlock(connection.from).x"
      :y1="getBlock(connection.from).y"
      :x2="getBlock(connection.to).x"
      :y2="getBlock(connection.to).y"
      stroke="black"
      stroke-width="2"
    />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const connections = computed(() => store.state.connections.connections)

    const getBlock = (nodeId: number) => {
      for (const block of store.state.blocks.blocks) {
        // const index = nodeId % 10
        const node = block.nodes.find((n: { id: number }) => n.id === nodeId)
        if (node) {
          return {
            x: block.x + node.x + 10,
            y: block.y + node.y,
          }
        }
      }
      console.warn('Node not found, returning default position')
      return { x: 0, y: 0 }
    }

    return {
      connections,
      getBlock,
    }
  },
})
</script>

<style scoped>
.connections {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
