//
// Copyright (C) 2019-2026 Oever González <software@notengobattery.com>
//
// Licensed to the public under the Apache License 2.0.
// Problems? Suggestions? software@notengobattery.com
//

'use strict';
'require view';
'require form';
'require fs';
'require rpc';
'require uci';
'require ui';

var callInitList = rpc.declare({
	object: 'luci',
	method: 'getInitList',
	params: ['name'],
	expect: { '': {} }
});

// Compressor characteristics based on empirical testing (median values)
function compressors(o) {
	o.value('deflate', 'deflate — slowest; most stable; excellent ratio');
	o.value('zstd', 'zstd — fast; less stable; best ratio');
	o.value('lzo', 'lzo — very fast; unstable; good ratio');
	o.value('lzo_rle', 'lzo-rle — very fast; least stable; good ratio');
	o.value('lz4hc', 'lz4hc — slow; stable; good ratio');
	o.value('lz4', 'lz4 — fastest; stable; fair ratio');
	o.value('842', '842 — slowest; stable; poor ratio');
}

function zpool(o) {
	o.value('zbud', 'zbud (lower memory use, limited ratio)');
	o.value('zsmalloc', 'zsmalloc (higher memory use, better ratio)');
}

// Remap an option's read/write to a different UCI section within compressed_memory
function remapUCI(o, section, option) {
	o.cfgvalue = function() {
		return uci.get('compressed_memory', section, option);
	};
	o.write = function(section_id, value) {
		uci.set('compressed_memory', section, option, value);
	};
	o.remove = function(section_id) {
		uci.unset('compressed_memory', section, option);
	};
	return o;
}

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(callInitList('zram'), {}),
			L.resolveDefault(callInitList('zswap'), {}),
			L.resolveDefault(fs.stat('/usr/libexec/zram'), null),
			L.resolveDefault(fs.stat('/usr/libexec/zswap'), null),
			L.resolveDefault(fs.stat('/etc/config/compressed_memory'), null)
		]);
	},

	render: function(loaded) {
		var m, s, o;
		var zramAvailable = !!(loaded[0] && loaded[0].zram) && !!loaded[2] && !!loaded[4];
		var zswapAvailable = !!(loaded[1] && loaded[1].zswap) && !!loaded[3] && !!loaded[4];

		m = new form.Map('compressed_memory',
			_('Compressed Memory'),
			_('Configure in-memory compression to trade CPU cycles for more available RAM.'));

		s = m.section(form.NamedSection, 'tuning', 'tuning');
		s.anonymous = true;

		s.tab('tab_zram', _('zram Compressed Swap'));
		s.tab('tab_zswap', _('zswap Compressed Cache'));
		s.tab('tab_tuning', _('System Tuning'));

		// ===== zram Tab =====
		if (zramAvailable) {
			o = s.taboption('tab_zram', form.Flag, '_zram_enabled',
				_('Enable zram swap'),
				_('Create a compressed block device in RAM and use it as swap space.'));
			remapUCI(o, 'zram', 'enabled');
			o.default = false;
			o.rmempty = false;

			o = s.taboption('tab_zram', form.ListValue, '_zram_algorithm',
				_('Compression algorithm'),
				_('Select the compression algorithm. Ratio = memory saved. Default is deflate: similar ratio to zstd but much more stable.'));
			remapUCI(o, 'zram', 'algorithm');
			compressors(o);
			o.default = 'deflate';
			o.depends('_zram_enabled', '1');
			o.rmempty = false;

			o = s.taboption('tab_zram', form.Value, '_zram_pool_base',
				_('Base memory pool (%)'),
				_('Base percentage of RAM for the compressed disk, scaled by the expected compression ratio.'));
			remapUCI(o, 'zram', 'pool_base');
			o.datatype = 'and(ufloat,max(100.00))';
			o.default = '30.00';
			o.depends('_zram_enabled', '1');
			o.rmempty = false;

			o = s.taboption('tab_zram', form.Value, '_zram_backing_file',
				_('Backing storage'),
				_('Optional file or block device for incompressible or idle pages. Leave empty to keep all data in RAM.'));
			remapUCI(o, 'zram', 'backing_file');
			o.datatype = 'or(device,file)';
			o.depends('_zram_enabled', '1');
			o.optional = true;
			o.placeholder = '/dev/sda1';
			o.rmempty = true;

			// UI-only toggle for advanced options (not saved to UCI)
			o = s.taboption('tab_zram', form.Flag, '_zram_advanced',
				_('Show advanced options'));
			o.default = '0';
			o.depends('_zram_enabled', '1');
			o.write = function() {};
			o.remove = function() {};

			o = s.taboption('tab_zram', form.Value, '_zram_pool_limit',
				_('Pool limit (%)'),
				_('Hard limit for zram disk size as percentage of RAM. Prevents excessive memory use.'));
			remapUCI(o, 'zram', 'pool_limit');
			o.datatype = 'and(ufloat,max(300.00))';
			o.default = '150';
			o.depends('_zram_advanced', '1');
			o.rmempty = false;

			o = s.taboption('tab_zram', form.Value, '_zram_swappiness',
				_('Swappiness'),
				_('Kernel tendency to swap pages (0-200). Higher values prefer swapping over dropping cache. Applied when zram is enabled alone.'));
			remapUCI(o, 'zram', 'swappiness');
			o.datatype = 'and(uinteger,max(200))';
			o.default = '120';
			o.depends('_zram_advanced', '1');
			o.rmempty = false;
		} else {
			o = s.taboption('tab_zram', form.DummyValue, '_zram_not_available');
			o.rawhtml = true;
			o.default = '<em>' +
				_('zram support is not available. Install the swap-zram package.') +
				'</em>';
		}

		// ===== zswap Tab =====
		if (zswapAvailable) {
			o = s.taboption('tab_zswap', form.Flag, '_zswap_enabled',
				_('Enable zswap cache'),
				_('Enable compressed page caching for all swap devices.'));
			remapUCI(o, 'zswap', 'enabled');
			o.default = false;
			o.rmempty = false;

			o = s.taboption('tab_zswap', form.ListValue, '_zswap_algorithm',
				_('Compression algorithm'),
				_('Select a fast algorithm for the L1 cache. Speed is preferred since zswap handles frequently accessed pages.'));
			remapUCI(o, 'zswap', 'algorithm');
			compressors(o);
			o.default = 'lz4';
			o.depends('_zswap_enabled', '1');
			o.rmempty = false;

			o = s.taboption('tab_zswap', form.Value, '_zswap_pool',
				_('Maximum pool (%)'),
				_('Maximum RAM percentage for the compressed cache. Only used when zram is not enabled.'));
			remapUCI(o, 'zswap', 'pool');
			o.datatype = 'and(ufloat,max(90.00))';
			o.default = '20.00';
			o.depends('_zswap_enabled', '1');
			o.rmempty = false;

			o = s.taboption('tab_zswap', form.ListValue, '_zswap_zpool',
				_('Memory allocator'),
				_('Allocator for compressed pages. zbud pairs pages for lower memory use, zsmalloc is more flexible.'));
			remapUCI(o, 'zswap', 'zpool');
			zpool(o);
			o.default = 'zsmalloc';
			o.depends('_zswap_enabled', '1');
			o.rmempty = false;

			// UI-only toggle for advanced options (not saved to UCI)
			o = s.taboption('tab_zswap', form.Flag, '_zswap_advanced',
				_('Show advanced options'));
			o.default = '0';
			o.depends('_zswap_enabled', '1');
			o.write = function() {};
			o.remove = function() {};

			o = s.taboption('tab_zswap', form.Value, '_zswap_swappiness',
				_('Swappiness (zswap only)'),
				_('Swappiness when zswap is enabled without zram (0-200).'));
			remapUCI(o, 'zswap', 'swappiness');
			o.datatype = 'and(uinteger,max(200))';
			o.default = '120';
			o.depends('_zswap_advanced', '1');
			o.rmempty = false;

			o = s.taboption('tab_zswap', form.Value, '_zswap_accept_threshold',
				_('Accept threshold (%)'),
				_('Resume accepting pages when pool usage drops below this percentage. Prevents thrashing when pool is near-full. Set to 100 to disable hysteresis.'));
			remapUCI(o, 'zswap', 'accept_threshold');
			o.datatype = 'and(uinteger,max(100))';
			o.default = '90';
			o.depends('_zswap_advanced', '1');
			o.rmempty = false;

			o = s.taboption('tab_zswap', form.Flag, '_zswap_shrinker',
				_('Enable shrinker'),
				_('Proactively evict cold pages from zswap to the backing swap device, reclaiming memory for other uses.'));
			remapUCI(o, 'zswap', 'shrinker');
			o.default = '1';
			o.depends('_zswap_advanced', '1');
			o.rmempty = false;
		} else {
			o = s.taboption('tab_zswap', form.DummyValue, '_zswap_not_available');
			o.rawhtml = true;
			o.default = '<em>' +
				_('zswap support is not available. Install the swap-zswap package.') +
				'</em>';
		}

		// ===== System Tuning Tab =====
		o = s.taboption('tab_tuning', form.DummyValue, '_tuning_info');
		o.rawhtml = true;
		o.default = '<div class="alert-message warning">' +
			'<p>' +
			_('Changes to system tuning settings will take effect on the next reboot or when zram/zswap services are restarted.') +
			'</p></div>';

		// Combined mode settings (only shown when both are available)
		if (zramAvailable && zswapAvailable) {
			o = s.taboption('tab_tuning', form.DummyValue, '_combined_header');
			o.rawhtml = true;
			o.default = '<h4 style="margin-top:15px;margin-bottom:10px;">' +
				_('Combined Mode (zram + zswap)') + '</h4>' +
				'<p style="color:#666;font-size:0.9em;margin-bottom:5px;">' +
				_('These settings apply when both zram and zswap are enabled. zswap acts as L1 cache, zram as L2.') + '</p>';

			o = s.taboption('tab_tuning', form.ListValue, 'compressor_scale',
				_('Compressor for zram (with zswap)'),
				_('When zswap is enabled, use this compressor for zram. Choose a high-ratio algorithm since zswap handles the hottest pages.'));
			compressors(o);
			o.default = 'zstd';
			o.rmempty = false;

			o = s.taboption('tab_tuning', form.Value, 'zswap_scale_pool',
				_('Pool split (%)'),
				_('Split of the base pool target between zswap (L1) and zram (L2). 50% means each gets half.'));
			o.datatype = 'and(ufloat,max(75.00))';
			o.default = '50.00';
			o.rmempty = false;

			o = s.taboption('tab_tuning', form.Value, 'swappiness_combined',
				_('Swappiness (combined)'),
				_('Swappiness when both zswap and zram are enabled (0-200). Higher values encourage use of the tiered compression.'));
			o.datatype = 'and(uinteger,max(200))';
			o.default = '180';
			o.rmempty = false;
		}

		// General VM tuning
		o = s.taboption('tab_tuning', form.DummyValue, '_vm_header');
		o.rawhtml = true;
		o.default = '<h4 style="margin-top:15px;margin-bottom:10px;">' +
			_('Virtual Memory Settings') + '</h4>';

		o = s.taboption('tab_tuning', form.Flag, 'lru_gen',
			_('Enable Multi-Gen LRU'),
			_('Use the Multi-Generation LRU algorithm (kernel 6.1+) for better page reclaim decisions.'));
		o.default = '1';
		o.rmempty = false;

		o = s.taboption('tab_tuning', form.Value, 'lru_gen_features',
			_('LRU Gen feature bitmask'),
			_('MGLRU features: 1 = core MGLRU, 2 = clear accessed bit in leaf PTEs, 4 = clear accessed bit in non-leaf PTEs. Use 7 for all features (recommended for compressed swap).'));
		o.datatype = 'and(uinteger,max(7))';
		o.default = '7';
		o.depends('lru_gen', '1');
		o.rmempty = false;

		o = s.taboption('tab_tuning', form.Value, 'lru_gen_min_ttl',
			_('LRU Gen min TTL (ms)'),
			_('Minimum time-to-live before pages are considered for reclaim. Higher values reduce unnecessary reclaim.'));
		o.datatype = 'uinteger';
		o.default = '1000';
		o.depends('lru_gen', '1');
		o.rmempty = false;

		o = s.taboption('tab_tuning', form.Flag, 'page_cluster',
			_('Optimize readahead for compressed swap'),
			_('Set page-cluster to 0 and disable VMA-based swap readahead. Both avoid unnecessary readahead when swap data is already in RAM (compressed).'));
		o.default = '1';
		o.rmempty = false;

		return m.render();
	}
});
