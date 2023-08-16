import { useMemo } from 'react';

export default function CalculateMilage(props) {
  const { mockDrives } = props;
  const calculateMilage = () => mockDrives.reduce(
    (acc, cur) => acc + cur.end_mileage - cur.start_mileage,
    0
  );
  const totalMilage = useMemo(() => calculateMilage(), [mockDrives]);

  return (
    <p>
      Total mileage is:
      {totalMilage}
      {' '}
      km
    </p>
  );
}
