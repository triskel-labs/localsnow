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
    <p class="eyebrow">Teach with LocalSnow</p>
    <h1 id="page-title">{data.promise.headline}</h1>
    <p class="lede">
      A simple professional presence for ski and snowboard lessons: more reach,
      less marketing work, and LocalSnow review before anything goes public.
    </p>
    <ul class="signals" aria-label="Provider promise signals">
      {#each data.signals as signal}
        <li>{signal}</li>
      {/each}
    </ul>
  </section>

  <section class="panel" aria-labelledby="paths-title">
    <p class="section-kicker">Profile path</p>
    <h2 id="paths-title">Start with the relationship</h2>
    <p class="section-copy">
      LocalSnow does not need fake marketplace categories. Pick the provider
      path, then capture only the facts needed for a useful reviewed profile.
    </p>

    <div class="cards">
      {#each data.pathCards as path}
        <article class="card">
          <p class="card-label">{path.label}</p>
          <h3>{path.headline}</h3>
          <p>{path.whoItFits}</p>
          <strong>{path.commercialRule}</strong>
        </article>
      {/each}
    </div>
  </section>

  <section class="panel" aria-labelledby="intake-title">
    <p class="section-kicker">Minimum intake</p>
    <h2 id="intake-title">Enough to review, not a full operating system</h2>
    <div class="cards compact">
      {#each data.intakeSummary as item}
        <article class="card">
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="panel boundary" aria-labelledby="draft-boundary-title">
    <p class="section-kicker">Draft boundary</p>
    <h2 id="draft-boundary-title">{data.draftBoundary.title}</h2>
    <p class="section-copy">{data.draftBoundary.description}</p>

    <div class="draft-layout">
      <article class="card">
        <p class="card-label">Example missing facts</p>
        <ul>
          {#each data.draftBoundary.missingRequiredFields as field}
            <li>{field}</li>
          {/each}
        </ul>
      </article>

      <div class="rules">
        {#each data.draftBoundary.rules as rule}
          <article class="rule">
            <span class:allowed={rule.decision.allowed}>
              {rule.decision.allowed ? "Allowed" : "Blocked"}
            </span>
            <div>
              <h3>{rule.title}</h3>
              <p>{rule.copy}</p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: clamp(1rem, 5vw, 4rem);
    background: linear-gradient(135deg, #07111f, #1e1b4b);
  }

  .hero,
  .panel {
    max-width: 72rem;
  }

  .eyebrow,
  .section-kicker,
  .card-label {
    color: #c4b5fd;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .section-kicker,
  .card-label {
    font-size: 0.75rem;
  }

  h1 {
    max-width: 15ch;
    margin: 0.75rem 0 1rem;
    font-size: clamp(2.5rem, 8vw, 5.75rem);
    line-height: 0.94;
    letter-spacing: -0.06em;
  }

  h2 {
    margin: 0.35rem 0 0.75rem;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1;
  }

  h3 {
    margin: 0.25rem 0 0.5rem;
    font-size: 1.15rem;
  }

  .lede,
  .section-copy,
  li,
  p,
  strong {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.05rem;
    line-height: 1.65;
  }

  strong {
    display: block;
    color: #ffffff;
  }

  .signals {
    display: grid;
    max-width: 48rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: 0.65rem;
    margin: 2rem 0 0;
    padding: 0;
    list-style: none;
  }

  .signals li,
  .rule {
    border: 1px solid rgb(255 255 255 / 0.12);
    border-radius: 999px;
    background: rgb(255 255 255 / 0.06);
  }

  .signals li {
    padding: 0.75rem 1rem;
  }

  .panel {
    margin-top: 3rem;
    padding: clamp(1rem, 3vw, 2rem);
    border: 1px solid rgb(255 255 255 / 0.14);
    border-radius: 1.5rem;
    background: rgb(15 23 42 / 0.62);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.25);
  }

  .cards,
  .draft-layout,
  .rules {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .cards,
  .draft-layout {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  }

  .compact {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
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

  .card ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  .rule {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.9rem;
    padding: 1rem;
    border-radius: 1.25rem;
  }

  .rule span {
    align-self: start;
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    background: #fecaca;
    color: #450a0a;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .rule span.allowed {
    background: #bbf7d0;
    color: #052e16;
  }

  .rule p {
    margin: 0;
  }
</style>
