<script>
  import { House } from "lucide-svelte";
  import { Target } from "lucide-svelte";
  import { Presentation } from "lucide-svelte";
  import { Users } from "lucide-svelte";
  import { History } from "lucide-svelte";
  import { CircleUser } from "lucide-svelte";
  import { Sparkle } from "lucide-svelte";
</script>

  <nav class="flex flex-col items-center gap-2 justify-between">
    <div class="nav1 flex flex-col items-center">
      <div class="logo my-10 sparkle-shadow rounded-full">
        <Sparkle class="logo w-10 h-10 sparkle-shadow" />
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

<style>
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
</style>

