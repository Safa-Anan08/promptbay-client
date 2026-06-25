import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import ComparisonTable from "@/components/pricing/ComparisonTable";

export default function Page(){
    return(
        <div className="max-w-7xl mx-auto px-6">
           <PricingHero/>
           <PricingCards/>
            <ComparisonTable/>
        </div>
       );}