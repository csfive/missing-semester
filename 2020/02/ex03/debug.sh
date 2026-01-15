#!/usr/bin/env bash

count=0

while ./buggy.sh &> out.log; do
  ((count++))
done

echo "失败前共成功运行了: $count 次"
echo "--------------------------------"
cat out.log
echo "--------------------------------"
