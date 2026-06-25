
export default function creatorLayout({
  children,
}) {
  return (
    <div className="flex">


      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}