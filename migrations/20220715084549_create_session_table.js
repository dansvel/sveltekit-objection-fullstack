/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up = knex => {
	return knex.schema.createTable('sessions', function (table) {
		// table.increments('id')
		table.uuid('id').primary()
		table.string('username').notNullable()
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const down = knex => {
	return knex.schema.dropTable('sessions')
}
