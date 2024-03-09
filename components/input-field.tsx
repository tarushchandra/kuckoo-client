import React, { useId } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  error: string;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...props }) => {
  const id = useId();
  console.log("input field props -", props);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        {...props}
        id={id}
        className="rounded-md w-full bg-zinc-950 border-[0.01rem] border-zinc-800 px-4 py-2 focus:outline-none focus:border-[#1D9BF0] focus:ring-1"
      />
      {error && (
        <h3 className="text-xs text-red-500 italic">* {error as string}</h3>
      )}
    </div>
  );
};

export default InputField;
