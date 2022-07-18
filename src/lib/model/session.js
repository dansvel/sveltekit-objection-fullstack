import { Model } from 'objection'
import db from '$lib/db'

import User from './user.js'

Model.knex(db)

class Session extends Model {
	static get tableName() {
		return 'sessions'
	}
	static get jsonSchema() {
		return {
			type: 'object',
			required: ['id', 'username'],

			properties: {
				id: { type: 'string', minLength: 36, maxLength: 36 },
				username: { type: 'string', minLength: 1, maxLength: 255 }
			}
		}
	}

	static get relationMappings() {
		return {
			users: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'sessions.username',
					to: 'users.username'
				}
			}
		}
	}
}

export default Session
