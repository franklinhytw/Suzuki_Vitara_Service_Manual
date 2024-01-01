/**
 * Global Initializer & Logger
 * since: 2013/10/21
 * release: 20140530
 * author:
 *  global Initializer - oonishi tsutomu,
 *  functionLogger -  Briguy37 
 *    http://stackoverflow.com/questions/11853256/how-to-get-javascript-function-calls-trace-at-runtime
 *  !Thank you for the wonderful gift!
 */


if(typeof console === "undefined") {
  console = function() {};
  console.log = function() {};
}

var functionLogger = {};

functionLogger.log = false;//Set this to false to disable logging 

/**
 * Gets a function that when called will log information about itself if logging is turned on.
 *
 * @param func The function to add logging to.
 * @param name The name of the function.
 *
 * @return A function that will perform logging and then call the function. 
 */
functionLogger.getLoggableFunction = function(func, name) {
    return function() {
        if (functionLogger.log) {
            var logText = name + '(';

            for (var i = 0; i < arguments.length; i++) {
                if (i > 0) {
                    logText += ', ';
                }
                logText += arguments[i];
            }
            logText += ');';
            if(window.console && window.console.clear) {
                console.log(logText);
            }
        }

        return func.apply(this, arguments);
    }
};

/**
 * After this is called, all direct children of the provided namespace object that are 
 * functions will log their name as well as the values of the parameters passed in.
 *
 * @param namespaceObject The object whose child functions you'd like to add logging to.
 */
functionLogger.addLoggingToNamespace = function(namespaceObject){
    for(var name in namespaceObject){
        var potentialFunction = namespaceObject[name];

        if(Object.prototype.toString.call(potentialFunction) === '[object Function]'){
            namespaceObject[name] = functionLogger.getLoggableFunction(potentialFunction, name);
        }
    }
};

function Proc(win, func) {
  this.win = win;
  this.func = func;
}
Proc.prototype.execute = function() {
  return this.func();
}
Proc.prototype.name = function() {
  return this.win.name;
}

function GlobalInitializer() {
  this.debug = functionLogger.log;
  this.initProcSet = {}; // key:frame name, value: Proc array
  this.sequence = ["CTL", "NAVI_TOP", "NAVI","TOP"];
  this.childwindows = [];
}

GlobalInitializer.prototype.isReady = function() {
  var keylength = 0;
  for (var key in this.initProcSet) {
    keylength++;
  }
  return this.sequence.length <= keylength;
}

GlobalInitializer.prototype.__exec = function(key) {
  var procQueue = this.initProcSet[key];
  if (typeof procQueue === "undefined") {
    if (this.debug) console.log("GlobalInitializer.__exec:procQueue is undefined. key[" + key + "]");
    return;
  }
  while(procQueue.length > 0) {
    var proc = procQueue.pop();
    try {
      proc.execute();
    } catch (ex) {
      if (this.debug) console.log(ex.message);
    }
  }
  this.initProcSet[key] = [];
}

GlobalInitializer.prototype.executeSerial = function() {
  if (this.debug) console.log("GlobalInitializer.executeSerial()");
  for (var i = 0; i < this.sequence.length; i++) {
    this.__exec(this.sequence[i]);
  }
  window.TOP.xmlloader.useDelayDisplay = true;
}

GlobalInitializer.prototype.join = function(win, func) {
  var proc = new Proc(win, func);
  if (this.debug) console.log("GlobalInitializer.join:" + proc.name() + " is joined.");

  if (proc.name() in this.initProcSet) {
    this.initProcSet[proc.name()].push(proc);
  } else {
    if (this.debug) functionLogger.addLoggingToNamespace(win);
      var queue = [];
    queue.push(proc);
    this.initProcSet[proc.name()] = queue;
  }

  if (this.debug) console.log("GlobalInitializer.isReady():" + this.isReady());
  if (this.isReady()) {
    this.executeSerial();
  }
}

GlobalInitializer.prototype.loadDelayScript = function(win, src) {
  var doc = win.document;
  var sNew = doc.createElement("script");
  sNew.async = true;
  sNew.src = src;
  var s0 = doc.getElementsByTagName('script')[0];
  s0.parentNode.insertBefore(sNew, s0);
}

GlobalInitializer.prototype.registerWindow = function() {
  var tmp = new ChildWindow(arg);
  this.childwindows.push(tmp);
  return tmp;
}

GlobalInitializer.prototype.registerWindow = function(window) {
  this.childwindows.push(window);
  return window;
}

GlobalInitializer.prototype.unload = function() {
  for(var i=0; i<this.childwindows.length; i++){
    try{
      var cwin = this.childwindows[i];
      cwin.childwin.close();
    }catch(e){
      
    }
  }
}

//20140328-001-B
GlobalInitializer.prototype.forceInit = function() {
  for (var i = 0; i < this.sequence.length; i++) {
    var name = this.sequence[i];
    var tf = window.frames[name];
    if (typeof tf.init !== "undefined") {
      this.join(tf, tf.init);
    } else {
      this.join(tf, function(){});
    }
  }
}
//20140328-001-B

var init = new GlobalInitializer();

//20140328-001-B
tryinit = function() {
  try {
    init.forceInit()
    } catch(e) { setTimeout(arguments.callee, 250); }
};
if (window.parent.location.href !== window.location.href) {
  tryinit();
}
window.onunload = function(){
  init.unload();
};
