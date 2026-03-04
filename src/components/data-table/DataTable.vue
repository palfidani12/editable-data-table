<script setup lang="ts">
import { syncData } from '@/data/data'
import DataTableRow from './DataTableRow.vue'
import { ref, watch, computed } from 'vue'
import CreateNewRow from './create-new-row/CreateNewRow.vue'
import { ArrowDownIcon, ArrowUpIcon } from '@primevue/icons'

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

const headerCells: { key: keyof RowData; label: string }[] = [
  { key: 'id', label: 'Id' },
  { key: 'parent_id', label: 'Parent Id' },
  { key: 'name', label: 'Name' },
  { key: 'radius', label: 'Radius' },
  { key: 'type', label: 'Type' },
]

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
  <section class="tableSection">
    <CreateNewRow @addRow="handleAddRow" />
    <table>
      <thead>
        <tr>
          <th scope="col" v-for="headerCell in headerCells" :key="headerCell.key">
            <span class="headerCell" @click="sortByColumn(headerCell.key)"
              >{{ headerCell.label }}
              <span>
                <ArrowDownIcon
                  v-if="sortedColKey === headerCell.key && sortedColDirection === 'desc'"
                />
                <ArrowUpIcon
                  v-if="sortedColKey === headerCell.key && sortedColDirection === 'asc'"
                /> </span
            ></span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <DataTableRow
          v-for="row in sortedRows"
          :key="row.id"
          :rawRowData="row"
          @update="handleRowUpdate"
          @delete="handleRowDelete"
          @rowSelected="highlightedRowId = row.id"
          :isHighlighted="highlightedRowId === row.id"
        />
      </tbody>
    </table>
    <h2 v-if="tableRows.length === 0" class="noDataText">
      No data available. Please add new rows.
    </h2>
  </section>
</template>

<style scoped>
.tableSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  table-layout: fixed;
}

th {
  padding: 0.65rem 0.65rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
}

th:nth-child(1) {
  width: 160px;
}

th:nth-child(2) {
  width: 140px;
}

th:nth-child(3) {
  width: 120px;
}

th:nth-child(4) {
  width: 90px;
}

th:nth-child(5) {
  width: 100px;
}

th:last-child {
  width: 130px;
}

.headerCell {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
}

.headerCell:hover {
  color: var(--text);
}

.noDataText {
  margin: 0;
  padding: 0.75rem 0.25rem;
  font-size: 1rem;
  color: var(--text-muted);
}
</style>
