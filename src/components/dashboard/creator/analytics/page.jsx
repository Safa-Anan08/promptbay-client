"use client";

export default function Page() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-black">
        Creator Analytics
      </h1>

      <div className="mt-10 grid grid-cols-3 gap-6">
        <div className="rounded-3xl border p-8">
          <h2 className="text-lg">
            Total Prompts
          </h2>

          <p className="mt-3 text-5xl font-bold">
            12
          </p>
        </div>

        <div className="rounded-3xl border p-8">
          <h2 className="text-lg">
            Total Copies
          </h2>

          <p className="mt-3 text-5xl font-bold">
            320
          </p>
        </div>

        <div className="rounded-3xl border p-8">
          <h2 className="text-lg">
            Revenue
          </h2>

          <p className="mt-3 text-5xl font-bold">
            $540
          </p>
        </div>
      </div>
    </div>
  );
}