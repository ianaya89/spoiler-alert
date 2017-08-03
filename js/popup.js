/* globals chrome  */

chrome.tabs.executeScript(null, { code: 'gatear()' })

const btnSettings = document.getElementById('btnSettings')
btnSettings.addEventListener('click', () => chrome.runtime.openOptionsPage())
