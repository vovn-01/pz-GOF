/**
 * Патерн: Command (Команда)
 * Проблема: Потрібно інкапсулювати запит як об'єкт, дозволяючи параметризувати клієнтів із різними запитами, ставити їх у чергу або підтримувати скасування (undo).
 * Анти-приклад: Пряме прив'язування елементів UI (наприклад, кнопок) до обробників бізнес-логіки.
 */

interface Command {
    execute(): void;
    undo(): void;
}

class Editor {
    public text: string = "";
}

class AddTextCommand implements Command {
    private backup: string = "";

    constructor(private editor: Editor, private textToAdd: string) {}

    execute(): void {
        this.backup = this.editor.text;
        this.editor.text += this.textToAdd;
        console.log(`Додано текст: "${this.textToAdd}". Поточний текст: "${this.editor.text}"`);
    }

    undo(): void {
        this.editor.text = this.backup;
        console.log(`Скасовано. Поточний текст: "${this.editor.text}"`);
    }
}

class CommandInvoker {
    private history: Command[] = [];

    executeCommand(command: Command) {
        command.execute();
        this.history.push(command);
    }

    undoLast() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

export function testCommand() {
    console.log("--- Command ---");
    const editor = new Editor();
    const invoker = new CommandInvoker();

    invoker.executeCommand(new AddTextCommand(editor, "Hello "));
    invoker.executeCommand(new AddTextCommand(editor, "World!"));

    invoker.undoLast();
    console.log("");
}