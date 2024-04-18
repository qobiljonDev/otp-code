import React, { useEffect, useMemo } from "react";

import { OtpInputProps } from "./type";
import { RE_DIGIT } from "./constants";

import "./style.css";

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  className,
  placeholder,
  length = 6,
  type = "number",
  autoFocus = false,
}) => {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  // ========================= VALUE ITEMS ========================= //
  const otpInputValues = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < length; i++) {
      const char = valueArray[i];

      const isValue = RE_DIGIT.test(char);
      items.push(isValue ? char : "");
    }

    return items;
  }, [value, length]);

  // ========================= GET PLACEHOLDER FORMAT VALUE ========================= //
  const getPlaceholder = () => {
    if (typeof placeholder === "string") {
      if (placeholder.length === length) {
        return placeholder;
      }
    }
    return undefined;
  };

  // =========================  Focus Next  INPUT Element ========================= //
  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
      nextElementSibling.select();
    }
  };

  // =========================  Focus  Prev INPUT Element ========================= //
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
      previousElementSibling.select();
    }
  };

  // ========================= INPUT ONCHANGE ========================= //
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = event.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === length) {
      onChange(targetValue);

      target.blur();
    }
  };

  // ========================= INPUT KEYDOWN ========================= //
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const target = event.target as HTMLInputElement;
    const targetValue = target.value;

    if (key === "ArrowRight") {
      focusToNextInput(target);
    }

    if (key === "ArrowLeft") {
      focusToPrevInput(target);
    }

    if (event.code === "Tab" && event.shiftKey) {
      inputRefs.current[length - 1]?.focus();
    }

    target.setSelectionRange(0, targetValue.length);

    if (key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  };

  // ========================= INPUT FOCUS ========================= //
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target } = event;

    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  return (
    <React.Fragment>
      {otpInputValues.map((digit, index) => {
        return (
          <input
            key={index}
            type={type}
            value={digit}
            pattern="\d{1}"
            maxLength={length}
            className={className}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onChange={(event) => handleChange(event, index)}
            ref={(element) => (inputRefs.current[index] = element)}
            placeholder={getPlaceholder()?.[index] ?? `${index + 1}`}
          />
        );
      })}
    </React.Fragment>
  );
};

export default OtpInput;
