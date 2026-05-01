/**
 * Патерн: Facade (Фасад)
 * Проблема: Складна підсистема містить безліч класів, які потрібно ініціалізувати і викликати в певному порядку.
 * Анти-приклад: Клієнтський код напряму керує десятком дрібних класів підсистеми, стаючи сильно залежним від їхнього внутрішнього пристрою.
 */

// Складні підсистеми
class Lights { turnOn() { console.log("Світло увімкнено"); } turnOff() { console.log("Світло вимкнено"); } }
class Projector { on() { console.log("Проєктор увімкнено"); } setInput(input: string) { console.log(`Вхід проєктора: ${input}`); } }
class SoundSystem { on() { console.log("Звук увімкнено"); } setVolume(level: number) { console.log(`Гучність: ${level}`); } }

// Фасад
class HomeTheaterFacade {
    constructor(
        private lights: Lights,
        private projector: Projector,
        private soundSystem: SoundSystem
    ) {}

    public watchMovie(): void {
        console.log("Підготовка до перегляду фільму...");
        this.lights.turnOff();
        this.projector.on();
        this.projector.setInput("HDMI");
        this.soundSystem.on();
        this.soundSystem.setVolume(10);
    }
}

export function testFacade() {
    console.log("--- Facade ---");
    const theater = new HomeTheaterFacade(new Lights(), new Projector(), new SoundSystem());
    // Клієнту потрібен лише один простий метод
    theater.watchMovie();
    console.log("");
}