/**
 * Патерн: Abstract Factory (Абстрактна фабрика)
 * Проблема: Потрібно створювати сімейства пов'язаних об'єктів (наприклад, UI-елементи для різних ОС), гарантуючи їхню сумісність.
 * Анти-приклад: Жорстке створення об'єктів по всьому коду з ризиком випадково додати кнопку Windows у діалогове вікно macOS.
 */

interface Button { render(): void; }
interface Checkbox { render(): void; }

// Сімейство Windows
class WinButton implements Button { render() { console.log("Рендер кнопки Windows"); } }
class WinCheckbox implements Checkbox { render() { console.log("Рендер чекбокса Windows"); } }

// Сімейство macOS
class MacButton implements Button { render() { console.log("Рендер кнопки macOS"); } }
class MacCheckbox implements Checkbox { render() { console.log("Рендер чекбокса macOS"); } }

// Абстрактна фабрика
interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
    createButton(): Button { return new WinButton(); }
    createCheckbox(): Checkbox { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
    createButton(): Button { return new MacButton(); }
    createCheckbox(): Checkbox { return new MacCheckbox(); }
}

export function testAbstractFactory() {
    console.log("--- Abstract Factory ---");
    // Логіка вибору фабрики може залежати від конфігурації
    const isMac = true;
    const factory: GUIFactory = isMac ? new MacFactory() : new WinFactory();

    const button = factory.createButton();
    const checkbox = factory.createCheckbox();

    button.render();
    checkbox.render();
    console.log("");
}