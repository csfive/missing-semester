import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'missing semester',
  lang: 'zh-CN',
  base: 'missing-semester',
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/csfive/missing-semester' }],
    search: {
      provider: 'local',
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
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
      },
    ],
  ],
})
