import { Button, Card, Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';
import SectionFeatures from '../components/sections/features';
import { SectionCustom } from '../components/sections/custom';
import { Link } from "@mui/material";


import compHeaderImg from '/src/assets/img/components-header.png';
import compFooter from '/src/assets/img/pre-footer.jpg';
import { SectionCommnunity } from "../components/sections/community";
import { SectionPrice } from "../components/sections/price";
import { SectionPool } from "../components/sections/pool";
import { SectionSports } from "../components/sections/sports";
import { SectionChat } from "../components/sections/chat";
import { RoadmapSection } from "../components/sections/roadmap";
import SectionTech from "../components/sections/tech";

export const Home = () => {

  let roadmap = {
    title: "Roadmap",
    desc: `We started development process this year and now we have a clear vision
     how to make ZomLand the best NFT game ever.`,
    sections: [
      {
        date: "Q4, 2022",
        title: "BetMe Idea",
        desc: "Prepare codebase,  logic and idea.",
        type: "past",
      },
      {
        date: "Q1, 2023",
        title: "BetME Alpha",
        desc: "Create website landing.Launch  Custom ,Price Prediction bets and Chat . Support Eth-compatible networks.  Start Testnet. ",
        type: "past",
      },

      {
        date: "Q1 may, 2023",
        title: "BetME V1.1",
        desc: "Integrate Account Abstraction, Gelato Relay ERC2771, 1Balance, bets with stable",
        type: "soon",
      },


      {
        date: "Q1-may, 2023",
        title: "BetME V1.2",
        desc: "Add ability to bet for more assets,real-world events,sport etc.",
        type: "incomming",
      },

      {
        date: "Q2, 2023",
        title: "BetME V2",
        desc: "Launching pool bets, with dynamic coefficient and unlimited participants",
        type: "incomming",
      },

      {
        date: "Q2, 2023",
        title: "BetME V2",
        desc: "Dynamic automated events (sources of information for Oracle setup manually)",
        type: "incomming",
      },

    ],
  };


  return (<>
      <div className="h-[70vh] pt-[25px]  bg-[url('/src/assets/img/bg-header.jpg')]  bg-cover bg-center bg-no-repeat ">
        <div className="relative z-50 h-fit ">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="mt-48 w-full px-4 md:w-8/12 lg:mt-4 lg:w-5/12">
                <div className="w-full max-w-full sm:my-auto md:w-5/6 md:flex-none lg:w-1/2">
                </div>
                <Typography
                  variant="h1"
                  className="mb-2 font-black tracking-normal text-[#1A237E]"
                >
                  BetMe
                </Typography>
                <Typography variant="lead" className="mb-6 text-lg  text-[#1A237E]/60 lg:pr-12">
                  BetMe is is a decentralised, peer-to-peer prediction market, giving you the freedom to bet: how much you want, all at you
                  want and against whom you want

                </Typography>
                <div className="flex flex-col-reverse gap-2 lg:flex-row">
                  <Link to={'/custom'}>


                    <Button variant="gradient" className="h-full w-full">
                      To Market
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden px-4 pt-24 mr-10 md:pt-0 lg:block">


                <iframe width="600" height="400" src="https://www.youtube.com/embed/xP4St4Q5GAg" title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Card
        shadow={false}
        className="mx-6  bg-white md:mx-12 -mt-20 bg-white md:mx-12 md:-mt-[10rem]"
      >
        <div className="container z-20 mx-auto px-4">
          <SectionFeatures/>
          <SectionCustom/>
          <SectionPrice/>
          <SectionChat/>
          <SectionPool/>
          <SectionSports/>
          <SectionTech/>
          {/*<SectionTestimonials/>*/}


          <section>


            <div className="mx-auto mb-24 w-full text-center md:w-3/4 lg:w-1/2">
              <Typography
                variant="h2"
                className="mb-2 font-semibold tracking-normal text-[#1A237E]"
              >
                Roadmap
              </Typography>
              {/*<Typography variant="lead" className="mb-2 text-lg  text-[#1A237E]/60">*/}
              {/*  BetMe stands out from conventional betting platforms with its unique advantages and distinguishing features.*/}
              {/*</Typography>*/}
            </div>
            <div className="relative wrap overflow-hidden h-full">
              <div className="left-1/2 border-dashed absolute border-opacity-30 border-blue-200 h-full border hidden sm:block"></div>
              {roadmap.sections.map((section, index) => (
                <RoadmapSection
                  key={index}
                  index={index}
                  date={section.date}
                  title={section.title}
                  desc={section.desc}
                  type={section.type}
                />
              ))}
            </div>
          </section>

          {/*<SectionComponents />*/}
          {/*<SectionFramework />*/}

          {/*<SectionTestimonials/>*/}
          <SectionCommnunity/>

        </div>
        <img
          className="absolute bottom-0 w-full md:-bottom-40"
          src={compFooter}
          alt="bubbles"
        />
      </Card>

    </>
  );
}
