import * as classnames from 'classnames';
import { JSXRenderer } from 'lib/JSXRenderer';

import * as Models from './models';
import * as styles from './styles.css';

export const Header = (props: Models.IHeaderProps) => {
  const { showMainBlock, showButtonVisibility, setSourcesList, showError } = props;

  async function buttonOnClick() {
    try {
      // tslint:disable-next-line:space-in-parens
      const { getSourcesAsync } = await import(/* webpackChunkName: 'services' */'services');
      const sourcesList = await getSourcesAsync();

      setSourcesList(sourcesList);
      showMainBlock(true);
      showError('');
    } catch (error) {
      showError(error);
    }
  }

  return (
    <div className={styles['Header']}>
      <h1 className={styles['Header__title']}>ALL NEWS</h1>
      <button
        className={classnames(styles['Header__button'], {
          [styles['hidden']]: !showButtonVisibility,
        })}
        click={buttonOnClick}
      >
        SHOW NEWS
      </button>
    </div>
  );
};
