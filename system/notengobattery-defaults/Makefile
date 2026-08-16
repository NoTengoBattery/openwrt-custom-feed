#
# Copyright (C) 2019-2026 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Suggestions? software@notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-defaults
PKG_FLAGS:=nonshared
PKG_VERSION:=1.1.0
PKG_RELEASE:=1
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-defaults
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+@HTOP_LMSENSORS \
	+@OPENSSL_OPTIMIZE_SPEED \
	+bash \
	+htop \
	+iftop \
	+kmod-fs-exfat \
	+lm-sensors \
	+lsblk \
	+lscpu \
	+luci-app-adblock \
	+luci-app-compressed-memory \
	+luci-app-irqbalance \
	+luci-app-pbr \
	+luci-app-sqm \
	+luci-proto-wireguard \
	+luci-ssl \
	+nano-hl \
	+pciids \
	+pciutils \
	+shadow-chsh \
	+shadow-groupadd \
	+shadow-groupdel \
	+shadow-groupmod \
	+shadow-useradd \
	+shadow-userdel \
	+shadow-usermod \
	+shadow-utils \
	+uci \
	+usbids \
	+usbutils \
	+zoneinfo-all
	TITLE:=Customized default files and settings for OpenWrt
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
	PKGARCH:=all
endef


define Package/notengobattery-defaults/description
	A collection of configurations and settings scripts for
	NoTengoBattery custom builds.
endef


define Package/notengobattery-defaults/install
	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_DATA) ./files/notengobattery.defaults $(1)/etc/uci-defaults/99_1notengobattery
	$(INSTALL_DIR) $(1)/usr/libexec
	$(INSTALL_BIN) ./files/board_hostname.script $(1)/usr/libexec/ntb_board_hostname
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/unbound.uci $(1)/etc/config/unbound
	$(INSTALL_DIR) $(1)/etc/unbound
	$(INSTALL_CONF) ./files/unbound_srv.conf $(1)/etc/unbound/unbound_srv.conf
	$(INSTALL_DIR) $(1)/root/.config/htop
	$(INSTALL_CONF) ./files/htoprc.conf $(1)/root/.config/htop/htoprc
	$(INSTALL_CONF) ./files/nanorc.conf $(1)/etc/nanorc
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-defaults))
