import browser from 'webextension-polyfill';

/**
 * The script is designed to view Instagram stories anonymously.
 * Core functionality based on declarativeNetRequest API.
 * @see https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
 */

let isEnabled = true;

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

updateBadge(isEnabled);

browser.action.onClicked.addListener(() => {
  isEnabled = !isEnabled;
  updateBadge(isEnabled);
});

const uniqueRuleId = 1;

browser.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: uniqueRuleId,
      priority: 1,
      condition: {
        urlFilter: '*://*.instagram.com/api/v1/stories/reel/seen*',
      },
      action: {
        type: isEnabled ? 'allow' : 'block',
      },
    },
  ],
  removeRuleIds: [uniqueRuleId],
});
