const editablePagePaths = [
  /create/,
  /update/,
];
const except: RegExp[] = [];

export const isEditablePage = (asPath: string): boolean =>
  editablePagePaths.some(path => path.test(asPath)) && !except.some(path => path.test(asPath));
