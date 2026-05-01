"use client";

const stats = [
  { label: "AVG PROGRESS", value: "1%", color: "text-blue-600" },
  { label: "COURSES", value: "8", color: "text-green-600" },
  { label: "EXAMS TAKEN", value: "75", color: "text-purple-600" }
];

export default function StatCards() {
  return (
    <div className="bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm flex items-center mb-8 divide-x divide-gray-100">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={`flex-1 flex items-center justify-center gap-4 ${index === 0 ? 'pr-8' : index === stats.length - 1 ? 'pl-8' : 'px-8'}`}
        >
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">{stat.label}</p>
            <div className="flex items-center gap-2">
               <div className={`w-1.5 h-1.5 rounded-full ${stat.color.replace('text-', 'bg-')}`} />
               <p className={`${stat.color} text-xl font-black`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
