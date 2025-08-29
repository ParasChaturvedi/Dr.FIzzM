"use client";

import { BarChart2, PlusSquare, Clock, Grid } from "lucide-react";

export default function Sidebar({ onInfoClick }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[80px] bg-[#E9EDF2] border-r border-[#e6e9ec] flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="pt-2 pb-5">
        <div className="h-14 w-14 rounded-full bg-[#111827] text-white grid place-items-center text-sm font-semibold">
          Logo
        </div>
      </div>

      {/* Menu */}
      <nav className="w-full px-2">
        <button
          id="sidebar-info-btn"
          onClick={onInfoClick}
          className="w-full mb-6 flex flex-col items-center gap-1 text-[#808A95] hover:text-[#111827]"
        >
          <BarChart2 size={22} />
          <span className="text-[12px] leading-none">Info</span>
        </button>

        <button className="w-full mb-6 flex flex-col items-center gap-1 text-[#808A95] hover:text-[#111827]">
          <PlusSquare size={22} />
          <span className="text-[12px] leading-none">New</span>
        </button>

        <button className="w-full mb-6 flex flex-col items-center gap-1 text-[#808A95] hover:text-[#111827]">
          <Clock size={22} />
          <span className="text-[12px] leading-none">History</span>
        </button>

        {/* divider */}
        <div className="mx-3 my-3 h-px bg-[#e6e9ec]" />

        <button className="w-full mb-6 flex flex-col items-center gap-1 text-[#808A95] hover:text-[#111827]">
          <Grid size={22} />
          <span className="text-[12px] leading-none">Others</span>
        </button>
      </nav>

      <div className="flex-1" />

      {/* Bottom actions */}
      <div className="w-full pb-6 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 text-[#E9652C]">
          <div className="text-xl">↑</div>
          <div className="text-[12px] font-medium">Upgrade</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-11 w-11 rounded-full bg-[#E9652C] grid place-items-center">
            {/* simple avatar icon */}
            <div className="w-5 h-5 rounded-full bg-white" />
          </div>
          <div className="mt-2 text-[12px] text-[#6B7280]">Profile</div>
        </div>
      </div>
    </aside>
  );
}
