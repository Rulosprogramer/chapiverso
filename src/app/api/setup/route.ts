import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import activitiesJson from "@/data/activities.json";

/**
 * POST /api/setup
 * Crea la tabla en la base de datos y migra las actividades del JSON.
 * Usar una sola vez después de configurar DATABASE_URL.
 */
export async function POST() {
  try {
    const sql = getDb();

    // 1. Crear tabla si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS activities (
        id          TEXT        PRIMARY KEY,
        title       TEXT        NOT NULL,
        date        TEXT        NOT NULL,
        time        TEXT        NOT NULL DEFAULT '',
        end_time    TEXT        NOT NULL DEFAULT '',
        location    TEXT        NOT NULL DEFAULT '',
        category    TEXT        NOT NULL DEFAULT '',
        description TEXT        NOT NULL DEFAULT '',
        featured    BOOLEAN     NOT NULL DEFAULT false,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 2. Migrar datos del JSON (ignora duplicados)
    let inserted = 0;
    for (const act of activitiesJson) {
      const rows = await sql`
        INSERT INTO activities
          (id, title, date, time, end_time, location, category, description, featured)
        VALUES
          (${act.id}, ${act.title}, ${act.date}, ${act.time}, ${act.endTime ?? ""},
           ${act.location}, ${act.category}, ${act.description}, ${act.featured})
        ON CONFLICT (id) DO NOTHING
      `;
      if (rows) inserted++;
    }

    return NextResponse.json({
      ok: true,
      message: `Tabla creada. ${inserted} actividades migradas.`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
