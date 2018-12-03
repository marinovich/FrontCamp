// core-js and isomorphic-fetch for ie11 support
import 'core-js';
import 'isomorphic-fetch';

import { store } from 'store';
import { updateUI } from 'services/updateUI';

import 'styles/main.css';

store.subscribe(updateUI);
store.dispatch({});
