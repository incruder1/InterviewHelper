import { SITE_NAME, FOOTER_LINKS } from "@/constants/site";

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-zinc-800/50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <span className="text-xl font-bold text-white tracking-tight">{SITE_NAME}</span>
            <p className="text-zinc-500 text-sm mt-4 mb-6 max-w-xs leading-relaxed">
              Elevate your interview performance with AI-powered practice and personalised feedback.
            </p>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
        </div>

        <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-zinc-700 text-sm">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map(({ href, label }) => (
              <a key={label} href={href} className="text-zinc-700 hover:text-white text-sm transition-colors duration-200">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map(({ href, label }) => (
          <li key={label}>
            <a href={href} className="text-zinc-500 hover:text-white text-sm transition-colors duration-200">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
