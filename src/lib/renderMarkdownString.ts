import {
  createMarkdownProcessor,
  markdownConfigDefaults,
} from '@astrojs/markdown-remark';

let processorPromise: ReturnType<typeof createMarkdownProcessor> | null = null;

function getProcessor() {
  processorPromise ??= createMarkdownProcessor(markdownConfigDefaults);
  return processorPromise;
}

/** Renders markdown to HTML using the same defaults as Astro content markdown. */
export async function renderMarkdownString(markdown: string): Promise<string> {
  const processor = await getProcessor();
  const { code } = await processor.render(markdown.trim() ? markdown : '\n', {
    frontmatter: {},
  });
  return code;
}
