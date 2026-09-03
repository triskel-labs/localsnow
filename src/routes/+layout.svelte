<script lang="ts">
  import '../app.css';

  let { children, data } = $props();
</script>

<svelte:head>
  <title>{data.appName}</title>
  <meta
    name="description"
    content="LocalSnow helps clients find ski and snowboard lessons, then choose open inquiry or guaranteed booking when they want extra help."
  />
</svelte:head>

{@render children()}
