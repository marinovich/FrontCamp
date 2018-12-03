import * as classnames from 'classnames';
import { JSXRenderer } from 'lib/JSXRenderer';

import { getArticlesAsync } from 'services';
import { generateLogoUrl } from 'utils';
import * as Models from './models';
import * as styles from './styles.css';

export const SourceItem = (props: Models.ISourceItemProps) => {
  const {
    source: { name, url, id },
    selectedSourceId,
    selectSourceItem,
    articlesMap,
    addArticles,
    showError,
  } = props;

  async function onItemSelect(): Promise<void> {
    if (articlesMap[id]) {
      selectSourceItem(id);
    }

    try {
      const articles = await getArticlesAsync(id);

      addArticles(id, articles);
      selectSourceItem(id);
      showError('');
    } catch (error) {
      showError(error);
    }
  }

  return (
    <li
      click={onItemSelect}
      className={classnames(styles['SourceItem'], {
        [styles['selected']]: id === selectedSourceId,
      })}
    >
      <img src={generateLogoUrl(url)} alt="news logo" class={styles['SourceItem__image']} />
      <h3 class={styles['SourceItem__caption']}>{name}</h3>
    </li>
  );
};
