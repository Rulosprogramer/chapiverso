import { getDb } from "./db";
import type { Activity } from "./activities";

// Map a DB row → Activity type
function rowToActivity(row: Record<string, unknown>): Activity {
  return {
    id: row.id as string,
    title: row.title as string,
    date: row.date as string,
    time: row.time as string,
    endTime: row.end_time as string,
    location: row.location as string,
    category: row.category as string,
    description: row.description as string,
    featured: row.featured as boolean,
  };
}

export async function readActivities(): Promise<Activity[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM activities
    ORDER BY date ASC, time ASC
  `;
  return rows.map(rowToActivity);
}

export async function createActivity(
  data: Omit<Activity, "id">
): Promise<Activity> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO activities
      (title, date, time, end_time, location, category, description, featured)
    VALUES
      (${data.title}, ${data.date}, ${data.time}, ${data.endTime},
       ${data.location}, ${data.category}, ${data.description}, ${data.featured})
    RETURNING *
  `;
  return rowToActivity(rows[0]);
}

export async function updateActivity(
  id: string,
  data: Omit<Activity, "id">
): Promise<Activity> {
  const sql = getDb();
  const rows = await sql`
    UPDATE activities SET
      title       = ${data.title},
      date        = ${data.date},
      time        = ${data.time},
      end_time    = ${data.endTime},
      location    = ${data.location},
      category    = ${data.category},
      description = ${data.description},
      featured    = ${data.featured}
    WHERE id = ${id}
    RETURNING *
  `;
  if (rows.length === 0) throw new Error("Actividad no encontrada");
  return rowToActivity(rows[0]);
}

export async function deleteActivity(id: string): Promise<void> {
  const sql = getDb();
  await sql`DELETE FROM activities WHERE id = ${id}`;
}
