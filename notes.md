# 00. 课程笔记

学习这门课的一些记录和思考 🤔

## `man` 的用法

`man` 命令通常使用一个名为 `less` 的分页器来显示内容，因此可以使用 `less` 的快捷键来浏览手册页：

| 快捷键              | 功能                           |
| ------------------- | ------------------------------ |
| `q`                 | 退出                           |
| `h`                 | 显示帮助，所有快捷键都在这里   |
| `j` 和 `k`          | 上下移动，上下箭头也可以       |
| `/` + 关键词 + 回车 | 向下搜索关键词                 |
| `?` + 关键词 + 回车 | 向上搜索关键词                 |
| `n` 和 `N`          | 跳转到下一个和上一个搜索匹配项 |

然后来熟悉一下 `man` 手册页的标准化结构，主要包含以下几个部分：

| 部分        | 含义                           |
| ----------- | ------------------------------ |
| NAME        | 名称和简短描述                 |
| SYNOPSIS    | 语法格式                       |
| DESCRIPTION | 详细描述                       |
| OPTIONS     | 可选参数说明                   |
| EXIT STATUS | 退出状态，一个返回给父进程的值 |
| EXAMPLES    | 一些示例                       |
| SEE ALSO    | 相关的其他命令或手册页         |
| AUTHORS     | 作者                           |

比如说你想搞懂 `ls -a` 的含义，你可以输入 `/-a` 后回车，通过 `n` 跳过无关匹配项，然后就可以找到：

```
-a  Include directory entries whose names begin with a dot (‘.’).
```

其他用法可以通过 `man man` 来查看。

## tldr

> The tldr-pages project is a collection of community-maintained help pages for command-line tools, that aims to be a simpler, more approachable complement to traditional man pages.

如果你只想了解或快速回忆起某个具体命令的用法，那 [tldr](https://github.com/tldr-pages/tldr) 会是一个不错的选择。

```sh
# 通过 npm 安装
npm install -g tldr

# 通过 python 安装
pip3 install tldr

# 通过 homebrew 安装
brew install tlrc
```

不想安装的话，也可以选择 [浏览器版本](https://tldr.inbrowser.app) 在线搜索。

## quoting 之间的区别

- 转义符 `\` 会移除它后面单个字符的任何特殊含义
- 单引号 `'...'` 会保留每个字符的字面值，内部不能再出现单引号，即使转义也不行
- 同样的，双引号 `"..."` 也会保留字符字面值，但有三个例外：‘$’、‘`’ 和 ‘\’
- ANSI-C 引用 `$'...'` 会将其中的反斜杠转义序列替换为 ANSI-C 标准中指定的字符

```sh
❯ echo \$SHELL
$SHELL
❯ echo '$SHELL'
$SHELL
❯ echo "$SHELL"
/bin/zsh
❯ echo $'First line\nSecond line'
First line
Second line
```

## `>` 和 `|` 的区别

| 名称     | `>`                        | `\|`                               |
| -------- | :------------------------- | :--------------------------------- |
| 中文名   | 输出重定向                 | 管道                               |
| 目标     | 将命令的输出写入文件       | 将命令的输出传给另一个命令作为输入 |
| 数据流   | 命令 -> 文件               | 命令1 -> 命令2                     |
| 右侧对象 | 文件                       | 命令                               |
| 比喻     | 打印机（将结果输出到纸上） | 流水线（将半成品交给下一道工序）   |

## Shebang

Shebang 必须位于脚本文件的第一行，第一列，其基本结构如下：

```sh
#!/path/to/interpreter [optional-arguments]
```

`#!` 就是 Hash + Bang，也是 Shebang 名字的由来。

它的唯一作用就是告诉操作系统应该使用哪个解释器（interpreter）来执行这个脚本文件。

## 文件权限和 chmod
