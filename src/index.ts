// core-js and isomorphic-fetch for ie11 support
import 'core-js';
import 'isomorphic-fetch';

import 'styles.css';
import * as data from 'test.json';

const showButton = document.getElementById('show-button');

showButton.addEventListener(
  'click',
  async () => {
    // tslint:disable-next-line:space-in-parens
    const { init } = await import(/* webpackChunkName: 'init' */'./init');

    init();
  },
  { once: true },
);
