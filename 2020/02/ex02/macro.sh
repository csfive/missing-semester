#!/usr/bin/env bash

MACRO_FILE="$HOME/.marco_history"

macro() {
  pwd > "$MACRO_FILE"
  echo "当前工作目录已保存：$(pwd)"
}

polo() {
  if [[ ! -f "$MACRO_FILE" ]]; then
    echo "未找到保存的工作目录，请先执行 macro 命令"
    return 1
  fi

  target_dir=$(cat "$MACRO_FILE")

  if cd "$target_dir"; then
    echo "已返回到保存的工作目录: $target_dir"
  else
    echo "无法切换到保存的工作目录: $target_dir（可能已被删除或无权限）"
    return 1
  fi
}
