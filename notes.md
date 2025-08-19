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

## 文件权限

查看文件权限通常使用 `ls -l` 命令，其输出格式如下：

```sh
-rw-r--r-- 1 user staff  4096 Aug 18 10:00 myfile.txt
drwxr-x--- 1 user staff  256  Aug 17 15:30 myfolder
```

分析第一行输出 `-rw-r--r--` 的含义：

| 部分 | 含义                                      |
| ---- | ----------------------------------------- |
| -    | 文件类型 (第一个字符)                     |
| rw-  | 所有者 (User) 的权限 (第 2-4 个字符)      |
| r--  | 所属组 (Group) 的权限 (第 5-7 个字符)     |
| r--  | 其他用户 (Others) 的权限 (第 8-10 个字符) |

文件类型主要有三种：

- `-` 表示普通文件 Regular file
- `d` 表示目录 Directory
- `l` 表示符号链接 Symbolic link

`rwx` 表示权限类别：

| 权限         | 符号 | 对文件的含义             | 对目录的含义                               |
| ------------ | ---- | ------------------------ | ------------------------------------------ |
| 读 Read      | `r`  | 可以读取文件的内容       | 可以列出目录中的文件和子目录列表           |
| 写 Write     | `w`  | 可以修改文件的内容       | 可以在目录中创建、删除、重命名文件和子目录 |
| 执行 Execute | `x`  | 可以将文件作为程序来执行 | 可以进入该目录                             |

所以有点反直觉的是：对于目录来说，没有 `x` 权限，即使有 `rw` 权限也无法查看或修改目录内容，因为你必须要能进入目录才能操作。

用户归属共有四种：

- 所有者 User/Owner `u` 创建目录或文件的用户
- 所属组 Group `g` 文件所属的用户组，通常是 user 所在的默认组，一个组可以包含多个 user
- 其他用户 Others `o` 不属于以上两者的用户
- 所有用户 All `a` 代表以上三者

## `chmod` 的用法

`chmod` 即 change mode，有两种使用方式：符号模式和八进制模式。

符号模式在理解了文件权限后，基本语法就很直观了：

```sh
chmod [用户归属][操作符][权限] 文件名
```

举例说明：

```sh
# 为所有者增加可执行权限
chmod u+x myfile.txt

# 从所属组和其他用户中移除写权限
chmod go-w myfile.txt

# 为所有用户添加读权限
chmod a+r myfile.txt
# 可以省略 a，直接写成 chmod +r myfile.txt

# 精确设置权限：所有者可读写，组用户只读，其他用户无权限
chmod u=rw,g=r,o= myfile.txt

# +-= 操作符的含义分别是添加、删除、精确设置（覆盖原有）
```

八进制模式是另一种更紧凑的表示方式，每个用户的权限都用三个数字来表示。

`rwx` 的值分别是 421，所以只有 `rw` 权限是 6，只有 `wx` 权限是 3，没有任何权限是 0，所有权限都有是 7。

```sh
chmod [ugo] 文件名
```

一些示例：

- 普通文件 `chmod 644 myfile.txt` 所有者可读写（r4+w2），组用户和其他用户只读（r4）
- 普通目录 `chmod 755 myfolder` 允许所有人进入并查看内容（r4+x1），但只有所有者可以修改（r4+w2+x1）
- 私有目录 `chmod 700 myfolder` 只有所有者可以进入并查看内容（r4+w2+x1）
