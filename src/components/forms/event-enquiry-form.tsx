"use client";

import { useActionState } from "react";
import { submitEventEnquiry, type ActionState } from "@/lib/actions";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function EventEnquiryForm() {
  const [state, formAction] = useActionState(submitEventEnquiry, initialState);

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
          Event type
          <input name="eventType" placeholder="Wedding, conference, birthday..." required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Preferred event date
          <input name="eventDate" type="date" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Expected guest count
          <input name="guestCount" type="number" min="1" max="500" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-slate-200">
        Event brief
        <textarea name="details" rows={5} required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
      </label>

      {state.message ? (
        <div className={`rounded-2xl p-4 text-sm ${state.success ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"}`}>
          <p>{state.message}</p>
          {state.reference ? <p className="mt-2 font-semibold">Reference: {state.reference}</p> : null}
        </div>
      ) : null}

      <SubmitButton label="Send enquiry" pendingLabel="Sending enquiry..." />
    </form>
  );
}
