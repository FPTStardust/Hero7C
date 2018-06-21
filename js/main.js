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

//var isloaded = false;//判断是不是第一次打开，防止load两次
//元素居中+自适应分辨率。
$(document).ready(function(){
	"use strict";
  	relocation();

	loadhero();
	
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


function loadhero(tag){
	"use strict";
	//配置xmlrequest类
//	isloaded = true;//修改判断load的标签
	if(tag === undefined){
		var str = window.location.href;
		var tstr = str.split("=");
		if(tstr.length === 2){
			tag=tstr[1];
		}
		else{
			tag='Liruoming';
		}
			
	   
	}
	
	var xmlhttp;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET", "hero.xml", false);
	xmlhttp.send();
	var doc = xmlhttp.responseXML;
	var hero = doc.getElementsByTagName(tag)[0];
	
	$("#portimg").attr('src','img/card/'+tag+'.jpg');
	//document.getElementById("#portrait").src = "img/Card/" + tag + ".jpg#?" + Math.random();
	//alert("img/Card/"+tag + ".jpg#?"+Math.random());
	
	$("#class").text(hero.getElementsByTagName("class")[0].childNodes[0].nodeValue);
	$("#title").text(hero.getElementsByTagName("title")[0].childNodes[0].nodeValue);
	$("#ename").text(hero.getElementsByTagName("name_eng")[0].childNodes[0].nodeValue);
	$("#name").text(hero.getElementsByTagName("name")[0].childNodes[0].nodeValue);
	
	$("#gender").text(hero.getElementsByTagName("gender")[0].childNodes[0].nodeValue);
	$("#stella").text(hero.getElementsByTagName("stella")[0].childNodes[0].nodeValue);
	$("#element").text(hero.getElementsByTagName("element")[0].childNodes[0].nodeValue);
	$("#attribute").text(hero.getElementsByTagName("attribute")[0].childNodes[0].nodeValue);
	
	$("#hit").text(hero.getElementsByTagName("hit")[0].childNodes[0].nodeValue);
	$("#getNP").text(hero.getElementsByTagName("getNP")[0].childNodes[0].nodeValue);
	$("#getStar").text(hero.getElementsByTagName("getstar")[0].childNodes[0].nodeValue);
	$("#critical").text(hero.getElementsByTagName("critical")[0].childNodes[0].nodeValue);
	
	$("#atk").text(hero.getElementsByTagName("atk")[0].childNodes[0].nodeValue);
	$("#hp").text(hero.getElementsByTagName("hp")[0].childNodes[0].nodeValue);
	$("#eability").text(hero.getElementsByTagName("extra_ability")[0].childNodes[0].nodeValue);
	
	var ability = hero.getElementsByTagName("ability")[0].childNodes[0].nodeValue;
	for (var i = 1; i <= 7 ; i++)
	{
		$('#ab'+i+'i').attr('src','img/icon/level'+ability[i-1]+'.png');
		$('#ab'+i).text(ability[i-1]);
	}	
}




