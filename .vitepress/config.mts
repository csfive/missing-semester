import { defineConfig, type DefaultTheme, type HeadConfig } from 'vitepress'

const configs = {
  lang: 'zh-CN',
  title: 'missing semester',
  description: 'MIT 计算机教育中缺失的一课课程笔记及课后练习',
  repo: 'csfive/missing-semester',
  umamiId: '49affcdb-336f-4f3b-82f8-f922507c8ae1',
  chineseFont:
    'https://chinese-fonts-cdn.netlify.app/packages/lxgwwenkaibright/dist/LXGWBright-Medium/result.css',
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
    nav: [
      { text: '2020', link: '/2020/01', activeMatch: '/2020/' },
      { text: '2026', link: '/2026/01', activeMatch: '/2026/' },
    ],
    sidebar: [
      {
        text: '2020',
        items: [
          { text: '01. 课程概览与 shell', link: '/2020/01' },
          { text: '02. Shell 工具和脚本', link: '/2020/02' },
          { text: '03. 编辑器（Vim）', link: '/2020/03' },
          { text: '04. 数据整理', link: '/2020/04' },
          { text: '05. 命令行环境', link: '/2020/05' },
          { text: '06. 版本控制（Git）', link: '/2020/06' },
          { text: '07. 调试及性能分析', link: '/2020/07' },
          { text: '08. 元编程', link: '/2020/08' },
          { text: '09. 安全和密码学', link: '/2020/09' },
        ],
      },
      {
        text: '2026',
        items: [
          { text: '01. 课程概览 + Shell 入门', link: '/2026/01' },
          { text: '02. 命令行环境', link: '/2026/02' },
        ],
      },
    ],
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
