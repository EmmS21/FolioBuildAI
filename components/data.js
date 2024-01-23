import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Projects ideas",
  desc: "Get access to over 1000 projects to build ranked from easy to challenging",
  image: benefitOneImg,
  bullets: [
    {
      title: "What problem are you solving",
      desc: "Get a breakdown of the problem you are solving.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Real World Problem",
      desc: "You are not building todo lists, you are building to solve a real problem.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Problems by category",
      desc: "Choose a problem related to the industry you want to work in.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Tickets",
  desc: "Projects are broken down into tickets for each feature you will need to build, simulating a real work environment and giving you a structure to follow.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Test Driven Development",
      desc: "For each feature recevie a breakdown of tests you will need to implement.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Story points",
      desc: "Each ticket includes story points estimating its complexity.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Troubleshooting",
      desc: "Each ticket includes links to resources to help you understand what you are doing. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
