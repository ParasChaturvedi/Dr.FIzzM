"use client";

import { BarChart2, PlusSquare, Clock, Grid } from "lucide-react";

function NavItem({ id, label, Icon, onClick, active = false }) {
  return (
    <button
      id={id}
      onClick={onClick}
      type="button"
      aria-current={active ? "page" : undefined}
      className={`group relative w-full mb-6 flex flex-col items-center gap-1 outline-none
                  text-[#808A95] dark:text-[#A0A6AE]`}
    >
      {/* Icon + hover/active circle */}
      <span className="relative grid place-items-center h-10 w-10">
        <span
          className={`absolute inset-0 rounded-full transition-all duration-200 shadow-sm
            ${active
              ? "scale-100 opacity-100 bg-white dark:bg-[#303030]"
              : "scale-0 opacity-0 bg-white dark:bg-[#303030] group-hover:scale-100 group-hover:opacity-100"
            }`}
        />
        <Icon
          size={26}
          className={`relative z-10 transition-colors duration-200
            ${active ? "text-[#E9652C]" : "group-hover:text-[#E9652C]"}
          `}
        />
      </span>

      <span
        className={`text-[14px] leading-none mt-1 transition-colors duration-200
          ${active ? "text-[#E9652C]" : "group-hover:text-[#E9652C]"}
        `}
      >
        {label}
      </span>
    </button>
  );
}

export default function Sidebar({ onInfoClick, infoActive = false }) {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-[80px]
                 bg-[#e5e7e] dark:bg-[#1f2121]
                 border-r border-[#e6e9ec] dark:border-[#374151]
                 flex flex-col items-center py-6 z-50"
    >
      {/* Logo */}
      <div className="pt-2 pb-5">
        <div className="h-14 w-14 rounded-full bg-[#111827] text-white grid place-items-center text-sm font-semibold">
          Logo
        </div>
      </div>

      {/* Menu */}
      <nav className="w-full px-2">
        <NavItem
          id="sidebar-info-btn"
          onClick={onInfoClick}
          label="Info"
          Icon={BarChart2}
          active={infoActive}
        />
        <NavItem label="New" Icon={PlusSquare} />
        <NavItem label="History" Icon={Clock} />

        {/* divider */}
        <div className="mx-3 my-6 h-px bg-[#e6e9ec] dark:bg-[#374151]" />

        <NavItem label="Others" Icon={Grid} />
      </nav>

      <div className="flex-1" />

      {/* Bottom actions */}
      <div className="w-full pb-6 flex flex-col items-center">
        {/* Upgrade with hover animation */}
        <div className="flex flex-col items-center mb-4 text-[#E9652C] cursor-pointer group select-none">
          <div
            className="text-2xl leading-none
                       transform transition-transform duration-300
                       group-hover:-translate-y-1 group-hover:scale-y-125 group-hover:scale-x-110"
          >
            ↑
          </div>
          <div className="text-[14px] font-medium">Upgrade</div>
        </div>

        {/* Profile – theme aware + invert on hover */}
        <button
          type="button"
          aria-label="Open profile"
          className="group flex flex-col items-center cursor-pointer outline-none"
        >
          <span
            className={[
              "h-11 w-11 rounded-full grid place-items-center shadow-md",
              "transition-colors duration-300",
              "bg-blue-600 dark:bg-[#E9652C]",
              "group-hover:bg-[#E9652C] dark:group-hover:bg-blue-600",
              "focus-visible:ring-2 focus-visible:ring-blue-500",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              "dark:focus-visible:ring-offset-[#1f2121]",
            ].join(" ")}
          >
            <span className="h-5 w-5 rounded-full bg-white" />
          </span>

          <span
            className="mt-2 text-[14px] text-[#6B7280]
                       transition-colors duration-200
                       group-hover:text-[#E9652C] dark:group-hover:text-blue-600"
          >
            Profile
          </span>
        </button>
      </div>
    </aside>
  );
}
