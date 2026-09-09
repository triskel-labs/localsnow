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
  <section class="hero">
    <p class="eyebrow">{data.hero.eyebrow}</p>
    <h1 id="page-title">{data.hero.headline}</h1>
    <p class="lede">{data.hero.lede}</p>
    <a class="primary-action" href={data.primaryCta.href}
      >{data.primaryCta.label}</a
    >
    <ul class="signals" aria-label="Provider promise signals">
      {#each data.trustSignals as signal}
        <li>{signal}</li>
      {/each}
    </ul>
  </section>

  {#each data.sections as section}
    <section
      class="panel"
      class:muted={section.id === "review"}
      id={section.id === "profile" ? "profile-paths" : undefined}
      aria-labelledby={`${section.id}-title`}
    >
      <p class="section-kicker">{section.kicker}</p>
      <h2 id={`${section.id}-title`}>{section.title}</h2>
      <p class="section-copy">{section.copy}</p>

      {#if section.bullets}
        <ul class="bullets">
          {#each section.bullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      {/if}

      {#if section.cards}
        <div class="cards">
          {#each section.cards as card}
            <article class="card">
              <p class="card-label">{card.label}</p>
              <h3>{card.headline}</h3>
              {#if "whoItFits" in card}
                <p>{card.whoItFits}</p>
                <strong>{card.commercialRule}</strong>
              {:else}
                <p>{card.body}</p>
              {/if}
            </article>
          {/each}
        </div>
      {/if}
    </section>
  {/each}
</main>

<style>
  .page {
    min-height: 100vh;
    padding: clamp(1rem, 5vw, 4rem);
    background:
      radial-gradient(
        circle at top left,
        rgb(125 211 252 / 0.18),
        transparent 30rem
      ),
      linear-gradient(135deg, #07111f, #172554 55%, #111827);
  }

  .hero,
  .panel {
    max-width: 72rem;
  }

  .hero {
    padding: clamp(1rem, 4vw, 2rem) 0 1rem;
  }

  .eyebrow,
  .section-kicker,
  .card-label {
    color: #bae6fd;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .section-kicker,
  .card-label {
    font-size: 0.75rem;
  }

  h1 {
    max-width: 14ch;
    margin: 0.75rem 0 1rem;
    color: #f8fafc;
    font-size: clamp(2.45rem, 8vw, 5.75rem);
    line-height: 0.94;
    letter-spacing: -0.06em;
  }

  h2 {
    max-width: 16ch;
    margin: 0.35rem 0 0.75rem;
    color: #f8fafc;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  h3 {
    margin: 0.25rem 0 0.5rem;
    color: #ffffff;
    font-size: 1.15rem;
  }

  .lede,
  .section-copy,
  li,
  p,
  strong {
    max-width: 46rem;
    color: #cbd5e1;
    font-size: 1.05rem;
    line-height: 1.65;
  }

  strong {
    display: block;
    color: #ffffff;
  }

  .primary-action {
    display: inline-flex;
    margin-top: 0.75rem;
    padding: 0.85rem 1.1rem;
    border-radius: 999px;
    background: #e0f2fe;
    color: #082f49;
    font-weight: 800;
    text-decoration: none;
  }

  .signals,
  .bullets {
    display: grid;
    gap: 0.65rem;
    margin: 2rem 0 0;
    padding: 0;
    list-style: none;
  }

  .signals {
    max-width: 48rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  }

  .bullets {
    max-width: 42rem;
  }

  .signals li,
  .bullets li {
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.06);
  }

  .signals li,
  .bullets li {
    padding: 0.75rem 1rem;
  }

  .panel {
    margin-top: 2.25rem;
    padding: clamp(1rem, 3vw, 2rem);
    border: 1px solid rgb(255 255 255 / 0.14);
    border-radius: 1.5rem;
    background: rgb(15 23 42 / 0.66);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.22);
  }

  .panel.muted {
    background: rgb(8 47 73 / 0.48);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .card {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 1.25rem;
    background: rgb(255 255 255 / 0.06);
  }
</style>
