import React from 'react';

/** `[label](#anchor)` in copy constants → internal link. */
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\((#[^)]+)\)/g;

function parseLinkedText(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  const re = new RegExp(MARKDOWN_LINK_RE.source, MARKDOWN_LINK_RE.flags);
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const index = match.index;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }
    nodes.push(
      <a
        key={index}
        href={match[2]}
        className='font-medium text-ink underline decoration-accent/50 underline-offset-2 transition-colors hover:text-accent'
      >
        {match[1]}
      </a>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
}

type LinkedTextProps = {
  children: string;
};

const LinkedText: React.FC<LinkedTextProps> = ({ children }) => {
  return <>{parseLinkedText(children)}</>;
};

export default LinkedText;
