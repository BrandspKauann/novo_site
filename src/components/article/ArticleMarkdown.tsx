import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const WHATSAPP_HREF = "https://wa.link/d3f6ih";

const markdownComponents: Partial<Components> = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground first:mt-0 sm:text-3xl md:text-4xl"
      {...props}
    >
      <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{children}</span>
      <span className="mt-3 block h-1 w-16 max-w-full rounded-full bg-gradient-to-r from-trust-blue to-secondary sm:w-24" />
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-4 flex scroll-mt-24 flex-wrap items-center gap-3 border-b border-border/80 pb-3 text-xl font-bold text-foreground sm:text-2xl"
      {...props}
    >
      <span className="inline-flex h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-trust-blue to-trust-blue-light" />
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 flex scroll-mt-24 items-start gap-2 text-lg font-semibold text-foreground sm:text-xl"
      {...props}
    >
      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-secondary ring-4 ring-secondary/20" />
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-base font-semibold uppercase tracking-wide text-muted-foreground sm:text-lg" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 text-base leading-[1.75] text-muted-foreground last:mb-0 sm:text-[1.0625rem]" {...props}>
      {children}
    </p>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="text-foreground/90 not-italic underline decoration-trust-blue/40 decoration-2 underline-offset-4" {...props}>
      {children}
    </em>
  ),
  a: ({ href, children, ...props }) => {
    const external = href?.startsWith("http");
    const isWa = href?.includes("wa.me") || href?.includes("whatsapp") || href === WHATSAPP_HREF;
    return (
      <a
        href={href}
        className={cn(
          "group inline-flex items-center gap-1 font-medium text-trust-blue underline decoration-trust-blue/30 underline-offset-4 transition-colors hover:text-trust-blue-light hover:decoration-trust-blue",
          isWa && "text-emerald-600 decoration-emerald-500/40 hover:text-emerald-700 dark:text-emerald-400"
        )}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {external && <ExternalLink className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="my-6 ml-1 list-none space-y-2.5 pl-0 text-muted-foreground [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.55em] [&>li]:before:h-2 [&>li]:before:w-2 [&>li]:before:rounded-full [&>li]:before:bg-gradient-to-br [&>li]:before:from-trust-blue [&>li]:before:to-trust-blue-light [&>li]:before:shadow-sm [&>li]:before:content-[''] [&>li:has(>input)]:before:hidden [&>li:has(>input)]:pl-0"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-6 ml-4 list-decimal space-y-3 pl-1 marker:font-semibold marker:text-trust-blue" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed [&>ul]:mt-2 [&>ol]:mt-2 [&:has(>input[type=checkbox])]:flex [&:has(>input[type=checkbox])]:items-start [&:has(>input[type=checkbox])]:gap-2 [&:has(>input[type=checkbox])]:pl-0" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="relative my-8 overflow-hidden rounded-2xl border border-trust-blue/20 bg-gradient-to-br from-trust-blue/[0.06] via-muted/30 to-secondary/[0.08] px-5 py-6 shadow-sm dark:from-trust-blue/10 dark:via-muted/20"
      {...props}
    >
      <span
        className="pointer-events-none absolute -left-1 top-2 font-serif text-6xl leading-none text-trust-blue/15 select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <div className="relative z-[1] text-[1.05rem] leading-relaxed text-foreground/95 [&_p]:mb-3 [&_p:last-child]:mb-0">
        {children}
      </div>
    </blockquote>
  ),
  hr: () => (
    <div className="my-12 flex items-center gap-3" role="separator">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-trust-blue/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-secondary/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-trust-blue/50" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-8 overflow-x-auto rounded-xl border border-border/80 bg-muted/60 p-4 text-sm shadow-inner dark:bg-muted/40 sm:p-5"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.includes("language-"));
    if (isBlock) {
      return (
        <code className={cn("font-mono text-[0.8125rem] leading-relaxed text-foreground sm:text-sm", className)} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md border border-border/80 bg-primary/5 px-1.5 py-0.5 font-mono text-[0.85em] text-trust-blue dark:bg-primary/10"
        {...props}
      >
        {children}
      </code>
    );
  },
  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/60 shadow-sm">
      <table className="w-full min-w-[280px] border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => <thead className="bg-muted/70 dark:bg-muted/50" {...props}>{children}</thead>,
  tbody: ({ children, ...props }) => <tbody className="divide-y divide-border/60" {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => (
    <tr className="transition-colors hover:bg-muted/40 dark:hover:bg-muted/25" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground sm:px-5" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3.5 text-muted-foreground sm:px-5" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }) => (
    <span className="my-8 block">
      <img
        src={src}
        alt={alt ?? ""}
        className="mx-auto max-h-[min(70vh,520px)] w-full max-w-3xl rounded-2xl border border-border/50 object-cover shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
        loading="lazy"
        {...props}
      />
      {alt ? (
        <span className="mt-2 block text-center text-xs text-muted-foreground">{alt}</span>
      ) : null}
    </span>
  ),
  input: ({ type, checked, ...props }) => {
    if (type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={checked}
          readOnly
          disabled
          className="mr-2 mt-1 h-4 w-4 shrink-0 rounded border-border text-trust-blue"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },
};

type ArticleMarkdownProps = {
  content: string;
  className?: string;
};

export function ArticleMarkdown({ content, className }: ArticleMarkdownProps) {
  return (
    <div
      className={cn(
        "article-markdown max-w-none [&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:max-w-3xl [&_iframe]:rounded-xl [&_iframe]:border [&_iframe]:border-border/50 [&_iframe]:shadow-lg",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
