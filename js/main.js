//判断是否为移动端
function isPC() {
	"use strict";
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"]; //exclude iPad
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			return false;
		}
	}
	return true;
}

//元素居中+自适应分辨率。
$(document).ready(function(){
	"use strict";
  	relocation();
});

$(window).resize(function(){
	"use strict";
	relocation();
});

function relocation(){
	"use strict";
	var allwid = window.innerWidth;
	var elewid = 910;
	if(allwid>elewid){		
		$("aside").css("left", (allwid-elewid)/2);
		$("article").css("left", (allwid-elewid)/2+10);
	}
	else{
		$("aside").css("left", 0);
		$("article").css("left", 10);
	}
}


