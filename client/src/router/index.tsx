import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./Home'),
  },
  {
    path: ':url',
    lazy: () => import('./Specification'),
    children: [
      {
        path: 'operations/:operationId',
        lazy: () => import('./Operation'),
      },
    ],
  },
]);

export default router;
