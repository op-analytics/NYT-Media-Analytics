import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useStoreActions, useStoreState } from 'easy-peasy';
import ChipInput from 'material-ui-chip-input';
import React, { useMemo, useState } from 'react';
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

import CsvDownloadButton from '../../components/CsvDownloadButton';
import FeedbackBar from '../../components/FeedbackBar';
import config from '../../config';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '94%',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  label: {
    backgroundColor: 'white',
  },
  form: {
    width: '100%',
    height: '100%',
    padding: '2rem',
  },
  input: {
    border: 'solid 1px black',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  submitButton: {
    width: '100%',
  },
  toggleButton: {
    maxWidth: '150px',
  },
  chartContainer: {
    width: '100%',
    maxWidth: '70vw',
    height: '50vh',
    flex: '0 1 auto',
    paddingBottom: '6vh',
    marginTop: '5vh',
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
  Card: {
    width: '45vw',
    minWidth: '400px',
  },
  circularProgress: {
    marginTop: '40px',
  },
}));

const MEDIA_OUTLET = config.mediaOutlets.sentiment;
const MIN_YEAR = config.yearRange.from;
const MAX_YEAR = config.yearRange.to;
const PARAMETER_LIMIT = config.parameterLimits.frequency;
const CSV_DOWNLOAD_NAME = config.csvDownloadNames.sentiment;
const CSV_HEADERS = config.csvDownloadHeaders.sentiment;

const getDownloadData = (currentData) => {
  const dataToDownload = [];
  if (currentData) {
    currentData.forEach((item) => {
      item.data.forEach((yearItem) => {
        dataToDownload.push({
          mediaOutlet: MEDIA_OUTLET,
          word: item.title,
          year: yearItem.year,
          sentiment: yearItem.sentiment,
        });
      });
    });
  }
  return dataToDownload;
};

/**
 * The Sentiment Analysis page component
 * @component
 */
function SentimentAnalysis() {
  const sentiments = useStoreState((state) => state.timeline.sentiments);
  const loading = useStoreState((state) => state.ui.loading);
  const getSentiments = useStoreActions((state) => state.timeline.getSentiments);

  const [words, setWords] = useState([]);
  const [yearFrom, setYearFrom] = useState(MIN_YEAR);
  const [yearTo, setYearTo] = useState(MAX_YEAR);

  const classes = useStyles();

  const errors = useStoreState((state) => state.ui.errors);

  const handleDelete = (chip, state, setState) => {
    setState(state.filter((word) => word !== chip));
  };

  const handleAddChip = (chip, state, setState) => {
    if (state.length < PARAMETER_LIMIT) {
      setState([...state, chip]);
    }
  };

  const dataToDownload = useMemo(() => getDownloadData(sentiments, words[0]), [
    sentiments,
    words,
  ]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    getSentiments({ word: words[0], year_from: yearFrom, year_to: yearTo });
  };

  return (
    <>
      {sentiments && !loading ? (
        <CsvDownloadButton
          data={dataToDownload}
          headers={CSV_HEADERS}
          filename={CSV_DOWNLOAD_NAME}
        />
      ) : null}
      <br />
      <Alert severity="warning">
        This is an experimental section of the site and data obtained is not
        guranteed to be accurate or to reflect the views of the New York Times
      </Alert>
      <div className={classes.container}>
        <Card className={classes.Card}>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <ChipInput
                    label="Word"
                    name="word"
                    newChipKeyCodes={[13, 32, 188]} // Make new chip on enter, space or comma key codes
                    blurBehavior="add" // Fix android chrome bug
                    required={!words}
                    value={words}
                    onAdd={(chip) => handleAddChip(chip, words, setWords)}
                    onDelete={(chip) => handleDelete(chip, words, setWords)}
                    chipRenderer={({ value }, key) => (
                      <Chip
                        key={key}
                        style={{ margin: '0px 8px 8px 0px', float: 'left' }}
                        color="secondary"
                        label={value}
                        // eslint-disable-next-line no-unused-vars
                        onDelete={(_) => handleDelete(value, words, setWords)}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    className={classes.textField}
                    type="number"
                    label="Year from:"
                    name="year_from"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(Number(e.target.value))}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    className={classes.textField}
                    type="number"
                    label="Year to:"
                    name="year_to"
                    value={yearTo}
                    onChange={(e) => setYearTo(Number(e.target.value))}
                    required
                  />
                </FormControl>
              </Grid>
              {
                // Submit button
              }
              <Grid container item sm={12} justify="center">
                <Grid item xs={3} align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitButton}
                    margin="0 auto"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>

        {errors.length > 0 ? <FeedbackBar errors={errors} /> : null}

        {loading ? (
          <CircularProgress className={classes.circularProgress} />
        ) : (
          words.length > 0 &&
          sentiments.length > 0 && (
            <div className={classes.chartContainer}>
              <h3 className={classes.chartTitle}>Sentiment</h3>
              <ResponsiveContainer>
                <LineChart
                  data={sentiments[0].data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    domain={[yearFrom, yearTo]}
                    dataKey="year"
                    tickCount={Math.abs(yearTo - yearFrom)}
                  />
                  <YAxis />
                  <Legend />
                  <Tooltip />
                  <Line
                    type="linear"
                    dataKey="sentiment"
                    name={words[0]}
                    // stroke={stringToColour(sentiments.data.word)}
                    // fill={stringToColour(sentiments.data.word)}
                    strokeWidth={3}
                    connectNulls
                    dot={{ strokeWidth: 5 }}
                    activeDot={{
                      //   stroke: stringToColour(sentiments.data.word),
                      strokeWidth: 7,
                      border: 'white',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default SentimentAnalysis;
