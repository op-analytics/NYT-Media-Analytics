import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const LoggedOutRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <Route
      //eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={props =>
        //eslint-disable-next-line react/jsx-props-no-spreading
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />}
    />
  );
};

LoggedOutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default LoggedOutRoute;
