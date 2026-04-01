"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface AdminDatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  label?: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function parseDate(val: string) {
  const parts = val.split("-");
  if (parts.length === 3) {
    return {
      year: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10) - 1,
      day: parseInt(parts[2], 10),
    };
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

export default function AdminDatePicker({
  value,
  onChange,
}: AdminDatePickerProps) {
  const parsed = parseDate(value);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parsed.year);
  const [viewMonth, setViewMonth] = useState(parsed.month);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Sync view when value changes externally
  useEffect(() => {
    const p = parseDate(value);
    setViewYear(p.year);
    setViewMonth(p.month);
  }, [value]);

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const selectDay = useCallback(
    (day: number) => {
      onChange(toDateStr(viewYear, viewMonth, day));
      setOpen(false);
    },
    [viewYear, viewMonth, onChange]
  );

  // Build calendar grid
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    const day = i - firstDow + 1;
    cells.push(day >= 1 && day <= daysInMonth ? day : null);
  }

  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  // Display value
  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="admin-datepicker" ref={wrapperRef}>
      {/* Trigger */}
      <button
        type="button"
        className="admin-datepicker-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <Calendar size={14} className="admin-datepicker-icon" />
        <span className={displayValue ? "" : "admin-datepicker-placeholder"}>
          {displayValue || "Pick a date"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="admin-datepicker-dropdown">
          {/* Header */}
          <div className="admin-datepicker-header">
            <button type="button" className="admin-datepicker-nav" onClick={prevMonth}>
              <ChevronLeft size={14} />
            </button>
            <span className="admin-datepicker-month">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" className="admin-datepicker-nav" onClick={nextMonth}>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Day-of-week labels */}
          <div className="admin-datepicker-grid admin-datepicker-dow">
            {DAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Day cells */}
          <div className="admin-datepicker-grid">
            {cells.map((day, i) => {
              if (day === null) {
                return <span key={i} />;
              }
              const dateStr = toDateStr(viewYear, viewMonth, day);
              const isSelected = dateStr === value;
              const isToday = dateStr === todayStr;
              return (
                <button
                  key={i}
                  type="button"
                  className={[
                    "admin-datepicker-day",
                    isSelected && "selected",
                    isToday && !isSelected && "today",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => selectDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer: Today shortcut */}
          <div className="admin-datepicker-footer">
            <button
              type="button"
              className="admin-datepicker-today-btn"
              onClick={() => {
                onChange(todayStr);
                setOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
