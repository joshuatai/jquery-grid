// JavaScript Document
(
	function ($) {
        var _criticalBox= parent.jQuery('<div class="criticalMask"></div>');
		$.tmAJAX= function (setting) {
			var PERMISSION_DENIED = -4;
			var NO_SESSION = -2;
			var NO_RESPONSE = -3;
			var INTERNAL_SERVER_ERROR = -1;
			var TIMEOUT = -5;
			var SUCCESS = 1;
			var USER_DATA_ERROR = 0;			
			//default message level
			var msglevel={
				CRITICAL: "critical",
				ERROR: "error",
				WARNING: "warning",
				INFO: "info"
			}
			var _messageBox= null;            
			//specific setting of ZG 
			// Default success, failure, and error functions
			// Generally, success, failure, and error will be overwritten by called
			// For .ajax compatability, error can also be overwritten
			//			
			var _success= function(data){};
			var _error= function(data){};
			// by default display a message if we have one
			// Code can use local _failure function to override
			_failure = function(data, errorcode, errormsg, errorlevel) {
				// Default behavior treats all INTERNAL_SERVER_ERRORS as critical and others as warnings
				// If an errorlevel is passed, then we assume the message has already been processed
				if (!errorlevel) {
					if (errormsg) {
						if (errorcode == INTERNAL_SERVER_ERROR) {
							_criticalError(errormsg);
						}
						else {
							_otherError(errormsg);
						}
					}
				}
			}			
				
			var _criticalError = function(message) {
				if (!message) {
					message = "System has encountered an internal error. Contact support for further help.";
				}
				
				if(parent.jQuery('body > .criticalMask').length == 0){
					if(parent.jQuery.ui.tmPopup.opened){
						var existPopup= parent.jQuery.ui.tmPopup.getOpenPopup();						
						if(existPopup){							
							existPopup.close();
						}
					}
					var _body= parent.jQuery("body");
					_criticalBox
					.appendTo(_body)                          
					.tmPopup( {
						title: 'System Error',
						closeButton: false,
						autoOpen: true,
						url:'../pages/tmPopup.php?template=critical_error_message&message='+message,
                        buttons:{
							OK:{
								click:function() {
									top.document.location.href= "../middleware_rev/handlers/login/logoff.php";
								}
							}
						}
					});                         
				}
							
			};
			var _otherError = function(message, level) {
				if(!level) {
					level = msglevel.WARNING;
				}
				if(message != "" && _messageBox){
					var close_button= true;								
					if(level == msglevel.ERROR){									
						//close_button= false;
					}
					_messageBox.tmmsgbox( {
						"text": message,
						"type": level,
						"close_button": close_button
					}).show();
				}
			};					
			var _statusHandler= function(status, message, level, messageBox){
				if(messageBox){
					_messageBox= messageBox;
				}
				switch(status){
					case SUCCESS:
					return true;
					case USER_DATA_ERROR: case INTERNAL_SERVER_ERROR:
						if(level && level != msglevel.CRITICAL){
							_otherError(message, level);
							return false;
						}else{							
							_criticalError(message);
						}
					break;
					case NO_SESSION: case PERMISSION_DENIED:
						if(parent){
							parent.window.location.reload();
						}else{
							window.location.reload();
						}
					break;
					case NO_RESPONSE://It's not in use now.
					break;
					default:
					break;
				}
			};			
			if(setting.success){
				_success= setting.success;
			}		
			if (!setting.cache) {
				setting.cache = false;
			}			
			if (!setting.dataType) {
				setting.dataType = "json";
			}
			if(setting.error){
				_error= setting.error;
			}
			if (setting.failure) {
				_failure = setting.failure;
			}
			if(setting.statusHandler){
				_statusHandler= setting.statusHandler;
			}
			if(setting.messageBox){				
				_messageBox= setting.messageBox.hide();
			}			
			setting.success= function(data,xhrstatus,xhrobj){			
				function success_main(data) {
					if (data) {
						// errorcode = failure
						var ec = data["@errorcode"];
						var em = data["@errordescription"] || data["@errormsg"];
						if (ec || em) {
	
							if (!ec) {
								ec = 0;
							}
							_failure(data,ec, em);
							return;
						}
						// result : success = success; anything else failure
						else if (data["@status"] || data.result || data.status ) {	
							//alert(isNaN(data.status)+ ":"+ data.status+":"+ setting.url);
							if (data["@status"] == "INFO.OK.0000" || data.status == 'INFO.OK.0000' || data.result=='status.success' || data.result == 'success' || data.status == 'status.success' ) {
								if (setting.failOnNoResponse) {
									if (!data.response) {
										_failure(data,0,data["@status"]);
										return;
									}
								}
								_success(data);
								return;
							}
							// status : 1 = success, anything else = failure
							else if (!isNaN(data.status)) {
								if(data.msglevel == "undefined"){
									data.msglevel= msglevel.ERROR;
								}
								if(data.message == "undefined" || data.message == ""){
									data.message= "";
								}
								if(_statusHandler(data.status, data.message, data.msglevel)){
									_success(data);
								}else{
									_error(data);
								}							
							}
							else {
								_failure(data,USER_DATA_ERROR,data["@status"]);
							}
						}						
						// Assume anything else is success
						else {
							_success(data);
						}
					}
					// Handle the error condition where we receive no data at all
					else {
						_failure(data,NO_RESPONSE,null);
					}
				}
			    // called after giving the unload handler to give us the info
			    function empty_validate(data) {
				    var pd = $(document).data('pagedead');
				    if (pd) {
					    return;
				    }
				    else {success_main(data)}
			    }				
			    // zero probably means navigation away from page				
			    if (xhrobj.status == 0) {
				setTimeout(empty_validate,30);
			    }
			    else {	
				    success_main(data);
			    }
			}

			// Error function will redirect to login for permission denied
			// otherwise, will pass to tmAjax or custom error function
			setting.error = function (xhr, textStatus, errorThrown) {
				try{
					if (xhr.status && (xhr.status == 403 || xhr.status == 401) ) {
						_statusHandler(PERMISSION_DENIED);
						return;
					}
				}catch(e){
					
				}
				// when the connection is failed or server side time out.
				// No longer do any processing. Instead, call the _failure function
				// default function will display an error message				
				// Two hardcoded messages that should be localized
				if(textStatus == "timeout"){
					_failure(null,TIMEOUT,"timeout");
				}
				else {
					_failure(null,INTERNAL_SERVER_ERROR, "System has encountered an internal error. Contact support for further help.");
				}				
			}
			// Additional custom settings
			if (setting.trimJSON) {
				var jkey, jval;
				var newJSON = {};
				for (jkey in setting.trimJSON) {
					if (setting.trimJSON.hasOwnProperty(jkey)) {
						jval = $.trim(setting.trimJSON[jkey]);
					       newJSON[jkey] = jval;
					}
				}
				var optionString = $.toJSON(newJSON);
				if (setting.data) {
					setting.data.option = optionString;
				}
				else {
					setting.data = {"option":optionString};
				}
				delete setting.trimJSON;
			}
			if (setting.headers) {
				// in Jquery 1.5 this function is not needed
				var theseHeaders = setting.headers;
				var oldBeforeSendFunc = function() {};
				if (setting.beforeSendFunc) {
					oldBeforeSendFunc = setting.beforeSendFunc;
				}
				var beforeSendFunc =  function(xhr) {
					var head;
					for (head in theseHeaders) {
						if (theseHeaders.hasOwnProperty(head)) {
							xhr.setRequestHeader(head,theseHeaders[head]);
						}
					}
					oldBeforeSendFunc(xhr);
				}
				setting.beforeSend = beforeSendFunc;
			}
			if (setting.serializeForm) {
				if (typeof setting.serializeForm != 'object') {
					var sObj = {};
					sObj.selector = setting.serializeForm;
					setting.serializeForm = sObj;
				}
				var form = $(setting.serializeForm.selector);
				if (form.length == 1) {
					// Convert form to object array
					// Duplicate names are joined together in an array
					// the result is serialized to json text and set as "settings"
					// requires json serialization library to be loaded
					var arr = form.serializeArray();
					var json = {};
					for (i in arr) {
						if (typeof arr[i] == 'function') {
							continue;
						}
						var n = arr[i].name;
						var v = arr[i].value;
						if (json[n]) {
							if (typeof json[n] == 'object') {
								json[n].push(v);
							}
							else {
								var newArr = Array();
								newArr.push(json[n]);
								newArr.push(v);
								json[n] = newArr;
							}
						}
						else {
							json[n] = v;
						}
					}
					// Force some options to Array and set some missing checkboxes to false
					// Array transformation:
					if (setting.serializeForm.arrays) {
						sa = setting.serializeForm.arrays;
						if (typeof sa != 'object') {
							var arr = [];
							arr[0] = sa;
							sa = arr;
						}
						for (var i=0;i<sa.length;i++) {
							var jsonKey = sa[i];
							if (typeof json[jsonKey] != 'object') {
								var tmpArr = [];
								tmpArr[0] = json[jsonKey];
								json[jsonKey] = tmpArr;
							}
						}
					}
					// For checkboxes, we get a list of default (unchecked) values
					// We set them if there is none
					if (setting.serializeForm.defaults) {
						var cd = setting.serializeForm.defaults;
						if (typeof cd == 'object') {
							for (var i in cd) {
								var jsonKey = i;
								if (!json[jsonKey]) {
									json[jsonKey] = cd[jsonKey];
								}
							}
						}
					}	
							


					var optionString = "option="+$.toJSON(json);
					if (setting.data) {
						setting.data += "&"+optionString;
					}
					else {
						setting.data = optionString;
					}
				}
				delete setting.serializeForm;
			}
			/*
			// Append timestamp to GET requests to force IE refresh
			// Will not occur if type is explicitly specified as GET
			// Removed sinse this is automatic with jquery code
			if ((setting.data)&&(!setting.type)) {
				setting.data += "&_zgts="+ new Date().getTime();
			}
			*/
			
			
			var thisAjax = $.ajax(setting);
			// kill the ajax if user navigates from page
			$(document).unbind("killAjax").bind("killAjax", function(e) {
				$(document).data('pagedead',true);

			});
			$(document).data("pagedead",false);
			// workaround to let ajax requests know they are no longer neeeded
			window.onbeforeunload = function() { $(document).data('pagedead',true); }			
			//$(window).unload( function () { $(document).trigger('killAjax'); } );
			$.tmAJAX.statusHandler=_statusHandler;
			return thisAjax;
		}
        $.tmAJAX.setCriticalBox= function(message){    
            if (!message) {
                message = "System has encountered an internal error. Contact support for further help.";
            }
            if(parent.jQuery('body > .criticalMask').length == 0){
                if(parent.jQuery.ui.tmPopup.opened){
                    var existPopup= parent.jQuery.ui.tmPopup.getOpenPopup();						
                    if(existPopup){							
                        existPopup.close();
                    }
                }
                var _body= parent.jQuery("body");
                _criticalBox
                .appendTo(_body)                          
                .tmPopup( {
                    title: 'System Error',
                    closeButton: false,
                    autoOpen: true,
                    url:'../pages/tmPopup.php?template=critical_error_message&message='+message,
                    buttons:{
                        OK:{
                            click:function() {
                                top.document.location.href= "../middleware_rev/handlers/login/logoff.php";
                            }
                        }
                    }
                });                         
            }
        }
	}
)(jQuery);
