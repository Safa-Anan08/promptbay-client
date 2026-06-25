"use client";

export default function CreatorPanel() {
  return (
    <div>
      <h2 className="text-4xl font-black">Creator Analytics</h2>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-[30px] border p-8">
          <h3>Total Earnings</h3>
          <p className="text-6xl font-black mt-4">$320</p>
        </div>

        <div className="rounded-[30px] border p-8">
          <h3>Total Copies</h3>
          <p className="text-6xl font-black mt-4">2300</p>
        </div>

        <div className="rounded-[30px] border p-8">
          <h3>Followers</h3>
          <p className="text-6xl font-black mt-4">844</p>
        </div>
      </div>
    </div>
  );
}