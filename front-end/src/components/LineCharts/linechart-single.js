import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PropTypes, { arrayOf, number, shape, string } from 'prop-types';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useSharedStyles } from './hooks/useStyles';
import {
  createLegendPayload,
  createTooltip,
  CustomizedDot,
  stringToColour,
} from './utils';

// FIXME: This component should only receive a list of datasets to diplay, A
// tooltip and a legend
function LinechartSingle({ dataset, formParameters, mediaOutlets }) {
  const sharedClasses = useSharedStyles();
  // FIXME: destructure all of this at once
  const { words } = formParameters;
  const { outlets } = formParameters;
  const { yearFrom } = formParameters;
  const { yearTo } = formParameters;
  const { yAxisKey } = formParameters;
  const { displayNormalised } = formParameters;
  const { displayOption } = formParameters;
  return (
    <Grid item container xs={12} spacing={2} justify="center">
      <Grid item lg={12} xs={12} className={sharedClasses.gridItemChart}>
        <Card className={sharedClasses.chartContainer}>
          <h3 className={sharedClasses.chartTitle}>{dataset.title}</h3>
          <ResponsiveContainer>
            <LineChart
              data={dataset.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[yearFrom, yearTo]}
                dataKey="year"
                tickCount={Math.abs(yearTo - yearFrom)}
                allowDataOverflow // Forces displayed data to match domain.
              />
              <YAxis
                domain={displayNormalised ? [0, 1] : ['auto', 'auto']}
                width={75}
                allowDataOverflow // Forces displayed data to match domain.
              />
              <Legend
                payload={createLegendPayload(
                  dataset.data,
                  words,
                  outlets,
                  yAxisKey,
                  mediaOutlets,
                  displayOption,
                )}
              />
              <Tooltip
                content={createTooltip(
                  sharedClasses,
                  words,
                  outlets,
                  displayOption,
                  yAxisKey,
                  mediaOutlets,
                )}
              />

              {words.map((word) =>
                outlets.map((outlet, index) => {
                  return (
                    <Line
                      key={word + outlet}
                      type="monotone"
                      dataKey={outlet + word + yAxisKey}
                      stroke={stringToColour(word)}
                      fill={stringToColour(word)}
                      connectNulls
                      strokeWidth={3}
                      dot={<CustomizedDot number={index} />}
                      activeDot={{
                        stroke: stringToColour(word),
                        strokeWidth: 7,
                        border: 'white',
                      }}
                    />
                  );
                }),
              )}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
    </Grid>
  );
}

LinechartSingle.propTypes = {
  dataset: shape({
    title: string.isRequired,
    data: arrayOf(
      shape({
        word: string.isRequired,
        outlet: string.isRequired,
        year: string.isRequired,
        outletWordRank: number,
        outletWordCount: number,
        outletWordFreq: number,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  formParameters: shape({
    words: arrayOf(string).isRequired,
    outlets: arrayOf(string).isRequired,
    yearFrom: number.isRequired,
    yearTo: number.isRequired,
    yAxisKey: string.isRequired,
    displayNormalised: PropTypes.bool.isRequired,
    displayOption: string.isRequired,
  }).isRequired,
  mediaOutlets: arrayOf(
    shape({
      title: string.isRequired,
      value: string.isRequired,
    }),
  ).isRequired,
};

export default LinechartSingle;
