/* globals chrome */

const chbAutorun = document.getElementById('chbAutorun')
const txtKeywords = document.getElementById('txtKeywords')
const btnSave = document.getElementById('btnSave')
const btnCancel = document.getElementById('btnCancel')

const storage = chrome.storage.local

let isAutorun = window.localStorage['autorun']
let keywords = window.localStorage['keywords']

if (isAutorun === undefined || isAutorun === '') {
  isAutorun = true
}
chbAutorun.checked = isAutorun
txtKeywords.value = keywords

btnSave.addEventListener('click', () => {
  window.localStorage['autorun'] = chbAutorun.checked
  storage.set({ 'autorun': chbAutorun.checked })

  window.localStorage['keywords'] = txtKeywords.value
  storage.set({ 'keywords': txtKeywords.value })

  window.close()
})

btnCancel.addEventListener('click', () => {
  window.close()
})
