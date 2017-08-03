/* globals chrome  */

const btnSettings = document.getElementById('btnSettings')
const btnPrevent = document.getElementById('btnPrevent')

btnSettings.addEventListener('click', () => chrome.runtime.openOptionsPage())
btnPrevent.addEventListener('click', () => {
  chrome.tabs.executeScript(null, { code: 'init()' })
  window.close()
})
