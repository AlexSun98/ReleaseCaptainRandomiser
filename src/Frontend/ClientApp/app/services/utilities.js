var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
let Utilities = Utilities_1 = class Utilities {
    static getHttpResponseMessage(data) {
        let responses = [];
        if (data instanceof Response) {
            if (this.checkNoNetwork(data)) {
                responses.push(`${this.noNetworkMessageCaption}${this.captionAndMessageSeparator} ${this.noNetworkMessageDetail}`);
            }
            else {
                try {
                    let responseObject = data.json();
                    for (let key in responseObject) {
                        if (key)
                            responses.push(`${key}${this.captionAndMessageSeparator} ${responseObject[key]}`);
                        else if (responseObject[key])
                            responses.push(responseObject[key].toString());
                    }
                }
                catch (error) {
                }
            }
            if (!responses.length && data.text())
                responses.push(data.text());
        }
        if (!responses.length)
            responses.push(data.toString());
        if (this.checkAccessDenied(data))
            responses.splice(0, 0, `${this.accessDeniedMessageCaption}${this.captionAndMessageSeparator} ${this.accessDeniedMessageDetail}`);
        return responses;
    }
    static findHttpResponseMessage(messageToFind, data, seachInCaptionOnly = true, includeCaptionInResult = false) {
        let searchString = messageToFind.toLowerCase();
        let httpMessages = this.getHttpResponseMessage(data);
        for (let message of httpMessages) {
            let fullMessage = Utilities_1.splitInTwo(message, this.captionAndMessageSeparator);
            if (fullMessage.firstPart && fullMessage.firstPart.toLowerCase().indexOf(searchString) != -1) {
                return includeCaptionInResult ? message : fullMessage.secondPart || fullMessage.firstPart;
            }
        }
        if (!seachInCaptionOnly) {
            for (let message of httpMessages) {
                if (message.toLowerCase().indexOf(searchString) != -1) {
                    if (includeCaptionInResult) {
                        return message;
                    }
                    else {
                        let fullMessage = Utilities_1.splitInTwo(message, this.captionAndMessageSeparator);
                        return fullMessage.secondPart || fullMessage.firstPart;
                    }
                }
            }
        }
        return null;
    }
    static checkNoNetwork(response) {
        if (response instanceof Response) {
            return response.status == 0;
        }
        return false;
    }
    static checkAccessDenied(response) {
        if (response instanceof Response) {
            return response.status == 403;
        }
        return false;
    }
    static checkNotFound(response) {
        if (response instanceof Response) {
            return response.status == 404;
        }
        return false;
    }
    static checkIsLocalHost(url, base) {
        if (url) {
            let location = new URL(url, base);
            return location.hostname === "localhost" || location.hostname === "127.0.0.1";
        }
        return false;
    }
    static splitInTwo(text, separator) {
        let separatorIndex = text.indexOf(separator);
        if (separatorIndex == -1)
            return { firstPart: text, secondPart: null };
        let part1 = text.substr(0, separatorIndex).trim();
        let part2 = text.substr(separatorIndex + 1).trim();
        return { firstPart: part1, secondPart: part2 };
    }
    static safeStringify(object) {
        let result;
        try {
            result = JSON.stringify(object);
            return result;
        }
        catch (error) {
        }
        let simpleObject = {};
        for (let prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            if (typeof (object[prop]) == 'object') {
                continue;
            }
            if (typeof (object[prop]) == 'function') {
                continue;
            }
            simpleObject[prop] = object[prop];
        }
        result = "[***Sanitized Object***]: " + JSON.stringify(simpleObject);
        return result;
    }
    static JSonTryParse(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            if (value === "undefined")
                return void 0;
            return value;
        }
    }
    static TestIsUndefined(value) {
        return typeof value === 'undefined';
        //return value === undefined;
    }
    static TestIsString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    static capitalizeFirstLetter(text) {
        if (text)
            return text.charAt(0).toUpperCase() + text.slice(1);
        else
            return text;
    }
    static toTitleCase(text) {
        return text.replace(/\w\S*/g, (subString) => {
            return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
        });
    }
    static toLowerCase(items) {
        if (items instanceof Array) {
            let loweredRoles = [];
            for (let i = 0; i < items.length; i++) {
                loweredRoles[i] = items[i].toLowerCase();
            }
            return loweredRoles;
        }
        else if (typeof items === 'string' || items instanceof String) {
            return items.toLowerCase();
        }
    }
    static uniqueId() {
        return this.randomNumber(1000000, 9000000).toString();
    }
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static baseUrl() {
        if (window.location.origin)
            return window.location.origin;
        return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    static printDateOnly(date) {
        date = new Date(date);
        let dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        let monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        let dayOfWeek = date.getDay();
        let dayOfMonth = date.getDate();
        let sup = "";
        let month = date.getMonth();
        let year = date.getFullYear();
        if (dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) {
            sup = "st";
        }
        else if (dayOfMonth == 2 || dayOfMonth == 22) {
            sup = "nd";
        }
        else if (dayOfMonth == 3 || dayOfMonth == 23) {
            sup = "rd";
        }
        else {
            sup = "th";
        }
        let dateString = dayNames[dayOfWeek] + ", " + dayOfMonth + sup + " " + monthNames[month] + " " + year;
        return dateString;
    }
    static printTimeOnly(date) {
        date = new Date(date);
        let period = "";
        let minute = date.getMinutes().toString();
        let hour = date.getHours();
        period = hour < 12 ? "AM" : "PM";
        if (hour == 0) {
            hour = 12;
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        if (minute.length == 1) {
            minute = "0" + minute;
        }
        let timeString = hour + ":" + minute + " " + period;
        return timeString;
    }
    static printDate(date) {
        return Utilities_1.printDateOnly(date) + " at " + Utilities_1.printTimeOnly(date);
    }
    static parseDate(date) {
        if (date) {
            if (date instanceof Date) {
                return date;
            }
            if (typeof date === 'string' || date instanceof String) {
                if (date.search(/[a-su-z+]/i) == -1)
                    date = date + "Z";
                return new Date(date);
            }
            if (typeof date === 'number' || date instanceof Number) {
                return new Date(date);
            }
        }
    }
    static printDuration(start, end) {
        start = new Date(start);
        end = new Date(end);
        // get total seconds between the times
        let delta = Math.abs(start.valueOf() - end.valueOf()) / 1000;
        // calculate (and subtract) whole days
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        let seconds = delta % 60; // in theory the modulus is not required
        let printedDays = "";
        if (days)
            printedDays = `${days} days`;
        if (hours)
            printedDays += printedDays ? `, ${hours} hours` : `${hours} hours`;
        if (minutes)
            printedDays += printedDays ? `, ${minutes} minutes` : `${minutes} minutes`;
        if (seconds)
            printedDays += printedDays ? ` and ${seconds} seconds` : `${seconds} seconds`;
        if (!printedDays)
            printedDays = "0";
        return printedDays;
    }
    static getAge(birthDate, otherDate) {
        birthDate = new Date(birthDate);
        otherDate = new Date(otherDate);
        let years = (otherDate.getFullYear() - birthDate.getFullYear());
        if (otherDate.getMonth() < birthDate.getMonth() ||
            otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--;
        }
        return years;
    }
    static removeNulls(obj) {
        let isArray = obj instanceof Array;
        for (let k in obj) {
            if (obj[k] === null) {
                isArray ? obj.splice(k, 1) : delete obj[k];
            }
            else if (typeof obj[k] == "object") {
                Utilities_1.removeNulls(obj[k]);
            }
            if (isArray && obj.length == k) {
                Utilities_1.removeNulls(obj);
            }
        }
        return obj;
    }
    static debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args_ = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args_);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args_);
        };
    }
    ;
};
Utilities.captionAndMessageSeparator = ":";
Utilities.noNetworkMessageCaption = "No Network";
Utilities.noNetworkMessageDetail = "The server cannot be reached";
Utilities.accessDeniedMessageCaption = "Access Denied!";
Utilities.accessDeniedMessageDetail = "";
Utilities = Utilities_1 = __decorate([
    Injectable()
], Utilities);
export { Utilities };
var Utilities_1;
//# sourceMappingURL=utilities.js.map