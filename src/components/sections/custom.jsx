// @material-tailwind/react components
import { Typography, Button } from "@material-tailwind/react";
import logo1 from '/src/assets/img/blue.png';
import { useState } from "react";
import { CodePreview } from "../cards/code-preview";

export const SectionCustom = () => {
  const [buttonCode, setButtonCode] = useState(null);

  return (
    <section className="py-24">
      <div className="flex flex-wrap items-center">
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
          <Typography className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
            Any p2p events are created , configured and described in detail by the <b>Initiator</b>. <b>Oracle </b>
            (guarantor) - trusted person who determines the winner or draw and get fee
            at the expiration date.</Typography>
          <a>
            <Button>Get Started</Button>
          </a>
        </div>
        <div className="relative mt-10 w-full px-4 md:w-8/12 lg:mt-0 lg:w-6/12">

          <CodePreview
            code={`import { Button } from "@material-tailwind/react";
                  
${buttonCode}
`}
          />

          <img
            className="absolute -bottom-16 w-full md:bottom-auto md:top-24 md:-right-40"
            src={logo1}
            alt="tailwind_blob_blue"
          />
          <div
            className="bg-dark absolute top-44 right-11 z-30 flex h-40 w-[13rem] rounded-lg bg-white/60 shadow-2xl shadow-blue-gray-500/20 backdrop-blur-2xl backdrop-saturate-200 md:top-14 md:-right-24 md:h-56 md:w-80 lg:top-20">
          </div>
        </div>
      </div>
    </section>
  );
}
