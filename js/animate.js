(function(){
  
  if(!window.Pld){
    window.Pld = {};
  }
  
  var pld = window.Pld;
  
  /* O argumento "element" especifica o elemento à ser animado;
   * O objeto "css" especifica as propriedades à serem animadas
   * e objeto "options" dessa função, especifica o comportamento da animação
   * e pode ter as seguintes propriedades:
   *  => duration; (Number)
   *  => queue; (Boolean)
   *  => repeat; (String ou Number)
   *  => callback; (Function)
   *  => delay; (Number)
   *  =>
   */
  
  // Essa variável controla o estado da fila de animações: executando e parado;
  
  pld.animate = function animate(element, css, callback){
    
	if(!(element && element.nodeType === 1) || typeof css !== "object"){
	  throw new Error('O parâmetro "element" deve ser do tipo "ElementNode" '+
	                  'e o "css" do tipo "object"');
	}
	
	var options;
	
	if(!options){
	  options = {};
	}
	
	for(prop in animate.defaultOptions){
	  if(options[prop] == null){
	    options[prop] = animate.defaultOptions[prop];
	  }
	}
	
	  var times = Math.floor(options.duration / 20);
	  var inc = 1;
	
	  var cssProps = {};
	  var style = element.style;
	  for(prop in css){
	    cssProps[prop] = style[prop];
	  }
	  
  	  setTimeout(function makeAnimate(){
	  
	    if(times < inc){
		  if(typeof callback === "function"){
   		    // Invoca a função callback;
	        callback();
		  }
		  return;
		}
		
	    var plus, measureUnit, newValue;
	    for(prop in css){
		
		 // Calcula o incremento necessário;
		 plus = (parseFloat(css[prop]) / (times)) * inc;
		
		  if(inc === times){
		    plus = css[prop];
		  }
		
		  var regex = /[a-z|A-Z]+/;
		
		  // Descobre a unidade de medida;
		  measureUnit = cssProps[prop].match(regex);
	      measureUnit = measureUnit ? measureUnit[0] : null;
		
		  newValue = (parseFloat(cssProps[prop]) + plus).toFixed(3);
		
		  // Se existente, adiciona a unidade de medida;
		  if(measureUnit){
		    newValue += measureUnit;
		  }
		
		  element.style[prop] = newValue;		
		
	    }
	  
	    inc++;
	  
	    setTimeout(makeAnimate, 20);
	  
	  },0);
	
  }
  
  pld.animate.queue = [];
  
  pld.animate.defaultOptions = {
    duration: 650,
	repeat: 0,
	delay: 0
  }
  
}());