<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Ski lessons in {data.resort.name} — LocalSnow</title>
  <meta
    name="description"
    content={`${data.resort.name} lesson discovery shell for LocalSnow Spain priority resort readiness.`}
  />
  <meta name="robots" content={data.robots} />
  <link rel="canonical" href={`/spain/${data.resort.slug}`} />
</svelte:head>

<main class="page" aria-labelledby="page-title">
  <p class="eyebrow">{data.region?.name ?? "Spain priority resort"}</p>
  <h1 id="page-title">{data.resort.name} lesson discovery shell.</h1>
  <p class="lede">{data.resort.summary}</p>

  <section class="readiness" aria-labelledby="readiness-title">
    <h2 id="readiness-title">Readiness, not fake supply</h2>
    <dl>
      <div>
        <dt>Readiness</dt>
        <dd>{data.resort.readiness}</dd>
      </div>
      <div>
        <dt>Coverage</dt>
        <dd>{data.resort.coverage}</dd>
      </div>
      <div>
        <dt>SEO policy</dt>
        <dd>{data.robots}</dd>
      </div>
    </dl>
    <p>{data.status}</p>
  </section>

  {#if data.resort.supplyInvitationVisible}
    <a class="button" href="/instructors/join"
      >Help LocalSnow source instructors here</a
    >
  {/if}
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

  h2 {
    margin-top: 0;
  }

  .lede,
  .readiness p,
  dd {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.75;
  }

  .readiness {
    max-width: 44rem;
    margin: 2rem 0;
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.25rem;
    padding: 1.25rem;
    background: rgba(15, 23, 42, 0.78);
  }

  dl {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
  }

  dt {
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  dd {
    margin: 0.2rem 0 0;
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
