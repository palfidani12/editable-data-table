<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon, TimesIcon } from '@primevue/icons'
const emit = defineEmits(['addRow'])
const newRowData = ref({
  name: '',
  parent_id: '',
  radius: 0,
  type: '',
})
const validationErrors = ref({
  name: '',
  parent_id: '',
  radius: '',
  type: '',
})
const addNewRowOpen = ref(false)

const validateForm = () => {
  let isValid = true
  if (newRowData.value.name === '') {
    validationErrors.value.name = 'Name is required'
    isValid = false
  } else {
    validationErrors.value.name = ''
  }

  if (newRowData.value.radius <= 0) {
    validationErrors.value.radius = 'Radius must be greater than 0'
    isValid = false
  } else {
    validationErrors.value.radius = ''
  }

  if (newRowData.value.type === '') {
    validationErrors.value.type = 'Type is required'
    isValid = false
  } else {
    validationErrors.value.type = ''
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('addRow', newRowData.value)
    addNewRowOpen.value = false
    newRowData.value = {
      name: '',
      parent_id: '',
      radius: 0,
      type: '',
    }
  }
}
</script>

<template>
  <div class="createRowContainer">
    <button class="toggleButton" @click="addNewRowOpen = !addNewRowOpen">
      {{ addNewRowOpen ? 'Close' : 'Add New Row' }}
      <PlusIcon v-if="!addNewRowOpen" />
      <TimesIcon v-else />
    </button>
    <div v-if="addNewRowOpen" class="formComponent">
      <h2>Create New Row</h2>
      <form class="rowForm" @submit.prevent="handleSubmit">
        <label class="fieldLabel" for="parent_id">
          Parent Id
          <input
            id="parent_id"
            type="text"
            v-model="newRowData.parent_id"
            placeholder="Parent ID"
            class="fullWidth"
          />
        </label>
        <label class="fieldLabel" for="name">
          Name
          <input
            id="name"
            type="text"
            v-model="newRowData.name"
            placeholder="Name"
            class="fullWidth"
            :class="{ error: validationErrors.name }"
          />
          <span v-if="validationErrors.name" class="error-text">{{ validationErrors.name }}</span>
        </label>
        <label class="fieldLabel" for="radius">
          Radius
          <input
            id="radius"
            type="number"
            v-model.number="newRowData.radius"
            placeholder="Radius"
            class="fullWidth"
            :class="{ error: validationErrors.radius }"
          />
          <span v-if="validationErrors.radius" class="error-text">{{
            validationErrors.radius
          }}</span>
        </label>
        <fieldset class="typeField" :class="{ error: validationErrors.type }">
          <legend>Type</legend>
          <div class="radioGroup">
            <label>
              <input type="radio" id="bubble" value="bubble" v-model="newRowData.type" />
              Bubble
            </label>

            <label>
              <input type="radio" id="crack" value="crack" v-model="newRowData.type" />
              Crack
            </label>

            <label>
              <input type="radio" id="scratch" value="scratch" v-model="newRowData.type" />
              Scratch
            </label>
          </div>
        </fieldset>
        <span v-if="validationErrors.type" class="error-text">{{ validationErrors.type }}</span>
        <button type="submit" class="submitButton">Add Row <PlusIcon /></button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.createRowContainer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toggleButton {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.6rem 0.95rem;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-sm);
}

.formComponent {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: var(--shadow-sm);
}

h2 {
  margin: 0 0 0.8rem;
  font-size: 1.1rem;
}

.rowForm {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  align-items: start;
}

.fieldLabel {
  display: grid;
  gap: 0.35rem;
  font-size: 0.92rem;
  color: var(--text-muted);
}

.fullWidth {
  width: 100%;
  padding: 0.55rem 0.7rem;
  color: var(--text);
  background: var(--surface-2);
}

.typeField {
  margin: 0;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
}

.typeField legend {
  padding: 0 0.25rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.radioGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.radioGroup label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text);
}

.typeField.error {
  border-color: var(--danger);
  background: var(--danger-soft);
}

.submitButton {
  justify-self: start;
  padding: 0.55rem 1rem;
  color: var(--accent-contrast);
  background: var(--accent);
  border-color: var(--accent);
  display: flex;
  gap: 0.5rem;
}

.error {
  border-color: var(--danger);
}

.error-text {
  color: var(--danger);
  font-size: 0.84rem;
}
</style>
