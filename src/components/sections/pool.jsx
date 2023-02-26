// @material-tailwind/react components
import { Chip, Typography } from "@material-tailwind/react";

// page components
import logo1 from '/src/assets/img/purple.png';
import { CodePreview } from "../cards/code-preview";

export const SectionPool = () => {
  return (
    <section className="py-24">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 md:w-6/12">
          <CodePreview
            code={`//TO BE CONTINUED
                   //IN CODE WE TRUST `}
          />
          <img
            className="absolute -bottom-28 w-full md:top-36 md:-right-24 md:bottom-auto lg:top-24 lg:-left-52"
            src={logo1}
            alt="tailwind_blob_purple"
          />
        </div>
        <div className="relative order-first w-full px-4 md:order-last md:w-6/12">
          <div className="md:ml-7 lg:ml-24 lg:w-2/3">
            <Chip
              variant="gradient"
              value="Roadmap"
              className="mb-8 rounded-full from-[#191919] to-[#42424a]"
            />




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
                Pool
              </Typography>{" "}<br/>
              Bets and Events

            </Typography>
            <Typography variant="lead" className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
              Players bet on their predicted outcomes and all stakes go into a <b>Single Pool</b>. The pool is distributed to the winners.
              The coefficient are dynamic and depend on the number of players and the amount their bets.
              .</Typography>

          </div>
        </div>
      </div>
    </section>
  );
}
