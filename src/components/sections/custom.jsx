// @material-tailwind/react components
import { Typography, Button } from "@material-tailwind/react";
import logo1 from '/src/assets/img/blue.png';
import screen1 from '/src/assets/img/screens/custom_create.png';
import screen2 from '/src/assets/img/screens/custom_list.png';
import { Link } from "react-router-dom";

export const SectionCustom = () => {

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
            Custom P2P
          </Typography>{" "}
            <br/>
            Bets and Challenges

          </Typography>
          <Typography variant="lead" className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
            Any p2p events are created , configured and described in detail by the <b>Initiator</b>.Trusted person who determines the
            winner or draw at the expiration date - <b>Oracle</b>. Coefficient is static and is set by the <b>Initiator</b>
            .</Typography>
          <Link to={'/custom'}>
            <Button>To Market</Button>
          </Link>
        </div>
        <div className="relative mt-10 w-full px-4 md:w-8/12 lg:mt-0 lg:w-6/12">

          <img className="rounded-lg" src={screen2} alt=''/>
          <img
            className="absolute -bottom-16 w-full md:bottom-auto md:top-24 md:-right-40"
            src={logo1}
            alt="tailwind_blob_blue"
          />
          <div
            className="top-12 right-6 md:-top-12 md:-right-10  absolute  z-30 flex  rounded-lg  shadow-2xl  w-[37%] ">
            <img
              className="rounded-lg bg-dark bg-white/60 shadow-blue-gray-500/20 backdrop-blur-"
              src={screen1}
              alt="tailwind_blob_blue"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
