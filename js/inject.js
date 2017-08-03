/* globals chrome NodeFilter */

function preventSpoilers (keywords, visitedNodes) {
  if (!keywords) {
    window.alert('You need to set your tv shows before run spoiler alert (press settings button).')
    return
  }

  let node
  const nodes = document.createNodeIterator(document.getElementsByTagName('body')[0], NodeFilter.SHOW_TEXT)
  const nodesArray = []

  while (node = nodes.nextNode()) { // eslint-disable-line
    if (visitedNodes && visitedNodes.includes(node)) { continue }

    nodesArray.push(node)

    if (node.parentElement &&
        (node.parentElement.tagName === 'STYLE' ||
            node.parentElement.tagName === 'SCRIPT' ||
            node.parentElement.tagName === 'NOSCRIPT')
    ) { continue }

    if (!node.nodeValue) { continue }

    const regex = new RegExp(keywords, 'i')
    if (node.nodeValue.match(regex)) {
      node.nodeValue = `⚠️ 👀 🚨 😱 [SPOILER ALERT] ⚠️ 👀 🚨 😱  ${node.nodeValue}`
    }
  }

  return nodesArray
}

function init () {
  chrome.storage.local.get('keywords', (result) => {
    if (!result.keywords) {
      window.alert('You need to set your tv shows before run spoiler alert (press settings button).')
      return
    }

    const keywords = result.keywords.replace(/,/g, '|').replace(/ /g, ' ?')
    let visitedNodes = preventSpoilers(keywords)

    window.onscroll = function (ev) {
      if (document.body.scrollHeight === document.body.scrollTop + window.innerHeight) {
        const newNodes = preventSpoilers(keywords, visitedNodes)
        visitedNodes = [...visitedNodes, ...newNodes]
      }
    }
  })
}

chrome.storage.local.get('autorun', (result) => {
  if (result.autorun) { init() }
})
