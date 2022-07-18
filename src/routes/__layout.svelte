<script context="module">
	export const load = ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/masuk'
			}
		}

		return {
			status: 200,
			props: {
				user: session.user
			}
		}
	}
</script>

<script>
	export let user
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/api/signout">Logout</a></li>
		<li>Selamat datang <strong /></li>
	</ul>
</nav>

<slot />
