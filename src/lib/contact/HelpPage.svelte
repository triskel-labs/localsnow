<script lang="ts">
  import type { HelpPageData } from "./helpPageData";

  type HelpActionData = {
    ok?: boolean;
    message?: string;
    request?: { whatsappUrl?: string };
    fieldErrors?: Record<string, string>;
    values?: Record<string, string>;
  };

  let {
    data,
    form,
  }: {
    data: HelpPageData;
    form?: HelpActionData | null;
  } = $props();

  const isSpanish = $derived(data.locale === "es");
  const fieldLabel = $derived({
    name: isSpanish ? "Nombre" : "Name",
    contact: isSpanish
      ? "WhatsApp, teléfono o email"
      : "WhatsApp, phone or email",
    resort: isSpanish ? "Estación o zona" : "Resort or area",
    dates: isSpanish ? "Fechas" : "Dates",
    sport: isSpanish ? "Esquí o snowboard" : "Ski or snowboard",
    people: isSpanish ? "Personas" : "People",
    level: isSpanish ? "Nivel" : "Level",
    preferredLanguage: isSpanish ? "Idioma preferido" : "Preferred language",
    message: isSpanish ? "Algo importante" : "Anything important",
  });
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <meta name="robots" content={data.meta.robots} />
  <link rel="canonical" href={data.meta.canonicalPath} />
</svelte:head>

<main class="help-page" aria-labelledby="page-title">
  <section class="hero">
    <p class="eyebrow">{data.hero.eyebrow}</p>
    <h1 id="page-title">{data.hero.headline}</h1>
    <p class="lede">{data.hero.lede}</p>
    <div
      class="hero-actions"
      aria-label={isSpanish ? "Acciones principales" : "Primary actions"}
    >
      <a
        class="button primary"
        href={data.assistedWhatsAppUrl}
        target="_blank"
        rel="noreferrer"
      >
        {data.hero.primaryCta}
      </a>
      <a class="button secondary" href="#intent-options"
        >{data.hero.secondaryCta}</a
      >
    </div>
  </section>

  <section class="assist-card" aria-labelledby="assist-title">
    <div>
      <p class="eyebrow">{data.assistedPlacement.headline}</p>
      <h2 id="assist-title">{data.assistedIntent.label}</h2>
      <p>{data.assistedIntent.summary}</p>
      <p class="reassurance">{data.assistedIntent.reassurance}</p>
    </div>

    <form method="POST" action="?/prepareWhatsAppHandoff" class="context-form">
      <input type="hidden" name="intent" value="assistedLessonHelp" />
      <input type="hidden" name="source" value="help-page" />

      <div class="form-heading">
        <h3>{data.form.title}</h3>
        <p>{data.form.intro}</p>
      </div>

      {#if form?.message}
        <p class:success={form.ok} class:error={!form.ok}>{form.message}</p>
      {/if}

      <label>
        <span>{fieldLabel.name}</span>
        <input
          name="name"
          value={form?.values?.name ?? ""}
          autocomplete="name"
        />
        {#if form?.fieldErrors?.name}<small>{form.fieldErrors.name}</small>{/if}
      </label>

      <label>
        <span>{fieldLabel.contact}</span>
        <input
          name="contact"
          value={form?.values?.contact ?? ""}
          autocomplete="tel"
        />
        {#if form?.fieldErrors?.contact}<small>{form.fieldErrors.contact}</small
          >{/if}
      </label>

      <div class="split">
        <label>
          <span>{fieldLabel.resort}</span>
          <input name="resort" value={form?.values?.resort ?? ""} />
          {#if form?.fieldErrors?.resort}<small>{form.fieldErrors.resort}</small
            >{/if}
        </label>
        <label>
          <span>{fieldLabel.dates}</span>
          <input name="dates" value={form?.values?.dates ?? ""} />
          {#if form?.fieldErrors?.dates}<small>{form.fieldErrors.dates}</small
            >{/if}
        </label>
      </div>

      <div class="split">
        <label>
          <span>{fieldLabel.sport}</span>
          <input name="sport" value={form?.values?.sport ?? ""} />
        </label>
        <label>
          <span>{fieldLabel.people}</span>
          <input name="people" value={form?.values?.people ?? ""} />
        </label>
      </div>

      <div class="split">
        <label>
          <span>{fieldLabel.level}</span>
          <input name="level" value={form?.values?.level ?? ""} />
        </label>
        <label>
          <span>{fieldLabel.preferredLanguage}</span>
          <input
            name="preferredLanguage"
            value={form?.values?.preferredLanguage ?? ""}
          />
        </label>
      </div>

      <label>
        <span>{fieldLabel.message}</span>
        <textarea name="message" rows="4"
          >{form?.values?.message ?? ""}</textarea
        >
      </label>

      <div class="form-actions">
        <button class="button primary" type="submit">{data.form.submit}</button>
        {#if form?.request?.whatsappUrl}
          <a
            class="button secondary"
            href={form.request.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            {data.hero.primaryCta}
          </a>
        {/if}
      </div>
    </form>
  </section>

  <section
    id="intent-options"
    class="intent-grid"
    aria-labelledby="intent-title"
  >
    <div class="section-heading">
      <p class="eyebrow">
        {isSpanish ? "Motivo del contacto" : "Reason for contact"}
      </p>
      <h2 id="intent-title">
        {isSpanish ? "Elige la vía correcta" : "Choose the right path"}
      </h2>
    </div>
    <div class="cards">
      {#each data.intentOptions as intent}
        <article class="intent-card">
          <p class="badge">{intent.primaryChannel}</p>
          <h3>{intent.label}</h3>
          <p>{intent.summary}</p>
          <a class="text-link" href={intent.href}>{intent.primaryCta}</a>
        </article>
      {/each}
    </div>
  </section>
</main>

<style>
  .help-page {
    display: grid;
    gap: 1.5rem;
    min-height: 100vh;
    padding: clamp(1rem, 4vw, 4rem);
    background:
      radial-gradient(
        circle at 14% 8%,
        rgba(125, 211, 252, 0.22),
        transparent 24rem
      ),
      radial-gradient(
        circle at 84% 0%,
        rgba(167, 139, 250, 0.16),
        transparent 24rem
      ),
      linear-gradient(135deg, #07111f, #0f172a 58%, #111827);
  }

  .hero,
  .assist-card,
  .intent-grid {
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.5rem;
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 2rem 5rem rgba(2, 6, 23, 0.3);
  }

  .hero {
    display: grid;
    gap: 1.25rem;
    padding: clamp(1.5rem, 6vw, 4rem);
  }

  .assist-card {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(18rem, 1.1fr);
    gap: clamp(1rem, 4vw, 2rem);
    padding: clamp(1.25rem, 4vw, 2rem);
  }

  .intent-grid {
    padding: clamp(1.25rem, 4vw, 2rem);
  }

  .eyebrow,
  .badge {
    margin: 0;
    color: #7dd3fc;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  h1 {
    max-width: 12ch;
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

  h3 {
    font-size: 1.25rem;
  }

  .lede,
  .assist-card p,
  .intent-card p,
  .context-form p {
    max-width: 44rem;
    color: #cbd5e1;
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .reassurance {
    margin-top: 1rem;
    color: #bae6fd !important;
  }

  .hero-actions,
  .form-actions,
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    border: 0;
    border-radius: 999px;
    padding: 0.85rem 1.1rem;
    font: inherit;
    font-weight: 800;
    text-decoration: none;
    cursor: pointer;
  }

  .primary {
    background: #f8fafc;
    color: #07111f;
  }

  .secondary {
    border: 1px solid rgba(248, 250, 252, 0.24);
    background: transparent;
    color: #f8fafc;
  }

  .context-form {
    display: grid;
    gap: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 1.25rem;
    padding: 1rem;
    background: rgba(2, 6, 23, 0.24);
  }

  .form-heading {
    display: grid;
    gap: 0.5rem;
  }

  label {
    display: grid;
    gap: 0.4rem;
  }

  label span {
    color: #e2e8f0;
    font-weight: 800;
  }

  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(148, 163, 184, 0.32);
    border-radius: 0.8rem;
    padding: 0.85rem;
    background: rgba(15, 23, 42, 0.72);
    color: #f8fafc;
    font: inherit;
  }

  small,
  .error {
    color: #fca5a5 !important;
  }

  .success {
    color: #86efac !important;
  }

  .split {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .section-heading {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .intent-card {
    flex: 1 1 16rem;
    display: grid;
    gap: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 1.25rem;
    padding: 1rem;
    background: rgba(2, 6, 23, 0.22);
  }

  .text-link {
    color: #bae6fd;
    font-weight: 800;
  }

  @media (max-width: 760px) {
    .assist-card,
    .split {
      grid-template-columns: 1fr;
    }
  }
</style>
