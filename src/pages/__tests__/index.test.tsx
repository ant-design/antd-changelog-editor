import Index from '..';
import React from 'react';
import renderer, { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

describe('Page: index', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    // @ts-ignore
    window.changelog = [
      {
        pr: '23118',
        hash: 'd968fce4dc1cfa3924fef53f6239677ded10ff11',
        title: 'chore: Add warning for async',
        author: 'zombieJ',
        english:
          'Table add warning info when async mode dataSource length not match with pageSize.',
        chinese: 'Table 在异步数据下 dataSource长度与 pageSize 不匹配时，添加警告信息。',
      },
      {
        pr: '23114',
        hash: '405d4613609321b2aa06e34d4cca2ef3388b9318',
        title: 'fix: substitute "易用行" with "易用性"',
        author: 'stimulate',
        english: 'fix: substitute "易用行" with "易用性"',
        chinese: 'fix: substitute "易用行" with "易用性"',
      },
      {
        pr: '23115',
        hash: 'f3df9ec89446b6f2efd6391be8ff162a2633e983',
        title: 'fix: Input background with dark mode',
        author: 'zombieJ',
        english: 'Fix Input with affix background style in dark theme.',
        chinese: '修复 Input 在暗黑模式下使用 affix  的背景样式问题。',
      },
      {
        pr: '23113',
        hash: '8e56354de2c146cc8b549491d87779e0f1ff803d',
        title: 'style: 💄 Tweak Table hover background color',
        author: 'afc163',
        english: 'Tweak Table hover background color.',
        chinese: '微调 Table 行 hover 时的背景色。',
      },
      {
        pr: '23110',
        hash: 'a10631993432242965ea79658b2c2119fdd28fc3',
        title: 'fix: Table selection style',
        author: 'zombieJ',
        english: 'Fix Table selection row with hover background style.',
        chinese: '修复 Table 选择行在 hover 时的背景样式问题。',
      },
      {
        pr: '23108',
        hash: '9b9839d4d93ef67f70b9bc532189a01dc8e9d7a5',
        title: 'docs: Update Form normalize desc',
        author: 'zombieJ',
        english: 'docs: Update Form normalize desc',
        chinese: 'docs: Update Form normalize desc',
      },
      {
        pr: '23097',
        hash: '2cbad48ace47e83f55d25063cca01c40796078d4',
        title: 'style: optimize select dropdown style in rtl',
        author: 'xrkffgg',
        english: 'optimize select dropdown style in rtl',
        chinese: '优化 Select RTL 模式下拉框样式',
      },
      {
        pr: '23087',
        hash: '37ad43bc9fff4588d0e864950aa61b721cc09101',
        title: 'fix: Tabs bottom style',
        author: 'zombieJ',
        english: 'Fix Tabs bottom card active tab wrong height style.',
        chinese: '修复 Tabs 下方卡片布局激活标签的高度问题。',
      },
      {
        pr: '23078',
        hash: 'a8b976b8028969cf33161cd44e6b47495bdaf97e',
        title: 'docs: update Radio.Button',
        author: 'afc163',
        english: 'docs: update Radio.Button',
        chinese: 'docs: update Radio.Button',
      },
      {
        pr: '23081',
        hash: '4794bae529a8e954d9cd02ec2d8021518a35d327',
        title: 'fix: Calendar missing style',
        author: 'zombieJ',
        english: 'Fix Calendar missing style prop support.',
        chinese: '修复 Calendar 不支持 style 的问题。',
      },
      {
        pr: '23076',
        hash: '192146d2a2fab902e861f1693e05f01d296fb48d',
        title: 'style: optimize mentions dropdown in RTL',
        author: 'xrkffgg',
        english: 'optimize mentions dropdown style in RTL',
        chinese: '优化 Mentions RTL 模式下拉框样式',
      },
      {
        pr: '23074',
        hash: 'ecf025548b0e5b7cbfb5a59b7881e5eec53bcb62',
        title: 'chore: adjust RangePicker style',
        author: 'zombieJ',
        english: 'chore: adjust RangePicker style',
        chinese: 'chore: adjust RangePicker style',
      },
      {
        pr: '22857',
        hash: 'e652eef04ce2e3dbd570e4bc52049325ecb31632',
        title: 'style: add rtl base',
        author: 'xrkffgg',
        english: 'none',
        chinese: 'none',
      },
      {
        pr: '22595',
        hash: '4d31ed89946c4133ff1f8792aca8abae1021ee55',
        title: 'style: optimize datepicker rtl style',
        author: 'xrkffgg',
        english: 'optimization DatePicker RTL style',
        chinese: '优化 DatePicker 的 RTL 样式',
      },
      {
        hash: 'b6829a0a924053e445714b07f0b5f99bf7d67a31',
        title: 'style: fix color picker z-index',
      },
    ];
  });
  it('Render correctly', () => {
    const wrapper: ReactTestRenderer = renderer.create(<Index />);
    expect(wrapper.root.children.length).toBe(1);
    const outerLayer = wrapper.root.children[0] as ReactTestInstance;
    expect(outerLayer.type).toBe('div');
    expect(outerLayer.children.length).toBe(2);
  });
});
