import { Actions } from 'components/Container/models';

export interface IHeaderProps {
  setSourcesList: Actions.setSourcesList;
  showButtonVisibility: boolean;
  showMainBlock: Actions.showMainBlock;
  showError: Actions.showError;
}
