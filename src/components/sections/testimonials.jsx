/* eslint-disable @next/next/no-img-element */

// @material-tailwind/react components
import { Typography } from "@material-tailwind/react";
import { Testimonial } from '../cards/testimonial';
import logo1 from '/src/assets/img/logos/logo-amazon.webp';
import logo2 from '/src/assets/img/logos/logo-ibm.webp';
import logo3 from '/src/assets/img/logos/logo-microsoft.webp';
import logo4 from '/src/assets/img/logos/logo-cisco.webp';
import logo5 from '/src/assets/img/logos/logo-vodafone.webp';

// page components

export default function SectionTestimonials() {
  return (
    <section className="py-10 md:py-24">
      <div className="mx-auto w-full text-center md:w-1/2">
        <Typography
          variant="h2"
          className="mb-2 font-black tracking-normal text-[#1A237E]"
        >
          Trusted by over <br/>
          <Typography
            as="span"
            variant="h2"
            color="blue"
            className="inline-block font-black tracking-normal"
            textGradient
          >
            1,855,822+ web developers
          </Typography>
        </Typography>
        <Typography variant="lead" className="text-lg text-[#1A237E]/60">
          Many Fortune 500 companies, startups, universities and governmental
          institutions love Creative Tim&apos;s products.
        </Typography>
      </div>
      <div className="mt-10 flex flex-wrap items-center">
        <div className="w-full md:w-1/2 md:px-4 lg:w-1/3">
          <Testimonial name="Nick Willever" date="1 day ago">
            &quot;This is an excellent product, the documentation is excellent
            and helped me get things done more efficiently.&quot;
          </Testimonial>
        </div>
        <div className="w-full md:w-1/2 md:px-4 lg:w-1/3">
          <Testimonial color="blue" name="Shailesh Kushwaha" date="1 week ago">
            &quot;I found solution to all my design needs from Creative Tim. I
            use them as a freelancer in my hobby projects for fun! And its
            really affordable, very humble guys !!!&quot;
          </Testimonial>
        </div>
        <div className="w-full md:w-1/2 md:px-4 lg:w-1/3">
          <Testimonial name="Samuel Kamuli" date="3 weeks ago">
            &quot;Great product. Helped me cut the time to set up a site. I used
            the components within instead of starting from scratch. I highly
            recommend for developers who want to spend more time on the
            backend!.&quot;
          </Testimonial>
        </div>
        <div className="mt-16 flex items-center lg:mx-auto">
          <div className="mr-8 w-full px-12 md:w-1/5 md:px-4">
            <img
              className="w-auto"
              src={logo1}
              alt="tailwind_logo_amazon"
            />
          </div>
          <div className="mr-8 w-full px-12 md:w-1/5 md:px-4">
            <img
              className="w-auto"
              src={logo2}
              alt="tailwind_logo_ibm"
            />
          </div>
          <div className="mr-8 w-full px-12 md:w-1/5 md:px-4">
            <img
              className="w-auto"
              src={logo3}
              alt="tailwind_logo_microsoft"
            />
          </div>
          <div className="mr-8 w-full px-12 md:w-1/5 md:px-4">
            <img
              className="w-auto"
              src={logo4}
              alt="tailwind_logo_cisco"
            />
          </div>
          <div className="w-full px-12 md:w-1/5 md:px-4">
            <img
              className="w-auto"
              src={logo5}
              alt="tailwind_logo_vodafone"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
