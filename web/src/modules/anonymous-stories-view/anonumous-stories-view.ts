import browser from 'webextension-polyfill';
import updateBadge from './update-badge';
import updateRules from './update-rules';

export interface AnonumousStoriesViewOptions {
  isAnonymityEnabled: boolean;
}

export default function initAnonumousStoriesView(
  options: AnonumousStoriesViewOptions,
) {
  let isAnonymityEnabledState = options.isAnonymityEnabled;

  updateBadge(isAnonymityEnabledState);
  updateRules(isAnonymityEnabledState);

  browser.action.onClicked.addListener(() => {
    isAnonymityEnabledState = !isAnonymityEnabledState;
    updateBadge(isAnonymityEnabledState);
    updateRules(isAnonymityEnabledState);
  });

  return {
    updateBadge,
    updateRules,
  };
}
