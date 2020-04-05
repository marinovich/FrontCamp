import { JSXRenderer } from 'lib/JSXRenderer';

import { ErrorBlock } from 'components/ErrorBlock';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Main } from 'components/Main';
import * as ApiModels from 'models';
import * as actions from './actions';
import * as styles from './styles.css';

export const render = (props: ApiModels.IState): HTMLElement => (
  <div className={styles['body']}>
    <Header
      showButtonVisibility={props.showButtonVisibility}
      showMainBlock={actions.showMainBlock}
      setSourcesList={actions.setSourcesList}
      showError={actions.showError}
    />
    <ErrorBlock
      errorMessage={props.errorMessage}
    />
    <Main
      mainBlockVisibility={props.mainBlockVisibility}
      selectedSourceId={props.selectedSourceId}
      sourcesList={props.sourcesList}
      articlesMap={props.articlesMap}
      addArticles={actions.addArticles}
      selectSourceItem={actions.selectSourceItem}
      showError={actions.showError}
    />
    <Footer />
  </div>
);
