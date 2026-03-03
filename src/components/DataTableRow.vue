<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  rawRowData: {
    id: string
    parent_id: string
    name: string
    radius: number
    type: string
  }
  isHighlighted: boolean
}>()
const emit = defineEmits(['delete', 'update'])

const isEditing = ref(false)
const editedRowData = ref({ ...props.rawRowData })

const handleSave = () => {
  emit('update', { ...editedRowData.value })
  isEditing.value = false
}

const handleCancel = () => {
  isEditing.value = false
}

const handleDelete = () => {
  emit('delete', props.rawRowData.id)
}
</script>

<template>
  <div class="rowContainer" :class="{ highlighted: props.isHighlighted }">
    <div>
      <span>
        {{ props.rawRowData.id }}
      </span>
    </div>
    <div>
      <span v-if="!isEditing">
        {{ props.rawRowData.parent_id }}
      </span>
      <input v-if="isEditing" type="text" v-model="editedRowData.parent_id" />
    </div>
    <div>
      <span v-if="!isEditing">
        {{ props.rawRowData.name }}
      </span>
      <input v-if="isEditing" type="text" v-model="editedRowData.name" />
    </div>
    <div>
      <span v-if="!isEditing">
        {{ props.rawRowData.radius }}
      </span>
      <input v-if="isEditing" type="number" v-model.number="editedRowData.radius" />
    </div>
    <div>
      <span v-if="!isEditing">
        {{ props.rawRowData.type }}
      </span>
      <div v-if="isEditing">
        <input type="radio" id="bubble" value="bubble" v-model="editedRowData.type" />
        <label for="bubble">Bubble</label>

        <input type="radio" id="crack" value="crack" v-model="editedRowData.type" />
        <label for="crack">Crack</label>

        <input type="radio" id="scratch" value="scratch" v-model="editedRowData.type" />
        <label for="scratch">Scratch</label>
      </div>
    </div>
    <button @click="isEditing = true">Edit</button>
    <button @click="handleDelete">Delete</button>
    <button v-if="isEditing" @click="handleSave">Save</button>
    <button v-if="isEditing" @click="handleCancel">Cancel</button>
  </div>
</template>

<style scoped>
.rowContainer {
  display: flex;
  gap: 1rem;
}

.highlighted {
  border: 3px solid blue;
}
</style>
