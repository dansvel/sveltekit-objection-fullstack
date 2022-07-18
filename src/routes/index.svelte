<script>
	import { session } from '$app/stores'
</script>

{#if $session.notification}
	<pre>{$session.notification}</pre>
{/if}
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
