"use client";

import { useState, useEffect, useCallback } from "react";
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

const CATEGORIES = ["música", "teatro", "moda", "comunidad", "huertas", "circo", "bares"];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [form, setForm] = useState<Omit<Activity, "id">>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    const res = await fetch("/api/activities");
    if (res.ok) {
      const data = await res.json();
      setActivities(data);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/verify")
      .then(async (res) => {
        if (res.ok) {
          setAuthed(true);
          fetchActivities();
        } else {
          setAuthed(false);
        }
      })
      .catch(() => setAuthed(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      fetchActivities();
    } else {
      setLoginError("Contraseña incorrecta.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
    setPassword("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await fetch(`/api/activities/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    fetchActivities();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/activities/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchActivities();
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

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#08080F] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#556EFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#08080F] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="font-[family-name:var(--font-anton)] text-3xl text-white text-center uppercase tracking-widest mb-2">
            CHAPIVERSO
          </h1>
          <p className="font-[family-name:var(--font-barlow)] text-white/40 text-center text-sm uppercase tracking-widest mb-8">
            Panel de administración
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0F0F1E] border border-white/15 text-white placeholder-white/30 rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
              autoFocus
            />
            {loginError && (
              <p className="text-red-400 text-sm font-[family-name:var(--font-barlow)]">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-bold uppercase tracking-widest text-sm hover:bg-[#6B7FFF] transition-all rounded-sm"
            >
              Entrar
            </button>
          </form>
          <p className="text-white/20 text-xs text-center mt-6 font-[family-name:var(--font-barlow)]">
            La contraseña está configurada en .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080F] text-white">
      {/* Top bar */}
      <header className="bg-[#0F0F1E] border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="font-[family-name:var(--font-anton)] text-white text-xl tracking-widest hover:text-[#F2E85C] transition-colors"
          >
            CHAPIVERSO
          </a>
          <span className="text-white/20">·</span>
          <span className="font-[family-name:var(--font-barlow)] text-white/50 text-sm uppercase tracking-widest">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="font-[family-name:var(--font-barlow)] text-white/40 text-xs uppercase tracking-widest hover:text-red-400 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Form */}
        {showForm && (
          <div className="mb-10 p-6 bg-[#0F0F1E] border border-white/12 rounded-xl">
            <h2 className="font-[family-name:var(--font-anton)] text-xl text-white uppercase tracking-wider mb-6">
              {editingId ? "Editar actividad" : "Nueva actividad"}
            </h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Título *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Fecha *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Categoría *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#08080F]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Hora inicio
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Hora fin
                </label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Lugar
                </label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-[family-name:var(--font-barlow)] text-white/50 text-xs uppercase tracking-widest mb-1.5">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#08080F] border border-white/15 text-white rounded-sm focus:outline-none focus:border-[#556EFF] font-[family-name:var(--font-barlow)] resize-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#556EFF]"
                />
                <label
                  htmlFor="featured"
                  className="font-[family-name:var(--font-barlow)] text-white/60 text-sm"
                >
                  Marcar como destacado
                </label>
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-bold uppercase tracking-widest text-sm hover:bg-[#6B7FFF] transition-all rounded-sm disabled:opacity-50"
                >
                  {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear actividad"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY_FORM); }}
                  className="px-6 py-2.5 border border-white/15 text-white/60 font-[family-name:var(--font-barlow)] text-sm hover:text-white hover:border-white/30 transition-all rounded-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-anton)] text-2xl text-white uppercase tracking-wider">
              Actividades del año
            </h1>
            <p className="font-[family-name:var(--font-barlow)] text-white/40 text-sm mt-1">
              {activities.length} actividades programadas
            </p>
          </div>
          {!showForm && (
            <button
              onClick={openNew}
              className="px-5 py-2.5 bg-[#556EFF] text-white font-[family-name:var(--font-barlow)] font-semibold text-sm uppercase tracking-wider hover:bg-[#6B7FFF] transition-all rounded-sm"
            >
              + Nueva actividad
            </button>
          )}
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {activities
            .slice()
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((act) => (
              <div
                key={act.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-[#0F0F1E] border border-white/8 rounded-xl hover:border-white/15 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="font-[family-name:var(--font-barlow)] text-white/40 text-xs uppercase tracking-widest">
                      {act.date}
                    </span>
                    <span className="px-2 py-0.5 bg-white/8 text-white/50 text-[10px] font-[family-name:var(--font-barlow)] uppercase tracking-widest rounded-full">
                      {act.category}
                    </span>
                    {act.featured && (
                      <span className="px-2 py-0.5 bg-[#556EFF]/20 text-[#556EFF] text-[10px] font-[family-name:var(--font-barlow)] uppercase tracking-widest rounded-full">
                        Destacado
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-anton)] text-white text-lg uppercase tracking-wide leading-tight">
                    {act.title}
                  </p>
                  <p className="font-[family-name:var(--font-barlow)] text-white/40 text-sm mt-0.5">
                    {act.time} – {act.endTime} · {act.location}
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => openEdit(act)}
                    className="px-4 py-2 border border-white/15 text-white/60 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:text-white hover:border-white/30 transition-all rounded-sm"
                  >
                    Editar
                  </button>
                  {deleteId === act.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(act.id)}
                        className="px-4 py-2 bg-red-500/80 text-white font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:bg-red-500 transition-all rounded-sm"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="px-4 py-2 border border-white/15 text-white/60 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:text-white transition-all rounded-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(act.id)}
                      className="px-4 py-2 border border-red-500/30 text-red-400/60 font-[family-name:var(--font-barlow)] text-xs uppercase tracking-widest hover:border-red-500/60 hover:text-red-400 transition-all rounded-sm"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-20">
            <p className="font-[family-name:var(--font-barlow)] text-white/30 text-base">
              No hay actividades. Agrega la primera.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
