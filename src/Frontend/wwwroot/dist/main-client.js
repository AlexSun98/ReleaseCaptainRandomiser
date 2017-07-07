/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1bddcfb52f4063116b45"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(43)(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = vendor_dc8946638e82e8c45133;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(1);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(9);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(188);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(6);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(31);
__webpack_require__(39);
__webpack_require__(40);
var core_1 = __webpack_require__(1);
var platform_browser_dynamic_1 = __webpack_require__(29);
var app_module_1 = __webpack_require__(9);
__webpack_require__(30);
var rootElemTagName = 'app'; //root element tag
if (true) {
    module['hot'].accept();
    module['hot'].dispose(function () {
        // Before restarting the app, we create a new root element and dispose the old one
        var oldRootElem = document.querySelector(rootElemTagName);
        var newRootElem = document.createElement(rootElemTagName);
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        modulePromise.then(function (appModule) { return appModule.destroy(); });
    });
}
else {
    core_1.enableProdMode();
}
// Note: @ng-tools/webpack looks for the following expression when performing production
// builds. Don't change how this line looks, otherwise you may break tree-shaking.
var modulePromise = platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: "/__webpack_hmr",
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: ''
};
if (true) {
  var path = __webpack_require__(19);
  var querystring = __webpack_require__(23);
  var overrides = querystring.parse(__resourceQuery.slice(1));
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }
  if (overrides.dynamicPublicPath) {
    options.path = path.join(__webpack_require__.p, options.path);
  }
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
    "You should include a polyfill if you want to support this browser: " +
    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
  );
} else {
  connect();
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if ((new Date() - lastActivity) > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    }
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == "\uD83D\uDC93") {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(24);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(25);
  }

  var styles = {
    errors: "color: #ff0000;",
    warnings: "color: #999933;"
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : "";
    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group("%c" + title, style);
      console.log("%c" + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
        style + "font-weight: bold;",
        style + "font-weight: normal;"
      );
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    }
  };
}

var processUpdate = __webpack_require__(26);

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch(obj.action) {
    case "building":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilding"
        );
      }
      break;
    case "built":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilt in " + obj.time + "ms"
        );
      }
      // fall through
    case "sync":
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
      } else {
        if (reporter) {
          if (obj.warnings.length > 0) {
            reporter.problems('warnings', obj);
          } else {
            reporter.cleanProblemsCache();
          }
          reporter.success();
        }
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    }
  };
}

/* WEBPACK VAR INJECTION */}.call(exports, "?path=%2F__webpack_hmr", __webpack_require__(41)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(197);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(27);
var platform_browser_1 = __webpack_require__(2);
var animations_1 = __webpack_require__(12);
var http_1 = __webpack_require__(28);
var ngx_datatable_1 = __webpack_require__(13);
var ng2_toasty_1 = __webpack_require__(33);
var modal_1 = __webpack_require__(36);
var tooltip_1 = __webpack_require__(38);
var popover_1 = __webpack_require__(37);
var dropdown_1 = __webpack_require__(35);
var carousel_1 = __webpack_require__(34);
var ng2_charts_1 = __webpack_require__(32);
//import { AppRoutingModule } from './app-routing.module';
var app_component_1 = __webpack_require__(10);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            //AppRoutingModule,
            ngx_datatable_1.NgxDatatableModule,
            ng2_toasty_1.ToastyModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            popover_1.PopoverModule.forRoot(),
            dropdown_1.BsDropdownModule.forRoot(),
            carousel_1.CarouselModule.forRoot(),
            modal_1.ModalModule.forRoot(),
            ng2_charts_1.ChartsModule
        ],
        declarations: [],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AnimationDriver; });
/* unused harmony export ɵAnimation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AnimationStyleNormalizer; });
/* unused harmony export ɵNoopAnimationStyleNormalizer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WebAnimationsStyleNormalizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NoopAnimationDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return WebAnimationsDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return supportsWebAnimations; });
/* unused harmony export ɵWebAnimationsPlayer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(4);

/**
 * @license Angular v4.2.5
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function optimizeGroupPlayer(players) {
    switch (players.length) {
        case 0:
            return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["NoopAnimationPlayer"]();
        case 1:
            return players[0];
        default:
            return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["ɵAnimationGroupPlayer"](players);
    }
}
function normalizeKeyframes(driver, normalizer, element, keyframes, preStyles, postStyles) {
    if (preStyles === void 0) { preStyles = {}; }
    if (postStyles === void 0) { postStyles = {}; }
    var errors = [];
    var normalizedKeyframes = [];
    var previousOffset = -1;
    var previousKeyframe = null;
    keyframes.forEach(function (kf) {
        var offset = kf['offset'];
        var isSameOffset = offset == previousOffset;
        var normalizedKeyframe = (isSameOffset && previousKeyframe) || {};
        Object.keys(kf).forEach(function (prop) {
            var normalizedProp = prop;
            var normalizedValue = kf[prop];
            if (normalizedValue == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["ɵPRE_STYLE"]) {
                normalizedValue = preStyles[prop];
            }
            else if (normalizedValue == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"]) {
                normalizedValue = postStyles[prop];
            }
            else if (prop != 'offset') {
                normalizedProp = normalizer.normalizePropertyName(prop, errors);
                normalizedValue = normalizer.normalizeStyleValue(prop, normalizedProp, kf[prop], errors);
            }
            normalizedKeyframe[normalizedProp] = normalizedValue;
        });
        if (!isSameOffset) {
            normalizedKeyframes.push(normalizedKeyframe);
        }
        previousKeyframe = normalizedKeyframe;
        previousOffset = offset;
    });
    if (errors.length) {
        var LINE_START = '\n - ';
        throw new Error("Unable to animate due to the following errors:" + LINE_START + errors.join(LINE_START));
    }
    return normalizedKeyframes;
}
function listenOnPlayer(player, eventName, event, callback) {
    switch (eventName) {
        case 'start':
            player.onStart(function () { return callback(event && copyAnimationEvent(event, 'start', player.totalTime)); });
            break;
        case 'done':
            player.onDone(function () { return callback(event && copyAnimationEvent(event, 'done', player.totalTime)); });
            break;
        case 'destroy':
            player.onDestroy(function () { return callback(event && copyAnimationEvent(event, 'destroy', player.totalTime)); });
            break;
    }
}
function copyAnimationEvent(e, phaseName, totalTime) {
    var event = makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName, totalTime == undefined ? e.totalTime : totalTime);
    var data = e['_data'];
    if (data != null) {
        event['_data'] = data;
    }
    return event;
}
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime) {
    if (phaseName === void 0) { phaseName = ''; }
    if (totalTime === void 0) { totalTime = 0; }
    return { element: element, triggerName: triggerName, fromState: fromState, toState: toState, phaseName: phaseName, totalTime: totalTime };
}
function getOrSetAsInMap(map, key, defaultValue) {
    var value;
    if (map instanceof Map) {
        value = map.get(key);
        if (!value) {
            map.set(key, value = defaultValue);
        }
    }
    else {
        value = map[key];
        if (!value) {
            value = map[key] = defaultValue;
        }
    }
    return value;
}
function parseTimelineCommand(command) {
    var separatorPos = command.indexOf(':');
    var id = command.substring(1, separatorPos);
    var action = command.substr(separatorPos + 1);
    return [id, action];
}
var _contains = function (elm1, elm2) { return false; };
var _matches = function (element, selector) { return false; };
var _query = function (element, selector, multi) {
    return [];
};
if (typeof Element != 'undefined') {
    // this is well supported in all browsers
    _contains = function (elm1, elm2) { return elm1.contains(elm2); };
    if (Element.prototype.matches) {
        _matches = function (element, selector) { return element.matches(selector); };
    }
    else {
        var proto = Element.prototype;
        var fn_1 = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector ||
            proto.oMatchesSelector || proto.webkitMatchesSelector;
        if (fn_1) {
            _matches = function (element, selector) { return fn_1.apply(element, [selector]); };
        }
    }
    _query = function (element, selector, multi) {
        var results = [];
        if (multi) {
            results.push.apply(results, element.querySelectorAll(selector));
        }
        else {
            var elm = element.querySelector(selector);
            if (elm) {
                results.push(elm);
            }
        }
        return results;
    };
}
var matchesElement = _matches;
var containsElement = _contains;
var invokeQuery = _query;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental
 */
var NoopAnimationDriver = (function () {
    function NoopAnimationDriver() {
    }
    NoopAnimationDriver.prototype.matchesElement = function (element, selector) {
        return matchesElement(element, selector);
    };
    NoopAnimationDriver.prototype.containsElement = function (elm1, elm2) { return containsElement(elm1, elm2); };
    NoopAnimationDriver.prototype.query = function (element, selector, multi) {
        return invokeQuery(element, selector, multi);
    };
    NoopAnimationDriver.prototype.computeStyle = function (element, prop, defaultValue) {
        return defaultValue || '';
    };
    NoopAnimationDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["NoopAnimationPlayer"]();
    };
    return NoopAnimationDriver;
}());
/**
 * @experimental
 */
var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    return AnimationDriver;
}());
AnimationDriver.NOOP = new NoopAnimationDriver();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ONE_SECOND = 1000;
var ENTER_CLASSNAME = 'ng-enter';
var LEAVE_CLASSNAME = 'ng-leave';
var ENTER_SELECTOR = '.ng-enter';
var LEAVE_SELECTOR = '.ng-leave';
var NG_TRIGGER_CLASSNAME = 'ng-trigger';
var NG_TRIGGER_SELECTOR = '.ng-trigger';
var NG_ANIMATING_CLASSNAME = 'ng-animating';
var NG_ANIMATING_SELECTOR = '.ng-animating';
/**
 * @param {?} value
 * @return {?}
 */
function resolveTimingValue(value) {
    if (typeof value == 'number')
        return value;
    var /** @type {?} */ matches = ((value)).match(/^(-?[\.\d]+)(m?s)/);
    if (!matches || matches.length < 2)
        return 0;
    return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
/**
 * @param {?} value
 * @param {?} unit
 * @return {?}
 */
function _convertTimeValueToMS(value, unit) {
    switch (unit) {
        case 's':
            return value * ONE_SECOND;
        default:
            return value;
    }
}
/**
 * @param {?} timings
 * @param {?} errors
 * @param {?=} allowNegativeValues
 * @return {?}
 */
function resolveTiming(timings, errors, allowNegativeValues) {
    return timings.hasOwnProperty('duration') ? (timings) :
        parseTimeExpression(/** @type {?} */ (timings), errors, allowNegativeValues);
}
/**
 * @param {?} exp
 * @param {?} errors
 * @param {?=} allowNegativeValues
 * @return {?}
 */
function parseTimeExpression(exp, errors, allowNegativeValues) {
    var /** @type {?} */ regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
    var /** @type {?} */ duration;
    var /** @type {?} */ delay = 0;
    var /** @type {?} */ easing = '';
    if (typeof exp === 'string') {
        var /** @type {?} */ matches = exp.match(regex);
        if (matches === null) {
            errors.push("The provided timing value \"" + exp + "\" is invalid.");
            return { duration: 0, delay: 0, easing: '' };
        }
        duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
        var /** @type {?} */ delayMatch = matches[3];
        if (delayMatch != null) {
            delay = _convertTimeValueToMS(Math.floor(parseFloat(delayMatch)), matches[4]);
        }
        var /** @type {?} */ easingVal = matches[5];
        if (easingVal) {
            easing = easingVal;
        }
    }
    else {
        duration = (exp);
    }
    if (!allowNegativeValues) {
        var /** @type {?} */ containsErrors = false;
        var /** @type {?} */ startIndex = errors.length;
        if (duration < 0) {
            errors.push("Duration values below 0 are not allowed for this animation step.");
            containsErrors = true;
        }
        if (delay < 0) {
            errors.push("Delay values below 0 are not allowed for this animation step.");
            containsErrors = true;
        }
        if (containsErrors) {
            errors.splice(startIndex, 0, "The provided timing value \"" + exp + "\" is invalid.");
        }
    }
    return { duration: duration, delay: delay, easing: easing };
}
/**
 * @param {?} obj
 * @param {?=} destination
 * @return {?}
 */
function copyObj(obj, destination) {
    if (destination === void 0) { destination = {}; }
    Object.keys(obj).forEach(function (prop) { destination[prop] = obj[prop]; });
    return destination;
}
/**
 * @param {?} styles
 * @return {?}
 */
function normalizeStyles(styles) {
    var /** @type {?} */ normalizedStyles = {};
    if (Array.isArray(styles)) {
        styles.forEach(function (data) { return copyStyles(data, false, normalizedStyles); });
    }
    else {
        copyStyles(styles, false, normalizedStyles);
    }
    return normalizedStyles;
}
/**
 * @param {?} styles
 * @param {?} readPrototype
 * @param {?=} destination
 * @return {?}
 */
function copyStyles(styles, readPrototype, destination) {
    if (destination === void 0) { destination = {}; }
    if (readPrototype) {
        // we make use of a for-in loop so that the
        // prototypically inherited properties are
        // revealed from the backFill map
        for (var /** @type {?} */ prop in styles) {
            destination[prop] = styles[prop];
        }
    }
    else {
        copyObj(styles, destination);
    }
    return destination;
}
/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */
function setStyles(element, styles) {
    if (element['style']) {
        Object.keys(styles).forEach(function (prop) {
            var /** @type {?} */ camelProp = dashCaseToCamelCase(prop);
            element.style[camelProp] = styles[prop];
        });
    }
}
/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */
function eraseStyles(element, styles) {
    if (element['style']) {
        Object.keys(styles).forEach(function (prop) {
            var /** @type {?} */ camelProp = dashCaseToCamelCase(prop);
            element.style[camelProp] = '';
        });
    }
}
/**
 * @param {?} steps
 * @return {?}
 */
function normalizeAnimationEntry(steps) {
    if (Array.isArray(steps)) {
        if (steps.length == 1)
            return steps[0];
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["sequence"])(steps);
    }
    return (steps);
}
/**
 * @param {?} value
 * @param {?} options
 * @param {?} errors
 * @return {?}
 */
function validateStyleParams(value, options, errors) {
    var /** @type {?} */ params = options.params || {};
    if (typeof value !== 'string')
        return;
    var /** @type {?} */ matches = value.toString().match(PARAM_REGEX);
    if (matches) {
        matches.forEach(function (varName) {
            if (!params.hasOwnProperty(varName)) {
                errors.push("Unable to resolve the local animation param " + varName + " in the given list of values");
            }
        });
    }
}
var PARAM_REGEX = /\{\{\s*(.+?)\s*\}\}/g;
/**
 * @param {?} value
 * @param {?} params
 * @param {?} errors
 * @return {?}
 */
function interpolateParams(value, params, errors) {
    var /** @type {?} */ original = value.toString();
    var /** @type {?} */ str = original.replace(PARAM_REGEX, function (_, varName) {
        var /** @type {?} */ localVal = params[varName];
        // this means that the value was never overidden by the data passed in by the user
        if (!params.hasOwnProperty(varName)) {
            errors.push("Please provide a value for the animation param " + varName);
            localVal = '';
        }
        return localVal.toString();
    });
    // we do this to assert that numeric values stay as they are
    return str == original ? value : str;
}
/**
 * @param {?} iterator
 * @return {?}
 */
function iteratorToArray(iterator) {
    var /** @type {?} */ arr = [];
    var /** @type {?} */ item = iterator.next();
    while (!item.done) {
        arr.push(item.value);
        item = iterator.next();
    }
    return arr;
}
/**
 * @param {?} source
 * @param {?} destination
 * @return {?}
 */
function mergeAnimationOptions(source, destination) {
    if (source.params) {
        var /** @type {?} */ p0_1 = source.params;
        if (!destination.params) {
            destination.params = {};
        }
        var /** @type {?} */ p1_1 = destination.params;
        Object.keys(p0_1).forEach(function (param) {
            if (!p1_1.hasOwnProperty(param)) {
                p1_1[param] = p0_1[param];
            }
        });
    }
    return destination;
}
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
/**
 * @param {?} input
 * @return {?}
 */
function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        return m[1].toUpperCase();
    });
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_ANIMATION_OPTIONS = {};
/**
 * @abstract
 */
var Ast = (function () {
    function Ast() {
        this.options = EMPTY_ANIMATION_OPTIONS;
    }
    /**
     * @abstract
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    Ast.prototype.visit = function (ast, context) { };
    Object.defineProperty(Ast.prototype, "params", {
        /**
         * @return {?}
         */
        get: function () { return this.options['params'] || null; },
        enumerable: true,
        configurable: true
    });
    return Ast;
}());
var TriggerAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](TriggerAst, _super);
    /**
     * @param {?} name
     * @param {?} states
     * @param {?} transitions
     */
    function TriggerAst(name, states, transitions) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.states = states;
        _this.transitions = transitions;
        _this.queryCount = 0;
        _this.depCount = 0;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TriggerAst.prototype.visit = function (visitor, context) { return visitor.visitTrigger(this, context); };
    return TriggerAst;
}(Ast));
var StateAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](StateAst, _super);
    /**
     * @param {?} name
     * @param {?} style
     */
    function StateAst(name, style$$1) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.style = style$$1;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    StateAst.prototype.visit = function (visitor, context) { return visitor.visitState(this, context); };
    return StateAst;
}(Ast));
var TransitionAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](TransitionAst, _super);
    /**
     * @param {?} matchers
     * @param {?} animation
     */
    function TransitionAst(matchers, animation) {
        var _this = _super.call(this) || this;
        _this.matchers = matchers;
        _this.animation = animation;
        _this.queryCount = 0;
        _this.depCount = 0;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TransitionAst.prototype.visit = function (visitor, context) { return visitor.visitTransition(this, context); };
    return TransitionAst;
}(Ast));
var SequenceAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](SequenceAst, _super);
    /**
     * @param {?} steps
     */
    function SequenceAst(steps) {
        var _this = _super.call(this) || this;
        _this.steps = steps;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    SequenceAst.prototype.visit = function (visitor, context) { return visitor.visitSequence(this, context); };
    return SequenceAst;
}(Ast));
var GroupAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](GroupAst, _super);
    /**
     * @param {?} steps
     */
    function GroupAst(steps) {
        var _this = _super.call(this) || this;
        _this.steps = steps;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    GroupAst.prototype.visit = function (visitor, context) { return visitor.visitGroup(this, context); };
    return GroupAst;
}(Ast));
var AnimateAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](AnimateAst, _super);
    /**
     * @param {?} timings
     * @param {?} style
     */
    function AnimateAst(timings, style$$1) {
        var _this = _super.call(this) || this;
        _this.timings = timings;
        _this.style = style$$1;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimateAst.prototype.visit = function (visitor, context) { return visitor.visitAnimate(this, context); };
    return AnimateAst;
}(Ast));
var StyleAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](StyleAst, _super);
    /**
     * @param {?} styles
     * @param {?} easing
     * @param {?} offset
     */
    function StyleAst(styles, easing, offset) {
        var _this = _super.call(this) || this;
        _this.styles = styles;
        _this.easing = easing;
        _this.offset = offset;
        _this.isEmptyStep = false;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    StyleAst.prototype.visit = function (visitor, context) { return visitor.visitStyle(this, context); };
    return StyleAst;
}(Ast));
var KeyframesAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](KeyframesAst, _super);
    /**
     * @param {?} styles
     */
    function KeyframesAst(styles) {
        var _this = _super.call(this) || this;
        _this.styles = styles;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    KeyframesAst.prototype.visit = function (visitor, context) { return visitor.visitKeyframes(this, context); };
    return KeyframesAst;
}(Ast));
var ReferenceAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ReferenceAst, _super);
    /**
     * @param {?} animation
     */
    function ReferenceAst(animation) {
        var _this = _super.call(this) || this;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ReferenceAst.prototype.visit = function (visitor, context) { return visitor.visitReference(this, context); };
    return ReferenceAst;
}(Ast));
var AnimateChildAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](AnimateChildAst, _super);
    function AnimateChildAst() {
        return _super.call(this) || this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimateChildAst.prototype.visit = function (visitor, context) { return visitor.visitAnimateChild(this, context); };
    return AnimateChildAst;
}(Ast));
var AnimateRefAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](AnimateRefAst, _super);
    /**
     * @param {?} animation
     */
    function AnimateRefAst(animation) {
        var _this = _super.call(this) || this;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimateRefAst.prototype.visit = function (visitor, context) { return visitor.visitAnimateRef(this, context); };
    return AnimateRefAst;
}(Ast));
var QueryAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](QueryAst, _super);
    /**
     * @param {?} selector
     * @param {?} limit
     * @param {?} optional
     * @param {?} includeSelf
     * @param {?} animation
     */
    function QueryAst(selector, limit, optional, includeSelf, animation) {
        var _this = _super.call(this) || this;
        _this.selector = selector;
        _this.limit = limit;
        _this.optional = optional;
        _this.includeSelf = includeSelf;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    QueryAst.prototype.visit = function (visitor, context) { return visitor.visitQuery(this, context); };
    return QueryAst;
}(Ast));
var StaggerAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](StaggerAst, _super);
    /**
     * @param {?} timings
     * @param {?} animation
     */
    function StaggerAst(timings, animation) {
        var _this = _super.call(this) || this;
        _this.timings = timings;
        _this.animation = animation;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    StaggerAst.prototype.visit = function (visitor, context) { return visitor.visitStagger(this, context); };
    return StaggerAst;
}(Ast));
var TimingAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](TimingAst, _super);
    /**
     * @param {?} duration
     * @param {?=} delay
     * @param {?=} easing
     */
    function TimingAst(duration, delay, easing) {
        if (delay === void 0) { delay = 0; }
        if (easing === void 0) { easing = null; }
        var _this = _super.call(this) || this;
        _this.duration = duration;
        _this.delay = delay;
        _this.easing = easing;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TimingAst.prototype.visit = function (visitor, context) { return visitor.visitTiming(this, context); };
    return TimingAst;
}(Ast));
var DynamicTimingAst = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](DynamicTimingAst, _super);
    /**
     * @param {?} value
     */
    function DynamicTimingAst(value) {
        var _this = _super.call(this, 0, 0, '') || this;
        _this.value = value;
        return _this;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    DynamicTimingAst.prototype.visit = function (visitor, context) { return visitor.visitTiming(this, context); };
    return DynamicTimingAst;
}(TimingAst));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} visitor
 * @param {?} node
 * @param {?} context
 * @return {?}
 */
function visitAnimationNode(visitor, node, context) {
    switch (node.type) {
        case 7 /* Trigger */:
            return visitor.visitTrigger(/** @type {?} */ (node), context);
        case 0 /* State */:
            return visitor.visitState(/** @type {?} */ (node), context);
        case 1 /* Transition */:
            return visitor.visitTransition(/** @type {?} */ (node), context);
        case 2 /* Sequence */:
            return visitor.visitSequence(/** @type {?} */ (node), context);
        case 3 /* Group */:
            return visitor.visitGroup(/** @type {?} */ (node), context);
        case 4 /* Animate */:
            return visitor.visitAnimate(/** @type {?} */ (node), context);
        case 5 /* Keyframes */:
            return visitor.visitKeyframes(/** @type {?} */ (node), context);
        case 6 /* Style */:
            return visitor.visitStyle(/** @type {?} */ (node), context);
        case 8 /* Reference */:
            return visitor.visitReference(/** @type {?} */ (node), context);
        case 9 /* AnimateChild */:
            return visitor.visitAnimateChild(/** @type {?} */ (node), context);
        case 10 /* AnimateRef */:
            return visitor.visitAnimateRef(/** @type {?} */ (node), context);
        case 11 /* Query */:
            return visitor.visitQuery(/** @type {?} */ (node), context);
        case 12 /* Stagger */:
            return visitor.visitStagger(/** @type {?} */ (node), context);
        default:
            throw new Error("Unable to resolve animation metadata node #" + node.type);
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ANY_STATE = '*';
/**
 * @param {?} transitionValue
 * @param {?} errors
 * @return {?}
 */
function parseTransitionExpr(transitionValue, errors) {
    var /** @type {?} */ expressions = [];
    if (typeof transitionValue == 'string') {
        ((transitionValue))
            .split(/\s*,\s*/)
            .forEach(function (str) { return parseInnerTransitionStr(str, expressions, errors); });
    }
    else {
        expressions.push(/** @type {?} */ (transitionValue));
    }
    return expressions;
}
/**
 * @param {?} eventStr
 * @param {?} expressions
 * @param {?} errors
 * @return {?}
 */
function parseInnerTransitionStr(eventStr, expressions, errors) {
    if (eventStr[0] == ':') {
        eventStr = parseAnimationAlias(eventStr, errors);
    }
    var /** @type {?} */ match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (match == null || match.length < 4) {
        errors.push("The provided transition expression \"" + eventStr + "\" is not supported");
        return expressions;
    }
    var /** @type {?} */ fromState = match[1];
    var /** @type {?} */ separator = match[2];
    var /** @type {?} */ toState = match[3];
    expressions.push(makeLambdaFromStates(fromState, toState));
    var /** @type {?} */ isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
    if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(makeLambdaFromStates(toState, fromState));
    }
}
/**
 * @param {?} alias
 * @param {?} errors
 * @return {?}
 */
function parseAnimationAlias(alias, errors) {
    switch (alias) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        default:
            errors.push("The transition alias value \"" + alias + "\" is not supported");
            return '* => *';
    }
}
/**
 * @param {?} lhs
 * @param {?} rhs
 * @return {?}
 */
function makeLambdaFromStates(lhs, rhs) {
    return function (fromState, toState) {
        var /** @type {?} */ lhsMatch = lhs == ANY_STATE || lhs == fromState;
        var /** @type {?} */ rhsMatch = rhs == ANY_STATE || rhs == toState;
        if (!lhsMatch && typeof fromState === 'boolean') {
            lhsMatch = fromState ? lhs === 'true' : lhs === 'false';
        }
        if (!rhsMatch && typeof toState === 'boolean') {
            rhsMatch = toState ? rhs === 'true' : rhs === 'false';
        }
        return lhsMatch && rhsMatch;
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SELF_TOKEN = ':self';
var SELF_TOKEN_REGEX = new RegExp("s*" + SELF_TOKEN + "s*,?", 'g');
/**
 * @param {?} metadata
 * @param {?} errors
 * @return {?}
 */
function buildAnimationAst(metadata, errors) {
    return new AnimationAstBuilderVisitor().build(metadata, errors);
}
var LEAVE_TOKEN = ':leave';
var LEAVE_TOKEN_REGEX = new RegExp(LEAVE_TOKEN, 'g');
var ENTER_TOKEN = ':enter';
var ENTER_TOKEN_REGEX = new RegExp(ENTER_TOKEN, 'g');
var ROOT_SELECTOR = '';
var AnimationAstBuilderVisitor = (function () {
    function AnimationAstBuilderVisitor() {
    }
    /**
     * @param {?} metadata
     * @param {?} errors
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.build = function (metadata, errors) {
        var /** @type {?} */ context = new AnimationAstBuilderContext(errors);
        this._resetContextStyleTimingState(context);
        return (visitAnimationNode(this, normalizeAnimationEntry(metadata), context));
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype._resetContextStyleTimingState = function (context) {
        context.currentQuerySelector = ROOT_SELECTOR;
        context.collectedStyles = {};
        context.collectedStyles[ROOT_SELECTOR] = {};
        context.currentTime = 0;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitTrigger = function (metadata, context) {
        var _this = this;
        var /** @type {?} */ queryCount = context.queryCount = 0;
        var /** @type {?} */ depCount = context.depCount = 0;
        var /** @type {?} */ states = [];
        var /** @type {?} */ transitions = [];
        metadata.definitions.forEach(function (def) {
            _this._resetContextStyleTimingState(context);
            if (def.type == 0 /* State */) {
                var /** @type {?} */ stateDef_1 = (def);
                var /** @type {?} */ name = stateDef_1.name;
                name.split(/\s*,\s*/).forEach(function (n) {
                    stateDef_1.name = n;
                    states.push(_this.visitState(stateDef_1, context));
                });
                stateDef_1.name = name;
            }
            else if (def.type == 1 /* Transition */) {
                var /** @type {?} */ transition = _this.visitTransition(/** @type {?} */ (def), context);
                queryCount += transition.queryCount;
                depCount += transition.depCount;
                transitions.push(transition);
            }
            else {
                context.errors.push('only state() and transition() definitions can sit inside of a trigger()');
            }
        });
        var /** @type {?} */ ast = new TriggerAst(metadata.name, states, transitions);
        ast.options = normalizeAnimationOptions(metadata.options);
        ast.queryCount = queryCount;
        ast.depCount = depCount;
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitState = function (metadata, context) {
        return new StateAst(metadata.name, this.visitStyle(metadata.styles, context));
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitTransition = function (metadata, context) {
        context.queryCount = 0;
        context.depCount = 0;
        var /** @type {?} */ entry = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        var /** @type {?} */ matchers = parseTransitionExpr(metadata.expr, context.errors);
        var /** @type {?} */ ast = new TransitionAst(matchers, entry);
        ast.options = normalizeAnimationOptions(metadata.options);
        ast.queryCount = context.queryCount;
        ast.depCount = context.depCount;
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitSequence = function (metadata, context) {
        var _this = this;
        var /** @type {?} */ ast = new SequenceAst(metadata.steps.map(function (s) { return visitAnimationNode(_this, s, context); }));
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitGroup = function (metadata, context) {
        var _this = this;
        var /** @type {?} */ currentTime = context.currentTime;
        var /** @type {?} */ furthestTime = 0;
        var /** @type {?} */ steps = metadata.steps.map(function (step) {
            context.currentTime = currentTime;
            var /** @type {?} */ innerAst = visitAnimationNode(_this, step, context);
            furthestTime = Math.max(furthestTime, context.currentTime);
            return innerAst;
        });
        context.currentTime = furthestTime;
        var /** @type {?} */ ast = new GroupAst(steps);
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitAnimate = function (metadata, context) {
        var /** @type {?} */ timingAst = constructTimingAst(metadata.timings, context.errors);
        context.currentAnimateTimings = timingAst;
        var /** @type {?} */ styles;
        var /** @type {?} */ styleMetadata = metadata.styles ? metadata.styles : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({});
        if (styleMetadata.type == 5 /* Keyframes */) {
            styles = this.visitKeyframes(/** @type {?} */ (styleMetadata), context);
        }
        else {
            var /** @type {?} */ styleMetadata_1 = (metadata.styles);
            var /** @type {?} */ isEmpty = false;
            if (!styleMetadata_1) {
                isEmpty = true;
                var /** @type {?} */ newStyleData = {};
                if (timingAst.easing) {
                    newStyleData['easing'] = timingAst.easing;
                }
                styleMetadata_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])(newStyleData);
            }
            context.currentTime += timingAst.duration + timingAst.delay;
            var /** @type {?} */ styleAst = this.visitStyle(styleMetadata_1, context);
            styleAst.isEmptyStep = isEmpty;
            styles = styleAst;
        }
        context.currentAnimateTimings = null;
        return new AnimateAst(timingAst, styles);
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitStyle = function (metadata, context) {
        var /** @type {?} */ ast = this._makeStyleAst(metadata, context);
        this._validateStyleAst(ast, context);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype._makeStyleAst = function (metadata, context) {
        var /** @type {?} */ styles = [];
        if (Array.isArray(metadata.styles)) {
            ((metadata.styles)).forEach(function (styleTuple) {
                if (typeof styleTuple == 'string') {
                    if (styleTuple == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"]) {
                        styles.push(/** @type {?} */ (styleTuple));
                    }
                    else {
                        context.errors.push("The provided style string value " + styleTuple + " is not allowed.");
                    }
                }
                else {
                    styles.push(/** @type {?} */ (styleTuple));
                }
            });
        }
        else {
            styles.push(metadata.styles);
        }
        var /** @type {?} */ collectedEasing = null;
        styles.forEach(function (styleData) {
            if (isObject(styleData)) {
                var /** @type {?} */ styleMap = (styleData);
                var /** @type {?} */ easing = styleMap['easing'];
                if (easing) {
                    collectedEasing = (easing);
                    delete styleMap['easing'];
                }
            }
        });
        return new StyleAst(styles, collectedEasing, metadata.offset);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype._validateStyleAst = function (ast, context) {
        var /** @type {?} */ timings = context.currentAnimateTimings;
        var /** @type {?} */ endTime = context.currentTime;
        var /** @type {?} */ startTime = context.currentTime;
        if (timings && startTime > 0) {
            startTime -= timings.duration + timings.delay;
        }
        ast.styles.forEach(function (tuple) {
            if (typeof tuple == 'string')
                return;
            Object.keys(tuple).forEach(function (prop) {
                var /** @type {?} */ collectedStyles = context.collectedStyles[((context.currentQuerySelector))];
                var /** @type {?} */ collectedEntry = collectedStyles[prop];
                var /** @type {?} */ updateCollectedStyle = true;
                if (collectedEntry) {
                    if (startTime != endTime && startTime >= collectedEntry.startTime &&
                        endTime <= collectedEntry.endTime) {
                        context.errors.push("The CSS property \"" + prop + "\" that exists between the times of \"" + collectedEntry.startTime + "ms\" and \"" + collectedEntry.endTime + "ms\" is also being animated in a parallel animation between the times of \"" + startTime + "ms\" and \"" + endTime + "ms\"");
                        updateCollectedStyle = false;
                    }
                    // we always choose the smaller start time value since we
                    // want to have a record of the entire animation window where
                    // the style property is being animated in between
                    startTime = collectedEntry.startTime;
                }
                if (updateCollectedStyle) {
                    collectedStyles[prop] = { startTime: startTime, endTime: endTime };
                }
                if (context.options) {
                    validateStyleParams(tuple[prop], context.options, context.errors);
                }
            });
        });
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitKeyframes = function (metadata, context) {
        var _this = this;
        if (!context.currentAnimateTimings) {
            context.errors.push("keyframes() must be placed inside of a call to animate()");
            return new KeyframesAst([]);
        }
        var /** @type {?} */ MAX_KEYFRAME_OFFSET = 1;
        var /** @type {?} */ totalKeyframesWithOffsets = 0;
        var /** @type {?} */ offsets = [];
        var /** @type {?} */ offsetsOutOfOrder = false;
        var /** @type {?} */ keyframesOutOfRange = false;
        var /** @type {?} */ previousOffset = 0;
        var /** @type {?} */ keyframes = metadata.steps.map(function (styles) {
            var /** @type {?} */ style$$1 = _this._makeStyleAst(styles, context);
            var /** @type {?} */ offsetVal = style$$1.offset != null ? style$$1.offset : consumeOffset(style$$1.styles);
            var /** @type {?} */ offset = 0;
            if (offsetVal != null) {
                totalKeyframesWithOffsets++;
                offset = style$$1.offset = offsetVal;
            }
            keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
            offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
            previousOffset = offset;
            offsets.push(offset);
            return style$$1;
        });
        if (keyframesOutOfRange) {
            context.errors.push("Please ensure that all keyframe offsets are between 0 and 1");
        }
        if (offsetsOutOfOrder) {
            context.errors.push("Please ensure that all keyframe offsets are in order");
        }
        var /** @type {?} */ length = metadata.steps.length;
        var /** @type {?} */ generatedOffset = 0;
        if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
            context.errors.push("Not all style() steps within the declared keyframes() contain offsets");
        }
        else if (totalKeyframesWithOffsets == 0) {
            generatedOffset = MAX_KEYFRAME_OFFSET / (length - 1);
        }
        var /** @type {?} */ limit = length - 1;
        var /** @type {?} */ currentTime = context.currentTime;
        var /** @type {?} */ currentAnimateTimings = ((context.currentAnimateTimings));
        var /** @type {?} */ animateDuration = currentAnimateTimings.duration;
        keyframes.forEach(function (kf, i) {
            var /** @type {?} */ offset = generatedOffset > 0 ? (i == limit ? 1 : (generatedOffset * i)) : offsets[i];
            var /** @type {?} */ durationUpToThisFrame = offset * animateDuration;
            context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame;
            currentAnimateTimings.duration = durationUpToThisFrame;
            _this._validateStyleAst(kf, context);
            kf.offset = offset;
        });
        return new KeyframesAst(keyframes);
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitReference = function (metadata, context) {
        var /** @type {?} */ entry = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        var /** @type {?} */ ast = new ReferenceAst(entry);
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitAnimateChild = function (metadata, context) {
        context.depCount++;
        var /** @type {?} */ ast = new AnimateChildAst();
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitAnimateRef = function (metadata, context) {
        var /** @type {?} */ animation = this.visitReference(metadata.animation, context);
        var /** @type {?} */ ast = new AnimateRefAst(animation);
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitQuery = function (metadata, context) {
        var /** @type {?} */ parentSelector = ((context.currentQuerySelector));
        var /** @type {?} */ options = ((metadata.options || {}));
        context.queryCount++;
        context.currentQuery = metadata;
        var _a = normalizeSelector(metadata.selector), selector = _a[0], includeSelf = _a[1];
        context.currentQuerySelector =
            parentSelector.length ? (parentSelector + ' ' + selector) : selector;
        getOrSetAsInMap(context.collectedStyles, context.currentQuerySelector, {});
        var /** @type {?} */ entry = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        context.currentQuery = null;
        context.currentQuerySelector = parentSelector;
        var /** @type {?} */ ast = new QueryAst(selector, options.limit || 0, !!options.optional, includeSelf, entry);
        ast.originalSelector = metadata.selector;
        ast.options = normalizeAnimationOptions(metadata.options);
        return ast;
    };
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    AnimationAstBuilderVisitor.prototype.visitStagger = function (metadata, context) {
        if (!context.currentQuery) {
            context.errors.push("stagger() can only be used inside of query()");
        }
        var /** @type {?} */ timings = metadata.timings === 'full' ?
            { duration: 0, delay: 0, easing: 'full' } :
            resolveTiming(metadata.timings, context.errors, true);
        var /** @type {?} */ animation = visitAnimationNode(this, normalizeAnimationEntry(metadata.animation), context);
        return new StaggerAst(timings, animation);
    };
    return AnimationAstBuilderVisitor;
}());
/**
 * @param {?} selector
 * @return {?}
 */
function normalizeSelector(selector) {
    var /** @type {?} */ hasAmpersand = selector.split(/\s*,\s*/).find(function (token) { return token == SELF_TOKEN; }) ? true : false;
    if (hasAmpersand) {
        selector = selector.replace(SELF_TOKEN_REGEX, '');
    }
    selector = selector.replace(ENTER_TOKEN_REGEX, ENTER_SELECTOR)
        .replace(LEAVE_TOKEN_REGEX, LEAVE_SELECTOR)
        .replace(/@\*/g, NG_TRIGGER_SELECTOR)
        .replace(/@\w+/g, function (match) { return NG_TRIGGER_SELECTOR + '-' + match.substr(1); })
        .replace(/:animating/g, NG_ANIMATING_SELECTOR);
    return [selector, hasAmpersand];
}
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeParams(obj) {
    return obj ? copyObj(obj) : null;
}
var AnimationAstBuilderContext = (function () {
    /**
     * @param {?} errors
     */
    function AnimationAstBuilderContext(errors) {
        this.errors = errors;
        this.queryCount = 0;
        this.depCount = 0;
        this.currentTransition = null;
        this.currentQuery = null;
        this.currentQuerySelector = null;
        this.currentAnimateTimings = null;
        this.currentTime = 0;
        this.collectedStyles = {};
        this.options = null;
    }
    return AnimationAstBuilderContext;
}());
/**
 * @param {?} styles
 * @return {?}
 */
function consumeOffset(styles) {
    if (typeof styles == 'string')
        return null;
    var /** @type {?} */ offset = null;
    if (Array.isArray(styles)) {
        styles.forEach(function (styleTuple) {
            if (isObject(styleTuple) && styleTuple.hasOwnProperty('offset')) {
                var /** @type {?} */ obj = (styleTuple);
                offset = parseFloat(/** @type {?} */ (obj['offset']));
                delete obj['offset'];
            }
        });
    }
    else if (isObject(styles) && styles.hasOwnProperty('offset')) {
        var /** @type {?} */ obj = (styles);
        offset = parseFloat(/** @type {?} */ (obj['offset']));
        delete obj['offset'];
    }
    return offset;
}
/**
 * @param {?} value
 * @return {?}
 */
function isObject(value) {
    return !Array.isArray(value) && typeof value == 'object';
}
/**
 * @param {?} value
 * @param {?} errors
 * @return {?}
 */
function constructTimingAst(value, errors) {
    var /** @type {?} */ timings = null;
    if (value.hasOwnProperty('duration')) {
        timings = (value);
    }
    else if (typeof value == 'number') {
        var /** @type {?} */ duration = resolveTiming(/** @type {?} */ (value), errors).duration;
        return new TimingAst(/** @type {?} */ (value), 0, '');
    }
    var /** @type {?} */ strValue = (value);
    var /** @type {?} */ isDynamic = strValue.split(/\s+/).some(function (v) { return v.charAt(0) == '{' && v.charAt(1) == '{'; });
    if (isDynamic) {
        return new DynamicTimingAst(strValue);
    }
    timings = timings || resolveTiming(strValue, errors);
    return new TimingAst(timings.duration, timings.delay, timings.easing);
}
/**
 * @param {?} options
 * @return {?}
 */
function normalizeAnimationOptions(options) {
    if (options) {
        options = copyObj(options);
        if (options['params']) {
            options['params'] = ((normalizeParams(options['params'])));
        }
    }
    else {
        options = {};
    }
    return options;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} element
 * @param {?} keyframes
 * @param {?} preStyleProps
 * @param {?} postStyleProps
 * @param {?} duration
 * @param {?} delay
 * @param {?=} easing
 * @param {?=} subTimeline
 * @return {?}
 */
function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing, subTimeline) {
    if (easing === void 0) { easing = null; }
    if (subTimeline === void 0) { subTimeline = false; }
    return {
        type: 1 /* TimelineAnimation */,
        element: element,
        keyframes: keyframes,
        preStyleProps: preStyleProps,
        postStyleProps: postStyleProps,
        duration: duration,
        delay: delay,
        totalTime: duration + delay, easing: easing, subTimeline: subTimeline
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ElementInstructionMap = (function () {
    function ElementInstructionMap() {
        this._map = new Map();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    ElementInstructionMap.prototype.consume = function (element) {
        var /** @type {?} */ instructions = this._map.get(element);
        if (instructions) {
            this._map.delete(element);
        }
        else {
            instructions = [];
        }
        return instructions;
    };
    /**
     * @param {?} element
     * @param {?} instructions
     * @return {?}
     */
    ElementInstructionMap.prototype.append = function (element, instructions) {
        var /** @type {?} */ existingInstructions = this._map.get(element);
        if (!existingInstructions) {
            this._map.set(element, existingInstructions = []);
        }
        existingInstructions.push.apply(existingInstructions, instructions);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    ElementInstructionMap.prototype.has = function (element) { return this._map.has(element); };
    /**
     * @return {?}
     */
    ElementInstructionMap.prototype.clear = function () { this._map.clear(); };
    return ElementInstructionMap;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ONE_FRAME_IN_MILLISECONDS = 1;
/**
 * @param {?} driver
 * @param {?} rootElement
 * @param {?} ast
 * @param {?=} startingStyles
 * @param {?=} finalStyles
 * @param {?=} options
 * @param {?=} subInstructions
 * @param {?=} errors
 * @return {?}
 */
function buildAnimationTimelines(driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors) {
    if (startingStyles === void 0) { startingStyles = {}; }
    if (finalStyles === void 0) { finalStyles = {}; }
    if (errors === void 0) { errors = []; }
    return new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors);
}
var AnimationTimelineBuilderVisitor = (function () {
    function AnimationTimelineBuilderVisitor() {
    }
    /**
     * @param {?} driver
     * @param {?} rootElement
     * @param {?} ast
     * @param {?} startingStyles
     * @param {?} finalStyles
     * @param {?} options
     * @param {?=} subInstructions
     * @param {?=} errors
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.buildKeyframes = function (driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors) {
        if (errors === void 0) { errors = []; }
        subInstructions = subInstructions || new ElementInstructionMap();
        var /** @type {?} */ context = new AnimationTimelineContext(driver, rootElement, subInstructions, errors, []);
        context.options = options;
        context.currentTimeline.setStyles([startingStyles], null, context.errors, options);
        ast.visit(this, context);
        // this checks to see if an actual animation happened
        var /** @type {?} */ timelines = context.timelines.filter(function (timeline) { return timeline.containsAnimation(); });
        if (timelines.length && Object.keys(finalStyles).length) {
            var /** @type {?} */ tl = timelines[timelines.length - 1];
            if (!tl.allowOnlyTimelineStyles()) {
                tl.setStyles([finalStyles], null, context.errors, options);
            }
        }
        return timelines.length ? timelines.map(function (timeline) { return timeline.buildKeyframes(); }) :
            [createTimelineInstruction(rootElement, [], [], [], 0, 0, '', false)];
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitTrigger = function (ast, context) {
        // these values are not visited in this AST
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitState = function (ast, context) {
        // these values are not visited in this AST
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitTransition = function (ast, context) {
        // these values are not visited in this AST
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitAnimateChild = function (ast, context) {
        var /** @type {?} */ elementInstructions = context.subInstructions.consume(context.element);
        if (elementInstructions) {
            var /** @type {?} */ innerContext = context.createSubContext(ast.options);
            var /** @type {?} */ startTime = context.currentTimeline.currentTime;
            var /** @type {?} */ endTime = this._visitSubInstructions(elementInstructions, innerContext, /** @type {?} */ (innerContext.options));
            if (startTime != endTime) {
                // we do this on the upper context because we created a sub context for
                // the sub child animations
                context.transformIntoNewTimeline(endTime);
            }
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitAnimateRef = function (ast, context) {
        var /** @type {?} */ innerContext = context.createSubContext(ast.options);
        innerContext.transformIntoNewTimeline();
        this.visitReference(ast.animation, innerContext);
        context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime);
        context.previousNode = ast;
    };
    /**
     * @param {?} instructions
     * @param {?} context
     * @param {?} options
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype._visitSubInstructions = function (instructions, context, options) {
        var /** @type {?} */ startTime = context.currentTimeline.currentTime;
        var /** @type {?} */ furthestTime = startTime;
        // this is a special-case for when a user wants to skip a sub
        // animation from being fired entirely.
        var /** @type {?} */ duration = options.duration != null ? resolveTimingValue(options.duration) : null;
        var /** @type {?} */ delay = options.delay != null ? resolveTimingValue(options.delay) : null;
        if (duration !== 0) {
            instructions.forEach(function (instruction) {
                var /** @type {?} */ instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
                furthestTime =
                    Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
            });
        }
        return furthestTime;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitReference = function (ast, context) {
        context.updateOptions(ast.options, true);
        ast.animation.visit(this, context);
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitSequence = function (ast, context) {
        var _this = this;
        var /** @type {?} */ subContextCount = context.subContextCount;
        var /** @type {?} */ ctx = context;
        var /** @type {?} */ options = ast.options;
        if (options && (options.params || options.delay)) {
            ctx = context.createSubContext(options);
            ctx.transformIntoNewTimeline();
            if (options.delay != null) {
                if (ctx.previousNode instanceof StyleAst) {
                    ctx.currentTimeline.snapshotCurrentStyles();
                    ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
                }
                var /** @type {?} */ delay = resolveTimingValue(options.delay);
                ctx.delayNextStep(delay);
            }
        }
        if (ast.steps.length) {
            ast.steps.forEach(function (s) { return s.visit(_this, ctx); });
            // this is here just incase the inner steps only contain or end with a style() call
            ctx.currentTimeline.applyStylesToKeyframe();
            // this means that some animation function within the sequence
            // ended up creating a sub timeline (which means the current
            // timeline cannot overlap with the contents of the sequence)
            if (ctx.subContextCount > subContextCount) {
                ctx.transformIntoNewTimeline();
            }
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitGroup = function (ast, context) {
        var _this = this;
        var /** @type {?} */ innerTimelines = [];
        var /** @type {?} */ furthestTime = context.currentTimeline.currentTime;
        var /** @type {?} */ delay = ast.options && ast.options.delay ? resolveTimingValue(ast.options.delay) : 0;
        ast.steps.forEach(function (s) {
            var /** @type {?} */ innerContext = context.createSubContext(ast.options);
            if (delay) {
                innerContext.delayNextStep(delay);
            }
            s.visit(_this, innerContext);
            furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
            innerTimelines.push(innerContext.currentTimeline);
        });
        // this operation is run after the AST loop because otherwise
        // if the parent timeline's collected styles were updated then
        // it would pass in invalid data into the new-to-be forked items
        innerTimelines.forEach(function (timeline) { return context.currentTimeline.mergeTimelineCollectedStyles(timeline); });
        context.transformIntoNewTimeline(furthestTime);
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitTiming = function (ast, context) {
        if (ast instanceof DynamicTimingAst) {
            var /** @type {?} */ strValue = context.params ?
                interpolateParams(ast.value, context.params, context.errors) :
                ast.value.toString();
            return resolveTiming(strValue, context.errors);
        }
        else {
            return { duration: ast.duration, delay: ast.delay, easing: ast.easing };
        }
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitAnimate = function (ast, context) {
        var /** @type {?} */ timings = context.currentAnimateTimings = this.visitTiming(ast.timings, context);
        var /** @type {?} */ timeline = context.currentTimeline;
        if (timings.delay) {
            context.incrementTime(timings.delay);
            timeline.snapshotCurrentStyles();
        }
        var /** @type {?} */ style$$1 = ast.style;
        if (style$$1 instanceof KeyframesAst) {
            this.visitKeyframes(style$$1, context);
        }
        else {
            context.incrementTime(timings.duration);
            this.visitStyle(/** @type {?} */ (style$$1), context);
            timeline.applyStylesToKeyframe();
        }
        context.currentAnimateTimings = null;
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitStyle = function (ast, context) {
        var /** @type {?} */ timeline = context.currentTimeline;
        var /** @type {?} */ timings = ((context.currentAnimateTimings));
        // this is a special case for when a style() call
        // directly follows  an animate() call (but not inside of an animate() call)
        if (!timings && timeline.getCurrentStyleProperties().length) {
            timeline.forwardFrame();
        }
        var /** @type {?} */ easing = (timings && timings.easing) || ast.easing;
        if (ast.isEmptyStep) {
            timeline.applyEmptyStep(easing);
        }
        else {
            timeline.setStyles(ast.styles, easing, context.errors, context.options);
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitKeyframes = function (ast, context) {
        var /** @type {?} */ currentAnimateTimings = ((context.currentAnimateTimings));
        var /** @type {?} */ startTime = (((context.currentTimeline))).duration;
        var /** @type {?} */ duration = currentAnimateTimings.duration;
        var /** @type {?} */ innerContext = context.createSubContext();
        var /** @type {?} */ innerTimeline = innerContext.currentTimeline;
        innerTimeline.easing = currentAnimateTimings.easing;
        ast.styles.forEach(function (step) {
            var /** @type {?} */ offset = step.offset || 0;
            innerTimeline.forwardTime(offset * duration);
            innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options);
            innerTimeline.applyStylesToKeyframe();
        });
        // this will ensure that the parent timeline gets all the styles from
        // the child even if the new timeline below is not used
        context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
        // we do this because the window between this timeline and the sub timeline
        // should ensure that the styles within are exactly the same as they were before
        context.transformIntoNewTimeline(startTime + duration);
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitQuery = function (ast, context) {
        var _this = this;
        // in the event that the first step before this is a style step we need
        // to ensure the styles are applied before the children are animated
        var /** @type {?} */ startTime = context.currentTimeline.currentTime;
        var /** @type {?} */ options = ((ast.options || {}));
        var /** @type {?} */ delay = options.delay ? resolveTimingValue(options.delay) : 0;
        if (delay && (context.previousNode instanceof StyleAst ||
            (startTime == 0 && context.currentTimeline.getCurrentStyleProperties().length))) {
            context.currentTimeline.snapshotCurrentStyles();
            context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        }
        var /** @type {?} */ furthestTime = startTime;
        var /** @type {?} */ elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, options.optional ? true : false, context.errors);
        context.currentQueryTotal = elms.length;
        var /** @type {?} */ sameElementTimeline = null;
        elms.forEach(function (element, i) {
            context.currentQueryIndex = i;
            var /** @type {?} */ innerContext = context.createSubContext(ast.options, element);
            if (delay) {
                innerContext.delayNextStep(delay);
            }
            if (element === context.element) {
                sameElementTimeline = innerContext.currentTimeline;
            }
            ast.animation.visit(_this, innerContext);
            // this is here just incase the inner steps only contain or end
            // with a style() call (which is here to signal that this is a preparatory
            // call to style an element before it is animated again)
            innerContext.currentTimeline.applyStylesToKeyframe();
            var /** @type {?} */ endTime = innerContext.currentTimeline.currentTime;
            furthestTime = Math.max(furthestTime, endTime);
        });
        context.currentQueryIndex = 0;
        context.currentQueryTotal = 0;
        context.transformIntoNewTimeline(furthestTime);
        if (sameElementTimeline) {
            context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline);
            context.currentTimeline.snapshotCurrentStyles();
        }
        context.previousNode = ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AnimationTimelineBuilderVisitor.prototype.visitStagger = function (ast, context) {
        var /** @type {?} */ parentContext = ((context.parentContext));
        var /** @type {?} */ tl = context.currentTimeline;
        var /** @type {?} */ timings = ast.timings;
        var /** @type {?} */ duration = Math.abs(timings.duration);
        var /** @type {?} */ maxTime = duration * (context.currentQueryTotal - 1);
        var /** @type {?} */ delay = duration * context.currentQueryIndex;
        var /** @type {?} */ staggerTransformer = timings.duration < 0 ? 'reverse' : timings.easing;
        switch (staggerTransformer) {
            case 'reverse':
                delay = maxTime - delay;
                break;
            case 'full':
                delay = parentContext.currentStaggerTime;
                break;
        }
        var /** @type {?} */ timeline = context.currentTimeline;
        if (delay) {
            timeline.delayNextStep(delay);
        }
        var /** @type {?} */ startingTime = timeline.currentTime;
        ast.animation.visit(this, context);
        context.previousNode = ast;
        // time = duration + delay
        // the reason why this computation is so complex is because
        // the inner timeline may either have a delay value or a stretched
        // keyframe depending on if a subtimeline is not used or is used.
        parentContext.currentStaggerTime =
            (tl.currentTime - startingTime) + (tl.startTime - parentContext.currentTimeline.startTime);
    };
    return AnimationTimelineBuilderVisitor;
}());
var DEFAULT_NOOP_PREVIOUS_NODE = ({});
var AnimationTimelineContext = (function () {
    /**
     * @param {?} _driver
     * @param {?} element
     * @param {?} subInstructions
     * @param {?} errors
     * @param {?} timelines
     * @param {?=} initialTimeline
     */
    function AnimationTimelineContext(_driver, element, subInstructions, errors, timelines, initialTimeline) {
        this._driver = _driver;
        this.element = element;
        this.subInstructions = subInstructions;
        this.errors = errors;
        this.timelines = timelines;
        this.parentContext = null;
        this.currentAnimateTimings = null;
        this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        this.subContextCount = 0;
        this.options = {};
        this.currentQueryIndex = 0;
        this.currentQueryTotal = 0;
        this.currentStaggerTime = 0;
        this.currentTimeline = initialTimeline || new TimelineBuilder(element, 0);
        timelines.push(this.currentTimeline);
    }
    Object.defineProperty(AnimationTimelineContext.prototype, "params", {
        /**
         * @return {?}
         */
        get: function () { return this.options.params; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} options
     * @param {?=} skipIfExists
     * @return {?}
     */
    AnimationTimelineContext.prototype.updateOptions = function (options, skipIfExists) {
        var _this = this;
        if (!options)
            return;
        var /** @type {?} */ newOptions = (options);
        var /** @type {?} */ optionsToUpdate = this.options;
        // NOTE: this will get patched up when other animation methods support duration overrides
        if (newOptions.duration != null) {
            ((optionsToUpdate)).duration = resolveTimingValue(newOptions.duration);
        }
        if (newOptions.delay != null) {
            optionsToUpdate.delay = resolveTimingValue(newOptions.delay);
        }
        var /** @type {?} */ newParams = newOptions.params;
        if (newParams) {
            var /** @type {?} */ paramsToUpdate_1 = ((optionsToUpdate.params));
            if (!paramsToUpdate_1) {
                paramsToUpdate_1 = this.options.params = {};
            }
            Object.keys(newParams).forEach(function (name) {
                if (!skipIfExists || !paramsToUpdate_1.hasOwnProperty(name)) {
                    paramsToUpdate_1[name] = interpolateParams(newParams[name], paramsToUpdate_1, _this.errors);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    AnimationTimelineContext.prototype._copyOptions = function () {
        var /** @type {?} */ options = {};
        if (this.options) {
            var /** @type {?} */ oldParams_1 = this.options.params;
            if (oldParams_1) {
                var /** @type {?} */ params_1 = options['params'] = {};
                Object.keys(this.options.params).forEach(function (name) { params_1[name] = oldParams_1[name]; });
            }
        }
        return options;
    };
    /**
     * @param {?=} options
     * @param {?=} element
     * @param {?=} newTime
     * @return {?}
     */
    AnimationTimelineContext.prototype.createSubContext = function (options, element, newTime) {
        if (options === void 0) { options = null; }
        var /** @type {?} */ target = element || this.element;
        var /** @type {?} */ context = new AnimationTimelineContext(this._driver, target, this.subInstructions, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
        context.previousNode = this.previousNode;
        context.currentAnimateTimings = this.currentAnimateTimings;
        context.options = this._copyOptions();
        context.updateOptions(options);
        context.currentQueryIndex = this.currentQueryIndex;
        context.currentQueryTotal = this.currentQueryTotal;
        context.parentContext = this;
        this.subContextCount++;
        return context;
    };
    /**
     * @param {?=} newTime
     * @return {?}
     */
    AnimationTimelineContext.prototype.transformIntoNewTimeline = function (newTime) {
        this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        this.currentTimeline = this.currentTimeline.fork(this.element, newTime);
        this.timelines.push(this.currentTimeline);
        return this.currentTimeline;
    };
    /**
     * @param {?} instruction
     * @param {?} duration
     * @param {?} delay
     * @return {?}
     */
    AnimationTimelineContext.prototype.appendInstructionToTimeline = function (instruction, duration, delay) {
        var /** @type {?} */ updatedTimings = {
            duration: duration != null ? duration : instruction.duration,
            delay: this.currentTimeline.currentTime + (delay != null ? delay : 0) + instruction.delay,
            easing: ''
        };
        var /** @type {?} */ builder = new SubTimelineBuilder(instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
        this.timelines.push(builder);
        return updatedTimings;
    };
    /**
     * @param {?} time
     * @return {?}
     */
    AnimationTimelineContext.prototype.incrementTime = function (time) {
        this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
    };
    /**
     * @param {?} delay
     * @return {?}
     */
    AnimationTimelineContext.prototype.delayNextStep = function (delay) {
        // negative delays are not yet supported
        if (delay > 0) {
            this.currentTimeline.delayNextStep(delay);
        }
    };
    /**
     * @param {?} selector
     * @param {?} originalSelector
     * @param {?} limit
     * @param {?} includeSelf
     * @param {?} optional
     * @param {?} errors
     * @return {?}
     */
    AnimationTimelineContext.prototype.invokeQuery = function (selector, originalSelector, limit, includeSelf, optional, errors) {
        var /** @type {?} */ results = [];
        if (includeSelf) {
            results.push(this.element);
        }
        if (selector.length > 0) {
            var /** @type {?} */ multi = limit != 1;
            results.push.apply(results, this._driver.query(this.element, selector, multi));
        }
        if (!optional && results.length == 0) {
            errors.push("`query(\"" + originalSelector + "\")` returned zero elements. (Use `query(\"" + originalSelector + "\", { optional: true })` if you wish to allow this.)");
        }
        return results;
    };
    return AnimationTimelineContext;
}());
var TimelineBuilder = (function () {
    /**
     * @param {?} element
     * @param {?} startTime
     * @param {?=} _elementTimelineStylesLookup
     */
    function TimelineBuilder(element, startTime, _elementTimelineStylesLookup) {
        this.element = element;
        this.startTime = startTime;
        this._elementTimelineStylesLookup = _elementTimelineStylesLookup;
        this.duration = 0;
        this._previousKeyframe = {};
        this._currentKeyframe = {};
        this._keyframes = new Map();
        this._styleSummary = {};
        this._pendingStyles = {};
        this._backFill = {};
        this._currentEmptyStepKeyframe = null;
        if (!this._elementTimelineStylesLookup) {
            this._elementTimelineStylesLookup = new Map();
        }
        this._localTimelineStyles = Object.create(this._backFill, {});
        this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element);
        if (!this._globalTimelineStyles) {
            this._globalTimelineStyles = this._localTimelineStyles;
            this._elementTimelineStylesLookup.set(element, this._localTimelineStyles);
        }
        this._loadKeyframe();
    }
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.containsAnimation = function () {
        switch (this._keyframes.size) {
            case 0:
                return false;
            case 1:
                return this.getCurrentStyleProperties().length > 0;
            default:
                return true;
        }
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.getCurrentStyleProperties = function () { return Object.keys(this._currentKeyframe); };
    Object.defineProperty(TimelineBuilder.prototype, "currentTime", {
        /**
         * @return {?}
         */
        get: function () { return this.startTime + this.duration; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} delay
     * @return {?}
     */
    TimelineBuilder.prototype.delayNextStep = function (delay) {
        // in the event that a style() step is placed right before a stagger()
        // and that style() step is the very first style() value in the animation
        // then we need to make a copy of the keyframe [0, copy, 1] so that the delay
        // properly applies the style() values to work with the stagger...
        var /** @type {?} */ hasPreStyleStep = this._keyframes.size == 1 && Object.keys(this._pendingStyles).length;
        if (this.duration || hasPreStyleStep) {
            this.forwardTime(this.currentTime + delay);
            if (hasPreStyleStep) {
                this.snapshotCurrentStyles();
            }
        }
        else {
            this.startTime += delay;
        }
    };
    /**
     * @param {?} element
     * @param {?=} currentTime
     * @return {?}
     */
    TimelineBuilder.prototype.fork = function (element, currentTime) {
        this.applyStylesToKeyframe();
        return new TimelineBuilder(element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype._loadKeyframe = function () {
        if (this._currentKeyframe) {
            this._previousKeyframe = this._currentKeyframe;
        }
        this._currentKeyframe = ((this._keyframes.get(this.duration)));
        if (!this._currentKeyframe) {
            this._currentKeyframe = Object.create(this._backFill, {});
            this._keyframes.set(this.duration, this._currentKeyframe);
        }
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.forwardFrame = function () {
        this.duration += ONE_FRAME_IN_MILLISECONDS;
        this._loadKeyframe();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimelineBuilder.prototype.forwardTime = function (time) {
        this.applyStylesToKeyframe();
        this.duration = time;
        this._loadKeyframe();
    };
    /**
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    TimelineBuilder.prototype._updateStyle = function (prop, value) {
        this._localTimelineStyles[prop] = value;
        this._globalTimelineStyles[prop] = value;
        this._styleSummary[prop] = { time: this.currentTime, value: value };
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.allowOnlyTimelineStyles = function () { return this._currentEmptyStepKeyframe !== this._currentKeyframe; };
    /**
     * @param {?} easing
     * @return {?}
     */
    TimelineBuilder.prototype.applyEmptyStep = function (easing) {
        var _this = this;
        if (easing) {
            this._previousKeyframe['easing'] = easing;
        }
        // special case for animate(duration):
        // all missing styles are filled with a `*` value then
        // if any destination styles are filled in later on the same
        // keyframe then they will override the overridden styles
        // We use `_globalTimelineStyles` here because there may be
        // styles in previous keyframes that are not present in this timeline
        Object.keys(this._globalTimelineStyles).forEach(function (prop) {
            _this._backFill[prop] = _this._globalTimelineStyles[prop] || __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"];
            _this._currentKeyframe[prop] = __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"];
        });
        this._currentEmptyStepKeyframe = this._currentKeyframe;
    };
    /**
     * @param {?} input
     * @param {?} easing
     * @param {?} errors
     * @param {?=} options
     * @return {?}
     */
    TimelineBuilder.prototype.setStyles = function (input, easing, errors, options) {
        var _this = this;
        if (easing) {
            this._previousKeyframe['easing'] = easing;
        }
        var /** @type {?} */ params = (options && options.params) || {};
        var /** @type {?} */ styles = flattenStyles(input, this._globalTimelineStyles);
        Object.keys(styles).forEach(function (prop) {
            var /** @type {?} */ val = interpolateParams(styles[prop], params, errors);
            _this._pendingStyles[prop] = val;
            if (!_this._localTimelineStyles.hasOwnProperty(prop)) {
                _this._backFill[prop] = _this._globalTimelineStyles.hasOwnProperty(prop) ?
                    _this._globalTimelineStyles[prop] :
                    __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"];
            }
            _this._updateStyle(prop, val);
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.applyStylesToKeyframe = function () {
        var _this = this;
        var /** @type {?} */ styles = this._pendingStyles;
        var /** @type {?} */ props = Object.keys(styles);
        if (props.length == 0)
            return;
        this._pendingStyles = {};
        props.forEach(function (prop) {
            var /** @type {?} */ val = styles[prop];
            _this._currentKeyframe[prop] = val;
        });
        Object.keys(this._localTimelineStyles).forEach(function (prop) {
            if (!_this._currentKeyframe.hasOwnProperty(prop)) {
                _this._currentKeyframe[prop] = _this._localTimelineStyles[prop];
            }
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.snapshotCurrentStyles = function () {
        var _this = this;
        Object.keys(this._localTimelineStyles).forEach(function (prop) {
            var /** @type {?} */ val = _this._localTimelineStyles[prop];
            _this._pendingStyles[prop] = val;
            _this._updateStyle(prop, val);
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.getFinalKeyframe = function () { return this._keyframes.get(this.duration); };
    Object.defineProperty(TimelineBuilder.prototype, "properties", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ properties = [];
            for (var /** @type {?} */ prop in this._currentKeyframe) {
                properties.push(prop);
            }
            return properties;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} timeline
     * @return {?}
     */
    TimelineBuilder.prototype.mergeTimelineCollectedStyles = function (timeline) {
        var _this = this;
        Object.keys(timeline._styleSummary).forEach(function (prop) {
            var /** @type {?} */ details0 = _this._styleSummary[prop];
            var /** @type {?} */ details1 = timeline._styleSummary[prop];
            if (!details0 || details1.time > details0.time) {
                _this._updateStyle(prop, details1.value);
            }
        });
    };
    /**
     * @return {?}
     */
    TimelineBuilder.prototype.buildKeyframes = function () {
        var _this = this;
        this.applyStylesToKeyframe();
        var /** @type {?} */ preStyleProps = new Set();
        var /** @type {?} */ postStyleProps = new Set();
        var /** @type {?} */ isEmpty = this._keyframes.size === 1 && this.duration === 0;
        var /** @type {?} */ finalKeyframes = [];
        this._keyframes.forEach(function (keyframe, time) {
            var /** @type {?} */ finalKeyframe = copyStyles(keyframe, true);
            Object.keys(finalKeyframe).forEach(function (prop) {
                var /** @type {?} */ value = finalKeyframe[prop];
                if (value == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["ɵPRE_STYLE"]) {
                    preStyleProps.add(prop);
                }
                else if (value == __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"]) {
                    postStyleProps.add(prop);
                }
            });
            if (!isEmpty) {
                finalKeyframe['offset'] = time / _this.duration;
            }
            finalKeyframes.push(finalKeyframe);
        });
        var /** @type {?} */ preProps = preStyleProps.size ? iteratorToArray(preStyleProps.values()) : [];
        var /** @type {?} */ postProps = postStyleProps.size ? iteratorToArray(postStyleProps.values()) : [];
        // special case for a 0-second animation (which is designed just to place styles onscreen)
        if (isEmpty) {
            var /** @type {?} */ kf0 = finalKeyframes[0];
            var /** @type {?} */ kf1 = copyObj(kf0);
            kf0['offset'] = 0;
            kf1['offset'] = 1;
            finalKeyframes = [kf0, kf1];
        }
        return createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, false);
    };
    return TimelineBuilder;
}());
var SubTimelineBuilder = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](SubTimelineBuilder, _super);
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} preStyleProps
     * @param {?} postStyleProps
     * @param {?} timings
     * @param {?=} _stretchStartingKeyframe
     */
    function SubTimelineBuilder(element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe) {
        if (_stretchStartingKeyframe === void 0) { _stretchStartingKeyframe = false; }
        var _this = _super.call(this, element, timings.delay) || this;
        _this.element = element;
        _this.keyframes = keyframes;
        _this.preStyleProps = preStyleProps;
        _this.postStyleProps = postStyleProps;
        _this._stretchStartingKeyframe = _stretchStartingKeyframe;
        _this.timings = { duration: timings.duration, delay: timings.delay, easing: timings.easing };
        return _this;
    }
    /**
     * @return {?}
     */
    SubTimelineBuilder.prototype.containsAnimation = function () { return this.keyframes.length > 1; };
    /**
     * @return {?}
     */
    SubTimelineBuilder.prototype.buildKeyframes = function () {
        var /** @type {?} */ keyframes = this.keyframes;
        var _a = this.timings, delay = _a.delay, duration = _a.duration, easing = _a.easing;
        if (this._stretchStartingKeyframe && delay) {
            var /** @type {?} */ newKeyframes = [];
            var /** @type {?} */ totalTime = duration + delay;
            var /** @type {?} */ startingGap = delay / totalTime;
            // the original starting keyframe now starts once the delay is done
            var /** @type {?} */ newFirstKeyframe = copyStyles(keyframes[0], false);
            newFirstKeyframe['offset'] = 0;
            newKeyframes.push(newFirstKeyframe);
            var /** @type {?} */ oldFirstKeyframe = copyStyles(keyframes[0], false);
            oldFirstKeyframe['offset'] = roundOffset(startingGap);
            newKeyframes.push(oldFirstKeyframe);
            /*
              When the keyframe is stretched then it means that the delay before the animation
              starts is gone. Instead the first keyframe is placed at the start of the animation
              and it is then copied to where it starts when the original delay is over. This basically
              means nothing animates during that delay, but the styles are still renderered. For this
              to work the original offset values that exist in the original keyframes must be "warped"
              so that they can take the new keyframe + delay into account.
      
              delay=1000, duration=1000, keyframes = 0 .5 1
      
              turns into
      
              delay=0, duration=2000, keyframes = 0 .33 .66 1
             */
            // offsets between 1 ... n -1 are all warped by the keyframe stretch
            var /** @type {?} */ limit = keyframes.length - 1;
            for (var /** @type {?} */ i = 1; i <= limit; i++) {
                var /** @type {?} */ kf = copyStyles(keyframes[i], false);
                var /** @type {?} */ oldOffset = (kf['offset']);
                var /** @type {?} */ timeAtKeyframe = delay + oldOffset * duration;
                kf['offset'] = roundOffset(timeAtKeyframe / totalTime);
                newKeyframes.push(kf);
            }
            // the new starting keyframe should be added at the start
            duration = totalTime;
            delay = 0;
            easing = '';
            keyframes = newKeyframes;
        }
        return createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, true);
    };
    return SubTimelineBuilder;
}(TimelineBuilder));
/**
 * @param {?} offset
 * @param {?=} decimalPoints
 * @return {?}
 */
function roundOffset(offset, decimalPoints) {
    if (decimalPoints === void 0) { decimalPoints = 3; }
    var /** @type {?} */ mult = Math.pow(10, decimalPoints - 1);
    return Math.round(offset * mult) / mult;
}
/**
 * @param {?} input
 * @param {?} allStyles
 * @return {?}
 */
function flattenStyles(input, allStyles) {
    var /** @type {?} */ styles = {};
    var /** @type {?} */ allProperties;
    input.forEach(function (token) {
        if (token === '*') {
            allProperties = allProperties || Object.keys(allStyles);
            allProperties.forEach(function (prop) { styles[prop] = __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"]; });
        }
        else {
            copyStyles(/** @type {?} */ (token), false, styles);
        }
    });
    return styles;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Animation = (function () {
    /**
     * @param {?} _driver
     * @param {?} input
     */
    function Animation(_driver, input) {
        this._driver = _driver;
        var errors = [];
        var ast = buildAnimationAst(input, errors);
        if (errors.length) {
            var errorMessage = "animation validation failed:\n" + errors.join("\n");
            throw new Error(errorMessage);
        }
        this._animationAst = ast;
    }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} destinationStyles
     * @param {?} options
     * @param {?=} subInstructions
     * @return {?}
     */
    Animation.prototype.buildTimelines = function (element, startingStyles, destinationStyles, options, subInstructions) {
        var /** @type {?} */ start = Array.isArray(startingStyles) ? normalizeStyles(startingStyles) : (startingStyles);
        var /** @type {?} */ dest = Array.isArray(destinationStyles) ? normalizeStyles(destinationStyles) : (destinationStyles);
        var /** @type {?} */ errors = [];
        subInstructions = subInstructions || new ElementInstructionMap();
        var /** @type {?} */ result = buildAnimationTimelines(this._driver, element, this._animationAst, start, dest, options, subInstructions, errors);
        if (errors.length) {
            var /** @type {?} */ errorMessage = "animation building failed:\n" + errors.join("\n");
            throw new Error(errorMessage);
        }
        return result;
    };
    return Animation;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental Animation support is experimental.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ var AnimationStyleNormalizer = (function () {
    function AnimationStyleNormalizer() {
    }
    return AnimationStyleNormalizer;
}());
/**
 * @experimental Animation support is experimental.
 */
var NoopAnimationStyleNormalizer = (function () {
    function NoopAnimationStyleNormalizer() {
    }
    NoopAnimationStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) { return propertyName; };
    NoopAnimationStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
        return value;
    };
    return NoopAnimationStyleNormalizer;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsStyleNormalizer = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](WebAnimationsStyleNormalizer, _super);
    function WebAnimationsStyleNormalizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} propertyName
     * @param {?} errors
     * @return {?}
     */
    WebAnimationsStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) {
        return dashCaseToCamelCase(propertyName);
    };
    /**
     * @param {?} userProvidedProperty
     * @param {?} normalizedProperty
     * @param {?} value
     * @param {?} errors
     * @return {?}
     */
    WebAnimationsStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
        var /** @type {?} */ unit = '';
        var /** @type {?} */ strVal = value.toString().trim();
        if (DIMENSIONAL_PROP_MAP[normalizedProperty] && value !== 0 && value !== '0') {
            if (typeof value === 'number') {
                unit = 'px';
            }
            else {
                var /** @type {?} */ valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                    errors.push("Please provide a CSS unit value for " + userProvidedProperty + ":" + value);
                }
            }
        }
        return strVal + unit;
    };
    return WebAnimationsStyleNormalizer;
}(AnimationStyleNormalizer));
var DIMENSIONAL_PROP_MAP = makeBooleanMap('width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'
    .split(','));
/**
 * @param {?} keys
 * @return {?}
 */
function makeBooleanMap(keys) {
    var /** @type {?} */ map = {};
    keys.forEach(function (key) { return map[key] = true; });
    return map;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} element
 * @param {?} triggerName
 * @param {?} fromState
 * @param {?} toState
 * @param {?} isRemovalTransition
 * @param {?} fromStyles
 * @param {?} toStyles
 * @param {?} timelines
 * @param {?} queriedElements
 * @param {?} preStyleProps
 * @param {?} postStyleProps
 * @return {?}
 */
function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps) {
    return {
        type: 0 /* TransitionAnimation */,
        element: element,
        triggerName: triggerName,
        isRemovalTransition: isRemovalTransition,
        fromState: fromState,
        fromStyles: fromStyles,
        toState: toState,
        toStyles: toStyles,
        timelines: timelines,
        queriedElements: queriedElements,
        preStyleProps: preStyleProps,
        postStyleProps: postStyleProps
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationTransitionFactory = (function () {
    /**
     * @param {?} _triggerName
     * @param {?} ast
     * @param {?} _stateStyles
     */
    function AnimationTransitionFactory(_triggerName, ast, _stateStyles) {
        this._triggerName = _triggerName;
        this.ast = ast;
        this._stateStyles = _stateStyles;
    }
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @return {?}
     */
    AnimationTransitionFactory.prototype.match = function (currentState, nextState) {
        return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState);
    };
    /**
     * @param {?} driver
     * @param {?} element
     * @param {?} currentState
     * @param {?} nextState
     * @param {?=} options
     * @param {?=} subInstructions
     * @return {?}
     */
    AnimationTransitionFactory.prototype.build = function (driver, element, currentState, nextState, options, subInstructions) {
        var /** @type {?} */ animationOptions = mergeAnimationOptions(this.ast.options || {}, options || {});
        var /** @type {?} */ backupStateStyles = this._stateStyles['*'] || {};
        var /** @type {?} */ currentStateStyles = this._stateStyles[currentState] || backupStateStyles;
        var /** @type {?} */ nextStateStyles = this._stateStyles[nextState] || backupStateStyles;
        var /** @type {?} */ errors = [];
        var /** @type {?} */ timelines = buildAnimationTimelines(driver, element, this.ast.animation, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
        if (errors.length) {
            var /** @type {?} */ errorMessage = "animation building failed:\n" + errors.join("\n");
            throw new Error(errorMessage);
        }
        var /** @type {?} */ preStyleMap = new Map();
        var /** @type {?} */ postStyleMap = new Map();
        var /** @type {?} */ queriedElements = new Set();
        timelines.forEach(function (tl) {
            var /** @type {?} */ elm = tl.element;
            var /** @type {?} */ preProps = getOrSetAsInMap(preStyleMap, elm, {});
            tl.preStyleProps.forEach(function (prop) { return preProps[prop] = true; });
            var /** @type {?} */ postProps = getOrSetAsInMap(postStyleMap, elm, {});
            tl.postStyleProps.forEach(function (prop) { return postProps[prop] = true; });
            if (elm !== element) {
                queriedElements.add(elm);
            }
        });
        var /** @type {?} */ queriedElementsList = iteratorToArray(queriedElements.values());
        return createTransitionInstruction(element, this._triggerName, currentState, nextState, nextState === 'void', currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap);
    };
    return AnimationTransitionFactory;
}());
/**
 * @param {?} matchFns
 * @param {?} currentState
 * @param {?} nextState
 * @return {?}
 */
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState) {
    return matchFns.some(function (fn) { return fn(currentState, nextState); });
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental Animation support is experimental.
 * @param {?} name
 * @param {?} ast
 * @return {?}
 */
function buildTrigger(name, ast) {
    return new AnimationTrigger(name, ast);
}
/**
 * \@experimental Animation support is experimental.
 */
var AnimationTrigger = (function () {
    /**
     * @param {?} name
     * @param {?} ast
     */
    function AnimationTrigger(name, ast) {
        var _this = this;
        this.name = name;
        this.ast = ast;
        this.transitionFactories = [];
        this.states = {};
        ast.states.forEach(function (ast) {
            var obj = _this.states[ast.name] = {};
            ast.style.styles.forEach(function (styleTuple) {
                if (typeof styleTuple == 'object') {
                    copyStyles(styleTuple, false, obj);
                }
            });
        });
        balanceProperties(this.states, 'true', '1');
        balanceProperties(this.states, 'false', '0');
        ast.transitions.forEach(function (ast) {
            _this.transitionFactories.push(new AnimationTransitionFactory(name, ast, _this.states));
        });
        this.fallbackTransition = createFallbackTransition(name, this.states);
    }
    Object.defineProperty(AnimationTrigger.prototype, "containsQueries", {
        /**
         * @return {?}
         */
        get: function () { return this.ast.queryCount > 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @return {?}
     */
    AnimationTrigger.prototype.matchTransition = function (currentState, nextState) {
        var /** @type {?} */ entry = this.transitionFactories.find(function (f) { return f.match(currentState, nextState); });
        return entry || null;
    };
    return AnimationTrigger;
}());
/**
 * @param {?} triggerName
 * @param {?} states
 * @return {?}
 */
function createFallbackTransition(triggerName, states) {
    var /** @type {?} */ matchers = [function (fromState, toState) { return true; }];
    var /** @type {?} */ animation = new SequenceAst([]);
    var /** @type {?} */ transition = new TransitionAst(matchers, animation);
    return new AnimationTransitionFactory(triggerName, transition, states);
}
/**
 * @param {?} obj
 * @param {?} key1
 * @param {?} key2
 * @return {?}
 */
function balanceProperties(obj, key1, key2) {
    if (obj.hasOwnProperty(key1)) {
        if (!obj.hasOwnProperty(key2)) {
            obj[key2] = obj[key1];
        }
    }
    else if (obj.hasOwnProperty(key2)) {
        obj[key1] = obj[key2];
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_INSTRUCTION_MAP = new ElementInstructionMap();
var TimelineAnimationEngine = (function () {
    /**
     * @param {?} _driver
     * @param {?} _normalizer
     */
    function TimelineAnimationEngine(_driver, _normalizer) {
        this._driver = _driver;
        this._normalizer = _normalizer;
        this._animations = {};
        this._playersById = {};
        this.players = [];
    }
    /**
     * @param {?} id
     * @param {?} metadata
     * @return {?}
     */
    TimelineAnimationEngine.prototype.register = function (id, metadata) {
        var /** @type {?} */ errors = [];
        var /** @type {?} */ ast = buildAnimationAst(metadata, errors);
        if (errors.length) {
            throw new Error("Unable to build the animation due to the following errors: " + errors.join("\n"));
        }
        else {
            this._animations[id] = ast;
        }
    };
    /**
     * @param {?} i
     * @param {?} preStyles
     * @param {?=} postStyles
     * @return {?}
     */
    TimelineAnimationEngine.prototype._buildPlayer = function (i, preStyles, postStyles) {
        var /** @type {?} */ element = i.element;
        var /** @type {?} */ keyframes = normalizeKeyframes(this._driver, this._normalizer, element, i.keyframes, preStyles, postStyles);
        return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, []);
    };
    /**
     * @param {?} id
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    TimelineAnimationEngine.prototype.create = function (id, element, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var /** @type {?} */ errors = [];
        var /** @type {?} */ ast = this._animations[id];
        var /** @type {?} */ instructions;
        var /** @type {?} */ autoStylesMap = new Map();
        if (ast) {
            instructions = buildAnimationTimelines(this._driver, element, ast, {}, {}, options, EMPTY_INSTRUCTION_MAP, errors);
            instructions.forEach(function (inst) {
                var /** @type {?} */ styles = getOrSetAsInMap(autoStylesMap, inst.element, {});
                inst.postStyleProps.forEach(function (prop) { return styles[prop] = null; });
            });
        }
        else {
            errors.push('The requested animation doesn\'t exist or has already been destroyed');
            instructions = [];
        }
        if (errors.length) {
            throw new Error("Unable to create the animation due to the following errors: " + errors.join("\n"));
        }
        autoStylesMap.forEach(function (styles, element) {
            Object.keys(styles).forEach(function (prop) { styles[prop] = _this._driver.computeStyle(element, prop, __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"]); });
        });
        var /** @type {?} */ players = instructions.map(function (i) {
            var /** @type {?} */ styles = autoStylesMap.get(i.element);
            return _this._buildPlayer(i, {}, styles);
        });
        var /** @type {?} */ player = optimizeGroupPlayer(players);
        this._playersById[id] = player;
        player.onDestroy(function () { return _this.destroy(id); });
        this.players.push(player);
        return player;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TimelineAnimationEngine.prototype.destroy = function (id) {
        var /** @type {?} */ player = this._getPlayer(id);
        player.destroy();
        delete this._playersById[id];
        var /** @type {?} */ index = this.players.indexOf(player);
        if (index >= 0) {
            this.players.splice(index, 1);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TimelineAnimationEngine.prototype._getPlayer = function (id) {
        var /** @type {?} */ player = this._playersById[id];
        if (!player) {
            throw new Error("Unable to find the timeline player referenced by " + id);
        }
        return player;
    };
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    TimelineAnimationEngine.prototype.listen = function (id, element, eventName, callback) {
        // triggerName, fromState, toState are all ignored for timeline animations
        var /** @type {?} */ baseEvent = makeAnimationEvent(element, '', '', '');
        listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback);
        return function () { };
    };
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} command
     * @param {?} args
     * @return {?}
     */
    TimelineAnimationEngine.prototype.command = function (id, element, command, args) {
        if (command == 'register') {
            this.register(id, /** @type {?} */ (args[0]));
            return;
        }
        if (command == 'create') {
            var /** @type {?} */ options = ((args[0] || {}));
            this.create(id, element, options);
            return;
        }
        var /** @type {?} */ player = this._getPlayer(id);
        switch (command) {
            case 'play':
                player.play();
                break;
            case 'pause':
                player.pause();
                break;
            case 'reset':
                player.reset();
                break;
            case 'restart':
                player.restart();
                break;
            case 'finish':
                player.finish();
                break;
            case 'init':
                player.init();
                break;
            case 'setPosition':
                player.setPosition(parseFloat(/** @type {?} */ (args[0])));
                break;
            case 'destroy':
                this.destroy(id);
                break;
        }
    };
    return TimelineAnimationEngine;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EMPTY_PLAYER_ARRAY = [];
var NULL_REMOVAL_STATE = {
    namespaceId: '',
    setForRemoval: null,
    hasAnimation: false,
    removedBeforeQueried: false
};
var NULL_REMOVED_QUERIED_STATE = {
    namespaceId: '',
    setForRemoval: null,
    hasAnimation: false,
    removedBeforeQueried: true
};
var REMOVAL_FLAG = '__ng_removed';
var StateValue = (function () {
    /**
     * @param {?} input
     */
    function StateValue(input) {
        var isObj = input && input.hasOwnProperty('value');
        var value = isObj ? input['value'] : input;
        this.value = normalizeTriggerValue(value);
        if (isObj) {
            var options = copyObj(input);
            delete options['value'];
            this.options = options;
        }
        else {
            this.options = {};
        }
        if (!this.options.params) {
            this.options.params = {};
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    StateValue.prototype.absorbOptions = function (options) {
        var /** @type {?} */ newParams = options.params;
        if (newParams) {
            var /** @type {?} */ oldParams_2 = ((this.options.params));
            Object.keys(newParams).forEach(function (prop) {
                if (oldParams_2[prop] == null) {
                    oldParams_2[prop] = newParams[prop];
                }
            });
        }
    };
    return StateValue;
}());
var VOID_VALUE = 'void';
var DEFAULT_STATE_VALUE = new StateValue(VOID_VALUE);
var DELETED_STATE_VALUE = new StateValue('DELETED');
var AnimationTransitionNamespace = (function () {
    /**
     * @param {?} id
     * @param {?} hostElement
     * @param {?} _engine
     */
    function AnimationTransitionNamespace(id, hostElement, _engine) {
        this.id = id;
        this.hostElement = hostElement;
        this._engine = _engine;
        this.players = [];
        this._triggers = {};
        this._queue = [];
        this._elementListeners = new Map();
        this._hostClassName = 'ng-tns-' + id;
        addClass(hostElement, this._hostClassName);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} phase
     * @param {?} callback
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.listen = function (element, name, phase, callback) {
        var _this = this;
        if (!this._triggers.hasOwnProperty(name)) {
            throw new Error("Unable to listen on the animation trigger event \"" + phase + "\" because the animation trigger \"" + name + "\" doesn't exist!");
        }
        if (phase == null || phase.length == 0) {
            throw new Error("Unable to listen on the animation trigger \"" + name + "\" because the provided event is undefined!");
        }
        if (!isTriggerEventValid(phase)) {
            throw new Error("The provided animation trigger event \"" + phase + "\" for the animation trigger \"" + name + "\" is not supported!");
        }
        var /** @type {?} */ listeners = getOrSetAsInMap(this._elementListeners, element, []);
        var /** @type {?} */ data = { name: name, phase: phase, callback: callback };
        listeners.push(data);
        var /** @type {?} */ triggersWithStates = getOrSetAsInMap(this._engine.statesByElement, element, {});
        if (!triggersWithStates.hasOwnProperty(name)) {
            addClass(element, NG_TRIGGER_CLASSNAME);
            addClass(element, NG_TRIGGER_CLASSNAME + '-' + name);
            triggersWithStates[name] = null;
        }
        return function () {
            // the event listener is removed AFTER the flush has occurred such
            // that leave animations callbacks can fire (otherwise if the node
            // is removed in between then the listeners would be deregistered)
            _this._engine.afterFlush(function () {
                var /** @type {?} */ index = listeners.indexOf(data);
                if (index >= 0) {
                    listeners.splice(index, 1);
                }
                if (!_this._triggers[name]) {
                    delete triggersWithStates[name];
                }
            });
        };
    };
    /**
     * @param {?} name
     * @param {?} ast
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.register = function (name, ast) {
        if (this._triggers[name]) {
            // throw
            return false;
        }
        else {
            this._triggers[name] = ast;
            return true;
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AnimationTransitionNamespace.prototype._getTrigger = function (name) {
        var /** @type {?} */ trigger = this._triggers[name];
        if (!trigger) {
            throw new Error("The provided animation trigger \"" + name + "\" has not been registered!");
        }
        return trigger;
    };
    /**
     * @param {?} element
     * @param {?} triggerName
     * @param {?} value
     * @param {?=} defaultToFallback
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.trigger = function (element, triggerName, value, defaultToFallback) {
        var _this = this;
        if (defaultToFallback === void 0) { defaultToFallback = true; }
        var /** @type {?} */ trigger = this._getTrigger(triggerName);
        var /** @type {?} */ player = new TransitionAnimationPlayer(this.id, triggerName, element);
        var /** @type {?} */ triggersWithStates = this._engine.statesByElement.get(element);
        if (!triggersWithStates) {
            addClass(element, NG_TRIGGER_CLASSNAME);
            addClass(element, NG_TRIGGER_CLASSNAME + '-' + triggerName);
            this._engine.statesByElement.set(element, triggersWithStates = {});
        }
        var /** @type {?} */ fromState = triggersWithStates[triggerName];
        var /** @type {?} */ toState = new StateValue(value);
        var /** @type {?} */ isObj = value && value.hasOwnProperty('value');
        if (!isObj && fromState) {
            toState.absorbOptions(fromState.options);
        }
        triggersWithStates[triggerName] = toState;
        if (!fromState) {
            fromState = DEFAULT_STATE_VALUE;
        }
        else if (fromState === DELETED_STATE_VALUE) {
            return player;
        }
        var /** @type {?} */ playersOnElement = getOrSetAsInMap(this._engine.playersByElement, element, []);
        playersOnElement.forEach(function (player) {
            // only remove the player if it is queued on the EXACT same trigger/namespace
            // we only also deal with queued players here because if the animation has
            // started then we want to keep the player alive until the flush happens
            // (which is where the previousPlayers are passed into the new palyer)
            if (player.namespaceId == _this.id && player.triggerName == triggerName && player.queued) {
                player.destroy();
            }
        });
        var /** @type {?} */ transition = trigger.matchTransition(fromState.value, toState.value);
        var /** @type {?} */ isFallbackTransition = false;
        if (!transition) {
            if (!defaultToFallback)
                return;
            transition = trigger.fallbackTransition;
            isFallbackTransition = true;
        }
        this._engine.totalQueuedPlayers++;
        this._queue.push({ element: element, triggerName: triggerName, transition: transition, fromState: fromState, toState: toState, player: player, isFallbackTransition: isFallbackTransition });
        if (!isFallbackTransition) {
            addClass(element, NG_ANIMATING_CLASSNAME);
        }
        player.onDone(function () {
            removeClass(element, NG_ANIMATING_CLASSNAME);
            var /** @type {?} */ index = _this.players.indexOf(player);
            if (index >= 0) {
                _this.players.splice(index, 1);
            }
            var /** @type {?} */ players = _this._engine.playersByElement.get(element);
            if (players) {
                var /** @type {?} */ index_1 = players.indexOf(player);
                if (index_1 >= 0) {
                    players.splice(index_1, 1);
                }
            }
        });
        this.players.push(player);
        playersOnElement.push(player);
        return player;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.deregister = function (name) {
        var _this = this;
        delete this._triggers[name];
        this._engine.statesByElement.forEach(function (stateMap, element) { delete stateMap[name]; });
        this._elementListeners.forEach(function (listeners, element) {
            _this._elementListeners.set(element, listeners.filter(function (entry) { return entry.name != name; }));
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.clearElementCache = function (element) {
        this._engine.statesByElement.delete(element);
        this._elementListeners.delete(element);
        var /** @type {?} */ elementPlayers = this._engine.playersByElement.get(element);
        if (elementPlayers) {
            elementPlayers.forEach(function (player) { return player.destroy(); });
            this._engine.playersByElement.delete(element);
        }
    };
    /**
     * @param {?} rootElement
     * @param {?} context
     * @param {?=} animate
     * @return {?}
     */
    AnimationTransitionNamespace.prototype._destroyInnerNodes = function (rootElement, context, animate) {
        var _this = this;
        if (animate === void 0) { animate = false; }
        this._engine.driver.query(rootElement, NG_TRIGGER_SELECTOR, true).forEach(function (elm) {
            if (animate && containsClass(elm, _this._hostClassName)) {
                var /** @type {?} */ innerNs = _this._engine.namespacesByHostElement.get(elm);
                // special case for a host element with animations on the same element
                if (innerNs) {
                    innerNs.removeNode(elm, context, true);
                }
                _this.removeNode(elm, context, true);
            }
            else {
                _this.clearElementCache(elm);
            }
        });
    };
    /**
     * @param {?} element
     * @param {?} context
     * @param {?=} doNotRecurse
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.removeNode = function (element, context, doNotRecurse) {
        var _this = this;
        var /** @type {?} */ engine = this._engine;
        if (!doNotRecurse && element.childElementCount) {
            this._destroyInnerNodes(element, context, true);
        }
        var /** @type {?} */ triggerStates = engine.statesByElement.get(element);
        if (triggerStates) {
            var /** @type {?} */ players_1 = [];
            Object.keys(triggerStates).forEach(function (triggerName) {
                // this check is here in the event that an element is removed
                // twice (both on the host level and the component level)
                if (_this._triggers[triggerName]) {
                    var /** @type {?} */ player = _this.trigger(element, triggerName, VOID_VALUE, false);
                    if (player) {
                        players_1.push(player);
                    }
                }
            });
            if (players_1.length) {
                engine.markElementAsRemoved(this.id, element, true, context);
                optimizeGroupPlayer(players_1).onDone(function () { return engine.processLeaveNode(element); });
                return;
            }
        }
        // find the player that is animating and make sure that the
        // removal is delayed until that player has completed
        var /** @type {?} */ containsPotentialParentTransition = false;
        if (engine.totalAnimations) {
            var /** @type {?} */ currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
            // when this `if statement` does not continue forward it means that
            // a previous animation query has selected the current element and
            // is animating it. In this situation want to continue fowards and
            // allow the element to be queued up for animation later.
            if (currentPlayers && currentPlayers.length) {
                containsPotentialParentTransition = true;
            }
            else {
                var /** @type {?} */ parent = element;
                while (parent = parent.parentNode) {
                    var /** @type {?} */ triggers = engine.statesByElement.get(parent);
                    if (triggers) {
                        containsPotentialParentTransition = true;
                        break;
                    }
                }
            }
        }
        // at this stage we know that the element will either get removed
        // during flush or will be picked up by a parent query. Either way
        // we need to fire the listeners for this element when it DOES get
        // removed (once the query parent animation is done or after flush)
        var /** @type {?} */ listeners = this._elementListeners.get(element);
        if (listeners) {
            var /** @type {?} */ visitedTriggers_1 = new Set();
            listeners.forEach(function (listener) {
                var /** @type {?} */ triggerName = listener.name;
                if (visitedTriggers_1.has(triggerName))
                    return;
                visitedTriggers_1.add(triggerName);
                var /** @type {?} */ trigger = _this._triggers[triggerName];
                var /** @type {?} */ transition = trigger.fallbackTransition;
                var /** @type {?} */ elementStates = ((engine.statesByElement.get(element)));
                var /** @type {?} */ fromState = elementStates[triggerName] || DEFAULT_STATE_VALUE;
                var /** @type {?} */ toState = new StateValue(VOID_VALUE);
                var /** @type {?} */ player = new TransitionAnimationPlayer(_this.id, triggerName, element);
                _this._engine.totalQueuedPlayers++;
                _this._queue.push({
                    element: element,
                    triggerName: triggerName,
                    transition: transition,
                    fromState: fromState,
                    toState: toState,
                    player: player,
                    isFallbackTransition: true
                });
            });
        }
        // whether or not a parent has an animation we need to delay the deferral of the leave
        // operation until we have more information (which we do after flush() has been called)
        if (containsPotentialParentTransition) {
            engine.markElementAsRemoved(this.id, element, false, context);
        }
        else {
            // we do this after the flush has occurred such
            // that the callbacks can be fired
            engine.afterFlush(function () { return _this.clearElementCache(element); });
            engine.destroyInnerAnimations(element);
            engine._onRemovalComplete(element, context);
        }
    };
    /**
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.insertNode = function (element, parent) { addClass(element, this._hostClassName); };
    /**
     * @param {?} microtaskId
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.drainQueuedTransitions = function (microtaskId) {
        var _this = this;
        var /** @type {?} */ instructions = [];
        this._queue.forEach(function (entry) {
            var /** @type {?} */ player = entry.player;
            if (player.destroyed)
                return;
            var /** @type {?} */ element = entry.element;
            var /** @type {?} */ listeners = _this._elementListeners.get(element);
            if (listeners) {
                listeners.forEach(function (listener) {
                    if (listener.name == entry.triggerName) {
                        var /** @type {?} */ baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
                        ((baseEvent))['_data'] = microtaskId;
                        listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
                    }
                });
            }
            if (player.markedForDestroy) {
                _this._engine.afterFlush(function () {
                    // now we can destroy the element properly since the event listeners have
                    // been bound to the player
                    player.destroy();
                });
            }
            else {
                instructions.push(entry);
            }
        });
        this._queue = [];
        return instructions.sort(function (a, b) {
            // if depCount == 0 them move to front
            // otherwise if a contains b then move back
            var /** @type {?} */ d0 = a.transition.ast.depCount;
            var /** @type {?} */ d1 = b.transition.ast.depCount;
            if (d0 == 0 || d1 == 0) {
                return d0 - d1;
            }
            return _this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
        });
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.destroy = function (context) {
        this.players.forEach(function (p) { return p.destroy(); });
        this._destroyInnerNodes(this.hostElement, context);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    AnimationTransitionNamespace.prototype.elementContainsData = function (element) {
        var /** @type {?} */ containsData = false;
        if (this._elementListeners.has(element))
            containsData = true;
        containsData =
            (this._queue.find(function (entry) { return entry.element === element; }) ? true : false) || containsData;
        return containsData;
    };
    return AnimationTransitionNamespace;
}());
var TransitionAnimationEngine = (function () {
    /**
     * @param {?} driver
     * @param {?} _normalizer
     */
    function TransitionAnimationEngine(driver, _normalizer) {
        this.driver = driver;
        this._normalizer = _normalizer;
        this.players = [];
        this.newHostElements = new Map();
        this.playersByElement = new Map();
        this.playersByQueriedElement = new Map();
        this.statesByElement = new Map();
        this.totalAnimations = 0;
        this.totalQueuedPlayers = 0;
        this._namespaceLookup = {};
        this._namespaceList = [];
        this._flushFns = [];
        this._whenQuietFns = [];
        this.namespacesByHostElement = new Map();
        this.collectedEnterElements = [];
        this.collectedLeaveElements = [];
        this.onRemovalComplete = function (element, context) { };
    }
    /**
     * @param {?} element
     * @param {?} context
     * @return {?}
     */
    TransitionAnimationEngine.prototype._onRemovalComplete = function (element, context) { this.onRemovalComplete(element, context); };
    Object.defineProperty(TransitionAnimationEngine.prototype, "queuedPlayers", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ players = [];
            this._namespaceList.forEach(function (ns) {
                ns.players.forEach(function (player) {
                    if (player.queued) {
                        players.push(player);
                    }
                });
            });
            return players;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype.createNamespace = function (namespaceId, hostElement) {
        var /** @type {?} */ ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
        if (hostElement.parentNode) {
            this._balanceNamespaceList(ns, hostElement);
        }
        else {
            // defer this later until flush during when the host element has
            // been inserted so that we know exactly where to place it in
            // the namespace list
            this.newHostElements.set(hostElement, ns);
            // given that this host element is apart of the animation code, it
            // may or may not be inserted by a parent node that is an of an
            // animation renderer type. If this happens then we can still have
            // access to this item when we query for :enter nodes. If the parent
            // is a renderer then the set data-structure will normalize the entry
            this.collectEnterElement(hostElement);
        }
        return this._namespaceLookup[namespaceId] = ns;
    };
    /**
     * @param {?} ns
     * @param {?} hostElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype._balanceNamespaceList = function (ns, hostElement) {
        var /** @type {?} */ limit = this._namespaceList.length - 1;
        if (limit >= 0) {
            var /** @type {?} */ found = false;
            for (var /** @type {?} */ i = limit; i >= 0; i--) {
                var /** @type {?} */ nextNamespace = this._namespaceList[i];
                if (this.driver.containsElement(nextNamespace.hostElement, hostElement)) {
                    this._namespaceList.splice(i + 1, 0, ns);
                    found = true;
                    break;
                }
            }
            if (!found) {
                this._namespaceList.splice(0, 0, ns);
            }
        }
        else {
            this._namespaceList.push(ns);
        }
        this.namespacesByHostElement.set(hostElement, ns);
        return ns;
    };
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype.register = function (namespaceId, hostElement) {
        var /** @type {?} */ ns = this._namespaceLookup[namespaceId];
        if (!ns) {
            ns = this.createNamespace(namespaceId, hostElement);
        }
        return ns;
    };
    /**
     * @param {?} namespaceId
     * @param {?} name
     * @param {?} trigger
     * @return {?}
     */
    TransitionAnimationEngine.prototype.registerTrigger = function (namespaceId, name, trigger) {
        var /** @type {?} */ ns = this._namespaceLookup[namespaceId];
        if (ns && ns.register(name, trigger)) {
            this.totalAnimations++;
        }
    };
    /**
     * @param {?} namespaceId
     * @param {?} context
     * @return {?}
     */
    TransitionAnimationEngine.prototype.destroy = function (namespaceId, context) {
        var _this = this;
        if (!namespaceId)
            return;
        var /** @type {?} */ ns = this._fetchNamespace(namespaceId);
        this.afterFlush(function () {
            _this.namespacesByHostElement.delete(ns.hostElement);
            delete _this._namespaceLookup[namespaceId];
            var /** @type {?} */ index = _this._namespaceList.indexOf(ns);
            if (index >= 0) {
                _this._namespaceList.splice(index, 1);
            }
        });
        this.afterFlushAnimationsDone(function () { return ns.destroy(context); });
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitionAnimationEngine.prototype._fetchNamespace = function (id) { return this._namespaceLookup[id]; };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    TransitionAnimationEngine.prototype.trigger = function (namespaceId, element, name, value) {
        if (isElementNode(element)) {
            this._fetchNamespace(namespaceId).trigger(element, name, value);
            return true;
        }
        return false;
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} parent
     * @param {?} insertBefore
     * @return {?}
     */
    TransitionAnimationEngine.prototype.insertNode = function (namespaceId, element, parent, insertBefore) {
        if (!isElementNode(element))
            return;
        // special case for when an element is removed and reinserted (move operation)
        // when this occurs we do not want to use the element for deletion later
        var /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval) {
            details.setForRemoval = false;
        }
        // in the event that the namespaceId is blank then the caller
        // code does not contain any animation code in it, but it is
        // just being called so that the node is marked as being inserted
        if (namespaceId) {
            this._fetchNamespace(namespaceId).insertNode(element, parent);
        }
        // only *directives and host elements are inserted before
        if (insertBefore) {
            this.collectEnterElement(element);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    TransitionAnimationEngine.prototype.collectEnterElement = function (element) { this.collectedEnterElements.push(element); };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} context
     * @param {?=} doNotRecurse
     * @return {?}
     */
    TransitionAnimationEngine.prototype.removeNode = function (namespaceId, element, context, doNotRecurse) {
        if (!isElementNode(element)) {
            this._onRemovalComplete(element, context);
            return;
        }
        var /** @type {?} */ ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
        if (ns) {
            ns.removeNode(element, context, doNotRecurse);
        }
        else {
            this.markElementAsRemoved(namespaceId, element, false, context);
        }
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?=} hasAnimation
     * @param {?=} context
     * @return {?}
     */
    TransitionAnimationEngine.prototype.markElementAsRemoved = function (namespaceId, element, hasAnimation, context) {
        this.collectedLeaveElements.push(element);
        element[REMOVAL_FLAG] = {
            namespaceId: namespaceId,
            setForRemoval: context, hasAnimation: hasAnimation,
            removedBeforeQueried: false
        };
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} name
     * @param {?} phase
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationEngine.prototype.listen = function (namespaceId, element, name, phase, callback) {
        if (isElementNode(element)) {
            return this._fetchNamespace(namespaceId).listen(element, name, phase, callback);
        }
        return function () { };
    };
    /**
     * @param {?} entry
     * @param {?} subTimelines
     * @return {?}
     */
    TransitionAnimationEngine.prototype._buildInstruction = function (entry, subTimelines) {
        return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, entry.toState.options, subTimelines);
    };
    /**
     * @param {?} containerElement
     * @return {?}
     */
    TransitionAnimationEngine.prototype.destroyInnerAnimations = function (containerElement) {
        var _this = this;
        var /** @type {?} */ elements = this.driver.query(containerElement, NG_TRIGGER_SELECTOR, true);
        elements.forEach(function (element) {
            var /** @type {?} */ players = _this.playersByElement.get(element);
            if (players) {
                players.forEach(function (player) {
                    // special case for when an element is set for destruction, but hasn't started.
                    // in this situation we want to delay the destruction until the flush occurs
                    // so that any event listeners attached to the player are triggered.
                    if (player.queued) {
                        player.markedForDestroy = true;
                    }
                    else {
                        player.destroy();
                    }
                });
            }
            var /** @type {?} */ stateMap = _this.statesByElement.get(element);
            if (stateMap) {
                Object.keys(stateMap).forEach(function (triggerName) { return stateMap[triggerName] = DELETED_STATE_VALUE; });
            }
        });
        if (this.playersByQueriedElement.size == 0)
            return;
        elements = this.driver.query(containerElement, NG_ANIMATING_SELECTOR, true);
        if (elements.length) {
            elements.forEach(function (element) {
                var /** @type {?} */ players = _this.playersByQueriedElement.get(element);
                if (players) {
                    players.forEach(function (player) { return player.finish(); });
                }
            });
        }
    };
    /**
     * @return {?}
     */
    TransitionAnimationEngine.prototype.whenRenderingDone = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.players.length) {
                return optimizeGroupPlayer(_this.players).onDone(function () { return resolve(); });
            }
            else {
                resolve();
            }
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    TransitionAnimationEngine.prototype.processLeaveNode = function (element) {
        var /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval) {
            // this will prevent it from removing it twice
            element[REMOVAL_FLAG] = NULL_REMOVAL_STATE;
            if (details.namespaceId) {
                this.destroyInnerAnimations(element);
                var /** @type {?} */ ns = this._fetchNamespace(details.namespaceId);
                if (ns) {
                    ns.clearElementCache(element);
                }
            }
            this._onRemovalComplete(element, details.setForRemoval);
        }
    };
    /**
     * @param {?=} microtaskId
     * @return {?}
     */
    TransitionAnimationEngine.prototype.flush = function (microtaskId) {
        var _this = this;
        if (microtaskId === void 0) { microtaskId = -1; }
        var /** @type {?} */ players = [];
        if (this.newHostElements.size) {
            this.newHostElements.forEach(function (ns, element) { return _this._balanceNamespaceList(ns, element); });
            this.newHostElements.clear();
        }
        if (this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            players = this._flushAnimations(microtaskId);
        }
        else {
            for (var /** @type {?} */ i = 0; i < this.collectedLeaveElements.length; i++) {
                var /** @type {?} */ element = this.collectedLeaveElements[i];
                this.processLeaveNode(element);
            }
        }
        this.totalQueuedPlayers = 0;
        this.collectedEnterElements.length = 0;
        this.collectedLeaveElements.length = 0;
        this._flushFns.forEach(function (fn) { return fn(); });
        this._flushFns = [];
        if (this._whenQuietFns.length) {
            // we move these over to a variable so that
            // if any new callbacks are registered in another
            // flush they do not populate the existing set
            var /** @type {?} */ quietFns_1 = this._whenQuietFns;
            this._whenQuietFns = [];
            if (players.length) {
                optimizeGroupPlayer(players).onDone(function () { quietFns_1.forEach(function (fn) { return fn(); }); });
            }
            else {
                quietFns_1.forEach(function (fn) { return fn(); });
            }
        }
    };
    /**
     * @param {?} microtaskId
     * @return {?}
     */
    TransitionAnimationEngine.prototype._flushAnimations = function (microtaskId) {
        var _this = this;
        var /** @type {?} */ subTimelines = new ElementInstructionMap();
        var /** @type {?} */ skippedPlayers = [];
        var /** @type {?} */ skippedPlayersMap = new Map();
        var /** @type {?} */ queuedInstructions = [];
        var /** @type {?} */ queriedElements = new Map();
        var /** @type {?} */ allPreStyleElements = new Map();
        var /** @type {?} */ allPostStyleElements = new Map();
        var /** @type {?} */ bodyNode = getBodyNode();
        var /** @type {?} */ allEnterNodes = this.collectedEnterElements.length ?
            this.collectedEnterElements.filter(createIsRootFilterFn(this.collectedEnterElements)) :
            [];
        // this must occur before the instructions are built below such that
        // the :enter queries match the elements (since the timeline queries
        // are fired during instruction building).
        for (var /** @type {?} */ i = 0; i < allEnterNodes.length; i++) {
            addClass(allEnterNodes[i], ENTER_CLASSNAME);
        }
        var /** @type {?} */ allLeaveNodes = [];
        var /** @type {?} */ leaveNodesWithoutAnimations = [];
        for (var /** @type {?} */ i = 0; i < this.collectedLeaveElements.length; i++) {
            var /** @type {?} */ element = this.collectedLeaveElements[i];
            var /** @type {?} */ details = (element[REMOVAL_FLAG]);
            if (details && details.setForRemoval) {
                addClass(element, LEAVE_CLASSNAME);
                allLeaveNodes.push(element);
                if (!details.hasAnimation) {
                    leaveNodesWithoutAnimations.push(element);
                }
            }
        }
        for (var /** @type {?} */ i = this._namespaceList.length - 1; i >= 0; i--) {
            var /** @type {?} */ ns = this._namespaceList[i];
            ns.drainQueuedTransitions(microtaskId).forEach(function (entry) {
                var /** @type {?} */ player = entry.player;
                var /** @type {?} */ element = entry.element;
                if (!bodyNode || !_this.driver.containsElement(bodyNode, element)) {
                    player.destroy();
                    return;
                }
                var /** @type {?} */ instruction = _this._buildInstruction(entry, subTimelines);
                if (!instruction)
                    return;
                // if a unmatched transition is queued to go then it SHOULD NOT render
                // an animation and cancel the previously running animations.
                if (entry.isFallbackTransition) {
                    player.onStart(function () { return eraseStyles(element, instruction.fromStyles); });
                    player.onDestroy(function () { return setStyles(element, instruction.toStyles); });
                    skippedPlayers.push(player);
                    return;
                }
                // this means that if a parent animation uses this animation as a sub trigger
                // then it will instruct the timeline builder to not add a player delay, but
                // instead stretch the first keyframe gap up until the animation starts. The
                // reason this is important is to prevent extra initialization styles from being
                // required by the user in the animation.
                instruction.timelines.forEach(function (tl) { return tl.stretchStartingKeyframe = true; });
                subTimelines.append(element, instruction.timelines);
                var /** @type {?} */ tuple = { instruction: instruction, player: player, element: element };
                queuedInstructions.push(tuple);
                instruction.queriedElements.forEach(function (element) { return getOrSetAsInMap(queriedElements, element, []).push(player); });
                instruction.preStyleProps.forEach(function (stringMap, element) {
                    var /** @type {?} */ props = Object.keys(stringMap);
                    if (props.length) {
                        var /** @type {?} */ setVal_1 = ((allPreStyleElements.get(element)));
                        if (!setVal_1) {
                            allPreStyleElements.set(element, setVal_1 = new Set());
                        }
                        props.forEach(function (prop) { return setVal_1.add(prop); });
                    }
                });
                instruction.postStyleProps.forEach(function (stringMap, element) {
                    var /** @type {?} */ props = Object.keys(stringMap);
                    var /** @type {?} */ setVal = ((allPostStyleElements.get(element)));
                    if (!setVal) {
                        allPostStyleElements.set(element, setVal = new Set());
                    }
                    props.forEach(function (prop) { return setVal.add(prop); });
                });
            });
        }
        // these can only be detected here since we have a map of all the elements
        // that have animations attached to them...
        var /** @type {?} */ enterNodesWithoutAnimations = [];
        for (var /** @type {?} */ i = 0; i < allEnterNodes.length; i++) {
            var /** @type {?} */ element = allEnterNodes[i];
            if (!subTimelines.has(element)) {
                enterNodesWithoutAnimations.push(element);
            }
        }
        var /** @type {?} */ allPreviousPlayersMap = new Map();
        var /** @type {?} */ sortedParentElements = [];
        queuedInstructions.forEach(function (entry) {
            var /** @type {?} */ element = entry.element;
            if (subTimelines.has(element)) {
                sortedParentElements.unshift(element);
                _this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap);
            }
        });
        skippedPlayers.forEach(function (player) {
            var /** @type {?} */ element = player.element;
            var /** @type {?} */ previousPlayers = _this._getPreviousPlayers(element, false, player.namespaceId, player.triggerName, null);
            previousPlayers.forEach(function (prevPlayer) { getOrSetAsInMap(allPreviousPlayersMap, element, []).push(prevPlayer); });
        });
        allPreviousPlayersMap.forEach(function (players) { return players.forEach(function (player) { return player.destroy(); }); });
        // PRE STAGE: fill the ! styles
        var /** @type {?} */ preStylesMap = allPreStyleElements.size ?
            cloakAndComputeStyles(this.driver, enterNodesWithoutAnimations, allPreStyleElements, __WEBPACK_IMPORTED_MODULE_1__angular_animations__["ɵPRE_STYLE"]) :
            new Map();
        // POST STAGE: fill the * styles
        var /** @type {?} */ postStylesMap = cloakAndComputeStyles(this.driver, leaveNodesWithoutAnimations, allPostStyleElements, __WEBPACK_IMPORTED_MODULE_1__angular_animations__["AUTO_STYLE"]);
        var /** @type {?} */ rootPlayers = [];
        var /** @type {?} */ subPlayers = [];
        queuedInstructions.forEach(function (entry) {
            var element = entry.element, player = entry.player, instruction = entry.instruction;
            // this means that it was never consumed by a parent animation which
            // means that it is independent and therefore should be set for animation
            if (subTimelines.has(element)) {
                var /** @type {?} */ innerPlayer = _this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
                player.setRealPlayer(innerPlayer);
                var /** @type {?} */ parentHasPriority = null;
                for (var /** @type {?} */ i = 0; i < sortedParentElements.length; i++) {
                    var /** @type {?} */ parent = sortedParentElements[i];
                    if (parent === element)
                        break;
                    if (_this.driver.containsElement(parent, element)) {
                        parentHasPriority = parent;
                        break;
                    }
                }
                if (parentHasPriority) {
                    var /** @type {?} */ parentPlayers = _this.playersByElement.get(parentHasPriority);
                    if (parentPlayers && parentPlayers.length) {
                        player.parentPlayer = optimizeGroupPlayer(parentPlayers);
                    }
                    skippedPlayers.push(player);
                }
                else {
                    rootPlayers.push(player);
                }
            }
            else {
                eraseStyles(element, instruction.fromStyles);
                player.onDestroy(function () { return setStyles(element, instruction.toStyles); });
                subPlayers.push(player);
            }
        });
        subPlayers.forEach(function (player) {
            var /** @type {?} */ playersForElement = skippedPlayersMap.get(player.element);
            if (playersForElement && playersForElement.length) {
                var /** @type {?} */ innerPlayer = optimizeGroupPlayer(playersForElement);
                player.setRealPlayer(innerPlayer);
            }
        });
        // the reason why we don't actually play the animation is
        // because all that a skipped player is designed to do is to
        // fire the start/done transition callback events
        skippedPlayers.forEach(function (player) {
            if (player.parentPlayer) {
                player.parentPlayer.onDestroy(function () { return player.destroy(); });
            }
            else {
                player.destroy();
            }
        });
        // run through all of the queued removals and see if they
        // were picked up by a query. If not then perform the removal
        // operation right away unless a parent animation is ongoing.
        for (var /** @type {?} */ i = 0; i < allLeaveNodes.length; i++) {
            var /** @type {?} */ element = allLeaveNodes[i];
            var /** @type {?} */ details = (element[REMOVAL_FLAG]);
            // this means the element has a removal animation that is being
            // taken care of and therefore the inner elements will hang around
            // until that animation is over (or the parent queried animation)
            if (details && details.hasAnimation)
                continue;
            var /** @type {?} */ players = [];
            // if this element is queried or if it contains queried children
            // then we want for the element not to be removed from the page
            // until the queried animations have finished
            if (queriedElements.size) {
                var /** @type {?} */ queriedPlayerResults = queriedElements.get(element);
                if (queriedPlayerResults && queriedPlayerResults.length) {
                    players.push.apply(players, queriedPlayerResults);
                }
                var /** @type {?} */ queriedInnerElements = this.driver.query(element, NG_ANIMATING_SELECTOR, true);
                for (var /** @type {?} */ j = 0; j < queriedInnerElements.length; j++) {
                    var /** @type {?} */ queriedPlayers = queriedElements.get(queriedInnerElements[j]);
                    if (queriedPlayers && queriedPlayers.length) {
                        players.push.apply(players, queriedPlayers);
                    }
                }
            }
            if (players.length) {
                removeNodesAfterAnimationDone(this, element, players);
            }
            else {
                this.processLeaveNode(element);
            }
        }
        rootPlayers.forEach(function (player) {
            _this.players.push(player);
            player.onDone(function () {
                player.destroy();
                var /** @type {?} */ index = _this.players.indexOf(player);
                _this.players.splice(index, 1);
            });
            player.play();
        });
        allEnterNodes.forEach(function (element) { return removeClass(element, ENTER_CLASSNAME); });
        return rootPlayers;
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @return {?}
     */
    TransitionAnimationEngine.prototype.elementContainsData = function (namespaceId, element) {
        var /** @type {?} */ containsData = false;
        var /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval)
            containsData = true;
        if (this.playersByElement.has(element))
            containsData = true;
        if (this.playersByQueriedElement.has(element))
            containsData = true;
        if (this.statesByElement.has(element))
            containsData = true;
        return this._fetchNamespace(namespaceId).elementContainsData(element) || containsData;
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationEngine.prototype.afterFlush = function (callback) { this._flushFns.push(callback); };
    /**
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationEngine.prototype.afterFlushAnimationsDone = function (callback) { this._whenQuietFns.push(callback); };
    /**
     * @param {?} element
     * @param {?} isQueriedElement
     * @param {?=} namespaceId
     * @param {?=} triggerName
     * @param {?=} toStateValue
     * @return {?}
     */
    TransitionAnimationEngine.prototype._getPreviousPlayers = function (element, isQueriedElement, namespaceId, triggerName, toStateValue) {
        var /** @type {?} */ players = [];
        if (isQueriedElement) {
            var /** @type {?} */ queriedElementPlayers = this.playersByQueriedElement.get(element);
            if (queriedElementPlayers) {
                players = queriedElementPlayers;
            }
        }
        else {
            var /** @type {?} */ elementPlayers = this.playersByElement.get(element);
            if (elementPlayers) {
                var /** @type {?} */ isRemovalAnimation_1 = !toStateValue || toStateValue == VOID_VALUE;
                elementPlayers.forEach(function (player) {
                    if (player.queued)
                        return;
                    if (!isRemovalAnimation_1 && player.triggerName != triggerName)
                        return;
                    players.push(player);
                });
            }
        }
        if (namespaceId || triggerName) {
            players = players.filter(function (player) {
                if (namespaceId && namespaceId != player.namespaceId)
                    return false;
                if (triggerName && triggerName != player.triggerName)
                    return false;
                return true;
            });
        }
        return players;
    };
    /**
     * @param {?} namespaceId
     * @param {?} instruction
     * @param {?} allPreviousPlayersMap
     * @return {?}
     */
    TransitionAnimationEngine.prototype._beforeAnimationBuild = function (namespaceId, instruction, allPreviousPlayersMap) {
        var _this = this;
        // it's important to do this step before destroying the players
        // so that the onDone callback below won't fire before this
        eraseStyles(instruction.element, instruction.fromStyles);
        var /** @type {?} */ triggerName = instruction.triggerName;
        var /** @type {?} */ rootElement = instruction.element;
        // when a removal animation occurs, ALL previous players are collected
        // and destroyed (even if they are outside of the current namespace)
        var /** @type {?} */ targetNameSpaceId = instruction.isRemovalTransition ? undefined : namespaceId;
        var /** @type {?} */ targetTriggerName = instruction.isRemovalTransition ? undefined : triggerName;
        instruction.timelines.map(function (timelineInstruction) {
            var /** @type {?} */ element = timelineInstruction.element;
            var /** @type {?} */ isQueriedElement = element !== rootElement;
            var /** @type {?} */ players = getOrSetAsInMap(allPreviousPlayersMap, element, []);
            var /** @type {?} */ previousPlayers = _this._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState);
            previousPlayers.forEach(function (player) {
                var /** @type {?} */ realPlayer = (player.getRealPlayer());
                if (realPlayer.beforeDestroy) {
                    realPlayer.beforeDestroy();
                }
                players.push(player);
            });
        });
    };
    /**
     * @param {?} namespaceId
     * @param {?} instruction
     * @param {?} allPreviousPlayersMap
     * @param {?} skippedPlayersMap
     * @param {?} preStylesMap
     * @param {?} postStylesMap
     * @return {?}
     */
    TransitionAnimationEngine.prototype._buildAnimation = function (namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
        var _this = this;
        var /** @type {?} */ triggerName = instruction.triggerName;
        var /** @type {?} */ rootElement = instruction.element;
        // we first run this so that the previous animation player
        // data can be passed into the successive animation players
        var /** @type {?} */ allQueriedPlayers = [];
        var /** @type {?} */ allConsumedElements = new Set();
        var /** @type {?} */ allSubElements = new Set();
        var /** @type {?} */ allNewPlayers = instruction.timelines.map(function (timelineInstruction) {
            var /** @type {?} */ element = timelineInstruction.element;
            // FIXME (matsko): make sure to-be-removed animations are removed properly
            var /** @type {?} */ details = element[REMOVAL_FLAG];
            if (details && details.removedBeforeQueried)
                return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["NoopAnimationPlayer"]();
            var /** @type {?} */ isQueriedElement = element !== rootElement;
            var /** @type {?} */ previousPlayers = EMPTY_PLAYER_ARRAY;
            if (!allConsumedElements.has(element)) {
                allConsumedElements.add(element);
                var /** @type {?} */ _previousPlayers = allPreviousPlayersMap.get(element);
                if (_previousPlayers) {
                    previousPlayers = _previousPlayers.map(function (p) { return p.getRealPlayer(); });
                }
            }
            var /** @type {?} */ preStyles = preStylesMap.get(element);
            var /** @type {?} */ postStyles = postStylesMap.get(element);
            var /** @type {?} */ keyframes = normalizeKeyframes(_this.driver, _this._normalizer, element, timelineInstruction.keyframes, preStyles, postStyles);
            var /** @type {?} */ player = _this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
            // this means that this particular player belongs to a sub trigger. It is
            // important that we match this player up with the corresponding (@trigger.listener)
            if (timelineInstruction.subTimeline && skippedPlayersMap) {
                allSubElements.add(element);
            }
            if (isQueriedElement) {
                var /** @type {?} */ wrappedPlayer = new TransitionAnimationPlayer(namespaceId, triggerName, element);
                wrappedPlayer.setRealPlayer(player);
                allQueriedPlayers.push(wrappedPlayer);
            }
            return player;
        });
        allQueriedPlayers.forEach(function (player) {
            getOrSetAsInMap(_this.playersByQueriedElement, player.element, []).push(player);
            player.onDone(function () { return deleteOrUnsetInMap(_this.playersByQueriedElement, player.element, player); });
        });
        allConsumedElements.forEach(function (element) { return addClass(element, NG_ANIMATING_CLASSNAME); });
        var /** @type {?} */ player = optimizeGroupPlayer(allNewPlayers);
        player.onDestroy(function () {
            allConsumedElements.forEach(function (element) { return removeClass(element, NG_ANIMATING_CLASSNAME); });
            setStyles(rootElement, instruction.toStyles);
        });
        // this basically makes all of the callbacks for sub element animations
        // be dependent on the upper players for when they finish
        allSubElements.forEach(function (element) { getOrSetAsInMap(skippedPlayersMap, element, []).push(player); });
        return player;
    };
    /**
     * @param {?} instruction
     * @param {?} keyframes
     * @param {?} previousPlayers
     * @return {?}
     */
    TransitionAnimationEngine.prototype._buildPlayer = function (instruction, keyframes, previousPlayers) {
        if (keyframes.length > 0) {
            return this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers);
        }
        // special case for when an empty transition|definition is provided
        // ... there is no point in rendering an empty animation
        return new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["NoopAnimationPlayer"]();
    };
    return TransitionAnimationEngine;
}());
var TransitionAnimationPlayer = (function () {
    /**
     * @param {?} namespaceId
     * @param {?} triggerName
     * @param {?} element
     */
    function TransitionAnimationPlayer(namespaceId, triggerName, element) {
        this.namespaceId = namespaceId;
        this.triggerName = triggerName;
        this.element = element;
        this._player = new __WEBPACK_IMPORTED_MODULE_1__angular_animations__["NoopAnimationPlayer"]();
        this._containsRealPlayer = false;
        this._queuedCallbacks = {};
        this._destroyed = false;
        this.markedForDestroy = false;
    }
    Object.defineProperty(TransitionAnimationPlayer.prototype, "queued", {
        /**
         * @return {?}
         */
        get: function () { return this._containsRealPlayer == false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionAnimationPlayer.prototype, "destroyed", {
        /**
         * @return {?}
         */
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} player
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.setRealPlayer = function (player) {
        var _this = this;
        if (this._containsRealPlayer)
            return;
        this._player = player;
        Object.keys(this._queuedCallbacks).forEach(function (phase) {
            _this._queuedCallbacks[phase].forEach(function (callback) { return listenOnPlayer(player, phase, undefined, callback); });
        });
        this._queuedCallbacks = {};
        this._containsRealPlayer = true;
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.getRealPlayer = function () { return this._player; };
    /**
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    TransitionAnimationPlayer.prototype._queueEvent = function (name, callback) {
        getOrSetAsInMap(this._queuedCallbacks, name, []).push(callback);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.onDone = function (fn) {
        if (this.queued) {
            this._queueEvent('done', fn);
        }
        this._player.onDone(fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.onStart = function (fn) {
        if (this.queued) {
            this._queueEvent('start', fn);
        }
        this._player.onStart(fn);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.onDestroy = function (fn) {
        if (this.queued) {
            this._queueEvent('destroy', fn);
        }
        this._player.onDestroy(fn);
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.init = function () { this._player.init(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.hasStarted = function () { return this.queued ? false : this._player.hasStarted(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.play = function () { !this.queued && this._player.play(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.pause = function () { !this.queued && this._player.pause(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.restart = function () { !this.queued && this._player.restart(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.finish = function () { this._player.finish(); };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.destroy = function () {
        this._destroyed = true;
        this._player.destroy();
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.reset = function () { !this.queued && this._player.reset(); };
    /**
     * @param {?} p
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.setPosition = function (p) {
        if (!this.queued) {
            this._player.setPosition(p);
        }
    };
    /**
     * @return {?}
     */
    TransitionAnimationPlayer.prototype.getPosition = function () { return this.queued ? 0 : this._player.getPosition(); };
    Object.defineProperty(TransitionAnimationPlayer.prototype, "totalTime", {
        /**
         * @return {?}
         */
        get: function () { return this._player.totalTime; },
        enumerable: true,
        configurable: true
    });
    return TransitionAnimationPlayer;
}());
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function deleteOrUnsetInMap(map, key, value) {
    var /** @type {?} */ currentValues;
    if (map instanceof Map) {
        currentValues = map.get(key);
        if (currentValues) {
            if (currentValues.length) {
                var /** @type {?} */ index = currentValues.indexOf(value);
                currentValues.splice(index, 1);
            }
            if (currentValues.length == 0) {
                map.delete(key);
            }
        }
    }
    else {
        currentValues = map[key];
        if (currentValues) {
            if (currentValues.length) {
                var /** @type {?} */ index = currentValues.indexOf(value);
                currentValues.splice(index, 1);
            }
            if (currentValues.length == 0) {
                delete map[key];
            }
        }
    }
    return currentValues;
}
/**
 * @param {?} value
 * @return {?}
 */
function normalizeTriggerValue(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? '1' : '0';
        default:
            return value != null ? value.toString() : null;
    }
}
/**
 * @param {?} node
 * @return {?}
 */
function isElementNode(node) {
    return node && node['nodeType'] === 1;
}
/**
 * @param {?} eventName
 * @return {?}
 */
function isTriggerEventValid(eventName) {
    return eventName == 'start' || eventName == 'done';
}
/**
 * @param {?} element
 * @param {?=} value
 * @return {?}
 */
function cloakElement(element, value) {
    var /** @type {?} */ oldValue = element.style.display;
    element.style.display = value != null ? value : 'none';
    return oldValue;
}
/**
 * @param {?} driver
 * @param {?} elements
 * @param {?} elementPropsMap
 * @param {?} defaultStyle
 * @return {?}
 */
function cloakAndComputeStyles(driver, elements, elementPropsMap, defaultStyle) {
    var /** @type {?} */ cloakVals = elements.map(function (element) { return cloakElement(element); });
    var /** @type {?} */ valuesMap = new Map();
    elementPropsMap.forEach(function (props, element) {
        var /** @type {?} */ styles = {};
        props.forEach(function (prop) {
            var /** @type {?} */ value = styles[prop] = driver.computeStyle(element, prop, defaultStyle);
            // there is no easy way to detect this because a sub element could be removed
            // by a parent animation element being detached.
            if (!value || value.length == 0) {
                element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE;
            }
        });
        valuesMap.set(element, styles);
    });
    elements.forEach(function (element, i) { return cloakElement(element, cloakVals[i]); });
    return valuesMap;
}
/**
 * @param {?} nodes
 * @return {?}
 */
function createIsRootFilterFn(nodes) {
    var /** @type {?} */ nodeSet = new Set(nodes);
    var /** @type {?} */ knownRootContainer = new Set();
    var /** @type {?} */ isRoot;
    isRoot = function (node) {
        if (!node)
            return true;
        if (nodeSet.has(node.parentNode))
            return false;
        if (knownRootContainer.has(node.parentNode))
            return true;
        if (isRoot(node.parentNode)) {
            knownRootContainer.add(node);
            return true;
        }
        return false;
    };
    return isRoot;
}
var CLASSES_CACHE_KEY = '$$classes';
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function containsClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    else {
        var /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        return classes && classes[className];
    }
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        var /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        if (!classes) {
            classes = element[CLASSES_CACHE_KEY] = {};
        }
        classes[className] = true;
    }
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        if (classes) {
            delete classes[className];
        }
    }
}
/**
 * @return {?}
 */
function getBodyNode() {
    if (typeof document != 'undefined') {
        return document.body;
    }
    return null;
}
/**
 * @param {?} engine
 * @param {?} element
 * @param {?} players
 * @return {?}
 */
function removeNodesAfterAnimationDone(engine, element, players) {
    optimizeGroupPlayer(players).onDone(function () { return engine.processLeaveNode(element); });
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationEngine = (function () {
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function AnimationEngine(driver, normalizer) {
        var _this = this;
        this._triggerCache = {};
        this.onRemovalComplete = function (element, context) { };
        this._transitionEngine = new TransitionAnimationEngine(driver, normalizer);
        this._timelineEngine = new TimelineAnimationEngine(driver, normalizer);
        this._transitionEngine.onRemovalComplete =
            function (element, context) { _this.onRemovalComplete(element, context); };
    }
    /**
     * @param {?} componentId
     * @param {?} namespaceId
     * @param {?} hostElement
     * @param {?} name
     * @param {?} metadata
     * @return {?}
     */
    AnimationEngine.prototype.registerTrigger = function (componentId, namespaceId, hostElement, name, metadata) {
        var /** @type {?} */ cacheKey = componentId + '-' + name;
        var /** @type {?} */ trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            var /** @type {?} */ errors = [];
            var /** @type {?} */ ast = (buildAnimationAst(/** @type {?} */ (metadata), errors));
            if (errors.length) {
                throw new Error("The animation trigger \"" + name + "\" has failed to build due to the following errors:\n - " + errors.join("\n - "));
            }
            trigger = buildTrigger(name, ast);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    };
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    AnimationEngine.prototype.register = function (namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    };
    /**
     * @param {?} namespaceId
     * @param {?} context
     * @return {?}
     */
    AnimationEngine.prototype.destroy = function (namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} parent
     * @param {?} insertBefore
     * @return {?}
     */
    AnimationEngine.prototype.onInsert = function (namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} context
     * @return {?}
     */
    AnimationEngine.prototype.onRemove = function (namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    AnimationEngine.prototype.setProperty = function (namespaceId, element, property, value) {
        // @@property
        if (property.charAt(0) == '@') {
            var _a = parseTimelineCommand(property), id = _a[0], action = _a[1];
            var /** @type {?} */ args = (value);
            this._timelineEngine.command(id, element, action, args);
            return false;
        }
        return this._transitionEngine.trigger(namespaceId, element, property, value);
    };
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} eventName
     * @param {?} eventPhase
     * @param {?} callback
     * @return {?}
     */
    AnimationEngine.prototype.listen = function (namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            var _a = parseTimelineCommand(eventName), id = _a[0], action = _a[1];
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    };
    /**
     * @param {?=} microtaskId
     * @return {?}
     */
    AnimationEngine.prototype.flush = function (microtaskId) {
        if (microtaskId === void 0) { microtaskId = -1; }
        this._transitionEngine.flush(microtaskId);
    };
    Object.defineProperty(AnimationEngine.prototype, "players", {
        /**
         * @return {?}
         */
        get: function () {
            return ((this._transitionEngine.players))
                .concat(/** @type {?} */ (this._timelineEngine.players));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AnimationEngine.prototype.whenRenderingDone = function () { return this._transitionEngine.whenRenderingDone(); };
    return AnimationEngine;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsPlayer = (function () {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @param {?=} previousPlayers
     */
    function WebAnimationsPlayer(element, keyframes, options, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var _this = this;
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this.previousPlayers = previousPlayers;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._initialized = false;
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.time = 0;
        this.parentPlayer = null;
        this.currentSnapshot = {};
        this._duration = options['duration'];
        this._delay = options['delay'] || 0;
        this.time = this._duration + this._delay;
        this.previousStyles = {};
        previousPlayers.forEach(function (player) {
            var styles = player.currentSnapshot;
            Object.keys(styles).forEach(function (prop) { return _this.previousStyles[prop] = styles[prop]; });
        });
    }
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.init = function () {
        this._buildPlayer();
        this._preparePlayerBeforeStart();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._buildPlayer = function () {
        var _this = this;
        if (this._initialized)
            return;
        this._initialized = true;
        var /** @type {?} */ keyframes = this.keyframes.map(function (styles) { return copyStyles(styles, false); });
        var /** @type {?} */ previousStyleProps = Object.keys(this.previousStyles);
        if (previousStyleProps.length) {
            var /** @type {?} */ startingKeyframe_1 = keyframes[0];
            var /** @type {?} */ missingStyleProps_1 = [];
            previousStyleProps.forEach(function (prop) {
                if (!startingKeyframe_1.hasOwnProperty(prop)) {
                    missingStyleProps_1.push(prop);
                }
                startingKeyframe_1[prop] = _this.previousStyles[prop];
            });
            if (missingStyleProps_1.length) {
                var /** @type {?} */ self_1 = this;
                var _loop_1 = function () {
                    var /** @type {?} */ kf = keyframes[i];
                    missingStyleProps_1.forEach(function (prop) {
                        kf[prop] = _computeStyle(self_1.element, prop);
                    });
                };
                // tslint:disable-next-line
                for (var /** @type {?} */ i = 1; i < keyframes.length; i++) {
                    _loop_1();
                }
            }
        }
        this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
        this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : {};
        this._player.addEventListener('finish', function () { return _this._onFinish(); });
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._preparePlayerBeforeStart = function () {
        // this is required so that the player doesn't start to animate right away
        if (this._delay) {
            this._resetDomPlayerState();
        }
        else {
            this._player.pause();
        }
    };
    /**
     * \@internal
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    WebAnimationsPlayer.prototype._triggerWebAnimation = function (element, keyframes, options) {
        // jscompiler doesn't seem to know animate is a native property because it's not fully
        // supported yet across common browsers (we polyfill it for Edge/Safari) [CL #143630929]
        return (element['animate'](keyframes, options));
    };
    Object.defineProperty(WebAnimationsPlayer.prototype, "domPlayer", {
        /**
         * @return {?}
         */
        get: function () { return this._player; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    WebAnimationsPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebAnimationsPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebAnimationsPlayer.prototype.onDestroy = function (fn) { this._onDestroyFns.push(fn); };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.play = function () {
        this._buildPlayer();
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._player.play();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.pause = function () {
        this.init();
        this._player.pause();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.finish = function () {
        this.init();
        this._onFinish();
        this._player.finish();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.reset = function () {
        this._resetDomPlayerState();
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype._resetDomPlayerState = function () {
        if (this._player) {
            this._player.cancel();
        }
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.restart = function () {
        this.reset();
        this.play();
    };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._resetDomPlayerState();
            this._onFinish();
            this._destroyed = true;
            this._onDestroyFns.forEach(function (fn) { return fn(); });
            this._onDestroyFns = [];
        }
    };
    /**
     * @param {?} p
     * @return {?}
     */
    WebAnimationsPlayer.prototype.setPosition = function (p) { this._player.currentTime = p * this.time; };
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.getPosition = function () { return this._player.currentTime / this.time; };
    Object.defineProperty(WebAnimationsPlayer.prototype, "totalTime", {
        /**
         * @return {?}
         */
        get: function () { return this._delay + this._duration; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WebAnimationsPlayer.prototype.beforeDestroy = function () {
        var _this = this;
        var /** @type {?} */ styles = {};
        if (this.hasStarted()) {
            Object.keys(this._finalKeyframe).forEach(function (prop) {
                if (prop != 'offset') {
                    styles[prop] =
                        _this._finished ? _this._finalKeyframe[prop] : _computeStyle(_this.element, prop);
                }
            });
        }
        this.currentSnapshot = styles;
    };
    return WebAnimationsPlayer;
}());
/**
 * @param {?} element
 * @param {?} prop
 * @return {?}
 */
function _computeStyle(element, prop) {
    return ((window.getComputedStyle(element)))[prop];
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsDriver = (function () {
    function WebAnimationsDriver() {
    }
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    WebAnimationsDriver.prototype.matchesElement = function (element, selector) {
        return matchesElement(element, selector);
    };
    /**
     * @param {?} elm1
     * @param {?} elm2
     * @return {?}
     */
    WebAnimationsDriver.prototype.containsElement = function (elm1, elm2) { return containsElement(elm1, elm2); };
    /**
     * @param {?} element
     * @param {?} selector
     * @param {?} multi
     * @return {?}
     */
    WebAnimationsDriver.prototype.query = function (element, selector, multi) {
        return invokeQuery(element, selector, multi);
    };
    /**
     * @param {?} element
     * @param {?} prop
     * @param {?=} defaultValue
     * @return {?}
     */
    WebAnimationsDriver.prototype.computeStyle = function (element, prop, defaultValue) {
        return (((window.getComputedStyle(element)))[prop]);
    };
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    WebAnimationsDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var /** @type {?} */ fill = delay == 0 ? 'both' : 'forwards';
        var /** @type {?} */ playerOptions = { duration: duration, delay: delay, fill: fill };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        var /** @type {?} */ previousWebAnimationPlayers = (previousPlayers.filter(function (player) { return player instanceof WebAnimationsPlayer; }));
        return new WebAnimationsPlayer(element, keyframes, playerOptions, previousWebAnimationPlayers);
    };
    return WebAnimationsDriver;
}());
/**
 * @return {?}
 */
function supportsWebAnimations() {
    return typeof Element !== 'undefined' && typeof ((Element)).prototype['animate'] === 'function';
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the animation package.
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=browser.es5.js.map


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserAnimationsModule", function() { return BrowserAnimationsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoopAnimationsModule", function() { return NoopAnimationsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵBrowserAnimationBuilder", function() { return BrowserAnimationBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵBrowserAnimationFactory", function() { return BrowserAnimationFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵAnimationRenderer", function() { return AnimationRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵAnimationRendererFactory", function() { return AnimationRendererFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return BaseAnimationRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return BROWSER_ANIMATIONS_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return BROWSER_NOOP_ANIMATIONS_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return InjectableAnimationEngine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return instantiateDefaultStyleNormalizer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return instantiateRendererFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return instantiateSupportedAnimationDriver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__ = __webpack_require__(11);

/**
 * @license Angular v4.2.5
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */




/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var BrowserAnimationBuilder = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](BrowserAnimationBuilder, _super);
    /**
     * @param {?} rootRenderer
     */
    function BrowserAnimationBuilder(rootRenderer) {
        var _this = _super.call(this) || this;
        _this._nextAnimationId = 0;
        var typeData = {
            id: '0',
            encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None,
            styles: [],
            data: { animation: [] }
        };
        _this._renderer = rootRenderer.createRenderer(document.body, typeData);
        return _this;
    }
    /**
     * @param {?} animation
     * @return {?}
     */
    BrowserAnimationBuilder.prototype.build = function (animation) {
        var /** @type {?} */ id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        var /** @type {?} */ entry = Array.isArray(animation) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["sequence"])(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
    };
    return BrowserAnimationBuilder;
}(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["AnimationBuilder"]));
BrowserAnimationBuilder.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BrowserAnimationBuilder.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["RendererFactory2"], },
]; };
var BrowserAnimationFactory = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](BrowserAnimationFactory, _super);
    /**
     * @param {?} _id
     * @param {?} _renderer
     */
    function BrowserAnimationFactory(_id, _renderer) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this._renderer = _renderer;
        return _this;
    }
    /**
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    BrowserAnimationFactory.prototype.create = function (element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    };
    return BrowserAnimationFactory;
}(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["AnimationFactory"]));
var RendererAnimationPlayer = (function () {
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} options
     * @param {?} _renderer
     */
    function RendererAnimationPlayer(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    RendererAnimationPlayer.prototype._listen = function (eventName, callback) {
        return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
    };
    /**
     * @param {?} command
     * @param {...?} args
     * @return {?}
     */
    RendererAnimationPlayer.prototype._command = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDone = function (fn) { this._listen('done', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onStart = function (fn) { this._listen('start', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDestroy = function (fn) { this._listen('destroy', fn); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.init = function () { this._command('init'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.play = function () {
        this._command('play');
        this._started = true;
    };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.pause = function () { this._command('pause'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.restart = function () { this._command('restart'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.finish = function () { this._command('finish'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.destroy = function () { this._command('destroy'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.reset = function () { this._command('reset'); };
    /**
     * @param {?} p
     * @return {?}
     */
    RendererAnimationPlayer.prototype.setPosition = function (p) { this._command('setPosition', p); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.getPosition = function () { return 0; };
    return RendererAnimationPlayer;
}());
/**
 * @param {?} renderer
 * @param {?} element
 * @param {?} id
 * @param {?} command
 * @param {?} args
 * @return {?}
 */
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, "@@" + id + ":" + command, args);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationRendererFactory = (function () {
    /**
     * @param {?} delegate
     * @param {?} engine
     * @param {?} _zone
     */
    function AnimationRendererFactory(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = new Map();
        engine.onRemovalComplete = function (element, delegate) {
            // Note: if an component element has a leave animation, and the component
            // a host leave animation, the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            if (delegate && delegate.parentNode(element)) {
                delegate.removeChild(element.parentNode, element);
            }
        };
    }
    /**
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    AnimationRendererFactory.prototype.createRenderer = function (hostElement, type) {
        var _this = this;
        var /** @type {?} */ EMPTY_NAMESPACE_ID = '';
        // cache the delegates to find out which cached delegate can
        // be used by which cached renderer
        var /** @type {?} */ delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation']) {
            var /** @type {?} */ renderer = this._rendererCache.get(delegate);
            if (!renderer) {
                renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                // only cache this result when the base renderer is used
                this._rendererCache.set(delegate, renderer);
            }
            return renderer;
        }
        var /** @type {?} */ componentId = type.id;
        var /** @type {?} */ namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        var /** @type {?} */ animationTriggers = (type.data['animation']);
        animationTriggers.forEach(function (trigger) { return _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger); });
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.begin = function () {
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype._scheduleCountTask = function () {
        var _this = this;
        Zone.current.scheduleMicroTask('incremenet the animation microtask', function () { return _this._microtaskId++; });
    };
    /**
     * @param {?} count
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    AnimationRendererFactory.prototype.scheduleListenerCallback = function (count, fn, data) {
        var _this = this;
        if (count >= 0 && count < this._microtaskId) {
            this._zone.run(function () { return fn(data); });
            return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(function () {
                _this._zone.run(function () {
                    _this._animationCallbacksBuffer.forEach(function (tuple) {
                        var fn = tuple[0], data = tuple[1];
                        fn(data);
                    });
                    _this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.end = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._scheduleCountTask();
            _this.engine.flush(_this._microtaskId);
        });
        if (this.delegate.end) {
            this.delegate.end();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.whenRenderingDone = function () { return this.engine.whenRenderingDone(); };
    return AnimationRendererFactory;
}());
AnimationRendererFactory.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
AnimationRendererFactory.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["RendererFactory2"], },
    { type: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* ɵAnimationEngine */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], },
]; };
var BaseAnimationRenderer = (function () {
    /**
     * @param {?} namespaceId
     * @param {?} delegate
     * @param {?} engine
     */
    function BaseAnimationRenderer(namespaceId, delegate, engine) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
    }
    Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
        /**
         * @return {?}
         */
        get: function () { return this.delegate.data; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BaseAnimationRenderer.prototype.destroy = function () {
        this.engine.destroy(this.namespaceId, this.delegate);
        this.delegate.destroy();
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createElement = function (name, namespace) {
        return this.delegate.createElement(name, namespace);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createComment = function (value) { return this.delegate.createComment(value); };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.createText = function (value) { return this.delegate.createText(value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.appendChild = function (parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, true);
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeChild = function (parent, oldChild) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
    };
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    BaseAnimationRenderer.prototype.selectRootElement = function (selectorOrNode) { return this.delegate.selectRootElement(selectorOrNode); };
    /**
     * @param {?} node
     * @return {?}
     */
    BaseAnimationRenderer.prototype.parentNode = function (node) { return this.delegate.parentNode(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    BaseAnimationRenderer.prototype.nextSibling = function (node) { return this.delegate.nextSibling(node); };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setAttribute = function (el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeAttribute = function (el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    BaseAnimationRenderer.prototype.addClass = function (el, name) { this.delegate.addClass(el, name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeClass = function (el, name) { this.delegate.removeClass(el, name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?=} flags
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setStyle = function (el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?=} flags
     * @return {?}
     */
    BaseAnimationRenderer.prototype.removeStyle = function (el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setProperty = function (el, name, value) {
        this.delegate.setProperty(el, name, value);
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    BaseAnimationRenderer.prototype.setValue = function (node, value) { this.delegate.setValue(node, value); };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    BaseAnimationRenderer.prototype.listen = function (target, eventName, callback) {
        return this.delegate.listen(target, eventName, callback);
    };
    return BaseAnimationRenderer;
}());
var AnimationRenderer = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](AnimationRenderer, _super);
    /**
     * @param {?} factory
     * @param {?} namespaceId
     * @param {?} delegate
     * @param {?} engine
     */
    function AnimationRenderer(factory, namespaceId, delegate, engine) {
        var _this = _super.call(this, namespaceId, delegate, engine) || this;
        _this.factory = factory;
        _this.namespaceId = namespaceId;
        return _this;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.setProperty = function (el, name, value) {
        if (name.charAt(0) == '@') {
            name = name.substr(1);
            this.engine.setProperty(this.namespaceId, el, name, value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    AnimationRenderer.prototype.listen = function (target, eventName, callback) {
        var _this = this;
        if (eventName.charAt(0) == '@') {
            var /** @type {?} */ element = resolveElementFromTarget(target);
            var /** @type {?} */ name = eventName.substr(1);
            var /** @type {?} */ phase = '';
            if (name.charAt(0) != '@') {
                _a = parseTriggerCallbackName(name), name = _a[0], phase = _a[1];
            }
            return this.engine.listen(this.namespaceId, element, name, phase, function (event) {
                var /** @type {?} */ countId = ((event))['_data'] || -1;
                _this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
        var _a;
    };
    return AnimationRenderer;
}(BaseAnimationRenderer));
/**
 * @param {?} target
 * @return {?}
 */
function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
/**
 * @param {?} triggerName
 * @return {?}
 */
function parseTriggerCallbackName(triggerName) {
    var /** @type {?} */ dotIndex = triggerName.indexOf('.');
    var /** @type {?} */ trigger = triggerName.substring(0, dotIndex);
    var /** @type {?} */ phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var InjectableAnimationEngine = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](InjectableAnimationEngine, _super);
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function InjectableAnimationEngine(driver, normalizer) {
        return _super.call(this, driver, normalizer) || this;
    }
    return InjectableAnimationEngine;
}(__WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* ɵAnimationEngine */]));
InjectableAnimationEngine.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
InjectableAnimationEngine.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* AnimationDriver */], },
    { type: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], },
]; };
/**
 * @return {?}
 */
function instantiateSupportedAnimationDriver() {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["d" /* ɵsupportsWebAnimations */])()) {
        return new __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["e" /* ɵWebAnimationsDriver */]();
    }
    return new __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["f" /* ɵNoopAnimationDriver */]();
}
/**
 * @return {?}
 */
function instantiateDefaultStyleNormalizer() {
    return new __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["g" /* ɵWebAnimationsStyleNormalizer */]();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
var SHARED_ANIMATION_PROVIDERS = [
    { provide: __WEBPACK_IMPORTED_MODULE_3__angular_animations__["AnimationBuilder"], useClass: BrowserAnimationBuilder },
    { provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], useFactory: instantiateDefaultStyleNormalizer },
    { provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* ɵAnimationEngine */], useClass: InjectableAnimationEngine }, {
        provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["RendererFactory2"],
        useFactory: instantiateRendererFactory,
        deps: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["ɵDomRendererFactory2"], __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["a" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
var BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* AnimationDriver */], useFactory: instantiateSupportedAnimationDriver }
].concat(SHARED_ANIMATION_PROVIDERS);
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{ provide: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["b" /* AnimationDriver */], useClass: __WEBPACK_IMPORTED_MODULE_4__angular_animations_browser__["f" /* ɵNoopAnimationDriver */] }].concat(SHARED_ANIMATION_PROVIDERS);
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental Animation support is experimental.
 */
var BrowserAnimationsModule = (function () {
    function BrowserAnimationsModule() {
    }
    return BrowserAnimationsModule;
}());
BrowserAnimationsModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                imports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"]],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
BrowserAnimationsModule.ctorParameters = function () { return []; };
/**
 * \@experimental Animation support is experimental.
 */
var NoopAnimationsModule = (function () {
    function NoopAnimationsModule() {
    }
    return NoopAnimationsModule;
}());
NoopAnimationsModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                imports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"]],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsModule.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the animation package.
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=animations.es5.js.map


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * angular2-data-table v"9.3.0" (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(42));
	else if(typeof define === 'function' && define.amd)
		define("ngxDatatable", ["@angular/core", "@angular/platform-browser", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["ngxDatatable"] = factory(require("@angular/core"), require("@angular/platform-browser"), require("@angular/common"));
	else
		root["ngxDatatable"] = factory(root["@angular/core"], root["@angular/platform-browser"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__("./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__("./node_modules/ieee754/index.js")
var isArray = __webpack_require__("./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ngx-datatable {\n  display: block;\n  overflow: hidden;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n  /**\n   * Vertical Scrolling Adjustments\n   */\n  /**\n   * Horizontal Scrolling Adjustments\n   */\n  /**\n   * Fixed Header Height Adjustments\n   */\n  /**\n   * Fixed row height adjustments\n   */\n  /**\n   * Shared Styles\n   */\n  /**\n   * Header Styles\n   */\n  /**\n   * Body Styles\n   */\n  /**\n   * Footer Styles\n   */ }\n  .ngx-datatable [hidden] {\n    display: none !important; }\n  .ngx-datatable *, .ngx-datatable *:before, .ngx-datatable *:after {\n    box-sizing: border-box; }\n  .ngx-datatable.scroll-vertical .datatable-body {\n    overflow-y: auto; }\n    .ngx-datatable.scroll-vertical .datatable-body .datatable-row-wrapper {\n      position: absolute; }\n  .ngx-datatable.scroll-horz .datatable-body {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n  .ngx-datatable.fixed-header .datatable-header .datatable-header-inner {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .ngx-datatable.fixed-row .datatable-scroll {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row {\n      white-space: nowrap; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n  .ngx-datatable .datatable-body-row,\n  .ngx-datatable .datatable-header-inner {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-flow: row;\n    -o-flex-flow: row;\n    flex-flow: row; }\n  .ngx-datatable .datatable-body-cell,\n  .ngx-datatable .datatable-header-cell {\n    vertical-align: top;\n    display: inline-block;\n    line-height: 1.625;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    user-select: none; }\n    .ngx-datatable .datatable-body-cell:focus,\n    .ngx-datatable .datatable-header-cell:focus {\n      outline: none; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-right {\n    z-index: 9; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-row-right {\n    position: relative; }\n  .ngx-datatable .datatable-header {\n    display: block;\n    overflow: hidden; }\n    .ngx-datatable .datatable-header .datatable-header-inner {\n      -webkit-box-align: stretch;\n          -ms-flex-align: stretch;\n              align-items: stretch;\n      -webkit-align-items: stretch; }\n    .ngx-datatable .datatable-header .datatable-header-cell {\n      position: relative;\n      display: inline-block; }\n      .ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-wrapper {\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper {\n        cursor: move; }\n      .ngx-datatable .datatable-header .datatable-header-cell .sort-btn {\n        line-height: 100%;\n        vertical-align: middle;\n        display: inline-block;\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle {\n        display: inline-block;\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        width: 5px;\n        padding: 0 4px;\n        visibility: hidden;\n        cursor: ew-resize; }\n      .ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle {\n        visibility: visible; }\n  .ngx-datatable .datatable-body {\n    position: relative;\n    z-index: 10;\n    display: block; }\n    .ngx-datatable .datatable-body .datatable-scroll {\n      display: inline-block; }\n    .ngx-datatable .datatable-body .datatable-row-detail {\n      overflow-y: hidden; }\n    .ngx-datatable .datatable-body .datatable-row-wrapper {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n    .ngx-datatable .datatable-body .datatable-body-row {\n      outline: none; }\n      .ngx-datatable .datatable-body .datatable-body-row > div {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n  .ngx-datatable .datatable-footer {\n    display: block;\n    width: 100%; }\n    .ngx-datatable .datatable-footer .datatable-footer-inner {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      width: 100%; }\n    .ngx-datatable .datatable-footer .selected-count .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 40%;\n              flex: 1 1 40%; }\n    .ngx-datatable .datatable-footer .selected-count .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 60%;\n              flex: 1 1 60%; }\n    .ngx-datatable .datatable-footer .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 20%;\n              flex: 1 1 20%; }\n    .ngx-datatable .datatable-footer .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 80%;\n              flex: 1 1 80%;\n      text-align: right; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager,\n      .ngx-datatable .datatable-footer .datatable-pager .pager li {\n        padding: 0;\n        margin: 0;\n        display: inline-block;\n        list-style: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li, .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        outline: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        cursor: pointer;\n        display: inline-block; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a {\n        cursor: not-allowed; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/rxjs/InnerSubscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Observable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var toSubscriber_1 = __webpack_require__("./node_modules/rxjs/util/toSubscriber.js");
var observable_1 = __webpack_require__("./node_modules/rxjs/symbol/observable.js");
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/Observer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),

/***/ "./node_modules/rxjs/OuterSubscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var Observer_1 = __webpack_require__("./node_modules/rxjs/Observer.js");
var rxSubscriber_1 = __webpack_require__("./node_modules/rxjs/symbol/rxSubscriber.js");
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subscription.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var isObject_1 = __webpack_require__("./node_modules/rxjs/util/isObject.js");
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var UnsubscriptionError_1 = __webpack_require__("./node_modules/rxjs/util/UnsubscriptionError.js");
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/observable/fromEvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var fromEvent_1 = __webpack_require__("./node_modules/rxjs/observable/fromEvent.js");
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/operator/takeUntil.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var takeUntil_1 = __webpack_require__("./node_modules/rxjs/operator/takeUntil.js");
Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/FromEventObservable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var toString = Object.prototype.toString;
function isNodeStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/fromEvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromEventObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromEventObservable.js");
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/takeUntil.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/observable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/rxSubscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/UnsubscriptionError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/errorObject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isArray.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isArrayLike.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isFunction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isObject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isPromise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/root.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/rxjs/util/subscribeToResult.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var isArrayLike_1 = __webpack_require__("./node_modules/rxjs/util/isArrayLike.js");
var isPromise_1 = __webpack_require__("./node_modules/rxjs/util/isPromise.js");
var isObject_1 = __webpack_require__("./node_modules/rxjs/util/isObject.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var iterator_1 = __webpack_require__("./node_modules/rxjs/symbol/iterator.js");
var InnerSubscriber_1 = __webpack_require__("./node_modules/rxjs/InnerSubscriber.js");
var observable_1 = __webpack_require__("./node_modules/rxjs/symbol/observable.js");
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/toSubscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var rxSubscriber_1 = __webpack_require__("./node_modules/rxjs/symbol/rxSubscriber.js");
var Observer_1 = __webpack_require__("./node_modules/rxjs/Observer.js");
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/tryCatch.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/body/body-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableBodyCellComponent = (function () {
    function DataTableBodyCellComponent(element) {
        this.activate = new core_1.EventEmitter();
        this.isFocused = false;
        this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
        this.activateFn = this.activate.emit.bind(this.activate);
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.calcSortDir = this.calcSortDir(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            if (this.column.cellClass) {
                if (typeof this.column.cellClass === 'string') {
                    cls += ' ' + this.column.cellClass;
                }
                else if (typeof this.column.cellClass === 'function') {
                    var res = this.column.cellClass({
                        row: this.row,
                        column: this.column,
                        value: this.value
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true)
                                cls += " " + k;
                        }
                    }
                }
            }
            if (!this.sortDir)
                cls += ' sort-active';
            if (this.isFocused)
                cls += ' active';
            if (this.sortDir === types_1.SortDirection.asc)
                cls += ' sort-asc';
            if (this.sortDir === types_1.SortDirection.desc)
                cls += ' sort-desc';
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "height", {
        get: function () {
            var height = this.rowHeight;
            if (isNaN(height))
                return height;
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "value", {
        get: function () {
            if (!this.row || !this.column)
                return '';
            var val = this.column.$$valueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            if (userPipe)
                return userPipe.transform(val);
            if (val !== undefined)
                return val;
            return '';
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.ngOnDestroy = function () {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    };
    DataTableBodyCellComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function () {
        this.isFocused = false;
    };
    DataTableBodyCellComponent.prototype.onClick = function (event) {
        this.activate.emit({
            type: 'click',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.onDblClick = function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetCell = event.target === this.element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                column: this.column,
                value: this.value,
                cellElement: this.element
            });
        }
    };
    DataTableBodyCellComponent.prototype.onCheckboxChange = function (event) {
        this.activate.emit({
            type: 'checkbox',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (!sorts)
            return;
        var sort = sorts.find(function (s) {
            return s.prop === _this.column.prop;
        });
        if (sort)
            return sort.dir;
    };
    return DataTableBodyCellComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyCellComponent.prototype, "row", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyCellComponent.prototype, "column", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyCellComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableBodyCellComponent.prototype, "isSelected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableBodyCellComponent.prototype, "sorts", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyCellComponent.prototype, "activate", void 0);
__decorate([
    core_1.ViewChild('cellTemplate', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], DataTableBodyCellComponent.prototype, "cellTemplate", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableBodyCellComponent.prototype, "columnCssClasses", null);
__decorate([
    core_1.HostBinding('style.width.px'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], DataTableBodyCellComponent.prototype, "width", null);
__decorate([
    core_1.HostBinding('style.height'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableBodyCellComponent.prototype, "height", null);
__decorate([
    core_1.HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onFocus", null);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onBlur", null);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onClick", null);
__decorate([
    core_1.HostListener('dblclick', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onDblClick", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataTableBodyCellComponent.prototype, "onKeyDown", null);
DataTableBodyCellComponent = __decorate([
    core_1.Component({
        selector: 'datatable-body-cell',
        template: "\n    <div class=\"datatable-body-cell-label\">\n      <label\n        *ngIf=\"column.checkboxable\" \n        class=\"datatable-checkbox\">\n        <input \n          type=\"checkbox\"\n          [checked]=\"isSelected\"\n          (click)=\"onCheckboxChange($event)\" \n        />\n      </label>\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [title]=\"value\"\n        [innerHTML]=\"value\">\n      </span>\n      <ng-template #cellTemplate\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{\n          value: value,\n          row: row,\n          column: column,\n          isSelected: isSelected,\n          onCheckboxChangeFn: onCheckboxChangeFn,\n          activateFn: activateFn\n        }\">\n      </ng-template>\n    </div>\n  ",
        host: {
            class: 'datatable-body-cell'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DataTableBodyCellComponent);
exports.DataTableBodyCellComponent = DataTableBodyCellComponent;


/***/ }),

/***/ "./src/components/body/body-row-wrapper.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var events_1 = __webpack_require__("./src/events.ts");
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent() {
        this.expanded = false;
        this.rowContextmenu = new core_1.EventEmitter(false);
    }
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    return DataTableRowWrapperComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableRowWrapperComponent.prototype, "expanded", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "row", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTableRowWrapperComponent.prototype, "rowContextmenu", void 0);
__decorate([
    core_1.HostListener('contextmenu', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataTableRowWrapperComponent.prototype, "onContextmenu", null);
DataTableRowWrapperComponent = __decorate([
    core_1.Component({
        selector: 'datatable-row-wrapper',
        template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"datatable-row-detail\">\n      <ng-template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngOutletContext]=\"{ row: row }\">\n      </ng-template>\n    </div>\n  ",
        host: {
            class: 'datatable-row-wrapper'
        }
    })
], DataTableRowWrapperComponent);
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;


/***/ }),

/***/ "./src/components/body/body-row.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableBodyRowComponent = (function () {
    function DataTableBodyRowComponent(scrollbarHelper, element) {
        this.scrollbarHelper = scrollbarHelper;
        this.activate = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            this.recalculateColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            this._innerWidth = val;
            this.recalculateColumns();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "cssClass", {
        get: function () {
            var cls = 'datatable-body-row';
            if (this.isSelected)
                cls += ' active';
            if (this.row.$$index % 2 !== 0)
                cls += ' datatable-row-odd';
            if (this.row.$$index % 2 === 0)
                cls += ' datatable-row-even';
            if (this.rowClass) {
                var res = this.rowClass(this.row);
                if (typeof res === 'string') {
                    cls += " " + res;
                }
                else if (typeof res === 'object') {
                    var keys = Object.keys(res);
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        if (res[k] === true)
                            cls += " " + k;
                    }
                }
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columnsTotalWidths", {
        get: function () {
            return this.columnGroupWidths.total;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRowComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableBodyRowComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableBodyRowComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this.element;
        this.activate.emit(event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this.element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this.element
            });
        }
    };
    DataTableBodyRowComponent.prototype.recalculateColumns = function (val) {
        if (val === void 0) { val = this.columns; }
        var colsByPin = utils_1.columnsByPin(val);
        this.columnsByPin = utils_1.columnsByPinArr(val);
        this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
    };
    return DataTableBodyRowComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableBodyRowComponent.prototype, "columns", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableBodyRowComponent.prototype, "innerWidth", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyRowComponent.prototype, "rowClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyRowComponent.prototype, "row", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyRowComponent.prototype, "offsetX", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableBodyRowComponent.prototype, "isSelected", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableBodyRowComponent.prototype, "cssClass", null);
__decorate([
    core_1.HostBinding('style.height.px'),
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.HostBinding('style.width.px'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DataTableBodyRowComponent.prototype, "columnsTotalWidths", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyRowComponent.prototype, "activate", void 0);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataTableBodyRowComponent.prototype, "onKeyDown", null);
DataTableBodyRowComponent = __decorate([
    core_1.Component({
        selector: 'datatable-body-row',
        template: "\n    <div\n      *ngFor=\"let colGroup of columnsByPin; let i = index; trackBy: trackByGroups\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"stylesByGroup(colGroup.type)\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [isSelected]=\"isSelected\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        (activate)=\"onActivate($event, ii)\">\n      </datatable-body-cell>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [services_1.ScrollbarHelper, core_1.ElementRef])
], DataTableBodyRowComponent);
exports.DataTableBodyRowComponent = DataTableBodyRowComponent;


/***/ }),

/***/ "./src/components/body/body.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var scroller_component_1 = __webpack_require__("./src/components/body/scroller.component.ts");
var DataTableBodyComponent = (function () {
    /**
     * Creates an instance of DataTableBodyComponent.
     *
     * @memberOf DataTableBodyComponent
     */
    function DataTableBodyComponent() {
        var _this = this;
        this.selected = [];
        this.scroll = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.rowHeightsCache = new utils_1.RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        /**
         * Get the height of the detail row.
         *
         * @param {*} [row]
         * @param {*} [index]
         * @returns {number}
         *
         * @memberOf DataTableBodyComponent
         */
        this.getDetailRowHeight = function (row, index) {
            if (!_this.rowDetail)
                return 0;
            var rowHeight = _this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
        };
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            if (this.trackByProp) {
                return row.$$index + "-" + this.trackByProp;
            }
            else {
                return row.$$index;
            }
        }.bind(this);
    }
    Object.defineProperty(DataTableBodyComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (val) {
            this._pageSize = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (val) {
            this._offset = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rowCount", {
        get: function () {
            return this._rowCount;
        },
        set: function (val) {
            this._rowCount = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyHeight", {
        get: function () {
            return this._bodyHeight;
        },
        set: function (val) {
            if (this.scrollbarV) {
                this._bodyHeight = val + 'px';
            }
            else {
                this._bodyHeight = 'auto';
            }
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        /**
         * Returns if selection is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableBodyComponent
         */
        get: function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         *
         * @readonly
         * @type {number}
         * @memberOf DataTableBodyComponent
         */
        get: function () {
            if (this.scrollbarV) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after the constructor, initializing input properties
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
            });
        }
    };
    /**
     * Called once, before the instance is destroyed.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.rowDetail)
            this.listener.unsubscribe();
    };
    /**
     * Updates the Y offset given a new offset.
     *
     * @param {number} [offset]
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        if (this.scrollbarV && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     *
     * @param {*} event
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.onBodyScroll = function (event) {
        var scrollYPos = event.scrollYPos;
        var scrollXPos = event.scrollXPos;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
            this.scroll.emit({
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.offsetX = scrollXPos;
        this.updateIndexes();
        this.updatePage(event.direction);
        this.updateRows();
    };
    /**
     * Updates the page given a direction.
     *
     * @param {string} direction
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updatePage = function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.ceil(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updateRows = function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        while (rowIndex < last && rowIndex < this.rowCount) {
            var row = this.rows[rowIndex];
            if (row) {
                row.$$index = rowIndex;
                temp[idx] = row;
            }
            idx++;
            rowIndex++;
        }
        this.temp = temp;
    };
    /**
     * Get the row height
     *
     * @param {*} row
     * @returns {number}
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        var rowHeight = this.rowHeight;
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            rowHeight = this.rowHeight(row);
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param {*} row the row for which the height need to be calculated.
     * @returns {number} height of the row.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = function (row) {
        var rowHeight = this.getRowHeight(row);
        // Adding detail row height if its expanded.
        if (row.$$expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    };
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param {*} row The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowsStyles = function (row) {
        var rowHeight = this.getRowAndDetailHeight(row);
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.scrollbarV) {
            var idx = row ? row.$$index : 0;
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Hides the loading indicator
     *
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    /**
     * Updates the index of the rows in the viewport
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updateIndexes = function () {
        var first = 0;
        var last = 0;
        if (this.scrollbarV) {
            // Calculation of the first and last indexes will be based on where the
            // scrollY position would be at.  The last index would be the one
            // that shows up inside the view port the last.
            var height = parseInt(this.bodyHeight, 0);
            first = this.rowHeightsCache.getRowIndex(this.offsetY);
            last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     *
     * @returns {void}
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV)
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount
            });
        }
    };
    /**
     * Gets the index for the view port
     *
     * @returns {number}
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV) {
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param {*} row The row for which the expansion needs to be toggled.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV) {
            var detailRowHeight = this.getDetailRowHeight(row) * (row.$$expanded ? -1 : 1);
            this.rowHeightsCache.update(row.$$index, detailRowHeight);
        }
        // Update the toggled row and update the heights in the cache.
        row.$$expanded ^= 1;
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     *
     * @param {boolean} expanded When true, all rows are expanded and when false, all rows will be collapsed.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.$$expanded = rowExpanded;
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Recalculates the table
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.recalcLayout = function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    return DataTableBodyComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableBodyComponent.prototype, "scrollbarV", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableBodyComponent.prototype, "scrollbarH", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableBodyComponent.prototype, "externalPaging", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyComponent.prototype, "offsetX", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableBodyComponent.prototype, "emptyMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyComponent.prototype, "selectionType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataTableBodyComponent.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyComponent.prototype, "rowIdentity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyComponent.prototype, "rowDetail", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyComponent.prototype, "selectCheck", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableBodyComponent.prototype, "trackByProp", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableBodyComponent.prototype, "rowClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableBodyComponent.prototype, "pageSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableBodyComponent.prototype, "rows", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableBodyComponent.prototype, "columns", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableBodyComponent.prototype, "offset", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTableBodyComponent.prototype, "rowCount", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableBodyComponent.prototype, "innerWidth", void 0);
__decorate([
    core_1.HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DataTableBodyComponent.prototype, "bodyWidth", null);
__decorate([
    core_1.Input(),
    core_1.HostBinding('style.height'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTableBodyComponent.prototype, "bodyHeight", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyComponent.prototype, "scroll", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyComponent.prototype, "page", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableBodyComponent.prototype, "detailToggle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTableBodyComponent.prototype, "rowContextmenu", void 0);
__decorate([
    core_1.ViewChild(scroller_component_1.ScrollerComponent),
    __metadata("design:type", scroller_component_1.ScrollerComponent)
], DataTableBodyComponent.prototype, "scroller", void 0);
DataTableBodyComponent = __decorate([
    core_1.Component({
        selector: 'datatable-body',
        template: "\n    <datatable-selection\n      #selector\n      [selected]=\"selected\"\n      [rows]=\"temp\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows?.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-row-wrapper\n          *ngFor=\"let row of temp; let i = index; trackBy: rowTrackingFn;\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [rowDetail]=\"rowDetail\"\n          [detailRowHeight]=\"getDetailRowHeight(row,i)\"\n          [row]=\"row\"\n          [expanded]=\"row.$$expanded === 1\"\n          (rowContextmenu)=\"rowContextmenu.emit($event)\">\n          <datatable-body-row\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(row)\"\n            [innerWidth]=\"innerWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"getRowHeight(row)\"\n            [row]=\"row\"\n            [rowClass]=\"rowClass\"\n            (activate)=\"selector.onActivate($event, i)\">\n          </datatable-body-row>\n        </datatable-row-wrapper>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows?.length\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
        host: {
            class: 'datatable-body'
        }
    }),
    __metadata("design:paramtypes", [])
], DataTableBodyComponent);
exports.DataTableBodyComponent = DataTableBodyComponent;


/***/ }),

/***/ "./src/components/body/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/body/body.component.ts"));
__export(__webpack_require__("./src/components/body/body-cell.component.ts"));
__export(__webpack_require__("./src/components/body/body-row.component.ts"));
__export(__webpack_require__("./src/components/body/progress-bar.component.ts"));
__export(__webpack_require__("./src/components/body/scroller.component.ts"));
__export(__webpack_require__("./src/components/body/body-row-wrapper.component.ts"));
__export(__webpack_require__("./src/components/body/selection.component.ts"));


/***/ }),

/***/ "./src/components/body/progress-bar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    return ProgressBarComponent;
}());
ProgressBarComponent = __decorate([
    core_1.Component({
        selector: 'datatable-progress',
        template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], ProgressBarComponent);
exports.ProgressBarComponent = ProgressBarComponent;


/***/ }),

/***/ "./src/components/body/scroller.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ScrollerComponent = (function () {
    function ScrollerComponent(element, renderer) {
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new core_1.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
    }
    ScrollerComponent.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.onScrollListener = this.renderer.listen(this.parentElement, 'scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.onScrollListener();
        }
    };
    ScrollerComponent.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    };
    ScrollerComponent.prototype.onScrolled = function (event) {
        var dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    };
    ScrollerComponent.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    return ScrollerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ScrollerComponent.prototype, "scrollbarV", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ScrollerComponent.prototype, "scrollbarH", void 0);
__decorate([
    core_1.HostBinding('style.height.px'),
    core_1.Input(),
    __metadata("design:type", Number)
], ScrollerComponent.prototype, "scrollHeight", void 0);
__decorate([
    core_1.HostBinding('style.width.px'),
    core_1.Input(),
    __metadata("design:type", Number)
], ScrollerComponent.prototype, "scrollWidth", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ScrollerComponent.prototype, "scroll", void 0);
ScrollerComponent = __decorate([
    core_1.Component({
        selector: 'datatable-scroller',
        template: "\n    <ng-content></ng-content>\n  ",
        host: {
            class: 'datatable-scroll'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], ScrollerComponent);
exports.ScrollerComponent = ScrollerComponent;


/***/ }),

/***/ "./src/components/body/selection.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var DataTableSelectionComponent = (function () {
    function DataTableSelectionComponent() {
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var multi = this.selectionType === types_1.SelectionType.multi;
        var multiClick = this.selectionType === types_1.SelectionType.multiClick;
        var selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = utils_1.selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = utils_1.selectRows(this.selected.slice(), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, selected);
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
        var _a;
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    };
    DataTableSelectionComponent.prototype.onKeyboardFocus = function (model) {
        var keyCode = model.event.keyCode;
        var shouldFocus = keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.left;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === types_1.SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    DataTableSelectionComponent.prototype.focusRow = function (rowElement, keyCode) {
        var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowSelectedIdx = function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        var rowId = this.rowIdentity(row);
        return selected.findIndex(function (r) {
            var id = _this.rowIdentity(r);
            return id === rowId;
        });
    };
    return DataTableSelectionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataTableSelectionComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataTableSelectionComponent.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableSelectionComponent.prototype, "selectionType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableSelectionComponent.prototype, "selectCheck", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableSelectionComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableSelectionComponent.prototype, "select", void 0);
DataTableSelectionComponent = __decorate([
    core_1.Component({
        selector: 'datatable-selection',
        template: "\n    <ng-content></ng-content>\n  "
    })
], DataTableSelectionComponent);
exports.DataTableSelectionComponent = DataTableSelectionComponent;


/***/ }),

/***/ "./src/components/columns/column-cell.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DataTableColumnCellDirective = (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    return DataTableColumnCellDirective;
}());
DataTableColumnCellDirective = __decorate([
    core_1.Directive({ selector: '[ngx-datatable-cell-template]' }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], DataTableColumnCellDirective);
exports.DataTableColumnCellDirective = DataTableColumnCellDirective;


/***/ }),

/***/ "./src/components/columns/column-header.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DataTableColumnHeaderDirective = (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    return DataTableColumnHeaderDirective;
}());
DataTableColumnHeaderDirective = __decorate([
    core_1.Directive({ selector: '[ngx-datatable-header-template]' }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], DataTableColumnHeaderDirective);
exports.DataTableColumnHeaderDirective = DataTableColumnHeaderDirective;


/***/ }),

/***/ "./src/components/columns/column.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var column_header_directive_1 = __webpack_require__("./src/components/columns/column-header.directive.ts");
var column_cell_directive_1 = __webpack_require__("./src/components/columns/column-cell.directive.ts");
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    return DataTableColumnDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableColumnDirective.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "prop", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "frozenLeft", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "frozenRight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "flexGrow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "resizeable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "comparator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "pipe", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "sortable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "draggable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "canAutoResize", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "minWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableColumnDirective.prototype, "maxWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "checkboxable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableColumnDirective.prototype, "headerCheckboxable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "headerClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableColumnDirective.prototype, "cellClass", void 0);
__decorate([
    core_1.Input(),
    core_1.ContentChild(column_cell_directive_1.DataTableColumnCellDirective, { read: core_1.TemplateRef }),
    __metadata("design:type", core_1.TemplateRef)
], DataTableColumnDirective.prototype, "cellTemplate", void 0);
__decorate([
    core_1.Input(),
    core_1.ContentChild(column_header_directive_1.DataTableColumnHeaderDirective, { read: core_1.TemplateRef }),
    __metadata("design:type", core_1.TemplateRef)
], DataTableColumnDirective.prototype, "headerTemplate", void 0);
DataTableColumnDirective = __decorate([
    core_1.Directive({ selector: 'ngx-datatable-column' })
], DataTableColumnDirective);
exports.DataTableColumnDirective = DataTableColumnDirective;


/***/ }),

/***/ "./src/components/columns/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/columns/column.directive.ts"));
__export(__webpack_require__("./src/components/columns/column-header.directive.ts"));
__export(__webpack_require__("./src/components/columns/column-cell.directive.ts"));


/***/ }),

/***/ "./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/components/datatable.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/components/datatable.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var body_1 = __webpack_require__("./src/components/body/index.ts");
var columns_1 = __webpack_require__("./src/components/columns/index.ts");
var row_detail_1 = __webpack_require__("./src/components/row-detail/index.ts");
var footer_1 = __webpack_require__("./src/components/footer/index.ts");
var DatatableComponent = (function () {
    function DatatableComponent(scrollbarHelper, element, differs) {
        this.scrollbarHelper = scrollbarHelper;
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         *
         * @type {any[]}
         * @memberOf DatatableComponent
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         *
         * @type {ColumnMode}
         * @memberOf DatatableComponent
         */
        this.columnMode = types_1.ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         *
         * @type {*}
         * @memberOf DatatableComponent
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.externalSorting = false;
        /**
         * The page size to be shown.
         * Default value: `undefined`
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.limit = undefined;
        /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.offset = 0;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.reorderable = true;
        /**
         * The type of sorting
         *
         * @type {SortType}
         * @memberOf DatatableComponent
         */
        this.sortType = types_1.SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         *
         * @type {any[]}
         * @memberOf DatatableComponent
         */
        this.sorts = [];
        /**
         * Css class overrides
         *
         * @type {*}
         * @memberOf DatatableComponent
         */
        this.cssClasses = {
            sortAscending: 'datatable-icon-up',
            sortDescending: 'datatable-icon-down',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * emptyMessage     [default] = 'No data to display'
         * totalMessage     [default] = 'total'
         * selectedMessage  [default] = 'selected'
         *
         * @type {*}
         * @memberOf DatatableComponent
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        };
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         *
         * @memberOf DatatableComponent
         */
        this.rowIdentity = (function (x) { return x; });
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.scroll = new core_1.EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.activate = new core_1.EventEmitter();
        /**
         * A cell or row was selected.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.select = new core_1.EventEmitter();
        /**
         * Column sort was invoked.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.sort = new core_1.EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.page = new core_1.EventEmitter();
        /**
         * Columns were re-ordered.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.reorder = new core_1.EventEmitter();
        /**
         * Column was resized.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.resize = new core_1.EventEmitter();
        /**
         * The context menu was invoked on the table.
         * type indicates whether the header or the body was clicked.
         * content contains either the column or the row that was clicked.
         *
         * @memberOf DatatableComponent
         */
        this.tableContextmenu = new core_1.EventEmitter(false);
        this.rowCount = 0;
        this.offsetX = 0;
        this._count = 0;
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create(null);
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         *
         * @readonly
         * @type {*}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._rows;
        },
        /**
         * Rows that are displayed in the table.
         *
         * @memberOf DatatableComponent
         */
        set: function (val) {
            // auto sort on new updates
            if (!this.externalSorting) {
                val = utils_1.sortRows(val, this.columns, this.sorts);
            }
            this._rows = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        /**
         * Get the columns.
         *
         * @readonly
         * @type {any[]}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._columns;
        },
        /**
         * Columns to be displayed.
         *
         * @memberOf DatatableComponent
         */
        set: function (val) {
            if (val) {
                utils_1.setColumnDefaults(val);
                this.recalculateColumns(val);
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "count", {
        /**
         * Gets the count.
         *
         * @readonly
         * @type {number}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._count;
        },
        /**
         * The total count of all rows.
         * Default value: `0`
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        set: function (val) {
            this._count = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        /**
         * CSS class applied to root element is selectable.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCheckboxSelection", {
        /**
         * CSS class applied to root is checkbox selection.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        /**
         * CSS class added to root element if mulit click select
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         *
         * @readonly
         * @type {QueryList<DataTableColumnDirective>}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._columnTemplates;
        },
        /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         *
         * @memberOf DatatableComponent
         */
        set: function (val) {
            this._columnTemplates = val;
            if (val) {
                // only set this if results were brought back
                var arr = val.toArray();
                if (arr.length) {
                    // translate them to normal objects
                    this.columns = utils_1.translateTemplates(arr);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         *
         * @readonly
         * @private
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selected &&
                this.rows &&
                this.rows.length !== 0 &&
                this.selected.length === this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.ngOnInit = function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.externalSorting) {
            var val = utils_1.sortRows(this._rows, this.columns, this.sorts);
            this._rows = val;
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        setTimeout(function () {
            _this.recalculate();
            // emit page for virtual server-side kickoff
            if (_this.externalPaging && _this.scrollbarV) {
                _this.page.emit({
                    count: _this.count,
                    pageSize: _this.pageSize,
                    limit: _this.limit,
                    offset: 0
                });
            }
        });
    };
    /**
     * Lifecycle hook that is called when Angular dirty checks a directive.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.recalculatePages();
        }
    };
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
     * Window resize handler to update sizes.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onWindowResize = function () {
        this.recalculate();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     *
     * @param {any[]} [columns=this.columns]
     * @param {number} [forceIdx=-1]
     * @param {boolean} [allowBleed=this.scrollH]
     * @returns {any[]}
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this.columns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        return columns;
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculateDims = function () {
        var dims = this.element.getBoundingClientRect();
        this.innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            var height = dims.height;
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    };
    /**
     * Recalculates the pages after a update.
     *
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculatePages = function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    /**
     * Body triggered a page event.
     *
     * @param {*} { offset }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * The body triggered a scroll event.
     *
     * @param {MouseEvent} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    };
    /**
     * The footer triggered a page event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onFooterPage = function (event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * Recalculates the sizes of the page
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV) {
            var size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined)
            return this.limit;
        // otherwise use row length
        if (val)
            return val.length;
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            return val.length;
        }
        return this.count;
    };
    /**
     * The header triggered a contextmenu event.
     *
     * @param {*} { event, column }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnContextmenu = function (_a) {
        var event = _a.event, column = _a.column;
        this.tableContextmenu.emit({ event: event, type: types_1.ContextmenuType.header, content: column });
    };
    /**
     * The body triggered a contextmenu event.
     *
     * @param {*} { event, row }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onRowContextmenu = function (_a) {
        var event = _a.event, row = _a.row;
        this.tableContextmenu.emit({ event: event, type: types_1.ContextmenuType.body, content: row });
    };
    /**
     * The header triggered a column resize event.
     *
     * @param {*} { column, newValue }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnResize = function (_a) {
        var column = _a.column, newValue = _a.newValue;
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        var idx;
        var cols = this.columns.map(function (c, i) {
            c = __assign({}, c);
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        });
        this.recalculateColumns(cols, idx);
        this._columns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     *
     * @param {*} { column, newValue, prevValue }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this.columns.map(function (c) {
            return __assign({}, c);
        });
        var prevCol = cols[newValue];
        cols[newValue] = column;
        cols[prevValue] = prevCol;
        this.columns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * The header triggered a column sort event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnSort = function (event) {
        var sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this._rows = utils_1.sortRows(this.rows, this.columns, sorts);
        }
        this.sorts = sorts;
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    };
    /**
     * Toggle all row selection
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onHeaderSelect = function (event) {
        // before we splice, chk if we currently have all selected
        var allSelected = this.selected.length === this.rows.length;
        // remove all existing either way
        this.selected = [];
        // do the opposite here
        if (!allSelected) {
            (_a = this.selected).push.apply(_a, this.rows);
        }
        this.select.emit({
            selected: this.selected
        });
        var _a;
    };
    /**
     * A row was selected from body
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onBodySelect = function (event) {
        this.select.emit(event);
    };
    return DatatableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DatatableComponent.prototype, "rows", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DatatableComponent.prototype, "columns", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DatatableComponent.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatatableComponent.prototype, "scrollbarV", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatatableComponent.prototype, "scrollbarH", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "columnMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableComponent.prototype, "headerHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "footerHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatatableComponent.prototype, "externalPaging", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatatableComponent.prototype, "externalSorting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "limit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DatatableComponent.prototype, "count", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "offset", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatatableComponent.prototype, "loadingIndicator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "selectionType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatatableComponent.prototype, "reorderable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableComponent.prototype, "sortType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DatatableComponent.prototype, "sorts", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableComponent.prototype, "cssClasses", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableComponent.prototype, "messages", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], DatatableComponent.prototype, "rowIdentity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableComponent.prototype, "rowClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableComponent.prototype, "selectCheck", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatatableComponent.prototype, "trackByProp", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "scroll", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "sort", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "page", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "reorder", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableComponent.prototype, "resize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DatatableComponent.prototype, "tableContextmenu", void 0);
__decorate([
    core_1.HostBinding('class.fixed-header'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isFixedHeader", null);
__decorate([
    core_1.HostBinding('class.fixed-row'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isFixedRow", null);
__decorate([
    core_1.HostBinding('class.scroll-vertical'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isVertScroll", null);
__decorate([
    core_1.HostBinding('class.scroll-horz'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isHorScroll", null);
__decorate([
    core_1.HostBinding('class.selectable'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isSelectable", null);
__decorate([
    core_1.HostBinding('class.checkbox-selection'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isCheckboxSelection", null);
__decorate([
    core_1.HostBinding('class.cell-selection'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isCellSelection", null);
__decorate([
    core_1.HostBinding('class.single-selection'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isSingleSelection", null);
__decorate([
    core_1.HostBinding('class.multi-selection'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isMultiSelection", null);
__decorate([
    core_1.HostBinding('class.multi-click-selection'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DatatableComponent.prototype, "isMultiClickSelection", null);
__decorate([
    core_1.ContentChildren(columns_1.DataTableColumnDirective),
    __metadata("design:type", core_1.QueryList),
    __metadata("design:paramtypes", [core_1.QueryList])
], DatatableComponent.prototype, "columnTemplates", null);
__decorate([
    core_1.ContentChild(row_detail_1.DatatableRowDetailDirective),
    __metadata("design:type", row_detail_1.DatatableRowDetailDirective)
], DatatableComponent.prototype, "rowDetail", void 0);
__decorate([
    core_1.ContentChild(footer_1.DatatableFooterDirective),
    __metadata("design:type", footer_1.DatatableFooterDirective)
], DatatableComponent.prototype, "footer", void 0);
__decorate([
    core_1.ViewChild(body_1.DataTableBodyComponent),
    __metadata("design:type", body_1.DataTableBodyComponent)
], DatatableComponent.prototype, "bodyComponent", void 0);
__decorate([
    core_1.HostListener('window:resize'),
    utils_1.throttleable(5),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DatatableComponent.prototype, "onWindowResize", null);
DatatableComponent = __decorate([
    core_1.Component({
        selector: 'ngx-datatable',
        template: "\n    <div\n      visibilityObserver\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"innerWidth\"\n        [offsetX]=\"offsetX\"\n        [columns]=\"columns\"\n        [headerHeight]=\"headerHeight\"\n        [reorderable]=\"reorderable\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        [allRowsSelected]=\"allRowsSelected\"\n        [selectionType]=\"selectionType\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\"\n        (select)=\"onHeaderSelect($event)\"\n        (columnContextmenu)=\"onColumnContextmenu($event)\">\n      </datatable-header>\n      <datatable-body\n        [rows]=\"rows\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [externalPaging]=\"externalPaging\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"columns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"offsetX\"\n        [rowDetail]=\"rowDetail\"\n        [selected]=\"selected\"\n        [innerWidth]=\"innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [rowClass]=\"rowClass\"\n        [selectCheck]=\"selectCheck\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (rowContextmenu)=\"onRowContextmenu($event)\"\n        (select)=\"onBodySelect($event)\"\n        (scroll)=\"onBodyScroll($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [footerTemplate]=\"footer\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [selectedCount]=\"selected.length\"\n        [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
        encapsulation: core_1.ViewEncapsulation.None,
        styles: [__webpack_require__("./src/components/datatable.component.scss")],
        host: {
            class: 'ngx-datatable'
        }
    }),
    __metadata("design:paramtypes", [services_1.ScrollbarHelper,
        core_1.ElementRef,
        core_1.KeyValueDiffers])
], DatatableComponent);
exports.DatatableComponent = DatatableComponent;


/***/ }),

/***/ "./src/components/footer/footer-template.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DataTableFooterTemplateDirective = (function () {
    function DataTableFooterTemplateDirective(template) {
        this.template = template;
    }
    return DataTableFooterTemplateDirective;
}());
DataTableFooterTemplateDirective = __decorate([
    core_1.Directive({ selector: '[ngx-datatable-footer-template]' }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], DataTableFooterTemplateDirective);
exports.DataTableFooterTemplateDirective = DataTableFooterTemplateDirective;


/***/ }),

/***/ "./src/components/footer/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DataTableFooterComponent = (function () {
    function DataTableFooterComponent() {
        this.selectedCount = 0;
        this.page = new core_1.EventEmitter();
    }
    Object.defineProperty(DataTableFooterComponent.prototype, "isVisible", {
        get: function () {
            return (this.rowCount / this.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooterComponent.prototype, "curPage", {
        get: function () {
            return this.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    return DataTableFooterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableFooterComponent.prototype, "footerHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableFooterComponent.prototype, "rowCount", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableFooterComponent.prototype, "pageSize", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableFooterComponent.prototype, "offset", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableFooterComponent.prototype, "pagerLeftArrowIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableFooterComponent.prototype, "pagerRightArrowIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableFooterComponent.prototype, "pagerPreviousIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableFooterComponent.prototype, "pagerNextIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableFooterComponent.prototype, "totalMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], DataTableFooterComponent.prototype, "footerTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableFooterComponent.prototype, "selectedCount", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableFooterComponent.prototype, "selectedMessage", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableFooterComponent.prototype, "page", void 0);
DataTableFooterComponent = __decorate([
    core_1.Component({
        selector: 'datatable-footer',
        template: "\n    <div\n      class=\"datatable-footer-inner\"\n      [ngClass]=\"{'selected-count': selectedMessage}\"\n      [style.height.px]=\"footerHeight\">\n      <ng-template\n        *ngIf=\"footerTemplate\"\n        [ngTemplateOutlet]=\"footerTemplate.template\"\n        [ngOutletContext]=\"{ \n          rowCount: rowCount, \n          pageSize: pageSize, \n          selectedCount: selectedCount,\n          curPage: curPage,\n          offset: offset\n        }\">\n      </ng-template>\n      <div class=\"page-count\" *ngIf=\"!footerTemplate\">\n        <span *ngIf=\"selectedMessage\">\n          {{selectedCount.toLocaleString()}} {{selectedMessage}} / \n        </span>\n        {{rowCount.toLocaleString()}} {{totalMessage}}\n      </div>\n      <datatable-pager *ngIf=\"!footerTemplate\"\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n      </datatable-pager>\n    </div>\n  ",
        host: {
            class: 'datatable-footer'
        },
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], DataTableFooterComponent);
exports.DataTableFooterComponent = DataTableFooterComponent;


/***/ }),

/***/ "./src/components/footer/footer.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var footer_template_directive_1 = __webpack_require__("./src/components/footer/footer-template.directive.ts");
var DatatableFooterDirective = (function () {
    function DatatableFooterDirective() {
    }
    return DatatableFooterDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatatableFooterDirective.prototype, "footerHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatatableFooterDirective.prototype, "totalMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableFooterDirective.prototype, "selectedMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatatableFooterDirective.prototype, "pagerLeftArrowIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatatableFooterDirective.prototype, "pagerRightArrowIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatatableFooterDirective.prototype, "pagerPreviousIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatatableFooterDirective.prototype, "pagerNextIcon", void 0);
__decorate([
    core_1.Input(),
    core_1.ContentChild(footer_template_directive_1.DataTableFooterTemplateDirective, { read: core_1.TemplateRef }),
    __metadata("design:type", core_1.TemplateRef)
], DatatableFooterDirective.prototype, "template", void 0);
DatatableFooterDirective = __decorate([
    core_1.Directive({ selector: 'ngx-datatable-footer' })
], DatatableFooterDirective);
exports.DatatableFooterDirective = DatatableFooterDirective;


/***/ }),

/***/ "./src/components/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/footer/footer.component.ts"));
__export(__webpack_require__("./src/components/footer/pager.component.ts"));
__export(__webpack_require__("./src/components/footer/footer.directive.ts"));
__export(__webpack_require__("./src/components/footer/footer-template.directive.ts"));


/***/ }),

/***/ "./src/components/footer/pager.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DataTablePagerComponent = (function () {
    function DataTablePagerComponent() {
        this.change = new core_1.EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    Object.defineProperty(DataTablePagerComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (val) {
            this._size = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagerComponent.prototype.canPrevious = function () {
        return this.page > 1;
    };
    DataTablePagerComponent.prototype.canNext = function () {
        return this.page < this.totalPages;
    };
    DataTablePagerComponent.prototype.prevPage = function () {
        this.selectPage(this.page - 1);
    };
    DataTablePagerComponent.prototype.nextPage = function () {
        this.selectPage(this.page + 1);
    };
    DataTablePagerComponent.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page: page
            });
        }
    };
    DataTablePagerComponent.prototype.calcPages = function (page) {
        var pages = [];
        var startPage = 1;
        var endPage = this.totalPages;
        var maxSize = 5;
        var isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
            endPage = Math.min(startPage + maxSize - 1, this.totalPages);
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    return DataTablePagerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTablePagerComponent.prototype, "size", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTablePagerComponent.prototype, "count", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], DataTablePagerComponent.prototype, "page", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTablePagerComponent.prototype, "change", void 0);
DataTablePagerComponent = __decorate([
    core_1.Component({
        selector: 'datatable-pager',
        template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\">\n          <i class=\"{{pagerPreviousIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\">\n          <i class=\"{{pagerLeftArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li\n        class=\"pages\"\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\">\n          <i class=\"{{pagerRightArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\">\n          <i class=\"{{pagerNextIcon}}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
        host: {
            class: 'datatable-pager'
        },
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], DataTablePagerComponent);
exports.DataTablePagerComponent = DataTablePagerComponent;


/***/ }),

/***/ "./src/components/header/header-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var types_1 = __webpack_require__("./src/types/index.ts");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var events_1 = __webpack_require__("./src/events.ts");
var DataTableHeaderCellComponent = (function () {
    function DataTableHeaderCellComponent() {
        this.sort = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.columnContextmenu = new core_1.EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.sortClass = this.calcSortClass(this.sortDir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            if (this.column.headerClass) {
                if (typeof this.column.headerClass === 'string') {
                    cls += ' ' + this.column.headerClass;
                }
                else if (typeof this.column.headerClass === 'function') {
                    var res = this.column.headerClass({
                        column: this.column
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true)
                                cls += " " + k;
                        }
                    }
                }
            }
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        get: function () {
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.headerTemplate === undefined ? this.column.name : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        get: function () {
            return this.column.checkboxable &&
                this.column.headerCheckboxable &&
                this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCellComponent.prototype.onContextmenu = function ($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    };
    DataTableHeaderCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (sorts && this.column) {
            var sort = sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    };
    DataTableHeaderCellComponent.prototype.onSort = function () {
        if (!this.column.sortable)
            return;
        var newValue = utils_1.nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortClass = function (sortDir) {
        if (sortDir === types_1.SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === types_1.SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    return DataTableHeaderCellComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderCellComponent.prototype, "sortType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableHeaderCellComponent.prototype, "column", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderCellComponent.prototype, "allRowsSelected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
__decorate([
    core_1.HostBinding('style.height.px'),
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableHeaderCellComponent.prototype, "sorts", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableHeaderCellComponent.prototype, "sort", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableHeaderCellComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTableHeaderCellComponent.prototype, "columnContextmenu", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "columnCssClasses", null);
__decorate([
    core_1.HostBinding('attr.title'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "name", null);
__decorate([
    core_1.HostBinding('style.minWidth.px'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "minWidth", null);
__decorate([
    core_1.HostBinding('style.maxWidth.px'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "maxWidth", null);
__decorate([
    core_1.HostBinding('style.width.px'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], DataTableHeaderCellComponent.prototype, "width", null);
__decorate([
    core_1.HostListener('contextmenu', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataTableHeaderCellComponent.prototype, "onContextmenu", null);
DataTableHeaderCellComponent = __decorate([
    core_1.Component({
        selector: 'datatable-header-cell',
        template: "\n    <div>\n      <label\n        *ngIf=\"isCheckboxable\" \n        class=\"datatable-checkbox\">\n        <input \n          type=\"checkbox\"\n          [checked]=\"allRowsSelected\"\n          (change)=\"select.emit(!allRowsSelected)\" \n        />\n      </label>\n      <span \n        *ngIf=\"!column.headerTemplate\"\n        class=\"datatable-header-cell-wrapper\">\n        <span\n          class=\"datatable-header-cell-label draggable\"\n          (click)=\"onSort()\"\n          [innerHTML]=\"name\">\n        </span>\n      </span>\n      <ng-template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ \n          column: column, \n          sortDir: sortDir,\n          sortFn: sortFn,\n          allRowsSelected: allRowsSelected,\n          selectFn: selectFn\n        }\">\n      </ng-template>\n      <span\n        (click)=\"onSort()\"\n        [class]=\"sortClass\">\n      </span>\n    </div>\n  ",
        host: {
            class: 'datatable-header-cell'
        }
    })
], DataTableHeaderCellComponent);
exports.DataTableHeaderCellComponent = DataTableHeaderCellComponent;


/***/ }),

/***/ "./src/components/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var types_1 = __webpack_require__("./src/types/index.ts");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var DataTableHeaderComponent = (function () {
    function DataTableHeaderComponent() {
        this.sort = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.columnContextmenu = new core_1.EventEmitter(false);
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerHeight", {
        get: function () {
            return this._headerHeight;
        },
        set: function (val) {
            if (val !== 'auto') {
                this._headerHeight = val + "px";
            }
            else {
                this._headerHeight = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnsByPin = utils_1.columnsByPinArr(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.onLongPressStart = function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = true;
        this.dragEventTarget = event;
    };
    DataTableHeaderComponent.prototype.onLongPressEnd = function (_a) {
        var event = _a.event, model = _a.model;
        this.dragEventTarget = event;
        // delay resetting so sort can be 
        // prevented if we were dragging
        setTimeout(function () {
            model.dragging = false;
        }, 5);
    };
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableHeaderComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableHeaderComponent.prototype.onColumnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    DataTableHeaderComponent.prototype.onColumnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        // if we are dragging don't sort!
        if (column.dragging)
            return;
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        });
    };
    DataTableHeaderComponent.prototype.calcNewSorts = function (column, prevValue, newValue) {
        var idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        var sorts = this.sorts.map(function (s, i) {
            s = __assign({}, s);
            if (s.prop === column.prop)
                idx = i;
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === types_1.SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            utils_1.translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    return DataTableHeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderComponent.prototype, "innerWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderComponent.prototype, "offsetX", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DataTableHeaderComponent.prototype, "sorts", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderComponent.prototype, "sortType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DataTableHeaderComponent.prototype, "selectionType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DataTableHeaderComponent.prototype, "reorderable", void 0);
__decorate([
    core_1.HostBinding('style.height'),
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DataTableHeaderComponent.prototype, "headerHeight", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DataTableHeaderComponent.prototype, "columns", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableHeaderComponent.prototype, "sort", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableHeaderComponent.prototype, "reorder", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableHeaderComponent.prototype, "resize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DataTableHeaderComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataTableHeaderComponent.prototype, "columnContextmenu", void 0);
__decorate([
    core_1.HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DataTableHeaderComponent.prototype, "headerWidth", null);
DataTableHeaderComponent = __decorate([
    core_1.Component({
        selector: 'datatable-header',
        template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      [style.width.px]=\"columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"stylesByGroup(colGroup.type)\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          [pressEnabled]=\"reorderable && column.draggable\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          [allRowsSelected]=\"allRowsSelected\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\"\n          (columnContextmenu)=\"columnContextmenu.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
        host: {
            class: 'datatable-header'
        }
    })
], DataTableHeaderComponent);
exports.DataTableHeaderComponent = DataTableHeaderComponent;


/***/ }),

/***/ "./src/components/header/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/header/header.component.ts"));
__export(__webpack_require__("./src/components/header/header-cell.component.ts"));


/***/ }),

/***/ "./src/components/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/datatable.component.ts"));
__export(__webpack_require__("./src/components/header/index.ts"));
__export(__webpack_require__("./src/components/body/index.ts"));
__export(__webpack_require__("./src/components/footer/index.ts"));
__export(__webpack_require__("./src/components/columns/index.ts"));
__export(__webpack_require__("./src/components/row-detail/index.ts"));


/***/ }),

/***/ "./src/components/row-detail/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/components/row-detail/row-detail.directive.ts"));
__export(__webpack_require__("./src/components/row-detail/row-detail-template.directive.ts"));


/***/ }),

/***/ "./src/components/row-detail/row-detail-template.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DatatableRowDetailTemplateDirective = (function () {
    function DatatableRowDetailTemplateDirective(template) {
        this.template = template;
    }
    return DatatableRowDetailTemplateDirective;
}());
DatatableRowDetailTemplateDirective = __decorate([
    core_1.Directive({
        selector: '[ngx-datatable-row-detail-template]'
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], DatatableRowDetailTemplateDirective);
exports.DatatableRowDetailTemplateDirective = DatatableRowDetailTemplateDirective;


/***/ }),

/***/ "./src/components/row-detail/row-detail.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var row_detail_template_directive_1 = __webpack_require__("./src/components/row-detail/row-detail-template.directive.ts");
var DatatableRowDetailDirective = (function () {
    function DatatableRowDetailDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         *
         * @type {number|function(row?:any,index?:number): number}
         * @memberOf DatatableComponent
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.toggle = new core_1.EventEmitter();
    }
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DatatableRowDetailDirective.prototype.toggleExpandRow = function (row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    };
    /**
     * API method to expand all the rows.
     *
     * @memberOf DatatableComponent
     */
    DatatableRowDetailDirective.prototype.expandAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the rows.
     *
     * @memberOf DatatableComponent
     */
    DatatableRowDetailDirective.prototype.collapseAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    return DatatableRowDetailDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatatableRowDetailDirective.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input(),
    core_1.ContentChild(row_detail_template_directive_1.DatatableRowDetailTemplateDirective, { read: core_1.TemplateRef }),
    __metadata("design:type", core_1.TemplateRef)
], DatatableRowDetailDirective.prototype, "template", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatatableRowDetailDirective.prototype, "toggle", void 0);
DatatableRowDetailDirective = __decorate([
    core_1.Directive({ selector: 'ngx-datatable-row-detail' })
], DatatableRowDetailDirective);
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;


/***/ }),

/***/ "./src/datatable.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
__webpack_require__("./node_modules/rxjs/add/observable/fromEvent.js");
var components_1 = __webpack_require__("./src/components/index.ts");
var directives_1 = __webpack_require__("./src/directives/index.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var NgxDatatableModule = (function () {
    function NgxDatatableModule() {
    }
    return NgxDatatableModule;
}());
NgxDatatableModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        providers: [
            services_1.ScrollbarHelper
        ],
        declarations: [
            components_1.DataTableFooterTemplateDirective,
            directives_1.VisibilityDirective,
            directives_1.DraggableDirective,
            directives_1.ResizeableDirective,
            directives_1.OrderableDirective,
            directives_1.LongPressDirective,
            components_1.ScrollerComponent,
            components_1.DatatableComponent,
            components_1.DataTableColumnDirective,
            components_1.DataTableHeaderComponent,
            components_1.DataTableHeaderCellComponent,
            components_1.DataTableBodyComponent,
            components_1.DataTableFooterComponent,
            components_1.DataTablePagerComponent,
            components_1.ProgressBarComponent,
            components_1.DataTableBodyRowComponent,
            components_1.DataTableRowWrapperComponent,
            components_1.DatatableRowDetailDirective,
            components_1.DatatableRowDetailTemplateDirective,
            components_1.DataTableBodyCellComponent,
            components_1.DataTableSelectionComponent,
            components_1.DataTableColumnHeaderDirective,
            components_1.DataTableColumnCellDirective,
            components_1.DatatableFooterDirective
        ],
        exports: [
            components_1.DatatableComponent,
            components_1.DatatableRowDetailDirective,
            components_1.DatatableRowDetailTemplateDirective,
            components_1.DataTableColumnDirective,
            components_1.DataTableColumnHeaderDirective,
            components_1.DataTableColumnCellDirective,
            components_1.DataTableFooterTemplateDirective,
            components_1.DatatableFooterDirective,
            components_1.DataTablePagerComponent
        ]
    })
], NgxDatatableModule);
exports.NgxDatatableModule = NgxDatatableModule;


/***/ }),

/***/ "./src/directives/draggable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
__webpack_require__("./node_modules/rxjs/add/operator/takeUntil.js");
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
var DraggableDirective = (function () {
    function DraggableDirective(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new core_1.EventEmitter();
        this.dragging = new core_1.EventEmitter();
        this.dragEnd = new core_1.EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    DraggableDirective.prototype.ngOnChanges = function (changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    };
    DraggableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    DraggableDirective.prototype.onMouseup = function (event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        // we only want to drag the inner header text
        var isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            var mouseup = Observable_1.Observable.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(ev); });
            var mouseMoveSub = Observable_1.Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.move = function (event, mouseDownPos) {
        if (!this.isDragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        this.element.classList.add('dragging');
        this.dragging.emit({
            event: event,
            element: this.element,
            model: this.dragModel
        });
    };
    DraggableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    return DraggableDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DraggableDirective.prototype, "dragEventTarget", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DraggableDirective.prototype, "dragModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DraggableDirective.prototype, "dragX", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DraggableDirective.prototype, "dragY", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DraggableDirective.prototype, "dragStart", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DraggableDirective.prototype, "dragging", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DraggableDirective.prototype, "dragEnd", void 0);
DraggableDirective = __decorate([
    core_1.Directive({ selector: '[draggable]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DraggableDirective);
exports.DraggableDirective = DraggableDirective;


/***/ }),

/***/ "./src/directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/directives/draggable.directive.ts"));
__export(__webpack_require__("./src/directives/long-press.directive.ts"));
__export(__webpack_require__("./src/directives/orderable.directive.ts"));
__export(__webpack_require__("./src/directives/resizeable.directive.ts"));
__export(__webpack_require__("./src/directives/visibility.directive.ts"));


/***/ }),

/***/ "./src/directives/long-press.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
__webpack_require__("./node_modules/rxjs/add/operator/takeUntil.js");
var events_1 = __webpack_require__("./src/events.ts");
var LongPressDirective = (function () {
    function LongPressDirective() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new core_1.EventEmitter();
        this.longPressing = new core_1.EventEmitter();
        this.longPressEnd = new core_1.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPressDirective.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressDirective.prototype, "isLongPress", {
        get: function () {
            return this.isLongPressing;
        },
        enumerable: true,
        configurable: true
    });
    LongPressDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        var target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        var mouseup = Observable_1.Observable.fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe(function (ev) { return _this.onMouseup(); });
        this.timeout = setTimeout(function () {
            _this.isLongPressing = true;
            _this.longPressStart.emit({
                event: event,
                model: _this.pressModel
            });
            _this.subscription.add(Observable_1.Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe(function (mouseEvent) { return _this.onMouseMove(mouseEvent); }));
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPressDirective.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.isLongPressing) {
            var xThres = Math.abs(event.clientX - this.mouseX) > 10;
            var yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPressDirective.prototype.loop = function (event) {
        var _this = this;
        if (this.isLongPressing) {
            this.timeout = setTimeout(function () {
                _this.longPressing.emit({
                    event: event,
                    model: _this.pressModel
                });
                _this.loop(event);
            }, 50);
        }
    };
    LongPressDirective.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    };
    LongPressDirective.prototype.onMouseup = function () {
        this.endPress();
    };
    LongPressDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    LongPressDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    return LongPressDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LongPressDirective.prototype, "pressEnabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LongPressDirective.prototype, "pressModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], LongPressDirective.prototype, "duration", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LongPressDirective.prototype, "longPressStart", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LongPressDirective.prototype, "longPressing", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LongPressDirective.prototype, "longPressEnd", void 0);
__decorate([
    core_1.HostBinding('class.press'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], LongPressDirective.prototype, "press", null);
__decorate([
    core_1.HostBinding('class.longpress'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], LongPressDirective.prototype, "isLongPress", null);
__decorate([
    core_1.HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LongPressDirective.prototype, "onMouseDown", null);
LongPressDirective = __decorate([
    core_1.Directive({ selector: '[long-press]' })
], LongPressDirective);
exports.LongPressDirective = LongPressDirective;


/***/ }),

/***/ "./src/directives/orderable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var draggable_directive_1 = __webpack_require__("./src/directives/draggable.directive.ts");
var platform_browser_1 = __webpack_require__(1);
var OrderableDirective = (function () {
    function OrderableDirective(differs, document) {
        this.document = document;
        this.reorder = new core_1.EventEmitter();
        this.differ = differs.find({}).create(null);
    }
    OrderableDirective.prototype.ngAfterContentInit = function () {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    };
    OrderableDirective.prototype.ngOnDestroy = function () {
        this.draggables.forEach(function (d) {
            d.dragStart.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    };
    OrderableDirective.prototype.updateSubscriptions = function () {
        var _this = this;
        var diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            var subscribe = function (_a) {
                var currentValue = _a.currentValue, previousValue = _a.previousValue;
                unsubscribe_1({ previousValue: previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(_this.onDragStart.bind(_this));
                    currentValue.dragEnd.subscribe(_this.onDragEnd.bind(_this));
                }
            };
            var unsubscribe_1 = function (_a) {
                var previousValue = _a.previousValue;
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            };
            diffs.forEachAddedItem(subscribe.bind(this));
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe_1.bind(this));
        }
    };
    OrderableDirective.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.draggables.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            var left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left: left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    };
    OrderableDirective.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        var prevPos = this.positions[model.prop];
        var target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model: model
            });
        }
        element.style.left = 'auto';
    };
    OrderableDirective.prototype.isTarget = function (model, event) {
        var i = 0;
        var x = event.x || event.clientX;
        var y = event.y || event.clientY;
        var targets = this.document.elementsFromPoint(x, y);
        var _loop_1 = function (prop) {
            // current column position which throws event.
            var pos = this_1.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find(function (el) { return el === pos.element; })) {
                return { value: {
                        pos: pos,
                        i: i
                    } };
            }
            i++;
        };
        var this_1 = this;
        for (var prop in this.positions) {
            var state_1 = _loop_1(prop);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    OrderableDirective.prototype.createMapDiffs = function () {
        return this.draggables.toArray()
            .reduce(function (acc, curr) {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }, {});
    };
    return OrderableDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], OrderableDirective.prototype, "reorder", void 0);
__decorate([
    core_1.ContentChildren(draggable_directive_1.DraggableDirective, { descendants: true }),
    __metadata("design:type", core_1.QueryList)
], OrderableDirective.prototype, "draggables", void 0);
OrderableDirective = __decorate([
    core_1.Directive({ selector: '[orderable]' }),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [core_1.KeyValueDiffers, Object])
], OrderableDirective);
exports.OrderableDirective = OrderableDirective;


/***/ }),

/***/ "./src/directives/resizeable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var events_1 = __webpack_require__("./src/events.ts");
__webpack_require__("./node_modules/rxjs/add/operator/takeUntil.js");
var ResizeableDirective = (function () {
    function ResizeableDirective(element) {
        this.resizeEnabled = true;
        this.resize = new core_1.EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ResizeableDirective.prototype.ngAfterViewInit = function () {
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    };
    ResizeableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    ResizeableDirective.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    };
    ResizeableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = (event.target).classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            var mouseup = Observable_1.Observable.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(); });
            var mouseMoveSub = Observable_1.Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
            this.subscription.add(mouseMoveSub);
        }
    };
    ResizeableDirective.prototype.move = function (event, initialWidth, mouseDownScreenX) {
        var movementX = event.screenX - mouseDownScreenX;
        var newWidth = initialWidth + movementX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    ResizeableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    return ResizeableDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ResizeableDirective.prototype, "resizeEnabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ResizeableDirective.prototype, "minWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ResizeableDirective.prototype, "maxWidth", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ResizeableDirective.prototype, "resize", void 0);
__decorate([
    core_1.HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResizeableDirective.prototype, "onMousedown", null);
ResizeableDirective = __decorate([
    core_1.Directive({
        selector: '[resizeable]',
        host: {
            '[class.resizeable]': 'resizeEnabled'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ResizeableDirective);
exports.ResizeableDirective = ResizeableDirective;


/***/ }),

/***/ "./src/directives/visibility.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var VisibilityDirective = (function () {
    function VisibilityDirective(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
    }
    VisibilityDirective.prototype.ngOnInit = function () {
        this.runCheck();
    };
    VisibilityDirective.prototype.ngOnDestroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityDirective.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityDirective.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 50);
                });
            }
        };
        setTimeout(function () { return check(); });
    };
    return VisibilityDirective;
}());
__decorate([
    core_1.HostBinding('class.visible'),
    __metadata("design:type", Boolean)
], VisibilityDirective.prototype, "isVisible", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], VisibilityDirective.prototype, "visible", void 0);
VisibilityDirective = __decorate([
    core_1.Directive({ selector: '[visibilityObserver]' }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
], VisibilityDirective);
exports.VisibilityDirective = VisibilityDirective;


/***/ }),

/***/ "./src/events.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseEvent = global.MouseEvent;
exports.KeyboardEvent = global.KeyboardEvent;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/datatable.module.ts"));
__export(__webpack_require__("./src/types/index.ts"));
__export(__webpack_require__("./src/components/index.ts"));


/***/ }),

/***/ "./src/services/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/services/scrollbar-helper.service.ts"));


/***/ }),

/***/ "./src/services/scrollbar-helper.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(1);
/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 *
 * @export
 * @class ScrollbarHelper
 */
var ScrollbarHelper = (function () {
    function ScrollbarHelper(document) {
        this.document = document;
        this.width = this.getWidth();
    }
    ScrollbarHelper.prototype.getWidth = function () {
        var outer = this.document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';
        this.document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        var inner = this.document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    return ScrollbarHelper;
}());
ScrollbarHelper = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], ScrollbarHelper);
exports.ScrollbarHelper = ScrollbarHelper;


/***/ }),

/***/ "./src/types/click.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClickType;
(function (ClickType) {
    ClickType[ClickType["single"] = 'single'] = "single";
    ClickType[ClickType["double"] = 'double'] = "double";
})(ClickType = exports.ClickType || (exports.ClickType = {}));


/***/ }),

/***/ "./src/types/column-mode.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColumnMode;
(function (ColumnMode) {
    ColumnMode[ColumnMode["standard"] = 'standard'] = "standard";
    ColumnMode[ColumnMode["flex"] = 'flex'] = "flex";
    ColumnMode[ColumnMode["force"] = 'force'] = "force";
})(ColumnMode = exports.ColumnMode || (exports.ColumnMode = {}));


/***/ }),

/***/ "./src/types/contextmenu.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContextmenuType;
(function (ContextmenuType) {
    ContextmenuType[ContextmenuType["header"] = 'header'] = "header";
    ContextmenuType[ContextmenuType["body"] = 'body'] = "body";
})(ContextmenuType = exports.ContextmenuType || (exports.ContextmenuType = {}));


/***/ }),

/***/ "./src/types/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/types/column-mode.type.ts"));
__export(__webpack_require__("./src/types/sort.type.ts"));
__export(__webpack_require__("./src/types/sort-direction.type.ts"));
__export(__webpack_require__("./src/types/selection.type.ts"));
__export(__webpack_require__("./src/types/click.type.ts"));
__export(__webpack_require__("./src/types/contextmenu.type.ts"));


/***/ }),

/***/ "./src/types/selection.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectionType;
(function (SelectionType) {
    SelectionType[SelectionType["single"] = 'single'] = "single";
    SelectionType[SelectionType["multi"] = 'multi'] = "multi";
    SelectionType[SelectionType["multiClick"] = 'multiClick'] = "multiClick";
    SelectionType[SelectionType["cell"] = 'cell'] = "cell";
    SelectionType[SelectionType["checkbox"] = 'checkbox'] = "checkbox";
})(SelectionType = exports.SelectionType || (exports.SelectionType = {}));


/***/ }),

/***/ "./src/types/sort-direction.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["asc"] = 'asc'] = "asc";
    SortDirection[SortDirection["desc"] = 'desc'] = "desc";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));


/***/ }),

/***/ "./src/types/sort.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortType;
(function (SortType) {
    SortType[SortType["single"] = 'single'] = "single";
    SortType[SortType["multi"] = 'multi'] = "multi";
})(SortType = exports.SortType || (exports.SortType = {}));


/***/ }),

/***/ "./src/utils/camel-case.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 * @param  {string} str
 * @return {string} camel case string
 */
function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
exports.camelCase = camelCase;
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 *
 * @export
 * @param {any} str
 * @returns string
 */
function deCamelCase(str) {
    return str
        .replace(/([A-Z])/g, function (match) { return " " + match; })
        .replace(/^./, function (match) { return match.toUpperCase(); });
}
exports.deCamelCase = deCamelCase;


/***/ }),

/***/ "./src/utils/column-helper.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
var id_1 = __webpack_require__("./src/utils/id.ts");
var column_prop_getters_1 = __webpack_require__("./src/utils/column-prop-getters.ts");
/**
 * Sets the column defaults
 *
 * @export
 * @param {any[]} columns
 * @returns
 */
function setColumnDefaults(columns) {
    if (!columns)
        return;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        if (!column.$$id) {
            column.$$id = id_1.id();
        }
        // prop can be numeric; zero is valid not a missing prop
        // translate name => prop
        if (column.prop == null && column.name) {
            column.prop = camel_case_1.camelCase(column.name);
        }
        if (!column.$$valueGetter) {
            column.$$valueGetter = column_prop_getters_1.getterForProp(column.prop);
        }
        // format props if no name passed
        if (column.prop != null && !column.name) {
            column.name = camel_case_1.deCamelCase(String(column.prop));
        }
        if (!column.hasOwnProperty('resizeable')) {
            column.resizeable = true;
        }
        if (!column.hasOwnProperty('sortable')) {
            column.sortable = true;
        }
        if (!column.hasOwnProperty('draggable')) {
            column.draggable = true;
        }
        if (!column.hasOwnProperty('canAutoResize')) {
            column.canAutoResize = true;
        }
        if (!column.hasOwnProperty('width')) {
            column.width = 150;
        }
    }
}
exports.setColumnDefaults = setColumnDefaults;
/**
 * Translates templates definitions to objects
 *
 * @export
 * @param {DataTableColumnDirective[]} templates
 * @returns {any[]}
 */
function translateTemplates(templates) {
    var result = [];
    for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
        var temp = templates_1[_i];
        var col = {};
        var props = Object.getOwnPropertyNames(temp);
        for (var _a = 0, props_1 = props; _a < props_1.length; _a++) {
            var prop = props_1[_a];
            col[prop] = temp[prop];
        }
        if (temp.headerTemplate) {
            col.headerTemplate = temp.headerTemplate;
        }
        if (temp.cellTemplate) {
            col.cellTemplate = temp.cellTemplate;
        }
        result.push(col);
    }
    return result;
}
exports.translateTemplates = translateTemplates;


/***/ }),

/***/ "./src/utils/column-prop-getters.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// maybe rename this file to prop-getters.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Always returns the empty string ''
 * @returns {string}
 */
function emptyStringGetter() {
    return '';
}
exports.emptyStringGetter = emptyStringGetter;
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
function getterForProp(prop) {
    if (prop == null)
        return emptyStringGetter;
    if (typeof prop === 'number') {
        return numericIndexGetter;
    }
    else {
        // deep or simple
        if (prop.indexOf('.') !== -1) {
            return deepValueGetter;
        }
        else {
            return shallowValueGetter;
        }
    }
}
exports.getterForProp = getterForProp;
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
function numericIndexGetter(row, index) {
    // mimic behavior of deepValueGetter
    if (!row || index == null)
        return row;
    var value = row[index];
    if (value == null)
        return '';
    return value;
}
exports.numericIndexGetter = numericIndexGetter;
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {any}
 */
function shallowValueGetter(obj, fieldName) {
    if (!obj || !fieldName)
        return obj;
    var value = obj[fieldName];
    if (value == null)
        return '';
    return value;
}
exports.shallowValueGetter = shallowValueGetter;
/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (!obj || !path)
        return obj;
    // check if path matches a root-level field
    // { "a.b.c": 123 }
    var current = obj[path];
    if (current !== undefined)
        return current;
    current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0; i < split.length; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null)
                return '';
        }
    }
    return current;
}
exports.deepValueGetter = deepValueGetter;


/***/ }),

/***/ "./src/utils/column.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the columns by pin.
 * @param {array} cols
 */
function columnsByPin(cols) {
    var ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (col.frozenLeft) {
                ret.left.push(col);
            }
            else if (col.frozenRight) {
                ret.right.push(col);
            }
            else {
                ret.center.push(col);
            }
        }
    }
    return ret;
}
exports.columnsByPin = columnsByPin;
/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: columnTotalWidth(all)
    };
}
exports.columnGroupWidths = columnGroupWidths;
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} prop width to get
 */
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    if (columns) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var c = columns_1[_i];
            var has = prop && c[prop];
            var width = has ? c[prop] : c.width;
            totalWidth = totalWidth + parseFloat(width);
        }
    }
    return totalWidth;
}
exports.columnTotalWidth = columnTotalWidth;
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} property width to get
 */
function columnsTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var column = columns_2[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
exports.columnsTotalWidth = columnsTotalWidth;
function columnsByPinArr(val) {
    var colsByPinArr = [];
    var colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}
exports.columnsByPinArr = columnsByPinArr;


/***/ }),

/***/ "./src/utils/elm-from-point.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
if (document !== undefined && !document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
}
/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 *
 * @export
 * @param {any} x
 * @param {any} y
 * @returns
 */
function elementsFromPoint(x, y) {
    var elements = [];
    var previousPointerEvents = [];
    var current; // TODO: window.getComputedStyle should be used with inferred type (Element)
    var i;
    var d;
    //if (document === undefined) return elements;
    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }
    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; d = previousPointerEvents[--i];) {
        elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
    }
    // return our results
    return elements;
}
exports.elementsFromPoint = elementsFromPoint;
/*tslint:enable*/


/***/ }),

/***/ "./src/utils/id.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
exports.id = id;


/***/ }),

/***/ "./src/utils/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/utils/id.ts"));
__export(__webpack_require__("./src/utils/column.ts"));
__export(__webpack_require__("./src/utils/column-prop-getters.ts"));
__export(__webpack_require__("./src/utils/camel-case.ts"));
__export(__webpack_require__("./src/utils/keys.ts"));
__export(__webpack_require__("./src/utils/math.ts"));
__export(__webpack_require__("./src/utils/prefixes.ts"));
__export(__webpack_require__("./src/utils/selection.ts"));
__export(__webpack_require__("./src/utils/translate.ts"));
__export(__webpack_require__("./src/utils/throttle.ts"));
__export(__webpack_require__("./src/utils/sort.ts"));
__export(__webpack_require__("./src/utils/row-height-cache.ts"));
__export(__webpack_require__("./src/utils/column-helper.ts"));
__export(__webpack_require__("./src/utils/elm-from-point.ts"));


/***/ }),

/***/ "./src/utils/keys.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
})(Keys = exports.Keys || (exports.Keys = {}));


/***/ }),

/***/ "./src/utils/math.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var column_1 = __webpack_require__("./src/utils/column.ts");
/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var c = columns_1[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
exports.getTotalFlexGrow = getTotalFlexGrow;
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = column_1.columnsTotalWidth(allColumns);
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    var colsByGroup = column_1.columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
exports.adjustColumnWidths = adjustColumnWidths;
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {array} colsByGroup
 * @param {int} maxWidth
 * @param {int} totalFlexGrow
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow;
            }
            else {
                column.width = 0;
            }
        }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                var column = _c[_b];
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 *
 * @param {array} allColumns
 * @param {int} expectedWidth
 * @param {int} startIdx
 * @param {boolean} allowBleed
 * @param {int} defaultColWidth
 */
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var columnsToResize = allColumns
        .slice(startIdx + 1, allColumns.length)
        .filter(function (c) {
        return c.canAutoResize !== false;
    });
    for (var _i = 0, columnsToResize_1 = columnsToResize; _i < columnsToResize_1.length; _i++) {
        var column = columnsToResize_1[_i];
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
    }
    var additionWidthPerColumn = 0;
    var exceedsWindow = false;
    var contentWidth = getContentWidth(allColumns, defaultColWidth);
    var remainingWidth = expectedWidth - contentWidth;
    var columnsProcessed = [];
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        for (var _a = 0, columnsToResize_2 = columnsToResize; _a < columnsToResize_2.length; _a++) {
            var column = columnsToResize_2[_a];
            if (exceedsWindow && allowBleed) {
                column.width = column.$$oldWidth || column.width || defaultColWidth;
            }
            else {
                var newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                if (column.minWidth && newSize < column.minWidth) {
                    column.width = column.minWidth;
                    columnsProcessed.push(column);
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                    columnsProcessed.push(column);
                }
                else {
                    column.width = newSize;
                }
            }
            column.width = Math.max(0, column.width);
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > 0 && columnsToResize.length !== 0);
}
exports.forceFillColumnWidths = forceFillColumnWidths;
/**
 * Remove the processed columns from the current active columns.
 *
 * @param columnsToResize  Array containing the columns that need to be resized.
 * @param columnsProcessed Array containing the columns that have already been processed.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    for (var _i = 0, columnsProcessed_1 = columnsProcessed; _i < columnsProcessed_1.length; _i++) {
        var column = columnsProcessed_1[_i];
        var index = columnsToResize.indexOf(column);
        columnsToResize.splice(index, 1);
    }
}
/**
 * Gets the width of the columns
 *
 * @param {array} allColumns
 * @param {number} [defaultColWidth=300]
 * @returns {number}
 */
function getContentWidth(allColumns, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var contentWidth = 0;
    for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
        var column = allColumns_1[_i];
        contentWidth += (column.width || defaultColWidth);
    }
    return contentWidth;
}


/***/ }),

/***/ "./src/utils/prefixes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
var cache = {};
var testStyle = document !== undefined ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = (function () {
    var styles = window !== undefined ? window.getComputedStyle(document.documentElement, '') : undefined;
    var pre = styles !== undefined ? (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1] : undefined;
    var dom = pre !== undefined ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom ? {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    } : undefined;
})();
function getVendorPrefixedName(property) {
    var name = camel_case_1.camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}
exports.getVendorPrefixedName = getVendorPrefixedName;


/***/ }),

/***/ "./src/utils/row-height-cache.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var RowHeightCache = (function () {
    function RowHeightCache() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        this.treeArray = [];
    }
    /**
     * Clear the Tree array.
     */
    RowHeightCache.prototype.clearCache = function () {
        this.treeArray = [];
    };
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    RowHeightCache.prototype.initCache = function (details) {
        var rows = details.rows, rowHeight = details.rowHeight, detailRowHeight = details.detailRowHeight, externalVirtual = details.externalVirtual, rowCount = details.rowCount;
        var isFn = typeof rowHeight === 'function';
        var isDetailFn = typeof detailRowHeight === 'function';
        if (!isFn && isNaN(rowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number or function value: (" + rowHeight + ") when 'scrollbarV' is enabled.");
        }
        // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
        if (!isDetailFn && isNaN(detailRowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a\n        valid number or function value: (" + detailRowHeight + ") when 'scrollbarV' is enabled.");
        }
        var n = externalVirtual ? rowCount : rows.length;
        this.treeArray = new Array(n);
        for (var i = 0; i < n; ++i) {
            this.treeArray[i] = 0;
        }
        for (var i = 0; i < n; ++i) {
            var row = rows[i];
            var currentRowHeight = rowHeight;
            if (isFn) {
                currentRowHeight = rowHeight(row);
            }
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            if (row && row.$$expanded === 1) {
                if (isDetailFn) {
                    currentRowHeight += detailRowHeight(row, row.$$index);
                }
                else {
                    currentRowHeight += detailRowHeight;
                }
            }
            this.update(i, currentRowHeight);
        }
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     *
     * @param scrollY - The scrollY position.
     * @returns {number} - Index representing the first row visible in the viewport
     */
    RowHeightCache.prototype.getRowIndex = function (scrollY) {
        if (scrollY === 0)
            return 0;
        return this.calcRowIndex(scrollY);
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     *
     *
     * @param atRowIndex Update the data at this index row in the grid.
     * @param byRowHeight Update by the rowHeight provided.
     */
    RowHeightCache.prototype.update = function (atRowIndex, byRowHeight) {
        if (!this.treeArray.length) {
            throw new Error("Update at index " + atRowIndex + " with value " + byRowHeight + " failed:\n        Row Height cache not initialized.");
        }
        var n = this.treeArray.length;
        atRowIndex |= 0;
        while (atRowIndex < n) {
            this.treeArray[atRowIndex] += byRowHeight;
            atRowIndex |= (atRowIndex + 1);
        }
    };
    /**
     * Range Sum query from 1 to the rowIndex
     *
     * @param atIndex The row index until which the total height needs to be obtained.
     * @returns {number} The total height from row 1 to the rowIndex.
     */
    RowHeightCache.prototype.query = function (atIndex) {
        if (!this.treeArray.length) {
            throw new Error("query at index " + atIndex + " failed: Fenwick tree array not initialized.");
        }
        var sum = 0;
        atIndex |= 0;
        while (atIndex >= 0) {
            sum += this.treeArray[atIndex];
            atIndex = (atIndex & (atIndex + 1)) - 1;
        }
        return sum;
    };
    /**
     * Find the total height between 2 row indexes
     * @param atIndexA The row index from
     * @param atIndexB The row index to
     * @returns {number} total pixel height between 2 row indexes.
     */
    RowHeightCache.prototype.queryBetween = function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     *
     * @param sum - The scrollY position.
     * @returns {number} - Index representing the first row visible in the viewport
     */
    RowHeightCache.prototype.calcRowIndex = function (sum) {
        if (!this.treeArray.length)
            return 0;
        var pos = -1;
        var dataLength = this.treeArray.length;
        // Get the highest bit for the block size.
        var highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        for (var blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
            var nextPos = pos + blockSize;
            if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
                sum -= this.treeArray[nextPos];
                pos = nextPos;
            }
        }
        return pos + 1;
    };
    return RowHeightCache;
}());
exports.RowHeightCache = RowHeightCache;


/***/ }),

/***/ "./src/utils/selection.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function selectRows(selected, row, comparefn) {
    var selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
exports.selectRows = selectRows;
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    var reverse = index < prevIndex;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;


/***/ }),

/***/ "./src/utils/sort.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__("./src/types/index.ts");
var column_prop_getters_1 = __webpack_require__("./src/utils/column-prop-getters.ts");
/**
 * Gets the next sort direction
 * @param  {SortType}      sortType
 * @param  {SortDirection} currentSort
 * @return {SortDirection}
 */
function nextSortDir(sortType, current) {
    if (sortType === types_1.SortType.single) {
        if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else {
            return types_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return types_1.SortDirection.asc;
        }
        else if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else if (current === types_1.SortDirection.desc) {
            return undefined;
        }
    }
}
exports.nextSortDir = nextSortDir;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 * @param  {any}    a
 * @param  {any}    b
 * @return {number} position
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
exports.orderByComparator = orderByComparator;
/**
 * Sorts the rows
 *
 * @export
 * @param {any[]} rows
 * @param {any[]} columns
 * @param {any[]} dirs
 * @returns
 */
function sortRows(rows, columns, dirs) {
    if (!rows || !dirs || !dirs.length || !columns)
        return rows;
    var temp = rows.slice();
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    var cachedDirs = dirs.map(function (dir) {
        var prop = dir.prop;
        return {
            prop: prop,
            dir: dir.dir,
            valueGetter: column_prop_getters_1.getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    });
    return temp.sort(function (a, b) {
        for (var _i = 0, cachedDirs_1 = cachedDirs; _i < cachedDirs_1.length; _i++) {
            var cachedDir = cachedDirs_1[_i];
            var prop = cachedDir.prop, valueGetter = cachedDir.valueGetter;
            var propA = valueGetter(a, prop);
            var propB = valueGetter(b, prop);
            var comparison = cachedDir.dir !== types_1.SortDirection.desc ?
                cachedDir.compareFn(propA, propB) :
                -cachedDir.compareFn(propA, propB);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        // equal each other
        return 0;
    });
}
exports.sortRows = sortRows;


/***/ }),

/***/ "./src/utils/throttle.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Throttle a function
 *
 * @export
 * @param {*} func
 * @param {number} wait
 * @param {*} [options]
 * @returns
 */
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
exports.throttle = throttle;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
exports.throttleable = throttleable;


/***/ }),

/***/ "./src/utils/translate.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var prefixes_1 = __webpack_require__("./src/utils/prefixes.ts");
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
// browser detection and prefixing tools
var transform = prefixes_1.getVendorPrefixedName('transform');
var backfaceVisibility = prefixes_1.getVendorPrefixedName('backfaceVisibility');
var hasCSSTransforms = !!prefixes_1.getVendorPrefixedName('transform');
var hasCSS3DTransforms = !!prefixes_1.getVendorPrefixedName('perspective');
var ua = window ? window.navigator.userAgent : "Chrome";
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camel_case_1.camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}
exports.translateXY = translateXY;


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(18),
  Html4Entities: __webpack_require__(17),
  Html5Entities: __webpack_require__(3),
  AllHtmlEntities: __webpack_require__(3)
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(21);
exports.encode = exports.stringify = __webpack_require__(22);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(15)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};
for (var key in styles) {
  clientOverlay.style[key] = styles[key];
}

var ansiHTML = __webpack_require__(14);
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
ansiHTML.setColors(colors);

var Entities = __webpack_require__(16).AllHtmlEntities;
var entities = new Entities();

exports.showProblems =
function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
};

exports.clear =
function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
};

var problemColors = {
  errors: colors.red,
  warnings: colors.yellow
};

function problemType (type) {
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
      type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}

var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = { ignoreUnaccepted: true };

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == "idle") {
    if (options.log) console.log("[HMR] Checking for updates on the server...");
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if(!updatedModules) {
        if (options.warn) {
          console.warn("[HMR] Cannot find update (Full reload needed)");
          console.warn("[HMR] (Probably because of restarting the server)");
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }

    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
        result.then(function(updatedModules) {
            cb(null, updatedModules);
        });
        result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if(unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
          "(Full reload needed)\n" +
          "This is usually because the modules which have changed " +
          "(and their parents) do not know how to hot reload themselves. " +
          "See " + hmrDocsUrl + " for more details."
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn("[HMR]  - " + moduleMap[moduleId]);
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if(!renewedModules || renewedModules.length === 0) {
        console.log("[HMR] Nothing hot updated.");
      } else {
        console.log("[HMR] Updated modules:");
        renewedModules.forEach(function(moduleId) {
          console.log("[HMR]  - " + moduleMap[moduleId]);
        });
      }

      if (upToDate()) {
        console.log("[HMR] App is up to date.");
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn("[HMR] Cannot check for update (Full reload needed)");
        console.warn("[HMR] " + err.stack || err.message);
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn("[HMR] Update check failed: " + err.stack || err.message);
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn("[HMR] Reloading page");
      window.location.reload();
    }
  }
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(189);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(190);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(191);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(195);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(196);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(206);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(207);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(208);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(209);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(210);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(211);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(212);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(213);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(214);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(313);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(5);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
__webpack_require__(7);
module.exports = __webpack_require__(6);


/***/ })
/******/ ]);
//# sourceMappingURL=main-client.js.map