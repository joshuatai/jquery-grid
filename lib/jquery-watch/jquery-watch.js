/*
* jQuery Watch 1.2.0 -- http://plugins.jquery.com/project/watch
*
* Copyright (c) 2009 SolutionStream.com & Michael J. Ryan (http://tracker1.info/)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
* 
* ===============================================================================================
*
*	Provides an interface to objects matching the Mozilla JS (1.2) Object.prototype.watch 
*	method.  This uses a timer to determin changes, so rapidly changing items may miss 
*	some property changes.  This is a rough timer for some general use, not precision observer
*	patterns.
*
*	EXAMPLE:
*			function watchCallbackExample(propertyName, oldValue, newValue) {
*				alert("o." + propertyName + " changed from " + oldValue + " to " + newValue);
*			}
*			
*			//bind a watch event to a callback
*			jQuery(o).watch("someProperty", watchCallbackExample)
*				
*			//unbind a watch event from a callback
*			jQuery(o).unwatch("someProperty", watchCallbackExample);
*
*			//unbind all callbacks from a watched property
*			jQuery(o).unwatch("someProperty");
*
*			//unbind all callbacks for all watched properties
*			jQuery(o).unwatch();
*
* ===============================================================================================
*
*	1.0.0	Initial Release (watch only)
*	
*	1.2.0	Add unwatch methods
*			Remove internal use of Object.prototype.watch support unreliable in the latest FF3.5
*/
(function($) {
	//how often to rerun the genericWatchTimer below, increase this when debugging.
	var timerCycle = 100; //milliseconds (100 = 1/10 second)
	var watchedObjects = [];	//objects to be watched
	var watchedCallbacks = [];	//properties, prior values & callback methods
	var watchTimer = null;

	//jQuery extension method
	$.fn.watch = function(propertyName, callbackMethod) {
		for (var i = 0; i < this.length; i++) {
			var o = this[i];
			watchIt(o, propertyName, callbackMethod); //use timer based watch/check
		}
	}
	
	$.fn.unwatch = function(propertyName, callbackMethod) {
		for (var i = 0; i < this.length; i++) {
			var o = this[i];
			unwatchIt(o, propertyName, callbackMethod); //use timer based watch/check
		}
	}
	
	//add an object/property/callback item to the list.
	function watchIt(obj, propertyName, callbackMethod) {
	
		propertyName = String(propertyName); //force to string
		
		//object must exist, have a propertyName property and the callback must be a function
		if (!(obj && propertyName in obj && typeof callbackMethod == "function"))
			return; //nothing to do/add

//alert(propertyName)
		var item, props, prop, oldval, newval;
		for (var i=0; i<watchedObjects.length; i++) {
			if (obj != watchedCallbacks[i]) continue;
			
			item = watchedObjects[i];
			props = watchedCallbacks[i];
			
			for (var j=0; j<props.length; i++) {
				prop = props[j];
				if (prop.name != propertyName) continue;
				prop.callbacks.push(callbackMethod);
				return; //found prop match
			}
			
			//no prop match, insert one
			props.push({ "name":propertyName, oldValue:obj[propertyName], callbacks:[callbackMethod] })
			return;
		}

		//no object match found
		watchedObjects.push(obj);
		watchedCallbacks.push([{ "name":propertyName, oldValue:obj[propertyName], callbacks:[callbackMethod] }]);
	}
	
	//remove an object/property/callback item (nestable) from the list.
	//	null for propertyName and/or callbackMethod will be a wildcard match.
	function unwatchIt(obj, propertyName, callbackMethod) {
		var props, remprops, prop, pname;
		for (var i=0; i<watchedObjects.length; i++) {
			if (obj == watchedObjects[i]) {
				props = watchedCallbacks[i];
				remprops = [];
				for (var j=0; j<props.length; j++) {
					if (!propertyName || propertyName == props[j].name) {
						prop = props[j];
						for (var k=0; k < prop.callbacks.length; k++) {
							var cb = prop.callbacks[k];
							if (!callbackMethod || cb == callbackMethod) {
								prop.callbacks.splice(k,1);
								k--;
							}
						}
						if (!prop.callbacks.length)
							remprops.push(prop.name);
					}
				}
				
				//remove unneeded properties from the watch list
				remitems: 
				while (remprops.length) {
					pname = remprops.pop();
					for (var j=0; j<props.length; j++) {
						if (props[j].name == pname) {
							props.splice(j, 1);
							continue remitems;
						}
					}
				}
				
				//remove unneeded objects from the watch list
				if (props.length == 0) {
					watchedObjects.splice(i, 1);
					watchedCallbacks.splice(i, 1);
				}
				
				return; //done with match
			}
		}
	}
	
	
	//watch handler for browsers without a watch
	function wind() { //wind the watch
		watchTimer = window.setTimeout(genericWatchTimer, timerCycle);
	}
	function genericWatchTimer() {
		/**************************************************
			NOTE: IF YOU ARE DEBUGGING, YOU MAY WANT TO 
			INCREASE THE timerCycle VARIABLE ABOVE
		**************************************************/
		var item, props, prop, oldval, newval;
		for (var i=0; i<watchedObjects.length; i++) {
			item = watchedObjects[i];
			props = watchedCallbacks[i];
			for (var j=0; j<props.length; j++) {
				prop = props[j];
				newval = item[prop.name];
				if (prop.oldValue != newval || typeof(prop.oldValue) != typeof(newval)) {
					for (var k=0; k<prop.callbacks.length; k++) {
						prop.callbacks[k].call(item, prop.name, prop.oldValue, newval);
						prop.oldValue = newval;
					}
				}
			}
		}
		wind();
	}
	wind();
	
	
})(jQuery);