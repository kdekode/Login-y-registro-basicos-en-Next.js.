import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({autoIncrement: true}),
    email:text('mail').notNull().unique(),
    password:text('password').notNull(),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});