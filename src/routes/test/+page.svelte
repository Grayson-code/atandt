<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

	
<script lang="ts">
  import DataTable from "../dashboard/data-table.svelte";

  export let data
</script>
 
<div class="flex items-center space-x-2 flex-1 ml-2">
  <svg
    class="text-green-500 marker1 w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="6" />
  </svg>
  <span
    class="text-6xl font-bold inline-flex animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text"
    >90%</span
  >
  <span class="text-muted">Completed</span>
</div>

<style>
  .animate-shine {
    background-size: 200% 100%;
    animation: shine 1.5s infinite linear;
  }

  @keyframes shine {
    to {
      background-position: -200% 100%;
    }
  }
</style>
