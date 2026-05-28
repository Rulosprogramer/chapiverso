import { NextRequest, NextResponse } from "next/server";
import { readActivities, writeActivities } from "@/lib/activitiesServer";
import { type Activity } from "@/lib/activities";
import { cookies } from "next/headers";

export async function GET() {
  const activities = readActivities();
  return NextResponse.json(activities);
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("chapiverso_admin");
  if (!adminCookie || adminCookie.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Omit<Activity, "id">;
  const activities = readActivities();
  const newActivity: Activity = {
    ...body,
    id: String(Date.now()),
  };
  activities.push(newActivity);
  writeActivities(activities);
  return NextResponse.json(newActivity, { status: 201 });
}
