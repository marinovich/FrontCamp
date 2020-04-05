import { JSXRenderer } from 'lib/JSXRenderer';
import { ArticleItem } from 'components/ArticleItem';
import * as Models from './models';
import * as styles from './styles.css';

export const ArticlesList = (props: Models.IArticlesListProps) => {
  const { articlesMap, selectedSourceId: id } = props;

  return (
    <ul className={styles['ArticlesList']}>
      {articlesMap[id] && articlesMap[id].map(article =>
        <ArticleItem
          article={article}
        />,
      )}
    </ul>
  );
};
