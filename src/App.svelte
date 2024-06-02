<script lang="ts">
    import SelectTeleform from "./lib/SelectTeleform.svelte";
    import { currentTeleform } from "./lib/stores";
    import Teleform from "./lib/Teleform.svelte";
</script>

<div class="flex items-center justify-center p-10">
    <div class="max-w-4xl">
        {#if !$currentTeleform}
            <SelectTeleform />
        {:else}
            <Teleform />
        {/if}
    </div>
</div>
