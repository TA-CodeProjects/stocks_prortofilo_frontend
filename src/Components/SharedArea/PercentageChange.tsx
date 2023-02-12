interface PercentageChangeProps {
  from: number;
  to: number;
}


function PercentageChange(props: PercentageChangeProps): JSX.Element {
  const change = ((props.from / props.to - 1) * 100);
  return (
    <td className={change < 0 ? 'text-danger' : 'text-success'}>{change.toFixed(2)}%</td>
  ) 
}

export default PercentageChange;


