import browser from 'webextension-polyfill';
import { BadgeColors, BadgeText } from './constants';

/**
 * Updates badge view based on `isEnabled` state using action API.
 * @see https://developer.chrome.com/docs/extensions/reference/action/#badge
 *
 * When anonymity is enabled, the owner of the story
 * will not know that his story has been viewed.
 */
export default function updateBadge(isAnonymityEnabled: boolean): void {
  browser.action.setBadgeBackgroundColor({
    color: isAnonymityEnabled ? BadgeColors.ENABLED : BadgeColors.DISABLED,
  });

  browser.action.setBadgeText({
    text: isAnonymityEnabled ? BadgeText.ON : BadgeText.OFF,
  });
}
