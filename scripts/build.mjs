import build from "../node_modules/next/dist/esm/build/index.js";

try {
  await build(process.cwd());
} catch (error) {
  console.error(error);
  process.exit(1);
}
