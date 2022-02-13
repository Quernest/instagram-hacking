import browser from 'webextension-polyfill';

/**
 * The script is designed to view Instagram stories anonymously.
 * Core functionality based on declarativeNetRequest API.
 * @see https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
 */

/**
 * Anonymity state
 */
let isEnabled = true;

/**
 * Updates badge view based on `isEnabled` state using action API.
 * @see https://developer.chrome.com/docs/extensions/reference/action/#badge
 *
 * When anonymity is enabled, the owner of the story
 * will not know that his story has been viewed.
 */
const updateBadge = (isAnonymityEnabled: boolean) => {
  const badgeColors = {
    enabled: '#0097ff',
    disabled: '#777',
  };

  const badgeTexts = {
    on: 'On',
    off: 'Off',
  };

  browser.action.setBadgeBackgroundColor({
    color: isAnonymityEnabled ? badgeColors.enabled : badgeColors.disabled,
  });

  browser.action.setBadgeText({
    text: isAnonymityEnabled ? badgeTexts.on : badgeTexts.off,
  });
};

// Update badge based on initial state
updateBadge(isEnabled);

// Update badge view & state by clicking on the extension icon
browser.action.onClicked.addListener(() => {
  isEnabled = !isEnabled;
  updateBadge(isEnabled);
});

// Each rule must contain its own unique identifier
const uniqueRuleId = 1;

/**
 * 🙈 The core method that blocks the Instagram "seen" API request.
 */
browser.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: uniqueRuleId,
      priority: 1,
      condition: {
        urlFilter: '*://*.instagram.com/api/v1/stories/reel/seen*',
      },
      action: {
        type: isEnabled ? 'block' : 'allow',
      },
    },
  ],
  removeRuleIds: [uniqueRuleId],
});
