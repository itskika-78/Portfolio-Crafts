"use client";

import { useEffect, useState } from "react";
import { tickerFallback } from "@/data/portfolio";

interface Quote {
  id: string;
  symbol: string;
  price: number;
  change: number;
}

const COINGECKO =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true";

function CoinBadge({ symbol }: { symbol: string }) {
  const glyph = symbol === "SOL" ? "◎" : symbol === "BTC" ? "₿" : "Ξ";
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px]"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "rgba(255,255,255,0.85)",
      }}
      aria-hidden="true"
    >
      {glyph}
    </span>
  );
}

function formatPrice(p: number) {
  return p.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Tickers() {
  const [quotes, setQuotes] = useState<Quote[]>(tickerFallback);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(COINGECKO);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setQuotes(
          tickerFallback.map((f) => ({
            ...f,
            price: data[f.id]?.usd ?? f.price,
            change: data[f.id]?.usd_24h_change ?? f.change,
          }))
        );
      } catch {
        /* keep fallback */
      }
    };

    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="flex items-center">
      {quotes.map((q, i) => (
        <div
          key={q.id}
          className={`${i === 2 ? "hidden sm:flex" : "flex"} items-center`}
        >
          {i > 0 && (
            <span
              className="mx-4 hidden h-8 w-px lg:block"
              style={{ background: "var(--color-border-light)" }}
              aria-hidden="true"
            />
          )}
          <div className="fin-card px-2 lg:px-0">
            <CoinBadge symbol={q.symbol} />
            <div>
              <div className="fin-title">{q.symbol}</div>
              <div className="flex items-center gap-2">
                <span className="fin-price">{formatPrice(q.price)}</span>
                <span className={`fin-change ${q.change >= 0 ? "up" : "down"}`}>
                  {q.change >= 0 ? "+" : ""}
                  {q.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
