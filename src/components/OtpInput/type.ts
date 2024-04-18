type InputType = "number" | "tel";

export interface OtpInputProps {
  //   type: React.HTMLInputTypeAttribute;
  value: string;
  length: number;
  type?: InputType;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
}
