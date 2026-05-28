import { NextRequest, NextResponse } from "next/server";
import { updateActivity, deleteActivity } from "@/lib/activitiesServer";
import { type Activity } from "@/lib/activities";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("chapiverso_admin");
  return adminCookie?.value === "1";
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json()) as Omit<Activity, "id">;

  try {
    const updated = await updateActivity(id, body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Actividad no encontrada" }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteActivity(id);
  return NextResponse.json({ ok: true });
}
