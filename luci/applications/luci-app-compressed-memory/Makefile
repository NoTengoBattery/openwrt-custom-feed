#
# Copyright (C) 2019-2026 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Suggestions? software@notengobattery.com
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI compressed memory configuration
LUCI_DEPENDS:=+luci-base +swap-zram +swap-zswap

PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=Oever González <software@notengobattery.com>

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
