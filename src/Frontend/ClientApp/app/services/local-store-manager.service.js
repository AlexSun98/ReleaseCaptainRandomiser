var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Utilities } from './utilities';
let LocalStoreManager = LocalStoreManager_1 = class LocalStoreManager {
    constructor() {
        this.syncKeys = [];
        this.initEvent = new Subject();
        this.reservedKeys = ['sync_keys', 'addToSyncKeys', 'removeFromSyncKeys',
            'getSessionStorage', 'setSessionStorage', 'addToSessionStorage', 'removeFromSessionStorage', 'clearAllSessionsStorage'];
        this.sessionStorageTransferHandler = (event) => {
            if (!event.newValue)
                return;
            if (event.key == 'getSessionStorage') {
                if (sessionStorage.length) {
                    this.localStorageSetItem('setSessionStorage', sessionStorage);
                    localStorage.removeItem('setSessionStorage');
                }
            }
            else if (event.key == 'setSessionStorage') {
                if (!this.syncKeys.length)
                    this.loadSyncKeys();
                let data = JSON.parse(event.newValue);
                //console.info("Set => Key: Transfer setSessionStorage" + ",  data: " + JSON.stringify(data));
                for (let key in data) {
                    if (this.syncKeysContains(key))
                        this.sessionStorageSetItem(key, JSON.parse(data[key]));
                }
                this.onInit();
            }
            else if (event.key == 'addToSessionStorage') {
                let data = JSON.parse(event.newValue);
                //console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));
                this.addToSessionStorageHelper(data["data"], data["key"]);
            }
            else if (event.key == 'removeFromSessionStorage') {
                this.removeFromSessionStorageHelper(event.newValue);
            }
            else if (event.key == 'clearAllSessionsStorage' && sessionStorage.length) {
                this.clearInstanceSessionStorage();
            }
            else if (event.key == 'addToSyncKeys') {
                this.addToSyncKeysHelper(event.newValue);
            }
            else if (event.key == 'removeFromSyncKeys') {
                this.removeFromSyncKeysHelper(event.newValue);
            }
        };
    }
    //Todo: Implement EventListeners for the various event operations and a SessionStorageEvent for specific data keys
    initialiseStorageSyncListener() {
        if (LocalStoreManager_1.syncListenerInitialised == true)
            return;
        LocalStoreManager_1.syncListenerInitialised = true;
        window.addEventListener("storage", this.sessionStorageTransferHandler, false);
        this.syncSessionStorage();
    }
    deinitialiseStorageSyncListener() {
        window.removeEventListener("storage", this.sessionStorageTransferHandler, false);
        LocalStoreManager_1.syncListenerInitialised = false;
    }
    syncSessionStorage() {
        localStorage.setItem('getSessionStorage', '_dummy');
        localStorage.removeItem('getSessionStorage');
    }
    clearAllStorage() {
        this.clearAllSessionsStorage();
        this.clearLocalStorage();
    }
    clearAllSessionsStorage() {
        this.clearInstanceSessionStorage();
        localStorage.removeItem(LocalStoreManager_1.DBKEY_SYNC_KEYS);
        localStorage.setItem('clearAllSessionsStorage', '_dummy');
        localStorage.removeItem('clearAllSessionsStorage');
    }
    clearInstanceSessionStorage() {
        sessionStorage.clear();
        this.syncKeys = [];
    }
    clearLocalStorage() {
        localStorage.clear();
    }
    addToSessionStorage(data, key) {
        this.addToSessionStorageHelper(data, key);
        this.addToSyncKeysBackup(key);
        this.localStorageSetItem('addToSessionStorage', { key: key, data: data });
        localStorage.removeItem('addToSessionStorage');
    }
    addToSessionStorageHelper(data, key) {
        this.addToSyncKeysHelper(key);
        this.sessionStorageSetItem(key, data);
    }
    removeFromSessionStorage(keyToRemove) {
        this.removeFromSessionStorageHelper(keyToRemove);
        this.removeFromSyncKeysBackup(keyToRemove);
        localStorage.setItem('removeFromSessionStorage', keyToRemove);
        localStorage.removeItem('removeFromSessionStorage');
    }
    removeFromSessionStorageHelper(keyToRemove) {
        sessionStorage.removeItem(keyToRemove);
        this.removeFromSyncKeysHelper(keyToRemove);
    }
    testForInvalidKeys(key) {
        if (!key)
            throw new Error("key cannot be empty");
        if (this.reservedKeys.some(x => x == key))
            throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
    }
    syncKeysContains(key) {
        return this.syncKeys.some(x => x == key);
    }
    loadSyncKeys() {
        if (this.syncKeys.length)
            return;
        this.syncKeys = this.getSyncKeysFromStorage();
    }
    getSyncKeysFromStorage(defaultValue = []) {
        let data = this.localStorageGetItem(LocalStoreManager_1.DBKEY_SYNC_KEYS);
        if (data == null)
            return defaultValue;
        else
            return data;
    }
    addToSyncKeys(key) {
        this.addToSyncKeysHelper(key);
        this.addToSyncKeysBackup(key);
        localStorage.setItem('addToSyncKeys', key);
        localStorage.removeItem('addToSyncKeys');
    }
    addToSyncKeysBackup(key) {
        let storedSyncKeys = this.getSyncKeysFromStorage();
        if (!storedSyncKeys.some(x => x == key)) {
            storedSyncKeys.push(key);
            this.localStorageSetItem(LocalStoreManager_1.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    }
    removeFromSyncKeysBackup(key) {
        let storedSyncKeys = this.getSyncKeysFromStorage();
        let index = storedSyncKeys.indexOf(key);
        if (index > -1) {
            storedSyncKeys.splice(index, 1);
            this.localStorageSetItem(LocalStoreManager_1.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    }
    addToSyncKeysHelper(key) {
        if (!this.syncKeysContains(key))
            this.syncKeys.push(key);
    }
    removeFromSyncKeys(key) {
        this.removeFromSyncKeysHelper(key);
        this.removeFromSyncKeysBackup(key);
        localStorage.setItem('removeFromSyncKeys', key);
        localStorage.removeItem('removeFromSyncKeys');
    }
    removeFromSyncKeysHelper(key) {
        let index = this.syncKeys.indexOf(key);
        if (index > -1) {
            this.syncKeys.splice(index, 1);
        }
    }
    saveSessionData(data, key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        this.sessionStorageSetItem(key, data);
    }
    saveSyncedSessionData(data, key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    }
    savePermanentData(data, key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        this.localStorageSetItem(key, data);
    }
    moveDataToSessionStorage(key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        let data = this.getData(key);
        if (data == null)
            return;
        this.saveSessionData(data, key);
    }
    moveDataToSyncedSessionStorage(key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        let data = this.getData(key);
        if (data == null)
            return;
        this.saveSyncedSessionData(data, key);
    }
    moveDataToPermanentStorage(key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        let data = this.getData(key);
        if (data == null)
            return;
        this.savePermanentData(data, key);
    }
    exists(key = LocalStoreManager_1.DBKEY_USER_DATA) {
        let data = sessionStorage.getItem(key);
        if (data == null)
            data = localStorage.getItem(key);
        return data != null;
    }
    getData(key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        let data = this.sessionStorageGetItem(key);
        if (data == null)
            data = this.localStorageGetItem(key);
        return data;
    }
    getDataObject(key = LocalStoreManager_1.DBKEY_USER_DATA, isDateType = false) {
        let data = this.getData(key);
        if (data != null) {
            if (isDateType)
                data = new Date(data);
            return data;
        }
        else {
            return null;
        }
    }
    deleteData(key = LocalStoreManager_1.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        localStorage.removeItem(key);
    }
    localStorageSetItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    sessionStorageSetItem(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    localStorageGetItem(key) {
        return Utilities.JSonTryParse(localStorage.getItem(key));
    }
    sessionStorageGetItem(key) {
        return Utilities.JSonTryParse(sessionStorage.getItem(key));
    }
    onInit() {
        setTimeout(() => {
            this.initEvent.next();
            this.initEvent.complete();
        });
    }
    getInitEvent() {
        return this.initEvent.asObservable();
    }
};
LocalStoreManager.syncListenerInitialised = false;
LocalStoreManager.DBKEY_USER_DATA = "user_data";
LocalStoreManager.DBKEY_SYNC_KEYS = "sync_keys";
LocalStoreManager = LocalStoreManager_1 = __decorate([
    Injectable()
], LocalStoreManager);
export { LocalStoreManager };
var LocalStoreManager_1;
//# sourceMappingURL=local-store-manager.service.js.map