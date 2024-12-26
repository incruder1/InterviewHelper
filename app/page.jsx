"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Contect from "./_components/Contect";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import { ModeToggle } from "@/components/ModeToggle";
import FeaturesSection from "@/components/ui/FeatureSection"
import HeroSection from "@/components/ui/HeroSection"
import HowItWorksSection from "@/components/ui/HowItWorkSection"
import FAQSection from "@/components/ui/FAQSection"
import TestimonialsSection from "@/components/ui/TestimonialsSection"
import Footer from "@/components/ui/Footer"
const page = () => {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Head>
        <title className="">Interview Helper</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <HeroSection/>
    <FeaturesSection/>
    <HowItWorksSection />
    <FAQSection />
    <TestimonialsSection />
    <Footer />
 </div>
  );
};

export default page;
