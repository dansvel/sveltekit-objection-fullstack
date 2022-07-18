import User from '$lib/model/user'
import bcrypt from 'bcrypt'

export const post = async ({ request }) => {
	const newUser = await request.json()

	console.log(newUser)
	if (newUser.password !== newUser.confirmPassword) {
		return {
			status: 409,
			body: {
				message: 'Pastikan memasukkan password yang sama.'
			}
		}
	}

	const isUsernameExist = await User.query() //
		.select('username')
		.findOne({ username: newUser.username })

	if (isUsernameExist) {
		return {
			status: 409,
			body: {
				message: 'Username sudah terdaftar, silakan gunakan yang lain.'
			}
		}
	}
	const isEmailExist = await User.query() //
		.select('email')
		.where('email', newUser.email)
		.first()

	if (isEmailExist) {
		return {
			status: 409,
			body: {
				message: 'Email sudah terdaftar, silakan masuk/gunakan yang lain.'
			}
		}
	}

	try {
		newUser.password = await bcrypt.hash(newUser.password, 10)
		delete newUser.confirmPassword
		await User.query().insert(newUser)
		return { status: 200 }
	} catch (error) {
		return {
			status: 400,
			body: { error }
		}
	}
}
