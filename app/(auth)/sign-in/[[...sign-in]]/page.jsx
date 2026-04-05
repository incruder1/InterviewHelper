import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d0e14, #0f0d1a)" }}>
      <SignIn />
    </div>
  );
}
