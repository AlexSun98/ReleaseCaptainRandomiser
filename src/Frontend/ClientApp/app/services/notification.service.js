var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { NotificationEndpoint } from './notification-endpoint.service';
import { Notification } from '../models/notification.model';
let NotificationService = class NotificationService {
    constructor(notificationEndpoint, authService) {
        this.notificationEndpoint = notificationEndpoint;
        this.authService = authService;
    }
    get recentNotifications() {
        return this._recentNotifications;
    }
    set recentNotifications(notifications) {
        this._recentNotifications = notifications;
    }
    getNotification(notificationId) {
        return this.notificationEndpoint.getNotificationEndpoint(notificationId)
            .map((response) => Notification.Create(response.json()));
    }
    getNotifications(page, pageSize) {
        return this.notificationEndpoint.getNotificationsEndpoint(page, pageSize)
            .map((response) => {
            return this.getNotificationsFromResponse(response);
        });
    }
    getUnreadNotifications(userId) {
        return this.notificationEndpoint.getUnreadNotificationsEndpoint(userId)
            .map((response) => this.getNotificationsFromResponse(response));
    }
    getNewNotifications() {
        return this.notificationEndpoint.getNewNotificationsEndpoint(this.lastNotificationDate)
            .map((response) => this.processNewNotificationsFromResponse(response));
    }
    getNewNotificationsPeriodically() {
        return Observable.interval(10000)
            .startWith(0)
            .flatMap(() => {
            return this.notificationEndpoint.getNewNotificationsEndpoint(this.lastNotificationDate)
                .map((response) => this.processNewNotificationsFromResponse(response));
        });
    }
    pinUnpinNotification(notificationOrNotificationId, isPinned) {
        if (typeof notificationOrNotificationId === 'number' || notificationOrNotificationId instanceof Number) {
            return this.notificationEndpoint.getPinUnpinNotificationEndpoint(notificationOrNotificationId, isPinned);
        }
        else {
            return this.pinUnpinNotification(notificationOrNotificationId.id);
        }
    }
    readUnreadNotification(notificationIds, isRead) {
        return this.notificationEndpoint.getReadUnreadNotificationEndpoint(notificationIds, isRead);
    }
    deleteNotification(notificationOrNotificationId) {
        if (typeof notificationOrNotificationId === 'number' || notificationOrNotificationId instanceof Number) {
            return this.notificationEndpoint.getDeleteNotificationEndpoint(notificationOrNotificationId)
                .map((response) => {
                this.recentNotifications = this.recentNotifications.filter(n => n.id != notificationOrNotificationId);
                return Notification.Create(response.json());
            });
        }
        else {
            return this.deleteNotification(notificationOrNotificationId.id);
        }
    }
    processNewNotificationsFromResponse(response) {
        let notifications = this.getNotificationsFromResponse(response);
        for (let n of notifications) {
            if (n.date > this.lastNotificationDate)
                this.lastNotificationDate = n.date;
        }
        return notifications;
    }
    getNotificationsFromResponse(response) {
        let result = response.json();
        let notifications = [];
        for (let i in result) {
            notifications[i] = Notification.Create(result[i]);
        }
        notifications.sort((a, b) => b.date.valueOf() - a.date.valueOf());
        notifications.sort((a, b) => (a.isPinned === b.isPinned) ? 0 : a.isPinned ? -1 : 1);
        this.recentNotifications = notifications;
        return notifications;
    }
    get currentUser() {
        return this.authService.currentUser;
    }
};
NotificationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NotificationEndpoint, AuthService])
], NotificationService);
export { NotificationService };
//# sourceMappingURL=notification.service.js.map