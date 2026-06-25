export default function RecentPrompts(){

const prompts=[
    {
     name:"AI Landing Prompt",
     copies:321,
    },

    {
     name:"Logo Prompt",
     copies:187,
     },

     {
     name:"Portfolio Prompt",
     copies:91,
     },
  ];

return(
    <div className="glass p-8 rounded-[32px]">
      <h1 className="text-3xl mb-8">
        Your Prompts</h1>
    <div className="space-y-5">
    {prompts.map((item)=>(

     <div key={item.name}
      className="flex justify-between border-b border-white/10 pb-5"
     >
    <h2>{item.name}</h2>
    <p>{item.copies} copies</p>
     </div>
   ))}
   </div>
    </div>
    );}