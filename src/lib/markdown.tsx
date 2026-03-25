import { Fragment, type ReactNode } from "react";

const renderInline = (text: string) => {
  const pieces: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  match = regex.exec(text);
  while (match) {
    if (match.index > cursor) {
      pieces.push(text.slice(cursor, match.index));
    }

    const token = match[0];

    if (token.startsWith("**") && token.endsWith("**")) {
      pieces.push(
        <strong key={`${match.index}-strong`} className="text-foreground font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        pieces.push(
          <a
            key={`${match.index}-link`}
            href={linkMatch[2]}
            className="text-primary underline underline-offset-4"
            target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
            rel={linkMatch[2].startsWith("http") ? "noreferrer" : undefined}
          >
            {linkMatch[1]}
          </a>,
        );
      }
    }

    cursor = match.index + token.length;
    match = regex.exec(text);
  }

  if (cursor < text.length) {
    pieces.push(text.slice(cursor));
  }

  return pieces;
};

export const renderMarkdown = (markdown: string) => {
  const lines = markdown.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: Array<{ ordered: boolean; value: string }> = [];

  const flushList = () => {
    if (!listBuffer.length) return;

    const ordered = listBuffer[0].ordered;
    const items = listBuffer;
    listBuffer = [];

    if (ordered) {
      nodes.push(
        <ol key={`list-${nodes.length}`} className="list-decimal pl-6 space-y-2 text-muted-foreground">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item.value)}</li>
          ))}
        </ol>,
      );
      return;
    }

    nodes.push(
      <ul key={`list-${nodes.length}`} className="list-disc pl-6 space-y-2 text-muted-foreground">
        {items.map((item, idx) => (
          <li key={idx}>{renderInline(item.value)}</li>
        ))}
      </ul>,
    );
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);

    if (orderedMatch) {
      listBuffer.push({ ordered: true, value: orderedMatch[1] });
      return;
    }

    if (unorderedMatch) {
      listBuffer.push({ ordered: false, value: unorderedMatch[1] });
      return;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      nodes.push(
        <h3 key={`h3-${index}`} className="text-2xl font-semibold mt-8 mb-4 text-foreground">
          {trimmed.slice(4)}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      nodes.push(
        <h2 key={`h2-${index}`} className="text-3xl font-serif mt-10 mb-4 text-foreground">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith("# ")) {
      nodes.push(
        <h1 key={`h1-${index}`} className="text-4xl font-serif mt-10 mb-4 text-foreground">
          {trimmed.slice(2)}
        </h1>,
      );
      return;
    }

    nodes.push(
      <p key={`p-${index}`} className="text-muted-foreground leading-8">
        {renderInline(trimmed).map((part, partIdx) => (
          <Fragment key={`${index}-${partIdx}`}>{part}</Fragment>
        ))}
      </p>,
    );
  });

  flushList();
  return nodes;
};
