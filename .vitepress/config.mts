import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'missing semester',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.svg',
    sidebar: [
      {
        items: [
          { text: '01 课程概览与 shell', link: '/01/README' },
          { text: '02 Shell 工具和脚本', link: '/02/README' },
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
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { ref: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap' }]
  ],
})
