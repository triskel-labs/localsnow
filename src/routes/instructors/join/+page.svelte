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
  <h1 id="page-title">{data.promise.headline}</h1>
  <p class="lede">
    You know visibility matters, but filming yourself, exposing your life online
    or gambling on a generic marketing agency is not the only path. LocalSnow is
    a specialized space where snowsports professionals live and clients look for
    lessons.
  </p>

  <section class="panel" aria-labelledby="signals-title">
    <p class="section-kicker">Why this exists</p>
    <h2 id="signals-title">Simple setup, useful reach</h2>
    <ul class="signals">
      {#each data.signals as signal}
        <li>{signal}</li>
      {/each}
    </ul>
  </section>

  <section class="panel" aria-labelledby="paths-title">
    <p class="section-kicker">Profile setup paths</p>
    <h2 id="paths-title">Choose the relationship first, not a fake category</h2>
    <p class="section-copy">
      LocalSnow only needs two v1 profile kinds: independent instructors and
      schools. Instructors inside a school can still have a public profile, but
      the school owns the services and prices by default.
    </p>

    <div class="cards">
      {#each data.setupGuide.paths as path}
        <article class="card">
          <p class="card-label">{path.label}</p>
          <h3>{path.headline}</h3>
          <p>{path.whoItFits}</p>
          <strong>{path.commercialRule}</strong>
          <div>
            <p class="mini-title">Minimum facts</p>
            <ul>
              {#each path.requiredFacts as fact}
                <li>{fact}</li>
              {/each}
            </ul>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="panel boundary" aria-labelledby="boundary-title">
    <p class="section-kicker">B3.2 boundary</p>
    <h2 id="boundary-title">This is still a no-persistence setup surface</h2>
    <div class="boundary-grid">
      <div>
        <h3>Included</h3>
        <ul>
          {#each data.setupGuide.boundaries.included as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
      <div>
        <h3>Not included yet</h3>
        <ul>
          {#each data.setupGuide.boundaries.notIncluded as item}
            <li>{item}</li>
          {/each}
        </ul>
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

  .eyebrow,
  .section-kicker,
  .card-label,
  .mini-title {
    color: #c4b5fd;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .section-kicker,
  .card-label,
  .mini-title {
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
    margin: 0.25rem 0 0.75rem;
    font-size: 1.2rem;
  }

  .lede,
  .section-copy,
  li,
  .card p,
  strong {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.05rem;
    line-height: 1.7;
  }

  strong {
    display: block;
    color: #ffffff;
  }

  .panel {
    max-width: 72rem;
    margin-top: 3rem;
    padding: clamp(1rem, 3vw, 2rem);
    border: 1px solid rgb(255 255 255 / 0.14);
    border-radius: 1.5rem;
    background: rgb(15 23 42 / 0.62);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.25);
  }

  .signals,
  .card ul,
  .boundary ul {
    margin: 1rem 0 0;
    padding-left: 1.25rem;
  }

  .cards,
  .boundary-grid {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .cards {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  }

  .boundary-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
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
