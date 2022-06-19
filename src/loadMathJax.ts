declare global {
  interface Window {
    MathJax: any;
  }
}

export const loadMathJax = (): Promise<void> => {
  return new Promise((resolve) => {
    window.MathJax = {
      tex: {},
      svg: {
        fontCache: "none",
      },
      startup: {
        ready: () => {
          window.MathJax.startup.defaultReady();
          resolve();
        },
      },
    };
    // @ts-ignore
    void import("mathjax/es5/tex-svg-full");
  });
};
