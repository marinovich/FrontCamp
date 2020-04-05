import * as classnames from 'classnames';
import { JSXRenderer } from 'lib/JSXRenderer';

import * as Models from './models';
import * as styles from './styles.css';

export const ErrorBlock = (props: Models.IErrorBlockProps) => {
  const { errorMessage } = props;

  return (
    <div className={classnames(styles['ErrorBlock'], {
      [styles['hidden']]: !errorMessage,
    })}>
      <p className={styles['ErrorBlock__message']}>{errorMessage}</p>
    </div>
  );
};
