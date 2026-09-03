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
  <p class="eyebrow">Spain priority market</p>
  <h1 id="page-title">
    Ski lessons in Spain, starting where LocalSnow can actually build supply.
  </h1>
  <p class="lede">
    Spain is the first market for supply, trust and conversion. LocalSnow can
    stay worldwide-browsable later without indexing thin pages before they are
    useful.
  </p>

  <section aria-labelledby="resorts-title">
    <h2 id="resorts-title">Priority resort structure</h2>
    <div class="cards">
      {#each data.priorityResorts as resort}
        <a class="card" href={resort.href}>
          <strong>{resort.name}</strong>
          <span>{resort.status}</span>
        </a>
      {/each}
    </div>
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: clamp(1rem, 5vw, 4rem);
    background: #07111f;
  }

  .eyebrow,
  .card span {
    color: #7dd3fc;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 15ch;
    margin: 0.75rem 0 1rem;
    font-size: clamp(2.5rem, 8vw, 5.75rem);
    line-height: 0.94;
    letter-spacing: -0.06em;
  }

  h2 {
    margin-top: 3rem;
  }

  .lede {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.75;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 1rem;
  }

  .card {
    display: grid;
    gap: 0.75rem;
    min-height: 8rem;
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.25rem;
    padding: 1.25rem;
    background: rgba(15, 23, 42, 0.78);
    color: inherit;
    text-decoration: none;
  }

  .card strong {
    font-size: 1.5rem;
  }
</style>
