import { Card } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AboutSection from './components/AboutSection';
import ContributorSection from './components/ContributorSection';
import contributers from './contributers.json';

const useStyles = makeStyles({
  containerCard: {
    width: '45vw',
    padding: '2rem',
  },
});

const About = () => {
  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.containerCard}>
        <AboutSection />
        <br />
        <ContributorSection contributors={contributers} />
      </Card>
    </Container>
  );
};

export default About;