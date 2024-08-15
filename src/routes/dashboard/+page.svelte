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
  import Atom from "lucide-svelte/icons/atom";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { Separator } from "$lib/components/ui/separator";
  import { Button } from "$lib/components/ui/button/index.js";
  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
  const docRef = doc(db, "events", "TMxwwjtGPQdvIYUQcA4H");
  onMount(async () => {
    await fetchAndSyncEvents();
    console.log($events)
  });
  
  
</script>
<div class="container">
  <section class="onBoardingInfo flex">
    <Alert.Root class="bg-gradient-to-r from-black via-slate-900 to-black">
      <Atom class="h-6 w-5" />
      <Alert.Title>Welcome back! You got 
        <strong class="text-green-400">{$events.length}</strong>
        work items to do.
      </Alert.Title>
      <Alert.Description class="text-slate-400"
        >The cold water doesn’t get warmer if you jump late.</Alert.Description
      >
      <Separator class="my-4"/>
    
      <div class="flex h-5 items-center space-x-4 text-sm">
        <Button variant="ghost" size="lg" class="">
          <ArrowUpRight class="mr-2 h-4 w-4"/>
          Lets begin.
        </Button>
        <Separator orientation="vertical" class=""/>
      </div>

    </Alert.Root>

  </section>
  <section></section>
  <section></section>
  <section></section>
  
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .onBoardingInfo {
    width: 35%;
    align-content: center;
    background-color: linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0));
  }
  .inside {

  }

</style>