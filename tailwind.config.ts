import type { Config } from "tailwindcss";
import typeography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    theme: {
        extend: {},
    },

    plugins: [typeography, daisyui],

    daisyui: {
        logs: false,
    },
} as Config;
