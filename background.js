'use strict';
var settings = new Store('settings', {
  timeout: 2*60 // = 2 hours, in minutes
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  var tabId = +alarm.name;
  chrome.tabs.update(tabId, { url: 'chrome://kill' });
});

function markForDeath(tabId) {
  chrome.alarms.create(''+tabId, { delayInMinutes: settings.get('timeout') });
}

chrome.tabs.onCreated.addListener(function(tab) { markForDeath(tab.id); });
chrome.tabs.onActivated.addListener(function(activeInfo) {
  if (localStorage.getItem('lastActivatedTabId') !== null) {
    markForDeath(localStorage.getItem('lastActivatedTabId'));
  }
  var tabId = activeInfo.tabId;
  chrome.alarms.clear(''+tabId);
  localStorage.setItem('lastActivatedTabId', tabId);
});
