<template>
  <div class="block" :style="{ left: block.x + 'px', top: block.y + 'px' }" @mousedown="startDrag">
    {{ block.id }}
    <div
      v-for="(node, index) in block.nodes"
      :key="node.id"
      class="node"
      :style="{ left: node.x + 'px', top: node.y + 'px' }"
      @click="selectNode(node.id)"
    >
      {{ node.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    block: {
      type: Object,
      required: true,
      default: () => ({ x: 0, y: 0, id: 0 }),
    },
  },
  setup(props) {
    const store = useStore()
    const isDragging = ref(false)

    const startDrag = (event: MouseEvent) => {
      isDragging.value = true
      if (!props.block) return
      const offsetX = event.clientX - props.block.x
      const offsetY = event.clientY - props.block.y

      const onMouseMove = (e: MouseEvent) => {
        if (isDragging.value) {
          store.commit('moveBlock', {
            id: props.block.id,
            x: e.clientX - offsetX,
            y: e.clientY - offsetY,
          })
        }
      }

      const onMouseUp = () => {
        isDragging.value = false
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    const selectNode = (index: number) => {
      const activeNode = store.state.activeNode.activeNode

      if (activeNode === null) {
        store.commit('setActiveNode', index)
      } else if (activeNode !== index) {
        store.commit('addConnection', { from: activeNode, to: index })
        store.commit('setActiveNode', null)
      }
    }

    return {
      startDrag,
      selectNode,
    }
  },
})
</script>

<style scoped>
.block {
  display: flex;
  color: white;
  font-size: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 10px;
}

.node {
  display: flex;
  font-size: 18px;
  width: 40px;
  height: 40px;
  background-color: green;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: 2px solid;
}
</style>
