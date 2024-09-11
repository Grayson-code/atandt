<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import { doc } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import { onMount } from "svelte";
  import { fetchAndSyncEvents } from "$lib/fetchAndSyncDb";

  import Atom from "lucide-svelte/icons/atom";
  import * as Alert from "$lib/components/ui/alert/index.js";
  import { Separator } from "$lib/components/ui/separator";
  import { Button } from "$lib/components/ui/button/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Input } from "$lib/components/ui/input";
  import * as Card from "$lib/components/ui/card";

  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
  import ChevronUp from "lucide-svelte/icons/triangle-alert";
  import LibraryBig from "lucide-svelte/icons/library-big";
  import Gauge from "lucide-svelte/icons/gauge";
  import ChartLine from "lucide-svelte/icons/chart-line";
  import ListCheck from "lucide-svelte/icons/list-check";
  import Account from "lucide-svelte/icons/circle-user";
  import Info from "lucide-svelte/icons/info";
  import Fire from "lucide-svelte/icons/flame";
  import Calendar from "lucide-svelte/icons/calendar-days";

  import { events } from "$lib/stores";

  import { fade } from "svelte/transition";
  let show = true;

  function removeElement() {
    show = false; // This will trigger the fade-out transition
  }

  const docRef = doc(db, "events", "TMxwwjtGPQdvIYUQcA4H");
  // fetches the events{assignments, tp's, etc} from the database as soon as the DOM is loaded

  // FOR DEVELOPMENT PURPOSES ONLY

  // onMount(async () => {
  //   await fetchAndSyncEvents();
  // });

  // make a variable that randomnly selects a color from the array
  const colors = ["-rose-900", "-slate-900", "-emerald-900"];
  const quotes = [
    "The best revenge is to better yourself.",
    "It is what it is.",
    "Suicide is never the answer. You gotta outlive your enemies.",
    "No amount of guilt can change the past.",
    "No amount of anxiety can change the future.",
    "You are who you choose to be.",
    "Don't be sorry, Be better.",
    "The cold water doesn't get warmer if you jump late.",
    "The fastest way to kill something special is to compare it to something else.",
  ];
  const welcome1 = [
    "You have ",
    "Welcome back! There are ",
    "You've got ",
    "Welcome back! ",
    "There are ",
    "You have ",
    "You've returned to find ",
  ];
  const welcome2 = [
    " tasks awaiting your attention.",
    " items on your to-do list.",
    " work items to tackle.",
    " work items are queued up for you.",
    " tasks ready for you to handle.",
    " pending work items.",
    " work items awaiting action.",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const setRandom = Math.floor(Math.random() * welcome1.length);
  const randomWelcome1 = welcome1[setRandom];
  const randomWelcome2 = welcome2[setRandom];

  // create a fake todo list to display
  let todoList = [
    { id: false, task: "Create a new account" },
    { id: false, task: "Create a new project" },
    { id: false, task: "Create a new task" },
    { id: false, task: "Create a new event" },
    { id: false, task: "Create a new reminder" },
    { id: false, task: "Create a new note" },
    { id: false, task: "Create a new user" },
    { id: false, task: "Create a new profile" },
    { id: false, task: "Create a new password" },
    { id: false, task: "Create a new account" },
  ];

  function getNext20Days() {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 34; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay);
    }

    return days;
  }

  // Example usage
  const next20Days = getNext20Days();

  let onBoardingNumberColor;

  if ($events.length < 5) {
    onBoardingNumberColor = "text-green-500";
  } else if ($events.length < 10) {
    onBoardingNumberColor = "text-yellow-500";
  } else {
    onBoardingNumberColor = "text-red-500";
  }
</script>

<body>
  <nav>
    <strong
      ><LibraryBig class="w-11 h-11" /><span class="title">ANEMIA</span></strong
    >
    <div class="anotherempty"></div>
    <div class="dashboard"><Gauge class="mr-2" />Dashboard</div>
    <div class="statistics"><ChartLine class="mr-2" />Statistics</div>
    <div class="worklog"><ListCheck class="mr-2" />Work Log</div>
    <ScrollArea class="scroll h-[240px] w-11/12 pl-5">
      <h4 class="mt-4 mb-4 text-lg leading-none font-bold">Todo List</h4>
      {#each todoList as { id, task }}
        {#if !id}
          <div
            transition:fade={{ duration: 300 }}
            class="flex items-center space-x-4 pt-1"
          >
            <Checkbox id="terms" bind:checked={id} />
            <Label
              for="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {task}
            </Label>
          </div>
          <Separator orientation="horizontal" class="my-4" />
        {/if}
      {/each}
    </ScrollArea>
    <Input
      type="text"
      placeholder="Add Todo"
      class="max-w-xs rounded-none border-r-0 my-1 border-b-0"
    />
    <div class="day flex">
      <span class="mt-2 mb-2 text-2xl font-bold">Week</span>
      <div class="navDays flex flex-row">
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger>
            <span class="eachDay">M</span>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger
            ><span class="eachDay bg-emerald-900">T</span></Tooltip.Trigger
          >
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger><span class="eachDay">W</span></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger><span class="eachDay">Th</span></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger><span class="eachDay">F</span></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
      <div class="flex flex-row mt-2">
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger><span class="eachDay">Sa</span></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root openDelay={100}>
          <Tooltip.Trigger><span class="eachDay">S</span></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Add to library</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
      <div class="weekInfo flex flex-row gap-2 my-3">
        <Info class="infoHover"></Info>
        <span class="font-bold">Info</span>
      </div>
      <div class="assignmentsThisWeek text-slate-600 my-1">
        Assignments: <span class="text-white">4</span>
      </div>
      <div class="assignmentsThisWeek text-slate-600 my-1">
        Examinations: <span class="text-white">1</span>
      </div>
      <div class="assignmentsThisWeek text-slate-600 my-1">
        Todo: <span class="text-white">16</span>
      </div>
      <div class="assignmentsThisWeek text-slate-600 my-1">
        Scheduled: <span class="text-white">6</span>
      </div>
      <div class="assignmentsThisWeek text-slate-600 flex flex-row gap-1 my-1">
        Work Score: <span class="text-white">3/5</span><Fire
          class="text-red-500"
        ></Fire>
      </div>
    </div>
    <div class="account"><Account class="mr-2" />Account</div>
  </nav>
  <main class="flex flex-col w-full">
    <div
      class="onBoarding flex flex-col basis-1/4 w-full h-full justify-center items-center"
    >
      <span class="w-5/5 content-center basis-12 text-2xl"
        >{randomWelcome1}
        <span class={onBoardingNumberColor}>{$events.length}</span>
        {randomWelcome2}
      </span>
      <span class="w-5/5 basis-12 text-zinc-600">{randomQuote}</span>
    </div>

    <div class="week">
      <div class="days">
        <div class="weekCard flex flex-col content-center h-full w-full">
          <div class="overviewText flex content-center justify-center m-0">
            <Calendar class="mt-4 mr-2 text-cyan-200" />
            <p class="mt-4 text-xl">Overview</p>
          </div>
          <div class="datesContainer h-full flex-wrap flex">
            {#each next20Days as day}
              <div class="p-2 w-12 h-11 text-center rounded-full m-4 text-xl">{day.getDate()}</div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="table m-8">
      
    </div>
  </main>
</body>

<style>
  body {
    display: flex;
    font-family: "Roboto", sans-serif;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  nav {
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;
    flex: 0 0 17%;
    border-right: solid 2px #1b1b1b;
    justify-content: flex-start;
    font-size: large;
  }

  strong {
    padding-top: 10px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-basis: 10%;
  }

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  .title {
    background: linear-gradient(
      to right,
      #ec489a 20%,
      #eab308 30%,
      #86efac 70%,
      #3b82f6 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    background-size: 500% auto;
    animation: textShine 5s ease-in-out infinite alternate;
  }

  .dashboard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    padding-left: 2rem;
    width: 100%;
    border: solid 1px #1b1b1b;
    flex-basis: 5%;
  }

  .statistics {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 2rem;
    width: 100%;
    border: solid 1px #1b1b1b;
    flex-basis: 5%;
  }
  .worklog {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 2rem;
    width: 100%;
    border: solid 1px #1b1b1b;
    flex-basis: 5%;
  }

  .scroll {
    border: solid 1px #1b1b1b;
    width: 100%;
    overflow: hidden;
    flex-basis: 10%;
    max-height: 10%;
  }

  .day {
    flex: 5;
    width: 100%;
    border: solid 1px #1b1b1b;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
  }

  .navDays {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    flex-basis: 5%;
  }

  .eachDay {
    font-weight: bold;
    border-radius: 40px; /* Making border radius */
    width: auto; /* Making auto-sizable width */
    height: auto; /* Making auto-sizable height */
    padding: 5px 20px 5px 20px; /* Making space around letters */
    font-size: 17px; /* Changing font size */
  }

  .infoHover {
    transition: color;
    transition-duration: 0.3s;
  }

  .infoHover:hover {
    color: red;
  }

  .account {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 2rem;
    width: 100%;
    border: solid 1px #1b1b1b;
    border-bottom: 0;
    flex-basis: 5%;
  }

  .account,
  .dashboard,
  .statistics,
  .worklog {
    transition-duration: 0.3s;
    border-right: none;
  }

  .account:hover,
  .dashboard:hover,
  .statistics:hover,
  .worklog:hover {
    cursor: pointer;
    background-color: rgb(15, 15, 15);
  }

  .week {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-basis: 26%;
    width: 100%;
    height: 100%;
  }

  .days {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }

  .weekCard {
    border-radius: 3rem;
    border: solid 1px #1b1b1b;
    flex: 1;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: columns;
  }

  .onBoardingInfo {
    width: 35%;
    align-content: stretch;
    background-color: linear-gradient(
      to right,
      rgb(55, 65, 81),
      rgb(17, 24, 39),
      rgb(0, 0, 0)
    );
  }

  .table {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    
    height: 100%;
    border: solid 1px #1b1b1b;
  }
</style>
