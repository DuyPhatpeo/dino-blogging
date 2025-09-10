import React from "react";
import { useController } from "react-hook-form";

const Checkbox = ({ control, name, children, ...rest }) => {
  const {
    field: { value, onChange, ...field },
  } = useController({
    control,
    name,
    defaultValue: false, // với checkbox nên để default là boolean
  });

  return (
    <label className="flex items-center gap-x-3 font-medium cursor-pointer select-none">
      <input
        type="checkbox"
        className="hidden-input"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        {...field}
        {...rest}
      />
      <div
        className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
          value ? "bg-green-400 text-white" : "bg-gray-200 text-transparent"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
