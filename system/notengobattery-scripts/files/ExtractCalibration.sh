#!/bin/bash

ROOT_PATH='/Users/notengobattery/3.1.10.191322/rootfs'
REGEX='.*boardData.*\.bin'
DEVICE=EA6350v3
BAND1=2G
BAND2=5G
NAME_PREFIX=boardData_1_0_IPQ4019_

extract_calibration() {
  while read data; do
    local readonly BASENAME=$(basename "$data")
    local readonly BASEPATH=$(dirname "$data")
    local readonly CALPATH=$(basename "$BASEPATH")
    local BAND
    case "$BASENAME" in
    *'wifi0'*) BAND=$BAND1 ;;
    *'wifi1'*) BAND=$BAND2 ;;
    *'2G'*) BAND=$BAND1 ;;
    *'5G'*) BAND=$BAND2 ;;
    *) return 1 ;;
    esac
    local readonly DEST_PATH=$DEVICE/$CALPATH/$BAND
    mkdir -p "$DEST_PATH"
    local readonly FILENAME=${BASENAME#"$NAME_PREFIX"}
    local readonly DEST=$DEST_PATH/$FILENAME
    cat "$data" >"$DEST"
    if ! cmp -s "$data" "$DEST"; then
      return 2
    fi
    echo "Extracted file '$DEST'"
  done
}

find "$ROOT_PATH" -regex "$REGEX" | sort | uniq | extract_calibration
