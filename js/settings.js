const autorun = document.getElementById('chbAutorun');
const keywords = document.getElementById('txtKeywords');
const btnSave = document.getElementById('btnSave');
const btnClose = document.getElementById('btnClose');

const storage = chrome.storage.local;

let isAutorun = localStorage['autorun'];

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

    window.close()
})

btnCancel.addEventListener('click', () => {
    window.close()
})