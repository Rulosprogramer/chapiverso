"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Activity } from "@/lib/activities";

const EMPTY_FORM: Omit<Activity, "id"> = {
  title: "",
  date: "",
  time: "",
  endTime: "",
  location: "",
  category: "música",
  description: "",
  featured: false,
};

const CATEGORIES = [
  { value: "música",    label: "🎵 Música" },
  { value: "teatro",   label: "🎭 Teatro" },
  { value: "moda",     label: "👗 Moda" },
  { value: "comunidad",label: "🤝 Comunidad" },
  { value: "huertas",  label: "🌱 Huertas" },
  { value: "circo",    label: "🎪 Circo" },
  { value: "bares",    label: "🍺 Bares" },
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
}

type Toast = { msg: string; type: "ok" | "err" };

export default function AdminPage() {
  const [authed, setAuthed]       = useState<boolean | null>(null);
  const [password, setPassword]   = useState("");
  const [loginError, setLoginError] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [form, setForm]           = useState<Omit<Activity, "id">>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [deleteId, setDeleteId]   = useState<string | null>(null);
  const [toast, setToast]         = useState<Toast | null>(null);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchActivities = useCallback(async () => {
    const res = await fetch("/api/activities");
    if (res.ok) setActivities(await res.json());
  }, []);

  useEffect(() => {
    fetch("/api/auth/verify")
      .then(async (res) => {
        if (res.ok) { setAuthed(true); fetchActivities(); }
        else setAuthed(false);
      })
      .catch(() => setAuthed(false));
  }, [fetchActivities]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuthed(true); fetchActivities(); }
    else setLoginError("Contraseña incorrecta. Intenta de nuevo.");
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
    setPassword("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/activities/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, id: editingId }),
        });
        showToast("✓ Actividad actualizada");
      } else {
        await fetch("/api/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showToast("✓ Actividad publicada");
      }
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      fetchActivities();
    } catch {
      showToast("Error al guardar", "err");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/activities/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchActivities();
    showToast("Actividad eliminada");
  }

  function openEdit(act: Activity) {
    const { id, ...rest } = act;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openNew() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── Loading ── */
  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#08080F] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#556EFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Login ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#08080F] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-48">
              <Image
                src="/logo-chapiverso-white.png"
                alt="Chapiverso"
                width={8334}
                height={8334}
                className="w-full h-auto"
              />
            </div>
          </div>

          <p className="font-[family-name:var(--font-barlow)] text-white/40 text-center text-xs uppercase tracking-[0.3em] mb-8">
            Panel de publicación
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0F0F1E] border border-white/15 text-white placeholder-white/30 rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)] text-base"
              autoFocus
            />
            {loginError && (
              <p className="text-red-400 text-sm font-[family-name:var(--font-barlow)] text-center">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-bold uppercase tracking-widest text-sm hover:bg-[#6B7FFF] transition-all rounded-lg"
            >
              Ingresar
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-8 font-[family-name:var(--font-barlow)]">
            ¿Olvidaste la contraseña? Contacta al equipo Chapiverso.
          </p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-[#08080F] text-white">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-[family-name:var(--font-barlow)] font-semibold shadow-xl transition-all ${
          toast.type === "ok"
            ? "bg-[#556EFF] text-white"
            : "bg-red-500 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0F0F1E] border-b border-white/8 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-28">
            <Image
              src="/logo-chapiverso-white.png"
              alt="Chapiverso"
              width={8334}
              height={8334}
              className="w-full h-auto"
            />
          </div>
          <span className="font-[family-name:var(--font-barlow)] text-white/30 text-xs uppercase tracking-widest hidden sm:block">
            · Panel de publicación
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Ver sitio ↗
          </a>
          <button
            onClick={handleLogout}
            className="font-[family-name:var(--font-barlow)] text-white/30 text-xs uppercase tracking-widest hover:text-red-400 transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Form panel */}
        {showForm && (
          <div className="mb-10 p-6 md:p-8 bg-[#0F0F1E] border border-[#556EFF]/30 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wider">
                {editingId ? "✏️  Editar actividad" : "➕  Nueva actividad"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); }}
                className="text-white/30 hover:text-white transition-colors text-lg leading-none"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Título */}
              <div className="md:col-span-2">
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Título de la actividad *
                </label>
                <input
                  required
                  placeholder="Ej: Taller de serigrafía"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white placeholder-white/20 rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Fecha *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Categoría *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} className="bg-[#08080F]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hora inicio */}
              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Hora inicio
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              {/* Hora fin */}
              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Hora fin
                </label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              {/* Lugar */}
              <div className="md:col-span-2">
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Lugar / Dirección
                </label>
                <input
                  placeholder="Ej: Parque de los Hippies, Calle 60 con Cra 7"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white placeholder-white/20 rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              {/* Descripción */}
              <div className="md:col-span-2">
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe brevemente la actividad..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08080F] border border-white/15 text-white placeholder-white/20 rounded-lg focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)] resize-none"
                />
              </div>

              {/* Destacado */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-5 h-5 accent-[#556EFF] rounded"
                  />
                  <span className="font-[family-name:var(--font-barlow)] text-white/60 text-sm group-hover:text-white transition-colors">
                    ⭐ Marcar como actividad destacada
                  </span>
                </label>
              </div>

              {/* Acciones */}
              <div className="md:col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 sm:flex-none px-8 py-3 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-bold uppercase tracking-widest text-sm hover:bg-[#6B7FFF] transition-all rounded-lg disabled:opacity-50"
                >
                  {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Publicar actividad"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); }}
                  className="px-6 py-3 border border-white/15 text-white/50 font-[family-name:var(--font-barlow)] text-sm hover:text-white hover:border-white/30 transition-all rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wider">
              Actividades publicadas
            </h1>
            <p className="font-[family-name:var(--font-barlow)] text-white/30 text-sm mt-0.5">
              {activities.length} {activities.length === 1 ? "actividad" : "actividades"} en la agenda
            </p>
          </div>
          {!showForm && (
            <button
              onClick={openNew}
              className="px-5 py-3 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-bold text-sm uppercase tracking-wider hover:bg-[#6B7FFF] transition-all rounded-lg whitespace-nowrap"
            >
              + Nueva
            </button>
          )}
        </div>

        {/* Empty state */}
        {activities.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <p className="text-4xl mb-4">📋</p>
            <p className="font-[family-name:var(--font-barlow)] text-white/40 text-base mb-4">
              Aún no hay actividades publicadas.
            </p>
            <button
              onClick={openNew}
              className="px-6 py-3 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-bold text-sm uppercase tracking-wider hover:bg-[#6B7FFF] transition-all rounded-lg"
            >
              Publicar primera actividad
            </button>
          </div>
        )}

        {/* Activity list */}
        <div className="flex flex-col gap-3">
          {activities
            .slice()
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((act) => (
              <div
                key={act.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-[#0F0F1E] border border-white/8 rounded-xl hover:border-white/20 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-[family-name:var(--font-barlow)] text-white/40 text-xs uppercase tracking-widest">
                      📅 {formatDate(act.date)}
                    </span>
                    <span className="px-2 py-0.5 bg-[#556EFF]/15 text-[#8B9FFF] text-[10px] font-[family-name:var(--font-barlow)] uppercase tracking-widest rounded-full">
                      {act.category}
                    </span>
                    {act.featured && (
                      <span className="px-2 py-0.5 bg-[#F2E85C]/15 text-[#F2E85C] text-[10px] font-[family-name:var(--font-barlow)] uppercase tracking-widest rounded-full">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-anton)] text-white text-lg uppercase tracking-wide leading-tight">
                    {act.title}
                  </p>
                  <p className="font-[family-name:var(--font-barlow)] text-white/35 text-sm mt-0.5">
                    {act.time && act.endTime ? `${act.time} – ${act.endTime}` : act.time || ""}
                    {act.location ? ` · ${act.location}` : ""}
                  </p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(act)}
                    className="px-4 py-2 border border-white/15 text-white/60 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:text-white hover:border-white/40 transition-all rounded-lg"
                  >
                    Editar
                  </button>
                  {deleteId === act.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(act.id)}
                        className="px-4 py-2 bg-red-500 text-white font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:bg-red-400 transition-all rounded-lg"
                      >
                        Sí, eliminar
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="px-4 py-2 border border-white/15 text-white/50 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:text-white transition-all rounded-lg"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(act.id)}
                      className="px-4 py-2 border border-red-500/20 text-red-400/50 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:border-red-500/50 hover:text-red-400 transition-all rounded-lg"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
