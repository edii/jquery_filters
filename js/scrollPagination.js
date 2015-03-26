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
			
			$this.append('<div class="content"></div><div class="loading-bar">'+$initmessage+'</div>');
			
			function getData() {
				callbacks.add( setCallback );
                                
				$.post('/products.php', {
                                    
                                        number        : $settings.nop,
                                        offset        : offset,
                                        data          : $settings.data,
                                        nojson        : $settings.nojson  
					    
				}, function(data) {
                                        var html;
                                        if($settings.nojson) {
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
						    
                                            $this.find( $settings.append ).append(html);

                                            callbacks.fire( $(this), data );
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
                                                    getData();
						}, $settings.delay);
							
					}	
				});
			}
			
			$this.find('.loading-bar').click(function() {
				if(busy == false) {
					busy = true;
					getData();
				}
			
			});
			
		});
	}

})(jQuery);
/* end */