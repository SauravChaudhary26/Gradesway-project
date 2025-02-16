import pool from "../db";
import { ResultSetHeader } from "mysql2";

export async function SelectQuery<T>(query: string): Promise<T[]> {
   const [results] = await pool.execute(query);
   return results as T[];
}

export async function InsertQuery(query: string): Promise<ResultSetHeader> {
   const [results] = await pool.execute(query);
   return results as ResultSetHeader;
}
