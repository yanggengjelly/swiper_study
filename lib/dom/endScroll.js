export function endScroll(node) {
  return (node.scrollTop = node.scrollHeight);
}

export function startScroll(node) {
  return (node.scrollTop = 0);
}
