// @material-tailwind/react components
import { Typography, Button } from "@material-tailwind/react";
import logo1 from '/src/assets/img/blue.png';
import screen1 from '/src/assets/img/screens/comunication.png';
import { Link } from "react-router-dom";

export const SectionChat = () => {

  return (
    <section className="py-24">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full px-4 lg:w-5/12">
          <Typography
            variant="h2"
            className="mb-2 font-black tracking-normal text-[#1A237E]"
          ><Typography
            as="span"
            variant="h2"
            color="blue"
            className="inline-block font-black tracking-normal"
            textGradient
          >
            Communication
          </Typography>{" "}
            <br/>
            with Opponent

          </Typography>
          <Typography variant="lead" className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
            We integrated chat Using XMTP - open protocol for secure web3 messaging. Keep in touch with participants
          </Typography>
        </div>
        <div className="relative mt-10 w-full px-4 md:w-8/12 lg:mt-0 lg:w-6/12">

          <img className="rounded-lg" src={screen1} alt=''/>
          <img
            className="absolute -bottom-16 w-full md:bottom-auto md:top-24 md:-right-40"
            src={logo1}
            alt="tailwind_blob_blue"
          />
          <div
            className="top-12 right-6 md:-top-12 md:-right-10  absolute  z-30 flex  rounded-lg  shadow-2xl  w-[37%] ">
          </div>
        </div>
      </div>
    </section>
  );
}
