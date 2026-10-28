import {drizzle} from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Esto creará o contectara el archivo local.db en la raiz de tu proyecto
const sqlite = new Database('local.db');

export const db = drizzle(sqlite, {schema});

