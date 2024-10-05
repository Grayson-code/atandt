<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import SideNavBar from "../../lib/components/mine/SideNavBar.svelte";

  import { doc } from "firebase/firestore";
  import { db } from "$lib/firebase";

  import { fetchAndSyncEvents } from "$lib/fetchAndSyncDb";

  import DataTable from "./data-table.svelte";

  import Settings from "lucide-svelte/icons/settings-2";
  import ArrowRight from "lucide-svelte/icons/arrow-right";

  import { events } from "$lib/stores";

  export let data;

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
</script>

<body>
  <nav>
    <SideNavBar />
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

    <div class="week gap-5">
      <div class="weeklyInView rounded-lg flex-col flex gap-2">
        <div class="heading flex justify-between">
          <h1 class="items-end ml-5 mt-5 text-2xl font-bold">Weekly Review</h1>
          <h1 class="items-end mr-5 mt-6 text-2xl font-bold">
            <Settings></Settings>
          </h1>
        </div>
        <div class="weekDays flex ml-5 mr-5 justify-between">
          <div class="weekDay flex-col selected ">
            <span class="selected text-white ">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
          <div class="weekDay flex-col">
            <span class="text-zinc-600">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
          <div class="weekDay flex-col">
            <span class="text-zinc-600">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
          <div class="weekDay flex-col">
            <span class="text-zinc-600">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
          <div class="weekDay flex-col">
            <span class="text-zinc-600">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
          <div class="weekDay flex-col">
            <span class="text-zinc-600">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
          <div class="weekDay flex-col">
            <span class="text-zinc-600">Mon</span>
            <span class="text-lg font-bold">13</span>
          </div>
        </div>
        <div class="chosenEvent flex flex-1 m-5 mt-2 flex-col">
          <div class="topRow flex justify-between w-full">
            <span class="font-bold">Woj / Aleksi</span>
            <ArrowRight></ArrowRight>
          </div>
          <div class="time text-sm text-zinc-600">7:00-8:00</div>
          <div class="type mt-2 font-bold ">Exam</div>
        </div>
      </div>
      <div class="weeklyInView rounded-lg">e</div>
    </div>
    <div class="container mx-auto py-10">
      <DataTable {data} />
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
    border-top: none;
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
    border-top: none;
  }
  .worklog {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 2rem;
    width: 100%;
    border: solid 1px #1b1b1b;
    flex-basis: 5%;
    border-bottom: none;
    border-top: none;
  }
  .projects {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 2rem;
    width: 100%;
    border: solid 1px #1b1b1b;
    flex-basis: 5%;
    border-bottom: none;
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
    border-right: none;
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
  .worklog,
  .projects {
    transition-duration: 0.1s;
    border-right: none;
  }

  .account:hover,
  .dashboard:hover,
  .statistics:hover,
  .worklog:hover,
  .projects:hover {
    cursor: pointer;
    background-color: rgb(15, 15, 15);
  }
  .account:active,
  .dashboard:active,
  .statistics:active,
  .worklog:active,
  .projects:active {
    cursor: pointer;
    background-color: rgb(36, 36, 36);
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
    background-color: #0e0d0d;
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
  .marker1::marker {
    --tw-text-opacity: 1;
    color: rgb(52 211 153 / var(--tw-text-opacity));
  }
  .marker2::marker {
    --tw-text-opacity: 1;
    color: rgb(220 38 38 / var(--tw-text-opacity));
  }
  .marker3::marker {
    --tw-text-opacity: 1;
    color: rgb(136 25 53 / var(--tw-text-opacity)) /* #881337 */;
  }
  .animate-shine {
    background-size: 200% 100%;
    animation: shine 2s infinite linear;
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
  }
  .selected {
    background-color: #dc2626;
  }
  .type {
    text-align: justify
  }
  .chosenEvent {
    background-color: #080808;
    color: white;
    border-radius: 15px;
    padding: 15px;
  }
</style>
