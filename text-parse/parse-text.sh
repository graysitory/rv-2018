#!/bin/#!/usr/bin/env bash
source /usr/local/bin/color


rm output.txt

for file in input/*; do
node jparse.js "$file"
done | tee -a output.txt

open output.txt
