import cookie from 'cookie'
import User from '$lib/model/user'

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') ?? '')

	if (!cookies.pgplSession) {
		return await resolve(event)
	}

	const session = await User.query() //
		.select('users.id', 'name', 'email', 'users.username', 'level', 'image', 'phone')
		.joinRelated('sessions')
		.where('sessions.id', cookies.pgplSession)
		.first()

	if (session) event.locals.user = JSON.stringify(session)

	return await resolve(event)
}

export const getSession = ({ locals }) => {
	if (!locals.user) return {}

	return {
		user: JSON.parse(locals.user)
	}
}
