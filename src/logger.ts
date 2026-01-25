export const log = {
  info(msg: string) {
    console.log(`==> ${msg}`);
  },

  warn(msg: string) {
    console.warn(`WARNING: ${msg}`);
  },

  error(msg: string): never {
    console.error(`ERROR: ${msg}`);
    process.exit(1);
  }
};
