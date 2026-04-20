"use client";

import { useActionState } from "react";
import { submitDiningReservation, type ActionState } from "@/lib/actions";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function DiningReservationForm() {
  const [state, formAction] = useActionState(submitDiningReservation, initialState);

  return (
    <form action={formAction} className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Full name
          <input name="fullName" required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Email
          <input name="email" type="email" required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Phone
          <input name="phone" required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Guests
          <input name="guestCount" type="number" min="1" max="30" defaultValue="2" required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Date
          <input name="date" type="date" required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Time
          <input name="time" type="time" required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-slate-200">
        Notes
        <textarea name="notes" rows={4} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
      </label>

      {state.message ? (
        <div className={`rounded-2xl p-4 text-sm ${state.success ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"}`}>
          <p>{state.message}</p>
          {state.reference ? <p className="mt-2 font-semibold">Reference: {state.reference}</p> : null}
        </div>
      ) : null}

      <SubmitButton label="Reserve table" pendingLabel="Saving reservation..." />
    </form>
  );
}
