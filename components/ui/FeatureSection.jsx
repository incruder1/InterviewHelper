import { FEATURES } from "@/constants/landing";
import SectionDivider from "@/components/common/SectionDivider";
import SectionHeader from "@/components/common/SectionHeader";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 bg-[#080808] relative">
      <SectionDivider />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="Features" title="t" subtitle="Our AI-powered platform gives you every tool to walk into any interview with complete confidence.">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">land the job</span>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/70"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-5 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="/dashboard">
            <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white px-7 py-3 rounded-xl text-sm font-medium transition-all duration-200">
              Explore All Features →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
