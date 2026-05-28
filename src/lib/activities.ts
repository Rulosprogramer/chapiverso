export type Activity = {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  category: string;
  description: string;
  featured: boolean;
};

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

export const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  música: {
    label: "Música",
    color: "bg-[#556EFF]/20 text-[#556EFF] border-[#556EFF]/30",
    icon: "♫",
  },
  teatro: {
    label: "Teatro / Danza",
    color: "bg-[#EF2EF2]/20 text-[#EF2EF2] border-[#EF2EF2]/30",
    icon: "🎭",
  },
  moda: {
    label: "Moda",
    color: "bg-[#f96814]/20 text-[#f96814] border-[#f96814]/30",
    icon: "✦",
  },
  comunidad: {
    label: "Comunidad",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: "◈",
  },
  huertas: {
    label: "Huertas",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: "🌱",
  },
  circo: {
    label: "Circo",
    color: "bg-[#F2E85C]/20 text-[#F2E85C] border-[#F2E85C]/30",
    icon: "★",
  },
  bares: {
    label: "Bares / Venues",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "◆",
  },
};
