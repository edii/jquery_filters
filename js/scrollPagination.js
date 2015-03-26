(function($) {
	$.fn.scrollPagination = function(options) {
		var callbacks = $.Callbacks();
		var settings = { 
			nop     : 3, 
			offset  : 0, 
			error   : 'empty products!', 
			delay   : 500, 
			scroll  : true,
                        data    : false,
                        nojson  : false,
                        append  : '.content',
                        item    : '.content a',
                        _callback: function( $this, items ) {},
		}
		
		if(options) {
			$.extend(settings, options);
		}
		
                function setCallback( $this, data ) {
                    $settings._callback( $this, data );
                }
                
                
                
		return this.each(function() {		
			
			$this = $(this);
			$settings = settings;
			var offset = $settings.offset;
			var busy = false; 
			
			if($settings.scroll == true) $initmessage = 'Load <span class="loader-effects"></span>';
			else $initmessage = 'Done <span class="loader-effects"></span>';
			
                        if(!$this.find($settings.append).length)
                            $this.append('<div class="content"></div>');
                        if(!$this.find('.loading-bar').length)
                            $this.append('<div class="loading-bar">'+$initmessage+'</div>');
			
			function getData( status ) {
				// callbacks.add( setCallback );
                                
				$.post('/products.php', {
                                    
                                        number        : $settings.nop,
                                        offset        : offset,
                                        data          : $settings.data,
                                        nojson        : $settings.nojson  
					    
				}, function(data) {
                                        var html;
                                        if(!$settings.nojson) {
                                            html = data.result;
                                        } else {
                                            html = data;
                                        }

					$this.find('.loading-bar').html($initmessage);
						
					if(html == "" || html == "\n") { 
                                                $this.find('.loading-bar').hide();
					}
					else {
						
					    offset = offset+$settings.nop; 
						    
                                            // $this.find( $settings.append ).append(html);

                                            // callbacks.fire( $(this), data );
                                            //if(!status) {
                                                
                                                if(status == 'refresh') {
                                                    if(!$('#SandBox').mixItUp('isLoaded')){
                                                        $('#SandBox').mixItUp({
                                                            selectors: {
                                                            target: '.content .mix',
                                                            filter: '.filter',
                                                            sort: '.sort'
                                                            },
                                                        });
                                                        // $('#SandBox').mixItUp('destroy', true);
                                                    } 
                                                    
                                                    $.each(html, function(key, value) {
                                                        var mixDiv = $('<div></div>')
                                                        .attr({ "data-value" : value._id })
                                                        .addClass("mix").addClass('category-'+value._category).html( value._id );
                                                        $('#SandBox').mixItUp('insert', value._id, mixDiv); // {filter: 'all'}
                                                        // $('#SandBox').append(mixDiv);
                                                    });
                                                    // <div data-value="{_id}" class="mix category-{_category}">{_id}</div>
                                                    
                                                    
                                                    
//                                                    $('#SandBox').mixItUp({
//                                                        selectors: {
//                                                            target: '.content .mix',
//                                                            filter: '.filter',
//                                                            sort: '.sort'
//                                                        },
//                                                    });
//                                                    $('#SandBox').mixItUp('forceRefresh');
                                                } else {
                                                    
                                                    $.each(html, function(key, value) {
                                                        console.log( key, value );
                                                        var mixDiv = $('<div></div>')
                                                        .attr({ "data-value" : value._id })
                                                        .addClass("mix").addClass('category-'+value._category).html( value._id );
                                                        $this.find( $settings.append ).append(mixDiv);
                                                    });
                                                    
                                                    $('#SandBox').mixItUp({
                                                        selectors: {
                                                        target: '.content .mix',
                                                        filter: '.filter',
                                                        sort: '.sort'
                                                        },
                                                    });
                                                }
                                            //} else {
                                            //    $('#SandBox').mixItUp('forceRefresh');
                                            //}
                                            
                                            
//                                            $this.find('.content a[rel="prettyPhoto[gallery]"]').prettyPhoto({
//                                                theme: 'facebook',
//                                                slideshow: 5000, 
//                                                autoplay_slideshow: false,
//                                                show_title: false,
//                                                allow_resize: true,
//                                                default_width: 700,
//                                                default_height: 544,
//                                                horizontal_padding: 20,
//                                                ie6_fallback: true,
//                                                social_tools: ''
//                                            });
                                                	
                                            busy = false;
					}	
						
				});
					
			}	
			
			getData();
			
                        if(!$this.find( $settings.item ).length) {
                            $this.find('.loading-bar').html('Load <span class="loader-effects"></span>');
                        }
                        
			if($settings.scroll == true) {
				$(window).scroll(function() {
					
					if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
						busy = true;
						$this.find('.loading-bar').html('Load <span class="loader-effects"></span>');
						setTimeout(function() {
                                                    getData('refresh');
						}, $settings.delay);
							
					}	
				});
			}
			
			$this.find('.loading-bar').click(function() {
				if(busy == false) {
					busy = true;
					getData('refresh');
				}
			
			});
			
		});
	}

})(jQuery);
/* end */