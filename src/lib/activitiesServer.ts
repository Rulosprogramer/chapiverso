import path from "path";
import fs from "fs";
import type { Activity } from "./activities";

const DATA_PATH = path.join(process.cwd(), "src/data/activities.json");

export function readActivities(): Activity[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Activity[];
}

export function writeActivities(activities: Activity[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(activities, null, 2), "utf-8");
}
