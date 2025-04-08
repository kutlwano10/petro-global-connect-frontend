"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useMobileDetection } from "@/hooks/useMobileDetection";

const menuItems = [
  {
    title: "HOME",
    icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6" fill="none"   viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>`,
    children: [
      {
        title: "Dashboard",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6" fill="none"   viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>`,
        link: "/admin/dashboard",
      },
      {
        title: "Stations",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/></svg>`,
        link: "/admin/stations",
      },
    ],
  },
  {
    title: "MANAGEMENT",
    icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M240-320h320v-80H240v80Zm0-160h480v-80H240v80Zm-80 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg>`,
    children: [
      {
        title: "Creditors",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6" fill="none"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
</svg>
`,
        link: "/admin/creditors",
      },
      {
        title: "Banking",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6" fill="none"
            width='30px' height='30px'
            viewBox="0 0 24 24" 
            stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
`,
        link: "/admin/banking",
      },
      {
        title: "Fuel Stock",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M160-120v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h40q33 0 56.5 23.5T680-400v180q0 17 11.5 28.5T720-180q17 0 28.5-11.5T760-220v-288q-9 5-19 6.5t-21 1.5q-42 0-71-29t-29-71q0-32 17.5-57.5T684-694l-84-84 42-42 148 144q15 15 22.5 35t7.5 41v380q0 42-29 71t-71 29q-42 0-71-29t-29-71v-200h-60v300H160Zm80-440h240v-200H240v200Zm480 0q17 0 28.5-11.5T760-600q0-17-11.5-28.5T720-640q-17 0-28.5 11.5T680-600q0 17 11.5 28.5T720-560ZM240-200h240v-280H240v280Zm240 0H240h240Z"/></svg>`,
        link: "/admin/fuel-stock",
      },
      {
        title: "Manage Fleet",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"/></svg>`,
        link: "/admin/manage-fleet",
      },
    ],
  },
  {
    title: "FINANCIALS",
    icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/></svg>`,
    children: [
      {
        title: "Bank Deposits",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M600-320h160v-160h-60v100H600v60Zm-120-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM200-480h60v-100h100v-60H200v160ZM80-200v-560h800v560H80Zm80-80h640v-400H160v400Zm0 0v-400 400Z"/></svg>`,
        link: "/admin/money-banked",
      },
      {
        title: "Payouts",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/></svg>`,
        link: "/admin/payouts",
      },
      {
        title: "Shortover",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>`,
        link: "/admin/short-over",
      },
      {
        title: "Card/EFT",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/></svg>`,
        link: "/admin/card-eft",
      },
      {
        title: "Payments",
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M160-640h640v-80H160v80Zm-80-80q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h164v80H160q-33 0-56.5-23.5T80-240v-480ZM598-80 428-250l56-56 114 112 226-226 56 58L598-80ZM160-720v480-180 113-413Z"/></svg>`,
      },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  //   const [isMobile, setIsMobile] = useState(false);
  const isMobile = useMobileDetection();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

 

  return (
    <div className="h-screen grid md:grid-cols-[auto_1fr] bg-background text-text-primary">
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-50 bg-black/45 bg-opacity-50 md:hidden"
          onClick={toggleMenu}
        />
      )}

      <div
        className={[
          "fixed left-0 top-0  h-full transition-all bg-surface duration-300 z-70 md:relative md:block",
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full ",
        ].join(" ")}
      >
        <Sidebar
          menuItems={menuItems}
          logos={{
            default: "/PetroGlobal.png",
            admin: "/PetroGlobal.png",
          }}
          isMobile={isMobile}
          
        />
      </div>

      <div className="overflow-y-auto  w-full ">
        <div className="sticky w-full bg-surface top-0 z-50 ">
          <Header onMenuToggle={toggleMenu} />
        </div>

        <main className="p-4  min-h-screen text-text-primary">
          {children}
        </main>
      </div>
    </div>
  );
}
