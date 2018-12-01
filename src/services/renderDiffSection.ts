import * as data from 'test.json';

export const renderDiffSection = (): void => {
  const { old: sourceData, new: filteredData } = data.default;
  const diffSection = document.getElementById('json-section');
  const sourceDataSection = document.getElementById('old-json');
  const filteredDataSection = document.getElementById('new-json');

  diffSection.classList.remove('hidden');
  sourceDataSection.innerHTML = JSON.stringify(sourceData, undefined, 2);
  filteredDataSection.innerHTML = JSON.stringify(filteredData, undefined, 2);
};
