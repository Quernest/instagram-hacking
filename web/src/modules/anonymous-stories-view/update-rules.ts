import browser from 'webextension-polyfill';
import { StorySeenActions, STORY_SEEN_URL, UNIQUE_RULE_ID } from './constants';

/**
 * The core method that blocks the Instagram "seen" API request.
 */
export default function updateRules(isAnonymityEnabled: boolean): void {
  // @ts-ignore
  browser.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: UNIQUE_RULE_ID,
        priority: 1,
        condition: {
          urlFilter: STORY_SEEN_URL,
        },
        action: {
          type: isAnonymityEnabled
            ? StorySeenActions.BLOCK
            : StorySeenActions.ALLOW,
        },
      },
    ],
    removeRuleIds: [UNIQUE_RULE_ID],
  } as chrome.declarativeNetRequest.UpdateRuleOptions);
}
