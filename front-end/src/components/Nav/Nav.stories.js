import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Nav from '.';

export default {
  title: 'Components/Navbar',
  component: Nav,
};

const mockStore = configureStore();

const getWrapper = authenticated => {
  const initialState = { user: { authenticated } };
  const store = mockStore(initialState);
  //eslint-disable-next-line react/display-name
  return storyFn => (
    <Provider store={store}>
      <Router>{storyFn()}</Router>
    </Provider>
  );
};

const authenticated = getWrapper(true);
const unauthenticated = getWrapper(false);

const links = [
  [
    { href: '/', text: 'Home' },
    { href: '/timeline', text: 'Timeline' },
    { href: '/sentiment-analysis', text: 'Sentiment Analysis' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association' },
  ],
];

export const NavbarNoDivider = () =>
  unauthenticated(() => <Nav title="navbar" links={links} />);

export const NavbarWithDivider = () =>
  unauthenticated(() => (
    <Nav
      title="navbar-divider"
      links={[
        [
          { href: '/', text: 'Home' },
          { href: '/timeline', text: 'Timeline' },
          { href: '/sentiment-analysis', text: 'Sentiment Analysis' },
          { href: '/topic-modeling', text: 'Topic Modeling' },
          { href: '/latent-association', text: 'Latent Association' },
        ],
        [
          { href: '/about', text: 'About' },
          { href: '/docs', text: 'Docs' },
          { href: '/paper', text: 'Paper' },
        ],
      ]}
    />
  ));

export const NavbarAuthenticated = () =>
  authenticated(() => <Nav title="navbar" links={links} />);