// @material-tailwind/react components
import { Button, Chip, Typography } from "@material-tailwind/react";
import { CodePreview } from "../cards/code-preview";
import logo1 from "../../assets/img/blue.png";
import screen1 from "../../assets/img/screens/tech.png";
import react from "../../assets/img/logos/react.png";
import gelato from "../../assets/img/logos/gelato.png";
import redstone from "../../assets/img/logos/redstone.png";
import solidity from "../../assets/img/logos/solidity.png";
import zkSync from "../../assets/img/logos/zk-sync.png";
import { Link } from "@mui/material";


// page components

export default function SectionTech() {

  return (
    <section className="pb-10 lg:pb-20">
      <div className="mx-auto mb-24 w-full text-center md:w-3/4 lg:w-1/2">
        <Typography
          variant="h2"
          className="mb-2 font-semibold tracking-normal text-[#1A237E]"
        >
          How It Works
        </Typography>
      </div>


      <div className="flex flex-wrap  justify-between">
        <div className="w-full px-4 lg:w-5/12">

          <Typography variant="lead" className="mb-5 text-lg text-[#1A237E]/60 md:pr-10">
            To display current prices on the UI, we using the RedStone API. On the contract side, we
            implemented the RedStone Price Feed contracts to obtain current prices and close bets. The Gelato Web3 functions are responsible
            for generating and updating the redstonePayload (byte code required for the getPrice function) and control by the expiration
            of bets to determine the winner and distribute funds. Currently, this function is called and updates on-chain data every 24
            hours. Here is list of technologies was used:
          </Typography>
          <div className="mt-7 flex flex-wrap text-[#344767]">
            <div
              className="mr-6 w-16 cursor-pointer text-center"
            >
              <Link className="no-underline"
                    href="https://reactjs.org/"
              >
                <img className="mx-auto" width={36} src={react}/>
                <Typography className="mt-2 font-bold text-[#1A237E]">
                  React
                </Typography>
              </Link>
            </div>
            <div
              className="mr-6 w-16 cursor-pointer text-center"
            >
              <Link className="no-underline"
                    href="https://soliditylang.org/"
              >
                <img className="mx-auto" width={36} src={solidity}/>
                <Typography className="mt-2 font-bold text-[#1A237E]">
                  Solidity
                </Typography>
              </Link>
            </div>

            <div
              className="mr-6 w-16 cursor-pointer text-center"
            >
              <Link className="no-underline"
                    href="https://www.gelato.network/"
              >

                <img className=" mx-auto" width={36} src={gelato}/>
                <Typography className=" mt-2 font-bold text-[#1A237E]">
                  Gelato
                </Typography>
              </Link>
            </div>


            <div
              className="mr-6 w-16 cursor-pointer text-center"
            >

              <Link className="no-underline"
                    href="https://redstone.finance/"
              >

                <img className="mx-auto" width={36} src={redstone}/>
                <Typography className="mt-2 font-bold text-[#1A237E]">
                  Redstone
                </Typography>

              </Link>


            </div>
            <div className="relative mr-6 w-16 cursor-not-allowed text-center">
              <div className="opacity-50">
                <img className="mx-auto" width={36} src={zkSync}/>

              </div>
              <Chip
                value="soon"
                variant="gradient"
                className="absolute -top-3 rounded-full from-[#191919] to-[#42424a] py-1 px-2"
              />
              <Typography className="mt-2 font-bold text-[#1A237E]">
                ZkSync
              </Typography>
            </div>
          </div>

        </div>


        <div className="relative mt-10 w-full px-4 md:w-8/12 lg:mt-0 lg:w-6/12">

          <img className="rounded-lg" src={screen1} alt=''/>

          <img
            className="absolute -bottom-16 w-full md:bottom-auto md:top-24 md:-right-40"
            src={logo1}
            alt="tailwind_blob_blue"
          />
        </div>
      </div>

    </section>)
    ;
}
