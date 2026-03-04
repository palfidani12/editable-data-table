<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon, PencilIcon } from '@primevue/icons'
import type { RowData } from '../../../data/data'
const props = defineProps<{
  rawRowData: RowData
  isHighlighted: boolean
}>()
const emit = defineEmits(['delete', 'update', 'rowSelected'])

const isEditing = ref(false)
const editedRowData = ref({ ...props.rawRowData })
const inputErrors = ref({
  name: '',
  radius: '',
  type: '',
})

const validate = () => {
  if (editedRowData.value.name.trim() === '') {
    inputErrors.value.name = 'Name cannot be empty'
    return false
  }
  if (editedRowData.value.radius <= 0) {
    inputErrors.value.radius = 'Radius must be greater than 0'
    return false
  }
  if (editedRowData.value.type === '') {
    inputErrors.value.type = 'Type must be selected'
    return false
  }
  return true
}

const handleSave = (e: PointerEvent) => {
  console.log('Saving row with data:', editedRowData.value)
  if (!validate()) {
    e.stopPropagation()
    return
  }
  emit('update', { ...editedRowData.value })
  isEditing.value = false
  e.stopPropagation()
}

const handleCancel = (e: PointerEvent) => {
  editedRowData.value = { ...props.rawRowData }
  isEditing.value = false
  inputErrors.value = {
    name: '',
    radius: '',
    type: '',
  }
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
        :id="`edit-parent-id-${props.rawRowData.id}`"
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
        :id="`edit-name-${props.rawRowData.id}`"
        v-if="isEditing"
        class="cellInput"
        :class="{ inputInvalid: inputErrors.name }"
        type="text"
        v-model="editedRowData.name"
      />
      <span v-if="isEditing && inputErrors.name" class="errorText">{{ inputErrors.name }}</span>
    </td>
    <td>
      <span v-if="!isEditing">
        {{ props.rawRowData.radius }}
      </span>
      <input
        :id="`edit-radius-${props.rawRowData.id}`"
        v-if="isEditing"
        class="cellInput"
        :class="{ inputInvalid: inputErrors.radius }"
        type="number"
        v-model.number="editedRowData.radius"
      />
      <span v-if="isEditing && inputErrors.radius" class="errorText">{{ inputErrors.radius }}</span>
    </td>
    <td>
      <span v-if="!isEditing">
        {{ props.rawRowData.type }}
      </span>
      <div v-if="isEditing" class="inlineRadios" :class="{ radioInvalid: inputErrors.type }">
        <label>
          <input
            :id="`edit-type-bubble-${props.rawRowData.id}`"
            type="radio"
            value="bubble"
            v-model="editedRowData.type"
          />
          Bubble
        </label>
        <label>
          <input
            :id="`edit-type-crack-${props.rawRowData.id}`"
            type="radio"
            value="crack"
            v-model="editedRowData.type"
          />
          Crack
        </label>
        <label>
          <input
            :id="`edit-type-scratch-${props.rawRowData.id}`"
            type="radio"
            value="scratch"
            v-model="editedRowData.type"
          />
          Scratch
        </label>
      </div>
      <span v-if="isEditing && inputErrors.type" class="errorText">{{ inputErrors.type }}</span>
    </td>
    <td>
      <div class="editButtons">
        <button class="btn neutral" v-if="!isEditing" @click="handleEdit"><PencilIcon /></button>
        <button class="btn danger" v-if="!isEditing" @click="handleDelete">
          <TrashIcon />
        </button>
        <button class="btn primary" v-if="isEditing" @click="handleSave">Save</button>
        <button class="btn neutral" v-if="isEditing" @click="handleCancel">Cancel</button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
tr {
  background: var(--surface);

  td {
    padding: 0.6rem 0.65rem;
    border-bottom: 1px solid var(--border);
    color: var(--text);
    overflow: visible;
    text-overflow: clip;
    word-break: break-word;

    &:first-child {
      font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
        monospace;
      font-size: 0.81rem;
      color: var(--text-muted);
    }

    .cellInput {
      width: 100%;
      padding: 0.45rem 0.6rem;
      background: var(--surface-2);

      &.inputInvalid {
        border-color: var(--danger);
        background: var(--danger-soft);
      }
    }

    .inlineRadios {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      font-size: 0.9rem;

      label {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }

      .radioInvalid {
        border: 1px solid var(--danger);
        border-radius: 6px;
        padding: 0.35rem 0.45rem;
        background: var(--danger-soft);
      }
    }
    /* adas */
    .errorText {
      margin-top: 0.3rem;
      font-size: 0.78rem;
      color: var(--danger);
    }

    .editButtons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      .btn {
        padding: 0.45rem 0.65rem;
        font-size: 0.86rem;

        &.primary {
          color: var(--accent-contrast);
          background: var(--accent);
          border-color: var(--accent);
        }

        &.neutral {
          background: var(--surface);
          border-color: var(--border-strong);
        }

        &.danger {
          color: var(--danger);
          background: var(--danger-soft);
          border-color: var(--danger-border);
        }
      }
    }
  }

  &.highlighted {
    background: var(--surface-highlight);
  }
}

tr:not(.highlighted):hover {
  background: var(--surface-hover);
}
</style>
