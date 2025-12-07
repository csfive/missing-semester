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

```sh
#!/usr/bin/env bash

macro() {
  export MACRO_DIR="$PWD"
  echo "当前工作目录已保存为 MACRO_DIR: $MACRO_DIR"
}

polo() {
  if [[ -z "$MACRO_DIR" ]]; then
    echo "未找到保存的工作目录，请先执行 macro 命令"
    return 1
  fi

  if cd "$MACRO_DIR"; then
    echo "已返回到保存的工作目录: $MACRO_DIR"
  else
    echo "无法切换到保存的工作目录: $MACRO_DIR"
    return 1
  fi
}
```

## 练习 3

> 假设您有一个命令，它很少出错。因此为了在出错时能够对其进行调试，需要花费大量的时间重现错误并捕获输出。编写一段 bash 脚本，运行如下的脚本直到它出错，将它的标准输出和标准错误流记录到文件，并在最后输出所有内容。加分项：报告脚本在失败前共运行了多少次。
> 
> ```sh
> #!/usr/bin/env bash
>
> n=$(( RANDOM % 100 ))
>
> if [[ n -eq 42 ]]; then
>   echo "Something went wrong"
>   >&2 echo "The error was using magic numbers"
>   exit 1
> fi
>
> echo "Everything went according to plan"
> ```

```sh
#!/usr/bin/env bash

count=0
echo > out.log

while true;do
  ./buggy.sh > out.log 2>&1
  if [[ $? -ne 0 ]]; then
    break
  fi

  ((count++))
done

echo "在成功运行 $count 次后失败"
cat out.log
```
