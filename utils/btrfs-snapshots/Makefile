#
# Copyright (C) 2007-2016 OpenWrt.org
# Copyright (C) 2024-2026 Oever González <software@notengobattery.com>
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=btrfs-snapshots
PKG_VERSION:=1.0.2
PKG_RELEASE:=0
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk


define Package/btrfs-snapshots
	SECTION:=utils
	CATEGORY:=Utilities
	SUBMENU:=Disc
	URL:=https://btrfssnapshots.drque.net/
	DEPENDS:= \
	+btrfs-progs \
	+python3 \
	+rsync
	TITLE:=Btrfs Snapshots Rotation
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	PKGARCH:=all
endef


define Package/btrfs-snapshots/description
	This package installs a script that rotates Btrfs snapshots.
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


define Package/btrfs-snapshots/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/btrfsSnapshots $(1)/usr/bin
endef


$(eval $(call BuildPackage,btrfs-snapshots))
