<script setup lang="ts">
import { syncData } from '@/data/data'
import DataTableRow from './DataTableRow.vue'
import { ref, watch, computed } from 'vue'
import CreateNewRow from './CreateNewRow.vue'
import { TrashIcon, PencilIcon, PlusIcon, ArrowDownIcon, ArrowUpIcon } from '@primevue/icons'

type RowData = {
  id: string
  parent_id: string
  name: string
  radius: number
  type: string
}

const LOCAL_STORAGE_KEY = 'editable-table-data'
const localStorageData:
  | { id: string; parent_id: string; name: string; radius: number; type: string }[]
  | null = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
  : null

const tableRows = ref(localStorageData ?? syncData)
const highlightedRowId = ref<string | null>(null)

const sortedColKey = ref<undefined | keyof RowData>(undefined)
const sortedColDirection = ref<'asc' | 'desc'>('asc')

const sortedRows = computed(() => {
  if (!sortedColKey.value) {
    return tableRows.value
  } else {
    return [...tableRows.value].sort((a, b) => {
      const aValue = a[sortedColKey.value!]
      const bValue = b[sortedColKey.value!]
      if (aValue < bValue) return sortedColDirection.value === 'asc' ? -1 : 1
      if (aValue > bValue) return sortedColDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
})

const sortByColumn = (colKey: keyof RowData) => {
  if (sortedColKey.value === colKey) {
    sortedColDirection.value = sortedColDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortedColKey.value = colKey
    sortedColDirection.value = 'asc'
  }
}

watch(
  tableRows,
  (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
  },
  { deep: true },
)

const handleAddRow = (newRow: {
  name: string
  parent_id: string
  radius: number
  type: string
}) => {
  const newRowWithId = { ...newRow, id: crypto.randomUUID() }
  tableRows.value.push(newRowWithId)
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
    <TrashIcon />
    <PencilIcon />
    <PlusIcon />
    <ArrowDownIcon />
    <ArrowUpIcon />
  </div>
  <div>
    <CreateNewRow @addRow="handleAddRow" />
    <div class="tableContainer">
      <div class="tableHeader">
        <span @click="sortByColumn('id')"
          >Id
          <span>{{
            sortedColKey === 'id' ? (sortedColDirection === 'asc' ? '▲' : '▼') : ''
          }}</span></span
        >
        <span @click="sortByColumn('parent_id')"
          >Parent Id
          <span>{{
            sortedColKey === 'parent_id' ? (sortedColDirection === 'asc' ? '▲' : '▼') : ''
          }}</span></span
        >
        <span @click="sortByColumn('name')"
          >Name
          <span>{{
            sortedColKey === 'name' ? (sortedColDirection === 'asc' ? '▲' : '▼') : ''
          }}</span></span
        >
        <span @click="sortByColumn('radius')"
          >Radius
          <span>{{
            sortedColKey === 'radius' ? (sortedColDirection === 'asc' ? '▲' : '▼') : ''
          }}</span></span
        >
        <span @click="sortByColumn('type')"
          >Type
          <span>{{
            sortedColKey === 'type' ? (sortedColDirection === 'asc' ? '▲' : '▼') : ''
          }}</span></span
        >
      </div>
      <div class="tableRows">
        <DataTableRow
          v-for="row in sortedRows"
          :key="row.id"
          :rawRowData="row"
          @update="handleRowUpdate"
          @delete="handleRowDelete"
          @click="highlightedRowId = row.id"
          :isHighlighted="highlightedRowId === row.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tableHeader {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}
</style>
