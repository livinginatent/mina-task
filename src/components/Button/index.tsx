import { ButtonProps} from "./interface";
import {
  StyledButton,
 
} from "./styles";

export const Button = ({
  text,
  onClick,
  className,
  style,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
      style={style}
    >
      {text}
    </StyledButton>
  );
};

