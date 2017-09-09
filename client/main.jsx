// import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { routes } from '../imports/components/Routes.jsx';

Meteor.startup(() => {
  render(routes(), document.getElementById('app'));
});
