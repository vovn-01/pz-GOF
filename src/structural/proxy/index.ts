/**
 * Патерн: Proxy (Замісник)
 * Проблема: Потрібно контролювати доступ до об'єкта (для кешування, перевірки прав доступу або лінивого завантаження).
 * Анти-приклад: Додавання логіки кешування або авторизації безпосередньо в базовий сервіс, що порушує принцип єдиної відповідальності (SRP).
 */

interface Database {
    requestData(userRole: string): void;
}

class RealDatabase implements Database {
    requestData(userRole: string): void {
        console.log("RealDatabase: Вибірка секретних даних...");
    }
}

class DatabaseAccessProxy implements Database {
    private realDatabase: RealDatabase;

    constructor(realDatabase: RealDatabase) {
        this.realDatabase = realDatabase;
    }

    private checkAccess(userRole: string): boolean {
        return userRole === "admin";
    }

    requestData(userRole: string): void {
        if (this.checkAccess(userRole)) {
            console.log("Proxy: Доступ дозволено.");
            this.realDatabase.requestData(userRole);
        } else {
            console.log("Proxy: Доступ заборонено! Потрібні права admin.");
        }
    }
}

export function testProxy() {
    console.log("--- Proxy ---");
    const db = new RealDatabase();
    const proxy = new DatabaseAccessProxy(db);

    proxy.requestData("guest");
    proxy.requestData("admin");
    console.log("");
}