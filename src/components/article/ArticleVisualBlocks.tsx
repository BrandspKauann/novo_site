import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Info, CheckCircle2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function safeParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

type StatItem = {
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
  hint?: string;
};

export function StatsBlock({ raw }: { raw: string }) {
  const data = safeParse<{ title?: string; source?: string; items: StatItem[] }>(raw);
  if (!data || !Array.isArray(data.items)) return null;

  const cols =
    data.items.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
    data.items.length === 4 ? "grid-cols-2 md:grid-cols-4" :
    "grid-cols-2 sm:grid-cols-3";

  return (
    <figure className="my-10 rounded-xl border border-border bg-gradient-to-br from-trust-blue/5 via-card to-secondary/5 p-5 sm:p-6 not-prose">
      {data.title && (
        <figcaption className="mb-5 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-trust-blue">
          <span className="h-px w-7 bg-trust-blue" />
          {data.title}
        </figcaption>
      )}
      <div className={`grid ${cols} gap-4 sm:gap-5`}>
        {data.items.map((item, i) => {
          const TrendIcon =
            item.trend === "up" ? TrendingUp : item.trend === "down" ? TrendingDown : null;
          const trendColor =
            item.trend === "up" ? "text-emerald-600" :
            item.trend === "down" ? "text-rose-600" :
            "text-trust-blue";
          return (
            <div
              key={i}
              className="rounded-lg bg-background border border-border/60 p-4 flex flex-col gap-1.5 shadow-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${trendColor}`}>
                  {item.value}
                </span>
                {TrendIcon && <TrendIcon className={`h-4 w-4 ${trendColor}`} />}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug normal-case">
                {item.label}
              </span>
              {item.hint && (
                <span className="text-[0.7rem] text-muted-foreground leading-snug">{item.hint}</span>
              )}
            </div>
          );
        })}
      </div>
      {data.source && (
        <p className="mt-4 text-[0.7rem] text-muted-foreground italic">Fonte: {data.source}</p>
      )}
    </figure>
  );
}

type ChartItem = { label: string; value: number; highlight?: boolean };

export function BarChartBlock({ raw }: { raw: string }) {
  const data = safeParse<{
    title?: string;
    subtitle?: string;
    source?: string;
    suffix?: string;
    items: ChartItem[];
  }>(raw);
  if (!data || !Array.isArray(data.items)) return null;

  const suffix = data.suffix ?? "";

  return (
    <figure className="my-10 rounded-xl border border-border bg-card p-5 sm:p-6 not-prose">
      {data.title && (
        <figcaption className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-trust-blue flex items-center gap-2">
          <span className="h-px w-7 bg-trust-blue" />
          Visualização de dados
        </figcaption>
      )}
      <div className="mb-5">
        <h4 className="text-base sm:text-lg font-bold text-foreground normal-case leading-tight">
          {data.title}
        </h4>
        {data.subtitle && (
          <p className="mt-1 text-sm text-muted-foreground leading-snug">{data.subtitle}</p>
        )}
      </div>
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.items} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}${suffix}`}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
              formatter={(v: number) => [`${v}${suffix}`, "Valor"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.items.map((item, i) => (
                <Cell
                  key={i}
                  fill={item.highlight ? "hsl(var(--trust-blue))" : "hsl(var(--trust-blue) / 0.35)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {data.source && (
        <p className="mt-3 text-[0.7rem] text-muted-foreground italic text-center">
          Fonte: {data.source}
        </p>
      )}
    </figure>
  );
}

type CalloutVariant = "info" | "warning" | "tip" | "success";

const calloutConfig: Record<CalloutVariant, { icon: typeof Info; bg: string; border: string; text: string; title: string }> = {
  info: {
    icon: Info,
    bg: "bg-trust-blue/5",
    border: "border-trust-blue/30",
    text: "text-trust-blue",
    title: "Para entender melhor",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-300/60 dark:border-amber-700/40",
    text: "text-amber-700 dark:text-amber-400",
    title: "Atenção",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-secondary/8",
    border: "border-secondary/40",
    text: "text-secondary-foreground",
    title: "Dica prática",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-300/60 dark:border-emerald-700/40",
    text: "text-emerald-700 dark:text-emerald-400",
    title: "Boa prática",
  },
};

export function CalloutBlock({ raw }: { raw: string }) {
  const data = safeParse<{ variant?: CalloutVariant; title?: string; body: string }>(raw);
  if (!data) return null;
  const variant: CalloutVariant = data.variant && calloutConfig[data.variant] ? data.variant : "info";
  const cfg = calloutConfig[variant];
  const Icon = cfg.icon;
  return (
    <aside
      className={`my-8 rounded-xl border ${cfg.border} ${cfg.bg} p-5 sm:p-6 not-prose flex gap-4`}
    >
      <div className={`shrink-0 ${cfg.text}`}>
        <Icon className="h-5 w-5 mt-0.5" />
      </div>
      <div className="space-y-1.5 min-w-0">
        <p className={`text-xs font-bold uppercase tracking-wider ${cfg.text}`}>
          {data.title ?? cfg.title}
        </p>
        <p className="text-[0.95rem] sm:text-base text-foreground leading-relaxed">{data.body}</p>
      </div>
    </aside>
  );
}

type TimelineItem = { label: string; value: string; description?: string };

export function TimelineBlock({ raw }: { raw: string }) {
  const data = safeParse<{ title?: string; items: TimelineItem[] }>(raw);
  if (!data || !Array.isArray(data.items)) return null;

  return (
    <figure className="my-10 not-prose">
      {data.title && (
        <figcaption className="mb-5 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-trust-blue">
          <span className="h-px w-7 bg-trust-blue" />
          {data.title}
        </figcaption>
      )}
      <div className="relative pl-7 sm:pl-10 border-l-2 border-trust-blue/25 space-y-7">
        {data.items.map((item, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[2.15rem] sm:-left-[3.05rem] top-0.5 flex items-center justify-center h-7 w-7 rounded-full bg-trust-blue text-white text-xs font-bold ring-4 ring-background">
              {i + 1}
            </span>
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-sm font-bold uppercase tracking-wider text-trust-blue">
                  {item.label}
                </span>
                <span className="text-base sm:text-lg font-bold text-foreground normal-case">
                  {item.value}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
