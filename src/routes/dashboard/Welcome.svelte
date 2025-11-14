<script lang="ts">
  import SideNavBar from "../../lib/components/mine/SideNavBar.svelte";

  import { doc } from "firebase/firestore";
  import { db } from "$lib/firebase";

  import { fetchAndSyncEvents } from "$lib/fetchAndSyncDb";

  import DataTable from "./data-table.svelte";

  import Settings from "lucide-svelte/icons/settings-2";
  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import Flame from "lucide-svelte/icons/flame";

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

  let onBoardingNumberColor = $state();

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
    format
  } from "date-fns";

  let today = startOfToday();
  const currentMonth = today.getMonth();
  // // the month which is currently being viewed
  let viewMonth = today.getMonth()
  const currentYear = today.getFullYear();
  let viewYear = today.getFullYear();

  // a Function that returns an array of 35 elements which starts from the starting date
  // of the week of the month and ends at the end of the week of the month
  // if confused just console log `days` and you'll understand.
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(new Date(viewYear, viewMonth, 1))),
    end: endOfWeek(endOfMonth(new Date(viewYear, viewMonth))),
  });
  console.log(days);
</script>

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

<style>


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
    background: linear-gradient(110deg, #939393 45%, #1e2631 55%, #939393);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shine 3s infinite linear;
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
    flex: 2
  }
</style>

