/* eslint-disable @next/next/no-img-element */

// @material-tailwind/react components
import { Button, Typography } from "@material-tailwind/react";

// page components
import logo1 from '/src/assets/img/purple.png';
import logo2 from '/src/assets/img/color-palette.png';
import { CodePreview } from "../cards/code-preview";

export const SectionPrice = () => {
  return (
    <section className="py-24">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 md:w-6/12">
          <CodePreview
            code={``}
          />
          <img
            className="absolute -bottom-28 w-full md:top-36 md:-right-24 md:bottom-auto lg:top-24 lg:-left-52"
            src={logo1}
            alt="tailwind_blob_purple"
          />
          <img
            className="absolute top-10 right-6 z-30 w-1/2 md:-top-10 md:-right-10"
            src={logo2}
            alt="tailwind_colors_pallet"
          />
        </div>
        <div className="relative order-first w-full px-4 md:order-last md:w-6/12">
          <div className="md:ml-7 lg:ml-24 lg:w-2/3">
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
                Price P2P
              </Typography><br/>
              Predictions
            </Typography>
            <Typography className="text-lg text-[#1A237E]/60 lg:pr-2">
              Price Prediction bets on crypto prices <b>Initiator</b>. <b>Oracle </b>
              (guarantor) - trusted person who determines the winner or draw and get fee
              at the expiration date.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
