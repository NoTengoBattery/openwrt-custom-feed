#
# Copyright (C) 2026 Oever González <software@notengobattery.com>
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=kopia
PKG_VERSION:=0.23.1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/kopia/kopia/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=0009ca0b2249a7042f779e722e87f8d8c12262117b308db522f7c8d46720a22e

PKG_LICENSE:=Apache-2.0
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DEPENDS:=golang/host
PKG_BUILD_PARALLEL:=1
PKG_BUILD_FLAGS:=no-mips16

GO_PKG:=github.com/kopia/kopia

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk


define Package/kopia
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=Cross-platform backup tool with encryption and deduplication
  URL:=https://kopia.io/
  DEPENDS:=$(GO_ARCH_DEPENDS)
endef


define Package/kopia/description
  Kopia is a fast and secure open-source backup/restore tool that allows you
  to create encrypted snapshots of your data and save the snapshots to remote
  or cloud storage of your choice, to network-attached storage or server, or
  locally on your machine.
endef


GO_PKG_BUILD_PKG:=github.com/kopia/kopia
GO_PKG_TAGS:=nohtmlui
GO_PKG_LDFLAGS_X:= \
	github.com/kopia/kopia/repo.BuildVersion=$(PKG_VERSION) \
	github.com/kopia/kopia/repo.BuildInfo=v$(PKG_VERSION) \
	github.com/kopia/kopia/repo.BuildGitHubRepo=kopia/kopia

define Package/kopia/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(GO_PKG_BUILD_BIN_DIR)/kopia $(1)/usr/bin/
endef


$(eval $(call GoBinPackage,kopia))
$(eval $(call BuildPackage,kopia))
