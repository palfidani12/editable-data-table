<script setup lang="ts">
import DataTable from './components/DataTable.vue'
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
  font-size: clamp(1.7rem, 2.6vw, 2.35rem);
  line-height: 1.2;
  color: var(--text);
}
</style>
