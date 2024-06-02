<script lang="ts">
    import { currentTeleform } from "./stores";
    import type { Teleform } from "./stores";

    const teleforms = JSON.parse(
        localStorage.getItem("teleforms") ?? "[]",
    ) as string[];

    function setTeleform(teleform: string) {
        return () => {
            $currentTeleform = JSON.parse(
                localStorage.getItem(teleform) ??
                    `{"items": [], "answers": [], "name": ${JSON.stringify(teleform)}}`,
            ) as Teleform;
        };
    }

    function createTeleform() {
        const name = prompt("Enter name for teleform");
        if (!name) {
            alert("Cannot create teleform with no name");
            return;
        }

        teleforms.push(name);
        localStorage.setItem("teleforms", JSON.stringify(teleforms));

        $currentTeleform = {
            name,
            items: [],
            answers: [],
        };
    }
</script>

<div class="flex flex-row flex-wrap items-center justify-center gap-10">
    {#each teleforms as teleform}
        <div class="card w-96 bg-neutral text-neutral-content">
            <div class="card-body items-center text-center">
                <h2 class="card-title">{teleform}</h2>
                <div class="card-actions justify-end">
                    <button
                        class="btn btn-primary"
                        on:click={setTeleform(teleform)}>Goto</button
                    >
                </div>
            </div>
        </div>
    {/each}

    <button class="btn" on:click={createTeleform}>Create new</button>
</div>
