import  { useRef, useState } from 'react';
import education1 from '../../../assets/online-education-1.png';
import education2 from '../../../assets/online-education-2.png';
import education3 from '../../../assets/online-education-3.png';
import { Link } from 'react-router-dom';
import HeadSectionHome from '../../../components/headSectionHome/HeadSectionHome';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png'

export default function Contact() {
  const { t, i18n } = useTranslation();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setIsLoading(false);
          toast.success('Your message has been sent successfully!');
          form.current.reset();
        },
        (error) => {
          setIsLoading(false);
          toast.error(error);
          toast.error('System Error, try again later');
        }
      );
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us</title>
        <meta name="description" content="contact us page" />
        <meta name="keywords" content="contact us, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <section className="bg-learning h-[500px] bg-no-repeat bg-cover bg-center bg-fixed">
        <div className="text-center flex flex-col items-center justify-center bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-60 h-full">
          <h3 className="sm:text-7xl text-4xl font-semibold text-gray-900 dark:text-white animate__backInDown animate__animated animate__delay-1/2s">
            {t('contact')}{' '}
            <span className="text-blue-500 dark:text-blue-700">
              {i18n.language === 'en' ? 'Us' : ''}
            </span>
          </h3>
          <span className="mt-10 flex gap-10 items-center">
            <Link
              to="/"
              className="text-xl text-gray-900 dark:text-white animate__backInUp animate__animated animate__delay-1/2s"
            >
              {t('home')}
            </Link>
            <span className="text-xl text-white font-semibold"> | </span>
            <Link
              to="/contact"
              className="text-lg md:text-xl text-blue-500 dark:text-blue-700 font-bold px-4 py-2 animate__backInDown animate__animated animate__delay-1/2s"
            >
              {t('contact')}
            </Link>
          </span>
        </div>
      </section>

      <section className=" bg-white dark:text-white dark:bg-gray-900  selection:bg-opacity-30 selection:bg-gray-400 dark:selection:bg-gray-700">
        <div className="container m-auto px-5 md:p-16">
          <HeadSectionHome title={t('question')} />
          <div className="flex flex-wrap justify-center my-10 gap-10">
            <div className="shadow-lg p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:border-2 hover:border-gray-600 dark:hover:border-gray-400 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 overflow-hidden rounded-md w-full md:w-[calc((100%/2)-2.5rem)] xl:w-[calc((100%/3)-2.5rem)]">
              <div>
                <img src={education1} alt="Phone" className="m-auto" />
              </div>
              <div className="*:mt-5 p-6 text-center">
                <h3 className="text-2xl font-semibold">Phone Number</h3>
                <p className="text-gray-500 dark:text-gray-400 pb-4">
                  Phone : +88 (0) 101 0000 000
                </p>
              </div>
            </div>
            <div className="shadow-lg p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:border-2 hover:border-gray-600 dark:hover:border-gray-400 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 overflow-hidden rounded-md w-full md:w-[calc((100%/2)-2.5rem)] xl:w-[calc((100%/3)-2.5rem)]">
              <div>
                <img src={education3} alt="Address" className="m-auto" />
              </div>
              <div className="*:mt-5 p-6 text-center">
                <h3 className="text-2xl font-semibold">Address</h3>
                <p className="text-gray-500 dark:text-gray-400 pb-4">
                  75/23 Folsom Ave, Suite 600 San Francisco, CA 94107
                </p>
              </div>
            </div>
            <div className="shadow-lg p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:border-2 hover:border-gray-600 dark:hover:border-gray-400 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 overflow-hidden rounded-md w-full md:w-[calc((100%/2)-2.5rem)] xl:w-[calc((100%/3)-2.5rem)]">
              <div>
                <img src={education2} alt="Email" className="m-auto" />
              </div>
              <div className="*:mt-5 p-6 text-center">
                <h3 className="text-2xl font-semibold">Email Address</h3>
                <p className="text-gray-500 dark:text-gray-400 pb-4">
                  info@yourdomain.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-screen-xl m-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full">
              <form
                className="bg-white dark:bg-gray-800 p-8 shadow-md rounded-lg"
                ref={form}
                onSubmit={sendEmail}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-2"
                    htmlFor="name"
                  >
                    {t('name-contact')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-2"
                    htmlFor="email"
                  >
                    {t('email-contact')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-2"
                    htmlFor="message"
                  >
                    {t('message-contact')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 dark:bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition"
                >
                  {isLoading ? (
                    <p className="animate-pulse">Sending...</p>
                  ) : (
                    t('send-message')
                  )}
                </button>
              </form>
            </div>
          </div>
            <div className="mt-4 ">
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <i className="fa-brands fa-square-facebook text-3xl"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400"
                >
                  <i className="fa-brands fa-square-x-twitter text-3xl"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  <i className="fa-brands fa-square-instagram text-3xl"></i>
                </a>
              </div>
            </div>
        </div>
      </section>
    </>
  );
}
