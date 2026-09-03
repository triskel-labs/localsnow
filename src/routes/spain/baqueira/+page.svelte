<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  {#if data.page}
    <title>{data.page.title}</title>
    <meta name="description" content={data.page.description} />
    <meta name="robots" content={data.page.robots} />
    <link rel="canonical" href={data.page.canonicalPath} />
  {/if}
</svelte:head>

<main class="page" aria-labelledby="page-title">
  <p class="eyebrow">Baqueira priority shell</p>
  <h1 id="page-title">
    Baqueira lesson discovery without fake live availability.
  </h1>
  <p class="lede">
    This page can become useful early because Baqueira is a Spain priority
    market. It is a shell only: no real supply, pricing or availability engine
    yet.
  </p>

  <ul>
    {#each data.facts as fact}
      <li>{fact}</li>
    {/each}
  </ul>

  <a class="button" href="/instructors/join">Invite Baqueira instructors</a>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: clamp(1rem, 5vw, 4rem);
    background: linear-gradient(135deg, #07111f, #172554);
  }

  .eyebrow {
    color: #7dd3fc;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 14ch;
    margin: 0.75rem 0 1rem;
    font-size: clamp(2.5rem, 8vw, 5.75rem);
    line-height: 0.94;
    letter-spacing: -0.06em;
  }

  .lede {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.75;
  }

  ul {
    display: grid;
    gap: 0.75rem;
    max-width: 44rem;
    margin: 2rem 0;
    padding-left: 1.25rem;
    color: #e2e8f0;
  }

  .button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    border-radius: 999px;
    padding: 0.85rem 1.1rem;
    background: #f8fafc;
    color: #07111f;
    font-weight: 800;
    text-decoration: none;
  }
</style>
