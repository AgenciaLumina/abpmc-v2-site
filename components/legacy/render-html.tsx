"use client";
import * as React from "react";
import rehypeParse from "rehype-parse";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

export default function RenderHtml({ html }: { html: string }) {
  const sanitizedHtml = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(html)
    .toString();

  return (
    <div
      className="prose-abpmc"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
