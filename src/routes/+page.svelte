<script>
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label/";
  import {Button} from "$lib/components/ui/button";
  import Rocket from "lucide-svelte/icons/rocket";

  import { toast } from "svelte-sonner";
  let email = "";
  async function handleClick() {
    const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      toast.success("Subscribed successfully");
      email = "";
    } else {
      toast.error("Failed to subscribe");
    }    
  }
</script>

<main>
  <!-- Create a early access mailing thing -->
  <div  class="flex flex-col items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center gap-1">
      <div class="flex items-center">
        <h1 class="text-4xl font-bold">Early Access Request</h1>
        <Rocket class="h-8 w-8 ml-2 mt-1 text-red-500" />
      </div>

      <form method="POST" class="flex w-full max-w-sm items-center space-x-2 mt-1">
        <input name="email" type="email" placeholder="user@example.com" class="bg-inherit border rounded-md p-1 pl-2 pb-2 w-full"/>
        <Button type="submit" >Subscribe</Button>
      </form>
      <p class="text-center w-1/2 mt-2">
        Enter your email to join our mailing list to be the first ones to know
        on website launch.
      </p>
    </div>
  </div>
</main>

<style>
</style>
