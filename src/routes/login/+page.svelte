<!-- <!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { auth, db } from "$lib/firebase";
  import { collection, onSnapshot, getDocs } from "firebase/firestore";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import '@fontsource/geist-sans';
  import Google from "$lib/Google.svelte";

  const provider = new GoogleAuthProvider();

  function handleAuth() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        localStorage.setItem("userId", result.user.uid);
        console.assert("Logged in as ", result.user.uid);
      })
      .catch((error) => {})
      .finally(() => {
        console.info("Authenticated successfully");
        goto("/dashboard");
      });
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
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (localStorage.getItem('userId')) {
      goto('/dashboard');
    }
  });
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
          <Input id="email" type="email" placeholder={"Enter your email"} required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
          </div>
          <Input id="password" type="password" placeholder="************" required />
        </div>
        <Button type="submit" class="w-full font-semibold">Login with Email & Pass</Button>
        <Button variant="outline" class="w-full font-semibold gap-1" on:click={handleAuth}><Google />Login with Google</Button>
      </div>
      <div class=" text-center text-sm">
        Don&apos;t have an account?
        <a href="##" class="underline"> Sign up </a>
      </div>
      <div class="-mt-4 text-center text-sm underline">
        <a href="##">Forgot your password?</a>
      </div>
    </div>
  </div>
	<div class="e bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover opacity-100"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		></div>
		<!-- <div class="relative z-20 flex items-center text-lg font-medium">
			Acme Inc
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
          <div class="bg-black">
            <p class="text-2xl ">
              &ldquo;Scientifically designed to engage humans at a psychological level!&rdquo;
            </p>
          </div>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div> -->
	</div>
</div>

<style>
     .e{
    height: 100vh;
  }
</style>