// core-js and isomorphic-fetch for ie11 support
import 'core-js';
import 'isomorphic-fetch';

import 'styles.css';

const showButton = document.getElementById('show-button');

showButton.addEventListener(
  'click',
  async () => {
    const { init } = await import(/* webpackChunkName: 'init' */'init'); // tslint:disable-line:space-in-parens

    init();
  },
  { once: true },
);
