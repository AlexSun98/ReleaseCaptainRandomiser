import { Utilities } from "../services/utilities";
export class Notification {
    static Create(data) {
        let n = new Notification();
        Object.assign(n, data);
        if (n.date)
            n.date = Utilities.parseDate(n.date);
        return n;
    }
}
//# sourceMappingURL=notification.model.js.map