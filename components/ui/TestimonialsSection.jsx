import { TESTIMONIALS, TESTIMONIAL_STATS } from "@/constants/landing";
import SectionDivider from "@/components/common/SectionDivider";
import SectionHeader from "@/components/common/SectionHeader";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-32 bg-[#050505] relative">
      <SectionDivider />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="Testimonials" title="t" subtitle="Real results from real people who landed their dream jobs">
          Trusted by job seekers{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">worldwide</span>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, index) => (
            <div key={index} className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:bg-zinc-900/60">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-6">&ldquo;{t.feedback}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full" />
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-zinc-600 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-20">
          {TESTIMONIAL_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-zinc-600 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
