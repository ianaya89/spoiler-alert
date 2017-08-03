const autorun = document.getElementById('chbAutorun');
const keywords = document.getElementById('txtKeywords');
const save = document.getElementById('btnSave');

const storage = chrome.storage.local;

const isAutorun = localStorage['autorun'];

if (isAutorun === undefined || isAutorun === '') {
    isAutorun = true
}

automatic.checked = isAutorun;

// function eraseOptions() {
// 	localStorage.clear();
// 	location.reload();
// }

btnSave.addEventListener('click', () => {
    localStorage['autorun'] = autorun.checked;
    storage.set({ 'autorun': autorun.checked });
})