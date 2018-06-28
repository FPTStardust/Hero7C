//记录目前显示的是谁以及肖像图角标。
var global_tag="";
var global_port_num=0;
var global_port_count=1;

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

//设置元素居中
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

//一组返回图片路径的函数
function icon(tag){
	"use strict";
	return 'img/icon/'+tag+'.png';
}

function cards(tag){
	"use strict";
	if(tag==='A'){
		return 'img/icon/Art.png';
	}
	if(tag==='B'){
		return 'img/icon/Burst.png';
	}
	if(tag==='Q'){
		return 'img/icon/Quick.png';
	}
}

//点击肖像切换卡面的函数，我不知道不用那么多全局变量行不行，目前想到的是这样。
function ChangePort(){
	"use strict";
	//通过取余数的方法，把顺序结构变成环形。
	global_port_num = (global_port_num + 1) % global_port_count;
	$("#portimg").attr('src','img/card/' + global_tag + global_port_num + '.jpg');
}


function loadhero(tag){
	"use strict";
//配置xmlrequest类
//isloaded = true;//修改判断load的标签
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
	xmlhttp = new XMLHttpRequest();
	//现在应该没有人用IE5和IE6了吧，这里代码简化了。
	xmlhttp.open("GET", "hero.xml", false);
	xmlhttp.send();
	var doc = xmlhttp.responseXML;
	var hero = doc.getElementsByTagName(tag)[0];
	
	global_tag = tag;
	global_port_num = 0;
	global_port_count = hero.getElementsByTagName("portCount")[0].childNodes[0].nodeValue;
	
//人物肖像	
	$("#portimg").attr('src','img/card/' + tag + global_port_num + '.jpg');

	$("#class").text(hero.getElementsByTagName("class")[0].childNodes[0].nodeValue);
	$("#title").text(hero.getElementsByTagName("title")[0].childNodes[0].nodeValue);
	$("#ename").text(hero.getElementsByTagName("name_eng")[0].childNodes[0].nodeValue);
	$("#name").text(hero.getElementsByTagName("name")[0].childNodes[0].nodeValue);
	
//配卡	
	var card_str = hero.getElementsByTagName("card")[0].childNodes[0].nodeValue;
	$("#card2").attr('src',cards(card_str[1]));
	$("#card3").attr('src',cards(card_str[2]));
	$("#card4").attr('src',cards(card_str[3]));
//基本资料	
	$("#gender").text(hero.getElementsByTagName("gender")[0].childNodes[0].nodeValue);
	$("#stella").text(hero.getElementsByTagName("stella")[0].childNodes[0].nodeValue);
	$("#element").text(hero.getElementsByTagName("element")[0].childNodes[0].nodeValue);
	$("#attribute").text(hero.getElementsByTagName("attribute")[0].childNodes[0].nodeValue);
//基本资料2	
	$("#hit").text(hero.getElementsByTagName("hit")[0].childNodes[0].nodeValue);
	$("#getNP").text(hero.getElementsByTagName("getNP")[0].childNodes[0].nodeValue);
	$("#getStar").text(hero.getElementsByTagName("getstar")[0].childNodes[0].nodeValue);
	$("#critical").text(hero.getElementsByTagName("critical")[0].childNodes[0].nodeValue);
//基本数值属性	
	$("#atk").text(hero.getElementsByTagName("atk")[0].childNodes[0].nodeValue);
	$("#hp").text(hero.getElementsByTagName("hp")[0].childNodes[0].nodeValue);
	$("#eability").text(hero.getElementsByTagName("extra_ability")[0].childNodes[0].nodeValue);
//设定基本能力	
	var ability = hero.getElementsByTagName("ability")[0].childNodes[0].nodeValue;
	for (var i = 1; i <= 7 ; i++)
	{
		$('#ab'+i+'i').attr('src','img/icon/level'+ability[i-1]+'.png');
		$('#ab'+i).text(ability[i-1]);
	}
//宝具
	
	$("#NP").html(npHtml(hero.getElementsByTagName("nobePhantasm")));
//主动技能
	$("#SK").html(skillHtml(hero.getElementsByTagName("skill")));
//固有技能
	$("#PA").html(pskillHtml(hero.getElementsByTagName("pskill")));
//传记
	$("#remark").text(hero.getElementsByTagName("remark")[0].childNodes[0].nodeValue);
}
//将宝具，技能，固有技能的信息写成HTML替换相应Div的内容。
function npHtml(NPs){
	"use strict";
	var fHtml="";	
	for (var i=0; i < NPs.length;i++) {		
		fHtml += '<div class="IF"><div class ="npname"><div class="npename">'+ NPs[i].getElementsByTagName("alter")[0].childNodes[0].nodeValue + 
			'</div><div><img class="nptype" src="'+ cards(NPs[i].getElementsByTagName("type")[0].childNodes[0].nodeValue) +
			'" height="35px"><span class="npcname">'+ NPs[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
			'</span></div><div><span class="nplevel">'+ NPs[i].getElementsByTagName("level")[0].childNodes[0].nodeValue +
			'</span> 宝具Hit数:'+ NPs[i].getElementsByTagName("hit")[0].childNodes[0].nodeValue +
			'</div></div><br><div class="npinfo"><ul><li>'+ NPs[i].getElementsByTagName("effect1")[0].childNodes[0].nodeValue +	'</li><li>';
		if(NPs[i].getElementsByTagName("effect2")[0].childNodes.length){
			fHtml += NPs[i].getElementsByTagName("effect2")[0].childNodes[0].nodeValue;
		}
		fHtml +='</li><li>';
		if(NPs[i].getElementsByTagName("effect3")[0].childNodes.length){
			fHtml += NPs[i].getElementsByTagName("effect3")[0].childNodes[0].nodeValue;
		}
		fHtml +='</li></ul><div class="remark">'+ NPs[i].getElementsByTagName("remark")[0].childNodes[0].nodeValue +'</div></div></div>';	
	}
	return fHtml;
}

function skillHtml(SKs){
	"use strict";
	var fHtml="";	
	for (var i=0; i < SKs.length;i++) {	
		fHtml += '<div class="IF"><div class="remark"><img class="skicon" src="'+ icon(SKs[i].getElementsByTagName("logo")[0].childNodes[0].nodeValue) +
			'"><span class="skillname"> '+ SKs[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
			'</span> 充能时间:'+ SKs[i].getElementsByTagName("CD")[0].childNodes[0].nodeValue +
			'回合</div><ul><li>'+ SKs[i].getElementsByTagName("effect1")[0].childNodes[0].nodeValue + '</li><li>'; 
		//如果get的effect没有内容的话，JS会终止运行，需要增加一个判断条件。
		if(SKs[i].getElementsByTagName("effect2")[0].childNodes.length){
			fHtml += SKs[i].getElementsByTagName("effect2")[0].childNodes[0].nodeValue;
		}
		fHtml += '</li><li>';
		if(SKs[i].getElementsByTagName("effect3")[0].childNodes.length){	
			fHtml += SKs[i].getElementsByTagName("effect3")[0].childNodes[0].nodeValue;
		}
		fHtml += '</li></ul><div class="remark">'+ SKs[i].getElementsByTagName("remark")[0].childNodes[0].nodeValue +'</div></div>';
	}
	return fHtml;
}
	
function pskillHtml(SKs){
	"use strict";
	var fHtml="";	
	for (var i=0; i < SKs.length;i++) {	
		fHtml += '<div class="IF"><div class="remark"><img class="skicon" src="'+ icon(SKs[i].getElementsByTagName("logo")[0].childNodes[0].nodeValue) +
			'"><span class="skillname"> '+ SKs[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
			'</span></div><ul><li>'+ SKs[i].getElementsByTagName("effect1")[0].childNodes[0].nodeValue + '</li><li>'; 
		
		if(SKs[i].getElementsByTagName("effect2")[0].childNodes.length){
			fHtml += SKs[i].getElementsByTagName("effect2")[0].childNodes[0].nodeValue;
		}
		fHtml += '</li><li>';
		if(SKs[i].getElementsByTagName("effect3")[0].childNodes.length){	
			fHtml += SKs[i].getElementsByTagName("effect3")[0].childNodes[0].nodeValue;
		}
		fHtml += '</li></ul><div class="remark">'+ SKs[i].getElementsByTagName("remark")[0].childNodes[0].nodeValue +'</div></div>';
	}
	return fHtml;
}



