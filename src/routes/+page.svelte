<script lang="ts">
  import { b0Foundation } from '$lib/foundation';
</script>

<main class="shell" aria-labelledby="page-title">
  <section class="card">
    <p class="eyebrow">{b0Foundation.id}</p>
    <h1 id="page-title">LocalSnow technical foundation</h1>
    <p class="lede">
      This scaffold proves the app can install, typecheck, test and build before product slices start.
    </p>
    <dl>
      <div>
        <dt>Current slice</dt>
        <dd>{b0Foundation.title}</dd>
      </div>
      <div>
        <dt>Product scope</dt>
        <dd>No booking, pricing, payment, availability or public directory features yet.</dd>
      </div>
    </dl>
  </section>
</main>

<style>
  .shell {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
    background:
      radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.28), transparent 30rem),
      linear-gradient(135deg, #07111f, #0f172a 55%, #111827);
  }

  .card {
    width: min(100%, 42rem);
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.5rem;
    padding: clamp(1.5rem, 5vw, 3rem);
    background: rgba(15, 23, 42, 0.78);
    box-shadow: 0 2rem 5rem rgba(2, 6, 23, 0.35);
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    color: #7dd3fc;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.25rem, 7vw, 4.75rem);
    line-height: 0.95;
  }

  .lede {
    margin: 1.5rem 0 2rem;
    max-width: 34rem;
    color: #cbd5e1;
    font-size: 1.125rem;
    line-height: 1.7;
  }

  dl {
    display: grid;
    gap: 1rem;
    margin: 0;
  }

  dt {
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  dd {
    margin: 0.25rem 0 0;
    color: #f8fafc;
  }
</style>
