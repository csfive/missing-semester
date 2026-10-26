# 课程概览与 Shell

- [Exercises](https://missing.csail.mit.edu/2026/course-shell/#exercises) · [中文讲义](https://missing-semester-cn.github.io/2026/course-shell/)
- 环境：Linux / zsh 5.5.1

> 题目按英文原版重译，术语保留英文原文。

## 1. 确认 Shell

> [!IMPORTANT]
> **题目**：本课程要求你使用类 Unix 的 Shell，例如 Bash 或 ZSH。Linux 和 macOS 用户不需要额外设置。Windows 用户请确认自己不是在用 `cmd.exe` 或 `PowerShell`，而是通过 WSL 或 Linux 虚拟机获得 Unix 风格的命令行工具。运行 `echo $SHELL` 可以检查当前使用的 Shell：如果输出类似 `/bin/bash` 或 `/usr/bin/zsh`，就说明环境没问题。

```console
$ echo $SHELL
/bin/zsh
```

## 2. `ls -l` 与权限位

> [!IMPORTANT]
> **题目**：`ls` 的 `-l` 选项（flag）有什么作用？运行 `ls -l /` 观察输出。每行最前面的 10 个字符分别表示什么？（提示：`man ls`）

**答**：`-l` 是长格式；每行前 10 个字符 = 1 位文件类型 + owner/group/other 三组 `rwx`。

> 展开：[笔记 · 权限](https://csfive.netlify.app/ms/00#权限)

## 3. glob 通配符

> [!IMPORTANT]
> **题目**：在命令 `find ~/Downloads -type f -name "*.zip" -mtime +30` 中，`*.zip` 是一个 glob（文件名通配模式）。glob 是什么？新建一个测试目录，在里面放几个文件，然后分别试试 `ls *.txt`、`ls file?.txt`、`ls {a,b,c}.txt`，观察每个模式匹配到了什么。参见 Bash 手册中的 [Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)。

**答**：glob 是 Shell 在 exec 前做的文件名展开，`*` 匹配任意串、`?` 匹配单字符；`{a,b}` 属于 brace expansion，不是 glob。

> 展开：[笔记 · 文件名展开](https://csfive.netlify.app/ms/00#文件名展开)

## 4. 三种引号

> [!IMPORTANT]
> **题目**：`'单引号'`、`"双引号"` 和 `$'ANSI 引号'` 之间有什么区别？写一条命令，输出一个字符串，其中同时包含字面量 `$`、`!` 和换行符。参见 [Quoting](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)。

**答**：单引号全部按字面；双引号保留空白但展开 `$` 和命令替换；`$'...'` 额外支持 `\n` 等 ANSI-C 转义。

> 展开：[笔记 · 引号](https://csfive.netlify.app/ms/00#引号)

## 5. 标准流与重定向

> [!IMPORTANT]
> **题目**：Shell 有三条标准流：标准输入（stdin，0）、标准输出（stdout，1）和标准错误（stderr，2）。运行 `ls /nonexistent /tmp`，把 stdout 重定向到一个文件，把 stderr 重定向到另一个文件。如果要把两者都写入同一个文件，应该怎么写？参见 [Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)。

```sh
# 分开存
ls /nonexistent /tmp > out.txt 2> err.txt

# 写入同一个文件
ls /nonexistent /tmp > all.txt 2>&1
```

> 展开：[笔记 · 重定向和管道](https://csfive.netlify.app/ms/00#重定向和管道)

## 6. 退出状态与条件执行

> [!IMPORTANT]
> **题目**：`$?` 保存上一条命令的退出状态（0 表示成功）。`&&` 只在上一条命令成功时执行后一条；`||` 只在上一条命令失败时执行后一条。写一条单行命令：仅当 `/tmp/mydir` 不存在时，才创建它。参见 [Exit Status](https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html)。

```sh
test -d /tmp/mydir || mkdir /tmp/mydir
```

> 展开：[笔记 · bash 编程与脚本](https://csfive.netlify.app/ms/00#bash-编程与脚本)

## 7. 为什么 `cd` 是内建命令

> [!IMPORTANT]
> **题目**：为什么 `cd` 必须由 Shell 自己实现（内建命令），而不能做成独立程序？（提示：想一想子进程能改变父进程的哪些状态，不能改变哪些状态。）

**答**：如果 `cd` 是独立程序，它只会在子进程里调用 `chdir`，改完自己就退出了；父 Shell 的当前目录完全没变。

> 展开：[笔记 · 有些命令不能交给子进程](https://csfive.netlify.app/ms/00#有些命令不能交给子进程)

## 8. 检查文件是否存在

> [!IMPORTANT]
> **题目**：写一个脚本，从第一个参数（`$1`）接收文件名，用 `test -f` 或 `[ -f ... ]` 判断该文件是否存在。根据文件是否存在，打印不同的提示。参见 [Bash Conditional Expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)。

```sh
#!/usr/bin/env bash

if [ -f "$1" ]; then
  echo "存在：$1"
else
  echo "不存在：$1"
fi
```

## 9. 可执行权限

> [!IMPORTANT]
> **题目**：把上一题的脚本保存成文件（例如 `check.sh`）。先用 `./check.sh somefile` 运行它，会发生什么？然后执行 `chmod +x check.sh`，再运行一次。为什么这一步是必须的？（提示：对比执行 `chmod` 前后 `ls -l check.sh` 的输出。`somefile` 只是传给脚本的参数，可以换成任意路径。）

**答**：没有执行位时，会被系统拒绝，报 `permission denied`（退出码 126）；`chmod +x` 加上执行位后就能运行，因为内核执行文件时会检查 x 位。

## 10. `set -x` 的作用

> [!IMPORTANT]
> **题目**：在脚本的 `set` 选项（例如 `set -euo pipefail`）里加上 `-x` 会发生什么？写一个简单脚本试一试，观察输出。参见 [The Set Builtin](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)。

**答**：`set -x` 会在执行每条命令前，把展开后的命令打印到 stderr（默认以 `+ ` 为前缀），用于跟踪脚本执行。

## 11. 带日期的备份

> [!IMPORTANT]
> **题目**：写一条命令，把文件复制成一个带当天日期的备份文件（例如 `notes.txt` → `notes_2026-01-12.txt`）。（提示：`$(date +%Y-%m-%d)`）参见 [Command Substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html)。

```sh
cp notes.txt "notes_$(date +%Y-%m-%d).txt"
```

## 12. 参数化 flaky test 脚本

> [!IMPORTANT]
> **题目**：修改讲义中那个反复运行测试、直到某次失败的脚本（flaky test 脚本）：不要在脚本里写死 `cargo test my_test`，而是从命令行参数接收要运行的测试命令。（提示：`$1` 或 `$@`）参见 [Special Parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html)。

```bash
#!/bin/bash
set -euo pipefail

# Start CPU stress in background
stress --cpu 8 &
STRESS_PID=$!

# Setup log file
LOGFILE="test_runs_$(date +%s).log"
echo "Logging to $LOGFILE"

# Run tests until one fails
RUN=1
while "$@" > "$LOGFILE" 2>&1; do
    echo "Run $RUN passed"
    ((RUN++))
done

# Cleanup and report
kill $STRESS_PID
echo "Test failed on run $RUN"
echo "Last 20 lines of output:"
tail -n 20 "$LOGFILE"
echo "Full log: $LOGFILE"
```

## 13. 最常见的 5 种扩展名

> [!IMPORTANT]
> **题目**：用管道找出你的 home 目录中出现次数最多的 5 种文件扩展名（例如 `.txt`、`.js`）。（提示：组合使用 `find`、`grep` / `sed` / `awk`、`sort`、`uniq -c` 和 `head`。）

```bash
find "$HOME" -type f -not -name '.*' -printf '%f\n' 2>/dev/null |
  awk -F. 'NF > 1 && $NF != "" {print $NF}' |
  sort | uniq -c | sort -rn | head -5
```

`sort` 必须放在 `uniq -c` 前面，因为 `uniq` 只统计相邻的重复行。

## 14. `find` + `xargs`

> [!IMPORTANT]
> **题目**：`xargs` 会把标准输入（stdin）的每一行转换成命令的参数。请不要用 `find -exec`，而是把 `find` 和 `xargs` 组合起来：找出某个目录下所有 `.sh` 文件，并用 `wc -l` 统计每个文件的行数。加分项：让命令能正确处理文件名中带空格的情况。（提示：`-print0` 和 `-0`）参见 `man xargs`。

```bash
find . -type f -name '*.sh' -print0 | xargs -0 wc -l
```

`-print0` 让 `find` 用 NUL 分隔文件名，`-0` 让 `xargs` 按 NUL 读取，这样文件名里有空格或换行也不会被拆错。

## 15. 统计课程网站讲数

> [!IMPORTANT]
> **题目**：用 `curl` 抓取[课程网站](https://missing.csail.mit.edu/)的 HTML，通过管道交给 `grep`，统计页面上列出了多少讲课程。（提示：找一个每讲恰好出现一次的模式；用 `curl -s` 关闭进度输出。）

```bash
curl -s https://missing.csail.mit.edu/ |
  grep -A2 '<li>' |
  grep -c '<strong>[0-9]'
```

输出 `19`。

首页每个课程条目都是 `<li><strong>日期</strong>: <a href="...">课程名</a>`。`grep -A2 '<li>'` 把 `<li>` 后面的两行一起取出来，再数带日期的 `<strong>`，一条课程算一次。

这 19 条包括 9 条 2026 课程和 10 条往年专题。只数 2026 的课程：

```bash
curl -s https://missing.csail.mit.edu/ |
  grep -A3 '<li>' |
  grep -c 'href="/2026/'
```

输出 `9`。

## 16. `jq` 筛选 JSON

> [!IMPORTANT]
> **题目**：`jq` 是处理 JSON 数据的强大工具。用 `curl` 获取示例数据 <https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json>，再用 `jq` 只提取 `version` 大于 6 的人的姓名。（提示：先把数据管道给 `jq .` 看结构；再试 `jq '.[] | select(...) | .name'`。）

## 17. `awk` 过滤与换列

> [!IMPORTANT]
> **题目**：`awk` 可以按列的值过滤行，并改写输出。例如，`awk '$3 ~ /pattern/ {$4=""; print}'` 只输出第三列匹配 `pattern` 的行，同时省略第四列。请写一条 `awk` 命令：只输出第二列大于 100 的行，并把第一列和第三列交换。可以用下面的命令测试：`printf 'a 50 x\nb 150 y\nc 200 z\n'`

## 18. 拆解 SSH 日志管道

> [!IMPORTANT]
> **题目**：拆解讲义中的 [SSH 日志处理管道](https://missing.csail.mit.edu/2026/course-shell/#the-shell-language-bash)：每一步分别做了什么？然后仿照它写一条管道，从 `~/.bash_history`（或 `~/.zsh_history`）中找出你最常使用的 Shell 命令。
