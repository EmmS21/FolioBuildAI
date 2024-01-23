import Image from "next/image";
import Container from "./container";
import heroImg from "../public/img/hero.png";
import AuthModal from "./authModal";

const Hero = ({ showAuthModal, setShowAuthModal }) => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Build your portfolio with projects solving real world problems.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            Explore a curated list of projects, graded by difficulty, to build an impressive portfolio and stand out when applying for dev jobs. Each project is broken down into actionable steps, providing a hands-on, real-world coding experience.</p>
            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                target="_blank"
                rel="noopener"
                onClick={()=> setShowAuthModal(true)}
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Start Building
              </a>
              <a
                rel="noopener"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <svg
                  role="img"
                  width="20"
                  height="20"
                  className="w-10 h-5"
                  viewBox="0 0 50 24"
                  fill="#808080"
                  xmlns="http://www.w3.org/2000/svg">
                  <text x="2" y="20" font-size="17" font-family="Arial" font-weight="bold">
                    Price:
                  </text>
                </svg>
                <span>$10/Month</span>
              </a>

            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Build projects related to these industries
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <FinTechLogo />
            </div>
            <div className="text-gray-400 dark:text-gray-400">
              <CleanTechLogo />
            </div>
            <div className="text-gray-400 dark:text-gray-400">
              <EdTechLogo />
            </div>
            <div className="pt-1 text-gray-400 dark:text-gray-400">
              <SportsTechLogo />
            </div>
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <HealthTechLogo />
            </div>
          </div>
        </div>
      </Container>
      { showAuthModal && 
        <AuthModal setShowAuthModal={setShowAuthModal}/>  
    }
    </>
  );
}

function FinTechLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="33"
      fill="#808080"  
      viewBox="0 0 110 33">
      <text x="0" y="20" font-size="20" font-family="Arial" font-weight="bold">
        FinTech
      </text>
    </svg>
  );
}


function EdTechLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="33"
      fill="#808080"  
      viewBox="0 0 110 33">
      <text x="0" y="20" font-size="20" font-family="Arial" font-weight="bold">
        EdTech
      </text>
    </svg>
  );
}


function SportsTechLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="33"
      fill="#808080"  
      viewBox="0 0 110 33">
      <text x="0" y="20" font-size="20" font-family="Arial" font-weight="bold">
        SportsTech
      </text>
    </svg>
  );
}

function HealthTechLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="33"
      fill="#808080"  
      viewBox="0 0 110 33">
      <text x="0" y="20" font-size="20" font-family="Arial" font-weight="bold">
        HealthTech
      </text>
    </svg>
  );
}

function CleanTechLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="33"
      fill="#808080"  
      viewBox="0 0 110 33">
      <text x="0" y="20" font-size="20" font-family="Arial" font-weight="bold">
        CleanTech
      </text>
    </svg>
  );
}

export default Hero;