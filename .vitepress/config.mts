import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'missing semester',
  description: 'MIT 计算机教育中缺失的一课的习题解答',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    container: {
      tipLabel: 'Exercise',
    },
    image: {
      lazyLoading: true,
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    sidebar: [
      {
        items: [
          { text: '01. 课程概览与 shell', link: '/01/README' },
          { text: '02. Shell 工具和脚本', link: '/02/README' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/csfive' }],
    editLink: {
      pattern: 'https://github.com/csfive/missing-semester/edit/main/:path',
      text: '在 GitHub 上编辑此页面',
    },
    lastUpdated: {
      text: '最近更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkaibright/dist/LXGWBright-Medium/result.css',
      },
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
      },
    ],
    [
      'script',
      {
        defer: '',
        src: 'https://a.mancuoj.me/script.js',
        'data-website-id': 'c539d121-756d-405e-8402-e3fbb79a812f',
      },
    ],
  ],
})
