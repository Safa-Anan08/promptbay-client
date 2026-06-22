"use client";
import {  X , Check } from "lucide-react";

export default function ComparisonTable(){

return(

 <div className="mt-28 rounded-[40px] border overflow-hidden">

    <table className="w-full">

      <thead>
        <tr className="border-b">
         <th className="p-6">
           Feature
        </th>
         <th>
            Free
        </th>
      <th>Pro</th>
       </tr>
     </thead>
     <tbody>
   <tr><td className="p-6">Prompt Limit</td>
   <td>3</td>
   <td>Unlimited</td>
   </tr>
   <tr><td className="p-6">Premium</td>
   <td><X color="red" /></td>
   <td><Check color="green" size={24} /></td>
     </tr>
     <tr>
     <td className="p-6">Creator Tools</td>
   <td><X color="red" /></td>
   <td><Check color="green" size={24} /></td>
    </tr>
   </tbody>
   </table>
   </div>
    );
      }