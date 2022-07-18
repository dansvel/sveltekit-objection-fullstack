import cookie from 'cookie'
import Session from '$lib/model/session'

export const get = async ({ request }) => {
	const cookies = cookie.parse(request.headers.get('cookie') ?? '')

	await Session.query().deleteById(cookies.pgplSession ?? '')

	return {
		status: 303,
		headers: {
			'Set-Cookie': cookie.serialize('pgplSession', '', {
				path: '/',
				// the cookie should expire immediately
				expires: new Date(0)
			}),
			location: '/masuk'
		}
	}
}
