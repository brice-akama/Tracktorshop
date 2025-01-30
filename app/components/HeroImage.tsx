import Image from 'next/image';
import { imagePaths } from '../../utils/images';

const HeroImage = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[300px] md:h-[500px] lg:h-[650px]">
      {/* Hero Image */}
      <Image
    src={imagePaths.hero} // Using the path from utils/images.ts
    alt="Hero Image"
    fill // Replaces layout="fill"
    className="absolute top-0 left-0 object-cover object-top" // Use Tailwind CSS classes for objectFit and objectPosition
    priority // Ensures the image loads quickly for better user experience
  />
    </div>
  );
};

export default HeroImage;




