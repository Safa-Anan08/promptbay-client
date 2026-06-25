export default function AnalyticsCard({ title, value }) {
  return (
    <div className="rounded-[32px] border p-8">
      <p>{title}</p>
      <h1 className="text-5xl font-black mt-4">{value}</h1>
    </div>
  );
}