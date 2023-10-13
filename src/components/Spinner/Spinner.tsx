import { StyledSpinner } from "./styles";

const Spinner = ({
  size,
  style,
}: {
  size: string;
  style?: React.CSSProperties;
}) => {
  return <StyledSpinner size={size} style={style}></StyledSpinner>;
};

export default Spinner;
