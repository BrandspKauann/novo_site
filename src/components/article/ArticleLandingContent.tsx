import type { ReactNode } from "react";
import { ArticleMarkdown } from "@/components/article/ArticleMarkdown";

/** HTML do CMS — tipografia ampla estilo landing (sem depender de markdown). */
const articleLandingHtmlClass =
  "article-landing-html max-w-none text-muted-foreground " +
  "[&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:first:mt-0 sm:[&_h1]:text-4xl " +
  "[&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:scroll-mt-28 [&_h2]:border-l-4 [&_h2]:border-trust-blue [&_h2]:pl-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground sm:[&_h2]:text-3xl " +
  "[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground sm:[&_h3]:text-2xl " +
  "[&_p]:mb-6 [&_p]:text-base [&_p]:leading-[1.85] sm:[&_p]:text-lg " +
  "[&_strong]:font-semibold [&_strong]:text-foreground " +
  "[&_blockquote]:my-10 [&_blockquote]:rounded-2xl [&_blockquote]:border [&_blockquote]:border-trust-blue/25 [&_blockquote]:bg-gradient-to-br [&_blockquote]:from-trust-blue/[0.07] [&_blockquote]:to-muted/40 [&_blockquote]:px-6 [&_blockquote]:py-8 [&_blockquote]:text-lg [&_blockquote]:leading-relaxed " +
  "[&_ul]:my-8 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:marker:text-trust-blue " +
  "[&_ol]:my-8 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_ol]:marker:font-semibold [&_ol]:marker:text-trust-blue " +
  "[&_a]:font-medium [&_a]:text-trust-blue [&_a]:underline [&_a]:underline-offset-4 " +
  "[&_code]:rounded-md [&_code]:border [&_code]:bg-muted/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm " +
  "[&_pre]:my-10 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:bg-muted/50 [&_pre]:p-5 " +
  "[&_table]:my-10 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-2xl [&_table]:border [&_table]:shadow-sm " +
  "[&_th]:bg-muted/80 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase " +
  "[&_td]:border-t [&_td]:px-4 [&_td]:py-3 " +
  "[&_hr]:my-14 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-border [&_hr]:to-transparent " +
  "[&_img]:my-10 [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:shadow-xl " +
  "[&_iframe]:my-10 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:max-w-4xl [&_iframe]:rounded-2xl [&_iframe]:border";

type Props = {
  content: string;
};

export function ArticleLandingContent({ content }: Props) {
  if (!content.trim()) {
    return (
      <p className="text-muted-foreground">
        Este artigo ainda não possui conteúdo completo cadastrado.
      </p>
    );
  }

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);
  const startsWithMarkdownHeading = /^#{1,6}\s/m.test(content.trimStart());

  const shell = (inner: ReactNode) => (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-4 -top-8 bottom-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(5,46,92,0.06),transparent_65%)] sm:-inset-x-8"
        aria-hidden
      />
      <div className="relative border border-border/40 bg-gradient-to-b from-card/80 to-muted/20 px-3 py-6 shadow-sm sm:rounded-3xl sm:px-8 sm:py-10 md:px-12 md:py-14">
        {inner}
      </div>
    </div>
  );

  if (looksLikeHtml && !content.includes("```") && !startsWithMarkdownHeading) {
    return shell(
      <div className={articleLandingHtmlClass} dangerouslySetInnerHTML={{ __html: content }} />,
    );
  }

  return shell(<ArticleMarkdown content={content} className="border-0 bg-transparent p-0 shadow-none" />);
}
