function gatear (visitedNodes) {
  let node
  const nodes = document.createNodeIterator(document.getElementsByTagName('body')[0], NodeFilter.SHOW_TEXT)
  const nodesArray = []

  while (node = nodes.nextNode()) {
    if (visitedNodes && visitedNodes.includes(node)) { continue }

    nodesArray.push(node)

    if (node.parentElement &&
            (node.parentElement.tagName === 'STYLE' ||
                node.parentElement.tagName === 'SCRIPT' ||
                node.parentElement.tagName === 'NOSCRIPT')
    ) { continue }

    if (!node.nodeValue) { continue }

    if (node.nodeValue.match(/game ?of ?thrones/i) ||
            node.nodeValue.match(/got/i)
    ) { node.nodeValue = `⚠️ 👀 🚨 😱  [SPOILER ALERT] ⚠️ 👀 🚨 😱  ${node.nodeValue}` }
  }

  return nodesArray
}

chrome.storage.local.get('automatic', function (result) {
  if (result.automatic || typeof result.automatic === 'undefined') {
    let visitedNodes = gatear()

    window.onscroll = function (ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        const newNodes = gatear(visitedNodes)
        visitedNodes = [...visitedNodes, ...newNodes]
      }
    }
  }
})
