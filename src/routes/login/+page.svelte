<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
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

<button on:click={handleLogout}>Logout</button>
