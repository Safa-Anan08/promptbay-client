import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import FeaturedPrompts from "@/components/home/FeaturedPrompts";
import Creators from "@/components/home/Creators";
import Reviews from "@/components/home/Reviews";
import CTA from "@/components/home/CTA";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Trending from "@/components/home/Trending";

export default function Home(){
   return( 
     <>

      <Hero/>
      <Stats/>
      <Categories/>
      <FeaturedPrompts/>
      <Creators/>
      <Reviews/>
      <Trending/>
      <CTA/>
      <WhyChooseUs/>
      </>
    );

       }