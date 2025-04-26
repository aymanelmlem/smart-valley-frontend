import inst from '../../../assets/Team-01.jpg';
import { Link } from 'react-router-dom';
import introVideo from '../../../assets/intoduction.mp4';
import IncludeUser from '../../../components/iclude/IncludeUser';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import favIcon from '../../../assets/favicon.png';
import ahmedHesham from '../../../assets/Ahmed hesiham.jpg';
import ahmedKhalid from '../../../assets/Ahmed khalid.png';
export default function About() {
  const { t, i18n } = useTranslation();
  const empImages = [
    {
      personImage: ahmedHesham,
      name: 'Ahmed Hesham',
      designation: 'Backend developer',
      facebookLink: 'https://www.facebook.com/profile.php?id=100018904051187',
      linkedinLink: 'https://www.linkedin.com/in/ahmed-khalid-5166b324b/',
    },
    {
      personImage: ahmedKhalid,
      name: 'Ahmed khalid',
      designation: 'Frontend developer',
      facebookLink: 'https://www.facebook.com/ahmad.okab.31',
      linkedinLink: 'https://www.linkedin.com/in/ahmed-hesham-a72454232/',
    },
  ];
  // const testimonials = [
  //   { quote: "This course has completely transformed my understanding of the subject. The instructors are top-notch, and the material is engaging.", author: "Sarah J., Computer Science Major" },
  //   { quote: "I loved the interactive components of the course. It made learning so much more enjoyable and effective.", author: "James M., Marketing Specialist" },
  //   { quote: "The support from the community and instructors was fantastic. I felt encouraged and motivated throughout.", author: "Emily R., Business Analyst" },
  //   { quote: "The practical assignments were incredibly helpful. They allowed me to apply what I learned in real-world scenarios.", author: "Michael K., Graphic Designer" },
  //   { quote: "An excellent course with a great balance between theory and practice. I would recommend it to anyone looking to upskill.", author: "Jessica L., HR Manager" },
  //   { quote: "I appreciated the flexibility of the course schedule. It allowed me to learn at my own pace and fit it into my busy life.", author: "David W., Financial Consultant" },
  //   { quote: "The course exceeded my expectations. The quality of the content and the professionalism of the instructors were outstanding.", author: "Olivia T., Software Developer" },
  //   { quote: "A well-structured course that offers a comprehensive view of the subject. I gained valuable insights and practical knowledge.", author: "Daniel S., Entrepreneur" },
  //   { quote: "The course was engaging and informative. The case studies and examples provided were very relevant and useful.", author: "Sophia B., Digital Marketer" },
  //   { quote: "I found the course material to be of high quality. The interaction with peers and instructors was a valuable part of the learning experience.", author: "Ethan H., Data Scientist" }
  // ];
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
        <meta name="description" content="about page" />
        <meta name="keywords" content="about, elearning, education" />
        <meta name="author" content="Elearning" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favIcon} />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-about h-[500px] bg-no-repeat bg-cover bg-fixed">
        <div className="absolute inset-0 bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-gray-900 dark:text-white ">
          <h1 className="text-4xl sm:text-5xl animate__backInDown animate__animated animate__delay-1/2s lg:text-6xl font-extrabold drop-shadow-lg">
            {t('about')}{' '}
            <span className=" text-blue-500 dark:text-blue-700 ">
              {i18n.language === 'en' ? 'Us' : ''}
            </span>
          </h1>
          <div className="mt-6 flex gap-4 md:gap-6 justify-center">
            <Link
              to="/"
              className="text-lg md:text-xl animate__backInUp animate__animated animate__delay-1/2s text-gray-900 dark:text-white hover:text-blue-300 transition duration-300 px-4 py-2"
            >
              {t('home')}
            </Link>
            <span className="text-lg md:text-xl text-gray-900 dark:text-white font-semibold">
              {' '}
              |{' '}
            </span>
            <Link
              to="/about"
              className="text-lg md:text-xl animate__backInDown animate__animated animate__delay-1/2s text-blue-500 dark:text-blue-700 font-bold px-4 py-2"
            >
              {t('about')}
            </Link>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16 bg-white dark:text-white dark:bg-gray-900 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <i className="fa-solid fa-book-open text-6xl "></i>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            {t('title History')}
          </h2>
          <p className=" md:text-lg lg:text-xl md:px-16 mt-4 text-gray-500 dark:text-white">
            {t('history')}
          </p>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-16 bg-white  dark:text-white dark:bg-gray-900 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-wrap justify-center gap-8 ">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc((100%/2)-1rem)] lg:w-[calc((100%/3)-2rem)] px-4 "
              >
                <div className="overflow-hidden  rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={inst}
                    alt="Our Team"
                    className="w-full h-full object-cover bg-gray-800"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Got Here Section */}
      <section className="py-16 bg-gray-50 dark:text-white dark:bg-gray-800 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <i className="fa-solid fa-film text-6xl "></i>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            {t('title offer')}
          </h2>
          <p className=" md:text-lg lg:text-xl md:px-16 mt-4 text-gray-500 dark:text-white">
            {t('body offer')}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <video
                src={introVideo}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white dark:text-white dark:bg-gray-900 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <i className="fa-solid fa-users text-6xl "></i>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            {t('Our Team')}
          </h2>
          <p className="text-gray-500 dark:text-white md:text-lg lg:text-xl md:px-16 mt-4">
            {t('body Team')}
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {empImages.map((emp, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc((100%/3)-1rem)] lg:w-[calc((100%/4)-1rem)] px-4"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                  <img
                    onClick={() => window.open(emp.personImage)}
                    src={emp.personImage}
                    alt={`Team Member ${index + 1}`}
                    className="w-24 h-24 cursor rounded-full mx-auto  border-4 border-indigo-600 shadow-md"
                  />
                  <h3 className="text-xl  font-semibold my-2 text-gray-800 dark:text-gray-200">
                    {emp.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic mb-4">
                    {emp.designation}
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    {emp.facebookLink && (
                      <a
                        href={emp.facebookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform duration-200"
                        aria-label="Facebook"
                      >
                        <i className="fa-brands fa-square-facebook text-3xl"></i>
                      </a>
                    )}
                    {emp.linkedinLink && (
                      <a
                        href={emp.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform duration-200"
                        aria-label="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin text-3xl"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50 dark:text-white dark:bg-gray-800 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <i className="fa-solid fa-bullseye text-6xl "></i>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            {t('Mission')}
          </h2>
          <p className="text-gray-500 dark:text-white md:text-lg lg:text-xl md:px-16 mt-4">
            {t('body mission')}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:text-white dark:bg-gray-800 selection:bg-blue-400 selection:bg-opacity-30">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <i className="fa-solid fa-handshake text-6xl "></i>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            {t('values')}
          </h2>
          <p className="text-gray-500 dark:text-white md:text-lg lg:text-xl md:px-16 mt-4">
            {t('body value')}
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className='py-16 bg-white dark:text-white dark:bg-gray-900 selection:bg-blue-400 selection:bg-opacity-30'>
        <div className="container mx-auto px-4 md:px-12 text-center">
          <i className="fa-solid fa-quote-left text-6xl "></i>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>{t("Testimonials")}</h2>
          <p className="mt-4 leading-relaxed text-gray-500 dark:text-white">
            {t("Testimonials body")}
          </p>
          <div className="grid h-56   sm:h-64 xl:h-80 2xl:h-96"> 
            <Carousel
              leftControl={<div className='bg-gray-900 w-10 h-10 flex justify-center items-center rounded-full shadow'><i class="fa-solid text-white fa-angle-left text-2xl"></i></div>} 
              rightControl={<div className='bg-gray-900 w-10 h-10 flex justify-center items-center rounded-full shadow'><i class="fa-solid text-white fa-angle-right text-2xl"></i></div>}
              >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md  w-full  md:w-1/2 shadow-md "> 
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">{testimonial.author}</p>
                    <p className="mt-4 leading-relaxed text-gray-700 dark:text-white">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <IncludeUser />
    </>
  );
}
