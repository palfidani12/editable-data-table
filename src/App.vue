<script setup lang="ts">
import DataTable from './components/DataTable.vue'
</script>

<template>
  <main>
    <h1>Editable Data Table</h1>
    <DataTable />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 3rem;
}

h1 {
  font-size: 2.5rem;
}
</style>
