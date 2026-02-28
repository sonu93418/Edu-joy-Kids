import { Users, School, BookOpen, TrendingUp } from "lucide-react";

const STATS = [
  { value: "50,000+", label: "Active Students", icon: Users      },
  { value: "1,200+",  label: "Schools",          icon: School     },
  { value: "5,000+",  label: "Teachers",          icon: BookOpen   },
  { value: "95%",     label: "Renewal Rate",      icon: TrendingUp },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon size={22} className="text-indigo-300 mx-auto mb-2" />
              <p className="text-3xl font-extrabold text-white">{value}</p>
              <p className="text-sm text-indigo-200 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
