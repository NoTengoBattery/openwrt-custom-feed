#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Sugestions? Visit: https://www.notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=compressed-memory
PKG_VERSION:=1.0.6
PKG_RELEASE:=0
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/compressed-memory
	SECTION:=utils
	CATEGORY:=Base system
	DEPENDS:= \
	+@BUSYBOX_CONFIG_FEATURE_SWAPON_DISCARD \
	+@BUSYBOX_CONFIG_FEATURE_SWAPON_PRI \
	+@BUSYBOX_CONFIG_MKSWAP \
	+@BUSYBOX_CONFIG_SWAPOFF \
	+@BUSYBOX_CONFIG_SWAPON \
	+gawk \
	+kmod-crypto-deflate \
	+kmod-crypto-zstd \
	+kmod-lib-lz4 \
	+kmod-lib-lz4hc \
	+kmod-lib-lzo
	HIDDEN:=1
	TITLE:=Configuration files for compressed-memory
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
	PKGARCH:=all
endef


define Package/compressed-memory/description
	Installs a UCI file which contains pre-computed values for packages that belong
	to compressed-memory.
endef


define Package/swap-zram
	SECTION:=utils
	CATEGORY:=Base system
	DEPENDS:= \
	+compressed-memory \
	+kmod-loop \
	+kmod-zram-writeback \
	+losetup
	TITLE:=Script to manage compressed memory for swap
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
	PKGARCH:=all
endef


define Package/swap-zram/description
	A script for managing the ZRAM compressed block device for swapping. This
	allows the system to trade-off CPU cycles for the chance of shortening the
	unused RAM size, freeing it for other uses.
endef


define Package/swap-zswap
	SECTION:=utils
	CATEGORY:=Base system
	DEPENDS:= \
	+compressed-memory \
	+kmod-zswap
	TITLE:=Script to manage compressed LRU cache for swap
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
	PKGARCH:=all
endef


define Package/swap-zswap/description
	A script for managing the ZSWAP front swap. This is a Linux feature where
	pages land and get compressed before hitting the actual swap device, allowing
	the system to trade CPU cycles for the chance of saving I/O bandwidth.
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


define Package/compressed-memory/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/compressed_memory.uci $(1)/etc/config/compressed_memory
endef


define Package/swap-zram/install
	$(INSTALL_DIR) $(1)/etc/hotplug.d/iface
	$(INSTALL_DATA) ./files/hotplug.script $(1)/etc/hotplug.d/iface/99-zram
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/zram.init $(1)/etc/init.d/zram
	$(INSTALL_DIR) $(1)/usr/libexec
	$(INSTALL_BIN) ./files/zram.script $(1)/usr/libexec/zram
endef


define Package/swap-zswap/install
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/zswap.init $(1)/etc/init.d/zswap
	$(INSTALL_DIR) $(1)/usr/libexec
	$(INSTALL_BIN) ./files/zswap.script $(1)/usr/libexec/zswap
endef


$(eval $(call BuildPackage,compressed-memory))
$(eval $(call BuildPackage,swap-zram))
$(eval $(call BuildPackage,swap-zswap))
