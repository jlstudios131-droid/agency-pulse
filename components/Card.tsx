export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="text-2xl font-bold mt-2">{children}</div>
    </div>
  );
}
