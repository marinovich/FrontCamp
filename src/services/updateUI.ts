import * as _ from 'lodash';

import { render } from 'components/Container';
import { store } from 'store';

// TODO: ASAP write correct comparison logic
// now it just replace old child with new one
export function updateUI() {
  const rootElement = document.getElementById('root');
  const newNode = render(store.getState());
  const firstChild = rootElement.children[0];

  // console.log('isEqual', _.isEqual(firstChild, newNode));
  // console.log('firstChild', firstChild);
  // console.log('newNode', newNode);

  firstChild && rootElement.removeChild(firstChild);
  rootElement.appendChild(newNode);
}
