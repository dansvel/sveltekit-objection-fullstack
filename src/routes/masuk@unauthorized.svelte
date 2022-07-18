<script>
	import { session } from '$app/stores'
	import { goto } from '$app/navigation'

	let error = ''
	let success = ''

	let username = 'admin'
	let password = 'admin'

	const signin = async () => {
		error = ''

		try {
			const response = await fetch('/api/signin', {
				method: 'post',
				body: JSON.stringify({ username, password }),
				headers: {
					// "Access-Control-Allow-Origin": "*",
					'Content-Type': 'application/json'
				}
			})

			if (response.ok) {
				$session.notification = 'Berhasil masuk, selamat datang kembali.'
				await goto('/')
			}

			error = (await response.json()).message
		} catch (e) {
			console.log(e)
		}

		// formEl.reset() // using the web platform 💪
	}
</script>

{#if $session.notification}
	<pre>{$session.notification}</pre>
{/if}

<h1>Masuk</h1>

<form>
	<div>
		<label>Username</label>
		<input type="text" required bind:value={username} />
	</div>

	<div>
		<label>Password</label>
		<input type="password" required bind:value={password} />
	</div>

	<button on:click|preventDefault={signin}>Masuk</button>
</form>

<style>
	pre {
		background-color: lightgreen;
		font-weight: bold;
	}
</style>
