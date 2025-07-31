import React from "react";
import * as Icons from "lucide-react";
import clsx from "clsx";
import { H5 } from "../ui";

const PromptCard = ({ icon, title, prompt, onClick, backgroundColor = "gray" }) => {
  const Icon = Icons[icon] || Icons.HelpCircle;

  const bgMap = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    violet: "bg-violet-100 text-violet-600",
    rose: "bg-rose-100 text-rose-600",
    amber: "bg-amber-100 text-amber-600",
    gray: "bg-gray-100 text-gray-600",
  };

  const colorClass = bgMap[backgroundColor.toLowerCase()] || bgMap.gray;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full max-w-xs p-4 rounded-xl shadow hover:shadow-md transition-all duration-200",
        "bg-white text-left flex flex-col items-start gap-2 border border-gray-200 hover:bg-gray-50"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center", colorClass)}>
          <Icon size={16} />
        </div>
        <H5 className="text-sm font-semibold text-gray-900">{title}</H5>
      </div>
      <p className="text-sm text-gray-600 leading-snug">{prompt}</p>
    </button>
  );
};

export default PromptCard;
