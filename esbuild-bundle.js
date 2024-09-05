import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

esbuild
    .build({
        entryPoints: ["./src/components"],
        bundle: true,
        outfile: "dist/d411-facility-map.js",
        plugins: [
            sveltePlugin({
                compilerOptions: {
                    customElement: true,
                },
            }),
        ],
        logLevel: "info",
    })
    .catch(() => process.exit(1));