<!--
 Copyright (c) 2024 Adwaith
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import agricultureQA from '$lib/data/agriculture_qa.json';
  import printQA from '$lib/data/print_qa.json';
  import reproductionQA from '$lib/data/reproduction_qa.json';

  let currentIndex = 0;
  let showAnswer = false;
  let flashcards: any = [];
  let selectedSubject = 'agriculture';

  const subjects: { [key: string]: { question: string; answer: string; }[] } = {
    agriculture: agricultureQA,
    print: printQA,
    reproduction: reproductionQA
  };

  onMount(() => {
    loadFlashcards(selectedSubject);
  });

  function loadFlashcards(subject: string) {
    flashcards = subjects[subject as keyof typeof subjects];
    currentIndex = 0;
    showAnswer = false;
  }

  function nextCard() {
    if (currentIndex < flashcards.length - 1) {
      currentIndex++;
      showAnswer = false;
    }
  }

  function prevCard() {
    if (currentIndex > 0) {
      currentIndex--;
      showAnswer = false;
    }
  }

  function toggleAnswer() {
    showAnswer = !showAnswer;
  }

  function formatText(text: any) {
    const lines = text.split('\n');
    return lines.map((line: any) => {
      if (line.startsWith('(a)') || line.startsWith('(b)') || line.startsWith('(c)') || line.startsWith('(d)')) {
        return `<li>${line}</li>`;
      } else {
        return `<p>${line}</p>`;
      }
    }).join('');
  }
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

  .flashcard {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 600px;
    width: 100%;
    margin: 20px;
    cursor: pointer;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }


  p {
    font-size: 1.5rem;
    color: #000000;
  }

  .question {
    font-weight: bold;
  }

  .answer {
    color: #000000;
  }


  select {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 1rem;
  }
</style>
<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</svelte:head>
<div class="container">
  <select bind:value={selectedSubject} on:change={() => loadFlashcards(selectedSubject)} class="text-black">
    <option value="agriculture">Agriculture</option>
    <option value="print">Print</option>
    <option value="reproduction">Reproduction</option>
  </select>

  {#if flashcards.length > 0}
    <div class="flashcard" role="button" tabindex="0" on:click={toggleAnswer} on:keydown={(e) => e.key === 'Enter' && toggleAnswer()}>
      {#if showAnswer}
        <p class="answer">{@html formatText(flashcards[currentIndex].answer)}</p>
      {:else}
        <p class="question">{@html formatText(flashcards[currentIndex].question)}</p>
      {/if}
    </div>
    <div class="controls">
      <button on:click={prevCard} disabled={currentIndex === 0}>Previous</button>
      <button on:click={nextCard} disabled={currentIndex === flashcards.length - 1}>Next</button>
    </div>
  {:else}
    <p>Loading flashcards...</p>
  {/if}
  <h1 class="mt-5">Click or tap on the card to reveal the answers!</h1>
</div>