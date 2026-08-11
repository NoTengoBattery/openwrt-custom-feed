#
# Copyright (C) 2019-2026 Oever González <software@notengobattery.com>
#
# Licensed to the public under the Apache License 2.0.
# Problems? Suggestions? software@notengobattery.com
#

include $(TOPDIR)/rules.mk

PKG_NAME:=notengobattery-w1700k-installer
PKG_FLAGS:=nonshared
PKG_VERSION:=1.0.0
PKG_RELEASE:=0
PKG_MAINTAINER:=Oever Gonzalez <software@notengobattery.com>

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

# BIN_DIR is already bin/targets/<board>/<subtarget>.
W1700K_BIN_DIR:=$(BIN_DIR)


define Package/notengobattery-w1700k-installer
	SECTION:=base
	CATEGORY:=Base system
	DEPENDS:= \
	@TARGET_airoha_an7581 \
	+@BUSYBOX_CONFIG_DD \
	+@BUSYBOX_CONFIG_HEXDUMP \
	+@BUSYBOX_CONFIG_MKNOD \
	+@BUSYBOX_CONFIG_STRINGS \
	+fitblk \
	+ubi-utils
	TITLE:=Gemtek W1700K UBI installer payload
	MAINTAINER:=Oever Gonzalez <software@notengobattery.com>
	URL:=https://www.notengobattery.com/
endef


define Package/notengobattery-w1700k-installer/description
	Partitions the W1700K NAND, migrates the factory EEPROM and MAC addresses
	out of the vendor layout, and writes this build's own images. Embeds the
	recovery and sysupgrade images, so it must be built in a second pass after
	Device/gemtek_w1700k-ubi has produced them. Never published: nonshared.
endef


define Package/notengobattery-w1700k-installer/install
	$(INSTALL_DIR) $(1)/installer
	$(INSTALL_DIR) $(1)/lib/preinit
	$(INSTALL_BIN) ./files/w1700k_install.script $(1)/installer/install.sh
	$(INSTALL_DATA) ./files/w1700k_installer_preinit.script $(1)/lib/preinit/00_installer
	@set -e; \
	for kind in initramfs-recovery squashfs-sysupgrade; do \
		src="$$$$(ls -1 $(W1700K_BIN_DIR)/*-gemtek_w1700k-ubi-$$$$kind.itb 2>/dev/null | head -1)"; \
		if [ -z "$$$$src" ]; then \
			echo "ERROR: no $$$$kind image in $(W1700K_BIN_DIR)."; \
			echo "       Build Device/gemtek_w1700k-ubi first, then rebuild this package."; \
			exit 1; \
		fi; \
		echo "  installer payload: $$$$(basename $$$$src)"; \
		$(CP) "$$$$src" \
			"$(1)/installer/openwrt-airoha-an7581-gemtek_w1700k-ubi-$$$$kind.itb"; \
	done
endef


define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
endef


define Build/Compile
endef


$(eval $(call BuildPackage,notengobattery-w1700k-installer))
