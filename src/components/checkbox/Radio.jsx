import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ children, control, name, value, ...rest }) => {
  const {
    field: { value: selectedValue, onChange, ...field },
  } = useController({
    control,
    name,
    defaultValue: "", // radio nên để default rỗng
  });

  return (
    <label className="flex items-center gap-x-3 font-medium cursor-pointer select-none">
      <input
        type="radio"
        className="hidden-input"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        {...field}
        {...rest}
      />
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          selectedValue === value ? "bg-green-400" : "bg-gray-200"
        }`}
      >
        {selectedValue === value && (
          <div className="w-3 h-3 bg-white rounded-full"></div>
        )}
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Radio;
