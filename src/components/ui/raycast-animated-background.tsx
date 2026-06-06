import React, { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

let UnicornSceneModule: any = null;
let loadAttempted = false;
let loadFailed = false;

export default function RaycastAnimatedBackground() {
  const { width, height } = useWindowSize();
  const [UnicornScene, setUnicornScene] = useState<any>(null);

  useEffect(() => {
    if (loadFailed) return;
    if (UnicornSceneModule) {
      setUnicornScene(() => UnicornSceneModule);
      return;
    }
    if (loadAttempted) return;
    loadAttempted = true;

    import('unicornstudio-react')
      .then((mod) => {
        UnicornSceneModule = mod.default || mod;
        setUnicornScene(() => UnicornSceneModule);
      })
      .catch((error) => {
        console.warn('UnicornStudio failed to load:', error);
        loadFailed = true;
      });
  }, []);

  // Gracefully handle missing UnicornStudio in sandboxed/WebGL-disabled environments
  if (loadFailed) return null;
  if (!UnicornScene) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -25 }}
      aria-hidden="true"
    >
      <ErrorBoundary fallback={<div />}>
        <UnicornScene
          production={true}
          projectId="cbmTT38A0CcuYxeiyj5H"
          width={width}
          height={height}
        />
      </ErrorBoundary>
    </div>
  );
}

// Simple error boundary wrapper
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('UnicornStudio render error:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
