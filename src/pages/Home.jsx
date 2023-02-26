import { Button, Card, Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';
import SectionFeatures from '../components/sections/features';
import { SectionCustom } from '../components/sections/custom';
import SectionTestimonials from '../components/sections/testimonials';
import { Link } from "@mui/material";


import compHeaderImg from '/src/assets/img/components-header.png';
import compFooter from '/src/assets/img/pre-footer.jpg';
import { SectionCommnunity } from "../components/sections/community";
import { SectionPrice } from "../components/sections/price";
import { SectionPool } from "../components/sections/pool";
import { SectionSports } from "../components/sections/sports";
import { SectionChat } from "../components/sections/chat";

export const Home = () => {
  return (<>
      <div className="h-screen min-h-screen  bg-[url('/src/assets/img/bg-header.jpg')]  bg-cover bg-center bg-no-repeat ">
        <div className="relative z-50 h-fit ">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="mt-48 w-full px-4 md:w-8/12 lg:mt-4 lg:w-5/12">
                <div className="w-full max-w-full sm:my-auto md:w-5/6 md:flex-none lg:w-1/2">
                  <Tabs value="react" className="mb-6">
                    <TabsHeader
                      className="h-10 w-auto rounded-full border border-white/60 bg-white/60 shadow-2xl shadow-blue-gray-500/40 backdrop-blur-2xl backdrop-saturate-200"
                      indicatorProps={{
                        className: "rounded-full",
                      }}
                    >
                      <Tab
                        value="react"
                        className="p-0 font-normal text-[#1A237E]"

                      >
                        <i className="fab fa-react"/>
                        &nbsp;React
                      </Tab>
                      <Tab
                        value="html"
                        className="p-0 font-normal text-[#1A237E]"

                      >
                        <i className="fab fa-html5"/>
                        &nbsp;HTML
                      </Tab>
                    </TabsHeader>
                  </Tabs>
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
                  <Link
                    href="/docs/react/installation"
                  >
                    <Button variant="gradient" className="h-full w-full">
                      Get Started
                    </Button>
                  </Link>
                  <div
                    className="flex rounded-lg border border-white/60 bg-white/60 py-2.5 px-5 text-[#1A237E] shadow-2xl shadow-blue-gray-500/20 backdrop-blur-2xl backdrop-saturate-200">
                  </div>
                </div>
              </div>
              <div className="hidden w-full max-w-full px-4 pt-24 md:w-7/12 md:pt-0 lg:block">
                <img
                  src={compHeaderImg}
                  alt="components"
                  width={1000}
                  height={700}
                  className="aspect-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <Card
        shadow={false}
        className="mx-6  bg-white md:mx-12 -mt-20 bg-white md:mx-12 md:-mt-[18rem]"
      >
        <div className="container z-20 mx-auto px-4">
          <SectionFeatures/>
          <SectionCustom/>
          <SectionPrice/>
          <SectionChat/>
          <SectionSports/>
          <SectionPool/>

          {/*<SectionComponents />*/}
          {/*<SectionFramework />*/}

          <SectionTestimonials/>
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
