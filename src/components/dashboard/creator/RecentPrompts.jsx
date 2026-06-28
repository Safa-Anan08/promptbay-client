
export default function RecentPrompts() {
  const prompts = [
    {
      name: "AI Landing Prompt",
      copies: 321,
    },
    {
      name: "Logo Prompt",
      copies: 187,
    },
    {
      name: "Portfolio Prompt",
      copies: 91,
    },
  ];

  return (
    <div className="glass rounded-2xl sm:rounded-[32px] p-4 sm:p-6 lg:p-8">
      <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold">
        Your Prompts
      </h1>

      <div className="space-y-4 sm:space-y-5">
        {prompts.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 sm:pb-5"
          >
            <h2 className="text-base sm:text-lg font-semibold break-words">
              {item.name}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground">
              {item.copies} copies
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

