const config = {
  "**/*.(mts|ts|tsx|js)": (filenames) => {
    const filteredFilenames = filenames.filter(
      (filename) => !filename.endsWith("src/routeTree.gen.ts"),
    );

    if (filteredFilenames.length === 0) {
      return [];
    }

    return [
      `pnpx biome check --fix ${filteredFilenames.join(" ")}`,
    ];
  },
};

export default config;
