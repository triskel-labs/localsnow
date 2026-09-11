<script lang="ts">
  import HelpPage from "$lib/contact/HelpPage.svelte";
  import type { ActionData, PageData } from "./$types";

  let { data, form }: { data: PageData; form?: ActionData } = $props();
</script>

<HelpPage {data} {form} />
