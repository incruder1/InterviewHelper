"use client";
import React from "react";
import Header from "./_components/Header";
import logo from "../../public/assets/logo.png";
import { createContext, useState } from "react";
export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)"
    }}>
      <Header logo={logo} />
      <main>
        <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
          {children}
        </WebCamContext.Provider>
      </main>
    </div>
  );
};

export default DashboardLayout;
