import { NextRequest, NextResponse } from "next/server";
import { readActivities, writeActivities } from "@/lib/activitiesServer";
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
  const body = (await req.json()) as Activity;
  const activities = readActivities();
  const idx = activities.findIndex((a) => a.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  activities[idx] = { ...body, id };
  writeActivities(activities);
  return NextResponse.json(activities[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const activities = readActivities();
  const filtered = activities.filter((a) => a.id !== id);
  if (filtered.length === activities.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeActivities(filtered);
  return NextResponse.json({ ok: true });
}
