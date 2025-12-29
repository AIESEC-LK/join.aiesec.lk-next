import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  className?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  pattern,
  className = "",
}: InputFieldProps) {
  return (
    <div className="input-group">
      <label className="label">
        {label}
        {required && <span className="required_field"> *</span>}
      </label>
      <input
        className={`input--style-4 ${className}`.trim()}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
      />
    </div>
  );
}
