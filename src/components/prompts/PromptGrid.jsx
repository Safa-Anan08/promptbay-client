import PromptCard from "./PromptCard";

export default function PromptGrid({ prompts }) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {prompts?.map((item) => (
        <PromptCard
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
}