import browser from 'webextension-polyfill';

/**
 * The script is designed to view Instagram stories anonymously.
 * Core functionality based on declarativeNetRequest API.
 * @see https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
 */

let isEnabled = true;

const updateBadge = (state: boolean) => {
  const badgeColors = {
    enabled: '#0097ff',
    disabled: '#777',
  };

  browser.action.setBadgeBackgroundColor({
    color: state ? badgeColors.enabled : badgeColors.disabled,
  });

  browser.action.setBadgeText({
    text: state ? 'On' : 'Off',
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
        type: 'block',
      },
    },
  ],
  removeRuleIds: [uniqueRuleId],
});
