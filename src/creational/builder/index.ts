/**
 * Патерн: Builder (Будівельник)
 * Проблема: Створення складного об'єкта вимагає ініціалізації багатьох полів і вкладених об'єктів.
 * Анти-приклад: "Телескопічний конструктор" (Telescoping Constructor) — конструктор з 10+ параметрами, половина з яких null: new Computer("Intel", 16, null, null, true, false).
 */

class Computer {
    public cpu: string = "";
    public ram: number = 0;
    public storage: number = 0;
    public gpu?: string;
    public hasWifi: boolean = false;

    public showSpecs(): void {
        console.log(`ПК: CPU ${this.cpu}, RAM ${this.ram}GB, Storage ${this.storage}GB, GPU: ${this.gpu || 'Вбудований'}, Wi-Fi: ${this.hasWifi ? 'Так' : 'Ні'}`);
    }
}

interface Builder {
    setCPU(cpu: string): this;
    setRAM(ram: number): this;
    setStorage(storage: number): this;
    setGPU(gpu: string): this;
    setWifi(hasWifi: boolean): this;
    build(): Computer;
}

class GamingComputerBuilder implements Builder {
    private computer: Computer;

    constructor() {
        this.computer = new Computer();
    }

    setCPU(cpu: string): this { this.computer.cpu = cpu; return this; }
    setRAM(ram: number): this { this.computer.ram = ram; return this; }
    setStorage(storage: number): this { this.computer.storage = storage; return this; }
    setGPU(gpu: string): this { this.computer.gpu = gpu; return this; }
    setWifi(hasWifi: boolean): this { this.computer.hasWifi = hasWifi; return this; }

    build(): Computer { return this.computer; }
}

export function testBuilder() {
    console.log("--- Builder ---");
    const builder = new GamingComputerBuilder();
    const pc = builder
        .setCPU("Intel Core i9")
        .setRAM(32)
        .setStorage(2000)
        .setGPU("RTX 4090")
        .setWifi(true)
        .build();

    pc.showSpecs();
    console.log("");
}