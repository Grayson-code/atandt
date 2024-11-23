<script lang="ts">
  import { onMount } from "svelte";

  import LibraryBig from "lucide-svelte/icons/library-big";
  import Gauge from "lucide-svelte/icons/gauge";
  import ChartLine from "lucide-svelte/icons/chart-line";
  import ListCheck from "lucide-svelte/icons/list-check";
  import Account from "lucide-svelte/icons/circle-user";

  import Target from "lucide-svelte/icons/target";

  import { tweened } from "svelte/motion";
  import { expoOut } from "svelte/easing";
  import { derived } from "svelte/store";

  const progress = tweened(0, {
    duration: 5000,
    easing: expoOut,
  });
  progress.set(80);
  const roundedProgress = derived(progress, ($progress) =>
    Math.round($progress)
  );
  const leftProgress = tweened(0, {
    duration: 3000,
    easing: expoOut,
  });
  leftProgress.set(20);
  const roundedLeftProgress = derived(leftProgress, ($leftProgress) =>
    Math.round($leftProgress)
  );

  const hoursWorked = tweened(0, {
    duration: 3000,
    easing: expoOut,
  });
  hoursWorked.set(27);
  const roundedHoursWorked = derived(hoursWorked, ($hoursWorked) =>
    Math.round($hoursWorked)
  );

  let animateClass = "";

  onMount(() => {
    setTimeout(() => {
      animateClass = "animate-shine";
    }, 2000);
  });
</script>

<strong
  ><LibraryBig class="w-11 h-11" /><span class="title">Endurance</span></strong
>
<div class="anotherempty"></div>
<a href="/dashboard" class="dashboard mt-10"><Gauge class="mr-2" />Dashboard</a>
<a href="/statistics" class="statistics"><ChartLine class="mr-2" />Statistics</a>
<a href="/work" class="worklog"><ListCheck class="mr-2" />Work Log</a>
<a href="/projects" class="projects"><Target class="mr-2" />Projects</a>
<div class="day w-full">
  <div class="custom-list flex flex-col space-y-4 h-full ml-6 py-10">
    <div class="flex items-center space-x-2 flex-1 ml-2 shadow">
      <svg
        class="text-green-500 marker1 w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="6" />
      </svg>
      <span
        class="text-6xl font-black inline-flex {animateClass} bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text"
        >{$roundedProgress}%</span
      >
      <span class="font-bold text-[#60606b]">Completed</span>
    </div>
    <div class="flex items-center space-x-2 flex-1 ml-2 shadow">
      <svg
        class="text-[#dc2626] marker2 w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="6" />
      </svg>
      <span
        class="font-black text-6xl inline-flex {animateClass} bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text"
        >{$roundedLeftProgress}%</span
      >
      <span class="font-bold text-[#60606b]">Left</span>
    </div>
    <div class="flex items-center space-x-2 flex-1 m-0 ml-2 shadow">
      <svg
        class="text-orange-500 marker3 w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="6" />
      </svg>
      <span
        class="font-black text-6xl inline-flex {animateClass} bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text"
        >{$roundedHoursWorked}</span
      >
      <span class="font-bold text-[#60606b]">Hours worked</span>
    </div>
  </div>
</div>
<a href="/account" class="account"><Account class="mr-2" />Account</a>

<style>


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
    border-top: none;
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
  .shadow {
    text-shadow: 0 0 115px rgb(100, 100, 100);
  }

  @keyframes shine {
    to {
      background-position: -200% 100%;
    }
  }
</style>
