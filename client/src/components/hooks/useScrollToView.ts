export function useScrollToView() {
  const scrollToView = (ref: React.MutableRefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return scrollToView;
}
