export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <h3 className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
        {title}
      </h3>

      <div className="text-3xl font-bold text-gray-900 mt-3">
        {children}
      </div>
    </div>
  );
}
