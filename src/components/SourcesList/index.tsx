import { JSXRenderer } from 'lib/JSXRenderer';

import { SourceItem } from 'components/SourceItem';
import * as Models from './models';
import * as styles from './styles.css';

export const SourcesList = (props: Models.ISourcesListProps) => (
  <ul className={styles['SourcesList']}>
    {props.sourcesList.map(source =>
      <SourceItem
        source={source}
        addArticles={props.addArticles}
        articlesMap={props.articlesMap}
        selectedSourceId={props.selectedSourceId}
        selectSourceItem={props.selectSourceItem}
        showError={props.showError}
      />,
    )}
  </ul>
);
