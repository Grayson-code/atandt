<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import { doc } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import * as Table from "$lib/components/ui/table";
  import { onMount } from "svelte";
  import { events } from "$lib/stores";
  import { fetchAndSyncEvents } from "$lib/fetchAndSyncDb";

  const docRef = doc(db, "events", "TMxwwjtGPQdvIYUQcA4H");
  onMount(async () => {
    await fetchAndSyncEvents();
    console.log($events)
  });
</script>

<Table.Root>
  <Table.Caption>A list of your recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Priority</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Method</Table.Head>
      <Table.Head class="text-right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell class="font-medium">INV001</Table.Cell>
      <Table.Cell>Paid</Table.Cell>
      <Table.Cell>Credit Card</Table.Cell>
      <Table.Cell class="text-right">$250.00</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>