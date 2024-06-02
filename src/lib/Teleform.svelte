<script lang="ts">
    import { currentTeleform, teleforms } from "./stores";
    import type { TeleformAnswer } from "./stores";

    let mark = false;
    $: answers = mark ? $currentTeleform!.answers : [];

    function goBack() {
        $currentTeleform = null;
    }

    function addRows() {
        const userRequset = prompt("How many rows should be added");
        if (!userRequset) {
            alert("Need to set a number of rows to add");
            return;
        }

        const newRowsCount = parseInt(userRequset);
        if (isNaN(newRowsCount)) {
            alert(userRequset + " is not a number");
            return;
        }

        const items = $currentTeleform!.items.concat(
            new Array<TeleformAnswer | undefined>(newRowsCount),
        );
        console.log(items);
        $currentTeleform = {
            ...$currentTeleform!,
            items,
        };
    }

    function setAnswer(index: number, answer: TeleformAnswer) {
        return () => {
            const items = $currentTeleform!.items;
            items[index] = answer;
            $currentTeleform = {
                ...$currentTeleform!,
                items,
            };
        };
    }

    function removeItem(index: number) {
        return () => {
            const items = $currentTeleform!.items;
            items.splice(index, 1);

            $currentTeleform = {
                ...$currentTeleform!,
                items,
            };
        };
    }

    function toggleAnswers() {
        mark = !mark;
    }

    function remove() {
        const name = $currentTeleform!.name;
        const newNames = $teleforms;
        newNames.splice(newNames.indexOf(name), 1);

        $teleforms = newNames;
        $currentTeleform = null;
    }

    function loadAnswers() {
        const answers = prompt("Enter CSV seperated answers here");
        if (!answers) {
            alert("No answers provided");
            return;
        }

        try {
            $currentTeleform!.answers = answers
                .split(",")
                .map((maybeAnswer, index) => {
                    const answer = maybeAnswer.toLowerCase().trim();
                    if (
                        answer == "a" ||
                        answer == "b" ||
                        answer == "c" ||
                        answer == "d" ||
                        answer == "e"
                    ) {
                        return answer;
                    }

                    alert("Answer " + index + " is invalid");
                    throw new Error();
                });
        } catch (ex) {}
    }
</script>

<svelte:head>
    <title>{$currentTeleform?.name} | Teleform</title>
</svelte:head>

<h1 class="pb-10 text-center text-2xl font-bold">{$currentTeleform?.name}</h1>
<div class="flex flex-col items-center justify-center gap-5">
    <div class="max-full grid grid-cols-7 gap-4">
        {#each $currentTeleform?.items ?? [] as item, index}
            {@const answer = answers[index]}
            <p class="font-bold">{index + 1}</p>
            <button
                class="btn {item == 'a'
                    ? answer
                        ? answer == 'a'
                            ? 'btn-success'
                            : 'btn-error'
                        : 'btn-primary'
                    : ''}"
                on:click={setAnswer(index, "a")}
            >
                A
            </button>
            <button
                class="btn {item == 'b'
                    ? answer
                        ? answer == 'b'
                            ? 'btn-success'
                            : 'btn-error'
                        : 'btn-primary'
                    : ''}"
                on:click={setAnswer(index, "b")}
            >
                B
            </button>
            <button
                class="btn {item == 'c'
                    ? answer
                        ? answer == 'c'
                            ? 'btn-success'
                            : 'btn-error'
                        : 'btn-primary'
                    : ''}"
                on:click={setAnswer(index, "c")}
            >
                C
            </button>
            <button
                class="btn {item == 'd'
                    ? answer
                        ? answer == 'd'
                            ? 'btn-success'
                            : 'btn-error'
                        : 'btn-primary'
                    : ''}"
                on:click={setAnswer(index, "d")}
            >
                D
            </button>
            <button
                class="btn {item == 'e'
                    ? answer
                        ? answer == 'e'
                            ? 'btn-success'
                            : 'btn-error'
                        : 'btn-primary'
                    : ''}"
                on:click={setAnswer(index, "e")}
            >
                E
            </button>

            <button class="btn btn-error" on:click={removeItem(index)}>
                Remove
            </button>
        {/each}
    </div>
    <div class="flex w-full items-center justify-around">
        <button class="btn btn-primary" on:click={addRows}>Add Rows</button>
        <button class="load-answers btn" on:click={loadAnswers}
            >Load answers</button
        >
        <button class="btn btn-success" on:click={toggleAnswers}
            >Toggle answers</button
        >
        <button class="btn" on:click={goBack}>Go Back</button>
        <button class="btn btn-error" on:click={remove}>Remove</button>
    </div>
</div>
