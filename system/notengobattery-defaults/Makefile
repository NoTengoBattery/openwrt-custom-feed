#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-defaults
PKG_FLAGS:=nonshared
PKG_VERSION:=1.0.2
PKG_RELEASE:=1
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-defaults
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+base-files \
	+bash \
	+luci-app-unbound \
	+shadow-chsh \
	+shadow-utils \
	+unbound-control-setup
	TITLE:=Customized default files and settings for OpenWrt
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://notengobattery.com/
	PKGARCH:=all
endef


define Package/notengobattery-defaults/description
	A collection of configurations and settings scripts for
	NoTengoBattery custom builds.
endef


define Package/notengobattery-defaults/install
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_BIN) ./files/notengobattery.defaults $(1)/etc/uci-defaults/99_notengobattery
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_BIN) ./files/unbound.uci $(1)/etc/config/unbound
	$(INSTALL_DIR) $(1)/etc/unbound
	$(INSTALL_BIN) ./files/unbound_srv.conf $(1)/etc/unbound/unbound_srv.conf
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-defaults))
