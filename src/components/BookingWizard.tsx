"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Magnetic from "./Magnetic";
import { useCurrency } from "@/lib/CurrencyContext";
import type { Tour } from "@/lib/tours";

const steps = ["Trip Details", "Traveler Info", "Add-Ons", "Review"];

const ADDON_COST = { insurance: 89, transfer: 45, roomUpgrade: 150 };

function generateReference() {
  return `MR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function BookingWizard({ tour }: { tour: Tour }) {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState(searchParams.get("date") || tour.departureDates[0] || "");
  const [travelers, setTravelers] = useState(
    Math.min(Math.max(Number(searchParams.get("travelers")) || 2, 1), tour.groupSizeMax)
  );
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [addOns, setAddOns] = useState({ insurance: true, transfer: false, roomUpgrade: false });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const unitPrice = tour.deal ? tour.priceFrom * (1 - tour.deal.percentOff / 100) : tour.priceFrom;
  const addOnTotal =
    (addOns.insurance ? ADDON_COST.insurance * travelers : 0) +
    (addOns.transfer ? ADDON_COST.transfer * travelers : 0) +
    (addOns.roomUpgrade ? ADDON_COST.roomUpgrade : 0);
  const total = unitPrice * travelers + addOnTotal;

  const canAdvance = [!!date && travelers > 0, !!leadName && !!leadEmail, true, agreed];

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourSlug: tour.slug,
          tourTitle: tour.title,
          departureDate: date,
          travelers,
          leadName,
          leadEmail,
          leadPhone,
          addOns,
          total,
          source: "website-booking-wizard",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "We couldn’t submit your request right now.");
      }

      setReference(data.reference || generateReference());
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn’t submit your request right now."
      );
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-paper-dim p-8 text-center sm:p-14">
        <p className="eyebrow mb-4 text-xs uppercase text-accent-deep">Request Received</p>
        <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Your reservation request is in.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/65">
          Reference <strong className="text-ink">{reference}</strong> — a member of our team will call or
          email {leadEmail || "you"} within one business day to confirm availability for{" "}
          <strong className="text-ink">{tour.title}</strong> and take a deposit. No payment has been
          charged yet.
        </p>
        <div className="mx-auto mt-8 max-w-xs rounded-2xl border border-ink/10 bg-paper p-6 text-left text-sm text-ink/70">
          <Row label="Departure" value={formatDate(date)} />
          <Row label="Travelers" value={String(travelers)} />
          <Row label="Estimated total" value={formatPrice(total)} last />
        </div>
        <Magnetic strength={0.15} className="mt-8 inline-block">
          <Link
            href="/tours"
            className="inline-block rounded-full bg-ink px-7 py-3 text-xs eyebrow uppercase text-paper transition-colors hover:bg-ink-soft"
          >
            Browse More Tours
          </Link>
        </Magnetic>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-paper-dim p-6 sm:p-10">
      <div className="mb-10 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-1 rounded-full transition-colors ${
                i < step ? "bg-accent" : i === step ? "bg-accent/50" : "bg-ink/10"
              }`}
            />
            <span className="text-center text-[9px] leading-tight eyebrow uppercase text-ink/60 sm:text-[10px]">{label}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl text-ink sm:text-3xl">When, and how many of you?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs eyebrow uppercase text-ink/50">Departure Date</span>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
              >
                {tour.departureDates.map((d) => (
                  <option key={d} value={d}>
                    {formatDate(d)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs eyebrow uppercase text-ink/50">
                Travelers (max {tour.groupSizeMax})
              </span>
              <input
                type="number"
                min={1}
                max={tour.groupSizeMax}
                value={travelers}
                onChange={(e) =>
                  setTravelers(Math.min(Math.max(Number(e.target.value) || 1, 1), tour.groupSizeMax))
                }
                className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="mb-2 font-serif text-2xl text-ink sm:text-3xl">Who&rsquo;s the lead traveler?</h2>
          <p className="mb-6 text-sm text-ink/60">
            We&rsquo;ll use this to confirm your request — no payment details needed here.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              required
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
            />
            <input
              type="email"
              required
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent"
            />
            <input
              type="tel"
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent sm:col-span-2"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-2 font-serif text-2xl text-ink sm:text-3xl">Anything to add?</h2>
          <p className="mb-6 text-sm text-ink/60">Optional — our team can also adjust these later.</p>
          <div className="space-y-3">
            <AddonRow
              label="Travel insurance"
              hint={`${formatPrice(ADDON_COST.insurance)} per traveler`}
              checked={addOns.insurance}
              onChange={(v) => setAddOns((a) => ({ ...a, insurance: v }))}
            />
            <AddonRow
              label="Private airport transfer"
              hint={`${formatPrice(ADDON_COST.transfer)} per traveler`}
              checked={addOns.transfer}
              onChange={(v) => setAddOns((a) => ({ ...a, transfer: v }))}
            />
            <AddonRow
              label="Room / cabin upgrade"
              hint={`${formatPrice(ADDON_COST.roomUpgrade)} flat`}
              checked={addOns.roomUpgrade}
              onChange={(v) => setAddOns((a) => ({ ...a, roomUpgrade: v }))}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl text-ink sm:text-3xl">Review your request</h2>
          <div className="space-y-1 rounded-2xl border border-ink/10 bg-paper p-6">
            <Row label="Tour" value={tour.title} />
            <Row label="Departure" value={formatDate(date)} />
            <Row label="Travelers" value={String(travelers)} />
            <Row label="Lead traveler" value={leadName || "—"} />
            <Row label="Contact" value={leadEmail || "—"} />
            <Row
              label="Add-ons"
              value={
                [
                  addOns.insurance && "Insurance",
                  addOns.transfer && "Transfer",
                  addOns.roomUpgrade && "Upgrade",
                ]
                  .filter(Boolean)
                  .join(", ") || "None"
              }
            />
            <Row label="Estimated total" value={formatPrice(total)} last />
          </div>
          <label className="mt-6 flex items-start gap-3 text-sm text-ink/70">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
            />
            <span>
              I understand this is a reservation request, not a payment — our team will confirm
              availability and final pricing before any deposit is taken.
            </span>
          </label>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="text-xs eyebrow uppercase text-ink/60 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-0"
        >
          ← Back
        </button>
        <Magnetic strength={0.2}>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance[step]}
              className="rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!agreed || submitting}
              className="rounded-full bg-accent px-7 py-3 text-xs eyebrow uppercase text-ink transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Send Reservation Request"}
            </button>
          )}
        </Magnetic>
      </div>
    </div>
  );
}

function AddonRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-ink/15 bg-paper px-5 py-4 transition-colors hover:border-accent">
      <span>
        <span className="block text-sm text-ink">{label}</span>
        <span className="block text-xs text-ink/50">{hint}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 shrink-0 accent-accent"
      />
    </label>
  );
}

function Row({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between py-2 text-sm ${
        last ? "mt-2 border-t border-ink/10 pt-4 font-serif text-base text-ink" : "text-ink/70"
      }`}
    >
      <span className={last ? "text-ink/60" : ""}>{label}</span>
      <span className={last ? "text-ink" : "text-ink"}>{value}</span>
    </div>
  );
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
