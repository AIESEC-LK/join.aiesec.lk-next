import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  className?: string;
  options?: readonly { readonly value: string; readonly label: string }[];
  isSelect?: boolean;
  addSelectOther?: boolean;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
  pattern,
  className = "",
  options = [],
  isSelect = false,
  addSelectOther = false,
}: InputFieldProps) {
  return (
    <div className="input-group">
      <label className="label">
        {label}
        {required && <span className="required_field"> *</span>}
      </label>
      {isSelect ? (
        <div className="rs-select2 js-select-simple select--no-search">
          <select
            className={`input--style-4 ${className}`.trim()}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          >
            <option value="" disabled>
              {placeholder || "Choose option"}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {addSelectOther && (
              <option key="Other" value="Other">
                Other
              </option>
            )}
          </select>
          <div className="select-dropdown"></div>
        </div>
      ) : (
        <input
          className={`input--style-4 ${className}`.trim()}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
          disabled={disabled}
        />
      )}
    </div>
  );
}
