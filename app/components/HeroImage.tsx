import Image from 'next/image';
import { imagePaths } from '../../utils/images';

const HeroImage = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[300px] md:h-[500px] lg:h-[650px]">
      {/* Hero Image */}
      <Image
        src={imagePaths.hero} // Using the path from utils/images.ts
        alt="Hero Image"
        layout="fill" // Fills the container
        objectFit="cover" // Ensures the image covers the container without distortion
        objectPosition="top center" // Focus on the top of the image for smaller screens
        className="absolute top-0 left-0"
        priority // Ensures the image loads quickly for better user experience
      />
    </div>
  );
};

export default HeroImage;




