import React from 'react';

import HeroImage from './components/HeroImage';
import Description from './components/Description';
import SpecialOffers from './components/SpecialOffers';
import PopularSet from './components/PopularSet';
import HydraulicPower from './components/hydraulicPower';
import OtherBrand from './components/OtherBrand';
import NewsletterSubscription from "./components/NewsletterSubscription";





const Home: React.FC = () => {      //  HydraulicPower
  return (
    <div className="min-h-screen">
      {/* Navbar will stay at the top */}
      
      <HeroImage />
      <Description />
      <SpecialOffers />
      <PopularSet />
      <HydraulicPower /> 
      <OtherBrand  />
      <NewsletterSubscription />

      

       
    </div>
  );
};

export default Home;
