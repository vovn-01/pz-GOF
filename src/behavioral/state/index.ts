/**
 * Патерн: State (Стан)
 * Проблема: Об'єкт повинен змінювати свою поведінку залежно від внутрішнього стану.
 * Анти-приклад: Гігантські блоки switch-case всередині методів об'єкта, які перевіряють поточний статус (`if (state === 'Draft') ... else if ...`).
 */

interface State {
    publish(): void;
}

class DocumentContext {
    private state!: State;

    constructor(initialState: State) {
        this.transitionTo(initialState);
    }

    public transitionTo(state: State): void {
        this.state = state;
        // Передаємо контекст у стан (спрощено)
        (this.state as any).context = this;
    }

    public publish(): void {
        this.state.publish();
    }
}

class DraftState implements State {
    public context!: DocumentContext;
    publish(): void {
        console.log("Документ відправлено на модерацію.");
        this.context.transitionTo(new ModerationState());
    }
}

class ModerationState implements State {
    public context!: DocumentContext;
    publish(): void {
        console.log("Модерацію пройдено. Документ опубліковано!");
        this.context.transitionTo(new PublishedState());
    }
}

class PublishedState implements State {
    public context!: DocumentContext;
    publish(): void {
        console.log("Документ вже опубліковано, повторна публікація неможлива.");
    }
}

export function testState() {
    console.log("--- State ---");
    const doc = new DocumentContext(new DraftState());

    doc.publish(); // Перехід: Draft -> Moderation
    doc.publish(); // Перехід: Moderation -> Published
    doc.publish(); // Нічого не змінюється
    console.log("");
}