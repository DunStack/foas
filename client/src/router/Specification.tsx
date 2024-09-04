import { useEffect, useState } from 'react';
// import { XMarkIcon } from '@heroicons/react/20/solid'
// import { CheckIcon } from '@heroicons/react/20/solid';
import { Link, Outlet, useParams } from 'react-router-dom';
import type { Path, Spec } from 'swagger-schema-official';
import { Method } from '../constants';
import { clsx, encodeOperationId } from '../utils';

export function Component() {
  const { url } = useParams();
  const [spec, setSpec] = useState<Spec>();

  useEffect(() => {
    if (!url) return;

    fetch(url).then(async (res) => {
      const spec = await res.json();
      setSpec(spec);
    });
  }, [url]);

  if (!spec)
    return (
      <div className="p-6 inline-flex items-center font-semibold leading-6 text-sm rounded-md text-indigo-500 transition ease-in-out duration-150">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={4}
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </div>
    );
  return (
    <div className="h-screen flex flex-col">
      {/* <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div
          aria-hidden="true"
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">GeneriCon 2023</strong>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
              <circle r={1} cx={1} cy={1} />
            </svg>
            Join us in Denver from June 7 – 9 to see what’s coming next.
          </p>
          <a
            href="#"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Register now <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      </div> */}
      <div className="grid grid-cols-4 flex-auto min-h-0">
        {/* <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
              in. Explicabo id ut laborum.
            </p>
          </div> */}
        <div className="overflow-auto p-6">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            {spec.info.title}
          </h3>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {spec.info.description?.split('.', 1)[0]}
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
              Operations
            </h4>
            <div className="h-px flex-auto bg-gray-100" />
          </div>
          <ul role="list" className="mt-8 text-sm leading-6 space-y-4">
            {Object.entries(spec.paths).map(([path, apis]) =>
              Object.entries(apis).map(([method, { summary }]) => {
                const operationId = encodeOperationId(path, method);

                return (
                  <li
                    key={operationId}
                    className="group relative flex items-center gap-x-6 rounded-lg hover:bg-gray-50"
                  >
                    <div
                      className={clsx(
                        'flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white',
                        Method[method as keyof Path]?.className,
                      )}
                    >
                      {/* <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" /> */}
                      {method}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`operations/${operationId}`}
                        className="font-semibold text-gray-900"
                      >
                        {path}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600 truncate">{summary}</p>
                    </div>
                  </li>
                );
              }),
            )}
          </ul>
        </div>
        <div className="col-span-3 p-6">
          <div className="h-full rounded-3xl ring-1 ring-gray-200">
            <Outlet context={spec} />
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = 'Specification';
