import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  outDir: "dist",
  rollup: {
    inlineDependencies: true,
  },
  declaration: true,
});
