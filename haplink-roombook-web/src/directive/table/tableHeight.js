
export default {
  inserted(el, binding, vnode) {
    console.log(el,binding.value);
    let rect = el.getBoundingClientRect()
    console.log(rect);
    let card = document.querySelector(`.${binding.value}`)
    let cardRect = card.getBoundingClientRect()
    console.log(cardRect.height);
    // el.setAttribute("max-height",cardRect.height - rect.top)
    el.style["max-height"] = cardRect.height - rect.top + "px"
  }
}
