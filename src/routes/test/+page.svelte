<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

	
<script lang="ts">
  import DataTable from "../dashboard/data-table.svelte";

  export let data
</script>
 //
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
  div {
    
  }
  .animate-shine {
    background-size: 200% 100%;
    animation: shine 1.5s infinite linear;
  }

  @keyframes shine {
    to {
      background-position: -200% 100%;
    }
  }
  *,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 110%;
  box-sizing: border-box;
  /* background-color: #202020; */
  background-color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lausanne", "Monument Extended", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto;
}

span {
  font-size: 4rem;
  color: white;
}
span::before {
  content: "";
  position: fixed;
  left: -10rem;
  z-index: 9999;
  top: -10rem;
  width: calc(100% + 20rem);
  height: calc(100% + 20rem);
  /* background-color: red; */
  background-image: url(noise.png);
  opacity: 0.65;
  pointer-events: none;
  animation: noise 1s steps(2) infinite;
}

@-webkit-keyframes noise {
  to {
    transform: translate3d(-7rem, 0, 0);
  }
}

@keyframes noise {
  0% {
    transform: translate3d(0, 9rem, 0);
  }

  10% {
    transform: translate3d(-1rem, -4rem, 0);
  }

  20% {
    transform: translate3d(-8rem, 2rem, 0);
  }

  30% {
    transform: translate3d(9rem, -9rem, 0);
  }

  40% {
    transform: translate3d(-2rem, 7rem, 0);
  }

  50% {
    transform: translate3d(-9rem, -4rem, 0);
  }

  60% {
    transform: translate3d(2rem, 6rem, 0);
  }

  70% {
    transform: translate3d(7rem, -8rem, 0);
  }

  80% {
    transform: translate3d(-9rem, 1rem, 0);
  }

  90% {
    transform: translate3d(6rem, -5rem, 0);
  }

  to {
    transform: translate3d(-7rem, 0, 0);
  }
}

</style>

