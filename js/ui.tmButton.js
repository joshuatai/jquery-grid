// JavaScript Document
(
	function ($) {
		var defaultSetting={
			'click': null,
			'disabled': false,
			'focused': false,
			'image': null,
			'name': null,
			'mode': 'medium',
			'on': function(){ return false;},
			'off': function(){ return false;},
			'tmdropdownlist': null,
			'tmPopup': null
		};
		var mode= ['medium','red','small','toggle'];
		function checkSetting(setting){
			var checkedSetting={};
			for(j in setting){
				if(setting.hasOwnProperty(j)){		
					var newName= j.toLowerCase();
					switch(newName){
						case 'click':
							if(typeof(setting[j]) != 'function'){								
								checkedSetting[newName]= null;
							}else{
								checkedSetting[newName]= setting[j];
							}						
						break;
						case 'disabled': case 'focused':							
							if(typeof(setting[j]) != 'boolean'){
								checkedSetting[newName]= false;
							}else{
								checkedSetting[newName]= setting[j];
							}
						break;
						case 'image':
							if(typeof(setting[j]) != 'object'){
								checkedSetting[newName]= null;
							}else{								
								var image= setting[j];
								var hasSrc= false;								
								for(var att in image){									
									if(image.hasOwnProperty(att)){										
										if(att.toLowerCase() == 'src'){											
											hasSrc= true;
											$('<image>').attr('src', image.src);
										}else if(att.toLowerCase() == 'disabled'){
											$('<image>').attr('src', image.disabled);
										}else if(att.toLowerCase() == 'hover'){
											$('<image>').attr('src', image.hover);
										}
									}
								}		
								hasSrc === true ? checkedSetting[newName]= image: checkedSetting[newName]= null;
							}
						break;
						case 'mode':
							if($.inArray(setting[j].toLowerCase(), mode) == -1){								
								checkedSetting[newName]= 'medium';
							}else{
								checkedSetting[newName]= setting[j].toLowerCase();
							}
						break;
						case 'name':
							if(typeof(setting[j]) != 'string'){
								checkedSetting[newName]= null;
							}else{
								checkedSetting[newName]= setting[j];
							}
						break;
						case 'tmdropdownlist': case 'tmpopup':
							if(typeof(setting[j]) != 'object'){
								checkedSetting[newName]= null;
							}else{
								checkedSetting[newName]= setting[j];
							}
						break;
						case "on": case "off":
							if(typeof(setting[j]) != 'function'){
								checkedSetting[newName]= null;
							}else{
								checkedSetting[newName]= setting[j];
							}
						break;
						default:							
						break;
					}
				}
			}				
			return checkedSetting;
		}
		$.extend($.fn,
			{
				visualRadios: function (setting) {
					var _target = $(this);
					var _thebox = '<span class="visual_radios"></span>';
					var _thelist = '';
					$(setting.options_list).each(
						function(id, option_item)
						 {
						 	var _selected_option_1 = "";
							var _selected_option_2 = "";
							if (setting.selected_option==id) {
								_selected_option_1 = " label_selected";
								_selected_option_2 = " checked";
							}
							_thelist = _thelist + '<label id="label_'+option_item.id_name+'" for="'+option_item.id_name+'" class="'+option_item.class_name+_selected_option_1+'">&nbsp;</label>' +
										'<input type="radio" name="'+setting.list_name+'" id="'+option_item.id_name+'" value="'+option_item.option_value+'" '+_selected_option_2+' />';
						}
					);
					_target.append($(_thebox).append(_thelist));
					$('label', _target).bind('click.tmButton', 
						function(e) {
							$('label', _target).removeClass("label_selected");
							$(this).addClass("label_selected");
						}
					);
				},				
				tmButton: function (setting, attribute, newVal) {
                    var _body = $('body');
					function _clearDropDownList(target){
						target
							.tmDropDownList('destroy')
							.removeClass("tab")
							.removeClass("dropDownByHover")
							.removeData("hasDropDownList.tmButton")
							.removeData("dropDownBy.tmButton")
							.removeData("positionVal.tmButton")
							.data("btnHasChild.tmButton")
							.remove();							
						target.removeData("btnHasChild.tmButton");
						target.data("button_content.tmButton").removeClass("tab");
					}
					function _clearPopup(target){
						target
							.tmPopup('destroy')
							.removeData("hasPopup.tmButton");
					}
					if(typeof(setting) == 'string'){
						var returnValue;
						if(setting == 'option'){
							var that= this;
							if(that.data("initTmButton.tmButton") != true){
								console.log("This tmButton has not been initialized!");
								return false;
							}
							attribute= attribute.toLowerCase();
							switch(attribute){
								case 'click':
									newVal === undefined ? returnValue= that.data("event.tmButton") : that.tmButton({'click': newVal});
								break;
								case 'disabled':
									if(newVal === undefined){
										returnValue= that.data("disabled.tmButton");
										if(returnValue == undefined){
											returnValue= false;
										}
									}else{
										that.tmButton({
											'disabled': newVal
										});
									}									
								break;
								case 'focused':
									if(newVal === undefined){
										returnValue= that.data("focused.tmButton");
										if(returnValue == undefined){
											returnValue= false;
										}
									}else{
										that.tmButton({
											'focused': newVal
										});
									}
								break;
								case 'image':
									if(newVal === undefined){
										returnValue= that.data("image.tmButton");
										if(returnValue == undefined){
											returnValue= null;
										}
									}else{
										that.tmButton({
											'image': newVal
										});
									}
								break;
								case 'mode':
									if(newVal === undefined){
										returnValue= that.data("mode.tmButton");
									}	
								break;
								case 'name':
									if(newVal === undefined){
										returnValue= that.data("btn_name.tmButton");
										if(returnValue == undefined){
											returnValue= null;
										}
									}else{
										that.tmButton({
											'name': newVal
										});
									}
								break;
								case 'tmdropdownlist':
									if(newVal === undefined){
										returnValue= that.tmDropDownList("option", "data");
										if(returnValue == undefined){
											returnValue= null;
										}
									}else{
										that.tmButton({
											'tmdropdownlist': newVal
										});
									}
								break;
								case 'on':
									if(newVal === undefined){
										returnValue= that.data("on.tmButton");
										if(returnValue == undefined){
											returnValue= false;
										}
									}else{
										that.tmButton({
											'on': newVal
										});
									}
								break;
								case 'off':
									if(newVal === undefined){
										returnValue= that.data("off.tmButton");
										if(returnValue == undefined){
											returnValue= false;
										}
									}else{
										that.tmButton({
											'off': newVal
										});
									}
								break;
								default:
								break;
							}
							return returnValue;
						}else if(setting == 'destroy'){
							return this.each(function(){
								var that= $(this), setting;
								if(that.data("initTmButton.tmButton") != true){
									return false;
								}
								setting= that.data("setting.tmButton");
								if(setting.mode == "toggle"){
									that
										.data("toggleButtonSensor.tmButton")
										.draggable( "destroy" )
										.remove();
									that
										.find('.left_sensor, .right_sensor')
										.unbind('click.tmButton')
										.remove();
									that
										.data("toggleButtonContainer.tmButton")
										.remove();
									that
										.data("toggleButtonTitle.tmButton")
										.remove();
									that
										.removeClass("tm_button")										
										.removeClass("toggle")
										.removeClass("button_toggle")
										.removeAttr("href")
										.unbind(".tmButton");
									
									if(that.data("href.tmButton")){
										that.attr("href", that.data("href.tmButton"));
									}
									if(that.attr("className") == ""){
										that.removeAttr("class");
									}
									that
										.removeData("toggleButtonSensor.tmButton")
										.removeData("toggleButtonContainer.tmButton")
										.removeData("toggleButtonTitle.tmButton")
										.removeData("toggleStatus.tmButton")
										.removeData("on.tmButton")
										.removeData("off.tmButton")
										.removeData("mode.tmButton")
										.removeData("href.tmButton")
										.removeData("setting.tmButton")										
										.removeData("initTmButton.tmButton");
								}else{
									if(that.data("hasDropDownList.tmButton") == true){
										_clearDropDownList(that);
									}
									if(that.data("hasPopup.tmButton") == true){
										_clearPopup(that);
									}
									if(that.data('button_content.tmButton').length > 0){
										that
											.data('button_content.tmButton')
											.removeClass()
											.removeData()
											.unbind()
											.remove();
									}
									if(that.data("has_image.tmButton") == true){
										that
											.removeData("has_image.tmButton")
											.removeData("btnImage.tmButton")
											.removeData("activedImage.tmButton")
											.removeData("btnNameContent.tmButton")
											.removeData("disabledImage.tmButton")
											.removeData("hoveredImage.tmButton")
											.removeData("srcImage.tmButton")
											.removeData("image.tmButton");
									}
									that
										.removeClass("tm_button")
										.removeClass("btn")
										.removeClass(setting.mode)
										.removeClass(setting.mode+"_disabled")
										.removeAttr("href")
										.unbind(".tmButton");										
									
									if(that.data("href.tmButton")){
										that.attr("href", that.data("href.tmButton"));
									}
									if(that.attr("className") == ""){
										that.removeAttr("class");
									}
									that
										.removeData("btn_name.tmButton")
										.removeData("button_content.tmButton")
										.removeData("disabled.tmButton")
										.removeData("focused.tmButton")
										.removeData("mode.tmButton")
										.removeData("status.tmButton")
										.removeData("setting.tmButton")
										.removeData("href.tmButton")
										.removeData("hasPopup.tmButton")
										.removeData("hasDropDownList.tmButton")
										.removeData("initTmButton.tmButton");
								}
								
							});
						}else if(setting == 'disable'){
							return this.tmButton("option", "disabled", true);
						}else if(setting == 'enable'){
							return this.tmButton("option", "disabled", false);
						}else{
							return this.each(function(){});
						}
					}else{						
						setting= checkSetting(setting);
						return this.each(
							function(){
								var that= $(this);
								var _image;
								var _timer;							
								if(that.data("setting.tmButton")){
									var oldSetting= that.data("setting.tmButton");
									if(setting.tmdropdownlist){
										setting.tmdropdownlist= $.extend(oldSetting.tmdropdownlist, setting.tmdropdownlist);
									}
									setting= $.extend(oldSetting, setting);
								}else{
									setting= $.extend({}, defaultSetting, setting);
								}
								that.data("setting.tmButton", setting);								
								function _setButtonName(_obj){
									if(setting.name){
										if(that.data("hasDropDownList.tmButton")== true){
											_obj.html(setting.name).append(that.data("btnHasChild.tmButton"));
										}else{
											_obj.html(setting.name);
										}
										that.data("btn_name.tmButton",setting.name);
									}else{
										if(!that.data("btn_name.tmButton")){
											if(that.data("hasDropDownList.tmButton")== true){
												_obj.html(that.attr("id")).append(that.data("btnHasChild.tmButton"));
											}else{
												_obj.html(that.attr("id"));
											}	
											that.data("btn_name.tmButton", that.attr("id"));
										}else{
											if(that.data("hasDropDownList.tmButton")== true){
												_obj.html(that.data("btn_name.tmButton")).append(that.data("btnHasChild.tmButton"));
											}else{
												_obj.html(that.data("btn_name.tmButton"));		
											}										
										}
									}
								}
								function _adjustPosition(){                                   
									if(that.data("has_image.tmButton") == true){                                        
										if(_image.attr('complete')) {										
											clearTimeout(_timer);									
											var marginTop;
                                            _image
                                                .css({
                                                    'position': 'absolute',
                                                    'top': -1000
                                                })
                                                .appendTo(_body);
                                            if(that.data("mode.tmButton") == 'small'){
												marginTop = (20-_image.height())/2;
											}else{											
												marginTop = (24-_image.height())/2;
											}
                                            
                                            if(setting.image.align == 'right'){
                                                _image
                                                    .css('marginLeft', 5)
                                                    .insertAfter(that.data("btnNameContent.tmButton"));
                                            }else{
                                                _image
                                                    .css({
                                                        'float': 'left',
                                                        'marginRight': 5
                                                    })
                                                    .insertBefore(that.data("btnNameContent.tmButton"));
                                            }
                                            _image.css({
                                                'marginTop': marginTop,
                                                'position': 'static',
                                                'top': 'auto'
                                            });
										}else {										
											_timer= window.setTimeout(_adjustPosition, 100);
										}
									}
								}
								function _setImage(obj){
									if(setting.image && setting.image.src!=""){
										obj.removeClass('btn_name');
										var children= obj.removeClass('btn_name').children();
										if (children.length > 0){
											children.removeData().remove();
										}else{
											obj.html('');
										}
										var _content_image= $('<span></span>')
											.addClass('btn_name')
											.addClass('btn');
										_image= $('<img>')
											.addClass('btn')	
											.attr('src', setting.image.src);	
										obj.append(_content_image);										
										that
											.data("btnNameContent.tmButton", _content_image)
											.data("btnImage.tmButton", _image)
											.data("srcImage.tmButton",setting.image.src);
										
										setting.image.disabled ?
											that.data("disabledImage.tmButton",setting.image.disabled) : that.data("disabledImage.tmButton",setting.image.src);
										
										setting.image.hover ?
											that.data("hoveredImage.tmButton",setting.image.hover) : that.data("hoveredImage.tmButton",setting.image.src);
											
										setting.image.actived ?
											that.data("activedImage.tmButton",setting.image.actived) : that.data("activedImage.tmButton",setting.image.src);
																											
										that.data("image.tmButton", setting.image).data("has_image.tmButton",true);
									}else{
										obj.removeClass('btn_name').addClass('btn_name');
										that
											.removeData("image.tmButton")
											.removeData("has_image.tmButton");
										
										that.data("btnNameContent.tmButton") ? that.data("btnNameContent.tmButton").remove() : "";
										that.data("btnImage.tmButton") ? that.data("btnImage.tmButton").remove() : "";
									}
								}							
								function _clickEventHandler(){
									if(setting.click){							
										if(that.data("hasDropDownList.tmButton") != true){	
											that
											.data("event.tmButton",setting.click)
											.unbind('click.tmButton')
											.bind('click.tmButton',that.data("event.tmButton"));
											// bind space and return to same event as click										
											/*.unbind('keydown.tmButton')
											.bind('keydown.tmButton',function (e) {
												if (e.which === 13 || e.which === 32) {
													//that.data("event.tmButton")(e);
												}
											});*/
										}									
									}else{
										that
										.removeData("event.tmButton")
										.unbind('click.tmButton')
									}
								}
								function _mouseEnter(){
									if(!that.is("."+that.data("mode.tmButton")+'_disabled')){
										that
										.addClass(that.data("mode.tmButton")+'_hover')
										.find('span:not(.button_has_child)')
										.addClass(that.data("mode.tmButton")+'_hover');
										if(setting.image != null){
											_image.attr('src', setting.image.hover);
										}
									}
								}
								function _mouseleave(){
									if(!that.is("."+that.data("mode.tmButton")+'_disabled')){
										that
										.removeClass(that.data("mode.tmButton")+'_hover')
										.find('span:not(.button_has_child)')
										.removeClass(that.data("mode.tmButton")+'_hover');	
										that
										.removeClass(that.data("mode.tmButton")+'_actived')
										.find('span:not(.button_has_child)')
										.removeClass(that.data("mode.tmButton")+'_actived');
										if(setting.image != null){
											_image.attr('src', setting.image.src);
										}
									}
								}
								function _mouseDown(){
									if(!that.is("."+that.data("mode.tmButton")+'_disabled')){
										if(that.data("hasDropDownList.tmButton") == true && that.data("dropDownBy.tmButton") == 'hover'){
											return false;
										}
										that
										.addClass(that.data("mode.tmButton")+'_actived')
										.find('span:not(.button_has_child)')
										.addClass(that.data("mode.tmButton")+'_actived');
										if(that.data("has_image.tmButton") == true){
											_image.attr('src', that.data("activedImage.tmButton"));
										}
									}
								}
								function _mouseUp(){
									if(!that.is("."+that.data("mode.tmButton")+'_disabled')){
										if(that.data("hasDropDownList.tmButton") == true && that.data("dropDownBy.tmButton") == 'hover'){
											return false;
										}
										that
										.removeClass(that.data("mode.tmButton")+'_actived')
										.find('span:not(.button_has_child)')
										.removeClass(that.data("mode.tmButton")+'_actived');	
										if(that.data("has_image.tmButton") == true){										
											_image.attr('src', that.data("hoveredImage.tmButton"));
										}
									}
								}
								function _disabledButton(){
									if(setting.disabled){
										that
										.data("status.tmButton", "disabled")
										.data("disabled.tmButton",true)
										.removeClass(that.data("mode.tmButton")+'_hover')
										.addClass(that.data("mode.tmButton")+'_disabled')
										.unbind("click.tmButton",that.data("event.tmButton"))
										.children()
										.addClass(that.data("mode.tmButton")+'_disabled');
										if(that.data("has_image.tmButton") == true){
											that											
											.find('img')
											.attr('src',that.data("disabledImage.tmButton"));
										}
										if(that.data("hasDropDownList.tmButton") == true){
											that
											.tmDropDownList(
												{
													disabled: true
												}
											)
										}
									}else{
										that
										.data("status.tmButton", "enabled")
										.data("disabled.tmButton",false)
										.unbind('click.tmButton',that.data("event.tmButton"))	
										.removeClass(that.data("mode.tmButton")+'_disabled')
										.children()
										.removeClass(that.data("mode.tmButton")+'_disabled');
										if(that.data("event.tmButton")){
											that.bind('click.tmButton',that.data("event.tmButton"))
										}
										if(that.data("hasDropDownList.tmButton") == true){
											that
											.tmDropDownList(
												{
													disabled: false
												}
											)
										}
									}
								}		
								function _focusedButton(){
									if(that.is('a')){
										that
										.unbind('focus.tmButton blur.tmButton')
										.bind({
											'focus.tmButton': function(){						
												if(that.data("disabled.tmButton") != true){
													that.addClass(that.data("mode.tmButton")+"_focused").data("status.tmButton", "focused");
												}else{
													console.log("This button can't be focused because it has been disabled!");
												}
											},
											'blur.tmButton': function(){
												if(that.data("focused.tmButton") == true){}else{
													that.removeClass(that.data("mode.tmButton")+"_focused");
													if(that.data("disabled.tmButton") == true){
														that.data("status.tmButton", "disabled");
													}else{
														that.data("status.tmButton", "enabled");
													}
												}
											}
										});															
									}else{							
										console.log('Only anchor tag can be seted as focused attribute!');
									}								
								}
							    function _emptyHandler(){
									return false;
								}
								function _toggleEventHandler(on_handler, off_handler){
									that
										.data("on.tmButton", on_handler)
										.data("off.tmButton", off_handler);
									var toggle_button_sensor= that.data("toggleButtonSensor.tmButton");
									var toggle_button_container= that.data("toggleButtonContainer.tmButton");							
									$('.left_sensor, .right_sensor', that).unbind('click.tmButton').bind('click.tmButton',
										function(e){											
											if(setting.disabled){
												return;
											}											
											if($(this).is('.right_sensor')){
												if(that.data("toggleStatus.tmButton") == "off"){
													return false;
												}												
												that.data("toggleStatus.tmButton", "off")
												toggle_button_sensor.animate(
													{'left':31},
													{queue:false, duration:300, complete: off_handler}
												).addClass('off');
											}else{
												if(that.data("toggleStatus.tmButton") == "on"){
													return false;
												}
												that.data("toggleStatus.tmButton", "on")
												toggle_button_sensor.animate(
													{'left':0},
													{queue:false, duration:300, complete: on_handler}
												).removeClass('off');
											}
										}
									);
									toggle_button_sensor.draggable({
										containment: 'parent',
										drag: function(event, ui) {
											if(ui.position.left > toggle_button_container.width()/4){
												toggle_button_sensor.addClass('off');
											}else{
												toggle_button_sensor.removeClass('off');
											}
										},
										stop: function(event, ui) {
											var positionX= 0;
											var handler= _emptyHandler;
											if(ui.position.left > toggle_button_container.width()/4){
												positionX= 31;
												if(that.data("toggleStatus.tmButton") != "off"){
													handler= off_handler;
													that.data("toggleStatus.tmButton", "off");
												}
											}else{
												if(that.data("toggleStatus.tmButton") != "on"){
													handler= on_handler;
													that.data("toggleStatus.tmButton", "on");
												}
											}
											toggle_button_sensor.animate({'left': positionX},{queue:false, duration:300, complete: handler});
										}
									});
									if(setting.disabled == false){
										toggle_button_sensor.draggable({
											disabled: false
										});
									}else{
										toggle_button_sensor.draggable({
											disabled: true
										});
									}
								}							   
								function setDropDownList(_dropdownlist,_container){
									if(that.data("hasDropDownList.tmButton") != true){
										var _btnHasChild= $('<span class="button_has_child tab btn"></span>').appendTo(_container.addClass('tab'));													
										that										
										.data("btnHasChild.tmButton", _btnHasChild)
										.data("hasDropDownList.tmButton", true)
										.addClass('tab');
									}
									that.tmDropDownList(_dropdownlist);
									if(_dropdownlist.displayBy == 'click'){
										that.data("dropDownBy.tmButton", 'click').removeClass('dropDownByHover');
									}else{
										that.data("dropDownBy.tmButton", 'hover').addClass('dropDownByHover');
									}
								}
								if(that.data("initTmButton.tmButton") == true){									
									var button_content= that.find('span.button_content');
									if(setting && setting.mode && setting.mode != that.data("mode.tmButton")){
										var orgSetting= that.data("setting.tmButton");
										orgSetting.mode= that.data("mode.tmButton");
										that.data("setting.tmButton", orgSetting);								
										console.log('Can not change the button mode after initialized!');
										return false;
									}
									if(that.data("mode.tmButton")=='toggle'){
										if(setting.disabled == true){
											that.addClass("disabled");
										}else{
											that.removeClass("disabled");
										}
										_toggleEventHandler(setting.on, setting.off);										
									}else{
										_setImage(button_content);
										that
										.unbind('mouseenter.tmButton')
										.unbind('mouseleave.tmButton')
										.unbind('mousedown.tmButton')
										.unbind('mouseup.tmButton')
										.bind({
											"mouseenter.tmButton": _mouseEnter,
											"mouseleave.tmButton": _mouseleave,
											"mousedown.tmButton": _mouseDown,
											"mouseup.tmButton": _mouseUp
										});
										if(button_content.is('.btn_name')){
											_setButtonName(button_content);
										}else if(button_content.find('.btn_name').length>0){
											_setButtonName($('.btn_name',button_content));
										}										
										if(setting.tmpopup) {
											if(that.data("hasPopup.tmButton") == true){
												
											}else{		
												if($.ui.tmPopup){
													that.data("hasPopup.tmButton",true).tmPopup(setting.tmpopup);
												}
											}											
										}else if(setting.tmdropdownlist){											
											if(setting.tmdropdownlist.children !== null && setting.tmdropdownlist.children !== undefined){
												if(setting.tmdropdownlist.children.length == 0){
													if(that.data("hasDropDownList.tmButton") == true){
														that.removeClass("tab").data('btnHasChild.tmButton').remove();
														that.removeData("btnHasChild.tmButton");
														that.data('button_content.tmButton').removeClass('tab');
													}
												}
												setDropDownList(setting.tmdropdownlist,button_content);
											}else{
												if(that.data("hasDropDownList.tmButton") == true){
													_clearDropDownList(that);
												}	
											}
										}else{
											if(that.data("hasDropDownList.tmButton") == true){
												_clearDropDownList(that);
											}
											that
											.data("hasPopup.tmButton",false)
											.unbind('click.tmButton');											
											_clickEventHandler();
										}
                                        _adjustPosition();
										_disabledButton();
										_focusedButton();								
										if(setting.focused){
											that.data("focused.tmButton", true).trigger('focus');
										}else{
											that.data("focused.tmButton", false).trigger('blur');
										}
									}
								}else{
									that.addClass(setting.mode).data("mode.tmButton",setting.mode);
									var ahref= that.attr('href');
									if(ahref){
										if(ahref.indexOf("javascript") == -1){
											that.data("href.tmButton", ahref);
											ahref= "javascript: document.location.href='"+ ahref+"';";
											that.attr('href', ahref);
										}
									}else{
										that.attr('href', 'javascript:;');
									}
									if(that.data("mode.tmButton") == "toggle"){
										that.removeAttr('href');
										var _toggle_title= setting.name?setting.name:that.attr('id');										
										var toggleButtonTitle, switchOn, switchOff, toggleButtonContainer, leftSensor, rightSensor, toggleButtonSensor
										that
											.data("toggleStatus.tmButton", "on")
											.addClass('tm_button button_toggle')
											.append((toggleButtonTitle= $('<span class="toggle_button_title">'+_toggle_title+':</span>')))
											.append((switchOn= $('<span class="left_sensor switch_on">ON</span>')))
											.append(
												(
													toggleButtonContainer= $('<span class="toggle_button_container button_content"></span>')
													    .append((leftSensor= $('<span class="left_sensor"></span>')))
														.append((rightSensor= $('<span class="right_sensor"></span>')))
														.append((toggleButtonSensor= $('<span class="toggle_button_sensor"></span>')))
												)
											)
											.append((switchOff= $('<span class="right_sensor switch_off">OFF</span>')))
											.data("toggleButtonTitle.tmButton", toggleButtonTitle)
											.data("toggleButtonContainer.tmButton", toggleButtonContainer)
											.data("toggleButtonSensor.tmButton", toggleButtonSensor);
										if(setting.disabled == true){
											that.addClass("disabled");
										}else{
											that.removeClass("disabled");
										}
										_toggleEventHandler(setting.on, setting.off);
									}else{
										var _button_content= $('<span class="button_content btn"></span>');
										/**
										  * attribute @image;
										  */										
										_setImage(_button_content);										
										that
										.addClass('tm_button btn')
										.data('button_content.tmButton', _button_content)
										.append(_button_content)
										.unbind('.tmButton')
										.bind(
											{
												"mouseenter.tmButton": _mouseEnter,
												"mouseleave.tmButton": _mouseleave,
												"mousedown.tmButton": _mouseDown,
												"mouseup.tmButton": _mouseUp
											}
										);										
										/**
										  * attribute @name;
										  */
										if(_button_content.is('.btn_name')){
											_setButtonName(_button_content);
										}else{										
											var buttonLabel= _button_content.find('.btn_name');
											if(buttonLabel.length>0)									
												_setButtonName(buttonLabel);
										}
										/**
										  * attribute @tmpopup;
										  */
										if(setting.tmpopup) {
											if($.ui.tmPopup){
												that.data("hasPopup.tmButton",true).tmPopup(setting.tmpopup);
											}
										}else if(setting.tmdropdownlist){
											if(setting.tmdropdownlist.children !== null && setting.tmdropdownlist.children !== undefined){
												if(setting.tmdropdownlist.children.length > 0){
													setDropDownList(setting.tmdropdownlist,_button_content);
												}
											}
										}else{
											that.data("hasDropDownList.tmButton",false);
											that.data("hasPopup.tmButton",false);
											_clickEventHandler();
										}
										_adjustPosition();
										_disabledButton();
										_focusedButton();
										if(setting.focused){
											that.data("focused.tmButton", true).trigger('focus');
										}else{
											that.data("focused.tmButton", false).trigger('blur');
										}
									}
									that.data("initTmButton.tmButton", true);
								}
							}  
						);
					}
				}
			}
		);
	}
)(jQuery);
