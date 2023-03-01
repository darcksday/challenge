// @material-tailwind/react components
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logopng from "../../assets/img/logo2.png";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialMedia = [
    {
      icon: "fab fa-twitter",
      color: "text-light-blue-400",
      link: "",
    },
    {
      icon: "fab fa-github",
      color: "text-gray-900",
      link: "",
    },
    {
      icon: "fab fa-discord",
      color: "text-blue-700",
      link: "",
    },
  ];

  const usefulLink = [
    {
      name: "Main Features",
      link: "#",
    },
    {
      name: "Roadmap",
      link: "#",
    },
    {
      name: "Community",
      link: "#/creativetimofficial?ref=material-tailwind",
    },
  ];

  const resources = [
    {
      name: "Terms & Conditions",
      link: "#",
    },
    {
      name: "Privacy Policy",
      link: "#",
    },
    {
      name: "Whitepaper",
      link: "#",
    },
  ];

  return (
    <footer className="bg-gray-100 flex z-[11] pt-6 pb-6 text-[#1A237E]">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full px-4 md:w-4/12 -mt-[7px]">
            <Link to={'/'} className="flex  mr-4 ">
              <img className="h-[3.8rem] mr-2 w-auto " src={logopng} alt="Challenge"/>
            </Link>
            <Typography
              variant="small"
              color="inherit"
              className="mt-0 mb-2  font-normal opacity-60"
            >
              © Made by ATOMIC-LAB.IO
            </Typography>
            <div>
              {socialMedia.map(({ icon, color, link }, key) => (
                <a key={key} href={link} target="_blank" rel="noreferrer">
                  <i
                    className={`${icon} ${color} font-lg align-center mr-2 inline-block items-center justify-center rounded-full bg-white p-3 text-center shadow-lg outline-none focus:outline-none`}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="w-full px-4 md:w-8/12">
            <div className="items-top  flex flex-wrap">
              <div className="w-6/12 pt-6 md:ml-auto md:px-4 md:pt-0 xl:w-4/12">
                <span className="mb-2 block text-lg font-bold text-[#1A237E]">
                  Links
                </span>
                <ul className="list-unstyled">
                  {usefulLink.map(({ name, link }, key) => (
                    <li key={key}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="block pb-2 text-sm font-normal text-[#1A237E]/60"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-4/12">
                <span className="mb-2 block text-lg font-bold text-[#1A237E]">
                 Support & Terms
                </span>
                <ul className="list-unstyled">
                  {resources.map(({ name, link }, key) => (
                    <li key={key}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="block pb-2 text-sm font-normal text-[#1A237E]/60"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
