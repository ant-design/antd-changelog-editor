import React from 'react';

// https://github.com/orgs/ant-design/teams/ant-design-collaborators/members
const MAINTAINERS = [
  'zombiej',
  'afc163',
  'chenshuai2144',
  'shaodahong',
  'xrkffgg',
  'AshoneA',
  'yesmeck',
  'bang88',
  'yoyo837',
  'hengkx',
  'Rustin-Liu',
  'fireairforce',
  'Kermit-Xuan',
].map((author) => author.toLowerCase());

export interface ChangeLogProps {
  hashList: string[];
  lang: 'chinese' | 'english';
  repo: string;
  formValues: Record<
    string,
    {
      use: boolean;
      chinese: string;
      english: string;
      type: string;
      pr: string;
      author: string;
      component: string;
    }
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
      return '🤖';

    default:
      return '🚫';
  }
}

export default function ChangeLog({ hashList, formValues, lang, repo }: ChangeLogProps) {
  const lines: string[] = [];
  const rtlLines: string[] = [];
  const tsLines: string[] = [];
  const componentLines: Record<string, string[]> = {};

  hashList.forEach((hash) => {
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
        content += `[#${entity.pr}](https://github.com/${repo}/pull/${entity.pr})`;
      } else {
        const showHash = hash.slice(0, 7);
        content += `[${showHash}](https://github.com/${repo}/commit/${showHash})`;
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
          if (entity.component) {
            componentLines[entity.component] = componentLines[entity.component] || [];
            componentLines[entity.component].push(content);
          } else {
            lines.push(content);
          }
      }
    }
  });

  const componentContext = Object.keys(componentLines)
    .map((component) => {
      const cLines = componentLines[component];
      if (cLines.length > 1) {
        return `- ${component}\n${cLines.map((str) => `  ${str}`).join('\n')}`;
      }
      return cLines[0];
    })
    .join('\n');

  return (
    <pre
      style={{
        background: '#fafafa',
        textAlign: 'left',
        padding: 16,
        borderRadius: 2,
        whiteSpace: 'pre-wrap',
        margin: 0,
      }}
    >
      {componentContext ? `${componentContext}\n` : null}
      {lines.join('\n')}
      {rtlLines.length ? `\n- RTL\n${rtlLines.map((str) => `  ${str}`).join('\n')}` : null}
      {tsLines.length ? `\n- TypeScript\n${tsLines.map((str) => `  ${str}`).join('\n')}` : null}
    </pre>
  );
}
