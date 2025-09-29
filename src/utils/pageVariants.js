export const pageVariants = {
  initial: {
    opacity: 0,
    x: -40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1], // "easeOutExpo" feel
      delay: .1,
    },
  },
  shopInitial: {
    opacity: 0,
    x: 50,
  },
};
