// import * as _ from 'lodash';

import { render } from 'components/Container';
import { store } from 'store';

// TODO: ASAP write correct comparison logic
// now it just replace old child with new one
export function updateUI(
  parent = document.getElementById('root') as Element,
  oldNode = parent.children[0] as Element,
  newNode = render(store.getState()) as Element,
  // index = 0,
): void {

  oldNode && parent.removeChild(oldNode);
  parent.appendChild(newNode);

//   // console.log('parent', parent);
//   // console.log('oldNode', oldNode);
//   // console.log('newNode', newNode);

//   if (!oldNode) {
//     console.log('append');
//     parent.appendChild(newNode);
//   } else if (!newNode) {
//     console.log('remove', oldNode);
//     parent.removeChild(oldNode);
//   } else if (changed(newNode, oldNode)) {
//     console.log('replace', newNode, oldNode);
//     parent.replaceChild(newNode, oldNode);
//   } else if (newNode.tagName) {
//     console.log('compare');
//     const newLength = newNode.children.length;
//     const oldLength = oldNode.children.length;
//     for (let i = 0; i < newLength || i < oldLength; i++) {
//       updateUI(
//         parent.children[index],
//         oldNode.children[i] || null,
//         newNode.children[i] || null,
//         i,
//       );
//     }
//   }
}

// function changed(node1, node2): boolean {
//   return node1.tagName !== node2.tagName || node1.className !== node2.className;
//   // return true;
// }
