import { ArrowDown, ArrowUp } from "react-bootstrap-icons";

interface PercentageChangeProps {
  from: number;
  to: number;
}


function PercentageChange(props: PercentageChangeProps): JSX.Element {
  const change = ((props.from / props.to - 1) * 100);
  return (
    <span>
      {change > 0 ? <ArrowUp /> : <ArrowDown />} {change.toFixed(2)}%
    </span>
  ); 
}

export default PercentageChange;


