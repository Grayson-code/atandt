<script>
  import "../app.css";
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
  injectAnalytics()
</script>

<title>Anemia</title>

{@render children?.()}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=New+Amsterdam&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
