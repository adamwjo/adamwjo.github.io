import { useEffect, useState } from "react";

const TIME_ZONE = "America/New_York";

const clockParts = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const readable = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

export type NewYorkTime = {
  hours: number;
  minutes: number;
  seconds: number;
  /** "2:41 PM" */
  label: string;
  /** "EDT" / "EST" */
  zone: string;
};

function read(date = new Date()): NewYorkTime {
  const p = Object.fromEntries(clockParts.formatToParts(date).map((x) => [x.type, x.value]));
  const r = readable.formatToParts(date);
  return {
    hours: Number(p.hour) % 24,
    minutes: Number(p.minute),
    seconds: Number(p.second),
    label: r
      .filter((x) => x.type !== "timeZoneName")
      .map((x) => x.value)
      .join("")
      .trim(),
    zone: r.find((x) => x.type === "timeZoneName")?.value ?? "ET",
  };
}

/** Adam's local time, re-read on every whole second. */
export function useNewYorkTime() {
  const [time, setTime] = useState(read);

  useEffect(() => {
    let id = 0;
    const schedule = () => {
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 8);
    };
    const tick = () => {
      setTime(read());
      schedule();
    };
    schedule();
    return () => window.clearTimeout(id);
  }, []);

  return time;
}
