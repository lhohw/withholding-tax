export const focus = (
  type: "next" | "prev",
  e: React.KeyboardEvent<HTMLOrSVGElement>,
  selector: string
) => {
  const filtered = Array.prototype.filter.call(
    document.querySelectorAll(selector),
    (elem: SVGElement) => {
      const target = e.target as HTMLElement;
      return type === "next"
        ? target.getClientRects()[0].y < elem.getClientRects()[0].y
        : target.getClientRects()[0].y > elem.getClientRects()[0].y;
    }
  );
  if (filtered.length)
    filtered[type === "next" ? 0 : filtered.length - 1].focus();
};
