import React from 'react';

import { useSectionStyles } from '../hooks/useSectionStyles';

/**
 * The frequency counts section for the userguide page
 * @component
 */
export default function FrequencyCounts() {
  const classes = useSectionStyles();
  return (
    <div className={classes.div}>
      <h2 className={classes.sectionHeadings}>Frequency Counts</h2>
      <h3 className={classes.subSectionHeadings}>Adding words</h3>
      <p>
        Words are added via a chip input. They can be deleted by pressing
        backspace twice, the delete key or by clicking the &apos;X&apos; on the
        chip itself.
      </p>
      <img
        src="/userguide/frequency-word-remove.png"
        className={classes.image}
        alt="Input pane"
      />
      <p>You may add up to four words in a single request.</p>

      <h3 className={classes.subSectionHeadings}>Choosing outlets</h3>
      <p>
        Outlets are a prepopulated list that are selected via a chip input with
        autocomplete.
      </p>
      <img
        src="/userguide/frequency-filter-outlets.png"
        className={classes.image}
        alt="Input form filtering outlets"
      />
      <p>
        We have frequency data for 46 outlets from multiple countries. You may
        add up to four outlets in a single request.
      </p>

      <h3 className={classes.subSectionHeadings}>Y Axis Metrics</h3>
      <p>There are three metrics for viewing the data.</p>
      <div className={classes.listDiv}>
        <ul>
          <li>
            <h4 className={classes.subSectionHeadings}>Count</h4>
            <p>Count is the overall count of the word for a particular year.</p>
          </li>
          <li>
            <h4 className={classes.subSectionHeadings}>Rank</h4>
            <p>
              Rank is the count of the word sorted from greatest to smallest. The
              word with the highest count in a year will be rank one.
            </p>
          </li>
          <li>
            <h4 className={classes.subSectionHeadings}>Frequency</h4>
            <p>
              This option renders all data on a single chart. Words are
              differentiated by line color and outlets are differentiated by data
              point shape.
            </p>
          </li>
        </ul>
      </div>
      <h3 className={classes.subSectionHeadings}>Display options</h3>
      <p>
        There are four options for chart rendering available for frequency
        counts.
      </p>
      <div className={classes.listDiv}>
        <ul>
          <li>
            <h4 className={classes.subSectionHeadings}>Single</h4>
            <p>
              This option renders all data on a single chart. Words are
              differentiated by line color and outlets are differentiated by data
              point shape.
            </p>
          </li>
          <li>
            <h4 className={classes.subSectionHeadings}>Multiple</h4>
            <p>
              This option renders an individual chart for each outlet combined
              with each word. They are then arranged in a grid, with a row for
              each word and a column for each outlet.
            </p>
          </li>
          <li>
            <h4 className={classes.subSectionHeadings}>By Outlet</h4>
            <p>
              This options renders a chart for each outlet and displays the data
              for each word. Each word is differentiated by line color.
            </p>
          </li>
          <li>
            <h4 className={classes.subSectionHeadings}>By Word</h4>
            <p>
              This options renders a chart for each word and displays the data
              for each outlet. Outlets are differentiated by line color.
            </p>
          </li>
        </ul>
      </div>

      <h3 className={classes.subSectionHeadings}>
        Display Absolute vs Display Normalised
      </h3>
      <p>
        The default view of the data is to display absolute values. This allows
        you to directly compare values. In some situations the difference in
        absolute values between words or outlets maybe so large that comparing
        directly is impossible due to the small changes for one dataset being
        dwafed by large changes in another. Displaying normalised means each
        dataset is normalised to it&apos;s own maximum and minimum values using
        mean-max normalisation. This means that all data points for a particular
        word or outlet now have a value of between zero and one. This makes
        comparing datasets with large variations in scale easier but magnifies
        even small changes in numbers.
      </p>
      <br />
    </div>
  );
}
