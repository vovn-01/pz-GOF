import { testBuilder } from "../creational/builder";
import { testAbstractFactory } from "../creational/abstract-factory";
import { testFacade } from "../structural/facade";
import { testProxy } from "../structural/proxy";
import { testState } from "../behavioral/state";
import { testCommand } from "../behavioral/command";

console.log("==========================================");
console.log("Демонстрація GOF Патернів Проєктування V2");
console.log("==========================================\n");

// Creational
testBuilder();
testAbstractFactory();

// Structural
testFacade();
testProxy();

// Behavioral
testState();
testCommand();

console.log("==========================================");
console.log("Демонстрацію успішно завершено.");
console.log("==========================================");