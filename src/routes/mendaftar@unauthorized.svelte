<script>
	import { session } from '$app/stores'
	import { goto } from '$app/navigation'

	// these props are passed from the page endpoint
	// so the user can get feedback if JavaScript doesn't work
	let error = ''

	let name = 'administrator'
	let email = 'admin@web.app'
	let username = 'admin'
	let password = 'admin'
	let confirmPassword = 'admin'

	const signup = async () => {
		error = ''

		try {
			const response = await fetch('/api/signup', {
				method: 'post',
				body: JSON.stringify({ name, email, username, password, confirmPassword }),
				headers: {
					// "Access-Control-Allow-Origin": "*",
					'Content-Type': 'application/json'
				}
			})

			if (response.ok) {
				$session.notification = 'Berhasil mendaftar, silakan masuk.'
				await goto('/masuk')
			}

			error = (await response.json()).message
		} catch (e) {
			console.log(e)
		}

		// formEl.reset() // using the web platform 💪
	}
</script>

<form>
	<div>
		<label>Nama</label>
		<input type="text" required bind:value={name} />
	</div>
	<div>
		<label>Email</label>
		<input type="email" required bind:value={email} />
	</div>
	<div>
		<label>Username</label>
		<input type="text" required bind:value={username} />
	</div>

	<div>
		<label>Password</label>
		<input type="password" required bind:value={password} />
	</div>
	<div>
		<label>Ulangi Password</label>
		<input type="password" required bind:value={confirmPassword} />
	</div>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button on:click|preventDefault={signup}>Sign Up</button>
</form>

<style>
	.error {
		color: tomato;
	}
</style>
