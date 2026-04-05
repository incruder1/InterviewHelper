import { IoIosChatbubbles, IoIosBook } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HERO_BADGE = "AI-Powered Interview Practice";

export const HERO_STATS = [
  { value: "5,000+", label: "Practice Sessions" },
  { value: "95%", label: "Success Rate" },
  { value: "50+", label: "Interview Types" },
];

// ── Features ──────────────────────────────────────────────────────────────────

export const FEATURES = [
  {
    icon: <IoIosChatbubbles size={20} />,
    title: "Real-time Feedback",
    description:
      "Get instant AI analysis on your answers, tone, and clarity to improve with every single session.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: <MdDashboardCustomize size={20} />,
    title: "Custom Scenarios",
    description:
      "Practice with questions tailored to your exact role, company type, and years of experience.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <GiProgression size={20} />,
    title: "Progress Tracking",
    description:
      "See how you improve over time with detailed performance analytics after every mock session.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: <FaRobot size={20} />,
    title: "AI Interview Coach",
    description:
      "Get personalised coaching and strategic tips from our advanced AI on every answer you give.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: <RiCheckboxMultipleLine size={20} />,
    title: "Multiple Formats",
    description:
      "Behavioral, technical, system design, case interviews — all in one place, all customisable.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: <IoIosBook size={20} />,
    title: "Answer Library",
    description:
      "Browse expert sample answers and best practices to model your own responses on.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

// ── How It Works ──────────────────────────────────────────────────────────────

export const STEPS = [
  {
    number: "01",
    title: "Set up your interview",
    description:
      "Tell us your target role, experience level, and company type. Our AI tailors every question specifically for your situation.",
    points: [
      "Custom job descriptions",
      "Adjustable difficulty",
      "Industry-specific questions",
    ],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    number: "02",
    title: "Practice with AI",
    description:
      "Engage in a realistic mock interview at your own pace. Answer via text or voice and get instant analysis on every response.",
    points: [
      "Natural conversation flow",
      "Instant answer feedback",
      "Voice & text input",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Review and improve",
    description:
      "Get a detailed breakdown after every session — strengths, weaknesses, and concrete tips to level up before the real thing.",
    points: [
      "Detailed performance report",
      "Specific improvement tips",
      "Track progress over time",
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    avatar: "https://avatar.iran.liara.run/public/2",
    name: "John Doe",
    role: "Software Engineer @ Google",
    feedback:
      "InterviewHelper completely transformed my prep. The AI feedback helped me spot weak points I never noticed. Landed my dream role in 6 weeks.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/4",
    name: "Michael Chen",
    role: "Product Manager @ Amazon",
    feedback:
      "Industry-specific questions and real-time feedback were game-changers. I walked into each round feeling genuinely prepared.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/1",
    name: "Emily Roberts",
    role: "Data Scientist @ Microsoft",
    feedback:
      "The technical interview practice is incredible. The AI adapts to your skill level and pushes you just enough to actually improve fast.",
  },
];

export const TESTIMONIAL_STATS = [
  { value: "95%", label: "Success Rate" },
  { value: "50,000+", label: "Interviews Conducted" },
  { value: "1,000+", label: "Companies Hiring" },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    question: "How does the AI interview practice work?",
    answer:
      "Our AI conducts realistic mock interviews, adapts dynamically to your responses, and provides detailed feedback and coaching after every answer.",
  },
  {
    question: "What types of interviews can I practice?",
    answer:
      "Technical, behavioral, HR, system design, and case interviews — all customised to your target role, experience level, and preferred company type.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. All practice sessions and personal data are encrypted and stored securely. We never share your information with third parties.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, cancel anytime with no penalties. Your access continues until the end of your current billing period.",
  },
  {
    question: "Do you have company-specific questions?",
    answer:
      "Yes! Our Pro plan includes questions and scenarios based on real interview experiences from top companies like Google, Amazon, Microsoft, and more.",
  },
];
