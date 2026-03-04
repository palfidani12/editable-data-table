<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon, PencilIcon } from '@primevue/icons'
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
const emit = defineEmits(['delete', 'update', 'rowSelected'])

const isEditing = ref(false)
const editedRowData = ref({ ...props.rawRowData })

const handleSave = (e: PointerEvent) => {
  emit('update', { ...editedRowData.value })
  isEditing.value = false
  e.stopPropagation()
}

const handleCancel = (e: PointerEvent) => {
  isEditing.value = false
  e.stopPropagation()
}

const handleDelete = (e: PointerEvent) => {
  emit('delete', props.rawRowData.id)
  e.stopPropagation()
}

const handleEdit = (e: PointerEvent) => {
  isEditing.value = true
  e.stopPropagation()
}

const handleSelectRow = () => {
  if (!isEditing.value) emit('rowSelected')
}
</script>

<template>
  <tr :class="{ highlighted: props.isHighlighted }" @click="handleSelectRow">
    <td>
      <span>
        {{ props.rawRowData.id }}
      </span>
    </td>
    <td>
      <span v-if="!isEditing">
        {{ props.rawRowData.parent_id }}
      </span>
      <input
        id="editParentId"
        v-if="isEditing"
        class="cellInput"
        type="text"
        v-model="editedRowData.parent_id"
      />
    </td>
    <td>
      <span v-if="!isEditing">
        {{ props.rawRowData.name }}
      </span>
      <input
        id="editName"
        v-if="isEditing"
        class="cellInput"
        type="text"
        v-model="editedRowData.name"
      />
    </td>
    <td>
      <span v-if="!isEditing">
        {{ props.rawRowData.radius }}
      </span>
      <input
        id="editRadius"
        v-if="isEditing"
        class="cellInput"
        type="number"
        v-model.number="editedRowData.radius"
      />
    </td>
    <td>
      <span v-if="!isEditing">
        {{ props.rawRowData.type }}
      </span>
      <div v-if="isEditing" class="inlineRadios">
        <label>
          <input id="editTypeBubble" type="radio" value="bubble" v-model="editedRowData.type" />
          Bubble
        </label>
        <label>
          <input id="editTypeCrack" type="radio" value="crack" v-model="editedRowData.type" />
          Crack
        </label>
        <label>
          <input id="editTypeScratch" type="radio" value="scratch" v-model="editedRowData.type" />
          Scratch
        </label>
      </div>
    </td>
    <td>
      <button class="btn neutral" v-if="!isEditing" @click="handleEdit"><PencilIcon /></button>
      <button class="btn danger" v-if="!isEditing" @click="handleDelete">
        <TrashIcon />
      </button>
      <button class="btn primary" v-if="isEditing" @click="handleSave">Save</button>
      <button class="btn neutral" v-if="isEditing" @click="handleCancel">Cancel</button>
    </td>
  </tr>
</template>

<style scoped>
tr {
  background: var(--surface);
}

tr:not(.highlighted):hover {
  background: var(--surface-hover);
}

td {
  padding: 0.6rem 0.65rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(1),
td:nth-child(2) {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  word-break: break-word;
}

td:first-child {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 0.81rem;
  color: var(--text-muted);
}

td:last-child {
  width: 130px;
}

tr:last-child td {
  border-bottom: 1px solid var(--border);
}

.highlighted {
  background: #eef4ff;
}

.cellInput {
  width: 100%;
  max-width: 140px;
  padding: 0.45rem 0.6rem;
  background: var(--surface-2);
}

.inlineRadios {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.9rem;
}

.inlineRadios label {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.rowActions {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.btn {
  padding: 0.45rem 0.65rem;
  font-size: 0.86rem;
  border: 1px solid transparent;
}

.btn.primary {
  color: var(--accent-contrast);
  background: var(--accent);
  border-color: var(--accent);
}

.btn.neutral {
  color: var(--text);
  background: var(--surface);
  border-color: var(--border-strong);
}

.btn.danger {
  color: var(--danger);
  background: var(--danger-soft);
  border-color: #f2cfcf;
}
</style>
