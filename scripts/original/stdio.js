function ChildWindow(owner, name, opt, oldref) {
	this.owner = owner;
	this.name = name;
	this.opt = opt;
	this.childwin = oldref;
}
ChildWindow.prototype.open = function(url, contents, newwin_func, staywin_func) {
	var isReady = false;
	try {
		isReady = (typeof this.childwin !== 'undefined' && !this.childwin.closed && this.childwin.opener == this.owner);
	} catch(e) {}
	if (!isReady) {
		var tmpwin = this.owner.open(url, this.name, this.opt);
		try {
			tmpwin.opener.location; //test
		} catch(e) {
			tmpwin.close();
			this.childwin = undefined;
			return undefined;
		}
		tmpwin.document.write(contents);
		tmpwin.document.close();
		this.childwin = tmpwin;
		newwin_func(this.childwin);
	} else {
		staywin_func(this.childwin);
	}
	this.owner.parent.init.childwindows.push(this);
	return this.childwin;
}

ChildWindow.prototype.open2 = function(url){
	var isReady = false;
	try {
		isReady = (typeof this.childwin !== 'undefined' && !this.childwin.closed && this.childwin.opener == this.owner);
	} catch(e) {}
	if (!isReady) {
		var tmpwin = this.owner.open(url, this.name, this.opt);
		try {
			tmpwin.opener.location; //test
		} catch(e) {
			tmpwin.close();
			this.childwin = undefined;
			return undefined;
		}
		this.childwin = tmpwin;
	}
	return this.childwin;
}


function initNavi() {
//	var targetid = parent.CTL.document.ctl.hitdisplay.value;
	if (parent.CTL.document.ctl.mode.value=="navi_sym") {
		var targetid = (parent.CTL.document.ctl.hitdisplay_sym.value == 0) ? parent.CTL.document.ctl.current.value : parent.CTL.document.ctl.hitdisplay_sym.value;
	} 
	else if (parent.CTL.document.ctl.mode.value=="navi_dtc") {
		var targetid = (parent.CTL.document.ctl.hitdisplay_dtc.value == 0) ? parent.CTL.document.ctl.current.value : parent.CTL.document.ctl.hitdisplay_dtc.value;
	} else {
		var targetid = (parent.CTL.document.ctl.hitdisplay.value == 0) ? parent.CTL.document.ctl.current.value : parent.CTL.document.ctl.hitdisplay.value;
	}
	
	if (parent.CTL.document.ctl.mode.value=="navi" || parent.CTL.document.ctl.mode.value=="navi_sym") {
		targetid = parent.CTL.document.ctl.current.value;
		if (targetid != 0) {
			if (targetid.substr(8,2)=="00") {
				toggle('z');
			} else if (targetid.substr(8,2)=="99") {
				toggle('y');
			} else {
				toggle(targetid.substr(8,1));
			}
			toggle(targetid.substr(8,2));
			if (targetid.substr(10,1)!="0") {
				toggle(targetid.substr(8,3));
			}
			toggle(targetid.substr(8,4));
			loadSIE(targetid,'0');
		}
	}

//	parent.CTL.document.ctl.hitdisplay.value = "0";
//	setMode('navi');
	
//	alert(id);
}
	

function setMode(mode) {
// check start index
// alert(parent.location.toString());
// console.log("parent.CTL.document.ctl.mode.value:" + parent.CTL.document.ctl.mode.value + ", mode:" + mode);
	if (parent.CTL.document.ctl.mode.value == "") {
		if (parent.location.toString().indexOf("?")!=-1) {
			if (parent.location.toString().toLowerCase().indexOf("start=torque")!=-1) {
				setHistory(parent.CTL.document.ctl.mode.value,"navi_torq");
				parent.CTL.document.ctl.mode.value = "navi_torq";
				setActiveBtn("navi_torq");
				loadTtmList('all','torque');
				markAllButton();
			} else if (parent.location.toString().toLowerCase().indexOf("start=maintenance")!=-1) {
				setHistory(parent.CTL.document.ctl.mode.value,"navi");
				parent.CTL.document.ctl.mode.value = "navi";
				setActiveBtn("navi");
				showMaintSie();
			} else if (parent.location.toString().toLowerCase().indexOf("start=data")!=-1) {
				setHistory(parent.CTL.document.ctl.mode.value,"navi_service");
				parent.CTL.document.ctl.mode.value = "navi_service";
				setActiveBtn("navi_service");
				loadSdmList('1','loadsdm');
			} else if (parent.location.toString().toLowerCase().indexOf("start=tool")!=-1) {
				setHistory(parent.CTL.document.ctl.mode.value,"navi_tool");
				parent.CTL.document.ctl.mode.value = "navi_tool";
				setActiveBtn("navi_tool");
				loadTtmList('all','tool');
				markAllButton();
			} else if (parent.location.toString().toLowerCase().indexOf("start=dtc")!=-1) {
				setHistory(parent.CTL.document.ctl.mode.value,"navi_dtc");
				parent.CTL.document.ctl.mode.value = "navi_dtc";
				setActiveBtn("navi_dtc");
				loadDtcList('all');
				markAllButton();
			} else {
				if (parent.CTL.document.ctl.mode.value == mode) {
					return;
				}
				setHistory(parent.CTL.document.ctl.mode.value,mode);
				parent.CTL.document.ctl.mode.value = mode;
				setActiveBtn(mode, false); // 'NAVI' frame is not loaded. 
			}
		} else {
			if (parent.CTL.document.ctl.mode.value == mode) {
				return;
			}
			setHistory(parent.CTL.document.ctl.mode.value,mode);
			parent.CTL.document.ctl.mode.value = mode;
			setActiveBtn(mode, false); // 'NAVI' frame is not loaded. 
		}
		setTBparams();
	} else {
		if (parent.CTL.document.ctl.mode.value == mode) {
			return;
		}
		setHistory(parent.CTL.document.ctl.mode.value,mode);
		parent.CTL.document.ctl.mode.value = mode;
		setActiveBtn(mode); 
	}
}


function setActiveBtn(act, doLoad) {
    if (typeof doLoad === "undefined") doLoad = true;
//alert(act);
// Changed order to split process into button settings and loading target doc
// to fix bug in IE9 standards mode
// brp 11116

// Set nav buttons
	if (act=="search") {
		parent.NAVI_TOP.document.getElementById("div_search").style.display="block";
	} else {
		parent.NAVI_TOP.document.getElementById("div_search").style.display="none";
	}
	if (act=="navi") {
		parent.NAVI_TOP.document.getElementById("div_navi").style.display="block";
	} else {
		parent.NAVI_TOP.document.getElementById("div_navi").style.display="none";
	}
	if (act=="navi_dtc") {
		parent.NAVI_TOP.document.getElementById("div_navi_dtc").style.display="block";
	} else {
		parent.NAVI_TOP.document.getElementById("div_navi_dtc").style.display="none";
	}
	if (act=="search_dtc") {
		parent.NAVI_TOP.document.getElementById("div_search_dtc").style.display="block";
	} else {
		parent.NAVI_TOP.document.getElementById("div_search_dtc").style.display="none";
	}
	if (act=="navi_sym") {
		parent.NAVI_TOP.document.getElementById("div_navi_sym").style.display="block";
	} else {
		parent.NAVI_TOP.document.getElementById("div_navi_sym").style.display="none";
	}
	if (act=="search_sym") {
		parent.NAVI_TOP.document.getElementById("div_search_sym").style.display="block";
	} else {
		parent.NAVI_TOP.document.getElementById("div_search_sym").style.display="none";
	}
	if (act=="navi_service" || act=="search_sdm") {
		parent.NAVI_TOP.document.getElementById("btnServ").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnServ").className="button";
	}
	if (act=="navi_spec" || act=="search_spec") {
		parent.NAVI_TOP.document.getElementById("btnSpec").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnSpec").className="button";
	}
	if (act=="navi_scan") {
		parent.NAVI_TOP.document.getElementById("btnScan").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnScan").className="button";
	}
	if (act=="navi_tool") {
		parent.NAVI_TOP.document.getElementById("btnTool").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnTool").className="button";
	}
	if (act=="navi_torq") {
		parent.NAVI_TOP.document.getElementById("btnTorq").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnTorq").className="button";
	}
	if (act=="navi_mat") {
		parent.NAVI_TOP.document.getElementById("btnMat").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnMat").className="button";
	}

	if (act=="navi" || act=="search") {
		parent.TOP.document.getElementById("btnBook").className="button_clicked";
	} else {
		parent.TOP.document.getElementById("btnBook").className="button";
	}
	if (act=="navi_dtc" || act=="search_dtc") {
		parent.NAVI_TOP.document.getElementById("btnDtc").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnDtc").className="button";
	}
	if (act=="navi_sym" || act=="search_sym") {
		parent.NAVI_TOP.document.getElementById("btnSym").className="button_clicked";
	} else {
		parent.NAVI_TOP.document.getElementById("btnSym").className="button";
	}
	if (act=="navi_dtc" || act=="search_dtc" || act=="navi_sym" || act=="search_sym") {
		parent.TOP.document.getElementById("btnDtcSym").className="button_clicked";
		parent.NAVI_TOP.document.getElementById("div_dtc_sym").style.display="block";
	} else {
		parent.TOP.document.getElementById("btnDtcSym").className="button";
		parent.NAVI_TOP.document.getElementById("div_dtc_sym").style.display="none";
	}
	if (act=="navi_service" || act=="navi_spec" || act=="navi_scan" || act=="search_sdm" || act=="search_spec") {
		parent.TOP.document.getElementById("btnService").className="button_clicked";
		parent.NAVI_TOP.document.getElementById("div_service").style.display="block";
	} else {
		parent.TOP.document.getElementById("btnService").className="button";
		parent.NAVI_TOP.document.getElementById("div_service").style.display="none";
	}
	if (act=="navi_tool" || act=="navi_torq" || act=="navi_mat") {
		parent.TOP.document.getElementById("btnTool").className="button_clicked";
		parent.NAVI_TOP.document.getElementById("div_tool").style.display="block";
	} else {
		parent.TOP.document.getElementById("btnTool").className="button";
		parent.NAVI_TOP.document.getElementById("div_tool").style.display="none";
	}
	
// Load target doc
    if (!doLoad) return;

	parent.TOP.xmlloader.rewriteByMode(act);
}

function setHistory(prevmode,mode) {
var currentlist = parent.CTL.document.ctl.backlist.value;
var currentsie = parent.CTL.document.ctl.current.value;
	if (mode=="navi") {
		if (prevmode=="search") {
			parent.CTL.document.ctl.backlist.value=currentsie + "," + parent.CTL.document.ctl.backlist_nav.value;
		} else {
			parent.CTL.document.ctl.backlist.value=parent.CTL.document.ctl.backlist_nav.value;
			parent.CTL.document.ctl.current.value=parent.CTL.document.ctl.current_nav.value;
		}
	} else if (mode=="navi_dtc") {
		if (prevmode=="search_dtc") {
			parent.CTL.document.ctl.backlist.value=currentsie + "," + parent.CTL.document.ctl.backlist_dtc.value;
		} else {
			parent.CTL.document.ctl.backlist.value=parent.CTL.document.ctl.backlist_dtc.value;
			parent.CTL.document.ctl.current.value=parent.CTL.document.ctl.current_dtc.value;
		}
	} else if (mode=="navi_sym") {
		if (prevmode=="search_sym") {
			parent.CTL.document.ctl.backlist.value=currentsie + "," + parent.CTL.document.ctl.backlist_sym.value;
		} else {
			parent.CTL.document.ctl.backlist.value=parent.CTL.document.ctl.backlist_sym.value;
			parent.CTL.document.ctl.current.value=parent.CTL.document.ctl.current_sym.value;
		}
	}
	if (prevmode=="navi") {
		parent.CTL.document.ctl.backlist_nav.value=currentlist;
		parent.CTL.document.ctl.current_nav.value=currentsie;
	} else if (prevmode=="navi_dtc") {
		parent.CTL.document.ctl.backlist_dtc.value=currentlist;
		parent.CTL.document.ctl.current_dtc.value=currentsie;
	} else if (prevmode=="navi_sym") {
		parent.CTL.document.ctl.backlist_sym.value=currentlist;
		parent.CTL.document.ctl.current_sym.value=currentsie;
	}

//	alert(parent.CTL.document.ctl.mode.value);
}

function setTBparams() {
	strTB = "0";
	strDC = "0";
	if (parent.location.toString().indexOf("?")!=-1) {
		var strUrl = parent.location.toString();
		var params = strUrl.substr(strUrl.indexOf("?") + 1);
		params = params.toLowerCase();
		if (params.indexOf("tb=")!=-1) {
			strTB = params.substr(params.indexOf("tb=") + 3);
			if (strTB.indexOf("&")!=-1) {
				strTB = strTB.substr(0,strTB.indexOf("&"));
			}
		}
		if (params.indexOf("dc=")!=-1) {
			strDC = params.substr(params.indexOf("dc=") + 3);
			if (strDC.indexOf("&")!=-1) {
				strDC = strDC.substr(0,strDC.indexOf("&"));
			}
		}
	}
}


function toggle(id) {
//	alert(id);
	objImg=parent.NAVI.document.getElementById("mk" + id);
	objBlock=parent.NAVI.document.getElementById("blk" + id);
	if (objBlock) {
		visible=(objBlock.style.display!="none")
		if (visible) {
			objBlock.style.display="none";
			objImg.src="../../icon/closed.gif";
			divs=parent.NAVI.objBlock.getElementsByTagName("div")
			for (i=0;i<divs.length;i++) {
				if (divs[i].id.substr(0,3)=="blk") {
					divs[i].style.display="none";
				}
			}
			imgs=objBlock.getElementsByTagName("img")
			for (i=0;i<imgs.length;i++) {
				if (imgs[i].id.substr(0,2)=="mk") {
					imgs[i].src="../../icon/closed.gif";
				}
			}
		} else {
			objBlock.style.display="block";
			objImg.src="../../icon/open.gif";

			if (id.length==2) {
				if (objBlock.getElementsByTagName("div").length==0) {
					objBlock.innerHTML=parent.TOP.getInnerNaviHtml(id);
				}
			}
		}
	}
}

function expand(id) {
//	alert(id);
	objImg=parent.NAVI.document.getElementById("mk" + id);
	objBlock=parent.NAVI.document.getElementById("blk" + id);
	if (objBlock) {
		objBlock.style.display="block";
		objImg.src="../../icon/open.gif";
	}
}

function SendFunctionCode(code) {
//	alert(code);
	try{
		window.external.SendFunctionCode(code);
	} catch (e) {
		alert(code);
	}
}

function loadSIE(id,back) { 
	var backlist = parent.CTL.document.ctl.backlist;
	var fwdlist = parent.CTL.document.ctl.fwdlist;
	var UI_lang = parent.CTL.document.ctl.lang.value;

	parent.CTL.document.ctl.current.value = id;

try{
	markSie(id,back);
}catch(e){
	if(parent.TOP.xmlloader.enableManualLinkage){
		throw new Error("Error: SIE ID not found!");
	}
}
	if (!back) {
		backlist.value=id + "," + backlist.value;
		fwdlist.value="0";
	}

	var strSource = "../" + id + ".xml";

	if (id.length==10) {
		strSource = "../" + id + "/" + id + ".htm";
		parent.MAIN.document.location.href = strSource;
	} else {
		var loader = parent.TOP.xmlloader;
		loader.writeTo(parent.MAIN, strSource, "../../config8_am/suzuki_all.xsl", {"UI_lang": UI_lang, "ManualLinkage": loader.enableManualLinkage});
	}
}

function markAll(obj) {
// Reset all ALL icons to red
	spans=parent.NAVI.document.getElementsByTagName("span")
	for (i=0;i<spans.length;i++) {
		if (spans[i].className=="all_icon") {
			spans[i].style.backgroundColor="#ff0000";
		}
	}
	
	if (obj.className=="all_icon") {
		obj.style.backgroundColor="#ffcc00";
	}
}


function showLoading(id,type) {
// Show that data is loading
// Set vars for loading redirect
parent.TOP.load_id = id;
parent.TOP.load_type = type;

src = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n';
src = '<html>\n';
src += '<head><title>Loading</title>\n';
src += '<style type="text/css">\n';
src += 'body{font-family:sanserif;color:#000000;font-size:14px;background-color:#ffffff;margin: 6px;}\n';
src += '</style>\n';
src += '<script type="text/javascript">\n';
src += 'function doLoad() { \n';
src += '	id = parent.TOP.load_id; \n';
src += '	type = parent.TOP.load_type; \n';
// src += '	alert(id); \n';
src += '	if (type=="tool" || type=="torque" || type=="material") { \n';
src += '		parent.TOP.loadTtmList(id,type,"loading"); \n';
src += '	} \n';
src += '	else if (type=="dtc") { \n';
src += '		parent.TOP.loadDtcList(id,"loading"); \n';
src += '	} \n';
src += '	else if (type=="loadsdm") { \n';
src += '		parent.TOP.loadSdmList(id,"","loading"); \n';
src += '	} \n';
src += '} \n';
src += '\n';
src += 'function doDelay() { \n';
// src += '	alert(); \n';
src += '	setTimeout(doLoad,200); \n';
src += '}\n';
src += '</script>\n';
src += '</head>\n';
src += '<body onload="doDelay();">\n';
src += '<div id="content">Loading...</div>';
src += '</body>';
src += '</html>';

	parent.MAIN.document.open();
	parent.MAIN.document.write(src);
	parent.MAIN.document.close();
	
}


function loadTtmList(id,type,state) { 
	var UI_lang = parent.CTL.document.ctl.lang.value;
	if (!state && id == 'all') {
		showLoading(id,type);
		return;
	}
//	alert("after check state");
	var mode = type + "list";
	parent.TOP.xmlloader.writeToByMode(parent.MAIN, mode, { "targetID":id, "type": type});
}

function loadDtcList(id,state) { 
	var UI_lang = parent.CTL.document.ctl.lang.value;
	if (!state && id == 'all') {
		var type = "dtc";
		showLoading(id,type);
		return;
	}
	parent.TOP.xmlloader.writeToByMode(parent.MAIN, "dtclist", {"UI_lang": UI_lang, "targetID": id});
}

function loadSdmList(id,type,state) { 
	var UI_lang = parent.CTL.document.ctl.lang.value;
	if (!state && type == 'loadsdm') {
		showLoading(id,type);
		return;
	}
	parent.TOP.xmlloader.writeToByMode(parent.MAIN, "sdmlist", {"UI_lang": UI_lang, "targetID": id});
}

function loadSpecList(id) { 
	var UI_lang = parent.CTL.document.ctl.lang.value;
	parent.TOP.xmlloader.writeToByMode(parent.MAIN, "speclist", {"UI_lang": UI_lang, "targetID": id});
}

function loadScanList(id) { 
	var UI_lang = parent.CTL.document.ctl.lang.value;
	parent.TOP.xmlloader.writeToByMode(parent.MAIN, "scanlist", {"UI_lang": UI_lang, "targetID": id});
}

function showMods(obj) {
//	alert("Show mods!");
	var showMods = parent.CTL.document.ctl.showmods.value;
	if (document.styleSheets[0].cssRules) {
		myRules = document.styleSheets[0].cssRules;
	} else {
		myRules = document.styleSheets[0].rules;
	}
	if (showMods=='off') {
		obj.style.backgroundColor='#ffcc00';
		parent.CTL.document.ctl.showmods.value='on';
		myRules[myRules.length - 1].style.display='inline';
		parent.TOP.loadModsList();
	} else {
		obj.style.backgroundColor='#ffffff';
		parent.CTL.document.ctl.showmods.value='off';
		myRules[myRules.length - 1].style.display='none';
	}
}

function showModPdf(sieid) {
	var pdfFile = "../pdf/" + sieid + ".pdf";
	newWin=window.open(pdfFile,"","menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=820,height=640,resizable=yes");
		newWin.focus();
}


function xref(id) {
//UI_lang = "";
aaaa="";
file="";
htmlMain="";

	if (id.length==15) {
		var file="../" + id + ".xml";
	} else {
		var subid=id.substr(0,15);
		var current=document.getElementsByTagName("div")[0].id;
//alert(subid);
//alert(current);
		if (subid!=current) {
			if (id.indexOf("#")!=-1) {
				aaaa=id.substr(id.indexOf("#")+1);
			} else {
				aaaa=id;
			}
			var file="../" + subid + ".xml";
		} else {
			movehash(id);
		}
	}
	
	if (file!="") {

		if (parent.XREFMAIN || parent.PREXMAIN) {
			var motherwindow = parent.opener;
		} 
		else {
			var motherwindow = window;
		}
// open new xrefWin if not already open
		var childwindow = new ChildWindow(motherwindow, "LinkWindow", "menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=820,height=640,resizable=yes", motherwindow.parent.TOP.xrefWin);
			var src = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">\
<html>\
<head>\
<meta http-equiv="Content-Type" content="text/html; charset=utf-16">\
<title>Xref Window</title>\
<script>\
var file = "'+ file + '";\
function pageload(page) {\
var basewindow = opener.parent;\
var loader = basewindow.TOP.xmlloader;\
var UI_lang = basewindow.CTL.document.ctl.lang.value;\
var htmltxt = loader.transform(page,  "../../config8_am/suzuki_all.xsl", {"UI_lang": UI_lang, "ManualLinkage": loader.enableManualLinkage});\
XREFMAIN.document.write(htmltxt);\
XREFMAIN.document.close();\
file = page;\
}\
</script>\
</head>\
<frameset onload="pageload(file)" id="frames_rows" rows="1,45,*" style="border:none; margin:0px; padding:0px;" frameborder="1" border="1" framespacing="0" bordercolor="#7f99ff">\
<frame name="XREFCTL" scrolling="no" style="border:none 0px; margin:0px; padding:0px; border-color:#7f99ff;" noresize frameborder="0" border="0" src="xref_ctl.html">\
<frame name="XREFTOP" scrolling="no" style="border:none 0px; margin:0px; padding:0px; border-color:#7f99ff;" noresize frameborder="0" border="0" src="xref_top_am.html">\
<frame name="XREFMAIN" scrolling="yes" onresize="window.XREFMAIN.dragEnd()">\
</frameset>\
</html>';
		var newwin_func = function(win) {
			motherwindow.parent.CTL.document.ctl.xref_backlist.value="0";
			win.focus();
			motherwindow.parent.TOP.xrefWin = win;
			var backlist = motherwindow.parent.document.getElementsByName("CTL")[0].contentWindow.document.ctl.xref_backlist;
			backlist.value=id + "," + backlist.value;
		};
		var staywin_func = function(win) {
			win.pageload(file);
			win.focus();
			//motherwindow.parent.TOP.xrefWin = win;
			var backlist = motherwindow.parent.document.getElementsByName("CTL")[0].contentWindow.document.ctl.xref_backlist;
			backlist.value=id + "," + backlist.value;
		};
		var openedwin = childwindow.open("", src, newwin_func, staywin_func);
		if (typeof openedwin === "undefined") {
			motherwindow.setTimeout(
				function() {
					childwindow.open("", src, newwin_func, staywin_func);
				} , 1);
		}
	}   // End   if (file!="")

}

function xref_simple(id) {
aaaa="";
	if (id.length==15) {
		var file=id + ".xml";
		window.open(file,"","menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=820,height=640,resizable=yes");
	} else {
		var subid=id.substr(0,15);
		var current=document.anchors[0].name;
//alert(subid);
//alert(current);
		if (subid!=current) {
			if (id.indexOf("#")!=-1) {
				aaaa=id.substr(id.indexOf("#")+1);
			} else {
				aaaa=id;
			}
			var file=subid + ".xml";
			newWin=window.open(file,"","menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=820,height=640,resizable=yes");
		} else {
			movehash(id);
		}
	}
}

function movehash(hashid) {
//alert(hashid);
//	parent.MAIN.document.location.hash = hashid;
	
	if (parent.frames.length!=5) {
		var obj_target=document.getElementById(hashid);
	} else {
		var obj_target=parent.MAIN.document.getElementById(hashid);
	}
	obj_target.scrollIntoView();
}

function jumpToAnchor() {
	if (parent.frames.length!=5) {
//		alert("Jump: " + opener.aaaa);
		if (parent.opener.aaaa!="") {
			var obj_target=document.getElementById(parent.opener.aaaa);
			if (obj_target!=null) {
				obj_target.scrollIntoView();
			}
		}
		parent.opener.aaaa="";
//		parent.focus();
	}
}

function expandImage(path,gtype) {
//	alert(path);
// set window features
	if (gtype=="swf") {
		var feats="menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=no,width=600,height=600,resizable=yes";
	} else {
		var feats="menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=600,height=600,resizable=yes";
	}
// open new image window
	if (parent.XREFMAIN || parent.PREXMAIN) {
		var motherwindow = parent.opener;
	} 
	else {
		var motherwindow = window;
	}
	var imgWin = new ChildWindow(motherwindow, "ImageWindow", feats);
src = '<html>';
src += '<head><title>Expand Image Window</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></head>';
src += '<body>';
	if (gtype=="swf") {
src += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="100%" width="100%"><param name="movie" value="' + path + '">';
src += '<param name="quality" value="high">'
src += '<embed src="' + path + '" quality="high" type="application/x-shockwave-flash" height="100%" width="100%"></embed></object>';
		
	} else {
		src += '<img src="' + path + '" width="100%">';
	}
src += '</body>';
src += '</html>';
	var finally_func = function(win) {
		win.moveTo(0, 0);
		win.resizeTo(screen.availWidth, screen.availHeight);
		try{
			win.external.MoveTo(0, 0);
			win.external.ResizeTo(screen.availWidth, screen.availHeight);
		}
		catch(e){}
	}
	imgWin.open("", src, finally_func, finally_func);
}

function markSie(id,back) {
	var backlist = parent.CTL.document.ctl.backlist;
	var fwdlist = parent.CTL.document.ctl.fwdlist;

	if (id.length==10) {
		expand('az');
	}

	if (id.length==15) {

	// Check to see if target Sie div has been loaded
		objBlock=parent.NAVI.document.getElementById("blk" + id.substr(8,2));
		if (objBlock.getElementsByTagName("div").length==0) {
			objBlock.innerHTML=parent.TOP.getInnerNaviHtml(id.substr(8,2));
		}

		if (id.substr(8,2)=="00") {
			expand("z");
		} else {
			expand(id.substr(8,1));
		}
		expand(id.substr(8,2));
		if (id.substr(10,1)!="0") {
			expand(id.substr(8,3));
		}
		expand(id.substr(8,4));
	}
	var target="sie" + id;
	if (back=="1") {
		var prev="sie" + fwdlist.value.substr(0,fwdlist.value.indexOf(','));
	} else if (back=="2") {
		var prev="sie" + backlist.value.substr(backlist.value.indexOf(',') + 1,backlist.value.indexOf(','));
	} else {
		var prev="sie" + backlist.value.substr(0,backlist.value.indexOf(','));
	}
	
	if (prev!="sie") {
		var obj_prev=parent.NAVI.document.getElementById(prev);
		if (obj_prev) {
			obj_prev.style.backgroundColor="#ffffff";
		}
	}
	var obj_target=parent.NAVI.document.getElementById(target);
	
	if (parent.CTL.document.ctl.mode.value=="navi_sym") {
		obj_target.style.background="url(../../icon/sie_bg_dtcsym.gif) repeat-y";
	}
	else if (parent.CTL.document.ctl.mode.value=="navi_dtc") {
		obj_target.style.background="url(../../icon/sie_bg_dtcsym.gif) repeat-y";
	} else {
		obj_target.style.background="url(../../icon/sie_bg.gif) repeat-y";
	}
	obj_target.style.backgroundColor="#ffcc00";
	
}


function overDiv(obj) { 
	obj.style.color="#990033";
}

function outDiv(obj) { 
	obj.style.color="#0033ff";
}


function btnPrevsie() { 
	if (parent.CTL.document.ctl.mode.value == "navi" || parent.CTL.document.ctl.mode.value == "navi_sym") {
		var current = parent.CTL.document.ctl.current.value;
		var i = 0
		if (current != "0") {
			var found = 0;
			while (i <= parent.NAVI.arrSieList.length - 1) {
				if (parent.NAVI.arrSieList[i] != current) {
					i++
				} else {
					found = 1;
					break;
				}
			}
			if (found == 0) {
				alert("Debug: Sie ID not found in list!");
			}
			if (i > 0) {
				id = parent.NAVI.arrSieList[i-1];
			} else {
				id = parent.NAVI.arrSieList[parent.NAVI.arrSieList.length - 1];
			}
		} else {
			id = parent.NAVI.arrSieList[parent.NAVI.arrSieList.length - 1];
		}
		if (id!="") {
			loadSIE(id,null)
		}
	} else {
		alert(parent.CTL.document.ctl.err1.value);
	}
}

function btnNextsie() { 
	if (parent.CTL.document.ctl.mode.value == "navi" || parent.CTL.document.ctl.mode.value == "navi_sym") {
		var current = parent.CTL.document.ctl.current.value;
		var i = 0
		if (current != "0") {
			var found = 0;
			while (i <= parent.NAVI.arrSieList.length - 1) {
				if (parent.NAVI.arrSieList[i] != current) {
					i++
				} else {
					found = 1;
					break;
				}
			}
			if (found == 0) {
				alert("Debug: Sie ID not found in list!");
			}
			if (i < parent.NAVI.arrSieList.length - 1) {
				id = parent.NAVI.arrSieList[i+1];
			} else {
				id = parent.NAVI.arrSieList[0];
			}
		} else {
			id = parent.NAVI.arrSieList[0];
		}
		if (id!="") {
			loadSIE(id,null)
		}
	} else {
		alert(parent.CTL.document.ctl.err1.value);
	}
}

function btnUndo() { 
	if (parent.CTL.document.ctl.mode.value == "navi" || parent.CTL.document.ctl.mode.value == "navi_sym") {
		var backlist = parent.CTL.document.ctl.backlist;
		var fwdlist = parent.CTL.document.ctl.fwdlist;
		
	//	alert(parent.CTL.document.ctl.backlist.value);

		var current=backlist.value.substr(0,backlist.value.indexOf(','));
		var history=backlist.value.substr(backlist.value.indexOf(',') + 1);
		if (history!="0") {
			fwdlist.value=backlist.value.substr(0,backlist.value.indexOf(',')) + "," + fwdlist.value;
			backlist.value=history;
			var id=history.substr(0,history.indexOf(','));
			if (id!="") {
				loadSIE(id,'1')
			}
		}
	} else {
		alert(parent.CTL.document.ctl.err1.value);
	}
}

function btnXrefUndo() { 
aaaa="";
file="";
htmlMain="";
	var backlist = parent.opener.parent.CTL.document.ctl.xref_backlist;
	var history = backlist.value.substr(backlist.value.indexOf(',') + 1);

	if (history!="0") {
		var id=history.substr(0,history.indexOf(','));
		backlist.value = history;

		if (id!=0) {
			if (id.length==15) {
				var file="../" + id + ".xml";
			} else {
				var file="../" + id.substr(0,15) + ".xml";
				parent.opener.aaaa=id;
			}
		}
	} else {
		// alert("last link. closing window.");
		btnClose();
	}

		if (parent.XREFMAIN || parent.PREXMAIN) {
			var motherwindow = parent.opener;
		} 
		else {
			var motherwindow = window;
		}

	if (file!="") {
		var UI_lang = parent.opener.parent.CTL.document.ctl.lang.value;
		var loader = motherwindow.parent.TOP.xmlloader;
		loader.writeTo(parent.XREFMAIN, file, "../../config8_am/suzuki_all.xsl", {"UI_lang": UI_lang, "ManualLinkage": loader.enableManualLinkage});
	}
}

function btnPrint() { 
	parent.MAIN.focus();

	fixPrintImgWidth();
	
	var swapForPrint = 0;
	if (window.XSLTProcessor && navigator.userAgent.indexOf('Firefox')!=-1) {
		version = parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox')+8));
		if (version > 3.5) {
			swapForPrint = 1;
			swapSwf2Jpg();
		}
	}

	parent.MAIN.print();

	//alert("Image is being adjusted for printing.\nAfter printing is completed, please close the window.");
	var lang = parent.CTL.document.ctl.lang.value;
	alert(getUI_strPrintAlert(lang));
	
	parent.MAIN.focus();
	fixImgWidth();

	if (swapForPrint == 1) {
			swapJpg2Swf();
	}
}

function btnXrefPrint() { 
	parent.XREFMAIN.focus();

	fixPrintImgWidth();

	var swapForPrint = 0;
	if (window.XSLTProcessor && navigator.userAgent.indexOf('Firefox')!=-1) {
		version = parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox')+8));
		if (version > 3.5) {
			swapForPrint = 1;
			swapSwf2Jpg();
		}
	}
	
	parent.XREFMAIN.print();
	
	//alert("Image is being adjusted for printing.\nAfter printing is completed, please close the window.");
	var lang = parent.CTL.document.ctl.lang.value;
	alert(getUI_strPrintAlert(lang));

	parent.XREFMAIN.focus();
	fixImgWidth();

	if (swapForPrint == 1) {
			swapJpg2Swf();
	}
}

function btnToTop() { 
	parent.location.href = "../index.html";
}

function btnClose() { 
//parent.opener.parent.CTL.document.ctl.xrefwin.value='off';
//parent.opener.parent.CTL.document.ctl.xref_backlist.value="0";
parent.close();
}

function closeXrefWin() { 
//parent.opener.parent.CTL.document.ctl.xrefwin.value='off';
//parent.opener.parent.CTL.document.ctl.xref_backlist.value="0";
//parent.close();
}

function btnHelp() { 
	if (parent.XREFCTL) {
		var modelName = parent.opener.parent.CTL.document.ctl.modelname.value;
	} else {
		var modelName = parent.CTL.document.ctl.modelname.value;
	}
	
	if (modelName!="empty") {
		var langCode = modelName.substr(1,2);
		var helpPath = "../../guide/guide2" + langCode + ".pdf";
		helpWin = window.open(helpPath,"","menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=820,height=640,resizable=yes");
	} else {
		alert("Error: Manual ID not set!");
	}
}

function openManual(num) { 
	var item = num.value;
	var path = "../../" + item + "/index.html";
	
	num.options[0].selected = true;
	
	if (item != 0) {
		window.open(path, item);
	}
}


function swapSwf2Jpg() {
	if (parent.XREFMAIN) {
		var swfs = parent.XREFMAIN.document.getElementsByTagName("object");
	} else if (parent.PREXMAIN) {
		var swfs = parent.PREXMAIN.document.getElementsByTagName("object");
	} else {
		var swfs = parent.MAIN.document.getElementsByTagName("object");
	}

	if (swfs.length!=0 && swfs[0].parentNode.getElementsByTagName("img").length==0) {
		for (i=0;i<swfs.length;i++) {
	//		alert('w: '+swfs[i].width);
			srcJpg = swfs[i].getElementsByTagName("param")[0].value;
			srcJpg = srcJpg.replace('.swf','.jpg');
	//		alert('src: '+srcJpg);
			
			var imgJpg = document.createElement('img');
			imgJpg.src = srcJpg;
			imgJpg.width = parseInt(swfs[i].width);
			imgJpg.height = parseInt(swfs[i].height);
			swfs[i].parentNode.appendChild(imgJpg);
			
			// Hide swf
			swfs[i].style.display='none';
		}
	}
	else if (swfs.length!=0 && swfs[0].parentNode.getElementsByTagName("img").length!=0) {
		for (i=0;i<swfs.length;i++) {
			swfs[i].style.display='none';
			swfs[i].parentNode.getElementsByTagName("img")[0].style.display='inline';
			
		}
	}
}


function swapJpg2Swf() {
	if (parent.XREFMAIN) {
		var swfs = parent.XREFMAIN.document.getElementsByTagName("object");
	} else if (parent.PREXMAIN) {
		var swfs = parent.PREXMAIN.document.getElementsByTagName("object");
	} else {
		var swfs = parent.MAIN.document.getElementsByTagName("object");
	}

	if (swfs.length!=0 && swfs[0].parentNode.getElementsByTagName("img").length!=0) {
		for (i=0;i<swfs.length;i++) {
			swfs[i].style.display='inline';
			swfs[i].parentNode.getElementsByTagName("img")[0].style.display='none';
			
		}
	}
}

function fixImgWidth() {
	if (parent.XREFMAIN) {
		var swfs = parent.XREFMAIN.document.getElementsByTagName("object");
	} else if (parent.PREXMAIN) {
		var swfs = parent.PREXMAIN.document.getElementsByTagName("object");
	} else {
		var swfs = parent.MAIN.document.getElementsByTagName("object");
	}

	for (i=0;i<swfs.length;i++) {
		if (swfs[i].parentNode.className=="w100pc") {
//Get max width from width of parent div
			var maxWidth = parseInt(swfs[i].parentNode.offsetWidth);
			var xfactor = maxWidth / 600;

			var setW=maxWidth + "px";
			var setH=parseInt(swfs[i].height) * xfactor + "px";

			swfs[i].width=setW;
			swfs[i].height=setH;
// set dimensions for embed tag
			swfs[i].lastChild.width=setW;
			swfs[i].lastChild.height=setH;
			
		} else if (parseInt(swfs[i].width)==600) {
//Set classname of parent for future reference (w600)
			swfs[i].parentNode.className = "w600";
//Get max width from width of parent div
			var maxWidth = parseInt(swfs[i].parentNode.offsetWidth);
			var xfactor = maxWidth / 600;

			var setW=maxWidth + "px";
			var setH=parseInt(swfs[i].height) * xfactor + "px";

			swfs[i].width=setW;
			swfs[i].height=setH;
// set dimensions for embed tag
			swfs[i].lastChild.width=setW;
			swfs[i].lastChild.height=setH;
			
		} else if (swfs[i].width=="100%") {
//Set classname of parent for future reference (w100pc)
			swfs[i].parentNode.className = "w100pc";
			var maxWidth = parseInt(swfs[i].parentNode.offsetWidth);

			var setW=maxWidth + "px";

			swfs[i].width=setW;
// set dimensions for embed tag
			swfs[i].lastChild.width=setW;
			
		} else {
//Set classname of parent for future reference (w+originalwidth+h+originalheight)
			swfs[i].parentNode.className = "w" + swfs[i].width + "h" + swfs[i].height;
			var maxWidth = parseInt(swfs[i].parentNode.offsetWidth);

			if (parseInt(swfs[i].width) * 1.25 <= maxWidth) {
				var setW=parseInt(swfs[i].width) * 1.25 + "px";
				var setH=parseInt(swfs[i].height) * 1.25 + "px";
				swfs[i].width=setW;
				swfs[i].height=setH;
	// set dimensions for embed tag
				swfs[i].lastChild.width=setW;
				swfs[i].lastChild.height=setH;
			} else {
				var xfactor = maxWidth / parseInt(swfs[i].width);
				var setW=maxWidth + "px";
				var setH=parseInt(swfs[i].height) * xfactor + "px";
				swfs[i].width=setW;
				swfs[i].height=setH;
	// set dimensions for embed tag
				swfs[i].lastChild.width=setW;
				swfs[i].lastChild.height=setH;
			}
		}
	}
}

// call custom onresizeend event handler
function dragEnd() {
  if(window.ActiveXObject) {
	  window.resizeEnd = (window.resizeEnd ==null)?(new Object()):window.resizeEnd;
	  clearTimeout(window.resizeEnd);
	  window.resizeEnd = setTimeout(resizeImgWidth,300);
  }
  else {
  	resizeImgWidth();
  }
}

function resizeImgWidth() {
	var swfs = document.getElementsByTagName("object");

	for (i=0;i<swfs.length;i++) {
//Get max width from width of Sie title div
			var maxWidth = parseInt(document.getElementsByTagName('div')[0].getElementsByTagName('div')[0].offsetWidth);
//Get width of parent div
			var parentWidth = parseInt(swfs[i].parentNode.offsetWidth);

		if (parseInt(swfs[i].width)>=600 && (swfs[i].parentNode.className=="w600" || swfs[i].parentNode.className=="w100pc")) {

			maxWidth = (maxWidth < 600) ? 600 : maxWidth;

			var xfactor = maxWidth / parseInt(swfs[i].width);
			var setW = maxWidth + "px";
			var setH = parseInt(swfs[i].height) * xfactor + "px";

			swfs[i].width=setW;
			swfs[i].height=setH;
// set dimensions for embed tag
			swfs[i].lastChild.width=setW;
			swfs[i].lastChild.height=setH;
			
		} else {
			try{
				var maxWidth = parseInt(swfs[i].parentNode.offsetWidth);
				var dims = swfs[i].parentNode.className;
				var origW = dims.substr(1,dims.indexOf("h") - 1);
				var origH = dims.substr(dims.indexOf("h") + 1);
				if (parseInt(origW) * 1.25 <= maxWidth) {
					var setW=parseInt(origW) * 1.25 + "px";
					var setH=parseInt(origH) * 1.25 + "px";
					swfs[i].width=setW;
					swfs[i].height=setH;
		// set dimensions for embed tag
					swfs[i].lastChild.width=setW;
					swfs[i].lastChild.height=setH;
				} else {
					var xfactor = maxWidth / parseInt(origW);
					var setW=maxWidth + "px";
					var setH=parseInt(origH) * xfactor + "px";
					swfs[i].width=setW;
					swfs[i].height=setH;
		// set dimensions for embed tag
					swfs[i].lastChild.width=setW;
					swfs[i].lastChild.height=setH;
			}
			}catch(e)
			{
			}
		}
	}
}

function fixPrintImgWidth() {
	
	if (parent.XREFMAIN) {
		var swfs = parent.XREFMAIN.document.getElementsByTagName("object");
	} else if (parent.PREXMAIN) {
		var swfs = parent.PREXMAIN.document.getElementsByTagName("object");
	} else {
		var swfs = parent.MAIN.document.getElementsByTagName("object");
	}

	for (i=0;i<swfs.length;i++) {
		if (parseInt(swfs[i].width)>=600 && (swfs[i].parentNode.className=="w600" || swfs[i].parentNode.className=="w100pc")) {

			var xfactor = 600 / parseInt(swfs[i].width);

			var setW=600 + "px";
			var setH=parseInt(swfs[i].height) * xfactor + "px";

			swfs[i].width=setW;
			swfs[i].height=setH;
// set dimensions for embed tag
			swfs[i].lastChild.width=setW;
			swfs[i].lastChild.height=setH;
			
		} else {
			var dims = swfs[i].parentNode.className;
			var origW = dims.substr(1,dims.indexOf("h") - 1);
			var origH = dims.substr(dims.indexOf("h") + 1);

			var setW=parseInt(origW) + "px";
			var setH=parseInt(origH) + "px";
			
			swfs[i].width=setW;
			swfs[i].height=setH;
// set dimensions for embed tag
			swfs[i].lastChild.width=setW;
			swfs[i].lastChild.height=setH;
		}
	}
}

function showTool(tnum,ttop) {
if (!UI_lang) {
	UI_lang = parent.CTL.document.ctl.lang.value;
}
var listPath = "../../image/TOOL/Tool_" + UI_lang + ".xml";
htmlMain="";

	if (parent.frames.length==5) {
		var tb = parent.TOP.strTB;
		var dc = parent.TOP.strDC;
		var motherwindow = window;
	} else {
		var tb = parent.opener.parent.TOP.strTB;
		var dc = parent.opener.parent.TOP.strDC;
		var motherwindow = parent.opener.window;
	}

	if (!ttop) {
		ttop = "TT";
	} 
	var imgext = (!!motherwindow.parent.TOP.isWebkit()) ? "jpg": "swf";
	var childwindow = new ChildWindow(motherwindow, "ToolWindow","menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=440,height=400,resizable=yes");
	var newwin_func = function(win){
		var loader = motherwindow.parent.TOP.xmlloader;
		loader.writeTo(win, listPath, "../../config8_am/toollist.xsl", {"tgtTool": tnum, "tb": tb, "dc": dc, "ttop": ttop, "imgext": imgext});
		win.focus();
	}
	var staywin_func = function(win){};
	var toolWin = childwindow.open("", "", newwin_func, staywin_func);
}

function showTB(path) {
//	alert(path);
// set window features
	var feats="menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=600,height=600,resizable=yes";
// open new image window
		if (parent.XREFMAIN || parent.PREXMAIN) {
			var motherwindow = parent.opener;
		} 
		else {
			var motherwindow = window;
		}
		var childwindow = new ChildWindow(motherwindow, "ToolBoardWindow", feats);

src = '<html>';
src += '<head><title>Tool Board Window</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></head>';
src += '<body>';
src += '<img src="' + path + '" width="100%">';
src += '</body>';
src += '</html>';

		var newwin_func = function(win){
			wind.focus();
		}
		var staywin_func = function(win){};
		var imgWin = childwindow.open("", src, newwin_func, staywin_func);
}

function showPrexns(sieid,UI_lang) {

htmlMain="";
var prexns_configid = sieid.substr(8,3);

	if (parent.XREFMAIN || parent.PREXMAIN) {
		var motherwindow = parent.opener;
	} 
	else {
		var motherwindow = window;
	}
	var childwindow = new ChildWindow(motherwindow, "PreXnsWindow", "menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=560,height=600,resizable=yes");
	var code = function pageload(loadargs) {
		var prexns_configid = loadargs[0];
		var srcWin = loadargs[1];
		var loader = opener.parent.TOP.xmlloader;
		var UI_lang = opener.parent.CTL.document.ctl.lang.value;
		var htmltxt = loader.transform("../webdocstructure.xml", "../../config8_am/prexns.xsl", {"UI_lang": UI_lang, "targetId": prexns_configid, "srcWin": srcWin});
		PREXNSMAIN.document.write(htmltxt);
		PREXNSMAIN.document.close();
	};
	var src = genSubWindowContents("PreXns", code, "1", "CTL", "", "PREXNSMAIN", "['" + prexns_configid + "', '" + window.name +"']");
	
	var newwin_func = function(win) {
		motherwindow.parent.CTL.document.ctl.prexnswin.value='on';
		win.focus();
		motherwindow.parent.TOP.prexnsWin = win;
	};
	var staywin_func = function(win) {
		win.pageload([prexns_configid, window.name]);
		if (motherwindow.parent.CTL.document.ctl.prexns_current.value==prexns_configid) {
			win.focus();
			return;
		}
		else {
			motherwindow.parent.CTL.document.ctl.prexns_current.value = prexns_configid;
		}
	};
	var openedwin = childwindow.open("", src, newwin_func, staywin_func);
	if (typeof openedwin === "undefined") {
		motherwindow.setTimeout(
			function() {
				childwindow.open("", src, newwin_func, staywin_func);
			}, 1);
	}
}

function closePrexnsWin() { 
try{parent.opener.parent.CTL.document.ctl.prexnswin.value='off';}catch(e){}
}

function showPrexnSie(id,UI_lang) { 

	var strSource = "../" + id + ".xml";
	
	var motherwindow = parent.opener;
	var childwindow = new ChildWindow(motherwindow, "PreXMainWindow","menubar=yes,toolbar=no,locationbar=no,statusbar=no,scrollbars=yes,width=820,height=640,resizable=yes");

	var code = function pageload(page) {
		var loader = opener.parent.TOP.xmlloader;
		var UI_lang = opener.parent.CTL.document.ctl.lang.value;
		var htmltxt = loader.transform(page, "../../config8_am/suzuki_all.xsl", {"UI_lang": UI_lang, "ManualLinkage": loader.enableManualLinkage});
		PREXMAIN.document.write(htmltxt);
		PREXMAIN.document.close();
	};
	var src = genSubWindowContents("PreXns Main", code, "1", "CTL","", "PREXMAIN", '"' + strSource + '"');
	var finally_func = function(win) {
		win.focus();
		motherwindow.parent.TOP.prexmainWin = win;	
	};
	var openedwin = childwindow.open("", src, finally_func, finally_func);
	if (typeof openedwin === "undefined") {
		motherwindow.setTimeout(function() {
			childwindow.open("", src, finally_func, finally_func);
		}, 1);
	}
}

function showMaintSie() {
	var objBlock=parent.NAVI.document.getElementById("blk0");
	if(objBlock==null) {
		setTimeout(showMaintSie,300);
	} else {
		toggle('0');
		toggle('02');
		toggle('0205');
		clickMaintSie();
	}
}

function clickMaintSie() {
	var objBlock=parent.NAVI.document.getElementById("blk0205");
	if(objBlock==null) {
		setTimeout(clickMaintSie,300);
	} else {
		var tgtSie=objBlock.getElementsByTagName("a")[0].firstChild.id;
		tgtSie=tgtSie.substr(3);
		loadSIE(tgtSie);
	}
}

function markAllButton() {
	var tgtBtn=parent.NAVI.document.getElementsByTagName("span")[0];
	if(tgtBtn==null) {
		setTimeout(markAllButton,50);
	} else {
		if (tgtBtn.className=="all_icon") {
			tgtBtn.style.backgroundColor="#ffcc00";
		}
	}
}

/* visible to manual linkage tool button  */
function buttonVisible(){
	var loader = parent.TOP.xmlloader
	loader.enableManualLinkage = true;
}


function genSubWindowContents(windowname, scriptcode, rows, headfname, headfsrc, bodyfname, bodyfloadargs) {
	var template = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">\
<html>\
<head>\
<meta http-equiv="Content-Type" content="text/html; charset=utf-16">\
<title>$windowname$ Window</title>\
<script>\
var loadargs = $secondsrc$;\
$scriptcode$\
</script>\
</head>\
<frameset onload="$scriptname$(loadargs)" id="frames_rows" rows="$rows$,*" style="border:none; margin:0px; padding:0px;" frameborder="1" border="1" framespacing="0" bordercolor="#7f99ff">\
<frame name="$firstframe$" scrolling="no" style="border:none 0px; margin:0px; padding:0px; border-color:#7f99ff;" noresize frameborder="0" border="0" src="$firstsrc$" >\
<frame name="$secondframe$" scrolling="yes">\
</frameset>\
</html>';
	var src = template.replace("$windowname$", windowname);
	src = src.replace("$scriptcode$", scriptcode.toString());
	src = src.replace("$scriptname$", scriptcode.toString().match(/^function\s*([^\s(]+)/)[1]);
	src = src.replace("$rows$", rows);
	src = src.replace("$firstframe$", headfname);
	src = src.replace("$firstsrc$", headfsrc);
	src = src.replace("$secondframe$", bodyfname);
	src = src.replace("$secondsrc$", bodyfloadargs);
	return src 
}

function setModelInfo() {
	if (strManualID=="") {
		parent.CTL.document.ctl.modelname.value = "empty";
	} else {
		parent.CTL.document.ctl.modelname.value = strManualID;
		parent.name = strManualID;
	}
	if (strManual=="") {
		parent.CTL.document.ctl.manualname.value = "empty";
	} else {
		parent.CTL.document.ctl.manualname.value = strManual;
	}

	if (strLang!="" && strLang!=parent.CTL.document.ctl.lang.value) {
		parent.CTL.document.ctl.lang.value = strLang;
	} 
}

function checkUiLang(){
	if (strLang!="" && strLang!=parent.CTL.document.ctl.lang.value) {
		parent.CTL.document.ctl.lang.value = strLang;
		setUI(strLang);
	} 
}
