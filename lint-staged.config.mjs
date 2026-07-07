const config = {
  '**/*.(mts|ts|tsx|js)': (filenames) => [
    `pnpx biome check --fix ${filenames.join(' ')}`,
    `pnpx prettier --write ${filenames.join(' ')}`,
  ],
};

export default config;
