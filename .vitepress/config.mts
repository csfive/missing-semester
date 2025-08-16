import { defineConfig, type DefaultTheme, type HeadConfig } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = [
  {
    items: [
      { text: '00. 课程笔记', link: '/notes' },
      { text: '01. 课程概览与 shell', link: '/01/README' },
      { text: '02. Shell 工具和脚本', link: '/02/README' },
    ],
  },
]

const configs = {
  sidebar,
  lang: 'zh-CN',
  title: 'missing semester',
  description: 'MIT 计算机教育中缺失的一课课程笔记及课后练习',
  repo: 'csfive/missing-semester',
  umamiId: 'c539d121-756d-405e-8402-e3fbb79a812f',
  chineseFont:
    'https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkaibright/dist/LXGWBright-Medium/result.css',
  googleFont:
    'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
}

export default defineConfig({
  lang: configs.lang,
  title: configs.title,
  titleTemplate: ':title',
  description: configs.description,
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    math: true,
    image: {
      lazyLoading: true,
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    sidebar: configs.sidebar,
    socialLinks: [{ icon: 'github', link: `https://github.com/${configs.repo}` }],
    ...getLabel(),
  },
  head: getHead(),
})

function getHead() {
  const head: HeadConfig[] = [['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }]]
  if (configs.chineseFont) {
    head.push(['link', { rel: 'stylesheet', href: configs.chineseFont }])
  }
  if (configs.googleFont) {
    head.push(['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }])
    head.push(['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }])
    head.push(['link', { rel: 'stylesheet', href: configs.googleFont }])
  }
  if (configs.umamiId) {
    head.push([
      'script',
      { defer: '', src: 'https://a.mancuoj.me/script.js', 'data-website-id': configs.umamiId },
    ])
  }
  return head
}

function getLabel(): DefaultTheme.Config {
  if (configs.lang === 'zh-CN') {
    return {
      editLink: {
        pattern: `https://github.com/${configs.repo}/edit/main/:path`,
        text: '在 GitHub 上编辑此页面',
      },
      lastUpdated: {
        text: '最近更新于',
        formatOptions: { dateStyle: 'short', timeStyle: 'short' },
      },
      docFooter: { prev: '上一页', next: '下一页' },
      outlineTitle: '大纲',
      langMenuLabel: '切换语言',
      returnToTopLabel: '返回顶部',
      sidebarMenuLabel: '侧边栏目录',
      skipToContentLabel: '跳转至内容',
      darkModeSwitchTitle: '切换到暗色模式',
      lightModeSwitchTitle: '切换到亮色模式',
      darkModeSwitchLabel: '切换主题',
    }
  }
  return {
    editLink: {
      pattern: `https://github.com/${configs.repo}/edit/main/:path`,
    },
    lastUpdated: {
      formatOptions: { dateStyle: 'short', timeStyle: 'short' },
    },
  }
}
