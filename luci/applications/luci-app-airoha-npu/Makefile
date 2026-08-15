# This is free software, licensed under the Apache License, Version 2.0 .

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-airoha-npu
PKG_VERSION:=1.0.1
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_LICENSE_FILES:=LICENSE

LUCI_TITLE:=LuCI Airoha SoC Status (NPU, CPU, Frame Engine)
LUCI_DEPENDS:=+luci-base @TARGET_airoha
LUCI_PKGARCH:=all

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
