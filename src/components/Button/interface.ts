export interface ButtonProps {
  text: any;
  onClick?: any;
  className?: "submit" | "cancel" | "mobile" | string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

