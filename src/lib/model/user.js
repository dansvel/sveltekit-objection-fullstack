import { Model } from 'objection'
import db from '$lib/db'

import Session from './session.js'

Model.knex(db)

class User extends Model {
	static get tableName() {
		return 'users'
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'email', 'username', 'password'],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string', minLength: 1, maxLength: 255 },
				email: { type: 'string', minLength: 1, maxLength: 255 },
				username: { type: 'string', minLength: 1, maxLength: 255 },
				password: { type: 'string', minLength: 1, maxLength: 255 },
				level: { type: 'number', minLength: 1, maxLength: 1 },
				image: { type: 'string', minLength: 1, maxLength: 255 },
				phone: { type: 'number', minLength: 6, maxLength: 15 }
			}
		}
	}

	static get relationMappings() {
		return {
			sessions: {
				relation: Model.HasManyRelation,
				modelClass: Session,
				join: {
					from: 'users.username',
					to: 'sessions.username'
				}
			}
		}
	}
}

export default User
