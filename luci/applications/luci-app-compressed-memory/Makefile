#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Sugestions? Visit: https://notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-compressed-memory
PKG_VERSION:=1.0.5
PKG_RELEASE:=2
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

LUCI_TITLE:=LuCI compressed memory configuration
LUCI_DESCRIPTION:= \
This package allows users to configure the compressed memory subsystem.

LUCI_DEPENDS:= \
	+luci-base \
	+swap-zram \
	+swap-zswap
LUCI_PKGARCH:=all

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
