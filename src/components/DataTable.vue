<script setup lang="ts">
import { syncData } from '@/data/data'
import DataTableRow from './DataTableRow.vue'
import { ref } from 'vue'
import CreateNewRow from './CreateNewRow.vue'

const tableRows = ref(syncData)
const addNewRowOpen = ref(false)

const handleAddRow = (newRow: {
  name: string
  parent_id: string
  radius: number
  type: string
}) => {
  const newRowWithId = { ...newRow, id: crypto.randomUUID() }
  tableRows.value.push(newRowWithId)
  addNewRowOpen.value = false
}

const handleRowUpdate = (updatedRow: {
  id: string
  parent_id: string
  name: string
  radius: number
  type: string
}) => {
  const index = tableRows.value.findIndex((row) => row.id === updatedRow.id)
  tableRows.value[index] = updatedRow
  console.log('Row updated:', tableRows.value)
}

const handleRowDelete = (id: string) => {
  tableRows.value = tableRows.value.filter((row) => row.id !== id)
}
</script>

<template>
  <div>
    <button @click="addNewRowOpen = !addNewRowOpen">
      {{ addNewRowOpen ? 'Close' : 'Add New Row' }}
    </button>
    <CreateNewRow v-if="addNewRowOpen" @addRow="handleAddRow" />
    <div>Table header</div>
    <div>
      <DataTableRow
        v-for="row in tableRows"
        :key="row.id"
        :rawRowData="row"
        @update="handleRowUpdate"
        @delete="handleRowDelete"
      />
    </div>
  </div>
</template>

<style scoped></style>
