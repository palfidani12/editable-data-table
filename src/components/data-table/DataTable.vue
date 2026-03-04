<script setup lang="ts">
import { getSavedData, saveData, type RowData } from './../../data/data'
import DataTableRow from './data-table-row/DataTableRow.vue'
import { ref, watch, computed } from 'vue'
import CreateNewRow from './create-new-row/CreateNewRow.vue'
import { ArrowDownIcon, ArrowUpIcon } from '@primevue/icons'

const savedData = getSavedData()

const tableRows = ref(savedData)
const highlightedRowId = ref<string | null>(null)
const sortedColKey = ref<keyof RowData | null>(null)
const sortedColDirection = ref<'asc' | 'desc'>('asc')

const headerCells: { key: keyof RowData; label: string }[] = [
  { key: 'id', label: 'Id' },
  { key: 'parent_id', label: 'Parent Id' },
  { key: 'name', label: 'Name' },
  { key: 'radius', label: 'Radius' },
  { key: 'type', label: 'Type' },
]

const sortedRows = computed(() => {
  if (sortedColKey.value) {
    return [...tableRows.value].sort((a, b) => {
      const aValue = a[sortedColKey.value!]
      const bValue = b[sortedColKey.value!]
      if (aValue < bValue) return sortedColDirection.value === 'asc' ? -1 : 1
      if (aValue > bValue) return sortedColDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return tableRows.value
})

watch(tableRows, (newValue) => saveData(newValue), { deep: true })

const sortByColumn = (colKey: keyof RowData) => {
  if (sortedColKey.value === colKey) {
    sortedColDirection.value = sortedColDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortedColKey.value = colKey
    sortedColDirection.value = 'asc'
  }
}

const handleRowCreate = (newRow: RowData) => {
  const newRowWithId = { ...newRow, id: crypto.randomUUID() }
  tableRows.value.push(newRowWithId)
}

const handleRowUpdate = (updatedRow: RowData) => {
  const index = tableRows.value.findIndex((row) => row.id === updatedRow.id)
  tableRows.value[index] = updatedRow
}

const handleRowDelete = (id: string) => {
  tableRows.value = tableRows.value.filter((row) => row.id !== id)
}
</script>

<template>
  <section class="tableSection">
    <CreateNewRow @createRow="handleRowCreate" />
    <table>
      <thead>
        <tr>
          <th scope="col" v-for="headerCell in headerCells" :key="headerCell.key">
            <span class="headerCell" @click="sortByColumn(headerCell.key)"
              >{{ headerCell.label }}
              <span v-if="sortedColKey === headerCell.key">
                <ArrowDownIcon v-if="sortedColDirection === 'desc'" />
                <ArrowUpIcon v-else /> </span
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
