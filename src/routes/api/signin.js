import User from '$lib/model/user'
import Session from '$lib/model/session'

import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import cookie from 'cookie'

export const post = async ({ request }) => {
	const oldUser = await request.json()

	const user = await User.query() //
		.select()
		.findOne({ username: oldUser.username })

	const passwordMatch = user && (await bcrypt.compare(oldUser.password, user.password))

	if (!user || !passwordMatch) {
		return {
			status: 401,
			body: {
				message: 'Username atau Password salah.'
			}
		}
	}

	const uid = uuidv4()
	await Session.query().insert({ id: uid, username: user.username })

	return {
		status: 200,
		body: {
			message: 'Berhasil masuk, selamat datang kembali.'
		},
		headers: {
			'Set-Cookie': cookie.serialize('pgplSession', uid, {
				// send cookie for every page
				path: '/',

				// server side only cookie so you can't use `document.cookie`
				httpOnly: true,

				// only requests from same site can send cookies
				// and serves to protect from CSRF
				// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
				sameSite: 'strict',

				// only sent over HTTPS
				secure: process.env.NODE_ENV === 'production',

				// set cookie to expire after a month
				maxAge: 60 * 60 * 24 * 30
			})
		}
	}
}
