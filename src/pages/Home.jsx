import { Card } from '@material-tailwind/react';
import SectionFeatures from '../components/sections/features';
import { SectionButton } from '../components/sections/button';
import SectionShadow from '../components/sections/shadow';
import SectionTestimonials from '../components/sections/testimonials';

export const Home = () => {
  return (<>
      <div className="h-screen min-h-screen  bg-cover bg-center bg-no-repeat">
        <div className="relative z-50 h-fit py-20 lg:py-32">
          <div className="container mx-auto px-4">
          </div>
        </div>
      </div>

      <Card
        shadow={false}
        className="mx-6 -mt-20 bg-white md:mx-12 md:-mt-48"
      >
        <div className="container z-20 mx-auto px-4">
          <SectionFeatures />
          <SectionButton />
          <SectionShadow />
          <SectionTestimonials />
        </div>
        <img
          className="absolute bottom-0 w-full md:-bottom-40"
          src="/src/assets/img/pre-footer.jpg"
          alt="bubbles"
        />
      </Card>

    </>
  );
}
