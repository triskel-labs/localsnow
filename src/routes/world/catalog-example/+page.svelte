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
  <p class="eyebrow">Catalog-only example</p>
  <h1 id="page-title">Browsable does not always mean indexable.</h1>
  <p class="lede">
    This route exists to prove the B1 SEO seam: worldwide catalog pages can be
    usable for browsing while the central policy keeps thin pages out of the
    index.
  </p>
  <p class="robots">Robots policy: <code>{data.page?.robots}</code></p>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: clamp(1rem, 5vw, 4rem);
    background: linear-gradient(135deg, #07111f, #312e81);
  }

  .eyebrow {
    color: #a5b4fc;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 13ch;
    margin: 0.75rem 0 1rem;
    font-size: clamp(2.5rem, 8vw, 5.75rem);
    line-height: 0.94;
    letter-spacing: -0.06em;
  }

  .lede,
  .robots {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.75;
  }

  code {
    border-radius: 0.35rem;
    padding: 0.1rem 0.35rem;
    background: rgba(165, 180, 252, 0.14);
    color: #c7d2fe;
  }
</style>
