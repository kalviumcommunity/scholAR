import '@testing-library/jest-dom'

// jsdom polyfill for matchMedia used by Header theme detection
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  // @ts-expect-error - define for tests
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as any;
}


