declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

export const useUmami = () => {
  const track = (event: string, data?: Record<string, string | number>) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(event, data);
    }
  };

  return { track };
};
