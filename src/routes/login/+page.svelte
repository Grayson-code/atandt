<!-- <!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<!-- <script lang="ts">
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { auth, db } from "$lib/firebase";
  import { collection, onSnapshot, getDocs } from "firebase/firestore";

  const provider = new GoogleAuthProvider();

  function handleAuth() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        localStorage.setItem("userId", result.user.uid);
      })
      .catch((error) => {});
  }
  const eventsCollection = collection(db, "events");
  // handleLogout
  function handleLogout() {
    localStorage.removeItem("userId");
  }

  async function handleStuff() {
    const snapshot = await getDocs(eventsCollection);
    console.log(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }
</script>

<div>
  <h1>Login</h1>
  <button on:click={handleAuth}>Login with Google</button>
  <button on:click={handleStuff}>EE</button>
</div>

<button on:click={handleLogout}>Logout</button> -->


<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import '@fontsource/geist-sans';
</script>
<div class={`w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]`}>
  <div class="flex items-center justify-center py-12">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-muted-foreground text-balance">
          We recommend that you use google to login.
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="user@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="##" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="************" required />
        </div>
        <Button type="submit" class="w-full">Login</Button>
        <Button variant="outline" class="w-full">Login with Google</Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <a href="##" class="underline"> Sign up </a>
      </div>
    </div>
  </div>
  <div class="bg-muted hidden lg:block">
    <img
      src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
      alt="placeholder"
      width="1920"
      height="1080"
      class="e h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    />
  </div>
</div>

<style>
     .e{
    height: 100vh;
  }
</style>