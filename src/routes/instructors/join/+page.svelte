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
  <p class="eyebrow">Instructor supply invitation</p>
  <h1 id="page-title">
    Get lesson demand without adopting a heavy booking system.
  </h1>
  <p class="lede">
    LocalSnow starts with lightweight, requestable supply signals. Instructors
    should not need a full calendar sync or school admin platform to join v1.
  </p>

  <section aria-labelledby="signals-title">
    <h2 id="signals-title">Early signals LocalSnow will need</h2>
    <ul>
      {#each data.signals as signal}
        <li>{signal}</li>
      {/each}
    </ul>
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: clamp(1rem, 5vw, 4rem);
    background: linear-gradient(135deg, #07111f, #1e1b4b);
  }

  .eyebrow {
    color: #c4b5fd;
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

  .lede,
  li {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.75;
  }
</style>
