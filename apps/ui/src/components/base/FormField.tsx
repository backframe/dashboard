interface props {
  label: string;
  type?: string;
  value?: string;
  onChange?: Function;
  name: string;
  className?: string;
}

export function FormField({ label, type = "text", name }: props) {
  return (
    <div className="my-6 w-full">
      <label
        htmlFor={name}
        className="text-left block text-xs uppercase mb-1 text-gray-500"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="ring-1 ring-slate-900/10 rounded-md p-2 py-3 w-full"
      />
    </div>
  );
}
