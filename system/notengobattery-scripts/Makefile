#
# Copyright (C) 2019-2026 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Suggestions? software@notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-scripts
PKG_VERSION:=1.1.0
PKG_RELEASE:=1
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-scripts
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+@BUSYBOX_CONFIG_AWK \
	+@BUSYBOX_CONFIG_BASENAME \
	+@BUSYBOX_CONFIG_BLKID \
	+@BUSYBOX_CONFIG_BZIP2 \
	+@BUSYBOX_CONFIG_CAT \
	+@BUSYBOX_CONFIG_CKSUM \
	+@BUSYBOX_CONFIG_CMP \
	+@BUSYBOX_CONFIG_CP \
	+@BUSYBOX_CONFIG_DATE \
	+@BUSYBOX_CONFIG_DF \
	+@BUSYBOX_CONFIG_DIRNAME \
	+@BUSYBOX_CONFIG_ECHO \
	+@BUSYBOX_CONFIG_FEATURE_STAT_FILESYSTEM \
	+@BUSYBOX_CONFIG_FEATURE_STAT_FORMAT \
	+@BUSYBOX_CONFIG_FIND \
	+@BUSYBOX_CONFIG_GREP \
	+@BUSYBOX_CONFIG_HEAD \
	+@BUSYBOX_CONFIG_LN \
	+@BUSYBOX_CONFIG_LOGGER \
	+@BUSYBOX_CONFIG_MKDIR \
	+@BUSYBOX_CONFIG_MV \
	+@BUSYBOX_CONFIG_PRINTF \
	+@BUSYBOX_CONFIG_RM \
	+@BUSYBOX_CONFIG_SORT \
	+@BUSYBOX_CONFIG_STAT \
	+@BUSYBOX_CONFIG_STRINGS \
	+@BUSYBOX_CONFIG_SYNC \
	+@BUSYBOX_CONFIG_TAIL \
	+@BUSYBOX_CONFIG_UNIQ \
	+@BUSYBOX_CONFIG_WC \
	+bash \
	+gawk \
	+kmod-io-schedulers \
	+lsblk \
	+mtd \
	+notengobattery-defaults \
	+shadow-chsh \
	+shadow-utils \
	+swap-zram \
	+swap-zswap \
	+uboot-envtools
	TITLE:=Customized script files for OpenWrt
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
	PKGARCH:=all
endef


define Package/notengobattery-scripts/description
	A collection of utility scripts for NoTengoBattery custom builds.
endef


define Package/notengobattery-scripts/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/BackToStock.script $(1)/usr/bin/BackToStock
	$(INSTALL_BIN) ./files/TestCalibration.script $(1)/usr/bin/TestCalibration
	$(INSTALL_DIR) $(1)/etc/calibration
	$(INSTALL_DATA) ./files/ExtractCalibration.sh $(1)/etc/calibration/extract_calibration.sh
	$(INSTALL_DIR) $(1)/etc/hotplug.d/block
	$(INSTALL_DATA) ./files/BlockScheduler.script $(1)/etc/hotplug.d/block/00-scheduler
	$(INSTALL_DIR) $(1)/etc/hotplug.d/ntp
	$(INSTALL_DATA) ./files/pstore.script $(1)/etc/hotplug.d/ntp/00-pstore
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_DATA) ./files/notengobattery.defaults $(1)/etc/uci-defaults/99_0notengobattery

	$(CP) ./files/EA6350v3 $(1)/etc/calibration/EA6350v3
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-scripts))
