# 02. Shell 工具和脚本

## 练习 1

> 阅读 `man ls`，然后使用 `ls` 命令进行如下操作：
>
> - 所有文件（包括隐藏文件）
> - 文件打印以人类可以理解的格式输出 (例如，使用 454M 而不是 454279954)
> - 文件以最近访问顺序排序
> - 以彩色文本显示输出结果
>
> 典型输出如下：
>
> ```
> -rw-r--r--   1 user group 1.1M Jan 14 09:53 baz
> drwxr-xr-x   5 user group  160 Jan 14 09:53 .
> -rw-r--r--   1 user group  514 Jan 14 06:42 bar
> -rw-r--r--   1 user group 106M Jan 13 12:12 foo
> drwx------+ 47 user group 1.5K Jan 12 18:08 ..
> ```

```sh
ls -laht --color=auto
```

## 练习 2

> 编写两个 bash 函数 `marco` 和 `polo` 执行下面的操作。每当你执行 `marco` 时，当前的工作目录应当以某种形式保存，当执行 `polo` 时，无论现在处在什么目录下，都应当 `cd` 回到当时执行 `marco` 的目录。为了方便 debug，你可以把代码写在单独的文件 `marco.sh` 中，并通过 `source marco.sh` 命令，（重新）加载函数。

<<< ./ex02/macro.sh

## 练习 3

> 假设您有一个命令，它很少出错。因此为了在出错时能够对其进行调试，需要花费大量的时间重现错误并捕获输出。编写一段 bash 脚本，运行如下的脚本直到它出错，将它的标准输出和标准错误流记录到文件，并在最后输出所有内容。加分项：报告脚本在失败前共运行了多少次。
>
> <<< ./ex03/buggy.sh

<<< ./ex03/debug.sh

## 练习 4

> 本节课我们讲解的 `find` 命令中的 `-exec` 参数非常强大，它可以对我们查找的文件进行操作。但是，如果我们要对所有文件进行操作呢？例如创建一个 zip 压缩文件？我们已经知道，命令行可以从参数或标准输入接受输入。在用管道连接命令时，我们将标准输出和标准输入连接起来，但是有些命令，例如 `tar` 则需要从参数接受输入。这里我们可以使用 [`xargs`](https://man7.org/linux/man-pages/man1/xargs.1.html) 命令，它可以使用标准输入中的内容作为参数。 例如 `ls | xargs rm` 会删除当前目录中的所有文件。
>
> 您的任务是编写一个命令，它可以递归地查找文件夹中所有的 HTML 文件，并将它们压缩成 zip 文件。注意，即使文件名中包含空格，您的命令也应该能够正确执行（提示：查看 `xargs` 的参数 `-d`，译注：MacOS 上的 `xargs` 没有 `-d`，[查看这个 issue](https://github.com/missing-semester/missing-semester/issues/93)）
>
> 如果您使用的是 MacOS，请注意默认的 BSD `find` 与 [GNU coreutils](https://en.wikipedia.org/wiki/List_of_GNU_Core_Utilities_commands) 中的是不一样的。你可以为 `find` 添加 `-print0` 选项，并为 `xargs` 添加 `-0` 选项。作为 Mac 用户，您需要注意 mac 系统自带的命令行工具和 GNU 中对应的工具是有区别的；如果你想使用 GNU 版本的工具，也可以使用 [brew 来安装](https://formulae.brew.sh/formula/coreutils)。

```sh
find . -type f -name "*.html" -print0 | xargs -0 zip html_files.zip
```

## 练习 5

> （进阶）编写一个命令或脚本递归的查找文件夹中最近修改的文件。更通用的做法，你可以按照最近的修改时间列出文件吗？

```sh
find . -type f -print0 | xargs -0 ls -lt | head -1

find . -type f -printf "%TY-%Tm-%Td %TT %p\n" | sort -r | head -10
```
