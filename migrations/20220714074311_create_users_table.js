/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up = knex => {
	return knex.schema.createTable('users', function (table) {
		table.increments('id')
		table.string('name').notNullable()
		table.string('email').notNullable().unique()
		table.string('username').notNullable().unique()
		table.string('password').notNullable()
		table.tinyint('level').defaultTo(5)
		// 1: admin, 2: petugas, 3: dinas, 4: pegawai, 5: masyarakat
		table.string('image')
		table.string('phone')

		table.timestamps()
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const down = knex => {
	return knex.schema.dropTable('users')
}

// export { up, down}
