<!-- <script>
  import { Button } from "$lib/components/ui/button/";
  import { House } from "lucide-svelte";
  import { Target } from "lucide-svelte";
  import { Presentation } from "lucide-svelte";
  import { Users } from "lucide-svelte";
  import { History } from "lucide-svelte";
  import { CircleUser } from "lucide-svelte";
  import { Sparkle } from "lucide-svelte";
  import { ChevronRight } from "lucide-svelte";
</script>

<div class="body">
  <nav class="flex flex-col items-center gap-2 justify-between">
    <div class="nav1 flex flex-col items-center">
      <div class="logo my-10 bg-transparent">
        <Sparkle class="logo w-10 h-10" />
      </div>
      <div class="navIcons flex flex-col gap-10 border rounded-full">
        <div class="icons p-3 rounded-full">
          <House />
        </div>
        <div class="icons p-3 rounded-full">
          <Target />
        </div>
        <div class="bg-[#d1f561] p-3 rounded-full">
          <Presentation class="text-black" />
        </div>
        <div class="icons p-3 rounded-full">
          <Users />
        </div>
      </div>
    </div>
    <div class="accountIcons flex flex-col gap-5 border rounded-full mb-5">
      <div class="p-3 rounded-full">
        <History />
      </div>
      <div class="icons p-3 rounded-full">
        <CircleUser />
      </div>
    </div>
  </nav>
  <main class="flex">
    <div class="flex w-full text-black">
      <section
        class="projectOverview bg-[#e0e0e0] w-1/3 h-1/2 ml-10 mt-10 rounded-3xl flex flex-col"
      >
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold text-center mt-3 ml-6 justify-center">Project Overview</h1>
          <div class="flex mt-4 gap-2">
            <Button class="bg-transparent text-black border">This Week</Button>
            <Button class="bg-transparent" variant="outline" size="icon">
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div role="group" aria-labelledby="group-label" style="--v0: 55; --v1: 25; margin: 1em 0;">
          <div id="group-label">Total progress</div>
          <label for="prog0" data-ico="🏷️"><span>one</span></label>
          <progress id="prog0" value="55" max="100" list="ruler"></progress>
          <output for="prog0" data-suf="%">55</output>
          <label for="prog1" data-ico="🚀"><span>two</span></label>
          <progress id="prog1" value="25" max="100" list="ruler"></progress>
          <output for="prog1" data-suf="%">25</output>
          <datalist id="ruler">
            <option value="0" label="0%"></option>
            <option value="100" label="100%"></option>
          </datalist>
        </div>
      </section>
      <section class="projectTasks">e</section>
    </div>
  </main>
</div>

<style>
  * {
    font: inherit;
  }

  html, body, [role='group'], [for], [id='ruler'] {
    display: grid;
  }

  html {
    min-height: 100%;
  }

  body {
    background: #ededed;
  }

  [role='group'] {
    grid-gap: .5em;
    place-self: center;
    container-type: inline-size;
    margin: 0 auto;
    width: Min(40em, 100%);
    color: #323232;
    font: 500 1em roboto, sans-serif;
  }

  [role='group']::before, progress {
    grid-area: 3 / 1;
    border-radius: 5px;
  }

  [role='group']::before {
    background: repeating-linear-gradient(-45deg, #dadada 0 .375em, #0000 0 .75em);
    content: '';
  }

  [id='group-label'] {
    grid-area: 2 / 1;
  }

  :is([for], progress):nth-of-type(1) {
    --v: var(--v0);
  }

  :is([for], progress):nth-of-type(2) {
    --v: var(--v1);
  }

  [for] {
    justify-self: start;
    translate: calc(var(--v) * 1cqi - 50%);
  }

  label {
    grid-area: 1 / 1 / span 3;
    grid-template-rows: subgrid;
    justify-items: center;
    color: #0000;
    pointer-events: none;
  }

  label span {
    grid-area: 1 / 1;
    width: 2em;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
  }

  label::before {
    grid-row: 2 / span 2;
    width: 6px;
    background: radial-gradient(3px at 50% 3px, currentcolor 2px, #0000),
                linear-gradient(#0000 3px, currentcolor 0) 50% / 2px no-repeat;
    color: #bfbfbf;
    content: '';
  }

  label::after {
    grid-area: 1 / 1;
    align-self: center;
    background: #616161;
    content: attr(data-ico);
  }

  progress {
    --bg: #d0cce5;
    overflow: hidden;
    width: 100%;
    background: none;
  }

  progress::-webkit-progress-bar {
    background: none;
  }

  progress::-webkit-progress-value {
    background: var(--bg);
  }

  progress::-moz-progress-bar {
    background: var(--bg);
  }

  progress:nth-of-type(2) {
    --bg: #aca7c9;
  }

  output, [id='ruler'] {
    grid-area: 4 / 1;
  }

  output {
    grid-auto-flow: column;
  }

  output::after {
    color: #c7c7c7;
    content: attr(data-suf);
  }

  [id='ruler'] {
    grid-template-columns: repeat(2, max-content);
    justify-content: space-between;
    color: #bebebe;
  }

  .body {
    display: flex;
    flex-direction: row;
    font-family: "Roboto", sans-serif;
    margin: 0;
    height: 100vh;
    background-color: #0a0a0a;
  }

  nav {
    flex: 10%;
  }

  main {
    flex: 90%;
  }

  .navIcons {
    background-color: #262e2c;
  }

  .icons {
    transition: background-color 0.2s;
    background-color: #3b4643;
  }

  .icons:hover {
    background-color: #475350;
    cursor: pointer;
  }

  .icons:active {
    background-color: #667572;
  }

  .sparkle-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.2);
  }
</style> -->
<script>
  // You can add any necessary script here
</script>

<style>
  .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
  }

  h1 {
      font-size: 3rem;
      color: #f1f1f1;
  }

  p {
      font-size: 1.5rem;
      color: #666;
  }
</style>
<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</svelte:head>
<div class="container">


  <h1 class="animate__animated animate__bounce">Under Construction</h1>
  <p>We are working hard to bring you this page. Stay tuned!</p>
</div>