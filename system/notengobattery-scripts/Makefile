#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Sugestions? Visit: https://www.notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-scripts
PKG_VERSION:=1.0.11
PKG_RELEASE:=0
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-scripts
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+bash \
	+blkid \
	+bzip2 \
	+coreutils-cksum \
	+coreutils-stat \
	+kmod-io-schedulers \
	+shadow-chsh \
	+shadow-utils \
	+swap-zram \
	+swap-zswap
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
	$(INSTALL_DIR) $(1)/etc/hotplug.d/net
	$(INSTALL_DATA) ./files/ath10k.script $(1)/etc/hotplug.d/net/99-ath10k
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
