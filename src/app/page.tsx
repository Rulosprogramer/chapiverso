// Renderizado dinámico: requiere DB en cada request
export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MainEvent from "@/components/MainEvent";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";
import { readActivities } from "@/lib/activitiesServer";
import mainEventData from "@/data/mainEvent.json";

export default async function Home() {
  const activities = await readActivities();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MainEvent days={mainEventData.days} />
        <Schedule activities={activities} />
      </main>
      <Footer />
    </>
  );
}
