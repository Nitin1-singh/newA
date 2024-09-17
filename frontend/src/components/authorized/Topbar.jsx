import React from "react";

function Topbar() {
  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <div className="flex align-items-center gap-5">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Simple News Aggregator with Voting
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
