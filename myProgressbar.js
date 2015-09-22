// ==================================================================================================
// WRITEN BY HUGO FABIANO A. FERREIRA - hugoofab@gmail.com
// JUN 2015. São Paulo - SP, Brasil. 
// https://github.com/hugoofab/myProgressbar/
//
// ESTE É UM PLUGIN PARA CRIAÇÃO DE UM PROGRESSBAR COMPATÍVEL COM TWITTER BOOTSTRAP
// O DIFERENCIAL DESTE PLUGIN É PODER COLOCAR UM TEXTO NO MEIO DA PROGRESSBAR DE FORMA QUE
// ESSE TEXTO IRÁ MUDAR DE COR CONFORME A BARRA VAI CARREGANDO
// 
// THIS IS A JQUERY PROGRESSBAR PLUGIN COMPATIBLE WITH TWITTER BOOTSTRAP
// THE ADVANTAGE OF THIS PLUGIN IS CHANGE THE INNER TEXT COLOR AS IT FILLS TO MAKE TEXT
// WELL VISIBLE REGARDLESS OF THE PERCENTAGE DISPLAYED
// ==================================================================================================
// HOW TO USE:
// --------------------------------------------------------------------------------------------------
//
// SETTING JUST PROGRESSBAR CLASS:
// ---------------------------------------------------
// <div id="div-progressbar"></div>
// 
// var myBar = new $("#div-progressbar").myProgressbar("Loading... [AVG]%");
// myBar.setValue(10)
//
//
// PASSING AN CONFIGURATION OBJECT TO SET MORE OPTIONS
// ---------------------------------------------------
// var conf = {
//	'initialClass'   : 'progress-bar progress-bar-striped active',  // START PROGRESSBAR WITH THE CLASS YOU WANT
//	'barStyle'		 : 'progress-bar-default' ,  // YOU CAN USE: default, success, info, warning, danger
//	'textTemplate'   : '[AVG]%',			// TEXT TO SHOW INSIDE PROGRESSBAR. YOU CAN USE [AVG] TO GET PERCENTAGE VALUE
//	'zIndex'         : 3 ,					// YOU HAVE TO CHANGE IT TO ADAPT TO YOUR PAGE
//	'height'         : 30 ,					// PROGRESSBAR HEIGHT
//	'textBackColor'  : "#000" ,				// TEXT SHOWING WHEN BAR IS EMPTY
//	'textFrontColor' : "#FFF" ,				// TEXT SHOWING WHEN BAR IS FULL
//	'fontSize'		 : 16 ,
//	'value' 		 : false				// PERCENTAGE VALUE
// }
//
// var myBar = $("#myProgress").myProgressbar(conf);
//
// ---------------------------------------------------
// DEFINING DEFAULT CONFIGURATION
//
// $.fn.myProgressbar.defaults.initialClass = "progress progress-striped active"
// line above will set the attribute "initialClass" to all progressbar created from now
// ==================================================================================================

$.fn.myProgressbar = function ( conf ){

	if ( typeof ( conf ) === "string" ) {
		conf = {'textTemplate':conf} ;
	}

	var defaultConfig = {
		'initialClass'   : '' ,
		'textTemplate'   : '' ,
		'zIndex'         : '' ,
		'height'         : '' ,
		'textBackColor'  : '' ,
		'textFrontColor' : '' ,
		'fontSize'		 : '' ,
		'barStyle'		 : '' ,
		'value' 		 : ''
	}

	defaultConfig.initialClass   = $.fn.myProgressbar.defaults.initialClass ;
	defaultConfig.textTemplate   = $.fn.myProgressbar.defaults.textTemplate ;
	defaultConfig.zIndex         = $.fn.myProgressbar.defaults.zIndex ;
	defaultConfig.height         = $.fn.myProgressbar.defaults.height ;
	defaultConfig.textBackColor  = $.fn.myProgressbar.defaults.textBackColor ;
	defaultConfig.textFrontColor = $.fn.myProgressbar.defaults.textFrontColor ;
	defaultConfig.fontSize       = $.fn.myProgressbar.defaults.fontSize ;
	defaultConfig.barStyle       = $.fn.myProgressbar.defaults.barStyle ;
	defaultConfig.value          = $.fn.myProgressbar.defaults.value ;

	var conf        = $.extend (defaultConfig,conf);
	var totalWidth  = this.width();
	var totalHeight = conf.height ;

    this.addClass ( conf.initialClass );
    this.css('overflow','hidden')
    this.css('height',totalHeight+"px")

    var internalDiv = $("<div></div>") ;
    $(internalDiv).attr('aria-valuenow', 0 );
    $(internalDiv).attr('aria-valuemin', 0 );
    $(internalDiv).attr('aria-valuemax', 100 );
    $(internalDiv).attr('role'         , 'progressbar' );
    $(internalDiv).attr('class'        , 'progress-bar' );

    $(internalDiv).css('overflow'     , 'hidden' );
    $(internalDiv).css('position'     , 'relative' );
    $(internalDiv).css('z-index'      , (conf.zIndex+1) );
    $(internalDiv).css('padding'      , '0' );
    $(internalDiv).css('margin'       , '0' );
    $(internalDiv).css('border-right' , '0' );
    $(internalDiv).css('width'        , '0%' );

    var whiteLabelDiv = $("<div class=\"progressbar-white-label\"></div>");
    $(whiteLabelDiv).css('height'      , totalHeight+'px' );
    $(whiteLabelDiv).css('width'       , totalWidth+'px' );
    $(whiteLabelDiv).css('text-align'  , 'center' );
    $(whiteLabelDiv).css('width'       , totalWidth+'px' );
    $(whiteLabelDiv).css('color'       , conf.textFrontColor );
	$(whiteLabelDiv).css('height'      , totalHeight+'px' );
	$(whiteLabelDiv).css('width'       , totalWidth+'px' );
	$(whiteLabelDiv).css('text-align'  , 'center' );
	$(whiteLabelDiv).css('padding-top' , "1px" );
	$(whiteLabelDiv).css('font-size'   , conf.fontSize+"px" );

   	internalDiv.append(whiteLabelDiv);

    this.append(internalDiv)

	var backLabelDiv = $("<div class=\"progressbar-black-label\"></div>");
	backLabelDiv.css( 'padding-top'  , "0px" ) ;
	backLabelDiv.css( 'padding-left' , "2px" ) ;
	backLabelDiv.css( 'z-index'      , conf.zIndex ) ;
	backLabelDiv.css( 'height'       , totalHeight+'px') ;
	backLabelDiv.css( 'line-height'  , whiteLabelDiv.css('line-height') + 'px' ) ;
	backLabelDiv.css( 'font-size'    , whiteLabelDiv.css('font-size') + 'px' ) ;
	backLabelDiv.css( 'font-weight'  , whiteLabelDiv.css('font-weight') ) ;
	backLabelDiv.css( 'width'        , totalWidth+'px') ;
	backLabelDiv.css( 'margin'       , '0'           ) ;
	backLabelDiv.css( 'position'     , 'absolute'    ) ;
	backLabelDiv.css( 'text-align'   , 'center'      ) ;
	backLabelDiv.css( 'color'        , conf.textBackColor ) ;

    this.append(backLabelDiv)

    this.resize = function ( ) {
        totalWidth = this.width();
        totalWidth = this.height();
        $(internalDiv).css('height',totalHeight+'px');
        backLabelDiv.css('font-size',whiteLabelDiv.css('font-size'))
        backLabelDiv.css('font-weight',whiteLabelDiv.css('font-weight'))
    }

	this.setText  = function ( value ) {
        backLabelDiv.html(value)
        whiteLabelDiv.html(value)
	};

	this.setValue = function ( value ) {
		if ( value > 100 ) value = 100 ;
		this.children(".progress-bar").css('width',value+'%');
        if ( conf.textTemplate !== '' ) {
        	var text = conf.textTemplate.replace(/\[AVG\]/g , value);
        	console.log(text)
            backLabelDiv.html(text)
        	whiteLabelDiv.html(text)
        }
	};

	this.resize();

	if ( conf.value !== false ) this.setValue ( conf.value )

	return this;

};

$.fn.myProgressbar.defaults = {
	'initialClass'   : 'progress-bar progress-bar-striped active', // this is the twitter bootstrap default
	'barStyle'		 : 'progress-bar-default' ,
	'textTemplate'   : '[AVG]%',
	'zIndex'         : 3 , // @TODO later: think in a way to not use z-index to overlap texts
	'height'         : 30 ,
	'textBackColor'  : "#000" ,
	'textFrontColor' : "#FFF" ,
	'fontSize'		 : 16 ,
	'value' 		 : false
}