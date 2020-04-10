import React from 'react';

const MAINTAINERS = [
  'zombiej',
  'afc163',
  'chenshuai2144',
  'shaodahong',
  'xrkffgg',
  'AshoneA',
].map(author => author.toLowerCase());

export interface ChangeLogProps {
  hashList: string[];
  lang: 'chinese' | 'english';
  formValues: Record<
    string,
    { use: boolean; chinese: string; english: string; type: string; pr: string; author: string }
  >;
}

function getIcon(type: string) {
  switch (type) {
    case 'bug':
      return '🐞';
    case 'style':
      return '💄';
    case 'feature':
      return '🆕';
    case 'hotFeature':
      return '🔥';
    case 'locale':
      return '🌐';
    case 'doc':
      return '📖';
    case 'test':
      return '✅';
    case 'notice':
      return '🛎';
    case 'accessibility':
      return '⌨️';
    case 'deprecated':
      return '🗑';
    case 'refactor':
      return '🛠';
    case 'perf':
      return '⚡️';
    case 'rtl':
      return '⬅️';
    case 'TypeScript':
      return '🤖';

    default:
      return '🚫';
  }
}

export default function ChangeLog({ hashList, formValues, lang }: ChangeLogProps) {
  let content = '';

  hashList.forEach(hash => {
    const entity = formValues[hash];

    if (!entity) {
      return;
    }

    if (entity.use) {
      content += `- ${getIcon(entity.type)} ${entity[lang]}`;

      if (lang === 'english') {
        content += ' ';
      }

      if (entity.pr) {
        content += `[#${entity.pr}](https://github.com/ant-design/ant-design/pull/${entity.pr})`;
      } else {
        const showHash = hash.slice(0, 7);
        content += `[#${showHash}](https://github.com/ant-design/ant-design/commit/${showHash})`;
      }

      if (entity.author && !MAINTAINERS.includes(entity.author.toLowerCase())) {
        content += ` [@${entity.author}](https://github.com/${entity.author})`;
      }

      content += '\n';
    }
  });

  return (
    <pre
      style={{
        border: '1px solid #CCC',
        background: '#f4f4f4',
        textAlign: 'left',
        padding: 8,
        borderRadius: 2,
        whiteSpace: 'pre-wrap',
      }}
    >
      {content}
    </pre>
  );
}
