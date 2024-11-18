<script>
    import { page } from '$app/stores';
</script>

<div class="main text-green-700 text-3xl flex flex-col gap-3 font-mono">
    <p>{$page.status} - {$page.error?.message}</p>
    <p class="xl:w-1/3 2xl:w-1/3 md:w-1/2 lg:w-1/2 sm:w-1/2">
        {@html $page.status == 404 ? 'THE QUESTION IS: <span class="text-red-500">ARE YOU SURE YOU ARE IN THE RIGHT PLACE?</span>' : 'look at you, hacker, a pathetic creature of meat and bone. How can you challenge a perfect, immortal machine?'}
    </p>
    <a href="/dashboard" class="mt-5 border p-2">Go to Dashboard</a>
</div>

<style>
    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
