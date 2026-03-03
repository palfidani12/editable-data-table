<script setup lang="ts">
import { ref } from 'vue'
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
  <div>
    <h2>Create New Row</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="newRowData.parent_id" placeholder="Parent ID" />
      <input
        type="text"
        v-model="newRowData.name"
        placeholder="Name"
        :class="{ error: validationErrors.name }"
      />
      <span v-if="validationErrors.name" class="error-text">{{ validationErrors.name }}</span>
      <input
        type="number"
        v-model.number="newRowData.radius"
        placeholder="Radius"
        :class="{ error: validationErrors.radius }"
      />
      <span v-if="validationErrors.radius" class="error-text">{{ validationErrors.radius }}</span>
      <div>
        <input type="radio" id="bubble" value="bubble" v-model="newRowData.type" />
        <label for="bubble">Bubble</label>

        <input type="radio" id="crack" value="crack" v-model="newRowData.type" />
        <label for="crack">Crack</label>

        <input type="radio" id="scratch" value="scratch" v-model="newRowData.type" />
        <label for="scratch">Scratch</label>
        <span v-if="validationErrors.radius" class="error-text">{{ validationErrors.type }}</span>
      </div>
      <button type="submit">Add Row</button>
    </form>
  </div>
</template>
