import { styled } from '@mui/material/styles';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 300; // Adjusted height to remove extra space
const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    marginBottom: theme.spacing(3),
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  series: number[];
  totalCount: number;
  answeredQuestions: any
};

export default function ChartRadialBar({ series, totalCount, answeredQuestions }: Props) {
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: [`Answered Questions: ${answeredQuestions} / ${totalCount}`],
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '68%',
        },
        dataLabels: {
          value: {
            offsetY: 10,
          },
          total: {
            formatter: () => `${answeredQuestions} / ${totalCount}`,
          },
        },
      },
    },
  });

  return (
    <StyledChart
      key={answeredQuestions}  // This will force re-render when answeredQuestions changes
      dir="ltr"
      type="radialBar"
      series={series}
      options={chartOptions}
      width="100%"
      height={250}
    />
  );
}

