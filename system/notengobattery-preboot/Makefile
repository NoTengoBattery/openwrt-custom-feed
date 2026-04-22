#
# Copyright (C) 2019-2026 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Suggestions? software@notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-preboot
PKG_FLAGS:=nonshared
PKG_VERSION:=1.1.0
PKG_RELEASE:=0
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-preboot
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+@BUSYBOX_CONFIG_AWK \
	+@BUSYBOX_CONFIG_CAT \
	+@BUSYBOX_CONFIG_CP \
	+@BUSYBOX_CONFIG_EXPR \
	+@BUSYBOX_CONFIG_FEATURE_AWK_GNU_EXTENSIONS \
	+@BUSYBOX_CONFIG_FEATURE_CP_REFLINK \
	+@BUSYBOX_CONFIG_MKDIR \
	+@BUSYBOX_CONFIG_MKNOD \
	+@BUSYBOX_CONFIG_MOUNT \
	+@BUSYBOX_CONFIG_PRINTF \
	+@BUSYBOX_CONFIG_RM \
	+@BUSYBOX_CONFIG_TOUCH \
	+@BUSYBOX_CONFIG_UMOUNT \
	+block-mount \
	+kmod-pstore \
	+NAND_SUPPORT:ubi-utils \
	+uci
	TITLE:=Customized preboot files for OpenWrt
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
	PKGARCH:=all
endef


define Package/notengobattery-preboot/description
	A collection of preboot scripts for NoTengoBattery custom builds.
endef


define Package/notengobattery-preboot/install
	$(INSTALL_DIR) $(1)/bootfs
	$(INSTALL_DIR) $(1)/overlayfs
	$(INSTALL_DIR) $(1)/lib/preinit
	$(INSTALL_DATA) ./files/preboot_mount.script $(1)/lib/preinit/03_preboot_mount.sh
	$(INSTALL_DIR) $(1)/usr/libexec
	$(INSTALL_BIN) ./files/early_boot.script $(1)/usr/libexec/early_boot
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/early_boot.init $(1)/etc/init.d/early_boot
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-preboot))
