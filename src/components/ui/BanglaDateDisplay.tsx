"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";

interface BanglaDateDisplayProps {
  className?: string;
}

export default function BanglaDateDisplay({ className = "" }: BanglaDateDisplayProps) {
  const [dateStr, setDateStr] = useState<string>("মঙ্গলবার, ৬ অক্টোবর, ২০২৬");

  useEffect(() => {
    setDateStr(getBanglaDate());
  }, []);

  return <span className={className}>{dateStr}</span>;
}
