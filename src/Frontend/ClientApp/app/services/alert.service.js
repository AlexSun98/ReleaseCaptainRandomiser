var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Utilities } from '../services/utilities';
let AlertService = class AlertService {
    constructor() {
        this.messages = new Subject();
        this.stickyMessages = new Subject();
        this.dialogs = new Subject();
        this._isLoading = false;
    }
    showDialog(message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type)
            type = DialogType.alert;
        this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
    }
    showMessage(data, separatorOrDetail, severity) {
        if (!severity)
            severity = MessageSeverity.default;
        if (data instanceof Response) {
            data = Utilities.getHttpResponseMessage(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (let message of data) {
                let msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    }
    showStickyMessage(data, separatorOrDetail, severity, error) {
        if (!severity)
            severity = MessageSeverity.default;
        if (data instanceof Response) {
            data = Utilities.getHttpResponseMessage(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (let message of data) {
                let msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
            }
        }
        else {
            if (error) {
                let msg = `Severity: "${MessageSeverity[severity]}", Summary: "${data}", Detail: "${separatorOrDetail}", Error: "${Utilities.safeStringify(error)}"`;
                switch (severity) {
                    case MessageSeverity.default:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.info:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.success:
                        this.logMessage(msg);
                        break;
                    case MessageSeverity.error:
                        this.logError(msg);
                        break;
                    case MessageSeverity.warn:
                        this.logWarning(msg);
                        break;
                    case MessageSeverity.wait:
                        this.logTrace(msg);
                        break;
                }
            }
            this.showMessageHelper(data, separatorOrDetail, severity, true);
        }
    }
    showMessageHelper(summary, detail, severity, isSticky) {
        if (isSticky)
            this.stickyMessages.next({ severity: severity, summary: summary, detail: detail });
        else
            this.messages.next({ severity: severity, summary: summary, detail: detail });
    }
    startLoadingMessage(message = "Loading...", caption = "") {
        this._isLoading = true;
        clearTimeout(this.loadingMessageId);
        this.loadingMessageId = setTimeout(() => {
            this.showStickyMessage(caption, message, MessageSeverity.wait);
        }, 1000);
    }
    stopLoadingMessage() {
        this._isLoading = false;
        clearTimeout(this.loadingMessageId);
        this.resetStickyMessage();
    }
    logDebug(msg) {
        console.debug(msg);
    }
    logError(msg) {
        console.error(msg);
    }
    logInfo(msg) {
        console.info(msg);
    }
    logMessage(msg) {
        console.log(msg);
    }
    logTrace(msg) {
        console.trace(msg);
    }
    logWarning(msg) {
        console.warn(msg);
    }
    resetStickyMessage() {
        this.stickyMessages.next();
    }
    getDialogEvent() {
        return this.dialogs.asObservable();
    }
    getMessageEvent() {
        return this.messages.asObservable();
    }
    getStickyMessageEvent() {
        return this.stickyMessages.asObservable();
    }
    get isLoadingInProgress() {
        return this._isLoading;
    }
};
AlertService = __decorate([
    Injectable()
], AlertService);
export { AlertService };
//******************** Dialog ********************//
export class AlertDialog {
    constructor(message, type, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel) {
        this.message = message;
        this.type = type;
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;
        this.defaultValue = defaultValue;
        this.okLabel = okLabel;
        this.cancelLabel = cancelLabel;
    }
}
export var DialogType;
(function (DialogType) {
    DialogType[DialogType["alert"] = 0] = "alert";
    DialogType[DialogType["confirm"] = 1] = "confirm";
    DialogType[DialogType["prompt"] = 2] = "prompt";
})(DialogType || (DialogType = {}));
//******************** End ********************//
//******************** Growls ********************//
export class AlertMessage {
    constructor(severity, summary, detail) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
}
export var MessageSeverity;
(function (MessageSeverity) {
    MessageSeverity[MessageSeverity["default"] = 0] = "default";
    MessageSeverity[MessageSeverity["info"] = 1] = "info";
    MessageSeverity[MessageSeverity["success"] = 2] = "success";
    MessageSeverity[MessageSeverity["error"] = 3] = "error";
    MessageSeverity[MessageSeverity["warn"] = 4] = "warn";
    MessageSeverity[MessageSeverity["wait"] = 5] = "wait";
})(MessageSeverity || (MessageSeverity = {}));
//******************** End ********************//
//# sourceMappingURL=alert.service.js.map