import { NextRequest, NextResponse } from "next/server";
import { readActivities, createActivity } from "@/lib/activitiesServer";
import { type Activity } from "@/lib/activities";
import { cookies } from "next/headers";

export async function GET() {
  const activities = await readActivities();
  return NextResponse.json(activities);
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("chapiverso_admin");
  if (!adminCookie || adminCookie.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Omit<Activity, "id">;
  const newActivity = await createActivity(body);
  return NextResponse.json(newActivity, { status: 201 });
}
