import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { createTooltip } from './utils';
import { CSVLink } from 'react-csv';

const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '80vw',
    height: '60vh',
    flex: '0 1 auto',
    maxWidth: '1000px',
    paddingBottom: '12vh',
  },
  chartTitle: {
    textAlign: 'center',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  tooltip: {
    width: '200px',
    margin: 0,
    lineHeight: '24px',
    border: '1px solid #f5f5f5',
    backgroundColor: 'hsla(0,0%,100%,.8)',
    padding: '10px',
  },
  tooltipLabel: {
    color: '#333',
  },
  tooltipLabelFirstWord: {
    color: '#777',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

/**
 * LineCharts A helper component for rendering multiple linecharts
 *
 * @component
 */
function LineCharts({
  datasets,
  xAxisKey,
  yAxisKey,
  tooltipItems,
  displayAbsolute,
}) {
  const classes = useStyles();
  return (
    <>
      {datasets.map(data => (
        <div className={classes.chartContainer} key={data.title}>
          <h1 className={classes.chartTitle}>{data.title}</h1>
          <ResponsiveContainer>
            <LineChart
              data={data.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis domain={[displayAbsolute ? 0 : 'auto', 'auto']} />
              <Tooltip content={createTooltip(classes, tooltipItems)} />
              <Line
                type="monotone"
                dataKey={yAxisKey}
                stroke="#8884d8"
                fill="#8884d8"
                strokeWidth={3}
                dot={{ strokeWidth: 5 }}
                activeDot={{
                  stroke: '#3F51B5',
                  strokeWidth: 7,
                  border: 'white',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <Box display="flex" justifyContent="flex-end" p={3}>
            <CSVLink data={data.data} filename={data.title + '-word-freq.csv'}>
              Download as CSV
            </CSVLink>
          </Box>
        </div>
      ))}
    </>
  );
}

LineCharts.defaultProps = {
  xAxisKey: 'X',
};

LineCharts.propTypes = {
  /** The datasets to render line charts for */
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    }),
  ).isRequired,
  /** The key for the x axis of the datasets */
  xAxisKey: PropTypes.string,
  /** The key for the y axis of the datasets */
  yAxisKey: PropTypes.string.isRequired,
  /** An array of items to render in the tooltips */
  tooltipItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  displayAbsolute: PropTypes.bool.isRequired,
};

export default LineCharts;
