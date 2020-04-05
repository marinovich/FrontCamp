import { JSXRenderer } from 'lib/JSXRenderer';

import { ArticlesList } from 'components/ArticlesList';
import { SourcesList } from 'components/SourcesList';
import * as Models from './models';
import * as styles from './styles.css';

export const Main = (props: Models.IMainProps) => {
  return (
    <div className={styles['Main']}>
      {
        props.mainBlockVisibility &&
        <SourcesList
          selectedSourceId={props.selectedSourceId}
          sourcesList={props.sourcesList}
          articlesMap={props.articlesMap}
          addArticles={props.addArticles}
          selectSourceItem={props.selectSourceItem}
          showError={props.showError}
        />
      }
      {
        !!props.selectedSourceId &&
        <ArticlesList
          articlesMap={props.articlesMap}
          selectedSourceId={props.selectedSourceId}
        />
      }
    </div>
  );
};
