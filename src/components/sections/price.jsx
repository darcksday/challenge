/* eslint-disable @next/next/no-img-element */

// @material-tailwind/react components
import { Button, Typography } from "@material-tailwind/react";

// page components
import logo1 from '/src/assets/img/blue.png';
import screen1 from '/src/assets/img/screens/price.png';
import screen2 from '/src/assets/img/screens/price_create.png';
import { Link } from "react-router-dom";

export const SectionPrice = () => {
  return (
    <section className="py-24">
      <div className="flex flex-wrap justify-between items-center">
        <div className="relative w-full px-4 md:w-6/12">
          <img className="rounded-lg" width="612" src={screen1} alt=''/>

          <img
            className="absolute -bottom-28 w-full md:top-36 md:-right-24 md:bottom-auto lg:top-24 lg:-left-52"
            src={logo1}
            alt="tailwind_blob_purple"
          />
          <img
            className="absolute rounded-lg top-10 right-6 z-30 w-1/2 md:-top-10 md:-right-10 shadow-2xl"
            src={screen2}
            alt=""
          />
        </div>
        <div className="relative order-first w-full px-4 md:order-last md:w-6/12">
          <div className="md:ml-7 lg:ml-24 ">
            <Typography
              variant="h2"
              className="mb-2 font-black tracking-normal text-[#1A237E]"
            >
              <Typography
                as="span"
                variant="h2"
                color="blue"
                className="inline-block font-black tracking-normal"
                textGradient
              >
                Price
              </Typography><br/>
              Predictions
            </Typography>
            <Typography variant="lead" className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
              P2P crypto Price Predictions - are created, configured by the <b>Initiator</b>. <b> RedStone Price Feeds</b> are used to
              determine
              the winner. Funds are distributed automatically when the expiration arrives. Coefficient is static and is set by
              the <b>Initiator</b>
            </Typography>
            <Link to={'/price'}>
              <Button>To Market</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
