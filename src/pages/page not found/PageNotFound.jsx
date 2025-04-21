import favIcon from '../../assets/favicon.png';
import { Helmet } from 'react-helmet';

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Page not found</title>
        <meta name="description" content="cart page" />
        <meta name="keywords" content="cart, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">
            404
          </h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            We can`t find that page.
          </p>
        </div>
      </div>
    </>
  );
}
