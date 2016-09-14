/*
 * UI Trend Micro Grid 1.0
 *
 * Copyright 2011,
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */ 
(function( $, undefined ) {
	var custmizedTime= new Date();
	var EtText= custmizedTime.getFullYear() + '/' + (custmizedTime.getMonth() + 1) + '/' + custmizedTime.getDate() + ' ' + custmizedTime.getHours() + ':' + custmizedTime.getMinutes();
	custmizedTime.setTime(custmizedTime.getTime() - 86400000);
	var StText= custmizedTime.getFullYear() + '/' + (custmizedTime.getMonth() + 1) + '/' + custmizedTime.getDate() + ' ' + custmizedTime.getHours() + ':' + custmizedTime.getMinutes();
	var time= StText+'-'+EtText;
	$.widget("ui.tmGrid", {
		/*Default Options Start*/		
		"columnOptions": {
			'index': null,
			'filter': null,
            'textAlign': 'left',
			'name': null,		
			'renderer': null,			
			'sortable': false,
			'sortIndex': null,
            'tooltip': 'auto',
			'width': null,
            "sizeColumn": null,
            "titleColumn": null,
            "dataColumns": null
		},
		"actionItemOptions": {
			'name': 'Action Item',
			'className': '',
			'click': null,
			'tmPopup': null,
			'disabled': false			
		},
		"lang": {
			'de': 'de_DE.UTF-8',
			'de-at': 'de_DE.UTF-8', //German (Austria)
			'de-de': 'de_DE.UTF-8', //German (Austria)
			'de-li': 'de_DE.UTF-8', //German (Liechtenstein)
			'de-lu': 'de_DE.UTF-8', //German (Luxembourg)
			'de-ch': 'de_DE.UTF-8', //German (Switzerland)
			'en': 'en_US.UTF-8',
			'en-au': 'en_US.UTF-8', //English (Australia)
			'en-bz': 'en_US.UTF-8', //English (Belize)
			'en-ca': 'en_US.UTF-8', //English (Canada)
			'en-ie': 'en_US.UTF-8', //English (Ireland)
			'en-jm': 'en_US.UTF-8', //English (Jamaica)
			'en-nz': 'en_US.UTF-8', //English (New Zealand)
			'en-ph': 'en_US.UTF-8', //English (Philippines)
			'en-za': 'en_US.UTF-8', //English (South Africa)
			'en-tt': 'en_US.UTF-8', //English (Trinidad)
			'en-gb': 'en_US.UTF-8', //English (United Kingdom)
			'en-us': 'en_US.UTF-8', //English (United States)
			'en-zw': 'en_US.UTF-8', //English (Zimbabwe)
			'es': 'es_ES.UTF-8',
			'es-ar': 'es_ES.UTF-8', //Spanish (Argentina)
			'es-bo': 'es_ES.UTF-8', //Spanish (Bolivia)
			'es-cl': 'es_ES.UTF-8', //Spanish (Chile)
			'es-co': 'es_ES.UTF-8', //Spanish (Colombia)
			'es-cr': 'es_ES.UTF-8', //Spanish (Costa Rica)
			'es-do': 'es_ES.UTF-8', //Spanish (Dominican Republic)
			'es-ec': 'es_ES.UTF-8', //Spanish (Ecuador)
			'es-sv': 'es_ES.UTF-8', //Spanish (El Salvador)
			'es-gt': 'es_ES.UTF-8', //Spanish (Guatemala)
			'es-hn': 'es_ES.UTF-8', //Spanish (Honduras)
			'es-mx': 'es_ES.UTF-8', //Spanish (Mexico)
			'es-ni': 'es_ES.UTF-8', //Spanish (Nicaragua)
			'es-pa': 'es_ES.UTF-8', //Spanish (Panama)
			'es-py': 'es_ES.UTF-8', //Spanish (Paraguay)
			'es-pe': 'es_ES.UTF-8', //Spanish (Peru)
			'es-pr': 'es_ES.UTF-8', //Spanish (Puerto Rico)
			'es-us': 'es_ES.UTF-8', //Spanish (United States)
			'es-uy': 'es_ES.UTF-8', //Spanish (Uruguay)
			'es-ve': 'es_ES.UTF-8', //Spanish (Venezuela)
			'fr': 'fr_FR.UTF-8',
			'fr-be': 'fr_FR.UTF-8', //French (Belqium)
			'fr-ca': 'fr_FR.UTF-8', //French (Canada)
			'fr-fr': 'fr_FR.UTF-8', //French (France)
			'fr-lu': 'fr_FR.UTF-8', //French (Luxembourg)
			'fr-mc': 'fr_FR.UTF-8', //French (Monaco)
			'fr-ch': 'fr_FR.UTF-8', //French (Switzerland)
			'fr-nl': 'fr_FR.UTF-8', //French (Netherlands)
			'ja': 'ja_JP.UTF-8',
			'ja-jp': 'ja_JP.UTF-8', //Japanese
			'ko': 'jo_KR.UTF-8',
			'ko-kr': 'jo_KR.UTF-8', //Korean
			'ru': 'ru_RU.UTF-8',
			'ru-ru': 'ru_RU.UTF-8', //Russian
			'ru-md': 'ru_RU.UTF-8', //Russian (Moldova)
			'zh': 'zh_TW.UTF-8',
			'zh-sg': 'zh_TW.UTF-8',
			'zh-cn': 'zh_CN.UTF-8', //Chinese (China)
			'zh-hk': 'zh_TW.UTF-8', //Chinese (Hong Kong SAR)
			'zh-tw': 'zh_TW.UTF-8' //Chinese (Taiwan)
		},
		"options": {
			'actionItems': null,
			'columns': null,            
			'complete': null,
			'data': "",
			'dataProvider': null,
			'dataReady': false,
      'disabled': false,
      'draggable': true,
			'fakePagination': false,
			'filter': null,
			'format': 'json',
			'isMulti': true,
			'lang': 'en',
			'limit': 20,
			'limits': [10, 20, 30],
			'noValueSubstitute': "",
			'page': 0,
			'pagination': true,
			'pageChange': null,
			'resizable': true,
			'rowEnter': null,
			'rowLeave': null,
			'rowSelect': null,
			'rowUnselect': null,
			'search': null,
			'searchable': true,
			'searchRule': null,
			'searchTip': 'Search',
			'select': null,
			'selectable': true,
			'showColumnTitle': true,
			'sort': null,
			'sortable': true,
			'sortBy': null,
			'sortRule': null,
			'sortType': null,
			'timeRange': [
				{ 'name': 'Last 4 Hours', 'type': 'option', 'value': -14400},
				{ 'name': 'Last 24 Hours', 'type': 'option', 'value': -86400, 'selected': true},
				{ 'name': 'Last 7 Days', 'type': 'option', 'value': -604800 },
				{ 'name': 'Last 30 Days', 'type': 'option', 'value': -2592000 },
				{ 'name': 'Last 90 Days', 'type': 'option', 'value': -7776000 },
				{ 'name': 'Customized range', 'type': 'customized', 'value':  time }
			],
			'timeRangeChange': null,
            'timeRangeChanged': null,
			'timeRangeHandler': 'handler/timestamp/timestamp.php',
			'timeRangable': false,
			'tr': null,
			'total': 0,
			'totalPage': 0,
			'type': 'get',
			'url': '',
			'valueIndex': null
		},
		/*Default Options End*/
		/*Private Method Start*/
		"_create": function() {
			var self = this;
			self.model= {};
			self.view= {
                "window": $(window),
                "body": $("body"),           
                "grid": self.element
            };
			self.control= {};
			$.ui.tmGrid.prototype.count++;
			//check browser
			if ($.browser.mozilla == true) {
				self.view.body.addClass("mozilla moz_" +  Number($.browser.version));
			} else if ($.browser.msie == true) {
				self.view.body.addClass("msie");                
                self.view.body.addClass("ie" + Number($.browser.version));
			} else if ($.browser.webkit == true) {
                self.view.body.addClass("webkit");
                $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());                
                if($.browser.chrome == true) {
                    self.view.body.addClass("chrome");
                } else {
                    self.view.body.addClass("safari");
                }
            } else if ($.browser.opera == true) {
                self.view.body.addClass("opera");
            }
			//initial Model level		
			if (!self._modelInitial()) {
				return false;
			}
			//initial View level
			self._viewInitial();
			//initial Control level	
			self._controlInitial();
		},
		"_init": function() {			
			//define variable;		
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, sortName, sortType, limit, page, currentStart, currentEnd, currentPage, currentData;
			//set search;
			if (!model.onSearch) {
				if (model.hasSearch) {
					var keyword= $.cookie(model.id+"_keyword");					
                    if (keyword) {
                        view.searchBox
                            .addClass('readyToSearch')
                            .val(keyword)
                            .trigger('keydown.tmGrid', [true]);
                            return;
                    }
				}
			}
			//set sort;
			if (!model.onSort) {
				if (model.hasSort) {
					sortName= $.cookie(model.id+ "_sortName");
					sortType= $.cookie(model.id+ "_sortType");		
					if (sortName && sortType) {
						self._modelSortByCreate(sortName, sortType);
						model.onSort= true;
						var name= model.sortBy[model.sortBy.length-1].sortName;
						var type= model.sortBy[model.sortBy.length-1].sortType;
						view.columns.filter('[sortname="'+name+'"]').addClass('onSort').addClass('sort_'+type);		
						if (model.sourceType == 'local') {
							$(model.sortBy).each(
								function(index, item) {
									model.sortType= item.sortType;
									model.sortName= item.sortName;
									self._modelSortClient(model.sortName);
								}
							);							
						}
					}else{
						self._modelSortSetCookie(null);
						model.onSort= false;
					}
				}
			}
			//set time range
			if (!model.onTimeRange) {
				if (model.hasTimeRange && model.sourceType != 'local') {					
					if (model.tr) {
						options.dataReady= false;
						model.onTimeRange= true;
						self._init();
					}else{
						setTimeout(
							function() {
								self._init();
							},
							1000
						);
					}
					return;
				}
			}
			
			if (options.dataReady) {				
				view.grid.trigger('onQueryComplete');                
				if (model.hasPagination) {
					//prepare page info;
					model.limit= parseInt(model.limit, 10);
					model.page= parseInt(model.page, 10);
					options.totalPage= Math.ceil(options.total/model.limit);
					if (options.totalPage == 0) {
						currentStart= 0;
						currentEnd= 0;
						currentPage= 0;
					}else{
						if (model.page > options.totalPage-1) {
							model.page= 0;
							$.cookie(model.id+"_page", 0);
						}
						currentStart= (model.page*model.limit)+1;
						currentEnd= currentStart+model.limit-1;						
						if (currentEnd > options.total) currentEnd= options.total;
						currentPage= model.page + 1;
					}
					//prepare content data;
					if (model.sourceType == 'server' && options.fakePagination == false) {		
						if (model.tmpData.length > model.limit) {
							model.tmpData= model.tmpData.slice(0, model.limit);
						}
						currentData= model.tmpData;
					}else{						
						currentData= model.tmpData.slice(currentStart-1, currentEnd);
					}					
					//set pagination info;
					control._enablePagination();
					view.startCont.text(currentStart);
					view.endCount.text(currentEnd);
					view.totalCount.text(options.total);
					view.currentPager.val(currentPage);
					view.totalPage.text(options.totalPage);
					view.perPage.val(model.limit);
                    //set pagination status;
					control._setPagiStatus();
					//set row data;
					self._viewRowCreation(currentData);
				}else{
					if (model.tmpData && model.tmpData.length == 0) {
                        control._showMessage('info', 'Data not found.', true);						
					}
					//set row data;
					self._viewRowCreation(model.tmpData);
				}
				//set row selection;				
				if (model.hasSelection == true) {
					self._controlSelectifyEnabled();
				}else{
					self._controlSelectifyDisabled();
				}     
                //console.log("columns data loaded");
                self._viewGridResize();
                view.grid.trigger('complete.tmGrid',[$.grep(model.tmpData, function(n){ return (n); })]);
			}else{				
				var ajaxParam= {}, urlSplit= model.url.split('?');
				ajaxParam.data= "";				
				if (model.getDataRequest) {
					model.getDataRequest.abort();
				}
				//check url param;			
				if (urlSplit.length == 2) ajaxParam.data+= urlSplit[1];	
				if (options.data) {                    
					if (ajaxParam.data) {
						ajaxParam.data+= ('&'+options.data);
					}else{
						ajaxParam.data+= options.data;
					}
				}
				if (model.hasPagination && options.fakePagination == false) {
					if (ajaxParam.data) {
						ajaxParam.data+= "&limit="+model.limit+"&page="+model.page;
					}else{
						ajaxParam.data+= "limit="+model.limit+"&page="+model.page;
					}
				}		
				//check sort
				var sortName= [], sortType= [];			
				if (model.onSort) {
					$(model.sortBy).each(
						function(index, item) {
							sortName.push(item.sortName);
							sortType.push(item.sortType);
						}
					);
					if (ajaxParam.data) {
						ajaxParam.data+= "&sortName="+sortName.join(',')+"&sortType="+sortType.join(',');
					}else{
						ajaxParam.data+= "sortName="+sortName.join(',')+"&sortType="+sortType.join(',');
					}
				}
				//check time range	
				if (model.onTimeRange) {
					if (ajaxParam.data) {
						ajaxParam.data+= "&timeRange="+model.tr;
					}else{
						ajaxParam.data+= "timeRange="+model.tr;
					}
				}				
				//check search
				if (model.onSearch) {
                    if(model.keyword != "") {
                        if (ajaxParam.data) {
                            ajaxParam.data+= "&keyword=" + encodeURIComponent(model.keyword);
                        }else{
                            ajaxParam.data+= "keyword=" + encodeURIComponent(model.keyword);
                        }
                    }
				}
				//check filter				
				model.filters= [];
                view.filterSelections.each(
					function(index, item) {
						var currentFilter= $(item);
						if (currentFilter.val() != '') {
							model.filters.push(encodeURIComponent(currentFilter.data('key') + '=' + currentFilter.val()));
						}
					}
				);
				if (model.filters.length > 0) {
					var filterStr= [];	
					ajaxParam.data+= "&filter=" + model.filters.join(',');
					$.cookie(model.id+"_filter", model.filters.join(','));
				}else{
					$.cookie(model.id+"_filter", null);
				}				
				//prepare ajax param;
				ajaxParam.url= urlSplit[0];
				ajaxParam.type= model.type;
				ajaxParam.dataType= 'json';
				ajaxParam.messageBox= view.messageBox;
				ajaxParam.error= function(data) {					
					control._hideProgress();
					view.tbody.children().remove();
					control._createEmptyRow();
					model.orgData= [];
					model.tmpData= [];					
					options.total= 0;
					options.dataReady= true;
				}
				ajaxParam.success= function(data) {
					try{						
                        view.grid.data('data', data);
						model.orgData= data.value.lists;
						model.tmpData= model.orgData.slice();
						options.total= parseInt(data.value.total, 10);						
						options.dataReady= true;
						self._init();
					}catch(e) {
					}
				}			
				view.grid.trigger('onQuery');
				model.getDataRequest= $.tmAJAX(ajaxParam);
			}
		},
		"_controlInitial": function() { //11 ok
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			$.extend(
				control,
				{
                    "_timeout": null,
					"_pageChang": function(evt, self) {
						var target= $(this), options = self.options, model= self.model, view= self.view, control= self.control;			
						if (target.is(".disabled") == false) {							
							if (target.is('.btn_next')) {					
								self._modelPageSet(model.page+1);
							}else if (target.is('.btn_prev')) {
								self._modelPageSet(model.page-1);					
							}else if (target.is('.btn_first')) {
								self._modelPageSet(0);
							}else if (target.is('.btn_last')) {
								self._modelPageSet(options.totalPage-1);
							}else if (target.is('.per_page select')) {
								model.limit= target.val();
								$.cookie(model.id+ "_limit", target.val());
								self._modelPageSet(0);
							}else if (target.is('.pager_current_page')) {
								if (target.val() > options.totalPage) {
									target.val(options.totalPage);
								}
								if (target.val() < 1) {
									target.val(1);
								}					
								self._modelPageSet(target.val()-1);		
							}							
							view.grid.trigger('pageChange.tmGrid', [self]);
							if (model.sourceType == 'server' && options.fakePagination == false) {
								options.dataReady= false;
							}else{
								//view.grid.trigger('onQuery');
							}
							self._init();
						}
						return;
					},
					"_pageValidate": function(evt) {
						var target= $(this).unbind("input.tmGrid"), inputText= target.val();						
						if (isNaN(inputText) || (inputText.length > 0 && inputText <= 0)) {
							target.data('count') == undefined? target.data('count', 1) : "";
							target.val(target.data('count'));
						}else{							
							target.val(inputText.trim()).data('count', target.val());
						}			
						target.bind("input.tmGrid", control._pageValidate);
					},
					"_setPagiStatus": function () {
                        if (options.totalPage > 1) {
                            view.currentPager.attr("disabled", false);
                            if ((model.page + 1) === 1) {
                                view.prevBtn.addClass("disabled");
                                view.firstBtn.addClass("disabled");
                            }else{
                                view.prevBtn.removeClass("disabled");
                                view.firstBtn.removeClass("disabled");
                            }
                            if ((model.page + 1) === options.totalPage) {
                                view.nextBtn.addClass("disabled")
                                view.lastBtn.addClass("disabled");
                            }else{
                                view.nextBtn.removeClass("disabled");
                                view.lastBtn.removeClass("disabled");
                            }	
                        }else {                        
                            if (options.totalPage == 0) {
                                control._showMessage('info', 'Data not found.', true);
                            }	
                            control._disablePagination();
                            view.perPage.attr('disabled', false);
                        }
                    },
                    "_filter": function(evt) {
						var target= $(evt.target);                        
						if (model.sourceType == 'server' && model.hasPagination && options.fakePagination == false) {
							options.dataReady= false;
						}
						self._modelPageSet(0);
						self._init();
					},
					"_search": function(keyword) {                        
						options.dataReady= false;
                        model.onSearch= true;
                        self._modelPageSet(0);
                        if (keyword) {
                            model.keyword= keyword;
                        }else{
                            model.keyword= "";
                        }
						if (model.sourceType == 'server' && options.fakePagination == false) {                            
						}else{
                            view.grid.trigger('onQuery');
							self._modelClientSearch(keyword);
						}
                        view.grid.trigger("search.tmGrid", [keyword]);
                        $.cookie(model.id+"_keyword", keyword);
                        self._init();
					},
					"_sort": function(column) {
						model.sortName= column.attr("sortName")? column.attr("sortName") : column.find('.column_title').text();
						self._modelSortSetInfo();
						model.onSort= true;
						if (model.sourceType == 'server' && model.hasPagination && options.fakePagination == false) {
							options.dataReady= false;
						}else{				
							//view.grid.trigger('onQuery');
							self._modelSortClient(model.sortName);
						}		
						self._modelPageSet(0);						
						self._init();
					},
					"_cleanRow": function() {
						view.tbody.children().remove();
					},
					"_enableTimeRange": function() {	
                        self._utility.enableSelection(view.timeRange.removeClass('disabled'));						         
					},
					"_disableTimeRange": function() {						
                        self._utility.disableSelection(view.timeRange.addClass('disabled'));
					},
					"_showProgress": function() {						
                        var progress = view.progressLayer.add(view.progress),
                            progressHeight,
                            setTop = 0;
                        view.sizeControler.find("th").eq(0).append(progress).addClass('processing');
                        setTimeout(function () {
                            if ( $.browser.mozilla || ($.browser.msie && $.browser.version == '9.0') ) {
                                setTop = view.tbody.position().top;
                            } else {
                                setTop = view.tbody.position().top + 1;
                            }
                            progress
                                .css({
                                    display: 'block',
                                    height: view.tbody.height() - 1,
                                    left: 1,
                                    right: 1,
                                    top: setTop,
                                    opacity: 0
                                })
                                .stop()
                                .animate({opacity: 0.8}, 300);
                        }, 60);
					},
					"_hideProgress": function() {
						var progress = view.progressLayer.add(view.progress), column = view.progress.parent();
                        setTimeout(function () {                           
                            progress.stop().fadeOut(400, function() {
                                progress.remove();
                                column.removeClass('processing');
                            });
                        }, 60);
					},
					"_showMessage": function ( level, msg, closable) {                      
                        var setTop = $.browser.mozilla || ($.browser.msie && $.browser.version == '9.0')? view.headerTitle.position().top + view.headerTitle.height(): view.headerTitle.position().top + 1 + view.headerTitle.height();
                        view.sizeControler.find("th").eq(0).append(view.messageBox.hide());
						view.messageBox
                            .tmmsgbox({
                                "text": msg,
                                "type": level,
                                "close_button": closable
                            })
                            .css('top', setTop)
                            .show();
                    },
                    "_hideMessage": function () {
                        view.messageBox.hide();
                    },
                    "_createEmptyRow": function() {
						var addHeight, removeHeight, rowCount, emptyTr, emptyHeight, th;                        
                        !model.limit? rowCount = options.limits[1] : rowCount = model.limit;
                        if ($.browser.mozilla) {
                            removeHeight= 0;
                            addHeight= 2;
                        }else{
                            removeHeight= 1;
                            addHeight= 1;
                        }
                        th = view.emptyContainer.children().attr('colspan', model.columnsLength).css('height', '');
						if (view.tbody.children().length == 0) {
                            view.emptyContainer.appendTo(view.tbody);                            
						}                     
                        setTimeout(function () {
                            emptyHeight = (rowCount * th.height()) + (rowCount - 1);
                            th.css("height",  emptyHeight);
                        }, 50);                        
					},
					"_enableResize": function () {
                        view.resizeHandlers.removeClass('disabled');
                    },
                    "_disableResize": function () {
                        view.resizeHandlers.addClass('disabled');
                    },
                    "_enableDraggable" : function () {
                        view.columns.removeClass('unDraggable');
                    },
                    "_disableDraggable": function () {
                        view.columns.addClass('unDraggable');
                    },
                    "_enableFilter": function() {						
						view.filterSelections.removeClass('disabled').attr('disabled', false);
					},
					"_disableFilter": function() {						
						view.filterSelections.addClass('disabled').attr('disabled', true);
					},
					"_enablePagination": function() {
						view.currentPager.add(view.perPage).attr("disabled", false);
						view.prevBtn.removeClass("disabled");
						view.nextBtn.removeClass("disabled");
						view.firstBtn.removeClass("disabled");
						view.lastBtn.removeClass("disabled");
					},
					"_disablePagination": function() {
						view.currentPager.add(view.perPage).attr("disabled", true);
						view.prevBtn.addClass("disabled");
						view.nextBtn.addClass("disabled");
						view.firstBtn.addClass("disabled");
						view.lastBtn.addClass("disabled");
					},	
					"_enableSort": function() {						
						view.columns.removeClass("unSortable");
					},
					"_disableSort": function() {						
						view.columns.addClass("unSortable");
					},
					"_enableSelect": function () {
                        $(view.trs).each(function(index, item) {
                            item.checkBox.add(item.tr)
                                .removeClass('disabled')
                                .attr('disabled', false);
                        });
                    },
                    "_disableSelect": function () {
                        $(view.trs).each(function(index, item) {
                            item.checkBox.add(item.tr)
                                .addClass('disabled')
                                .attr('disabled', true);
                        });
                    },
                    "_enableSelectAll": function() {
						view.cbxAll.attr('disabled', false);
					},
					"_disableSelectAll": function() {
						view.cbxAll.attr('disabled', true);
					},
					"_enableSearch": function() {
                        view.searchBox.add(view.searchBoxActionBtn).removeClass('readyToSearch');
                        if (view.searchBox.data("searchedKeyword") == "") {
                             view.searchBox.trigger('blur');
                        } else {
                            view.searchBox.add(view.searchBoxActionBtn).addClass('searched');
                        }
                        self._utility.enableSelection(view.searchBox.add(view.searchBoxActionBtn).removeClass('disabled'));                        
					},
					"_disableSearch": function() {						
                        self._utility.disableSelection(view.searchBox.add(view.searchBoxActionBtn).addClass('disabled'));
					},
					"_enableActionItems": function() {
						view.actionGroup.children().not("[status=disabled]").removeClass('buttonDisabled');
					},
					"_disableActionItems": function() {
						view.actionGroup.children().addClass('buttonDisabled');
					},					
					"_applyTimeRangeOption": function() {
                        if(model.sourceType === 'local') {
                            return false;
                        }						
						var timeRangeValue= view.timeRangeLabel.attr("val");						
						$.cookie(model.id + "_timeRangeMode",timeRangeValue);
						self._modelTimeRangeGetServerTime(
							function(timeObject) {
								self._viewSettingTimeRangeValue();
								options.dataReady= false;
								model.onTimeRange= true;
                                view.timeRange.trigger('changed', [model.tr, timeObject]);
								self._init();
							},
							timeRangeValue
						);
					},
					"_applyTimeRangeCustomized": function(evt) {						
						view.timeRangeLabel.text('Customized range').attr("val", "customized");
                        if(model.sourceType === 'local') {
                            evt.target = view.body;
                            self._viewTimeRangeHide(evt, self);
                            return false;
                        }                       
						$.cookie(model.id + "_timeRangeMode","customized");
						view.startDate.data("orgVal", view.startDate.data("value"));        
						view.startHours.data("orgVal", view.startHours.data("value"));
						view.startMinutes.data("orgVal", view.startMinutes.data("value"));
						view.startSeconds.data("orgVal", view.startSeconds.data("value"));
						view.endDate.data("orgVal", view.endDate.data("value"));
						view.endHours.data("orgVal", view.endHours.data("value"));
						view.endMinutes.data("orgVal", view.endMinutes.data("value"));
						view.endSeconds.data("orgVal", view.endSeconds.data("value"));
						var timeInfo= self._modelTimeRangeSelectedTimeCheck("orgVal");						
						$.cookie(model.id + "_trStartDate", timeInfo.startDate);                         
						$.cookie(model.id + "_trStartHours", timeInfo.startHours);
						$.cookie(model.id + "_trStartMinutes", timeInfo.startMinutes);
						$.cookie(model.id + "_trStartSeconds", timeInfo.startSeconds);
						$.cookie(model.id + "_trEndDate", timeInfo.endDate);
						$.cookie(model.id + "_trEndHours", timeInfo.endHours);
						$.cookie(model.id + "_trEndMinutes", timeInfo.endMinutes);
						$.cookie(model.id + "_trEndSeconds", timeInfo.endSeconds);
						var startStr= timeInfo.stDate.format("yyyy-mm-dd HH:MM:ss");
						var endStr= timeInfo.edDate.format("yyyy-mm-dd HH:MM:ss");
						self._modelTimeRangeGetServerTime(
							function(timeObject) {
								view.grid.trigger("mousedown.tmGrid");
								self._viewSettingTimeRangeValue();
								options.dataReady= false;
                                view.timeRange.trigger('changed', [model.tr, timeObject]);
								model.onTimeRange= true;
								self._init();
							},
							"customized",
							startStr + "," + endStr
						);
					},
					"_registControls": function(type, controlers) {
						!control[type]? control[type]= [] : "";
						if (controlers && typeof(controlers) == "object") {
							control[type]= control[type].concat(controlers);
						}else if (controllers && typeof(controlers) == "function") {
							control[type].push(controlers);
						}						
						view.grid.bind(type+'.tmGrid.control',
							function(evt) {
								$(control[type]).each(
									function(index, item) {
										item();
									}
								);
                                evt.stopPropagation();
							}
						);					
					}
				}
			);
			control._registControls("onQuery", [control._createEmptyRow, control._hideMessage, control._showProgress, control._disableTimeRange, control._disableFilter, control._disablePagination, control._disableSort, control._disableSelectAll, control._disableSearch, control._disableActionItems]);
			control._registControls("_controlOnSearch", [control._showProgress, control._disablePagination, control._disableSort, control._disableActionItems]);
			control._registControls("onDisable", [control._disableResize, control._disableDraggable, control._disableTimeRange, control._disableFilter, control._disablePagination, control._disableSort, control._disableSelect, control._disableSelectAll, control._disableSearch, control._disableActionItems]);
            control._registControls("onEnable", [control._enableResize, control._enableDraggable, control._enableTimeRange, control._enableFilter, control._enablePagination, control._setPagiStatus, control._enableSort, control._enableSelect, control._enableSelectAll, control._enableSearch, control._enableActionItems]);
            control._registControls("onQueryComplete", [control._hideProgress, control._enableTimeRange, control._enableFilter, control._enableSort, control._enableSelectAll, control._enableSearch, control._enableActionItems, control._cleanRow]);
			//set Behavior Icon Controler
			model.hasAction? self._controlSettingActionItems() : "";
			//set time range Controler		
			model.hasTimeRange === true? self._controlSettingTimeRange() : "";
			//set pagination Controler
			model.hasPagination === true? self._controlSettingPagination() : "";
			//set search Controler
			model.hasSearch === true? self._controlSettingSearch() : "";
			//set sort Controler
			model.hasSort? self._controlSettingSort() : "";
            //set columns filter Controler
			self._controlSettingFilter();
			//set columns resize Controler
			self._controlSettingColumnsResize();
            //set columns resize Controler
            model.hasDrag === true? self._controlSettingColumnsDrag() : "";
			
			//set complete event
			view.grid.unbind('complete.tmGrid').bind('complete.tmGrid', control.complete);
            //set search event
            view.grid.unbind('search.tmGrid').bind('search.tmGrid', control.search);
			//set time range change event
			view.timeRange.unbind('change.tmGrid').bind('change.tmGrid', control.timeRangeChange);
            //set time range changed event
            view.timeRange.unbind('changed.tmGrid').bind('changed.tmGrid', control.timeRangeChanged);
            
			//set filter event
			view.grid.unbind('filter.tmGrid').bind('filter.tmGrid', control.filter);
			//set sort event
			view.grid.unbind('sort.tmGrid').bind('sort.tmGrid', control.sort);
            //set drag event
			view.grid.unbind('drag.tmGrid').bind('drag.tmGrid', control.drag);
            //set dragAfter event
			view.grid.unbind('dragAfter.tmGrid').bind('dragAfter.tmGrid', control.dragAfter);            
			//set page change event
			view.grid.unbind('pageChange.tmGrid').bind('pageChange.tmGrid', control.pageChange);
			options.dataReady? view.grid.trigger('onQuery') : "";
		},
		"_controlSettingActionItems": function(reset) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, enableItems = [], disableItems = [];			
			if (reset == true) {
                $(model.actionItems).each(
                    function(index, item) {
                        item.disabled === true? disableItems.push(item) : enableItems.push(item);
                    }
                );
                self.actionItemDisable(disableItems);
                self.actionItemEnable(enableItems);
            } else {
                $(model.actionItems).each(
                    function(index, item) {
                        item.element
                            .unbind('disable.tmGrid')
                            .bind('disable.tmGrid', function() {
                                item.element.attr('status', 'disabled').addClass('buttonDisabled');
                            })
                            .unbind('enable.tmGrid')
                            .bind('enable.tmGrid', function() {
                                item.element.attr('status', 'enabled').removeClass('buttonDisabled');
                            })
                            .unbind('mouseenter.tmGrid')
                            .bind('mouseenter.tmGrid', function() {
                                if(item.element.is('.buttonDisabled')) return;
                                item.element.children().addClass('hover');
                            })
                            .unbind('mouseleave.tmGrid')
                            .bind('mouseleave.tmGrid', function() {                            
                                item.element.children().removeClass('hover');
                            });
                        if ($.fn.tmPopup) {						
                            if (item.tmPopup && typeof(item.tmPopup) == 'object') {							
                                item.element
                                    .tmPopup(item.tmPopup)
                                    .unbind('click.tmPopup')
                                    .bind('click.tmPopup', function() {
                                        if (item.element.is('.buttonDisabled')) return false;
                                        item.element.tmPopup('open');
                                    });
                            }
                        }
                        if (item.click) {
                            item.element	
                                .unbind('click.tmGrid')
                                .bind('click.tmGrid', function(e) {									
                                    if (item.element.is('.buttonDisabled')) return false;								
                                    item.click(e);
                                })
                        }
                    }
                )
            }
		},
		"_controlSettingTimeRange": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			view.timeRange
				.unbind('click.tmGrid')
				.bind('click.tmGrid', function(evt) {
					if (view.timeRange.is('.disabled')) {
						return false;
					}
					self._viewTimeRangeShowHide(evt, self);
					evt.stopPropagation();
				});
			view.timeRangeOptionItems
				.unbind('click.tmGrid')
				.bind("click.tmGrid", function(evt) {
					self._viewTimeRangeTypeSelect(this, self);
					evt.stopPropagation();
				});
			view.body
				//.unbind('mousedown.tmGrid')
				.bind('mousedown.tmGrid', function(evt) {
					self._viewTimeRangeHide(evt, self);
				});
		},
		"_controlSettingSearch": function() {//fine
			var self = this, options = self.options, model = self.model, view = self.view, control = self.control,
			inputHandler = function (evt) { 
                try {
                    if(evt.cancelable === true) {
                        evt.preventDefault();
                        return;
                    }
                } catch(e) {}
                var value = view.searchBox.val();
                if ( value != view.searchBox.data('searchedKeyword')) {                    
                    view.searchBox.add(view.searchBoxActionBtn).removeClass('searched').addClass('readyToSearch');
                } else {                    
                    view.searchBox.add(view.searchBoxActionBtn).removeClass('readyToSearch');
                    if (view.searchBox.data('searchedKeyword') != "") {
                        view.searchBox.add(view.searchBoxActionBtn).addClass('searched');
                    }
                }
                if (value === options.searchTip) {
                    view.searchBox.data('keywordEvalSearchTip', true);
                } else {
                    view.searchBox.data('keywordEvalSearchTip', false);
                }
            },
            focusHandler = function (evt) {                
                if (view.searchBox.is(".disabled")) {
                    evt.preventDefault();
                    return;
                } else  {                    
                    if( view.searchBox.val() == options.searchTip && view.searchBox.data('keywordEvalSearchTip') === false) {
                        view.searchBox
                            .val("")
                            .data('oldVal', "");
                    }
                    view.searchBox.add(view.searchBoxActionBtn).addClass('focus');
                    if ($.browser.msie == true) {
                        if( view.searchBox.data('timer') ) {
                            clearInterval(view.searchBox.data('timer'));
                        }
                        view.searchBox.data('timer', setInterval(
                            function () {
                                if(view.searchBox.val() != view.searchBox.data('oldVal')) {
                                    view.searchBox.data('oldVal', view.searchBox.val());
                                    inputHandler();
                                }
                            },
                            200
                        ));
                    }
                }
            },
            blurHandler = function (evt) {
                if ($.browser.msie == true) {
                    if( view.searchBox.data('timer') ) {
                        clearInterval(view.searchBox.data('timer'));
                    }
                }
                if (view.searchBox.val() == "" && view.searchBox.is('.readyToSearch') === false) {                    
                    view.searchBox.val(options.searchTip);
                    view.searchBox.add(view.searchBoxActionBtn).removeClass("focus searched");
                }
            },
            keydownHandler = function (evt, trigger) {
                var value;
                if ( evt.keyCode == 13 || trigger === true) {
                    value = view.searchBox.val();
                    if (view.searchBox.is('.readyToSearch') === true) {
                        if (value === options.searchTip) {
                            view.searchBox.data('keywordEvalSearchTip', true);
                        }
                        view.searchBox
                            .data('searchedKeyword', value)
                            .trigger('cursorRest.tmGrid');
                            //.trigger('blur.tmGrid');                         
                        control._search(value);   
                    } 
                }  else if (evt.keyCode === 27) {
                   setTimeout(function() {
                        if(view.searchBox.data('searchedKeyword') == "") {                        
                            view.searchBox
                                .val('')
                                .add(view.searchBoxActionBtn)
                                .removeClass('readyToSearch')
                                .trigger('cursorRest.tmGrid')
                                .trigger('blur');
                        } else {
                            view.searchBox
                                .val(view.searchBox.data('searchedKeyword'))                          
                                .add(view.searchBoxActionBtn)
                                .removeClass('readyToSearch')
                                .addClass('searched')
                                .trigger('cursorRest.tmGrid')
                                .trigger('blur');
                        }
                    } ,10);
                }
            },
            cursorRestHandler = function () {
                /*try {
                    var range = view.searchBox[0].createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', 0);
                    range.moveStart('character', 0);
                    range.select();
                } catch(e) {
                    view.searchBox[0].setSelectionRange(0, 0);
                }*/
            }
            view.searchBox
                .data({
                    'searchedKeyword': "",
                    'keywordEvalSearchTip': false
                })
                .unbind('.tmGrid')
                .bind({
                    'focus.tmGrid': focusHandler,
                    'blur.tmGrid': blurHandler,                    
                    'keydown.tmGrid': keydownHandler,
                    'cursorRest.tmGrid': cursorRestHandler
                });
            if (!$.browser.msie) {
                view.searchBox                    
                    .bind('input.tmGrid', inputHandler);                
            }
            view.searchBoxActionBtn
                .unbind('.tmGrid')
                .bind('click.tmGrid', function (evt) {
                    var value;
                    if (view.searchBox.is(".disabled")) {
                        evt.preventDefault();
                        return;
                    }
                    if (view.searchBoxActionBtn.is('.readyToSearch')) {
                        value = view.searchBox.val();
                        view.searchBox
                            .data('searchedKeyword', value)
                            .trigger('cursorRest.tmGrid')
                            .trigger('focus');
                            //.trigger('blur');
                        control._search(value);
                    } else if (view.searchBoxActionBtn.is('.searched')) {
                        view.searchBox
                            .val("")
                            .data('searchedKeyword', "");
                        control._search("");
                    } else {
                        view.searchBox.trigger('focus');
                    }
                });           
		},
		"_controlSettingPagination": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			view.currentPager
				.bind("pageChange.tmGrid", control._pageChang)
				.bind("input.tmGrid", control._pageValidate)
				.bind('keypress.tmGrid', function(evt) {
					if (evt.keyCode == 13) {						
						view.currentPager.trigger("pageChange", [self]);
					}					
					return;
				});
			view.perPage
				.bind("pageChange.tmGrid", control._pageChang)
				.bind("change.tmGrid", function() {				
					view.perPage.trigger("pageChange", [self]);
					return;
				});
				
			view.firstBtn.add(view.prevBtn).add(view.nextBtn).add(view.lastBtn)			
				.bind("pageChange.tmGrid", control._pageChang)
				.bind("click.tmGrid", function() {
					$(this).trigger("pageChange", [self]);
					return;
				});	
		},
		"_controlSettingFilter": function() {
            var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
            $("select.filter", view.behaviorArea).bind('change.tmGrid', function(evt) {               
                var _select = $(this);
                view.grid.trigger('filter.tmGrid', [_select.data('key'), _select.val()]);					
                control._filter(evt);                     
            });
        },
        "_controlSettingSort": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, sortTh= view.headerTitle.find("th.sortable");
			sortTh
				.each(
					function(index, col) {
						var column= $(col)
							.unbind("click.tmGrid")
							.bind("click.tmGrid", function(evt) {                               
								if (column.is('.unSortable, .processing') || view.grid.is('.onDrag')) {
									return false;
								}
								if (column.is('.onSort')) {
									if (column.is(".sort_asc")) {
										model.sortType= 'desc';
										column.removeClass("sort_asc").addClass("sort_desc");								
									}else{
										model.sortType= 'asc';								
										column.removeClass("sort_desc").addClass("sort_asc");
									}
								}else{
									model.sortType= 'asc';
									sortTh.removeClass('onSort');								
									column.addClass('onSort').removeClass("sort_desc").addClass("sort_asc");
								}
								view.grid.trigger("sort.tmGrid", [column]);	
								control._sort(column);
							});
					}
				);
		},
		"_controlSettingColumnsResize": function() {
			var self = this, 
				options = self.options,
				model= self.model,
				view= self.view,
				control= self.control,                
				gridWidth,
                gridLeft,
				needResizeCols = null,
                needResizeColsLength,
				needResizeColsOrgWidth, 
				needResizeColsTotalWidth,
				lastPos,
                containmentLeft,
                containmentRight,
				resizeCol = null,
                resizeColLeft,               
				resizeHandlerPos = 0,
                offset = 0,
                currentCol,
                currentSizeColumn,
                currentWidth,
                resizeColWidth,
                DestinationWidth,
                leftTotalWidth,
                lastCol,
                lastWidth,
				tbodyHeight,
				headerTitleHeight,							
				helperTop,
				helperHeight,
                totalRowLength = 0,
                contentsSize,
                leaveHandler = function (evt) {
                    view.resizeHelper.add(view.resizeBaseLine).hide();
                },
				enterHandler = function (evt) {
					var _this = $(this), enteredCol = _this.parent(), cellIndex;
					if(view.grid.is('.onResize') || enteredCol.is('.last') || view.grid.is('.disabled')){
						return;
					}
                    contentsSize = [];                    
                    gridWidth = view.grid.width();                    
                    gridLeft = view.grid.offset().left;
                    headerTitleHeight = view.headerTitle.height();    
                    helperHeight = headerTitleHeight + 1;
                    helperTop = Math.round(view.headerTitle.position().top);
                    //helperTop  ie9 and firefox more 1px;
                    $.browser.mozilla || ($.browser.msie && $.browser.version == '9.0')? helperTop -= 1 : "";
                    cellIndex = model.hasMulti? enteredCol.attr('cellIndex') - 1 : enteredCol.attr('cellIndex');
                    totalRowLength = model.columns[cellIndex].dataColumns.length;
                    resizeCol = model.columns[cellIndex].sizeColumn;
                    needResizeCols = $.makeArray(resizeCol.nextAll());
                    needResizeColsLength = needResizeCols.length;
                    resizeCol = resizeCol[0];
                    lastPos = gridLeft + gridWidth;
                    //lastPos only firefox less 1 pixel;
                    $.browser.mozilla? "" : lastPos -= 1;
                    resizeHandlerPos = _this.position().left;
                    //resizeHandlerPos only firefox less 1 pixel;
                    $.browser.mozilla? resizeHandlerPos += 1 : "";
                    resizeColLeft = Math.round(enteredCol.offset().left);
                    //ie9 and firefox include left border;                    
                    if( $.browser.msie && $.browser.version == '9.0') {
                        resizeColLeft -= 1;
                    }  
                    containmentLeft = resizeColLeft + 9;
                    containmentRight = lastPos - (needResizeColsLength * 11);                   
                    $.browser.mozilla? containmentRight -= 1 : containmentRight -= 2;                    
                    contentsSize.push(self._controlSetContentWidth(enteredCol));
                    for (var index = 0; index < totalRowLength; index += 1) {                        
                        contentsSize.push(self._controlSetContentWidth(model.columns[cellIndex].dataColumns[index]));
                    }                                  
                    view.resizeHelper
						.css({
							'top': helperTop,
							'left': resizeHandlerPos,
							'height': helperHeight,
                            'position': 'absolute'
						})
						.draggable('option', 'containment', [containmentLeft, 0, containmentRight, 0])
						.show()
						.appendTo(enteredCol);
                    view.resizeBaseLine
                        .css({
                            'top': helperTop                      
                        })                        
                        .appendTo(enteredCol);
				},
				colWidthHandler = function (evt) {  
                    view.resizeHelper.unbind('mouseleave.tmGrid');
					needResizeColsOrgWidth = [];
					needResizeColsTotalWidth = 0;		
                    for(index = 0; index < needResizeColsLength; index += 1) {
                        currentCol = needResizeCols[index];
                        currentWidth = parseInt(currentCol.style.width, 10);                       
                        needResizeColsTotalWidth += currentWidth;                        
                        needResizeColsOrgWidth.push(currentWidth);		
					};                    
				},
                dblclickHandler = function (evt) {
                    resizeColWidth = parseInt(resizeCol.style.width, 10);
                    offset = resizeColWidth - contentsSize.max();
                    if (resizeColLeft + resizeColWidth - offset >= containmentRight){
                        resizeCol.style.width = (containmentRight - resizeColLeft + 1) + 'px';                        
                        for (index = 0; index < needResizeColsLength; index += 1) {
                            needResizeCols[index].style.width = '10px';
                        }
                    } else {
                        resizeCol.style.width = (resizeColWidth - offset) + 'px';
                        DestinationWidth = needResizeColsTotalWidth + offset;
                        self._viewColumnResize(needResizeCols, needResizeColsOrgWidth, needResizeColsTotalWidth, DestinationWidth);                        
                    }
                };                
            view.resizeHelper
				.bind({
					'mousedown.tmGrid': colWidthHandler,
                    'mouseup.tmGrid': function (){view.resizeHelper.unbind('mouseleave.tmGrid').bind('mouseleave.tmGrid', leaveHandler);},
					'click.tmGrid': function (evt) {evt.stopPropagation();},
                    'dblclick': dblclickHandler,
                    'mouseleave.tmGrid': leaveHandler
				})
				.draggable({
					axis: 'x',
					start: function () {                        
						control._disableSort();
						view.grid.addClass('onResize');
						tbodyHeight = view.tbody.height();
						helperHeight = tbodyHeight + headerTitleHeight;
						view.resizeHelper.add(view.resizeBaseLine)
							.css({
								'height': helperHeight
							})
                            .show();
					},
					stop: function(event, ui){
                        offset = ui.position.left - resizeHandlerPos;
                        resizeColWidth = parseInt(resizeCol.style.width, 10) + offset;
                        resizeCol.style.width =  resizeColWidth + 'px';
                        offset *= -1;
                        DestinationWidth = needResizeColsTotalWidth + offset;
                        if(ui.position.left + gridLeft + 1 == containmentRight) {
                            for (index = 0; index < needResizeColsLength; index += 1) {
                                needResizeCols[index].style.width = '10px';
                            }
                        } else {
                            self._viewColumnResize(needResizeCols, needResizeColsOrgWidth, needResizeColsTotalWidth, DestinationWidth);
                        }
                        control._enableSort();
						view.grid.removeClass('onResize');
                        view.resizeHelper
                            .add(view.resizeBaseLine)
                            .hide();
					}
				});
			view.resizeHandlers.bind({
				'mouseenter.tmGrid': enterHandler
			});
        },
        "_controlSettingColumnsDrag": function() {            
            var self = this, 
				options = self.options,
				model= self.model,
				view= self.view,
				control= self.control,
                mouseDownHandler = function (evt) {                    
                    var _this = $(this), 
                        draggedHelper,
                        draggedHelperWidth,
                        total = 0,
                        cols = [],
                        cellIndex = model.hasMulti? _this.attr('cellIndex') - 1 : _this.attr('cellIndex'), 
                        columnsLength = model.columns.length,
                        totalRowLength = view.trs.length,
                        top = view.headerTitle.position().top;
                    if (_this.is('.unDraggable') == true) {
                        return;
                    }
                    if($(evt.target).is('.resizeHelper, .resizeHelper span')) {
                        return;
                    }
                    view.dragArea.appendTo(model.columns[0].sizeColumn);
                    $(model.columns).each(function (index, item) {
                        var column = item.titleColumn, 
                            currentSizeCol = item.sizeColumn[0],
                            currentWidth = parseInt(currentSizeCol.style.width, 10),
                            dragHelper = view.dragHelper.clone()
                                .addClass(column.attr("className"))
                                .append(column.children().clone())
                                .appendTo(view.dragAreaContainer)
                                .css({
                                    width: currentWidth + 'px',
                                    left: total + 'px'
                                });
                            dragHelper
                                .data({
                                    'orgLeft': total,
                                    'offsetLeft': dragHelper.offset().left,
                                    'offsetRight': dragHelper.offset().left + dragHelper.width(),
                                    'cellIndex': index
                                });
                            cols.push(dragHelper);                            
                            if (currentSizeCol == model.columns[cellIndex].sizeColumn[0]) {                               
                                draggedHelperWidth = currentWidth;
                                draggedHelper = dragHelper
                                    .addClass('dragged')
                                    .draggable({
                                        'axis': 'x',
                                        'distance': 10,
                                        'start': function (event, ui) {
                                            view.resizeHelper
                                                .add(view.resizeBaseLine)
                                                .hide();
                                            view.grid.addClass('onDrag');
                                            control._disableSort();
                                        },
                                        'stop': function (event, ui) {
                                            var changedCols = view.dragAreaContainer.find('.changed'),
                                                changeColTitle, 
                                                changeColSize,
                                                changeContenCol,
                                                targetColTitle,
                                                targetColSize,
                                                targetContenCol,
                                                targetAlias,
                                                left,
                                                dragType,   
                                                columnIndex,
                                                draggedColumn;                                                
                                            if(changedCols.length == 0) {
                                                draggedHelper.animate(
                                                    {
                                                        'left': draggedHelper.data('orgLeft')
                                                    },
                                                    {
                                                        'duration': 300,
                                                        'complete': function() {
                                                            view.dragAreaContainer.children().remove();
                                                            view.dragArea.remove();                                                          
                                                            control._enableSort();
                                                            view.grid.removeClass('onDrag');  
                                                        }
                                                    }                                                    
                                                );
                                            } else {                                                
                                                changeColSize = model.columns[cellIndex].sizeColumn;
                                                changeColTitle = model.columns[cellIndex].titleColumn;
                                                if (draggedHelper.data('sencerType') == 'right') {
                                                    targetAlias = changedCols.last();
                                                    columnIndex = targetAlias.data('cellIndex');                                                    
                                                    left =  targetAlias.position().left + targetAlias.width() + 1;
                                                    draggedHelper
                                                        .css('left', left)
                                                        .insertAfter(targetAlias);
                                                    dragType = "insertAfter";
                                                } else {
                                                    targetAlias = changedCols.first();
                                                    columnIndex = targetAlias.data('cellIndex');                                                    
                                                    left =  targetAlias.data('orgLeft');
                                                    draggedHelper
                                                        .css('left', left)
                                                        .insertBefore(targetAlias);
                                                    dragType = "insertBefore";
                                                }
                                                targetColSize = model.columns[columnIndex].sizeColumn;
                                                targetColTitle = model.columns[columnIndex].titleColumn;
                                                eval("changeColSize." + dragType + "(targetColSize);");
                                                eval("changeColTitle." + dragType + "(targetColTitle);");
                                                
                                                for (var index = 0; index < columnsLength; index += 1) {
                                                    var newCellIndex = model.columns[index].titleColumn[0].cellIndex;         
                                                    if ( model.hasMulti === true ) newCellIndex = newCellIndex - 1;
                                                    
                                                    model.columns[index].titleColumn
                                                        .add(model.columns[index].sizeColumn)
                                                        .add(model.columns[index].dataColumns)
                                                        .attr('column', newCellIndex)
                                                        .removeClass('first last');
                                                }                                                
                                                self._viewSortDataCell(view.headerTitle);
                                                
                                                draggedColumn = model.columns[cellIndex];
                                                model.columns.splice($.inArray(draggedColumn, model.columns), 1);
                                                model.columns.splice(columnIndex, 0, draggedColumn);
                                                
                                                for(var index = 0; index < totalRowLength; index += 1){
                                                    $(view.trs[index].tr).each(
                                                        function (rowIndex, row) {
                                                            self._viewSortDataCell($(row));
                                                        }
                                                    );
                                                }                                                
                                                view.dragAreaContainer.children().remove();
                                                view.dragArea.remove();                                            
                                                control._enableSort();
                                                view.grid.removeClass('onDrag');
                                                view.grid.trigger('dragAfter.tmGrid', [_this])
                                            }                                        
                                        },
                                        'drag': function (event, ui) {
                                            var colsAlias, sencerType, reverseTag;
                                            if ( ui.position.left > draggedHelper.data('orgLeft') ) {
                                                colsAlias = $(cols.slice(index + 1));
                                                sencerType = 'offsetLeft';
                                                reverseTag = 1;
                                                draggedHelper.data('sencerType', 'right');
                                            } else {
                                                colsAlias = $(cols.slice(0, index));
                                                sencerType = 'offsetRight';
                                                reverseTag = -1;
                                                draggedHelper.data('sencerType', 'left');
                                            }
                                            colsAlias.each(function (ind, col) {
                                                var sencerPos = col.data(sencerType), left;
                                                if (!col.is('.changed')) { 
                                                    if ((event.pageX - sencerPos) * reverseTag > 0){
                                                        left = ( col.data('orgLeft') - (draggedHelperWidth * reverseTag) - (1 * reverseTag) ) + 'px';
                                                        col
                                                            .addClass('changed')                                                            
                                                            .stop()
                                                            .animate({
                                                                'left': left
                                                            });
                                                    }                                                    
                                                } else {                                                    
                                                    if ((event.pageX - sencerPos) * reverseTag < 0) {
                                                        col
                                                            .removeClass('changed')   
                                                            .stop()
                                                            .animate({
                                                                'left': col.data("orgLeft") + 'px'
                                                            });                                                        
                                                    }                                                                                                    
                                                }                                                
                                            });
                                        }
                                    });                            
                            }                            
                            total += currentWidth + 1;
                        });                   
                    view.dragArea.css({
                        width: total - 1 + 'px',
                        top: $.browser.mozilla == true? top - 1 : top
                    })
                    draggedHelper.trigger(evt);
                };
            if(model.hasDrag) {
                self._utility.disableSelection(view.headerTitle);
                view.dragArea.append(view.dragAreaContainer);
                view.columns.bind({
                    "mousedown.tmGrid": mouseDownHandler,
                    "mouseup.tmGrid": function () {                   
                        view.dragAreaContainer.children().remove();
                        view.dragArea.remove();
                    }
                });
            }            
        },
        "_controlSetContentWidth": function (target) {            
            var self = this, 
                options = self.options, 
                model= self.model,
                view= self.view,
                control= self.control,
                column = $(target).clone().css('display', 'inline-block'),
                width = 0;
                if ( column.is('th') ) {
                    view.aliasHeaderTitle.append(column);
                } else if ( column.is('td') ) {
                    view.aliasTbodyTr.append(column);
                }                
                view.aliasGrid.insertAfter(view.grid);
                width = column.width() + parseInt(column.css("paddingLeft"), 10) + parseInt(column.css("paddingRight"), 10);
                //column.add(view.aliasGrid).remove();
                column.remove();
                return width;                     
        },
		"_controlSelectHandler": function (evt) {
            
        },
        "_controlSelectifyEnabled": function() {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, 
                totalRowLength = view.trs.length,
                select = options.select,
                rowSelect = options.rowSelect,
                rowUnselect= options.rowUnselect,
                rowSelectEvtTarget,
                selectEvtTarget;
                
            view.tbody.addClass('selectabled');
            view.selectedItem= [],
            model.selectedItemData= [];
			function selectHandler(evt, trs, tr, checkbox) {                
				var target= $(evt.target), orgSelectedTrs, orgSelectedTr, _event;
                if (tr.is('.checked')) {
                    trs.removeClass('checked');
                    model.selectedItemData= [];
                    view.selectedItem = $.grep(view.selectedItem, function(value) {
                        if (value !== trs) {
                            model.selectedItemData.push(value.first().data('data'));
                        }                        
                        return value !== trs;
                    });
                    if (model.hasMulti === true) {
                        checkbox.attr("checked", false);
                        self._controlSelectCheckCbxAll(evt);
                    } else {
                        _event = $.Event('select.tmGrid');
                        _event.originTarget = evt.target;
                        tr.trigger('select', [view.selectedItem, model.selectedItemData]);
                    }
                    _event = $.Event('rowUnselect.tmGrid');
                    _event.originTarget = evt.target;
                    tr.trigger('rowUnselect', [trs, tr.data('data')]);
                }else{
                    if(model.hasMulti === true) {
                        checkbox.attr("checked", true);
                        view.selectedItem.push(trs.addClass('checked'));
                        model.selectedItemData.push(tr.data('data'));
                        self._controlSelectCheckCbxAll(evt);
                    } else {                        
                        if (view.selectedItem.length == 1) {
                            orgSelectedTrs = view.selectedItem[0].removeClass('checked');
                            orgSelectedTr = orgSelectedTrs.first();
                            view.selectedItem= [];
                            model.selectedItemData= []; 
                            _event = $.Event('rowUnselect.tmGrid');
                            _event.originTarget = evt.target;
                            orgSelectedTr.trigger('rowUnselect', [orgSelectedTrs, orgSelectedTr.data('data')]);
                        }
                        view.selectedItem.push(trs.addClass('checked'));
                        model.selectedItemData.push(tr.data('data'));
                        _event = $.Event('select.tmGrid');
                        _event.originTarget = evt.target;
                        tr.trigger(_event, [view.selectedItem, model.selectedItemData]);
                    }
                    _event = $.Event('rowSelect.tmGrid'); 
                    _event.originTarget = evt.target;
                    tr.trigger(_event, [trs, tr.data('data')]);
                }                
			};
			if (model.hasMulti) {
				view.cbxAll
					.attr("checked", false)
					.attr('indeterminate',false)
					.unbind("click.tmGrid")
					.bind("click.tmGrid",function(evt) {
						view.selectedItem= [];
						model.selectedItemData= [];  
                        $(view.trs).each(function (index, item) {
                            var currentRows = item.tr,
                                currentRow = currentRows.first(),
                                checkBox = item.checkBox;
                            if (view.cbxAll.attr("checked")) {
                                checkBox.attr("checked", true);
                                view.selectedItem.push(currentRows.addClass("checked"));
                                model.selectedItemData.push(currentRow.data('data'));
                            }else{
                                currentRows.removeClass("checked")
                                checkBox.attr("checked", false);
                            }
                        });						
						self._controlSelectCheckCbxAll(evt);
					});
			}
            $(view.trs).each(function (index, item) {
                var currentRows = item.tr,
                    currentRow = currentRows.first(),
                    checkBox = item.checkBox;
                if (model.hasMulti) {                    
                    rowSelectEvtTarget = currentRow;
                    selectEvtTarget = view.cbxAll;
                } else {
                    rowSelectEvtTarget = currentRow;
                    selectEvtTarget = currentRow;
                }
                if (rowSelect && typeof(rowSelect) == 'function') {
                    rowSelectEvtTarget
                        .unbind("rowSelect.tmGrid")
                        .bind("rowSelect.tmGrid", rowSelect);			
                }
                if (rowUnselect && typeof(rowUnselect) == 'function') {
                    rowSelectEvtTarget
                        .unbind("rowUnselect.tmGrid")
                        .bind("rowUnselect.tmGrid", rowUnselect);				
                }
                if (select && typeof(select) == 'function') {			
                    selectEvtTarget
                        .unbind("select.tmGrid")
                        .bind("select.tmGrid", select);
                }
                currentRows
                    .unbind("click.tmGrid")
                    .bind("click.tmGrid", function (evt) {                        
                        if (currentRows.is('.disabled') == true) {
                            evt.stopPropagation();
                            return;
                        }
                        selectHandler(evt, currentRows, currentRow, checkBox);
                    });
            });
        },
		"_controlSelectifyDisabled": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control,
            totalRowLength = view.trs.length, isSelectableBefore = view.tbody.is('.selectabled'), columnSpan;
            if(isSelectableBefore) {
                view.tbody.removeClass('selectabled');
                $(view.trs).each(function (index, item) {
                    item.tr
                        .removeClass('checked')
                        .unbind('click.tmGrid');
                    if(model.hasMulti === true) {
                        item.checkBox.attr({
                            "checked": false,
                            "disabled": true
                        });
                    }
                });
                if(model.hasMulti === true) {
                    view.cbxAll.attr({
                        "checked": false,
                        "indeterminate": false,
                        "disabled": true
                    });
                    view.sizeControler.children('th.sizeCheckBoxAll').remove();
                    view.headerTitle.children('th.checkBoxAll').remove();
                    view.tbody.find('>tr >td.checkBoxAll').remove();
                    self._viewColumnSize(model.columns);
                    columnSpan = Number(view.tfootTd.attr('colspan'));
                    view.tfootTd.add(view.behaviorAreaTh).add(view.actionItemAreaTh).attr('colspan', columnSpan - 1);
                }
            }
            model.hasMulti = false;
		},
		"_controlSelectCheckCbxAll": function(evt) {//fine		
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			if (view.selectedItem.length == 0) {
				view.cbxAll.attr("checked", false).attr('indeterminate',false);
			}else if (view.selectedItem.length == view.trs.length) {     
				view.cbxAll.attr("checked", true).attr('indeterminate',false);
			}else{
				view.cbxAll.attr("checked", true).attr('indeterminate',true);
			}
            _event = $.Event('select.tmGrid');
            _event.originTarget = evt.target;
			view.cbxAll.trigger(_event, [view.selectedItem, model.selectedItemData] );
		},
        "_modelInitial": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			$.extend(
				model,
				{
					/* basic params */
					'id': self.element.attr('id') || self._utility.getUniqueId(),// view.grid.attr("id")? view.grid.attr("id") : ,
                    'disabled': options.disabled,
					//dataProvide params
					"url": "",
					"columns": $.extend(true, [], options.columns),
					"columnsLength": 0,	
                    "hasColumnIndex": false,
					"sourceType": 'local',
					"getDataRequest": null,
					"limit": 0,
					"page": 0,
					"orgData": [],
					"tmpData": [],
					"complete": null,
					"timer": null,
					"type": "get",
					//action item params
					"hasAction": false,
                    "actionItems": $.extend(true, [], options.actionItems),
					//filter params
					"filters": [],
					"onFilter": false,
					//pagination params
					"hasPagination": false,
					//search params
					"hasSearch": options.searchable,
					"onSearch": false,
					"keyword": "",
					//selection params
					"hasSelection": options.selectable,
					"hasMulti": options.selectable == true? options.isMulti : false,
					"onSelect": false,					
					"selectedItemData": [],
					//sort params
					"hasSort": options.sortable,
					"hasCustomSort": false,
					"onSort": false,
					"sortName": "",
					"sortType": "",
					"sortBy": [],
					//timerange params
					"hasTimeRange": options.timeRangable,
					"onTimeRange": false,
					"timeExist": false,
					"timeMode": "",
					"tr": "",
                    //columns draggable
                    "hasDrag": options.draggable,
                    //columns size params
                    "gridWidth": 0,
                    "resizableStatus": true
				}
			);			
			//dataProvider setting
			if (options.dataProvider && !self._modelSettingDataProvider(options.dataProvider)) {		
				return false;
			}
			//action item setting
			if (options.actionItems && !self._modelSettingActionItems(options.actionItems)) {
				return false;
			}		
			//time rage setting
			if (options.timeRange && !self._modelSettingTimeRange(options.timeRange)) {
				return false;
			}else{                
				if (options.timeRangable) {
					self._modelTimeRangeInitial();
				}
			}
			//columns setting			
			if (!self._modelSettingColumns(model.columns)) {
				return false;
			}
			//pagination setting
			if (options.pagination) {
				if (!self._modelSettingPagination(options.limit, options.limits)) {
					return false;
				}else{					
					//initialize limit
					var limit=$.cookie(model.id+ "_limit");			
					if (limit) {
						$.inArray(parseInt(limit, 10), options.limits) == -1? limit= options.limits[0] : "";
						limit= parseInt(limit, 10);
					}else{
						limit= parseInt(options.limit, 10);
						$.cookie(model.id+ "_limit", limit);
						$.cookie(model.id+ "_page", options.page);
					}
					model.limit= limit;
					//initialize current page
					var page= $.cookie(model.id+ "_page");
					if (!page) {
						page= options.page;
					}
					$.cookie(model.id+ "_page", page);
					model.page= parseInt(page, 10);
				}
			}
			
            //request method setting;
			var type= options.type.toLowerCase();
			if ( type != 'post' && type != 'get') {
				options.type= 'get';
			}else{
				options.type= type;
			}
			model.type= options.type;
			
            //regist customized complete event
			if (options.complete && typeof(options.complete) == 'function') {
				control.complete= options.complete;
			}else{
				options.complete= null;
				control.complete= function() {}
			}
			//regist customized time range change event
			if (options.timeRangeChange && typeof(options.timeRangeChange) == 'function') {
				control.timeRangeChange= options.timeRangeChange;
			}else{
				options.timeRangeChange= null;
				control.timeRangeChange= function() {}
			};
			//regist customized time range changed event
            if (options.timeRangeChanged && typeof(options.timeRangeChanged) == 'function') {
				control.timeRangeChanged= options.timeRangeChanged;
			}else{
				options.timeRangeChanged= null;
				control.timeRangeChanged= function() {}
			};
            //regist customized search event
            if (options.search && typeof(options.search) == 'function') {
                control.search= options.search;
            } else {
                options.search= null;
				control.search= function() {}
            }
            //regist filter event
			if (options.filter && typeof(options.filter) == 'function') {
				control.filter= options.filter;
			}else{
				options.filter= null;
				control.filter= function() {};
			}
			//regist sort event
			if (options.sort && typeof(options.sort) == 'function') {
				control.sort= options.sort;
			}else{
				options.sort= null;
				control.sort= function() {};
			}
            //regist drag event
			if (options.drag && typeof(options.drag) == 'function') {
				control.drag= options.drag;
			}else{
				options.drag= null;
				control.drag= function() {};
			}
            //regist dragAfter event
			if (options.dragAfter && typeof(options.dragAfter) == 'function') {
				control.dragAfter = options.dragAfter;
			}else{
				options.dragAfter = null;
				control.dragAfter = function() {};
			}
			//regist page change event
			if (options.pageChange && typeof(options.pageChange) == 'function') {
				control.pageChange= options.pageChange;
			}else{
				options.pageChange= null;
				control.pageChange= function() {};
			}
			//regist sort rule
			options.sortRule && typeof(options.sortRule) == 'function'? control.sortRule= options.sortRule : options.sortRule= null;
			return true;
		},
		"_modelSettingDataProvider": function(value) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			if (value) {
				if (typeof(value) == 'object') {					
					options.dataReady= true;
					options.total= value.length;
					model.url= "";
					model.sourceType= 'local';
					model.orgData= value;
					model.tmpData= value.slice();
                    view.grid.data('data', value);
					return true;
				}else if (typeof(value) == 'string') {					
					var regPatt= new RegExp(/^(http|https|ftp):\/\//gi);
					if (regPatt.test(value)) {
						regPatt= new RegExp(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ig);
						if (!regPatt.test(value)) {
							alert('You need to set a correct URL to getting data!');				
							return false;
						}
					}
					model.url= value;
					model.sourceType= 'server';
					options.dataReady= false;
					return true;
				}else{
					alert('You need to set an URL path of AJAX handler to getting data, or you need to assign a data array!');
					return false;
				}
			}else{
				alert('You need to set an URL path of AJAX handler to getting data, or you need to assign a data array!');
				return false;
			}
		},
		"_modelSettingActionItems": function(value) {//fine
			var self = this, model= self.model;	
			if (value.length > 0) {				
				model.hasAction= true;                
                $(model.actionItems).each(function (index, item) {
                    model.actionItems[index]= $.extend( true, {}, self.actionItemOptions, item);
                });                
				return true;
			}else{
				model.hasAction= false;
                model.actionItems = null;
				console.log('You need to set a group of action item setting!');
				return false;
			}
		},
		"_modelSettingPagination": function(value, lists) {//fine
			var self = this, model= self.model;			
			if (isNaN(value)) {
				alert("The count of user defined limit has to be a number format!");
				return false;
			}
			if (lists && lists.length > 0) {				
			}else{
				alert("A group of count lists need to defined as an Array format!");
				return false;
			}
			/*if ($.inArray(value, lists) == -1) {
				alert("Your value is not the same with a value of the parameter limits! Please make sure the list of limits correct!");
				return false;
			}*/
			model.hasPagination= true;
			return true;
		},
		"_modelSettingTimeRange": function(value) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, check= true,
			customizedRegPtn= new RegExp(/^\d{4,}[\/|-]\d{1,2}[\/|-]\d{1,2}\s+\d{1,2}:\d{1,2}\s*-\s*\d{4,}[\/|-]\d{1,2}[\/|-]\d{1,2}\s+\d{1,2}:\d{1,2}/gi),
			splitRegPtn= new RegExp(/(\d{4,}[\/|-]\d{1,2}[\/|-]\d{1,2}\s+\d{1,2}:\d{1,2})/gi);
			if (value && value.length > 0) {
				$(value).each(
					function(index, item) {					
						if (!item.type || !item.name || !item.value) {
							check= false;
							alert('You need to set correct params as name, type and value for time range setting!');
							return false;
						}
						if (item.type == 'option') {							
							if (isNaN(item.value)) {
								check= false;
								alert('You need to set correct value as timestamp for time range setting!');
								return false;
							}
						}else if (item.type == 'customized') {							
							if (item.value && item.value.match(customizedRegPtn)) {
								var matchTime= item.value.match(splitRegPtn);								
								var start= self._utility.timeRangeFormat(matchTime[0]);
								var end= self._utility.timeRangeFormat(matchTime[1]);
								if (!start) {
									alert('You need to set correct value for time range setting!');
									return false;
								}
								if (!end) {
									alert('You need to set correct value for time range setting!');
									return false;
								}
								if (start >=  end) {
									alert('You need to set correct value for time range setting!');
									return false;
								}
							}else{
								alert('You need to set correct value for time range setting!');
								return false;
							}							
							return true;
						}else{
							alert('You need to set correct type as option or customized for time range setting!');
							return false;
						}						
					}
				);				
				if (!check) {
					return false;
				}
			}else{
				alert('You need to set a group of time range setting!');
				return false;
			}
			options.timeRange= value;	
			return true;
		},
		"_modelTimeRangeInitial": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, tr;            
			if (options.tr) {                
				if (self._utility.timeRangeValidate(options.tr)) {
					$.cookie(model.id + "_timeRangeMode", "customized");
				}
				tr= options.tr;
			}else{                
				if ($.cookie(model.id + "_timeRangeMode") == "customized") {                    
					var _trStartDate= $.cookie(model.id + "_trStartDate"), _trStartHours= $.cookie(model.id + "_trStartHours"), _trStartMinutes= $.cookie(model.id + "_trStartMinutes"), _trStartSeconds= $.cookie(model.id + "_trStartSeconds"), _trEndDate= $.cookie(model.id + "_trEndDate"), _trEndHours= $.cookie(model.id + "_trEndHours"), _trEndMinutes= $.cookie(model.id + "_trEndMinutes"), _trEndSeconds= $.cookie(model.id + "_trEndSeconds");
					if (_trStartDate && _trStartHours && _trStartMinutes && _trStartSeconds && _trEndDate && _trEndHours && _trEndMinutes && _trEndSeconds) {
						tr= _trStartDate+" "+_trStartHours+":"+_trStartMinutes+":"+_trStartSeconds+","+_trEndDate+" "+_trEndHours+":"+_trEndMinutes+":"+_trEndSeconds;
                    }else{
						$.cookie(model.id + "_timeRangeMode", null);
					}
				}
			}
			model.timeMode= $.cookie(model.id + "_timeRangeMode");			
			//setTimeout(function() {}, 5000);
				self._modelTimeRangeGetServerTime(
					function(timeObject) {                        
					},
					model.timeMode? model.timeMode : options.timeRange[1].value,
					tr
				);
		},
		"_modelTimeRangeGetServerTime": function( callback, timeRangeValue, tr ) {//fine
            //console.log(timeRangeValue);
            //console.log(tr);
			var self = this, options= self.options, model= self.model, view= self.view, control= self.control, format;			
			var startTimeInfoObj={};
			var endTimeInfoObj= {};			
			if (timeRangeValue == "customized") {
				if (tr.indexOf(",") > -1) {
					format= "serverTimetext=" + tr;
				}else{
					format= "serverTimestamp=" + tr.replace(/:/gmi, ",");
				}				
				self._modelTimeRangeServerTimeInfo(
					[startTimeInfoObj,endTimeInfoObj],
					format,
					function(timeObject) {
						self._modelTimeRangeSetServertime(startTimeInfoObj, endTimeInfoObj);
						callback(timeObject);
					}
				);				
			}else{				
				var timeRangeItem= self._utility.timeRangeValueToItem(timeRangeValue, self);				
				self._modelTimeRangeServerTimeInfo(
					[startTimeInfoObj, endTimeInfoObj],
					"interval="+ timeRangeItem.value,
					function(timeObject) {
						self._modelTimeRangeSetServertime(startTimeInfoObj, endTimeInfoObj);											
						callback(timeObject);
					}
				);
			}	
		},
		"_modelTimeRangeSetServertime": function(startObj, endObj) {
			var self = this, options= self.options, model= self.model, view= self.view, control= self.control;
			var tr= startObj.SeverTimeStamp + ":" + endObj.SeverTimeStamp;
			var trText= startObj.Displayed_text + " ~ " + endObj.Displayed_text;
			var startSplit= startObj.Displayed_text.split(" ");
			var startDate= startSplit[0]; 
			var startTimeStr= startSplit[1]; 
			var startTimeSplit= startTimeStr.split(":");
			var startHours= startTimeSplit[0];
			var startMinutes= startTimeSplit[1];
			var startSeconds= startTimeSplit[2];						
			var endSplit= endObj.Displayed_text.split(" ");
			var endDate= endSplit[0]; 
			var endTimeStr= endSplit[1]; 
			var endTimeSplit= endTimeStr.split(":");
			var endHours= endTimeSplit[0];
			var endMinutes= endTimeSplit[1];
			var endSeconds= endTimeSplit[2];
			options.tr= tr;
			model.tr= tr;
			model.trText= trText;
			model.startDate= startDate.replace(/-/gmi,"/");
			model.startH= startHours;
			model.startM= startMinutes;
			model.startS= startSeconds;
			model.endDate= endDate.replace(/-/gmi,"/");
			model.endH= endHours;
			model.endM= endMinutes;
			model.endS= endSeconds;
			$.cookie(model.id + "_tr", tr);			
		},
		"_modelTimeRangeSelectedTimeCheck": function (type) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			var startDate= view.startDate.data(type);        
			var startHours= view.startHours.data(type);
			var startMinutes= view.startMinutes.data(type);
			var startSeconds= view.startSeconds.data(type);
			var endDate= view.endDate.data(type);        
			var endHours=  view.endHours.data(type);
			var endMinutes= view.endMinutes.data(type);
			var endSeconds= view.endSeconds.data(type);
			var stArr= startDate.split(/\D/gi);    
			var endArr= endDate.split(/\D/gi);
			var stDate= new Date(
				parseInt(stArr[0],10),
				parseInt(stArr[1],10) - 1,
				parseInt(stArr[2],10),
				startHours,
				startMinutes,
				startSeconds,
				0
			);
			var edDate= new Date(
				parseInt(endArr[0],10),
				parseInt(endArr[1],10) - 1,
				parseInt(endArr[2],10),
				endHours,
				endMinutes,
				endSeconds,
				0
			);			
			if (stDate.getTime()>= edDate.getTime()) {				
				view.dateMsgBox.tmmsgbox({
					"text": 'In the time range you selected, the start time must occur before the end time. Change your time range selection and try again.',
					"type": "error",
					"close_button": true
				}).show();
				view.timeRangeOkBtn.tmButton({"disabled": true});
				return false;
			}else{            
				view.dateMsgBox.hide();
				view.timeRangeOkBtn.tmButton({"disabled": false});          
				return {
					"startDate": startDate,
					"startHours": startHours,
					"startMinutes": startMinutes,
					"startSeconds": startSeconds,
					"endDate": endDate,
					"endHours": endHours,
					"endMinutes": endMinutes,
					"endSeconds": endSeconds,
					"stDate": stDate,
					"edDate": edDate
				}
			}  
		},
		"_modelTimeRangeServerTimeInfo": function(timeInfoObj, parameter, callback, format) {//fine
			// parameter could be interval/serverTimestamp/serverTimestamp these three method such as "serverTimestamp=1306892460,1307075160"	
			var self = this; options= self.options;
			var parameterSplit, setTimeType, setTimeValue, hasParameter= false, data= {};
			if (format) {
				data["format"]= format;
			}
			if (parameter) {			
				parameterSplit= parameter.split("=");			
				setTimeType= parameterSplit[0];
				setTimeValue= parameterSplit[1];
				data[setTimeType]= setTimeValue;	
				hasParameter= true;
			}
			$.tmAJAX(			
				{
					"url": options.timeRangeHandler,
					"type": "GET",
					"data": data,
					"dataType":"json",
					'async': false,
					"success": function(data) {
						if (data.status == 1) {			
							if (hasParameter) {						
								if ($.isArray(timeInfoObj) && timeInfoObj.length>0) {
									var first=[];first[true]= "now";first[false]= "result"; 
									var second= [];second[true]= "result";second[false]= "now";
									var j=0;									
									if (setTimeType == "interval") {										
											var firstStatus= first[setTimeValue>=0];
											var secondStatus= second[setTimeValue>=0];
											timeInfoObj[0].SeverTimeStamp= data[setTimeType][firstStatus].timestamp;
											timeInfoObj[0].SeverOffset= data[setTimeType][firstStatus].tzoffset;
											timeInfoObj[0].Displayed_text= data[setTimeType][firstStatus].displayed_text;
											timeInfoObj[1].SeverTimeStamp= data[setTimeType][secondStatus].timestamp;
											timeInfoObj[1].SeverOffset= data[setTimeType][secondStatus].tzoffset;
											timeInfoObj[1].Displayed_text= data[setTimeType][secondStatus].displayed_text;
									}else{
										for(var i in data[setTimeType]) {
											timeInfoObj[j].SeverTimeStamp= data[setTimeType][i].timestamp;
											timeInfoObj[j].SeverOffset= data[setTimeType][i].tzoffset;
											timeInfoObj[j].Displayed_text= data[setTimeType][i].displayed_text;
											j++;
										}
									}
								}else if (typeof timeInfoObj == "object") {							
									timeInfoObj= data.serverTimestamp;				
								}
							}else{
								timeInfoObj[0].SeverTimeStamp= data.timestamp;
								timeInfoObj[0].SeverOffset= data.tzoffset;
								timeInfoObj[0].Displayed_text= data.displayed_text;
							}
						}
						callback(timeInfoObj);
					}
				}
			);
		},
		"_modelClientSearch": function(keyword) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;	
			model.tmpData= [];
			if (keyword) {
				if (options.searchRule && typeof(options.searchRule) == 'function') {
					var matchData= options.searchRule(model.orgData, keyword);
					if (matchData) {
						model.tmpData= matchData;
					}
				}else{
					$(model.orgData).each(
						function(index, item) {
							for(i in item) {
								if (item.hasOwnProperty(i)) {
									if (typeof(item[i]) == 'string' && item[i].toLowerCase().indexOf(keyword.toString().toLowerCase()) > -1) {
										model.tmpData.push(item);
										return;
									}
								}
							}
						}
					);
				}				
			}else{
				model.tmpData= model.orgData;
			}			
			options.dataReady= true;
			options.total= model.tmpData.length;
		},
		"_modelSearchReset": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;			
			model.keyword= "";
			model.onSearch= false;
			$.cookie(model.id+"_keyword", null);
			view.searchBox.val(options.searchTip);
		},
		"_modelSettingColumns": function(value) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, indexKeys = [], filterCookie= $.cookie(model.id + '_filter'), tmpCookieFilter= [], totalColumnsWidth = 0, percentageWidthCol = [], noWidthCol = [], totalPercentage = 0, leftPercentage = 0, fixPercentage = 0, percentageColLength = 0, noWidthColLength = 0;
            if (model.hasSelection && model.hasMulti) {
                model.columnsLength = value.length + 1;				
            }else{
                model.columnsLength = value.length;
            }
			if (filterCookie) {
				 var allFilter= filterCookie.split(',');
				 $(allFilter).each(
					function(index, item) {
						var filterItem= decodeURIComponent(item).split('=');					
						tmpCookieFilter[filterItem[0]]= filterItem[1];
					}
				 );
			}
			if (value && value.length > 0) {
				$(value).each(
					function(index, item) {	
						var width = parseInt(item.width, 10);
						model.columns[index] = $.extend( true, {}, self.columnOptions, item);
                        if(item.index) { 
                            indexKeys.push(item.index);
                        }
						if (item.filter) {
							if (typeof(item.filter) != 'object') {
								model.columns[index].filter= null;
							}else{
								var tmpFilter= [];
								$(item.filter).each(
									function(index2, item2) {									
										if (item2.index != undefined || item2.index != null) {                                            
											if (tmpCookieFilter[item.index]) {
												if (tmpCookieFilter[item.index] == item2.index) {
													item2.selected= true;
												}else{
													item2.selected= false;
												}												
											}
											tmpFilter.push(item2);
										}
									}
								);
								model.columns[index].filter= tmpFilter;
							}
						}
						if (item.width) {
							if (typeof item.width == 'string') {
								if (item.width.indexOf("px") > -1) {
                                    if( width < 10) {
                                        width = 10;
                                    }
									model.columns[index].width = width + "px";
                                    totalColumnsWidth += width;
								}else{									
									totalPercentage += width;
									model.columns[index].width = width + "%";
									percentageWidthCol.push({
										'column': item,
										'index': index,
										'orgWidth': width
									});
								}
							} else {
								totalPercentage += width;
								model.columns[index].width = width + "%";
								percentageWidthCol.push({
									'column': item,
									'index': index,
									'orgWidth': width
								});
							}
						}else{							
							noWidthCol.push({
								'column': item,
								'index': index,
								'orgWidth': 0
							});							
						}
                        switch (item.textAlign) {
                        case "center":
                            model.columns[index].textAlign = 'center';
                            break;
                        case "right":
                            model.columns[index].textAlign = 'right';
                            break;
                        default:
                            model.columns[index].textAlign = 'left';
                            break;
                        }
                    }
				);
                if (indexKeys.length == 0 ) {
                    model.hasColumnIndex = false;
                } else {
                    model.hasColumnIndex = true;
                    if (indexKeys.length != value.length) {
                        alert('Several coulmns lose attribute "index"!');
                        model.hasColumnIndex = false;
                        return false;
                    }
                }
				noWidthColLength = noWidthCol.length;
				percentageColLength =  percentageWidthCol.length;                
                if (percentageColLength == 0 && noWidthColLength == 0) {
                    $(value).each(
                        function(index, item) {
                            var width = parseInt(item.width, 10);                            
                            if (item.width) {                                                   
                                var newPercentage = (width / totalColumnsWidth) * 100;
                                totalPercentage += newPercentage;
                                model.columns[index].width = newPercentage + "%";
                                percentageWidthCol.push({
                                    'column': item,
                                    'index': index,
                                    'orgWidth': newPercentage
                                });
                            }
                        }
                    );
                }
				if( totalPercentage < 100 ) {
					leftPercentage = 100 - totalPercentage;					
					if(noWidthColLength > 0){
						fixPercentage = leftPercentage/noWidthColLength;
						$(noWidthCol).each(
							function (index, item) {
								model.columns[item.index].width = fixPercentage + "%";
							}
						);
					} else {
						$(percentageWidthCol).each(function (index, item) {
							model.columns[item.index].width = Math.round((item.orgWidth/totalPercentage)*100) + "%";
						});
					}
				} else {
					if(noWidthColLength > 0) {						
						$(noWidthCol).each(
							function (index, item) {
                                model.columns[item.index].width = "10px";
							}
						);
					}					
					$(percentageWidthCol).each(function (index, item) {
						model.columns[item.index].width = Math.round((item.orgWidth/totalPercentage)*100) + "%";
					});
				}
				return true;
			}else{
				alert('You need to set a group of column setting!');
				return false;
			}
		},
		"_modelPageSet": function(page) {//fine
			var self = this, model= self.model;
			model.page= page;
			$.cookie(model.id+"_page", page);
		},
		/*model sort function*/
		"_modelSortByCreate": function(sortName, sortType) {//fine
            var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			model.sortBy= [];
			if (sortName && sortType) {
				sortNameArr= sortName.split(',');
				sortTypeArr= sortType.split(',');				
				$(sortNameArr).each(
					function(index, item) {
						model.sortBy.push({'sortName': item, 'sortType': sortTypeArr[index]});
					}
				);
			}else{
				model.sortBy= null;
			}
		},
		"_modelSortClient": function(sortName) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			if (options.sortRule && typeof(options.sortRule) == 'function') {
				model.hasCustomSort= true;
			}			
			if (model.hasCustomSort) {
				model.tmpData.sort(
					function(a, b) {
						return options.sortRule(a, b, model.sortType, sortName);
					}
				);
			}else{
				model.tmpData.sort(
					function(a, b) {
						if (model.sortType == 'desc') {
							if (a[model.sortName] > b[model.sortName]) return -1;
							if (a[model.sortName] < b[model.sortName]) return 1;
						}else{
							if (a[model.sortName] < b[model.sortName]) return -1;
							if (a[model.sortName] > b[model.sortName]) return 1;
						}
						return 0;				
					}
				);		
			}			
		},
		"_modelSortReset": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;	
			model.sortBy= null;
			model.onSort= false;
			view.columns.removeClass("onSort sort_asc sort_desc");			
			self._modelSortSetCookie(null);	
		},
		"_modelSortSetCookie": function(sortBy) {//fine
			var self = this, options = self.options, model= self.model, sortNameArr=[], sortTypeArr= [];
			if (sortBy && sortBy.length > 0) {
				$(sortBy).each(
					function(index, item) {
						sortNameArr.push(item.sortName);
						sortTypeArr.push(item.sortType);
					}
				);
				$.cookie(model.id+ "_sortName", sortNameArr.join(','));
				$.cookie(model.id+ "_sortType", sortTypeArr.join(','));
			}else{
				$.cookie(model.id+ "_sortName", null);
				$.cookie(model.id+ "_sortType", null);
			}
		},
		"_modelSortSetInfo": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, newSort= [];
			if (model.sortBy) {
				newSort= $.grep(model.sortBy,
					function(value) {					
						return value.sortName != model.sortName? true : false;
					}
				);
			}
			
			model.sortBy= newSort;
			model.sortBy.push({'sortName': model.sortName, 'sortType': model.sortType});			
			self._modelSortSetCookie(model.sortBy);
		},
		"_viewInitial": function() {//fine
			//init basic elements;
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			$.extend(
				view,
				{	
					"thead": $('<thead></thead>'),
					"sizeControler": $('<tr></tr>').addClass('sizing_row'),
					"headerTitle": $('<tr></tr>').addClass('header_title'),
					"cbxAll": $('<input type="checkbox" />').attr('id', model.id + '_CheckAll').attr('name', model.id + '_CheckAll').addClass('check_all_checkbox'),
					"filterSelections": [],
					"tbody": $('<tbody></tbody>').addClass('row_container'),                    
					"columns": [],
					//behavior area dom
					"behaviorArea": $('<tr></tr>').addClass('behaviorArea'),
					"behaviorAreaTh": $('<th></th>'),                    
					//search box dom
					"searchBoxContainer": $('<span></span>').addClass('search_box'),
					"searchBox": $('<input/>').attr('size', 25).addClass('searchBox text ui-widget-content').val(options.searchTip),
                    "searchBoxActionBtn": $('<div></div>').addClass('actionBtn'),
					//time range dom
					"timeRange": $('<div></div>').addClass('timeRange'),
					"timeRangeLabel": $('<span></span>').addClass('timeRangeLabel').val(options.timeRange[0].value).html(options.timeRange[0].name),
					"timeRangeTitle": $('<span class="timeRangeTitle label">Time range:</span>'),
					"timeRangeSetList": $('<div></div>').addClass('setList'),					
					"timeRangeOptionList": $('<ul></ul>').addClass('optionList'),
					"timeRangeOptionItems": null,
					"timeRangeTempText": $('<div></div>').addClass('TempTimeRange'),
					"datePickerArea": $('<div></div>').addClass('datePickerArea'),
					"dateMsgBox": $('<div></div>').addClass('dateMsgBox'),
					"datePicker": $('<div></div>').addClass('datePicker'),
					"dataPickerGroup": $('<ul></ul>'),
					"timeRangeCancelBtn": $('<a></a>').addClass('cancelBtn').tmButton({ "name": "Cancel", "click": function() { view.grid.trigger("mousedown");}}),
					"timeRangeOkBtn": $('<a></a>').addClass('okBtn').tmButton({"name": "OK", "click": function(evt) { view.timeRange.trigger('change.tmGrid'); control._applyTimeRangeCustomized(evt);}, 'focused': true}),
                    "filterLabel": $('<span></span>').addClass('filterLabel label'),
                    "filterSelection": $('<select></select>').addClass('filter').append($('<option>All</option>').val('')),
					//action items dom
                    "actionItemArea": $('<tr></tr>').addClass('actionItemArea'),
                    "actionItemAreaTh": $('<th></th>'),
					"actionGroup": $('<ul></ul>').addClass('actionGroup'),
					//resizeHandler;
					"resizeHandler": $('<span></span>').addClass('resizeHandler'),                   
					"resizeHelper": $('<div><span></span></div>').addClass('resizeHelper'),
                    "resizeBaseLine": $('<div></div>').addClass('resizeBaseLine'),
                    "resizeHandlers": null,
                    //drag column;
                    "dragArea": $('<div class="dragArea"></div>').css('position', 'absolute'),
                    "dragAreaContainer": $('<ul class="dragAreaContainer"></ul>'),
                    "dragHelper": $('<li class="dragHelper"></li>').css('top', 0),
					//pagination domain
					"pagination": $('<ul></ul>').addClass('pagination'),
					"records": $('<li></li>').addClass('records').append('Records: '),
					"startCont": $('<span></span>').addClass('pager_start_cont'),
					"endCount": $('<span></span>').addClass('pager_end_cont'),
					"totalCount": $('<span></span>').addClass('pager_total_cont'),
					"firstBtn": $('<li></li>').addClass('btn btn_first disabled'),
					"prevBtn": $('<li></li>').addClass('btn btn_prev disabled'),
					"pageInput": $('<li></li>').addClass('pageInput'),
					"currentPager": $('<input type="text"/>').addClass('pager_current_page'),
					"totalPage": $('<span></span>').addClass('pager_total_page'),
					"nextBtn": $('<li></li>').addClass('btn btn_next disabled'),
					"lastBtn": $('<li></li>').addClass('btn btn_last disabled'),
					"perPageList": $('<li></li>').addClass('per_page'),
					"perPage": $('<select></select>'),
					//others dom
					"emptyContainer": $('<tr></tr>').addClass("emptyContainer first last").append($('<td></td>').addClass('first last')),
					"progressLayer": $('<div></div>').addClass('progressLayer'),
					"progress": $('<div></div>').addClass('progress'),
					"messageBox": $('<div></div>').addClass('messageBox'),
					"tfoot": $('<tfoot></tfoot>'),
					"tfootTd": $('<td></td>'),
                    "trs": null,
                    "trInfo": { "tr": null, "checkBox": null},                   
					"selectedItem": [],
                    //alias Grid
                    "aliasGrid": view.grid.clone().removeAttr("id").addClass("ui-tmGrid aliasGrid"),
                    "aliasSizeControler": null,
                    "aliasHeaderTitle": null,
                    "aliasTbody": null,
                    "aliasTbodyTr": $("<tr></tr>")                
				}
			);
            view.aliasTbody = view.tbody.clone().append(view.aliasTbodyTr);
            view.aliasSizeControler = view.sizeControler.clone().append($("<th></th>"));
            view.aliasHeaderTitle = view.headerTitle.clone();
            view.aliasGrid
                .append(
                    view.thead.clone()
                        .append(view.aliasSizeControler)
                        .append(view.aliasHeaderTitle)
                )
                .append(view.aliasTbody);
                //.insertAfter(view.grid);
			//header elements
			view.grid
				.addClass('ui-tmGrid')
                .addClass(model.disabled == true? 'disabled' : '')
				.append(
					view.thead
						.append(view.sizeControler)
						.append(view.behaviorArea.append(view.behaviorAreaTh))
                        .append(view.actionItemArea.append(view.actionItemAreaTh))
						.append(view.headerTitle)
				);
			//behavior action item/search box/time range
			self._viewSettingActionItems();
            self._viewSettingSearch();
			self._viewSettingTimeRange();            
			//columns setting
			self._viewSettingColumns();            
			//pagination setting
			self._viewSettingPagination();
			//main data grid
			view.grid.append(view.tbody);
			//Footer
			view.tfoot.append($('<tr></tr>').append(view.tfootTd)).appendTo(view.grid);
			//set colspan of header and footer
		},
		"_viewSettingActionItems": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;	
			if (model.hasAction === true) {
				view.actionItemArea.addClass('actionItems');
				view.actionGroup.show();
			}else{
				view.actionItemArea.removeClass('actionItems');
				view.actionGroup.hide();
			}            
            view.actionGroup.children().unbind().remove();
            view.actionItemAreaTh.prepend(view.actionGroup);
            $(model.actionItems).each(
                function(index, item) {
                    var newItem= $('<li></li>')
                        .addClass('itemList')
                        .addClass(item.disabled? 'buttonDisabled': "")
                        .attr('status', item.disabled? 'disabled' : 'enabled')								
                        .append(
                            $('<span></span>')
                                .addClass('listContainer '+(item.className || ""))
                                .append(item.name || '')
                        )
                        .appendTo(view.actionGroup);
                    model.actionItems[index].element= newItem;
                    options.actionItems[index].element= newItem;
                }
            );
            self._utility.disableSelection(view.actionGroup);
		},
		"_viewSettingSearch": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			if (model.hasSearch === true) {
				view.behaviorArea.addClass('searchBar');
				view.searchBoxContainer.show();
			}else{
				view.behaviorArea.removeClass('searchBar');
				view.searchBoxContainer.hide();
			}
			view.behaviorAreaTh.append(view.searchBoxContainer.append(view.searchBox).append(view.searchBoxActionBtn));           
		},
        "_viewSettingColumns": function() {//fine           
			var self = this, 
                options = self.options,
                model = self.model,
                view = self.view,
                control = self.control,		
                column = $('<th></th>'),
                columnTitle = $('<div></div>').addClass('column_title'),
                columnsLength = model.columns.length,
                columnSpan = 0;            
			view.sizeControler.children().remove();
			view.headerTitle.children().remove();
            options.showColumnTitle === true? view.headerTitle.show() : view.headerTitle.hide();
			if (model.hasSelection && model.hasMulti) {
                columnSpan += 1;
				view.sizeCheckAll = $('<th style="width: 25px;"></th>')
					.addClass('sizeCheckBoxAll')
					.appendTo(view.sizeControler);					
				$('<th></th>')
					.addClass('checkBoxAll')
					.append(columnTitle.clone().append(view.cbxAll))
					.appendTo(view.headerTitle);
			}            
            $(model.columns).each(
				function(index, item) {
					var sizeColumnControler = column.clone().attr('column', index)
							.data('orgWidth', item.width)
							//.addClass('col_' + (index+1))
							.appendTo(view.sizeControler),
                        newColumnTitle = columnTitle.clone().append(item.name || ''),
                        newColumn = column.clone()
                            .addClass(item.textAlign === 'left'? '' : item.textAlign)
                            .attr('column', index)
							.data({
								"data": item,
								"dataIndex": index
							})
                            .bind('mouseenter.tmGrid', function(evt) {
                                if(newColumn.has('.progress').length > 0 || view.grid.is('.onResize, onDrag')) {
                                    return;
                                }
                                if (self._utility.isEllipsisActive(newColumn, view.aliasHeaderTitle, view)) {
                                    newColumn.attr('title', newColumn.text());
                                }                                
                            })
                            .bind('mouseleave.tmGrid', function(evt) {
                                newColumn.removeAttr('title');																
                            })         
							.append(newColumnTitle)
							.appendTo(view.headerTitle),                        
                        newFilterLabel,
                        newFilterSelection,
                        resizeWidth;
                    model.columns[index].sizeColumn = sizeColumnControler; 
                    model.columns[index].titleColumn = newColumn;
                    columnSpan += 1;
                    if (index === 0) {
                        newColumn.addClass('first');                        
                    }
                    if (index === columnsLength - 1) {
                        newColumn.addClass('last');                        
                    }                  
					if (model.hasSort && item.sortable === true) {
						newColumn.addClass('sortable').attr('sortName', item.sortIndex || item.index);
					}					
					if (item.filter) {
                        view.behaviorArea.addClass('filter');
                        newFilterLabel = view.filterLabel.clone().text(item.name + ':');
						newFilterSelection =  view.filterSelection.clone().data('key', item.index);
                        newFilterLabel.add(newFilterSelection).insertBefore(view.searchBoxContainer);
                        //console.log(item.filter);
                        $(item.filter).each(
							function(index, item) {
								newFilterSelection.append(
									$('<option ></option>')
										.text(item.name ? item.name:"")
										.val(item.index)
										.attr('selected', item.selected ? true : false )
								)
							}
						);                        
					}
					if (options.resizable === true) {
						newColumn.addClass('resizable').append(view.resizeHandler.clone(true));
					}   
                    if (model.hasDrag == true) {                        
                        newColumn.addClass('draggable');                        
                    }
                    view.tfootTd.add(view.behaviorAreaTh).add(view.actionItemAreaTh).attr('colspan', columnSpan);
				}
			);			
			view.sizeColumns = $('th:not(".sizeCheckBoxAll")', view.sizeControler);
            view.columns = $('th:not(".checkBoxAll")', view.headerTitle);        
			view.filterSelections = $('select.filter', view.thead);
			view.resizeHandlers = $('.resizeHandler', view.thead);
            $('.label:eq(0)', view.behaviorAreaTh).addClass('first');
            //columns size
            //console.log("columns init");
            self._viewColumnSize(model.columns);
            if (view.grid.parent().length > 0) {
                view.aliasGrid.watch('clientWidth', function (propertyName, oldValue, newValue) {
                    self._viewGridResize();
                });
            }
		},
        "_viewColumnSize": function (columns) {
            var self = this, 
                options = self.options,
                model = self.model,
                view = self.view,
                control = self.control,                
                columnsLength = columns.length,
                //gridWidth = view.grid.width(),
                gridWidth = view.aliasGrid.insertAfter(view.grid).width(),
                resizeWidth,
                currentCol,
                needResizeCols = [],
                needResizeColsLength,
                needResizeColsOrgWidth = [],
                restPercentWidth,
                DestinationWidth;
                model.gridWidth = gridWidth;
                //view.body.append(model.gridWidth);
            //view.aliasGrid.remove();
            //console.log("total width:" + model.gridWidth);
            if(gridWidth !== 0) {
                if ($.browser.mozilla) {
                    gridWidth = gridWidth - (columnsLength - 1) - 1;
                } else {
                    gridWidth = gridWidth - (columnsLength - 1) - 2;
                }
                if (model.hasSelection && model.hasMulti) {
                    gridWidth -= (parseInt(view.sizeCheckAll.css('width'), 10) + 1);
                }
                DestinationWidth = gridWidth;
                for (var index = 0; index < columnsLength; index += 1) {
                    resizeWidth = columns[index].width;
                    if (resizeWidth.indexOf('px') > -1) {        
                        //view.sizeColumns[index].style.width = resizeWidth;
                        columns[index].sizeColumn.css('width', resizeWidth);
                        DestinationWidth -= parseInt(resizeWidth, 10);
                    } else {                        
                        //needResizeCols.push(view.sizeColumns[index]); 
                        needResizeCols.push(columns[index].sizeColumn[0]); 
                        needResizeColsOrgWidth.push(resizeWidth);
                    }
                }
                needResizeColsLength = needResizeCols.length;                
                restPercentWidth = DestinationWidth;
                for (var index = 0; index < needResizeColsLength; index += 1) {                    
                    resizeWidth = parseInt(needResizeColsOrgWidth[index], 10);
                    if(index === (needResizeColsLength - 1)) {
                        resizeWidth = restPercentWidth;
                    } else {                
                        resizeWidth = Math. round((  resizeWidth / 100 ) * DestinationWidth);                        
                        restPercentWidth -= resizeWidth;
                    }
                    needResizeColsOrgWidth[index] = resizeWidth;
                }
                self._viewColumnResize(needResizeCols, needResizeColsOrgWidth, DestinationWidth, DestinationWidth);
            } else {
                for (var index = 0; index < columnsLength; index += 1) {
                    resizeWidth = columns[index].width;
                    //view.sizeColumns[index].style.width = resizeWidth;
                    columns[index].sizeColumn.css('width', resizeWidth);
                }
                model.resizableStatus = true;
            }
        },
        "_viewColumnResize" : function (needResizeCols, needResizeColsOrgWidth, needResizeColsTotalWidth, DestinationWidth) {
            var self = this,
                options = self.options,
                model = self.model,
                view = self.view,
                control = self.control,              
                needResizeColsLength = needResizeCols.length,
                currentCol,
                resizeColWidth,
                leftTotalWidth,
                normalCols;
                indexCol = 0;                
                setResize = function (width) {
                    leftTotalWidth = width;
                    normalCols = [];
                    for (index = 0; index < needResizeColsLength; index += 1) {                       
                        currentCol = needResizeCols[index];
                        resizeColWidth = Math.round((needResizeColsOrgWidth[index] / needResizeColsTotalWidth) * width);
                        if(resizeColWidth <= 10) {
                            resizeColWidth = 10;
                            currentCol.style.width =  "10px";                            
                            needResizeCols[index] = null;
                            needResizeColsOrgWidth[index] = null;
                            DestinationWidth -= resizeColWidth;
                            leftTotalWidth -= resizeColWidth;
                        } else {                            
                            normalCols.push(resizeColWidth);
                            leftTotalWidth -= resizeColWidth;                            
                        }
                    }
                    needResizeColsTotalWidth = 0;
                    needResizeColsOrgWidth = $.grep(needResizeColsOrgWidth, function (item) {
                        if(item != null) {
                            needResizeColsTotalWidth += item;
                            return true;
                        } else {
                            return false;
                        }
                    });
                    needResizeCols = $.grep(needResizeCols,function(item){
                        return(item);
                    });
                    if( needResizeCols.length != needResizeColsLength) {
                        needResizeColsLength = needResizeCols.length;                                    
                        setResize (DestinationWidth);
                    }                     
                },                
                fixSize = function (index) {                    
                    if(leftTotalWidth > 0){
                        normalCols[index] += 1;
                        leftTotalWidth -= 1;                        
                    } else if (leftTotalWidth < 0) {                        
                        if( normalCols[index] > 10) {                            
                            normalCols[index] -= 1;
                            leftTotalWidth += 1;
                        }
                    }
                    if(leftTotalWidth != 0) {
                        index += 1;
                        if(index == needResizeColsLength) {
                            index = 0;
                        }
                        fixSize(index);
                    }
                };
            setResize(DestinationWidth);
            fixSize(indexCol);
            for(var index = 0; index < needResizeColsLength; index += 1) {
                needResizeCols[index].style.width = normalCols[index] + 'px';
            }            
            model.resizableStatus = true;   
            view.resizeHelper.add(view.resizeBaseLine).hide();
        },
		"_viewGridResize": function () {
            var self = this, 
                options = self.options, 
                model= self.model, 
                view= self.view,
                control= self.control,
                gridWidth = view.aliasGrid.insertAfter(view.grid).width(),
                columnsLength = model.columns.length,         
                currentCol,
                currentWidth,
                needResizeCols = [],
                needResizeColsOrgWidth = [],
                needResizeColsLength,
                needResizeColsTotalWidth = 0;
                //view.aliasGrid.remove();          
                //console.log(gridWidth);
                if (view.grid.is(":visible") === false || gridWidth == 0) {
                    return;
                }
                if(model.resizableStatus !== true) {
                    return;
                }
                if (gridWidth == model.gridWidth) {
                    model.resizableStatus = true;
                    return;
                }
                if ($.browser.mozilla) {
                    gridWidth = gridWidth - (columnsLength - 1) - 1;
                } else {
                    gridWidth = gridWidth - (columnsLength - 1) - 2;
                }
                if (model.hasSelection && model.hasMulti) {
                    gridWidth -= (parseInt(view.sizeCheckAll.css('width'), 10) + 1);
                }
                DestinationWidth = gridWidth;         
             
                for (var index = 0; index < columnsLength; index += 1) {
                    currentCol = model.columns[index].sizeColumn[0];
                    currentWidth = parseInt(currentCol.style.width, 10);
                    if(model.columns[index].width.indexOf("%") > -1) {
                        needResizeCols.push(currentCol);
                        needResizeColsOrgWidth.push(currentWidth);
                        needResizeColsTotalWidth += currentWidth;
                    } else {
                        DestinationWidth -= currentWidth;
                    }
                }
                needResizeColsLength = needResizeCols.length;
                //control.timeout = setTimeout( function () {
                    model.resizableStatus = false;
                    model.gridWidth = gridWidth;
                    self._viewColumnResize(needResizeCols, needResizeColsOrgWidth, needResizeColsTotalWidth, DestinationWidth);
               /*}, 50);*/
        },
        "_viewSettingPagination": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			model.hasPagination == true? view.tfoot.show() : view.tfoot.hide();			
			$(options.limits).each(
				function(index, item) {
					view.perPage.append($('<option></option>').val(item).text(item));
				}
			);				
			view.perPage.val(model.limit);
			view.pagination
				.append(
					view.records
						.append(view.startCont)
						.append('&nbsp;-&nbsp;')
						.append(view.endCount)
						.append(' / ')
						.append(view.totalCount)
				)
				.append(view.firstBtn)
				.append(view.prevBtn)
				.append(
					view.pageInput
						.append('Page&nbsp;&nbsp;')
						.append(view.currentPager)
						.append('&nbsp;&nbsp;/ ')
						.append(view.totalPage)
				)
				.append(view.nextBtn)
				.append(view.lastBtn)
				.append(
					view.perPageList
						.append(view.perPage)
						.append('&nbsp;&nbsp;per page')
				)
				.appendTo(view.tfootTd);				
		},
		"_viewRowCreation": function(data) {//fine
			var self = this, options = self.options, model = self.model, view = self.view, control= self.control,
                dataLength = 0, rowLength, columnsLength = model.columns.length, hasIndex,
                tmpContainer = $('<div class="tmpContainer"></div>').appendTo(view.body), columnContainer = $('<div class="columnContainer"></div>').appendTo(view.body), newRow = $('<tr></tr>'), newCol = $('<td></td>').data('rowspan', 0), 
                customizeCol, brotherCol, relatedCols,
                cellRender = function (keys, keyLevel, data, columnIndex, currentNode, rowData) {                 
                    var currentKey = keys[keyLevel], nextKey = keys[keyLevel + 1], currentNodeKey, parentNodekey, currentData;                        
                    currentNodeKey = currentNode;
                    if( currentKey.indexOf('[]') > -1) {                                             
                        if (data == undefined) {
                            currentData = [];
                        } else {
                            currentData = data[currentKey.replace('[]', '')];
                        }                        
                        if (currentData.length > 0) {                            
                            $(currentData).each(
                                function (cursor, cursorData) {                                 
                                    currentNodeKey = currentNode + '.' + currentKey.replace('[]', '(' + cursor + ')');                   
                                    if (nextKey) {
                                        cellRender(keys, keyLevel + 1, cursorData, columnIndex, currentNodeKey, rowData);
                                    } else {
                                        model.columns[columnIndex].dataColumns = model.columns[columnIndex].dataColumns.add(
                                            customizeCol = newCol.clone().data('rowspan', 0)
                                                .addClass(model.columns[columnIndex].textAlign === 'left'? '' : model.columns[columnIndex].textAlign)
                                                .attr('column', columnIndex)
                                                .attr('node', currentNodeKey)
                                                .appendTo(columnContainer)
                                        );
                                        model.columns[columnIndex].tmpRowCount += 1;
                                        parentNodekey = currentNodeKey.split('.');
                                        parentNodekey.pop();
                                        if (parentNodekey.length > 0) {
                                            customizeCol.attr('relatednode', parentNodekey.join('.'));
                                        }
                                        setCellContent(customizeCol, cursorData, rowData, columnIndex);
                                    }
                                }
                            );
                        } else {
                            currentNodeKey = currentNode + '.' + currentKey.replace('[]', '(0)');                            
                            if (nextKey) {
                                cellRender(keys, keyLevel + 1, undefined, columnIndex, currentNodeKey, rowData);
                            } else {                                
                                model.columns[columnIndex].dataColumns = model.columns[columnIndex].dataColumns.add(
                                    customizeCol = newCol.clone().data('rowspan', 0)
                                        .addClass(model.columns[columnIndex].textAlign === 'left'? '' : model.columns[columnIndex].textAlign)
                                        .attr('column', columnIndex)
                                        .attr('node', currentNodeKey)
                                        .appendTo(columnContainer)
                                );
                                model.columns[columnIndex].tmpRowCount += 1;
                                parentNodekey = currentNodeKey.split('.');
                                parentNodekey.pop();
                                if (parentNodekey.length > 0) {
                                    customizeCol.attr('relatednode', parentNodekey.join('.'));
                                }
                                setCellContent(customizeCol, undefined, rowData, columnIndex);
                            }
                        }
                    } else {                        
                        model.columns[columnIndex].dataColumns = model.columns[columnIndex].dataColumns.add(
                            customizeCol = newCol.clone()
                                .addClass(model.columns[columnIndex].textAlign === 'left'? '' : model.columns[columnIndex].textAlign)
                                .data('rowspan', 0)                                
                                .attr('column', columnIndex)                                
                                .attr('node', currentNodeKey)
                                .appendTo(columnContainer)
                        );
                        model.columns[columnIndex].tmpRowCount += 1;                        
                        parentNodekey = currentNodeKey.split('.');
                        parentNodekey.pop();
                        if (parentNodekey.length > 0) {
                            customizeCol.attr('relatednode', parentNodekey.join('.'));
                        }
                        setCellContent(customizeCol, data? data[currentKey] : undefined, rowData, columnIndex);
                    }
                },
                getRelatedNode = function (node, tmptable) {         
                    var catchedNode = null, relatedNodeName = node.attr('relatednode'), existNode;                    
                    if (relatedNodeName) {
                        catchedNode = columnContainer.find('td:[node="' + relatedNodeName + '"]');
                        setExistRelatedSpan(node, tmptable);             
                        if (catchedNode.length > 0) {
                            catchedNode.each(setRowspan)
                            catchedNode = catchedNode.add(getRelatedNode(catchedNode.eq(0), tmptable));
                        }
                    }
                    return catchedNode;
                },
                getBrotherNode = function (node) {
                    var brotherNodeName = node.attr('node');                      
                    return columnContainer.find('td:[node="' + brotherNodeName + '"]');
                },
                setRowspan = function (index, item) {
                    var thisItem = $(item), rowspan = thisItem.data('rowspan') + 1;
                    thisItem.data('rowspan', rowspan);                    
                    if (rowspan > 1) {
                        thisItem.attr('rowspan', rowspan);                    
                    }
                },
                setExistRelatedSpan = function (node, tmptable) {
                    var catchedNode, relatedNodeName = node.attr('relatednode');
                    
                    if (relatedNodeName) {                        
                        existNode = $('td:[node="' + relatedNodeName + '"]', tmptable);
                        if (existNode.length > 0) {
                            existNode.each(setRowspan)
                            setExistRelatedSpan(existNode.eq(0), tmptable);
                        }                        
                    }
                },                
                setCellContent = function (col, content, rowData, cellIndex) {
                    var renderer = model.columns[cellIndex].renderer, tooltip = model.columns[cellIndex].tooltip;
                    if (renderer && typeof(renderer) == 'function') {
                        renderer(customizeCol, content, rowData);
                    } else {
                        if(content === undefined || content === "" || content == null){
                            if (options.noValueSubstitute) {                                
                                col.addClass('Substitute').text(options.noValueSubstitute);
                            }else{                                
                                col.html('&nbsp;');
                            }
                        } else {
                            if (typeof(content) === 'string') {                                
                                col.text(content);
                            } else {                                
                                col.text(JSON.stringify(content)); 
                            }
                        }
                    }
                    self._viewSetTooltop(col);
                },
                setLastRowCols = function (col, currentRow) {
                    var catchedNode = null, relatedNodeName = col.attr('relatednode');
                    col.addClass('lastRowCols');
                    if (relatedNodeName) {
                        catchedNode = currentRow.find('td:[node="' + relatedNodeName + '"]');                                
                        if (catchedNode.length > 0) {
                            catchedNode.each(function (index, item) {
                                setLastRowCols($(item), currentRow);
                            });
                        }
                    }
                };
            self._viewContentPrepare();
            if (model.hasPagination == true) {
				while(data.length != model.limit) {
					data.push(null);
				}
			}
            rowLength = data.length;
            if (rowLength === 0) {
                self._viewRowCreateEmptyRow(newRow.addClass('noData first last'));
            } else {
                $(data).each(
                    function(index, item) {
                        var isFirstRow = index === 0, isLastRow = index === (rowLength - 1), firstCurrentRow, lastCurrentRow,
                            rowInfo = $.extend({},view.trInfo), currentRow, coulmnsMaxLength = 0, MaxLengthCol, MaxLengthColumnIndex = 0;
                        try{
                            if (item === null || item === undefined) {
                                self._viewRowCreateEmptyRow(currentRow = newRow.clone());
                            } else {
                                dataLength += 1;                                
                                if (model.hasColumnIndex == true) {
                                    for(var index = 0; index < columnsLength; index += 1){
                                        var columnKeys = model.columns[index].index.split(".");                                        
                                        model.columns[index].tmpRowCount = 0;                                        
                                        cellRender(columnKeys, 0, item, index, "root", item);
                                        if (model.columns[index].tmpRowCount > coulmnsMaxLength) {
                                            coulmnsMaxLength = model.columns[index].tmpRowCount;
                                        }
                                        if (columnKeys.length > MaxLengthColumnIndex) {
                                            MaxLengthColumnIndex = index;
                                        }
                                        delete(model.columns[index].tmpRowCount);                                  
                                    }
                                    MaxLengthCol = $('td:[column=' + MaxLengthColumnIndex + ']', columnContainer);
                                    for(var index = 0; index < coulmnsMaxLength; index += 1) {
                                        currentRow = newRow.clone().appendTo(tmpContainer);     
                                        customizeCol= $(MaxLengthCol[index]);
                                        currentRow.append(customizeCol);
                                        brotherCol = getBrotherNode(customizeCol)
                                        currentRow.append(brotherCol);
                                        relatedCols = getRelatedNode(customizeCol, tmpContainer);
                                        currentRow.append(relatedCols);
                                        self._viewSortDataCell(currentRow);
                                    }
                                    currentRow = tmpContainer.children();
                                } else {
                                    currentRow = newRow.clone();
                                    for(var index = 0; index < columnsLength; index += 1){
                                        var isFirstColumn = index === 0, isLastColumn = index === (columnsLength - 1);                                        
                                        model.columns[index].dataColumns = model.columns[index].dataColumns.add(
                                            customizeCol = newCol.clone()
                                                .addClass(model.columns[index].textAlign === 'left'? '' : model.columns[index].textAlign)
                                                .attr('column', index)
                                                .appendTo(currentRow)
                                        );
                                        if (isLastColumn === true) customizeCol.addClass('last');
                                        if ( typeof(item) === 'string' ) {
                                            setCellContent(customizeCol, item, item, index);
                                        } else {                                                
                                            if (columnsLength > 1) {                                                    
                                                setCellContent(customizeCol, item[index], item, index);
                                            } else {
                                                setCellContent(customizeCol, item, item, index);
                                            }
                                        }
                                    }
                                }                           
                                if (model.hasSelection && model.hasMulti) {
                                    $('<td></td>')
                                        .addClass('checkBoxAll')
                                        .attr('rowspan', currentRow.length)
                                        .append(
                                            rowInfo.checkBox = $('<input>')
                                                .attr('id', model.id+'_checkBox_'+(index+1))
                                                .val(options.valueIndex? item[options.valueIndex]? item[options.valueIndex] : "" : (index+1))
                                                .attr('type', 'checkbox')
                                                .addClass('cbx')
                                        )
                                        .prependTo(currentRow.eq(0));                                
                                }
                                rowInfo.tr = currentRow;
                                view.trs.push(rowInfo);
                                view.tbody.append(currentRow);
                            }
                        }catch(e) {
                            console.log('Probably columns configuration is setted wrong or no more data can be shown!');                            
                            self._viewRowCreateEmptyRow(currentRow = newRow.clone())
                        }
                        firstCurrentRow = currentRow.first()
                            .data("value", options.valueIndex? item && item[options.valueIndex]? item[options.valueIndex] : "" : (index+1))
                            .data('data', item)
                            .bind({
                                'rowEnter.tmGrid': function(evt, orgEvt, currentRows, item) {
                                    var type= evt.type;
                                    var timeStamp= evt.timeStamp;
                                    var handleObj= evt.handleObj;
                                    $.extend(evt, orgEvt);
                                    evt.type= type;
                                    evt.timeStamp= timeStamp;
                                    evt.handleObj= handleObj;
                                    options.rowEnter(evt, currentRows, item);
                                },
                                'rowLeave.tmGrid': function(evt, orgEvt, currentRows, item) {
                                    var type= evt.type;
                                    var timeStamp= evt.timeStamp;
                                    var handleObj= evt.handleObj;
                                    $.extend(evt, orgEvt);
                                    evt.type= type;
                                    evt.timeStamp= timeStamp;
                                    evt.handleObj= handleObj;
                                    options.rowLeave(evt, currentRows, item);
                                }
                            });
                        lastCurrentRow = currentRow.last();
                        if (isFirstRow === true)
                            firstCurrentRow.addClass('first');
                        if (isLastRow === true) {
                            lastCurrentRow.addClass('last');
                            lastCurrentRow.children().each(function(index, col) {
                                setLastRowCols($(col), currentRow);
                            });
                        }
                        currentRow
                            .bind({
                                'mouseenter.tmGrid': function(evt) {
                                    currentRow.addClass('hover');
                                    if (options.rowEnter && typeof(options.rowEnter) == 'function') {
                                        firstCurrentRow.trigger('rowEnter', [evt, currentRow, item]);
                                    }
                                },
                                'mouseleave.tmGrid': function(evt) {
                                    currentRow.removeClass('hover');
                                    if (options.rowLeave && typeof(options.rowLeave) == 'function') {
                                        firstCurrentRow.trigger('rowLeave', [evt, currentRow, item]);
                                    }
                                }
                            });
                    }
                );
            }
            if (model.hasSelection === true && model.hasMulti === true) {
                if (dataLength === 0) {
                    view.cbxAll.attr('disabled', true);
                } else {
                    view.cbxAll.attr('disabled', false);
                }
            }
		},
        "_viewRowCreateEmptyRow": function (row) {
            var self = this, options = self.options, model = self.model, view = self.view, control= self.control, columnsLength = model.columns.length;
            if (model.hasSelection && model.hasMulti) {
                row.append($('<td>&nbsp;</td>').addClass('checkBoxAll'));
            }
            $(model.columns).each(
                function(index, column) {
                    var customizeCol = $('<td>&nbsp;</td>').appendTo(row), isFirstColumn = index === 0, isLastColumn = index === (columnsLength - 1);
                    if (isLastColumn === true) customizeCol.addClass('last');
                }
            );            
            view.tbody.append(row.addClass('empty').data('data', null));
        },
		"_viewSortDataCell": function (row) {
            var self = this, options = self.options, model = self.model, view = self.view, control= self.control, columnsLength = model.columns.length, currentCol;
            cellType = row.is('.header_title') === true? 'th' : 'td';           
            for(var index = 0; index < columnsLength; index += 1){
                row.append(currentCol = $(cellType + ':[column=' + index + ']', row));
                /*if (cellType == 'td') {
                    self._viewSetTooltip(currentCol, model.columns[index].tooltip); 
                }*/
                if(index == 0){
                    currentCol.addClass('first');
                } 
                if(index == columnsLength-1){
                    currentCol.addClass('last');
                }             
            }
        },
        "_viewContentPrepare": function () {
            var self = this, options = self.options, model = self.model, view = self.view, control= self.control,
                columnsLength = model.columns.length;
            view.trs = [];
            //console.log(view.trs);
            for(var index = 0; index < columnsLength; index += 1){
                model.columns[index].dataColumns = $();               
            }
        },        
        "_viewSetTooltop": function (col) {
            var self = this, options = self.options, model = self.model, view = self.view, control= self.control,
                tooltip = model.columns[col.attr('column')].tooltip,
                custmizedTitlel = col.attr('title');
            col.removeAttr('title');
            col.bind({
                'mouseenter.tmGrid': function(evt) {
                    if(view.grid.is('.onResize')) {
                        return;
                    }
                    if(tooltip === "auto") {					
                        if (self._utility.isEllipsisActive(col, view.aliasTbodyTr, view) === true) {
                            if(custmizedTitlel) {
                                col.attr('title', custmizedTitlel);
                            } else {
                                col.attr('title', col.text());
                            }
                        }
                    } else if(tooltip === true || tooltip === 'true') {						
                        if(custmizedTitlel) {
                            col.attr('title', custmizedTitlel);
                        } else {
                            col.attr('title', col.text());
                        }
                    }
                },
                'mouseleave.tmGrid': function(evt) {
                    col.removeAttr('title');																
                }
            }); 
        },
        /*view time range function*/
		"_viewSettingTimeRange": function() {//fine
			var self = this, options = self.options, model= self.model, view= self.view;			
			if (model.hasTimeRange === true) {
				view.behaviorArea.addClass('timeRangeBox');
				view.timeRange.add(view.timeRangeTitle).add(view.timeRangeTempText).show();
			}else { 
				view.behaviorArea.removeClass('timeRangeBox');
				view.timeRange.add(view.timeRangeTitle).add(view.timeRangeTempText).hide();
			}
			view.behaviorAreaTh.append(view.timeRange);			
			view.timeRangeTempText.insertAfter(view.timeRange);
			view.timeRangeTitle.insertBefore(view.timeRange);
			view.datePickerArea.children().remove();
			view.datePickerArea
				.append(view.dateMsgBox)
				.append(view.datePicker
					.append(view.dataPickerGroup
						.append(self._viewTimeRangeCustomizedDate('start'))
						.append(self._viewTimeRangeCustomizedDate('end'))
					)
				)
				.append(view.timeRangeCancelBtn)
				.append(view.timeRangeOkBtn);
			view.timeRangeOptionList.children().remove();
			view.timeRangeSetList.append(view.timeRangeOptionList);
			view.timeRange.append(view.timeRangeLabel).append(view.timeRangeSetList);
			$(options.timeRange).each(
				function(index, item) {
					var newOptions= $('<li></li>').text(item.name).appendTo(view.timeRangeOptionList);						
					index == options.timeRange.length-1? newOptions.addClass('last') : "";
					if (item.type == 'option') {
						newOptions.attr('val', item.value)
					}else if (item.type == 'customized') {							
						newOptions.attr('val', 'customized').addClass('customized');						
						view.timeRangeSetList.append(view.datePickerArea);
					}
				}
			);
			view.timeRange.addClass('disabled');
			view.timeRangeOptionItems= view.timeRangeOptionList.children();	
			view.timeRangeSetList.data("listHeight", view.timeRangeSetList.height());
			view.timeRangeOptionList.css("width",view.timeRangeSetList.width());
			
			//start to set time range value
			if (model.timeMode) {
				self._viewTimeRangeLabelInitial(self._utility.timeRangeValueToItem(model.timeMode, self));	
			}else{
				var flag= true;
				$(options.timeRange).each(
					function(index, item) {
						if (item.selected) {
							flag= false;
							self._viewTimeRangeLabelInitial(item);
							return;
						}
					}
				);
				if (flag) {
					self._viewTimeRangeLabelInitial(options.timeRange[1]);
				}
			}
			if (options.timeRangable) {
				self._viewSettingTimeRangeValue();
			}
			$(window).bind('resize.tmGrid', function(){
				self._viewTimeRangeSetListPos();
			});
        },
		"_viewSettingTimeRangeValue": function(_this) {			
			var self = this || _this, options = self.options, model= self.model, view= self.view;			
			if (model.startDate) {
				view.startDate.data("orgVal", model.startDate).data("value", model.startDate);
				view.startHours.data("orgVal", model.startH).data("value", model.startH);
				view.startMinutes.data("orgVal", model.startM).data("value", model.startM);
				view.startSeconds.data("orgVal", model.startS).data("value", model.startS);
				view.endDate.data("orgVal", model.endDate).data("value", model.endDate);
				view.endHours.data("orgVal", model.endH).data("value", model.endH);
				view.endMinutes.data("orgVal", model.endM).data("value", model.endM);
				view.endSeconds.data("orgVal", model.endS).data("value", model.endS);
				view.timeRange.removeClass("disabled");
				view.timeRangeTempText.text(model.trText);
			}else{
				setTimeout( function() {
					self._viewSettingTimeRangeValue(self);
				}, 1000);				
			}
		},
		"_viewTimeRangeCustomizedDate": function(type) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, title, date= $('<div></div>').addClass('date').data("init",false),dateLab= $('<span></span>'), timeLab= $('<span></span>'), hours= $('<div></div>').addClass('time'), minutes= $('<div></div>').addClass('time'), seconds= $('<span></span>');
			type == 'start'? title= 'From' : title= 'To';
			view[type+"Date"]= date;
			view[type+"DateLab"]= dateLab;
			view[type+"TimeLab"]= timeLab;
			view[type+"Hours"]= hours;
			view[type+"Minutes"]= minutes;
			view[type+"Seconds"]= seconds;
			return $("<li></li>")
				.append($('<div></div>').addClass('dateTitle').text(title + ':').append(dateLab))
				.append(date)
				.append(
					$('<div></div>')
						.addClass('time')
						.append(
							$('<div></div>').addClass('timeLab').text('Time: ').append(timeLab).append(seconds)
						)
						.append($('<div></div>').addClass('timeUnit').text('Hours:'))
						.append(hours)
						.append($('<div></div>').addClass('timeUnit').text('Minutes:'))
						.append(minutes)
				);
		},
		"_viewTimeRangeDataPicker": function(picker) {//fine
			var self = this, model= self.model, view= self.view, control= self.control;
			picker.datepicker(
				{
					"dateFormat": "yy/mm/dd",
					"changeMonth": true,
					"changeYear": true,
					onSelect: function(dateText, inst) {
						picker
							.data("value",dateText)
							.prev().find("span").text(dateText);
							self._modelTimeRangeSelectedTimeCheck("value");
					},
					onChangeMonthYear: function(year, month, inst) {
						var changeDate= inst.selectedYear+"/"+(inst.selectedMonth+1)+"/"+inst.selectedDay;
						picker
							.data("value",changeDate)
							.datepicker("setDate", changeDate)
							.prev().find("span").text(changeDate);
							self._modelTimeRangeSelectedTimeCheck("value");
					}
				}
			)
			.data("init",true);
		},
		"_viewTimeRangeLabelInitial": function(trMode) {//fine
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			if (trMode.type == 'customized') {
				view.timeRangeLabel.attr("val", 'customized').text(trMode.name);
				self._viewTimeRangeSetListSize("customized", "inital");
			}else{
				view.timeRangeLabel.attr("val", trMode.value).text(trMode.name);
			}
		},
		"_viewTimeRangeHide": function(evt, self) {//fine
			var target= $(evt.target), self= self, model= self.model, view= self.view, control= self.control;
            if (view.timeRange.has(target).length == 0 && view.datePickerArea.has(target).length == 0 && !target.children().is("a") && !target.is(".datePickerArea td, .ui-state-hover, .ui-icon, .datePickerArea .tm_button, .datePickerArea .tm_button span")) {
				view.timeRangeSetList.slideUp(100,
					function () {
						if (view.timeRangeLabel.attr("val") != "customized") {							
							self._viewTimeRangeSetListSize(view.timeRangeLabel.attr("val"), "hide");
						}                                   
					}
				)            
			}
		},
		"_viewTimeRangeShowHide": function(evt, self) {//fine
			var self = self, target= $(evt.target), model= self.model, view= self.view, control= self.control;
			if (!view.startDate.data("init")) {
				self._viewTimeRangeDataPicker(view.startDate);
			}			
			if (!view.endDate.data("init")) {     
				self._viewTimeRangeDataPicker(view.endDate);
			}			
			if (target.is(".timeRange, .timeRange .timeRangeLabel")) {				
				if (view.timeRangeSetList.is(":visible")) {
					view.timeRangeSetList.slideUp(100,
						function () {
							if (view.timeRangeLabel.attr("val") != "customized") {
								self._viewTimeRangeSetListSize(view.timeRangeLabel.attr("val"), "click");
							}
						}
					)
				}else{					
					view.timeRangeSetList.slideDown(100);
					self._viewTimeRangeSetListPos();
					var startDate= view.startDate.data("orgVal");
					var startHours= view.startHours.data("orgVal");
					var startMinutes= view.startMinutes.data("orgVal");
					var startSeconds= view.startSeconds.data("orgVal");
					var endDate= view.endDate.data("orgVal");
					var endHours= view.endHours.data("orgVal");
					var endMinutes= view.endMinutes.data("orgVal");
					var endSeconds= view.endSeconds.data("orgVal");
					view.startDate.data("value", startDate).datepicker( "setDate" , startDate);	
					view.startDateLab.text(startDate);
					view.endDate.data("value", endDate).datepicker( "setDate", endDate);
					view.endDateLab.text(endDate);
					self._viewTimeRangeTimeSlider(view.startHours.data("value", startHours), 0, 23, startHours, "hour");
					self._viewTimeRangeTimeSlider(view.startMinutes.data("value", startMinutes), 0, 59, startMinutes, "minute");
					view.startSeconds.data("value", startSeconds).text(":"+self._utility.numberSprintof(startSeconds, 2));
					self._viewTimeRangeTimeSlider(view.endHours.data("value", endHours), 0, 23, endHours, "hour");
					self._viewTimeRangeTimeSlider(view.endMinutes.data("value", endMinutes), 0, 59, endMinutes, "minute");
					view.endSeconds.data("value", endSeconds).text(":"+self._utility.numberSprintof(endSeconds, 2));
					view.startTimeLab.text(self._utility.numberSprintof(startHours, 2) + ":" + self._utility.numberSprintof(startMinutes, 2));			
					view.endTimeLab.text(self._utility.numberSprintof(endHours, 2) + ":" + self._utility.numberSprintof(endMinutes, 2));
					self._modelTimeRangeSelectedTimeCheck("value");
				}
			}
		},
		"_viewTimeRangeTypeSelect": function(_this, self) {//fine
			var _this= $(_this), self= self, options = self.options, model= self.model, view= self.view, control= self.control;
			if (_this.attr("val") == "customized") {
				self._viewTimeRangeSetListSize("customized", "select");				
			}else{
				view.timeRangeSetList
					.slideUp(100,
						function () {
							if (_this.attr("val") == view.timeRangeLabel.attr('val')) {
								return false;
							}
							view.timeRangeLabel.text(_this.text()).attr("val", _this.attr("val"));
							self._viewTimeRangeSetListSize(_this.attr("val"), "select");							
							view.timeRange.trigger('change.tmGrid');
							control._applyTimeRangeOption();
						}
					);					
			}			
		},
		"_viewTimeRangeSetListSize": function (mode, action) {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, setList = view.timeRangeSetList;			
			switch(mode){
			case "customized":
				action == "select"? view.datePickerArea.fadeIn(1000) : view.datePickerArea.show();
				setList
					.addClass("customized")
					.css({
						"width": 502,
						"height": 340
					})
					.find("ul li.last").addClass("actived");
				self._viewTimeRangeSetListPos();
				break;
			default:				
				view.datePickerArea.hide();				
				setList
					.removeClass("customized")
					.css({
						"width": "auto",
						"height": setList.data("listHeight")
					})
					.find("ul li.last").removeClass("actived");
				self._viewTimeRangeSetListPos();
				break;
			}
		},
		"_viewTimeRangeSetListPos": function () {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control, setList = view.timeRangeSetList;			
			if(view.grid.offset().left + view.grid.width() < view.timeRange.offset().left + 502) {
				setList.addClass("left");				
				return false;
			} else {
				setList.removeClass("left");
				return true;
			}
		},
		"_viewTimeRangeTimeSlider": function(target, min, max, defaultVal, type) {//fine	
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			target.slider(
				{
					range: "min",
					value: defaultVal,
					min: min,
					max: max,
					slide: function( event, ui ) {
						target.data("value", ui.value);						
						if (type=="hour") {
							target
								.parent()
									.find("span:first")
										.text(
											self._utility.numberSprintof(ui.value, 2) + ":" + self._utility.numberSprintof(target.next().next().data("value"), 2)
										)
										.next()
											.text(":00")
											.data("value", 0);
						}else{
							target
								.parent()
									.find("span:first")
										.text(
											self._utility.numberSprintof(target.prev().prev().data("value"), 2) + ":" + self._utility.numberSprintof(ui.value, 2)
										)
										.next()
											.text(":00")
											.data("value", 0);
						}
						self._modelTimeRangeSelectedTimeCheck("value");
					}
				}
			);
		},
		/*"_viewSearchIconZone": function(target) {//fine
			return target.offset().left + target.width() + parseInt(target.css('paddingLeft'), 10);
		},*/
		"_setOption": function(key, value) {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;	
			$.Widget.prototype._setOption.apply( this, arguments );			
			switch(key) {
				case "actionItems": //ok
                    model.actionItems =  $.extend(true, [], value);
					if (!self._modelSettingActionItems(value)) {
						self._viewSettingActionItems();
						return false;
					}else{
						self._viewSettingActionItems();
						self._controlSettingActionItems();
					}
				break;	
				case "columns": //ok
					//check columns setting
					model.columns = $.extend(true, [], value);
					if (!self._modelSettingColumns(model.columns)) {
						return false;
					}
					self._viewSettingColumns();					
					//set sort;
					model.hasSort? self._controlSettingSort() : "";	
					self.reset();					
				break;
				case "selectable":
                    model.hasSelection = value;
					if (model.hasSelection === true) {
						self._controlSelectifyEnabled();
					}else{
						self._controlSelectifyDisabled();
					}
				break;
                case "searchTip":
                    view.searchBox.val(value);
                break;
				case "dataProvider":
					if (!self._modelSettingDataProvider(value)) {
						return false;
					}
					options.dataProvider= value;
					self.reset();
					self.reload();
				break;
				case "timeRangable":
					model.onTimeRange= false;
					model.hasTimeRange= false;
					view.searchBox.data('resetable', true);
					if (self.sourceType == 'server' && value === true) {				
						if (!self._modelSettingTimeRange(options.timeRange)) {
							self.timeRange.hide();
							self.timeRangeTitle? self.timeRangeTitle.hide():"";
							self.timeRangeTempText? self.timeRangeTempText.hide():"";			
							return false;
						}else{
							self.tr="";
							self.timeRange.show();
							self.timeRangeTitle? self.timeRangeTitle.show():"";
							self.timeRangeTempText? self.timeRangeTempText.show():"";	
							//self._viewBehaviorSearchCreation('timeRangable');
							self._controlTimeRangeBox();
						}
					}else{						
						self.timeRange.hide();
						self.timeRangeTitle? self.timeRangeTitle.hide():"";
						self.timeRangeTempText? self.timeRangeTempText.hide():"";			
					}					
				break;
                case 'disabled':
                    if (value == true) {
                        view.grid
                            .addClass('disabled')
                            .trigger('onDisable');
                    } else {
                        view.grid
                            .removeClass('disabled')
                            .trigger('onEnable');
                    }
                break;
			}		
		},
		/*Private Method End*/
		/*Utility*/
		"_utility": {
			"getUniqueId": function() {
				var count= $.ui.tmGrid.prototype.count;
				return "tmGrid_"+count;				
			},
			"timeRangeFormat": function(dateTime) {//fine			
				var dateTimeSplit= dateTime.split(" ");
				var dateSplit= dateTimeSplit[0].match(/\d+/gi);
				var timeSplit= dateTimeSplit[1].match(/\d+/gi);	
				var year= parseInt(dateSplit[0],10);
				var month= parseInt(dateSplit[1],10);
				var date= parseInt(dateSplit[2],10);
				var hours= parseInt(timeSplit[0],10);
				var minites= parseInt(timeSplit[1],10);
				var setDate= new Date(year, month-1, date, hours, minites, 0, 0);
				if (year == setDate.getFullYear() && month == (setDate.getMonth() + 1) && date == setDate.getDate()) {
					if (hours < 0 || hours > 23) {
						return false;
					}
					if (minites < 0 || minites > 59) {
						return false;
					}
				}else{
					return false;
				}
				return setDate.getTime();
			},
			"timeRangeValidate": function(value) {
				var trSplit= value.split(":"), st, et;
				if (trSplit.length != 2) {
					return false;
				}else{
					st= trSplit[0];
					et= trSplit[1];
					if (st >= et) {
						return false;
					}
					return true;
				}
			},
			"timeStamp2Date": function(value) {
				var newDate= new Date();
				newDate.setTime(value*1000);
				return newDate;
			},
			"timeRangeValueToItem": function(value, self) { //8-2-1 ok				
				var options = self.options, matchItem;				
				$(options.timeRange).each(
					function(index, item) {				
						if (item.value == value) {
							matchItem= item;
						}else if (value == 'customized') {
							if (item.type == 'customized') {
								matchItem= item;
							}
						}
					}
				);	
				return matchItem;
			},
			"numberSprintof": function(d,a) {//fine	
				d= d.toString();
				if (d.length < a) {
					var c= "";
					var b= a - d.length;
					for(t= 0; t < b; t++) {
						c += "0";
					}
					c += d;
					return c;
				}else{
					return d;
				}
			},
			"isEllipsisActive": function (target, parent, view) {
                var column = target.clone().css('display', 'inline-block'), return_val = false;                
                parent.append(column);
                view.aliasGrid.insertAfter(view.grid);
                if (target.width() < column.width()) {					
					return_val = true;
				}                
               //column.add(view.aliasGrid).remove();
                column.remove();
                return return_val;
			},
            "disableSelection": function (target) {
                target
                    .disableSelection()
                    .bind('selectstart.tmGrid', function (evt) {
                         evt.preventDefault();
                         evt.stopImmediatePropagation();                    
                    });
            },
            "enableSelection": function (target) {
                target
                    .enableSelection()
                    .unbind('selectstart.tmGrid');
            }
        },
		/*Public Method Start*/
		"actionItemDisable": function(item) {
			var thisItem=[];			
			if (typeof(item) == 'object') {				
				if ($.isArray(item)) {
					if (item.length && item.length > 0) {
						$(item).each(
							function(index, icon) {
								if (icon.element) {
									thisItem.push(icon.element);
								}else if (icon.is('.itemList')) {
									thisItem.push(icon);
								}
							}
						);
					}
				}else if (item.element) {
					thisItem.push(item.element);
				}else if (item.is('.itemList')) {
					thisItem.push(item);
				}							
				$(thisItem).each(
					function(index, list) {
						list.attr('status', 'disabled').addClass('buttonDisabled');
					}
				);
			}
		},
		"actionItemEnable": function(item) {
			var thisItem=[];			
			if (typeof(item) == 'object') {				
				if ($.isArray(item)) {
					if (item.length && item.length > 0) {
						$(item).each(
							function(index, icon) {
								if (icon.element) {
									thisItem.push(icon.element);
								}else if (icon.is('.itemList')) {
									thisItem.push(icon);
								}
							}
						);
					}
				}else if (item.element) {
					thisItem.push(item.element);
				}else if (item.is('.itemList')) {
					thisItem.push(item);
				}							
				$(thisItem).each(
					function(index, list) {
						list.attr('status', 'enabled').removeClass('buttonDisabled');
					}
				);
			}
		},
		"getSelectedRows": function() {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			return view.selectedItem;
		},
		"reset": function() {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;	
			if (!self._modelSettingDataProvider(options.dataProvider)) {
				return false;
			}
			if (model.hasSort) {
				self._modelSortReset();
			}
			if (model.hasSearch) {
				self._modelSearchReset();
			}
			self._modelPageSet(0);
			$.cookie(model.id+ "_limit", model.limit);
			view.tbody.children().remove();
			control._createEmptyRow();
			return true;
		},
		"reload": function() {
			var self = this, options = self.options, model= self.model, view= self.view, control= self.control;
			if (!self._modelSettingDataProvider(options.dataProvider)) {
				return false;
			}
			self._modelPageSet(0);
            view.messageBox.hide();
            if (model.hasAction === true) {
               self._controlSettingActionItems(true);
            }
			if (model.hasTimeRange) {
				if (view.timeRangeLabel.attr("val") != "customized") {
					control._applyTimeRangeOption();
				}else{					
					self._init();
				}
			}else{
				self._init();
			}
		}
		/*Public Method End*/
	});	
	$.ui.tmGrid.prototype.count= 0;
 }(jQuery));