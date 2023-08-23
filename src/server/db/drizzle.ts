import Database from "better-sqlite3";
import {
  BetterSQLite3Database,
  drizzle as initDrizzle,
} from "drizzle-orm/better-sqlite3";

const globalForDrizzle = globalThis as unknown as {
  drizzle: BetterSQLite3Database<Record<string, never>>;
};

export const drizzle =
  globalForDrizzle.drizzle ?? initDrizzle(new Database("./drizzle/sqlite.db"));

if (process.env.NODE_ENV !== "production") globalForDrizzle.drizzle = drizzle;
