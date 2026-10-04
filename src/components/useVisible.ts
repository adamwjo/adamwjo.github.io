import { useEffect, useState } from "react";

/** Whether the element with this id is anywhere in the viewport. */
export function useVisible(id: string, initial = true) {
  const [visible, setVisible] = useState(initial);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return visible;
}
