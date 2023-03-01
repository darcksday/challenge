// @material-tailwind/react components
import { Typography } from "@material-tailwind/react";
import { Feature } from '../cards/feature';

// page components

export default function SectionFeatures() {
  const features = [
    {
      icon: "group",
      title: "P2P",
      desc: "Allows players to place bets on their own conditions and terms.       ",
    },
    {
      icon: "currency_exchange",
      title: "No Fees && Delays",
      desc: "Pay for transactions only and get your winnings instantly.",
    },
    {
      icon: "grid_view",
      title: "Decentralized",
      desc: "Decentralized and transparent. No third party interference.       ",
    },
    {
      icon: "shield",
      title: "Privacy",
      desc: "No personal information required. No KYC required.        ",
    },
  ];

  return (
    <section className="py-10 lg:py-20">
      <div className="mx-auto mb-24 w-full text-center md:w-3/4 lg:w-1/2">
        <Typography
          variant="h2"
          className="mb-2 font-semibold tracking-normal text-[#1A237E]"
        >
          Main Features
        </Typography>
        <Typography variant="lead" className="mb-2 text-lg  text-[#1A237E]/60">
          BetMe stands out from conventional betting platforms with its unique advantages and distinguishing features.
        </Typography>
      </div>
      <div className="flex flex-row flex-wrap content-center">
        {features.map(({ icon, title, desc }, key) => (
          <div
            key={key}
            className="mb-12 w-full max-w-full px-3 sm:w-1/2 sm:flex-none lg:mb-0 xl:mb-0 xl:w-1/4"
          >
            <Feature icon={icon} title={title}>
              {desc}
            </Feature>
          </div>
        ))}
      </div>
    </section>);
}
