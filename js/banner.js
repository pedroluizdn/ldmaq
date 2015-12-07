(function(){
  
  var Pld = window.Pld;
  
  var img_bans = document.getElementsByClassName('img-ban');
  var btns_ban = document.getElementsByClassName('btns-ban')[0]
                 .getElementsByTagName('span');
  
  function automateBanner(){
    
	var elemVisible = document.getElementsByClassName('visible')[0];
	var index;
	
	for(var a=0; a < img_bans.length; a++){
	  if(elemVisible === img_bans[a]){
	    index = a;
		break;
	  }
	}
	
	btns_ban[index].classList.remove('selected');
	
	if(index === 3){
	  index = -1;
	}
	
    //Pld.animate(elemVisible, {opacity: -1}, function(){
     // Pld.animate(img_bans[index + 1], {opacity: +1});
	//});
	
	elemVisible.classList.remove('visible');
	elemVisible.classList.add('hidden');
	img_bans[index + 1].classList.remove('hidden');
	img_bans[index + 1].classList.add('visible');
	btns_ban[index + 1].classList.add('selected');
	
	runningBanner = setTimeout(automateBanner, 6000);
	
  }
  
  var runningBanner = setTimeout(automateBanner, 6000);
  
  var banner = document.getElementsByClassName('banner')[0];
  
  banner.addEventListener('mouseover', function(){
    clearTimeout(runningBanner);
	runningBanner = null;
  }, false);
  
  banner.addEventListener('mouseout', function(){
    runningBanner = setTimeout(automateBanner, 6000);
  }, false);
  
  function changeBanner(e){
    
	var index;
	var i;
	
	if(e.target.nodeName === 'DIV'){
	  if(e.target.classList.contains('prev')){
	    i = -1;
	  }else if(e.target.classList.contains('next')){
	    i = 1;
	  }else {
	    return;
	  }
	}
	
	var elemVisible = document.getElementsByClassName('visible')[0];
	
	for(var a=0; a < img_bans.length; a++){
	  if(elemVisible === img_bans[a]){
	    index = a;
		break;
	  }
	}
	
	btns_ban[index].classList.remove('selected');
	
	index += i;
	
	if(index === 4){
	  index = 0;
	}else if(index === -1){
	  index = 3;
	}
	
	if(e.target.nodeName === 'SPAN'){
	  for(var a=0; a < btns_ban.length; a++){
	    if(e.target === btns_ban[a]){
		  index = a;
		}
	  }
	  
	  // Dá um novo tempo para o usuário visualizar o banner;
	  clearTimeout(runningBanner);
      runningBanner = setTimeout(automateBanner, 1000);
	  
	}
	
	elemVisible.classList.remove('visible');
	elemVisible.classList.add('hidden');
	img_bans[index].classList.remove('hidden');
	img_bans[index].classList.add('visible');
	btns_ban[index].classList.add('selected');
	
  }
  
  for(var b=0; b < btns_ban.length; b++){
    btns_ban[b].addEventListener('click', changeBanner, false);
  }
  
  var prev = document.getElementsByClassName('prev')[0];
  var next = document.getElementsByClassName('next')[0];
  
  prev.addEventListener('click', changeBanner, false);
  next.addEventListener('click', changeBanner, false);
  
}());