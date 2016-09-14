/**
 * @fileOverview jQuery Plug-in: TmMsgBox - TrendMicro Message Box
 * 
 * @author Lock Chou
 */

/**
 * @class
 * The TmMsgBox is designed for displaying an message with different type related action button.
 * Ex. Error message of username typo, or remind infomation for password strength.
 * @example $('#element').tmmsgbox({[options]});
 * @requires jQuery 1.4.x
 *
 * @param {string}	text				Text or html content inside
 * @param {string}	type				Message type with style: "warning", "error", "info" and "ok". 
 *										Default style is "warning" when left it blank.
 * @param {Object}	actionButton		Click button for related action.
 * @param {string}	¢| value				Name of action button.
 * @param {function}¢| action			function name or anonymous function.
 * Ex.
	{
		text: "blahblah...",
		type: "info",
		actionButton: {
			value: "Update Now",
			action: function(){
				alert("Update");
			}
		}
	}
 */
;(function ($) {
	$.fn.tmmsgbox = function (options) {
		//Declare default setting: No text and "warning" type.
		var _defaultSettings = {
			text: '',
			type: 'warning',
			close_button: true
		};
		var _settings = $.extend(_defaultSettings, options);
		
		$.extend(this, {
			/**
			* This function allows you to change the content of message box. 
			* @example $('#element').setText("New text...");
			*/
			setText : function (str) {
				$(this).children().children(".text_span").text(str);
			}
		});
		function close() {
			$(this).parent(".tmmsgbox").hide();
		}			
		return this.each(function () {			
			var _this = $(this),
			_msgcontent = $("<span class='msgcontent'></span>"),					
			_text_obj = $("<span class='text_span'></span>"),
			_action_btn = $("<input class='action_btn' type='button'>");	
			_this.children().remove();  // Reset and remove all elements inside.			
			if(_settings.close_button){				
				_close_btn = $("<span class='close_btn'></span>")
				//Setup close button( MUST have ).
				.bind("click", close);
				_this.append(_close_btn);
			}			
			_this.addClass("tmmsgbox")     // Add general style of Trend Micro
			.removeClass("error info warning ok")
			.addClass(_settings.type) // Set box type [error, warning , info, ok].					
			.append(_msgcontent);
			_msgcontent
			.append(_text_obj)
			.append(_action_btn);
			_text_obj.text(_settings.text);
			//Setup action button
			if (_settings.actionButton) {
				_action_btn
				.css("display", "block")
				.val(_settings.actionButton.value)
				.bind("click", _settings.actionButton.action);
			}
			else {
				_action_btn.css("display", "none");
			}
		});
	};
})(jQuery);