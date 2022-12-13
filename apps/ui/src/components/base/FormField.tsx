import React from "react";

interface props {
  label: string;
  type?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  className?: string;
}

export function FormField({
  label,
  type = "text",
  name,
  onChange,
  value,
}: props) {
  return (
    <div className="my-6 w-full">
      <label
        htmlFor={name}
        className="text-left block text-xs uppercase mb-1 text-gray-500"
      >
        {label}
      </label>
      <input
        value={value}
        type={type}
        name={name}
        className="ring-1 ring-slate-900/10 rounded-md p-2 py-3 w-full text-sm"
        onChange={onChange}
      />
    </div>
  );
}
