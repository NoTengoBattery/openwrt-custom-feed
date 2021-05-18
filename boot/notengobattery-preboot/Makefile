#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-preboot
PKG_FLAGS:=nonshared
PKG_VERSION:=1.0.3
PKG_RELEASE:=1
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-preboot
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+base-files \
	+block-mount
	TITLE:=Customized preboot files for OpenWrt
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://notengobattery.com/
	PKGARCH:=all
endef


define Package/notengobattery-preboot/description
	A collection of preboot scripts for NoTengoBattery custom builds.
endef


define Package/notengobattery-preboot/install
	$(INSTALL_DIR) $(1)/bootfs
	$(INSTALL_DIR) $(1)/overlayfs
	$(INSTALL_DIR) $(1)/lib/preinit
	$(INSTALL_BIN) ./files/preboot_mount.script $(1)/lib/preinit/03_preboot_mount.sh
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_BIN) ./files/fstab.uci $(1)/etc/config/fstab
	$(INSTALL_DIR) $(1)/usr/libexec
	$(INSTALL_BIN) ./files/early_boot.script $(1)/usr/libexec/early_boot
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/early_boot.init $(1)/etc/init.d/early_boot
	$(INSTALL_DIR) $(1)/lib/ntb
	$(INSTALL_BIN) ./files/irq_balancer.script $(1)/lib/ntb/irq.sh
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-preboot))
