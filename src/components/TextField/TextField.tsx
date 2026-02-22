import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  label?: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  checkUrlFormat?: (value: string) => boolean;
};

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  value,
  required = false,
  onChange,
  checkUrlFormat,
}) => {
  const [touched, setTouched] = useState(false);

  const isEmpty = required && touched && !value.trim();

  const hasCustomError =
    touched
    && Boolean(value.trim())
    && Boolean(checkUrlFormat)
    && !checkUrlFormat!(value);

  const hasError = isEmpty || hasCustomError;

  const errorMessage = (() => {
    if (isEmpty) {
      return `${label} is required`;
    }

    if (hasCustomError) {
      return `${label} is not valid`;
    }

    return '';
  })();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // event не обовʼязковий тут, але ми використовуємо нормальну назву параметра
    setTouched(true);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <div className="control">
        <input
          id={name}
          name={name}
          type="text"
          className={classNames('input', { 'is-danger': hasError })}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          placeholder={`Enter ${label}`}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
