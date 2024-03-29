#
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Sugestions? Visit: https://www.notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-defaults
PKG_FLAGS:=nonshared
PKG_VERSION:=1.0.11
PKG_RELEASE:=0
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
	+kmod-nft-offload \
	+luci-app-unbound \
	+luci-ssl \
	+luci-theme-openwrt-2020 \
	+openssh-sftp-server \
	+shadow-chsh \
	+shadow-utils \
	+unbound-control-setup \
	+usb-modeswitch \
	+usbutils \
	+wget-ssl
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
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/unbound.uci $(1)/etc/config/unbound
	$(INSTALL_DIR) $(1)/etc/unbound
	$(INSTALL_CONF) ./files/unbound_srv.conf $(1)/etc/unbound/unbound_srv.conf
	$(INSTALL_DIR) $(1)/etc/samba
	$(INSTALL_CONF) ./files/samba.conf $(1)/etc/samba/smb.conf.template
	$(INSTALL_DIR) $(1)/etc/ssh
	$(INSTALL_CONF) ./files/sshd.conf $(1)/etc/ssh/sshd_config
	$(INSTALL_DIR) $(1)/root/.config/htop
	$(INSTALL_CONF) ./files/htoprc.conf $(1)/root/.config/htop/htoprc
	$(INSTALL_CONF) ./files/nanorc.conf $(1)/root/.nanorc
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-defaults))
