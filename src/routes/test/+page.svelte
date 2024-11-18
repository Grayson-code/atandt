<script lang="ts">
  import DataTable from "../dashboard/data-table.svelte";

  export let data;
</script>

<div role="group" aria-labelledby="group-label" style="--v0: 55; --v1: 25">
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
    color: #b85656;
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
</style>