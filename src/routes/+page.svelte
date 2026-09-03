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

<main class="shell" aria-labelledby="page-title">
  <section class="hero">
    <p class="eyebrow">LocalSnow public discovery</p>
    <h1 id="page-title">
      Ski and snowboard lessons with help when plans matter.
    </h1>
    <p class="lede">
      Browse requestable lesson options, start a self-managed inquiry, or use
      protected LocalSnow help when the trip needs a stronger guarantee.
    </p>
    <div class="actions" aria-label="Primary actions">
      <a class="button primary" href="/spain">Start lesson search</a>
      <a class="button secondary" href="/instructors/join"
        >Teach with LocalSnow</a
      >
    </div>
  </section>

  <section class="panel" aria-labelledby="priority-title">
    <p class="eyebrow">Spain first, worldwide later</p>
    <h2 id="priority-title">
      Index useful markets. Browse thin catalog pages without pretending they
      are ready.
    </h2>
    <div class="grid">
      {#each data.navigation as page}
        <a class="tile" href={page.href}>
          <span>{page.badge}</span>
          <strong>{page.label}</strong>
          <p>{page.summary}</p>
        </a>
      {/each}
    </div>
  </section>

  {#if data.catalogExample}
    <section class="policy" aria-labelledby="policy-title">
      <h2 id="policy-title">SEO policy seam</h2>
      <p>
        {data.catalogExample.label} exists as a browsable placeholder, but the central
        policy marks it as
        <code>{data.catalogExample.robots}</code>. Route existence alone does
        not decide indexability.
      </p>
    </section>
  {/if}
</main>

<style>
  .shell {
    display: grid;
    gap: 1.5rem;
    min-height: 100vh;
    padding: clamp(1rem, 4vw, 4rem);
    background:
      radial-gradient(
        circle at 10% 10%,
        rgba(125, 211, 252, 0.24),
        transparent 24rem
      ),
      radial-gradient(
        circle at 80% 0%,
        rgba(167, 139, 250, 0.18),
        transparent 24rem
      ),
      linear-gradient(135deg, #07111f, #0f172a 58%, #111827);
  }

  .hero,
  .panel,
  .policy {
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.5rem;
    background: rgba(15, 23, 42, 0.78);
    box-shadow: 0 2rem 5rem rgba(2, 6, 23, 0.3);
  }

  .hero {
    display: grid;
    gap: 1.25rem;
    padding: clamp(1.5rem, 6vw, 4rem);
  }

  .panel,
  .policy {
    padding: clamp(1.25rem, 4vw, 2rem);
  }

  .eyebrow {
    margin: 0;
    color: #7dd3fc;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    max-width: 13ch;
    font-size: clamp(2.8rem, 9vw, 6.75rem);
    line-height: 0.92;
    letter-spacing: -0.07em;
  }

  h2 {
    max-width: 34rem;
    font-size: clamp(1.6rem, 4vw, 3rem);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .lede,
  .policy p {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    line-height: 1.75;
  }

  .actions,
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .button,
  .tile {
    min-height: 44px;
    border-radius: 999px;
    text-decoration: none;
  }

  .button {
    display: inline-flex;
    align-items: center;
    padding: 0.85rem 1.1rem;
    font-weight: 800;
  }

  .primary {
    background: #f8fafc;
    color: #07111f;
  }

  .secondary {
    border: 1px solid rgba(248, 250, 252, 0.24);
    color: #f8fafc;
  }

  .grid {
    margin-top: 1.5rem;
  }

  .tile {
    flex: 1 1 14rem;
    display: grid;
    gap: 0.6rem;
    padding: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(2, 6, 23, 0.22);
  }

  .tile span {
    color: #7dd3fc;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .tile strong {
    font-size: 1.35rem;
  }

  .tile p {
    color: #cbd5e1;
    line-height: 1.6;
  }

  code {
    border-radius: 0.35rem;
    padding: 0.1rem 0.35rem;
    background: rgba(125, 211, 252, 0.14);
    color: #bae6fd;
  }
</style>
