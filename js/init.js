// globa variable
$data_hash = [];

// anchor
jQuery(function(){
    jQuery(window).hashchange(function(){ 
		if(document.location.hash == '') return;
                var hash = location.hash.split('#');
                if(hash.length > 1) {
                    $data_hash = hash[1];
                    hashchange_onLoadInit();
                    
                    // if($('.box-anchor #'+hash[1]).length)
                    //if(typeof $('.box-anchor #'+hash[1]) == "object")
                    //    $('html, body').animate({scrollTop: $('.box-anchor #'+hash[1]).offset().top}, 800);
                }
                
    });
    jQuery(window).hashchange();
});

function cookie_clear() {
    if($.cookie('popUp')) {
        $.removeCookie('popUp', { path: '/' });
    }
}

function setCookie(name, value) {
    $.cookie(name, value, { expires: 7, path: '/' });
}

function getCookie( name ) {
    if($.cookie(name)) {
        return $.cookie(name); 
    } else
        return false;
}

// init hashchange ( init bPopUp )
function hashchange_onLoadInit() {
    
}

function hashchange_AfterInit() { 
    var _data = _parceHash( $data_hash );
}

function _parceHash( hash ) {
    var _data = {};
    if(hash.length) {
        var pair = (hash).split('&');
        for(var i = 0; i < pair.length; i ++) {
            var param = pair[i].split('=');
           _data[param[0]] = param[1];
        }
    }
    return _data;
}


function isset(element) {
    if(typeof element != 'undefined') {
        return element.length > 0;
    } else
        return false;
}

// toggleClicked
jQuery.fn.clickToggle = function(a,b) {
  var ab=[b,a];
  function cb(){ ab[this._tog^=1].call(this); return false; }
  return this.on("click", cb);
};

/*
 * parce url
 **/
function parseUrlQuery() {
    var data = {};
    if(location.search) {
        var pair = (location.search.substr(1)).split('&');
        for(var i = 0; i < pair.length; i ++) {
            var param = pair[i].split('=');
            data[param[0]] = param[1];
        }
    }
    return data;
}

/*
 * parce string serilize
 **/
function parseQuery( str ) {
    var data = {};
    if(typeof str == 'string') {
        var pair = (str).split('&');
        for(var i = 0; i < pair.length; i ++) {
            var param = pair[i].split('=');
            data[param[0]] = param[1];
        }
    } else if(typeof str == 'object') {
        $.each(str, function(_k, _val) {
            if(_val.name)
                data[ _val.name ] = (_val.value) ? _val.value : null;
        });
    }
    return data;
}

/*
 * Display error massenge
 * @param {type} $_msg
 * @returns {undefined}
 */
function die( $_msg ) {
    console.log( $_msg );
}

$(document).ready(function(){
    $toggleLayout = $('#ToggleLayout');
    $mode = '';
    
    /* ---- init scrollPagination ---- */
    if($('#SandBox').length) {

        $('#SandBox').scrollPagination({

            nop     : 10,
            offset  : 0, 
            error   : 'empty products!', 
            delay   : 100, 
            scroll  : true, 
            item    : '.content > .mix',
            data    : { },
            _callback: function(elements, data) {
                $('#SandBox').mixItUp('selectors', {
                    target: '.content .mix',
                    filter: '.filter',
                    sort: '.sort'
                });
            },
            nojson  : false

        });
    }
    /* ---- END ---- */
    
    $toggleLayout.on("click",function(){
        
        if(""=== $mode){
            $mode = 'list';
            $('#SandBox').mixItUp('changeLayout', {
                    display: 'block',
                    containerClass: 'list'
            }, function(state){
                    $toggleLayout.addClass("grid-icon");
            });
            
        } else {
            $mode = '';
            $('#SandBox').mixItUp('changeLayout', {
                    display: 'inline-block',
                    containerClass: ''
            }, function(state){
                    $toggleLayout.removeClass("grid-icon");
            });
        }    
        
                
    });
    
    // $('#SandBox').mixItUp();
});