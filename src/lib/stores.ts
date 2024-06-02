import { writable } from "svelte/store";

export type TeleformAnswer = "a" | "b" | "c" | "d" | "e";

export type Teleform = {
    name: string;
    items: (TeleformAnswer | undefined)[];
    answers: (TeleformAnswer | undefined)[];
};

export const teleforms = writable<string[]>(
    JSON.parse(localStorage.getItem("teleforms") ?? "[]"),
);
teleforms.subscribe((newState) => {
    localStorage.setItem("teleforms", JSON.stringify(newState));
});

export const currentTeleform = writable<Teleform | null>();
currentTeleform.subscribe((newState) => {
    if (newState) {
        localStorage.setItem(newState.name, JSON.stringify(newState));
    }
});
