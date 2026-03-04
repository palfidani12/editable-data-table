<script setup lang="ts">
import DataTable from './components/data-table/DataTable.vue'
</script>

<template>
  <main class="appWrapper">
    <h1>Editable Data Table</h1>
    <DataTable />
  </main>
</template>

<style scoped>
.appWrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 1.25rem 3rem;
}

h1 {
  margin: 0;
  font-size: 2.6vw;
  color: var(--text);
}
</style>
