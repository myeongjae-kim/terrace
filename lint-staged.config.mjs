const config = {
  '**/*.(mts|ts|tsx|js)': (filenames) => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`,
  ],
};

export default config;
