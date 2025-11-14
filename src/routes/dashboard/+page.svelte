<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import Welcome from "./Welcome.svelte";

  import SideNavBar from "../../lib/components/mine/SideNavBar.svelte";

  import { doc } from "firebase/firestore";
  import { db } from "$lib/firebase";

  import { fetchAndSyncEvents } from "$lib/fetchAndSyncDb";

  import DataTable from "./data-table.svelte";

  import Settings from "lucide-svelte/icons/settings-2";
  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import Inspiration from "lucide-svelte/icons/flame";

  import { events } from "$lib/stores";


  const docRef = doc(db, "events", "TMxwwjtGPQdvIYUQcA4H");
  // fetches the events{assignments, tp's, etc} from the database as soon as the DOM is loaded

  /**
   * ! FOR DEVELOPMENT PURPOSES ONLY HAVE I COMMENTED THIS OUT
   */
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

  const next20Days = getNext20Days();

  let onBoardingNumberColor;

  if ($events.length < 5) {
    onBoardingNumberColor = "text-green-500";
  } else if ($events.length < 10) {
    onBoardingNumberColor = "text-yellow-500";
  } else {
    onBoardingNumberColor = "text-red-500";
  }
  // Calendar logic
  import {
    startOfToday,
    parse,
    eachDayOfInterval,
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    format,
  } from "date-fns";
  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  let today = startOfToday();
  const currentMonth = today.getMonth();
  // // the month which is currently being viewed
  let viewMonth = today.getMonth();
  const currentYear = today.getFullYear();
  let viewYear = today.getFullYear();

  // a Function that returns the days of the current week
  let weeklist = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });

  function isToday(day: Date): boolean {
    return day.toDateString() === today.toDateString();
  }

  // a Function that returns an array of 35 elements which starts from the starting date
  // of the week of the month and ends at the end of the week of the month
  // if confused just console log `days` and you'll understand.
  // let days = eachDayOfInterval({
  //   start: startOfWeek(startOfMonth(new Date(viewYear, viewMonth, 1))),
  //   end: endOfWeek(endOfMonth(new Date(viewYear, viewMonth))),
  // });
  // console.log(days);
</script>

<body>
  <nav>
    <SideNavBar />
  </nav>
  <main class="flex flex-col w-full">
    <Welcome ></Welcome>

    <div class="week gap-5">
      <div class="weeklyInView rounded-lg flex-col flex gap-2">
        <div class="heading flex justify-between">
          <h1 class="items-end ml-5 mt-5 text-2xl font-bold">Weekly Review</h1>
          <h1 class="items-end mr-5 mt-6 text-2xl font-bold">
            <Settings></Settings>
          </h1>
        </div>
        <div class="weekDays flex ml-5 mr-5 justify-between">
          <div class="flex ">
            {#each weeklist as day}
            <div class="weekDay flex-col {isToday(day) ? 'selected' : ''} ">
              <span class=" {isToday(day) ? 'text-white' : 'text-zinc-500'}">{day.toLocaleDateString('en-US', { weekday: 'long' })}</span>
              <span class="text-lg font-bold">{day.getDate()}</span>
            </div>
            {/each}
          </div>
        </div>
        <div class="chosenEvent flex flex-1 m-5 mt-2 flex-col">
          <div class="topRow flex justify-between w-full">
            <span class="font-bold">Woj / Aleksi</span>
            <ArrowRight></ArrowRight>
          </div>
          <div class="time text-sm text-zinc-600">7:00-8:00</div>
          <div class="type mt-2 font-bold">Exam</div>
        </div>
      </div>
      <div class="weeklyInView rounded-lg flex gap-2 justify-center flex-col">
        <div
          class="streamDays flex justify-evenly items-center text-6xl animate-shine-orange font-bold"
        >
          <div class="flex flex-col">
            <span>32</span>
            <span class="text-lg font-light">days of working out</span>
          </div>
          <div class="flex flex-col">
            <span>1</span>
            <span class="text-lg font-light">day of healthy eating</span>
          </div>
          <div class="flex flex-col">
            <span>32</span>
            <span class="text-lg font-light">free from instagram</span>
          </div>
        </div>
        <div
          class="streakinfo flex-1 text-2xl text-green-500 font-bold flex justify-center"
        >
          Streak <Inspiration class="mt-1 ml-1 text-red-500" />
        </div>
      </div>
    </div>
    <div class="container mx-auto py-10 w-1/2">
      <!-- Waiting for a more stable day to work on this shitty table-->
      <!-- <DataTable {data} /> -->
    </div>
  </main>
</body>

<style>

  /* TODO:  ADD SMOOTH SCROLL*/
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


  .week {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-basis: 26%;
    width: 100%;
    height: 100%;
  }


  .animate-shine-orange {
    background: linear-gradient(110deg, #c31432 45%, #32104b 55%, #c31432);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shine 5s infinite linear;
  }

  @keyframes shine {
    to {
      background-position: -200% 100%;
    }
  }
  .weeklyInView {
    width: 40%;
    border: solid 1px #1b1b1b;
    height: 100%;
  }
  .weekDays {
    flex: 1;
  }

  .chosenEvent {
    flex: 2;
  }
  .weekDay {
    display: flex;
    border-radius: 15px;
    padding: 10px;
    align-items: stretch;
    text-align: center;
    transition: background-color 0.3s;
  }

  .weekDay:hover {
    background-color: #1b1b1b;
    cursor: pointer;
  }

  .selected {
    background-color: #dc2626;
  }
  .type {
    text-align: justify;
  }
  .chosenEvent {
    background-color: #080808;
    color: white;
    border-radius: 15px;
    padding: 15px;
  }
  .streamDays {
    flex: 2;
  }
</style>
