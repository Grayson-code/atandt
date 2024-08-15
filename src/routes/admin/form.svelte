<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Toaster } from "$lib/components/ui/sonner";
  import { toast } from "svelte-sonner";

  import type { DateRange } from "bits-ui";
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";

  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  import { collection, addDoc } from "firebase/firestore";
  import { auth, db } from "$lib/firebase";

  const df = new DateFormatter("en-US", {
    dateStyle: "medium",
  });

  let value: DateRange | undefined = {
    start: new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).add({ days: 30 }),
    end: new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).add({ days: 60 }),
  };

  let startValue: DateValue | undefined = undefined;
  let name = "";
  let issuer = "";
  // idfk why this is like this. im too stoned to fix it
  let selected: any = {
    value,
  };

  let checked: boolean = false;

  async function handleSubmit() {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        name: name,
        type: selected.value.value,
        author: "Admin",
        of: issuer,
        deadline: startValue?.toDate(getLocalTimeZone()),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Could not add event");
    } finally {
      toast.success("Event added successfully");
    }
  }
</script>

<Toaster />
<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label for="name">Name</Label>
  <Input
    type="name"
    id="name"
    placeholder="Cocaine Assignment"
    bind:value={name}
  />
  <Label for="issuer">Issuer</Label>
  <Input
    type="issuer"
    id="issuer"
    placeholder="XYZ Teacher"
    bind:value={issuer}
  />
  <Label for="type">Type</Label>
  <Select.Root
    onSelectedChange={(v) => {
      selected.value = v;
    }}
  >
    <Select.Trigger class="w-[180px]">
      <Select.Value placeholder="Type" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="note">Notes</Select.Item>
      <Select.Item value="assignment">Assignment</Select.Item>
      <Select.Item value="exam">Test Paper/Exam</Select.Item>
      <Select.Item value="event">Event</Select.Item>
    </Select.Content>
  </Select.Root>
  <Label for="date">Date</Label>
  <div class="grid gap-2">
    <Popover.Root openFocus>
      <Popover.Trigger asChild let:builder>
        <Button
          variant="outline"
          class={cn(
            "w-[300px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          builders={[builder]}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {#if value && value.start}
            {#if value.end}
              {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
                value.end.toDate(getLocalTimeZone())
              )}
            {:else}
              {df.format(value.start.toDate(getLocalTimeZone()))}
            {/if}
          {:else if startValue}
            {df.format(startValue.toDate(getLocalTimeZone()))}
          {:else}
            Pick a date
          {/if}
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" align="start">
        <RangeCalendar
          bind:value
          bind:startValue
          placeholder={value?.start}
          initialFocus
          numberOfMonths={2}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="items-top flex space-x-3 pt-2">
    <Checkbox id="terms1" bind:checked />
    <div class="grid gap-1.5 leading-none">
      <Label
        for="terms1"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Confirm a High-Level post request
      </Label>
      <p class="text-sm text-muted-foreground">
        This makes changes to hundreds of clients. Beware.
      </p>
    </div>
  </div>
  <Button disabled={!checked} on:click={handleSubmit}>Submit</Button>
</div>

<style>
</style>
