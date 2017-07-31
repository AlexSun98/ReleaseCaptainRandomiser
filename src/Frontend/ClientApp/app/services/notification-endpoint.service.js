var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
let NotificationEndpoint = class NotificationEndpoint {
    constructor() {
        this.demoNotifications = [
            {
                "id": 1,
                "header": "20 New Products were added to your inventory by \"administrator\"",
                "body": "20 new \"BMW M6\" were added to your stock by \"administrator\" on 5/28/2017 4:54:13 PM",
                "isRead": true,
                "isPinned": true,
                "date": "2017-05-28T16:29:13.5877958"
            },
            {
                "id": 2,
                "header": "1 Product running low",
                "body": "You are running low on \"Nissan Patrol\". 2 Items remaining",
                "isRead": false,
                "isPinned": false,
                "date": "2017-05-28T19:54:42.4144502"
            },
            {
                "id": 3,
                "header": "Tomorrow is half day",
                "body": "Guys, tomorrow we close by midday. Please check in your sales before noon. Thanx. Alex.",
                "isRead": false,
                "isPinned": false,
                "date": "2017-05-30T11:13:42.4144502"
            }
        ];
    }
    getNotificationEndpoint(notificationId) {
        let notification = this.demoNotifications.find(val => val.id == notificationId);
        let response;
        if (notification) {
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }
        return Observable.of(response);
    }
    getNotificationsEndpoint(page, pageSize) {
        let notifications = this.demoNotifications;
        let response = this.createResponse(this.demoNotifications, 200);
        return Observable.of(response);
    }
    getUnreadNotificationsEndpoint(userId) {
        let unreadNotifications = this.demoNotifications.filter(val => !val.isRead);
        let response = this.createResponse(unreadNotifications, 200);
        return Observable.of(response);
    }
    getNewNotificationsEndpoint(lastNotificationDate) {
        let unreadNotifications = this.demoNotifications;
        let response = this.createResponse(unreadNotifications, 200);
        return Observable.of(response);
    }
    getPinUnpinNotificationEndpoint(notificationId, isPinned) {
        let notification = this.demoNotifications.find(val => val.id == notificationId);
        let response;
        if (notification) {
            response = this.createResponse(null, 204);
            if (isPinned == null)
                isPinned = !notification.isPinned;
            notification.isPinned = isPinned;
            notification.isRead = true;
        }
        else {
            response = this.createResponse(null, 404);
        }
        return Observable.of(response);
    }
    getReadUnreadNotificationEndpoint(notificationIds, isRead) {
        for (let notificationId of notificationIds) {
            let notification = this.demoNotifications.find(val => val.id == notificationId);
            if (notification) {
                notification.isRead = isRead;
            }
        }
        let response = this.createResponse(null, 204);
        return Observable.of(response);
    }
    getDeleteNotificationEndpoint(notificationId) {
        let notification = this.demoNotifications.find(val => val.id == notificationId);
        let response;
        if (notification) {
            this.demoNotifications = this.demoNotifications.filter(val => val.id != notificationId);
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }
        return Observable.of(response);
    }
    createResponse(body, status) {
        return new Response(new ResponseOptions({ body: body, status: status }));
    }
};
NotificationEndpoint = __decorate([
    Injectable()
], NotificationEndpoint);
export { NotificationEndpoint };
//# sourceMappingURL=notification-endpoint.service.js.map