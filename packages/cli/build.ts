await Bun.build({
  entrypoints: ["index.ts"],
  outdir: "./build",
  target: "bun",
}).then(() => {
  console.log("Cli build done!");
});
