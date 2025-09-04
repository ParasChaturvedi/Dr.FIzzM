"use client";

import { ArrowLeft, ArrowRight, BadgePercent, Languages, Tags } from "lucide-react";

export default function Step5Slide2({
  onBack,
  onDashboard,
  websiteData,
  businessData,
  languageLocationData,
  keywordData = [],
  competitorData = { businessCompetitors: [], searchCompetitors: [], totalCompetitors: [] },
}) {
  // helpers
  const clean = (s) => (typeof s === "string" ? s.replace(/-\d+$/, "") : s);

  // “Business Selected” (left card) from your business step (industry/category/offering)
  const businessTitle =
    businessData?.industry ||
    businessData?.category ||
    businessData?.offering ||
    "—";

  const businessChip =
    businessData?.category ||
    businessData?.offering ||
    businessData?.industry ||
    "—";

  // Language & Location (from step 3)
  const langSelections = Array.isArray(languageLocationData?.selections)
    ? languageLocationData.selections
    : [];

  // Keyword Selected (from step 4)
  const keywords = Array.isArray(keywordData) ? keywordData : [];

  // Competitors (from step 5)
  const bizComps = Array.isArray(competitorData?.businessCompetitors)
    ? competitorData.businessCompetitors
    : [];
  const searchComps = Array.isArray(competitorData?.searchCompetitors)
    ? competitorData.searchCompetitors
    : [];
  const totalComps = Array.isArray(competitorData?.totalCompetitors)
    ? competitorData.totalCompetitors
    : [];

  // right-most card: prefer business competitors, else search, else total
  const rightCardTitle = "Business Selected";
  const rightCardList =
    bizComps.length > 0 ? bizComps : searchComps.length > 0 ? searchComps : totalComps;

  return (
    <div className="min-h-full w-full bg-gray-100">
      {/* Header */}
      <div className="pt-12 pb-6 text-center">
        <h1 className="text-[32px] font-bold text-gray-900">Great! You’re all done.</h1>
        <p className="mt-2 text-gray-600">
          Here is your <span className="font-semibold">entire report</span> biased on your input
        </p>
      </div>

      {/* Cards row */}
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="flex flex-wrap gap-6 justify-between">
          {/* Card */}
          <Card
            icon={<BadgePercent className="w-5 h-5" />}
            title="Business Selected"
            body={
              <div className="space-y-4">
                <div className="text-gray-700">{businessTitle}</div>
                <Tag>{clean(businessChip)}</Tag>
              </div>
            }
          />

          {/* Card */}
          <Card
            icon={<Languages className="w-5 h-5" />}
            title="Language Selected"
            body={
              <div className="space-y-3">
                {langSelections.length === 0 ? (
                  <div className="text-gray-500">—</div>
                ) : (
                  langSelections.map((s, i) => (
                    <div key={i} className="space-y-2">
                      <div className="text-gray-700">{s.language}</div>
                      {s.location && <Tag>{s.location}</Tag>}
                    </div>
                  ))
                )}
              </div>
            }
          />

          {/* Card */}
          <Card
            icon={<Tags className="w-5 h-5" />}
            title="Keyword Selected"
            body={
              <div className="flex flex-wrap gap-3">
                {keywords.length === 0 ? (
                  <div className="text-gray-500">—</div>
                ) : (
                  keywords.slice(0, 9).map((k, i) => <Tag key={i}>{k}</Tag>)
                )}
              </div>
            }
          />

          {/* Card */}
          <Card
            icon={<BadgePercent className="w-5 h-5" />}
            title={rightCardTitle}
            body={
              <div className="space-y-4">
                <div className="text-gray-700">
                  {businessTitle !== "—" ? businessTitle : "Technology & Software"}
                </div>
                <div className="flex flex-wrap gap-3">
                  {rightCardList.length === 0 ? (
                    <div className="text-gray-500">—</div>
                  ) : (
                    rightCardList.slice(0, 6).map((c, i) => <Tag key={i}>{clean(c)}</Tag>)
                  )}
                </div>
              </div>
            }
          />
        </div>

        {/* CTA row */}
        <div className="mt-10 text-center">
          <p className="text-gray-600">
            All set? Click <span className="font-semibold">‘Dashboard’</span> to continue.
          </p>
          <button
            onClick={onBack}
            className="mt-3 inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 underline"
          >
            Back
          </button>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center gap-2 hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={onDashboard}
              className="px-8 py-3 rounded-full bg-gray-900 text-white flex items-center gap-2 hover:bg-gray-800"
            >
              Dashboard
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Optional loader section (matches your second mock) */}
      {/* Keep commented or show conditionally if you add a "loading" flag */}
      {false && (
        <div className="mx-auto max-w-[720px] px-6 mt-16 pb-16 text-center">
          <p className="text-gray-600">Great thing take time!</p>
          <p className="text-gray-600">
            Preparing your <span className="font-semibold">Dashboard</span>.
          </p>
          <div className="mt-6 w-6 h-6 rounded-full bg-gray-800 mx-auto" />
          <div className="mt-4 h-2 rounded-full bg-gray-200">
            <div className="h-2 w-1/3 rounded-full bg-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- tiny presentational helpers ---------- */

function Card({ icon, title, body }) {
  return (
    <div className="flex-1 min-w-[240px] max-w-[260px] rounded-2xl bg-white border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2 text-gray-800 font-semibold">
        <span className="text-gray-600">{icon}</span>
        {title}
      </div>
      <div className="px-6 py-5">{body}</div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm shadow-sm border border-gray-200">
      {children}
    </span>
  );
}
