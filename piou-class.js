/**
 * Allows to create class ease
 * @author hakurou
 * @version 1.0.6
 */
(function(){
	"use strict";
	
	// Namespace creation for this lib
	if(typeof window.piou == "undefined")
		window.piou = {};
		
	/**
	 * Create a new class
	 * @param prps				Class definition in json notation
	 * @return Object			Return the new class
	 */
	function klass(prps)
	{
		var parent = null;
		var currentClass = null;
		
		// Parent definition if exists
		if(prps.hasOwnProperty("extend$"))
			parent = prps.extend$;
		
		// Choose a constructor for our class
		currentClass = klass.getConstruct(prps, parent);

		// Copying of parent static methods
		if(parent != null)
			currentClass = klass.cloneProperties(currentClass, parent);
			
		if(prps.hasOwnProperty("static"))
		{
			currentClass = klass.cloneProperties(currentClass, prps["static"]);
			delete prps["static"];
		}
		
		// Inherit
		var Cl = function(){ this.constructor = currentClass; };
		Cl.prototype.__parent = __parent;
		
		if(parent != null)
			Cl.prototype = klass.cloneProperties(Cl.prototype, parent.prototype);
	
		currentClass.prototype = new Cl();
		
		// Set new properties in the new class 
		currentClass.prototype = klass.cloneProperties(currentClass.prototype, prps);
		
		return currentClass;
	}	
	
	/**
	 * Choose a constructor for our class
	 * @param prps
	 * @param parent
	 * @return Function
	 */
	klass.getConstruct = function(prps, parent)
	{
		var currentClass = null;
		if(prps.hasOwnProperty("__construct"))
			currentClass = prps.__construct;
		else
		{
			if(parent != null)
				currentClass = function(){ return parent.apply(this, arguments); };
			else
				currentClass = function(){};
		}
		
		var ctr = function(){
			// Clone properties otherwise they are references to the main model
			for(var i in this)
				if(typeof this[i] != "function")
					this[i] = klass.clone(this[i]);

			currentClass.apply(this, arguments);
		}
		
		return ctr;
	};
	
	/**
	 * Clone all properties from source to target
	 * @param Object target					
	 * @param Object source					
	 */
	klass.cloneProperties = function(target, source)
	{
		for(var i in source)
			target[i] = klass.clone(source[i]);
			
		return target;
	};
	
	/**
	 * Clone a property and returns it
	 * @param Mixed element
	 * @return Mixed
	 */
	klass.clone = function(element)
	{
	    if(element == null || typeof element != "object")
	        return element;
	   
	    var newElement = element.constructor();
	   
	    for(var i in element)
	        newElement[i] = klass.clone(element[i]);
	   
	    return newElement;
	};
	
	/**
	 * Method définition for parent method access
	 * @return String method
	 * @return Array args
	 * @return Mixed
	 */
	function __parent(method, args)
	{
		if(typeof this.extend$ == "undefined")
			return null;
			
		var parts = method.match(/^(\.*)(.*)$/);
		var cur = this.extend$.prototype;
		
		if(parts.length > 0)
		{
			var dot = parts[1];
			var methodName = parts[2];
			var nbParents = dot.length;
			
			if(nbParents > 0)
				for(var i = 0; i < nbParents; ++i)
					if(cur.hasOwnProperty("extend$"))
						cur = cur.extend$.prototype;
					else
						return null;
					
			if(cur.hasOwnProperty(methodName))
			{
				if(args == null)
					args = [];
					
				return cur[methodName].apply(this, args);
			}
		}
		
		return null;
	};
		
	// Global access
	klass.version = "1.0.4";
	window.piou.defClass = klass;
})();
