/**
 * @file utils/domHelper.ts dom相关操作
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { ControlPosition } from "../interface";

export const isNodeFound = (current: Node, parentNode: Node): boolean => {
  // find current target in parentNode
  // return is found?
  if (current === parentNode) {
    return true;
  }

  while (current.parentNode) {
    current = current.parentNode;
    if (current === parentNode) {
      return true;
    }
  }

  return false;
};

export let getScrollbarWidth = () => {
  // get browser's scrollbar width
  // this can help to improve user experience
  if (window.innerHeight >= document.body.offsetHeight) {
    return 0;
  }
  const outer = document.createElement("div");
  outer.className = "scrollbar__wrap";
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  const scrollBarWidth = widthNoScroll - widthWithScroll;
  getScrollbarWidth = () => {
    return scrollBarWidth;
  };
  return scrollBarWidth;
};

export const windowScroll = (canScroll: boolean) => {
  // to allow window scroll or not
  // no scroll，set body style padding-right = scrollbar
  // scroll, setbody padding-right = 0
  if (canScroll) {
    document.getElementsByTagName("html")[0].style.overflow = "auto";
    document.getElementsByTagName("html")[0].style.paddingRight = "0px";
  } else {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName(
      "html"
    )[0].style.paddingRight = `${getScrollbarWidth()}px`;
  }
};

export const offsetXYFromParent = (
  // Get from offsetParent
  evt: { clientX: number; clientY: number },
  offsetParent: HTMLElement
): ControlPosition => {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody
    ? { left: 0, top: 0 }
    : offsetParent.getBoundingClientRect();

  const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

  return { x, y };
};
