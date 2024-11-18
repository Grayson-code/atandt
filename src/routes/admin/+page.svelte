<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import Form from "./form.svelte";
  import DataTable from "./data-table.svelte";
  export let data;

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (localStorage.getItem('userId') != 'YhJLXRoSwIRUnGT8pQZhePHX53r2') {
      goto('/dashboard');
    }
  });
</script>

<div class="container">
  <Form></Form>
  <DataTable {data}></DataTable>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
