#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Sugestions? Visit: https://notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-defaults
PKG_FLAGS:=nonshared
PKG_VERSION:=1.0.5
PKG_RELEASE:=2
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/notengobattery-defaults
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	+announce \
	+base-files \
	+bash \
	+haveged \
	+htop \
	+ipset \
	+kmod-io-schedulers \
	+kmod-nft-offload \
	+luci-app-unbound \
	+luci-ssl \
	+luci-theme-openwrt-2020 \
	+openssh-sftp-server \
	+shadow-chsh \
	+shadow-utils \
	+unbound-control-setup \
	+usbutils
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
	$(INSTALL_DATA) ./files/notengobattery.defaults $(1)/etc/uci-defaults/99_notengobattery
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) ./files/unbound.uci $(1)/etc/config/unbound
	$(INSTALL_DATA) ./files/irqbalance.uci $(1)/etc/config/irqbalance
	$(INSTALL_DIR) $(1)/etc/unbound
	$(INSTALL_DATA) ./files/unbound_srv.conf $(1)/etc/unbound/unbound_srv.conf
	$(INSTALL_DIR) $(1)/etc/samba
	$(INSTALL_DATA) ./files/samba.conf $(1)/etc/samba/smb.conf.template
	$(INSTALL_DIR) $(1)/etc/ssh
	$(INSTALL_DATA) ./files/sshd.conf $(1)/etc/ssh/sshd_config
	$(INSTALL_DIR) $(1)/root/.config/htop
	$(INSTALL_DATA) ./files/htoprc.conf $(1)/root/.config/htop/htoprc
	$(INSTALL_DATA) ./files/nanorc.conf $(1)/root/.nanorc
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-defaults))
