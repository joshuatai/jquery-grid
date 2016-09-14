// JavaScript Document
(
	function ($) {
		// Function to get the Max value in Array
		Array.prototype.max = function(){
		return Math.max.apply( Math, this );
		};
		// Function to get the Min value in Array
		Array.prototype.min = function(){
		return Math.min.apply( Math, this );
		};
		$.extend($.fn,
			{
				maxZIndex: function(opt){
					 var def = { inc: 2, group: ".drop_down_menu" };
					 var zmax = 0;
					 $(def.group).each(function() {
						var cur = parseInt($(this).css('z-index'));						
						zmax = cur > zmax ? cur : zmax;
					 });					 
					 if (!this.jquery)
						return zmax;
						
					return this.each(function() {
						zmax += def.inc;
						$(this).css("z-index", zmax);
					});
				}
			}
		);
	}
)(jQuery);
(
	function ($) {		
		var defaultSetting={
			children: null,
			disabled: false,
			displayBy: 'hover'
		}
		var paddingTotal= 0;
		$.extend($.fn,
			{
				tmDropDownList : function (set, attribute, newVal) {
					if(typeof(set) == 'string'){
						if(set == 'destroy'){
							return this.each(
								function(){
									var _target= $(this);
									_target
										.removeClass("tmDropDownList")
										.removeClass("relative")
										.removeClass("absolute")
										.removeData("setting.tmDropDownList")
										.removeData("hasList.tmDropDownList")
										.removeData("hasShowHideEvent.tmDropDownList")
										.removeData("click_event.tmDropDownList")
										.removeData("setDropWidth.tmDropDownList")
										.data("dropDownLists.tmDropDownList").remove();							
									_target
										.removeData("dropDownLists.tmDropDownList")
										.data("dropDownList.tmDropDownList").remove();
									_target
										.removeData("dropDownList.tmDropDownList")
										.unbind('.tmDropDownList');
										
									if(_target.attr("className") == ""){
										_target.removeAttr("class");
									}
								}
							);
						}else if(set == 'option'){
							var that= this, returnValue;
							attribute= attribute.toLowerCase();	
							switch(attribute){
								case 'data':
									return that.data("setting.tmDropDownList");
								break;
							}
						}
					}else if(typeof(set) == 'object'){						
						return this.each(
							function(){
								var _target= $(this);
								var _setting= _target.data("setting.tmDropDownList");								
								if(_setting == undefined){								
									_target.removeData("hasList.tmDropDownList");
									_target.removeData("hasShowHideEvent.tmDropDownList");
									_target.data("setting.tmDropDownList", $.extend(defaultSetting, set));
								}else{									
									if(set.children !== undefined){
										if(_target.data("hasList.tmDropDownList") == true){
											_target.tmDropDownList("destroy");
										}
										_target.data("hasList.tmDropDownList", false);
									}									
									_setting= $.extend(_setting,set);							
									_target.data("setting.tmDropDownList", _setting);
								}
								var setting= _target.data("setting.tmDropDownList");							
								function _addDropDownMenu(lists,target){
									var _drop_down_menu= $('<ol class="drop_down_menu"></ol>');
									$(lists).each(
										function(index,li){
											if(li.title!='' && li.status == 'show'){
												var _new_drop_down_list=$('<li></li>')
												.html('<span>'+li.title+'</span>')
												.appendTo(_drop_down_menu);	
												if(li.url != null){
													_new_drop_down_list.bind('click.tmDropDownList',
														function(){												
															document.location.href= li.url;
															return false;
														}						 
													);
												}
												for(i in li){
													if(li.hasOwnProperty(i)){
														switch(i){
															case "click":case "children":case "url":
															break;
															default:
																_new_drop_down_list.attr(i, li[i]);
															break;
														}
													}												
												}											
												if(li.click) {
													target.data('click_event.tmDropDownList',li.click);									
													_new_drop_down_list.bind('click.tmDropDownList',target.data('click_event.tmDropDownList'));											
												}									
												if(li.children && li.children.length>0){
													_new_drop_down_list.addClass('have_child').find('span:eq(0)').addClass('category');
													if(lists.length-1 == index){
														_new_drop_down_list.addClass('last_list');
													}
													_add_sub_list(li.children,_new_drop_down_list);
												}else{
													_new_drop_down_list.hover(
														function(e){
															_drop_down_menu.find('li').removeClass('list_hover');
															$(this).addClass('list_hover');
														},
														function(e){
															$(this).removeClass('list_hover');
														}
													)									
												}	
											}
										}
									);
									var lists= _drop_down_menu.find('li').not(".have_child");
									if(lists.length > 0){
										paddingTotal= parseInt(lists.eq(0).css('paddingLeft'),10)*2;
										target.addClass("tmDropDownList").data("dropDownList.tmDropDownList",_drop_down_menu).data("dropDownLists.tmDropDownList", lists).append(_drop_down_menu);
										if(target.css("position") == 'absolute'){
											target.addClass("absolute")
										}else{
											target.addClass("relative")
										}
									}
									var _list_tmp= target.find('li');
									_list_tmp.eq(_list_tmp.length-1).addClass('radius');
									target.data("hasList.tmDropDownList", true);
								}
								function _add_sub_list(lists,target){
									var _new_sub_list_container= $('<ol class="sub_list"></ol>');
									$(lists).each(
										function(index, li) {
											if(li.title!='' && li.status == 'show'){
												var _new_sub_list= $('<li></li>').html('<span>'+li.title+'</span>').appendTo(_new_sub_list_container);
												if(li.url != null){
													_new_sub_list.bind('click.tmDropDownList',
														function(){												
															document.location.href= li.url;
															return false;
														}						 
													);	
												}
												for(i in li){
													if(li.hasOwnProperty(i)){
														switch(i){
															case "click":case "children":case "url":
															break;
															default:
																_new_sub_list.attr(i, li[i]);
															break;
														}
													}												
												}											
												if(li.click) {								
													target.data('click_event.tmDropDownList',li.click);									
													_new_sub_list.bind('click.tmDropDownList',target.data('click_event.tmDropDownList'));											
												}
												if(li.children && li.children.length>0){
													_new_sub_list.addClass('have_list').find('span').addClass('category').end().toggle(
														function(){												
															$(this).addClass('cate_selected').find('ol.sub_list').slideDown();											
														},
														function(){
															$(this).removeClass('cate_selected').find('ol.sub_list').slideUp();
														}
													);
													_add_sub_sub_list(li.children,_new_sub_list);
												}else{
													_new_sub_list
													.hover(
														function(e){
															_new_sub_list_container.find('li').removeClass('list_hover');
															$(this).addClass('list_hover');
														},
														function(e){
															$(this).removeClass('list_hover');
														}
													)
												}
											}
										}
									);
									_new_sub_list_container.find('li').length > 0? target.append(_new_sub_list_container): '';
								}
								function _add_sub_sub_list(lists,target){
									var _new_sub_sub_list_container= $('<ol class="sub_list"></ol>').hide();
									$(lists).each(
										function(index, li) {
											if(li.title!='' && li.status == 'show'){
												var _new_sub_sub_list= $('<li></li>').html('<span>'+li.title+'</span>').appendTo(_new_sub_sub_list_container);
												for(i in li){
													if(li.hasOwnProperty(i)){
														switch(i){
															case "click":case "children":case "url":
															break;
															default:
																_new_sub_sub_list.attr(i, li[i]);
															break;
														}
													}												
												}	
												if(li.url != null){
													_new_sub_sub_list.bind('click.tmDropDownList',
														function(){												
															document.location.href= li.url;
															return false;
														}						 
													);	
													_new_sub_sub_list
													.hover(
														function(e){
															_new_sub_sub_list_container.find('li').removeClass('list_hover');
															$(this).addClass('list_hover');
														},
														function(e){
															$(this).removeClass('list_hover');
														}
													)
												}
											}
										}
									);
									_new_sub_sub_list_container.find('li').length > 0? target.append(_new_sub_sub_list_container): '';
								}				
								function show(e){									
									var _drop_down_menu= _target.find('.drop_down_menu');			
									if($(e.target).is('.list_container') || $(e.target).is('.tab_link') || $(e.target).is('.tab') || $(e.target).is('.btn') || $(e.target).is('.tmDropDownList')){										
										if(_target.data("setDropWidth.tmDropDownList") == false){											
											_drop_down_menu.css({'display':'block','visibility':'hidden'})
											.maxZIndex();
											var _widthArr= new Array();
											_drop_down_menu.find("li > span").each(
												function(index,span){
													_widthArr.push(($(span).width() + paddingTotal));
												}
											);											
											if(_target.width() < _widthArr.max()){
												_drop_down_menu.css({'width': _widthArr.max(),'position':'absolute','display':'none', 'visibility':'visible'});
											}else{												
												_drop_down_menu.css({'width': _target.width(),'position':'absolute','display':'none', 'visibility':'visible'});
											}
											_target.data("setDropWidth.tmDropDownList",true);
										}
										_drop_down_menu					
										.fadeOut('fast')									
										.css({'filter':'progid:DXImageTransform.Microsoft.Gradient(startColorStr="#FFFFFF", endColorStr="#dddddd", gradientType="0")','z-index':500})
										.slideDown(300,function(){
											$(this)
											.css({'filter':'progid:DXImageTransform.Microsoft.Gradient(startColorStr="#FFFFFF", endColorStr="#dddddd", gradientType="0")','z-index':500});
										});
									}else{
										_target.removeClass('hover').find('a:eq(0)').removeClass('hover').end().find('.drop_down_menu').fadeOut(100);
									}
								}
								function hide(e){
									_target.removeClass('hover').find('a:eq(0)').removeClass('hover').end().find('.drop_down_menu').fadeOut(100);
								}
								function disableHide(e){
									hide(e);
									_target
									.unbind("mouseleave.tmDropDownList")
									.unbind('click.tmDropDownList')
									.bind('click.tmDropDownList',setShowHandler);								 
								}
								function setShowHandler(e){
									show(e);
									_target
									.unbind("mouseleave.tmDropDownList")
									.bind("mouseleave.tmDropDownList",disableHide)
									.unbind('click.tmDropDownList');								
								}
								function assignEvent(){									
									if(_target.data("hasShowHideEvent.tmDropDownList") == true){
										return;
									}			
									_target
										.removeClass('disabled')
										.unbind('click.tmDropDownList')
										.unbind("mouseenter.tmDropDownList")
										.unbind("mouseleave.tmDropDownList");
									if(setting.displayBy == 'click'){
										_target.bind('click.tmDropDownList',setShowHandler);
									}else{
										_target
											.bind("mouseenter.tmDropDownList",show)
											.bind("mouseleave.tmDropDownList",hide);
									}
									_target.data("hasShowHideEvent.tmDropDownList", true);
								}
								function removeEvent(){
									_target
									.addClass('disabled')
									.unbind('click.tmDropDownList')
									.unbind("mouseenter.tmDropDownList")
									.unbind("mouseleave.tmDropDownList")
									_target.data("hasShowHideEvent.tmDropDownList", false);					
								}
								if(setting){									
									if(setting.children && setting.children.length > 0){
										if(_target.data("hasList.tmDropDownList") != true){
											_target.data("setDropWidth.tmDropDownList",false);
											_addDropDownMenu(setting.children,_target);
										}
									}
									if(setting.disabled == false){
										assignEvent();
									}else{
										removeEvent();
									}
								}
							}
						);
					}
								
				}
			}
		);
	}
)(jQuery);
