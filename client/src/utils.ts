type Classname = string | boolean | undefined;
export const clsx = (...classnames: Classname[]) =>
  classnames.filter(Boolean).join(' ');

export const encodeOperationId = (path: string, method: string) => {
  return encodeURIComponent(`${path}.${method}`);
};

export const decodeOperationId = (id: string) => {
  const decodedId = decodeURIComponent(id);
  const idx = decodedId.lastIndexOf('.');
  return [decodedId.substring(0, idx), decodedId.substring(idx + 1)];
};
