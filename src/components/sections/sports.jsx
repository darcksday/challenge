// @material-tailwind/react components
import { Typography, Chip } from "@material-tailwind/react";
import logo1 from '/src/assets/img/blue.png';
import { CodePreview } from "../cards/code-preview";

export const SectionSports = () => {

  return (
    <section className="py-24">
      <div className="flex flex-wrap items-center">
        <div className="w-full px-4 lg:w-5/12">
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
              Sports
            </Typography><br/>
            Predictions
          </Typography>
          <Typography variant="lead" className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
            Players bet on sport events and all stakes go into a <b>Single Pool</b> of this event. The winner determined automatically by
            Decentralized Oracle.
            The coefficient are dynamic and depend on the number of players and the amount their bets.
          </Typography>

        </div>
        <div className="relative mt-10 w-full px-4 md:w-8/12 lg:mt-0 lg:w-6/12">

          <CodePreview
            code={`//TO BE CONTINUED
                   //IN CODE WE TRUST `}
          />

          <img
            className="absolute -bottom-16 w-full md:bottom-auto md:top-24 md:-right-40"
            src={logo1}
            alt="tailwind_blob_blue"
          />
        </div>
      </div>
    </section>
  );
}
