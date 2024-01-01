//
// DOM Xml loading functions
// release: 20140530

// console.log("execute stdiodom.js global code.");
var UI_lang;
var xrefWin;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.split_filename = function(delim) {
	var splited = this.split(delim);
	return splited[splited.length - 1];
};

// IE??
function isIE(){
    if(! window.ActiveXObject){
        if(! document.documentMode){
            return false;
        }
    }
 
    return true;
}
// Webkit??
function isWebkit() {
	if (isIE() || window.sidebar) return false; //IE or FireFox : not webkit
	return (window.chrome || typeof document.webkitIsFullScreen != undefined);
}

function inherit (p) {
    if (Object.create) {
        return Object.create(p);
    }

    function f() {};
    f.prototype = p;
    return new f();
}

function NodeInjector(xsltfname, plungers, xmlloader) {
	this.xsltfname = xsltfname;
	if (!(this.plungers instanceof Array)) {
		this.plungers = new Array(plungers);
	} else {
		this.plungers = plungers;
	}
	this.loader = xmlloader;
}

NodeInjector.prototype.accept = function(xsltpath) {
	return (xsltpath.endsWith(this.xsltfname));
}

NodeInjector.prototype.inject = function(xmldoc, params) {
	for (var i = 0; i < this.plungers.length; i++) {
		var usePlunger = this.plungers[i];
		usePlunger.push(xmldoc, this.loader, params);
	}
}

function Plunger(tags, documentFinder, effect) {
	if (!(tags instanceof Array)) {
		this.tags = new Array(tags);
	} else {
		this.tags = tags;
	}
	this.documentFinder = documentFinder;
	this.effect = effect;
}

Plunger.prototype.push = function(xmldoc, xmlloader, params) {
	for (var i = 0; i < this.tags.length; i++) {
		var tag = this.tags[i];
		var matchTags = null;
		if (tag == "") {
			matchTags = new Array(xmldoc);
		} else {
			matchTags = xmldoc.getElementsByTagName(tag);
		}
		for (var j = 0; j < matchTags.length; j++) {
			var matchTag = matchTags[j];
			var foundurl = this.documentFinder(matchTag, params);
			//console.log("Plunger#push foundurl is :" + foundurl);
			if (foundurl == null) continue;
			this.effect(xmlloader.load(foundurl), matchTag);
		}
	}
}

function PrexnsPlunger() {
}
PrexnsPlunger.prototype.push = function(xmldoc, xmlloader, params) {
	var targetId = params["targetId"];
	var sct = targetId.substr(0,1);
	var sc = targetId.substr(0,2);
	var configid = targetId.substr(2,1);
	var sctnum_map = {"A": "10",
					  "B": "11",
					  "C": "12",
					  "F": "&#160;"}
	var sctnum = sct;
	if (sct in sctnum_map) {
		sctnum = sctnum_map[sct];
	}
	var suzukiNode = xmldoc.documentElement;
	var docElemChildren = suzukiNode.childNodes;
	// remove all child node.
	var existsSctnum = 0;
	for (var i = docElemChildren.length - 1; 0 < i ; i--) {
		var child = docElemChildren[i];
		if (!existsSctnum) {
			existsSctnum ^= (child.nodeName == "a" && child.getAttribute("i") == sctnum) ? 1 : 0;
		}
		suzukiNode.removeChild(child);
	}
	if (sc.substr(1,1) != '0') {
		var scWebdoc = xmlloader.load("../webdocstructure_" + sc + ".xml");
		suzukiNode.appendChild(scWebdoc.documentElement.cloneNode(true));
	}
	if (existsSctnum == 1) {
		var sctWebdoc = xmlloader.load("../webdocstructure_" + sct + "0.xml");
		var insertNode = sctWebdoc.documentElement.cloneNode(true);
		suzukiNode.appendChild(insertNode);
	}
}
function JpegPlunger() {
}
JpegPlunger.prototype.push = function(xmldoc, xmlloader, params) {
	var graphics = xmldoc.getElementsByTagName("graphic");
	for (var i = 0; i < graphics.length; i++) {
		var graphicname = graphics[i].getAttribute("graphicname");
		graphicname = graphicname.replace(".swf",".jpg");
		graphics[i].setAttribute("graphicname", graphicname);
	}
}

function XMLLoader(win) {
	this.win = win;
	this.isIE = isIE();
	this.isUseCache = false;
	this.isStoreCache = false;
	this.useDelayDisplay = false;
	this.enableManualLinkage = false;
	this.cache = {};
	this.templatecache = {};
	this.transRuleMap = {}; // key:xslt filename(endswith), value:TranslateRegexpRule Array
	var sourceDoc = "../webdocstructure.xml";
	this.modeMap = {
		"navi": [sourceDoc, "../../config8_am/navi-kousei-e.xslt"],
		"navi_dtc": ["../webdocstructure-dtc.xml", "../../config8_am/navi-dtc-am.xslt"],
		"navi_sym": ["../webdocstructure-sym.xml", "../../config8_am/navi-sym-e.xslt"],
		"navi_sdm": ["../webdocstructure-sdm.xml", "../../config8_am/navi-sdm-am.xslt"],
		"search": [sourceDoc, "../../config8_am/searchindex-e.xslt"],
		"search_dtc": ["../webdocstructure-dtc.xml", "../../config8_am/search-dtc-am.xslt"],
		"search_sym": ["../webdocstructure-sym.xml", "../../config8_am/search-sym-e.xslt"],
		"search_sdm": ["../webdocstructure-sdm.xml", "../../config8_am/search-sdm-am.xslt"],
		"search_spec": ["../webdocstructure-spec.xml", "../../config8_am/search-spec-am.xslt"],
		"modslist": [sourceDoc, "../../config8_am/mods-list-e.xslt"],
		"navi_service": ["../webdocstructure-sdm.xml", "../../config8_am/navi-sdm-am.xslt"],
		"navi_spec": ["../webdocstructure-spec.xml", "../../config8_am/navi-spec-am.xslt"],
		"navi_scan": ["../webdocstructure-scan.xml", "../../config8_am/navi-scan-am.xslt"],
		"navi_tool": ["../webdocstructure-tool.xml","../../config8_am/navi-ttm.xslt", {"type":"tool"}],
		"navi_torq": ["../webdocstructure-trq.xml","../../config8_am/navi-ttm.xslt", {"type": "torque"}],
		"navi_mat": ["../webdocstructure-mtr.xml","../../config8_am/navi-ttm.xslt", {"type": "material"}],
		"dtclist": ["../table-dtc.xml", "../../config8_am/main-dtc.xslt"],
		"sdmlist": ["../table-sdm.xml", "../../config8_am/main-sdm.xslt"],
		"speclist": ["../table-spec.xml", "../../config8_am/main-spec.xslt"],
		"scanlist": ["../table-scan.xml", "../../config8_am/main-scan.xslt"],
		"toollist": ["../webdocstructure-tool.xml" , "../../config8_am/main-ttm.xslt"],
		"torquelist": ["../webdocstructure-trq.xml", "../../config8_am/main-ttm.xslt"],
		"materiallist": ["../webdocstructure-mtr.xml", "../../config8_am/main-ttm.xslt"]			
	};
	this.injectors = [
		new NodeInjector("main-dtc.xslt",
						 new Plunger(["intxref","intxrefpoff"],
									 function(e) { //document finder
										 return "../webdocstructure_"+ e.getAttribute("id").substring(9,11) + ".xml";
									 },
									 function(fd, matchElem) { // "//s[@i = $target]/@t"
										 var s_tags = fd.getElementsByTagName("s");
										 for (var i = 0; i < s_tags.length; i++) {
											 var s_tag = s_tags[i];
											 if (s_tag.getAttribute("i") == matchElem.getAttribute("id")) {
												 matchElem.appendChild(matchElem.ownerDocument.createTextNode( s_tag.getAttribute("t")));
											 }
										 }
									 }),
						 this),
		new NodeInjector("main-ttm.xslt",
						 new Plunger("servinfo",
									 function(e) { //document finder
										 // current is NAVI
										 var sieid = e.getAttribute("id");
										 if ((typeof sieid !== "undefined" && sieid != null) 
											 && sieid.match(/[A-Z0-9]{15}/)) {
											 return "../" + e.getAttribute("id") + ".xml";
										 }
										 return null; // not found;
									 },
									 function(fd, matchTag) { // "//servinfo"
										 var servinfos = fd.getElementsByTagName("servinfo");
										 var servinfotype = matchTag.parentNode;
										 servinfotype.removeChild(matchTag);
										 for (var i = 0; i < servinfos.length; i++) {
											 servinfotype.appendChild(servinfos[i].cloneNode(true));
											 //replaceNode(matchTag, servinfos[i].cloneNode(true));
										 }
									 }),
						 this),
		new NodeInjector("mods-list-e.xslt",
						 new Plunger("b",
									 function (e) {
										 return "../webdocstructure_" + e.parentNode.getAttribute("f").substring(9,11) + ".xml";
									 },
									 function (td, matchTag) {
										 var stags = fd.getElementsByTagName("s");
										 for (var i = 0; i < stags.length; i++) {
											 if (stags[i].getAttribute("m") == "t") {
												 matchTag.appendChild(stags[i].cloneNode(true));
											 }
										 }
									 }),
						 this),
		new NodeInjector("prexns.xsl", new PrexnsPlunger(), this)
	];
	this.imagechange_injector = new NodeInjector("*", new JpegPlunger(), this);
}
XMLLoader.prototype.__msxml_load = function(url, callback) {
	var async = false;
	if (typeof callback !== "undefined") async = true;
	var guid = "Msxml2.DOMDocument.3.0";
	if (url.endsWith("xslt") || url.endsWith("xsl")) {
		guid = "Msxml2.FreeThreadedDOMDocument.3.0";
	}
	var dom = new ActiveXObject(guid);
	dom.async = async;
	dom.validateOnParse = false;
	if (async) {
		dom.onreadystatechange = function() {
			if(dom.readyState == 4) {
				callback(dom);
			}
		};
	}
	dom.load(url);
	if (dom.parseError != 0) {
		alert(dom.url + ": " + dom.parseError.reason + "\nline number: " + dom.parseError.line);
		return null;
	} else {
		return dom;
	}		
}

function __cooking_XML_for_the_webkit(xmlText) {
	// strip: xml-stylesheet
	var modifiedText = xmlText;
	modifiedText = modifiedText.replace(/<\?xml-stylesheet type\s*=\s*"text\/xsl" href\s*=\s*".+"\s*\?>/,"");
	modifiedText = modifiedText.replace(/<!DOCTYPE suzuki \[\s*<!ENTITY % sdatacharaents SYSTEM ".+">\s*%sdatacharaents;\s*\]>/,"");
	modifiedText = modifiedText.replace(/\r?\n/g, ""); // strip: crlf
	//console.log("cooked:" + modifiedText);
	return modifiedText;
}

function __parseXml(xLoader) {
	if ((window.location.href.indexOf("http")==-1 && xLoader.status == 0) || xLoader.status == 200) {
		var respXml = xLoader.responseXML;
		if (respXml == null) {
			// chrome is not treated as IE, external entities and xml-stylesheet
			var respText = xLoader.responseText;
			if (isWebkit()) {
				respText = __cooking_XML_for_the_webkit(respText);
			}
			respXml = (new window.DOMParser()).parseFromString(respText, "text/xml");
		}
		return respXml;
	} else {
		throw "Error loading xml/xslt (status response error[" + xLoader.status + "]): ";
	}
}

XMLLoader.prototype.__firefox_load = function(url, callback) {
	var async = false;
	if (typeof callback !== "undefined") async = true;
	var xLoader = new XMLHttpRequest();
	if (xLoader) {
		if (url.endsWith("xsl") || url.endsWith("xslt")) {
			xLoader.overrideMimeType("application/xslt+xml");
		} else {
			xLoader.overrideMimeType("application/xml");
		}
		xLoader.open("GET", url, async);
		//xLoader.setRequestHeader('Content-Type', 'text/xml');
		//alert(url);
		if (async) {
			xLoader.onreadystatechange = function() {
				if (xLoader.readyState == 4) {
					var xmldom = __parseXml(xLoader);
					if ((url.endsWith("xsl") || url.endsWith("xslt")) && isWebkit()) { //Chrome bug:8441
						__resolveXslIncludes(xmldom);
					}
					callback(xmldom);
				}
			};
		}
		xLoader.send(null);
		if (!async) {
			if (xLoader.readyState == 4) {
				var xmldom =  __parseXml(xLoader);
				if ((url.endsWith("xsl") || url.endsWith("xslt")) && isWebkit()) { //Chrome bug:8441
					__resolveXslIncludes(xmldom);
				}
				return xmldom;
			}
			throw "Error loading xml/xslt (readyState response error[" + xLoader.readyState + "]): " + url;
		}
	}	
}

XMLLoader.prototype.load = function(url, callback) {
	var doc;
	if (this.isUseCache) {
		doc = this.cache[url];
		if (typeof doc !== "undefined") {
			return doc;
		}
	}
	if (this.isIE) {
		doc = this.__msxml_load(url, callback);
	} else {
		doc = this.__firefox_load(url, callback);
	}
	
	if (this.isStoreCache) this.cache[url] = doc;
	return doc;
}

XMLLoader.prototype.preCache = function(url) {
	if (url in this.cache && this.isUseCache) {
		return this.cache[url];
	}
	var isStoreCache = this.isStoreCache;
	var cache = this.cache;
	this.load(url, function(result) {	
		if (isStoreCache) {
			xmlloader.cache[url] = result;
		}
	});
}

// see:http://code.google.com/p/chromium/issues/detail?id=8441
function replaceNode( orig, replacement )
{
        var tmp;
        if ( replacement instanceof NodeList)
        {
                var frag = document.createDocumentFragment();
                for ( var i = 0; i < replacement.length; i ++ )
                        frag.appendChild( document.importNode( replacement.item(i), true ) );
                replacement = frag;
        }
        orig.parentNode.replaceChild( tmp=document.importNode( replacement, true ), orig );
        return tmp;
}

function __resolveXslIncludes(xsl) {
	var xslns = "http://www.w3.org/1999/XSL/Transform";
    var includes = xsl.getElementsByTagNameNS( xslns, "include" ); // NodeList	
    // reverse order to maintain NodeList integrity
    for ( var i = includes.length -1; i >= 0; i-- )
    {
        var n = includes.item(i);
        var d = xmlLoad_xhr( xsl.documentURI + "/../" + n.getAttribute('href') );
        replaceNode(n, d.documentElement.childNodes);
    }
}

XMLLoader.prototype.getOrCreateTemplate = function(url, style) {
	var template = this.templatecache[url];
	if (typeof template !== "undefined") {
		return template;
	}
	if (this.isIE) {
		template = new ActiveXObject("Msxml2.XSLTemplate.3.0");
		template.stylesheet = style;
	} else {
		template = new XSLTProcessor();
		template.importStylesheet(style);
	}
	this.templatecache[url] = template;
	return template;
}

XMLLoader.prototype.inject = function(xml, doc, xslt, style, params) {
	var newnode = doc;//.cloneNode(true);
	for (var i = 0; i < this.injectors.length; i++) {
		var injector = this.injectors[i];
		if (injector.accept(xslt)) {
			injector.inject(newnode, params);
			break;
		}
	}
	if (isWebkit()) {
		this.imagechange_injector.inject(newnode, params);
	}
	//console.log(newnode.outerHTML);
	return newnode;
}

XMLLoader.prototype.transform = function(xml, xslt, params) {
	var useParams;
	if (typeof params === "undefined") {
		if (this.isUseCache) {
			restxt = this.cache[xml+xslt];
			if (typeof restxt !== "undefined") return restxt;
		}
		useParams = {};
	} else {
		useParams = params;
	}
	var doc = this.load(xml);    //blocking
	var style = this.load(xslt); //blocking
	doc = this.inject(xml, doc, xslt, style, params);
	var restxt;
	if (this.isIE) {
		var template = this.getOrCreateTemplate(xslt, style);
		var proc = template.createProcessor();
		proc.input = doc;
		for (var pKey in useParams) {
			proc.addParameter(pKey, useParams[pKey]);
		}
		proc.transform();
		restxt = proc.output;
	} else {
		var xsltproc = this.getOrCreateTemplate(xslt, style);
		var serializer=  new XMLSerializer();
		for (var pKey in useParams) {
			xsltproc.setParameter("", pKey, useParams[pKey]);
		}
		var htmlDom = xsltproc.transformToDocument(doc);
		if (htmlDom == null) {
			return "<html><body>transformToDocument fail.</body></html>";
		}
		restxt = serializer.serializeToString(htmlDom);
	}
	// manual linkage button - translate
	var xslt_filename = xslt.split_filename("/");
	if (xslt_filename in this.transRuleMap) {
		var rule = this.transRuleMap[xslt_filename];
		if (typeof rule.doTrans !== "undefined") {
			restxt = rule.doTrans(restxt, parent.CTL.document.ctl.lang.value);
		}
	}
	return restxt;
}

XMLLoader.prototype.writeTo = function(toWindow, xml, xslt, param) {
	var _doc = toWindow.document;
	var _txt = this.transform(xml, xslt, param);
	if (this.useDelayDisplay && this.isIE) { // 20140416-001-B, 20131225-003-E
	window.setTimeout(function() {
		_doc.open();
		_doc.write(_txt);
		_doc.close();
	}, 30);
	} else {
		_doc.open();
		_doc.write(_txt);
		_doc.close();
	}
}

XMLLoader.prototype.writeToByMode = function(toWindow, mode, param) {
	var commands = this.modeMap[mode];
	if (typeof commands === "undefined") return;
	var defParam;
	if (commands.length > 2) {
		defParam = commands[2];
	}
	var execParam;
	if (typeof param !== "undefined" || typeof defParam !== "undefined") {
		execParam = {};
	}
	if (typeof defParam !== "undefined") {
		for (var p in defParam) {
			execParam[p] = defParam[p];
		}
	}
	if (typeof param !== "undefined") {
		for (var p in param) {
			execParam[p] = param[p];
		}
	}
	this.writeTo(toWindow, commands[0], commands[1], execParam);
}

XMLLoader.prototype.rewrite = function(xml, xslt, param) {
	this.writeTo(this.win, xml, xslt, param);
}

XMLLoader.prototype.rewriteByMode = function(mode, param) {
	this.writeToByMode(this.win, mode, param);
}

XMLLoader.prototype.__loadWebDoc = function(file) {
	// !!caution!! firefox is contain bugs [Bug 890284], textnode 4095B limit. NOT USE THIS FUNCTION!
	var webdoc_doc = this.load(file);
	var native_script =  webdoc_doc.documentElement.firstChild.nodeValue;
	// bug fix: string literal is not closed.
	var modify_script = native_script.replace(/"\s/gm,'";');
	return modify_script + ";";
}

XMLLoader.prototype.loadWebdocVars2 = function() {
	return this.__loadWebDoc("../webdocstructure_vars2.xml");
}

XMLLoader.prototype.loadWebdocVars1 = function() {
	var vars_code = this.__loadWebDoc("../webdocstructure_vars1.xml"); // ex:var strSieIdList = "(\w+?,?)";
	return vars_code.match(/"(?:\w+,?)+"/)[0].replace('"',''); // unsplited strings
}

var xmlLoad_xhr = XMLLoader.prototype.__firefox_load; //legacy code support.
var xmlLoad = XMLLoader.prototype.__msxml_load;     //legacy code support.
var xmlloader = new XMLLoader(parent.NAVI);

// style sheet pre-load (async)
xmlloader.preCache("../../config8_am/suzuki_all.xsl");

xmlloader.preCache("../../config8_am/search2-sdm-am.xslt");
xmlloader.preCache("../../config8_am/search2-spec-am.xslt");

xmlloader.preCache("../../config8_am/main-dtc.xslt");

xmlloader.preCache("../../config8_am/main-sdm.xslt");

xmlloader.preCache("../../config8_am/main-spec.xslt");

xmlloader.preCache("../../config8_am/main-scan.xslt");

xmlloader.preCache("../../config8_am/main-ttm.xslt");

xmlloader.rewriteByMode("navi");

function getInnerNaviHtml(id) { 
	var UI_lang = parent.CTL.document.ctl.lang.value;
	var subDocPath = "../webdocstructure_" + id + ".xml";
	return xmlloader.transform(subDocPath,  "../../config8_am/navi-subdoc.xslt", {"UI_lang": UI_lang, "sc": id});
}

function TranslateRegexpRule(tagName, wordsdef) {
	this.re = /<(\w+)(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)?(?:\s?\/)?>([\w\s]+?)<\/\1>/g;
	this.words_for_each_lang = wordsdef;
	this.targetTag = tagName;
	this.replacer_generator = function(tagName, lang) {
		var word_table = this.words_for_each_lang[lang];
		if (typeof word_table === "undefined") {
			word_table = {};
		}		
		return function(str, tag, childtext, offset, s) {
			if (tag == tagName && childtext in word_table) {
				var new_text = word_table[childtext];
				return str.replace(childtext, new_text);
			} else {
				return str;
			}
		};
	};
}
TranslateRegexpRule.prototype.doTrans = function(contents, lang) {
	var result_contents = contents;
	var replacer = this.replacer_generator(this.targetTag, lang);
	result_contents = result_contents.replace(this.re, replacer);
	return result_contents;
}
					 
