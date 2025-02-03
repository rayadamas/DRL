import React from "react";

import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-slate-50 rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 disabled:bg-opacity-65 dark:bg-slate-50 dark:bg-opacity-10"
      type="submit"
      disabled={pending}
    >
      {" "}
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-slate-50 "></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  );
}
