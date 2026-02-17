import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
