import type { Path } from 'swagger-schema-official';

type MethodObject = {
  [K in keyof Path]?: {
    className: string;
  };
};

export const Method: MethodObject = {
  get: {
    className: 'ring-1 ring-blue-600/20 bg-blue-50 text-blue-700',
  },
  post: {
    className: 'ring-1 ring-green-600/20 bg-green-50 text-green-700',
  },
  put: {
    className: 'ring-1 ring-orange-600/20 bg-orange-50 text-orange-700',
  },
  patch: {
    className: 'ring-1 ring-yellow-600/20 bg-yellow-50 text-yellow-700',
  },
  delete: {
    className: 'ring-1 ring-red-600/20 bg-red-50 text-red-700',
  },
};
