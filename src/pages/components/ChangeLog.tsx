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
      return '💄';
    case 'ts':
      return null;

    default:
      return '🚫';
  }
}

export default function ChangeLog({ hashList, formValues, lang }: ChangeLogProps) {
  const lines: string[] = [];
  const rtlLines: string[] = [];
  const tsLines: string[] = [];

  hashList.forEach(hash => {
    const entity = formValues[hash];

    if (!entity) {
      return;
    }

    let content = '';
    if (entity.use) {
      const icon = getIcon(entity.type);
      const iconStr = icon ? `${icon} ` : '';
      content += `- ${iconStr}${entity[lang].trim()}`;

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

      switch (entity.type) {
        case 'rtl':
          rtlLines.push(content);
          break;
        case 'ts':
          tsLines.push(content);
          break;
        default:
          lines.push(content);
      }
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
      {lines.join('\n')}
      {rtlLines.length ? `\n- RTL\n${rtlLines.map(str => `  ${str}`).join('\n')}` : null}
      {tsLines.length ? `\n- TypeScript\n${tsLines.map(str => `  ${str}`).join('\n')}` : null}
    </pre>
  );
}
