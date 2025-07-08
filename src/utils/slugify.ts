export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[\s/]+/g, '-') // replace spaces and slashes with dash
    .replace(/[^a-z0-9-]/g, ''); // remove all non-alphanumeric/dash 