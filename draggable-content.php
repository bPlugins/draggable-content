<?php
/**
 * Plugin Name: Draggable Content
 * Description: A block for displaying a draggable content."
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-blocks
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'DRGABL_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'DRGABL_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'DRGABL_DIR_PATH', plugin_dir_path( __FILE__ ) );

if( !class_exists( 'DRGABLPlugin' ) ){
	class DRGABLPlugin{
		function __construct(){
			add_action( 'init', [ $this, 'onInit' ] );
		}

		function onInit(){
			register_block_type( __DIR__ . '/build' );
		}
	}
	new DRGABLPlugin();
}