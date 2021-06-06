#
# Copyright (C) 2007-2016 OpenWrt.org
# Copyright (C) 2019-2021 Oever González <software@notengobattery.com>
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=nano
PKG_VERSION:=5.7
PKG_RELEASE:=5

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.xz
PKG_SOURCE_URL:=@GNU/nano
PKG_HASH:=d4b181cc2ec11def3711b4649e34f2be7a668e70ab506860514031d069cccafa

PKG_LICENSE:=GPL-3.0-or-later
PKG_LICENSE_FILES:=COPYING
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
PKG_CPE_ID:=cpe:/a:gnu:nano

PKG_INSTALL:=1
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk


define Package/nano-hl
  SUBMENU:=Editors
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=An enhanced clone of the Pico text editor with syntax highlight
  URL:=https://www.nano-editor.org/
  DEPENDS:=+libncurses +zlib
endef


define Package/nano-hl/description
  Nano (Nano's ANOther editor, or Not ANOther editor) is an enhanced clone
  of the Pico text editor. Syntax highlight enabled.
endef


define Package/nano-hl/install
	$(INSTALL_DIR) $(1)/usr
	$(CP) $(PKG_INSTALL_DIR)/usr/bin $(1)/usr
	$(INSTALL_DIR) $(1)/usr/share
	$(CP) $(PKG_INSTALL_DIR)/usr/share/nano $(1)/usr/share
endef


$(eval $(call BuildPackage,nano-hl))
