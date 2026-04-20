"use client";

import { useActionState } from "react";
import type { Room } from "@prisma/client";
import { submitAccommodationBooking, type ActionState } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { SubmitButton } from "@/components/forms/submit-button";

const initialState: ActionState = {
  success: false,
  message: "",
};

type AccommodationBookingFormProps = {
  rooms: Room[];
};

export function AccommodationBookingForm({ rooms }: AccommodationBookingFormProps) {
  const [state, formAction] = useActionState(submitAccommodationBooking, initialState);
  const hasRooms = rooms.length > 0;

  return (
    <form action={formAction} className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      {!hasRooms ? (
        <div className="rounded-2xl border border-dashed border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
          No rooms are available yet. Complete the Prisma migration and seed steps to enable live accommodation bookings.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Full name
          <input name="fullName" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Email
          <input name="email" type="email" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Phone
          <input name="phone" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Guests
          <input name="guests" type="number" min="1" max="8" defaultValue="2" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-slate-200 md:col-span-1">
          Room
          <select name="roomId" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50">
            {hasRooms ? (
              rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} — {formatCurrency(room.rate)} / night
                </option>
              ))
            ) : (
              <option value="">No rooms configured</option>
            )}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Check-in
          <input name="checkIn" type="date" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Check-out
          <input name="checkOut" type="date" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-200">
          Payment method
          <select name="paymentMethod" required disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50">
            <option value="CARD">Card payment</option>
            <option value="EFT">EFT</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-200">
          Special requests
          <input name="specialRequests" disabled={!hasRooms} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white disabled:opacity-50" />
        </label>
      </div>

      <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-slate-100">
        Card bookings are ready for live gateway configuration. EFT bookings are recorded with payment tracking for admin follow-up.
      </div>

      {state.message ? (
        <div className={`rounded-2xl p-4 text-sm ${state.success ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200"}`}>
          <p>{state.message}</p>
          {state.reference ? <p className="mt-2 font-semibold">Reference: {state.reference}</p> : null}
        </div>
      ) : null}

      <SubmitButton label="Submit booking" pendingLabel="Saving booking..." disabled={!hasRooms} />
    </form>
  );
}
