export const getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forces scrollbar to appear
  outer.style.width = "100px"; // set a fixed width

  outer.style.position = "absolute"; // Ensure it's positioned off-screen
  outer.style.top = "-9999px"; // Position off-screen
  document.body.appendChild(outer);

  // Create an inner element and append it to the outer
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  return scrollbarWidth;
};
