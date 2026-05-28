

Spline 3D robot on right side, positioned near the name
<iframe src='https://my.spline.design/genkubgreetingrobot-HUk8SkT2YoiY9A1LTIjfKHcI/' frameborder='0' width='100%' height='100%'></iframe>

---------------------


Aceternity 3D Cards

pnpm dlx shadcn@latest add @aceternity/3d-card-demo


"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}


-----------------


LogoLoop for tech stack, add what are the tech stack i knonw

pnpm dlx shadcn@latest add @react-bits/LogoLoop-JS-TW

import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

function App() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={60}
        gap={60}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
      
      {/* Vertical loop with deceleration on hover */}
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={60}
        gap={60}
        hoverSpeed={0}
        fadeOut
  useCustomRender={false}
/>
    </div>
  );
}


import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const cx = (...parts) => parts.filter(Boolean).join(' ');

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    if (prefersReduced) {
      track.style.transform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = timestamp => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'relative group',
          isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden',
          '[--logoloop-gap:32px]',
          '[--logoloop-logoHeight:28px]',
          '[--logoloop-fadeColorAuto:#ffffff]',
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
          className
        ),
      [isVertical, scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const renderLogoItem = useCallback(
      (item, key) => {
        if (renderItem) {
          return (
            <li
              className={cx(
                'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
                isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
                scaleOnHover && 'overflow-visible group/item'
              )}
              key={key}
              role="listitem"
            >
              {renderItem(item, key)}
            </li>
          );
        }

        const isNodeItem = 'node' in item;

        const content = isNodeItem ? (
          <span
            className={cx(
              'inline-flex items-center',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {item.node}
          </span>
        ) : (
          <img
            className={cx(
              'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
              '[-webkit-user-drag:none] pointer-events-none',
              '[image-rendering:-webkit-optimize-contrast]',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

        const inner = item.href ? (
          <a
            className={cx(
              'inline-flex items-center no-underline rounded',
              'transition-opacity duration-200 ease-linear',
              'hover:opacity-80',
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
            )}
            href={item.href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
              isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
              scaleOnHover && 'overflow-visible group/item'
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [isVertical, scaleOnHover, renderItem]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={cx('flex items-center', isVertical && 'flex-col')}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical]
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            {isVertical ? (
              <>
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-x-0 top-0 z-10',
                    'h-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-x-0 bottom-0 z-10',
                    'h-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-y-0 left-0 z-10',
                    'w-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-y-0 right-0 z-10',
                    'w-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
              </>
            )}
          </>
        )}

        <div
          className={cx(
            'flex will-change-transform select-none relative z-0',
            'motion-reduce:transform-none',
            isVertical ? 'flex-col h-max w-full' : 'flex-row w-max'
          )}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;

-------------------------------

 PillNav for nav bar 

 pnpm dlx shadcn@latest add @react-bits/PillNav-JS-TW

 import PillNav from './PillNav';
import logo from '/path/to/logo.svg';

<PillNav
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
  theme="light"
  initialLoadAnimation={false}
/>


import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  };

  return (
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">
      <nav
        className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            to={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={el => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #000)'
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || '#'}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={el => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #000)'
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
          </a>
        )}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                      style={{ background: 'var(--base, #000)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
        style={{
          ...cssVars,
          background: 'var(--base, #f0f0f0)'
        }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map(item => {
            const defaultStyle = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #fff)'
            };
            const hoverIn = e => {
              e.currentTarget.style.background = 'var(--base)';
              e.currentTarget.style.color = 'var(--hover-text, #fff)';
            };
            const hoverOut = e => {
              e.currentTarget.style.background = 'var(--pill-bg, #fff)';
              e.currentTarget.style.color = 'var(--pill-text, #fff)';
            };

            const linkClasses =
              'block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    to={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;


-------------------------------------

\This code is for change the scrolling style to this reveal scroll design for when each tab is clicked or scroll to that tab

pnpm dlx shadcn@latest add @react-bits/ScrollStack-JS-TW

import ScrollStack, { ScrollStackItem } from './ScrollStack'

<ScrollStack>
  <ScrollStackItem>
    <h2>Card 1</h2>
    <p>This is the first card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 2</h2>
    <p>This is the second card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 3</h2>
    <p>This is the third card in the stack</p>
  </ScrollStackItem>
</ScrollStack>


import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  // Container styles based on scroll mode
  const containerStyles = useWindowScroll
    ? {
        // Global scroll mode - no overflow constraints
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        // Container scroll mode - original behavior
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;

-----------------------------------------

3D Image gallery for use in my portfolio where its siuts best in my portfolio 


You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
3d-image-gallery.tsx
"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X } from "lucide-react"

/**
 * Single-file Stellar Card Gallery
 * - Context, Starfield, Galaxy, FloatingCard, Modal, and Page in one.
 */

/* =========================
   Card Context (inlined)
   ========================= */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { id: "1", imageUrl: "https://i.ibb.co/4ZWcP129/1.png", alt: "Elegant Invitation", title: "Elegant Invitation" },
    { id: "2", imageUrl: "https://i.ibb.co/TMbhBRcL/2.png", alt: "Modern Design", title: "Modern Design" },
    { id: "3", imageUrl: "https://i.ibb.co/spXBFdSm/3.png", alt: "Vintage Style", title: "Vintage Style" },
    { id: "4", imageUrl: "https://i.ibb.co/N2TCN0bC/4.png", alt: "Minimalist", title: "Minimalist" },
    { id: "5", imageUrl: "https://i.ibb.co/jZkh6q1M/5.png", alt: "Floral Design", title: "Floral Design" },
    { id: "6", imageUrl: "https://i.ibb.co/6cc7mksr/6.png", alt: "Geometric", title: "Geometric" },
    { id: "7", imageUrl: "https://i.ibb.co/bjV35jNQ/7.png", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "8", imageUrl: "https://i.ibb.co/PZ7WLs7g/8.png", alt: "Rustic Style", title: "Rustic Style" },
    { id: "9", imageUrl: "https://i.ibb.co/qLR5bQRM/9.png", alt: "Dark Modern", title: "Dark Modern" },
    { id: "10", imageUrl: "https://i.ibb.co/PdNhw3K/10.png", alt: "Colorful Party", title: "Colorful Party" },
    { id: "11", imageUrl: "https://i.ibb.co/zWpN1nqJ/11.png", alt: "Geometric", title: "Geometric" },
    { id: "12", imageUrl: "https://i.ibb.co/fVYnCXgR/12.png", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "13", imageUrl: "https://i.ibb.co/1G6jZWcZ/13.png", alt: "Rustic Style", title: "Rustic Style" },
    { id: "14", imageUrl: "https://i.ibb.co/xKG7m905/14.png", alt: "Dark Modern", title: "Dark Modern" },
    { id: "15", imageUrl: "https://i.ibb.co/7dJzR3xK/15.png", alt: "Colorful Party", title: "Colorful Party" },
    { id: "16", imageUrl: "https://i.ibb.co/NdJ1csXB/16.png", alt: "Elegant Script", title: "Elegant Script" },
    { id: "17", imageUrl: "https://i.ibb.co/8L2Sdt5Q/17.png", alt: "Watercolor Art", title: "Watercolor Art" },
    { id: "18", imageUrl: "https://i.ibb.co/mC1zxJYq/18.png", alt: "Botanical", title: "Botanical" },
    { id: "19", imageUrl: "https://i.ibb.co/wryzsKs4/20.png", alt: "Art Deco", title: "Art Deco" },
    { id: "20", imageUrl: "https://i.ibb.co/1fvnxL3L/19.png", alt: "Marble Luxury", title: "Marble Luxury" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background (inlined)
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

/* =========================
   Floating Card (inlined)
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#1F2121] p-3 select-none"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(49, 184, 198, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-md"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="text-white text-xs font-medium truncate">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal (inlined)
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseEnter = () => {}
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="relative max-w-md w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[16px] bg-[#1F2121] p-4 transition-all duration-500 ease-out w-full"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4" style={{ aspectRatio: "3 / 4" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px", opacity: 1 }}
              />
            </div>

            <h3 className="text-white text-lg font-semibold mb-4 text-center">{selectedCard.title}</h3>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-9 flex-1 items-center justify-center rounded-lg text-base font-medium text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4" strokeWidth={1.8} />
                  <span>Download</span>
                </div>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy (inlined)
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Page/Component Export
   ========================= */

export default function StellarCardGallerySingle() {
  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute top-4 left-4 z-20 text-white pointer-events-none">
          <h1 className="text-2xl font-bold mb-2">3D Stellar Card Gallery</h1>
          <p className="text-sm opacity-70">Drag to look around • Scroll to zoom • Click cards to view details</p>
        </div>
      </div>
    </CardProvider>
  )
}

demo.tsx
import StellarCardGallerySingle  from "@/components/ui/3d-image-gallery";

export default function DemoOne() {
  return <StellarCardGallerySingle />;
}

```

Install NPM dependencies:
```bash
three, lucide-react, @react-three/drei, @react-three/fiber
```


npx shadcn@latest add https://21st.dev/r/moazamtrade/3d-image-gallery

import StellarCardGallerySingle  from "@/components/ui/3d-image-gallery";

export default function DemoOne() {
  return <StellarCardGallerySingle />;
}



"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X } from "lucide-react"

/**
 * Single-file Stellar Card Gallery
 * - Context, Starfield, Galaxy, FloatingCard, Modal, and Page in one.
 */

/* =========================
   Card Context (inlined)
   ========================= */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { id: "1", imageUrl: "https://i.ibb.co/4ZWcP129/1.png", alt: "Elegant Invitation", title: "Elegant Invitation" },
    { id: "2", imageUrl: "https://i.ibb.co/TMbhBRcL/2.png", alt: "Modern Design", title: "Modern Design" },
    { id: "3", imageUrl: "https://i.ibb.co/spXBFdSm/3.png", alt: "Vintage Style", title: "Vintage Style" },
    { id: "4", imageUrl: "https://i.ibb.co/N2TCN0bC/4.png", alt: "Minimalist", title: "Minimalist" },
    { id: "5", imageUrl: "https://i.ibb.co/jZkh6q1M/5.png", alt: "Floral Design", title: "Floral Design" },
    { id: "6", imageUrl: "https://i.ibb.co/6cc7mksr/6.png", alt: "Geometric", title: "Geometric" },
    { id: "7", imageUrl: "https://i.ibb.co/bjV35jNQ/7.png", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "8", imageUrl: "https://i.ibb.co/PZ7WLs7g/8.png", alt: "Rustic Style", title: "Rustic Style" },
    { id: "9", imageUrl: "https://i.ibb.co/qLR5bQRM/9.png", alt: "Dark Modern", title: "Dark Modern" },
    { id: "10", imageUrl: "https://i.ibb.co/PdNhw3K/10.png", alt: "Colorful Party", title: "Colorful Party" },
    { id: "11", imageUrl: "https://i.ibb.co/zWpN1nqJ/11.png", alt: "Geometric", title: "Geometric" },
    { id: "12", imageUrl: "https://i.ibb.co/fVYnCXgR/12.png", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "13", imageUrl: "https://i.ibb.co/1G6jZWcZ/13.png", alt: "Rustic Style", title: "Rustic Style" },
    { id: "14", imageUrl: "https://i.ibb.co/xKG7m905/14.png", alt: "Dark Modern", title: "Dark Modern" },
    { id: "15", imageUrl: "https://i.ibb.co/7dJzR3xK/15.png", alt: "Colorful Party", title: "Colorful Party" },
    { id: "16", imageUrl: "https://i.ibb.co/NdJ1csXB/16.png", alt: "Elegant Script", title: "Elegant Script" },
    { id: "17", imageUrl: "https://i.ibb.co/8L2Sdt5Q/17.png", alt: "Watercolor Art", title: "Watercolor Art" },
    { id: "18", imageUrl: "https://i.ibb.co/mC1zxJYq/18.png", alt: "Botanical", title: "Botanical" },
    { id: "19", imageUrl: "https://i.ibb.co/wryzsKs4/20.png", alt: "Art Deco", title: "Art Deco" },
    { id: "20", imageUrl: "https://i.ibb.co/1fvnxL3L/19.png", alt: "Marble Luxury", title: "Marble Luxury" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background (inlined)
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

/* =========================
   Floating Card (inlined)
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#1F2121] p-3 select-none"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(49, 184, 198, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-md"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="text-white text-xs font-medium truncate">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal (inlined)
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseEnter = () => {}
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="relative max-w-md w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[16px] bg-[#1F2121] p-4 transition-all duration-500 ease-out w-full"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4" style={{ aspectRatio: "3 / 4" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px", opacity: 1 }}
              />
            </div>

            <h3 className="text-white text-lg font-semibold mb-4 text-center">{selectedCard.title}</h3>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-9 flex-1 items-center justify-center rounded-lg text-base font-medium text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4" strokeWidth={1.8} />
                  <span>Download</span>
                </div>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy (inlined)
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Page/Component Export
   ========================= */

export default function StellarCardGallerySingle() {
  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute top-4 left-4 z-20 text-white pointer-events-none">
          <h1 className="text-2xl font-bold mb-2">3D Stellar Card Gallery</h1>
          <p className="text-sm opacity-70">Drag to look around • Scroll to zoom • Click cards to view details</p>
        </div>
      </div>
    </CardProvider>
  )
}



------------------------------

Animated 3D MacBook Air  place this animation where it was suited on my portfolio page 

You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
animated-3d-mac-book-air.tsx
import React from 'react';

const Macbook: React.FC = () => {
  // Base classes for keys, animation will be added via custom-animate-keys
  const keyBaseClasses = "w-[6px] h-[6px] bg-[#444] float-left m-[1px] rounded-[2px] shadow-[0_-2px_0_#222] macbook-key custom-animate-keys";
  // Note: macbook-key applies transform: translateZ(-2px) from index.css
  // custom-animate-keys applies the animation.

  return (
    // `perspective` is applied by `macbook-container` class from index.css
    <div className="macbook-container w-[150px] h-[96px] absolute left-1/2 top-1/2 mt-[-85px] ml-[-78px]">
      {/* 
        `transform-style: preserve-3d` applied by `macbook-inner` from index.css.
        Initial transform `rotateX(-20deg) rotateY(0deg) rotateZ(0deg)` is the 0% state of `rotate` animation.
      */}
      <div className="macbook-inner custom-animate-rotate z-20 absolute w-[150px] h-[96px] left-0 top-0">
        {/* Screen */}
        {/* 
          `transform-style: preserve-3d` and `transform-origin` applied by `macbook-screen` from index.css.
          Initial transform `rotateX(0deg)` is 0% state of `lid-screen` animation.
        */}
        <div className={`macbook-screen custom-animate-lid-screen w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#ddd] 
                        bg-[linear-gradient(45deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0)_100%)] bg-left-bottom bg-[length:300px_300px] 
                        shadow-[inset_0_3px_7px_rgba(255,255,255,0.5)]`}>
          {/* `transform: translateZ(2px)` applied by `macbook-screen-face-one` from index.css */}
          <div className={`macbook-screen-face-one w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#d3d3d3]
                          bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}>
            <div className="w-[3px] h-[3px] rounded-full bg-black absolute left-1/2 top-[4px] ml-[-1.5px]"></div>
            <div className="w-[130px] h-[74px] m-[10px] bg-black bg-[length:100%_100%] rounded-[1px] relative shadow-[inset_0_0_2px_rgba(0,0,0,1)]">
              <div className={`custom-animate-screen-shade absolute left-0 top-0 w-[130px] h-[74px] 
                              bg-[linear-gradient(-135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_47%,rgba(255,255,255,0)_48%)] 
                              bg-[length:300px_200px] bg-[position:0px_0px]`}></div>
            </div>
            <span className="absolute top-[85px] left-[57px] text-[6px] text-[#666]">MacBook Air</span>
          </div>
        </div>

        {/* Body */}
        {/* 
          `transform-style: preserve-3d`, `transform-origin`, and initial `transform: rotateX(-90deg)` applied by `macbook-body` from index.css.
        */}
        <div className={`macbook-body custom-animate-lid-macbody w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#cbcbcb]
                        bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}>
          {/* 
            `transform-style: preserve-3d` and `transform: translateZ(-2px)` applied by `macbook-body-face-one` from index.css.
            Animation for background color.
          */}
          <div className={`macbook-body-face-one custom-animate-lid-keyboard-area w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#dfdfdf] 
                          bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}>
            <div className="w-[40px] h-[31px] absolute left-1/2 top-1/2 rounded-[4px] mt-[-44px] ml-[-18px] bg-[#cdcdcd] 
                            bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)] 
                            shadow-[inset_0_0_3px_#888]">
            </div>
            {/* `transform-style: preserve-3d` applied by `macbook-keyboard` from index.css */}
            <div className={`macbook-keyboard w-[130px] h-[45px] absolute left-[7px] top-[41px] rounded-[4px] bg-[#cdcdcd] 
                            bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)] 
                            shadow-[inset_0_0_3px_#777] pl-[2px] overflow-hidden`}>
              {Array.from({ length: 58 }).map((_, i) => (
                <div key={`key-norm-${i}`} className={keyBaseClasses}></div>
              ))}
              <div key="key-space" className={`${keyBaseClasses} w-[45px]`}></div>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`key-f-${i}`} className={`${keyBaseClasses} h-[3px]`}></div>
              ))}
            </div>
          </div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute left-[20px] top-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute right-[20px] top-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute right-[20px] bottom-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute left-[20px] bottom-[20px]"></div>
        </div>
      </div>
      {/* 
        Initial `transform` applied by `macbook-shadow` from index.css.
      */}
      <div className={`macbook-shadow custom-animate-macbook-shadow absolute w-[60px] h-[0px] left-[40px] top-[160px] 
                      shadow-[0_0_60px_40px_rgba(0,0,0,0.3)]`}>
      </div>
    </div>
  );
};

export {Macbook}

demo.tsx
import React from 'react';
import { Macbook } from "@/components/ui/animated-3d-mac-book-air";

const Demo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* The component is absolutely positioned, so this centering div is for context */}
      <Macbook />
    </div>
  );
};

export default Demo;
```

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):
```css
@import "tailwindcss";
@import "tw-animate-css";


@keyframes rotate {
  0% {
    transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
  }
  5% {
    transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg);
  }
  20% {
    transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg);
  }
  25% {
    transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg);
  }
  60% {
    transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg);
  }
  65% {
    transform: rotateX(-20deg) rotateY(120deg) rotateZ(0deg);
  }
  80% {
    transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg);
  }
  85% {
    transform: rotateX(-20deg) rotateY(357deg) rotateZ(0deg);
  }
  87% {
    transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg);
  }
}

@keyframes lid-screen {
  0% {
    transform: rotateX(0deg);
    background-position: left bottom;
  }
  5% {
    transform: rotateX(50deg);
    background-position: left bottom;
  }
  20% {
    transform: rotateX(-90deg);
    background-position: -150px top;
  }
  25% {
    transform: rotateX(15deg);
    background-position: left bottom;
  }
  30% {
    transform: rotateX(-5deg);
    background-position: right top;
  }
  38% {
    transform: rotateX(5deg);
    background-position: right top;
  }
  48% {
    transform: rotateX(0deg);
    background-position: right top;
  }
  90% {
    transform: rotateX(0deg);
    background-position: right top;
  }
  100% {
    transform: rotateX(0deg);
    background-position: right center;
  }
}

@keyframes lid-macbody {
  0% {
    transform: rotateX(-90deg);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

@keyframes lid-keyboard-area {
  0% {
    background-color: #dfdfdf;
  }
  50% {
    background-color: #bbb;
  }
  100% {
    background-color: #dfdfdf;
  }
}

@keyframes screen-shade {
  0% {
    background-position: -20px 0px;
  }
  5% {
    background-position: -40px 0px;
  }
  20% {
    background-position: 200px 0;
  }
  50% {
    background-position: -200px 0;
  }
  80% {
    background-position: 0px 0px;
  }
  85% {
    background-position: -30px 0;
  }
  90% {
    background-position: -20px 0;
  }
  100% {
    background-position: -20px 0px;
  }
}

@keyframes keys {
  0% {
    box-shadow: 0 -2px 0 #222;
  }
  5% {
    box-shadow: 1px -1px 0 #222;
  }
  20% {
    box-shadow: -1px 1px 0 #222;
  }
  25% {
    box-shadow: -1px 1px 0 #222;
  }
  60% {
    box-shadow: -1px 1px 0 #222;
  }
  80% {
    box-shadow: 0 -2px 0 #222;
  }
  85% {
    box-shadow: 0 -2px 0 #222;
  }
  87% {
    box-shadow: 0 -2px 0 #222;
  }
  100% {
    box-shadow: 0 -2px 0 #222;
  }
}

@keyframes macbook-shadow-animation {
  0% {
    transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }
  5% {
    transform: rotateX(80deg) rotateY(10deg) rotateZ(0deg);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }
  20% {
    transform: rotateX(30deg) rotateY(-20deg) rotateZ(-20deg);
    box-shadow: 0 0 50px 30px rgba(0,0,0,0.3);
  }
  25% {
    transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg);
    box-shadow: 0 0 35px 15px rgba(0,0,0,0.1);
  }
  60% {
    transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }
  100% {
    transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg);
    box-shadow: 0 0 60px 40px rgba(0,0,0,0.3);
  }
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them


-------------------------------------------------

The About me has one cricle 3D animation at left side so change that to related to about me section

-------------------------------------------------

I have added to 2 animations json file  The Bouncing Loader and Portal time use this animations also in my portfolio where its required.

------------------------------------------------- 

I have github link - https://github.com/Vaishu-Develops

Skip to content
Vaishu-Develops
User navigation
Overview
Repositories
24
 (24)
Projects
Packages
Stars
2
 (2)
Important update
On April 24 we'll start using GitHub Copilot interaction data for AI model training unless you opt out. Review this update and manage your preferences in your GitHub account settings.

Vaishnavi
Vaishu-Develops
 1 follower · 0 following
vaishnavisudarsanam11@gmail.com
Achievements
Achievement: YOLO
Achievement: Pull Shark
Achievement: Quickdraw
Highlights
 Pro
Find a repository…
AI_Powered_Deep_Secure_Steganography_Generator Public
A full-stack steganography application combining Deep Learning and AES Cryptography to securely hide images and text within cover images.
 Python Updated 3 days ago
Vaishu-Develops Public
Updated last week
AI_Powered_CGAP_Calculator Private
 TypeScript Updated 2 weeks ago
SarpGuard Public
An AI-powered, dual-layer security system designed to detect, classify, and alert you about snakes in real-time. Whether via uploaded video footage or a live webcam feed, SarpGuard guarantees safet…
 JavaScript Updated 3 weeks ago
PCB-Defect-Detection-and-Classification-System Public
Forked from springboardmentor822-cloud/PCB-Defect-Detection-and-Classification-System
MIT License Updated on Feb 24
Stock-Analysis-Multi-Agent Public
 JavaScript Updated on Feb 19
Payer_Side Public
The Hospital Schedule of Charges (SOC) Management – Payer-Side Dashboard is an advanced analytics platform designed to empower payer organizations with comprehensive insights into healthcare provid…
 JavaScript Updated on Feb 14
SyncSpace Public
SyncSpace is an all-in-one collaboration hub combining Kanban boards, real-time document editing, project chat, and file versioning. Designed for teams to work together instantly using MERN, Socket…
 JavaScript Updated on Dec 8, 2025
GigConnect Public
GigConnect is a MERN-based hyperlocal freelance marketplace connecting clients with nearby freelancers. Features include dual-role authentication, gig posting, search & filtering, real-time chat, r…
 JavaScript Updated on Nov 4, 2025
Multi-Agent-Stock-Analyzer Public
🤖 Multi-Agent AI Financial Analyst powered by Llama 4 Maverick via SambaNova. Analyze global stocks (US, Indian, European markets) with real-time data, generate comprehensive reports, and visualize…
 JavaScript Updated on Oct 8, 2025
RentMate Public
 JavaScript Updated on Sep 13, 2025
MentalHealth-Chatbot Public
A supportive AI companion for mental well-being with healing poetry integration.
 Python Updated on Sep 5, 2025
Audio-To-Text-Conversion Public
A powerful AI-driven application that transcribes audio files and searches subtitles using semantic similarity. This app mimics Shazam-like functionality for speech, built using cutting-edge tools …
 Python Updated on Jul 29, 2025
Food-Ordering-Web Public
 JavaScript Updated on Jul 26, 2025
Data-analytics Public
 Jupyter Notebook Updated on Jul 24, 2025
bookcraft-mockup-magic Private
 TypeScript Updated on Jun 16, 2025
learn-with-context Private
 TypeScript Updated on Jun 15, 2025
blog-platform Public
 TypeScript Updated on May 7, 2025
gift-gala-vibes Private
 TypeScript Updated on Apr 21, 2025
AITutor Public
 Python Updated on Mar 10, 2025
AI-Powered-Travel_Planner Public
 Python Updated on Mar 9, 2025
Gen-AI-Code-reviewer Public
 Python Updated on Feb 16, 2025
DayPlanner Public archive
 TypeScript Updated on Dec 15, 2024
Portfolio Public archive
 TypeScript Updated on Dec 15, 2024
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information


----------------------------------------

Use My linkined profile to get the information for portfolio

www.linkedin.com/in/vaishnavi-s-pro

0 notifications
Search



Home
My Network
Jobs
Messaging
22
Notifications

Me

For Business
Try Premium for ₹0

Vaishnavi S

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima



Enhance profile
Add section

Open to

Vaishnavi S
Add verification badge

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

Coimbatore South, Tamil Nadu, India

·

Contact info


Zaalima Development Pvt. Ltd


PPG Institute of Technology

61 followers

·

57 connections


Open to
Add section

Enhance profile

Open to work

Coimbatore South

Show details

Share that you’re hiring and attract qualified candidates.

Get started


Showcase your services as a section on your profile so your business can be easily discovered.

Add services


Tell non-profits you are interested in getting involved with your time and skills

Get started



Suggested for you
Private to you

Stand out to employers

Enhance your profile, craft standout messages, and assess job fit with Premium.

Try Premium for ₹0
1-month free trial. Cancel whenever. We’ll remind you 7 days before your trial ends.


Analytics
Private to you

30 profile views

Discover who’s viewed your profile.

5 post impressions

Check out who’s engaging with your posts.

Past 7 days

9 search appearances

See how often you appear in search results.

Show all
About
While many web applications today are built on standard CRUD operations, I specialize in engineering systems that are intelligent, collaborative, and real-time. I am a Computer Engineering student at PPG Institute of Technology (graduating Jan 2026) focusing on the intersection of MERN Stack development and Generative AI.

My Engineering Impact:

Healthcare Analytics (Tecforz Innovations): Architected a 26-module Hospital SOC dashboard using React and FastAPI. Successfully delivered the project and was recognized with a ₹10,000 stipend for excellence. * Real-Time Collaboration (Zaalima Development): Developed Sync Space, featuring live document editing and Kanban boards using Socket.IO, Yjs, and Tiptap.

Agentic AI (Innomatics Research Labs): Built a Multi-Agent Stock Analyst powered by Llama 4 and developed RAG pipelines using LangChain.

I thrive on building high-performance backends and intuitive, AI-powered user experiences. Let’s connect and discuss the future of intelligent web platforms!… more

Featured

Reshared by Vaishnavi S

Grateful for the opportunity. Proud of the outcome. ✨

Extremely proud to be named a Standout Performer at Zaalima Development Pvt. Ltd.!
Behind this recognition (and this awesome gift box 🎁) were weeks of refining Socket.IO events for Sync Space and optimizing MERN stack performance to ensure real-time collaboration actually felt real-time.
Internships test your ability to turn theory into deployed software. I’m glad to say: Test Passed. ✅

Thank you to the Zaalima Development Pvt. Ltd team for pushing me to write better, cleaner, and more scalable code.

#Engineering #MERNStack #RealTimeSystems #HardWorkPaysOff #Zaalima #CodeLife


3

Post

🏥 Payer-Side Hospital SOC | Frontend Engineering

During my Frontend Developer Internship at Tecforz Innovations Pvt Ltd, I worked on the frontend of a Hospital Schedule of Charges (SOC) dashboard built for payer-side analytics.
The system focuses on operational, compliance, and network-level insights for insurers, covering hospital capacity metrics, certification tracking, and geographic specialty coverage analysis.

My work involved:
Developing scalable React components
Integrating REST APIs from a FastAPI backend
Handling analytics-heavy data flows across 26 dashboard modules
Stack used:
 React.js, Vite, Ant Design
 Chart.js, Recharts, Leaflet
 FastAPI, Python, Uvicorn

I’m grateful to Tecforz Innovations Pvt Ltd and my mentor @Sindhuja Kannan for the guidance, structured workflows, and exposure to building real health-tech systems. I was also appreciated with a ₹10,000 stipend upon successful delivery.

🔗 Code & structure:
https://lnkd.in/gfz6wp8X

#SoftwareEngineering #FrontendDevelopment #ReactJS #MERNStack
#FastAPI #HealthTech #DataVisualization #GenAI
#InternshipExperience #WebDevelopment


4 · 2 comments

Post


Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate

catalog-education.oracle.com

Post

🚀 🎵 Audio Recognition & Subtitle Search Tool 🎧
 I'm excited to share my latest project—a powerful audio recognition tool that can transcribe audio and search through subtitle databases with remarkable accuracy! 🎯

✅ Key Features:
 🔹 Audio Transcription: Using OpenAI’s Whisper model, it converts speech into text with high precision.
 🔹 Subtitle Search: Leverages ChromaDB and SentenceTransformers to quickly find matching subtitles.
 🔹 User-Friendly Interface: Built with Gradio for smooth audio uploads and processing.
⚙️ Tech Stack:
 🔹 Python 🐍
 🔹 Whisper AI 🗣️
 🔹 FFmpeg 🎥
 🔹 ChromaDB 📚
 🔹 Gradio 🚀

🔗 Try it out: https://lnkd.in/giUkqKk4 (Active for the next 72 hours only!)
 🔗 GitHub Repository: https://lnkd.in/g3M3nFGb

💡 This project wouldn't have been possible without the support of Innomatics Research Labs during my internship. A huge thanks to Kanav Bansal for his incredible mentorship and guidance throughout this journey! 🙏
I'm excited to keep exploring AI-powered solutions and building more innovative projects. 🎯

 👉 Check it out and share your thoughts!

#ArtificialIntelligence #AI #MachineLearning #Python #WhisperAI #Gradio #ChromaDB #FFmpeg #AudioTranscription #OpenSourceProjects #InnomaticsResearchLabs #TechInnovation 🚀


2 · 1 comment

Post

Sharing the demo of SyncSpace 🎉 a real-time platform built to simplify the way teams work together. With collaborative documents (Yjs + Tiptap), an interactive Kanban board, live chat, notifications, and file versioning, SyncSpace brings everything into one powerful workspace.

🔗 Live Demo: https://lnkd.in/gWuXsvyq
💻 GitHub Repo: https://lnkd.in/giFy_NFy

Huge appreciation to Zaalima Development for guiding me through each phase of this project and helping me grow as a developer 🙌✨


4


Activity
61 followers

Create a post

Posts

Comments

Videos

Images

Documents
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

1mo • 


Grateful for the opportunity. Proud of the outcome. ✨

Extremely proud to be named a Standout Performer at Zaalima Development Pvt. Ltd.!
Behind this recognition (and this awesome gift box 🎁) were weeks of refining Socket.IO events for Sync Space and optimizing MERN stack performance to ensure real-time collaboration actually felt real-time.
Internships test your ability to turn theory into deployed software. I’m glad to say: Test Passed. ✅

Thank you to the Zaalima Development Pvt. Ltd team for pushing me to write better, cleaner, and more scalable code.

#Engineering #MERNStack #RealTimeSystems #HardWorkPaysOff #Zaalima #CodeLife… more

View company: Zaalima Development Pvt. Ltd
Zaalima Development Pvt. Ltd

11,416 followers

Sign up

1mo • 

🎯 𝐓𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐢𝐧𝐠 𝐓𝐚𝐥𝐞𝐧𝐭 𝐢𝐧𝐭𝐨 𝐓𝐫𝐢𝐮𝐦𝐩𝐡𝐬 – 𝐓𝐡𝐞 𝐙𝐚𝐚𝐥𝐢𝐦𝐚 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭 𝐈𝐧𝐭𝐞𝐫𝐧𝐬𝐡𝐢𝐩 𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞! 🚀

At Zaalima Development Pvt. Ltd., we believe the right opportunity can unlock extraordinary potential. Our internship program isn’t just about learning—it’s a 𝐥𝐚𝐮𝐧𝐜𝐡𝐩𝐚𝐝 𝐟𝐨𝐫 𝐟𝐮𝐭𝐮𝐫𝐞 𝐢𝐧𝐧𝐨𝐯𝐚𝐭𝐨𝐫𝐬, 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐬, 𝐚𝐧𝐝 𝐥𝐞𝐚𝐝𝐞𝐫𝐬.

👨‍💻 Over the past few months, our interns made real impact by contributing to live projects with dedication, creativity, and excellence. With ₹𝟕𝟓,𝟎𝟎𝟎+ 𝐢𝐧 𝐬𝐭𝐢𝐩𝐞𝐧𝐝𝐬 𝐚𝐧𝐝 𝐫𝐞𝐰𝐚𝐫𝐝𝐬 𝐝𝐢𝐬𝐭𝐫𝐢𝐛𝐮𝐭𝐞𝐝, we proudly recognize performance and fuel ambition.

🎉 𝐂𝐞𝐥𝐞𝐛𝐫𝐚𝐭𝐢𝐧𝐠 𝐎𝐮𝐫 𝐈𝐧𝐭𝐞𝐫𝐧𝐬
 To honor their journey, we hosted a memorable appreciation event featuring:
 🎁 Personalized gift boxes
 👕 Premium Zaalima-branded T-shirts
 🏆 Special achievement rewards
 💫 Motivational moments with Team Zaalima Development Pvt. Ltd

💥 From building features to solving real-world challenges, our interns demonstrated resilience, innovation, and leadership—proving the next generation of tech talent is ready to rise.

🔥 𝐀 𝐡𝐮𝐠𝐞 𝐬𝐡𝐨𝐮𝐭-𝐨𝐮𝐭 𝐭𝐨 𝐨𝐮𝐫 𝐬𝐭𝐚𝐧𝐝𝐨𝐮𝐭 𝐩𝐞𝐫𝐟𝐨𝐫𝐦𝐞𝐫𝐬 who went above and beyond, inspiring everyone around them! 🌟
 …and many more exceptional achievers!

📢 Whether you’re an aspiring developer or an eager learner, 𝐲𝐨𝐮𝐫 𝐣𝐨𝐮𝐫𝐧𝐞𝐲 𝐨𝐟 𝐠𝐫𝐨𝐰𝐭𝐡 𝐛𝐞𝐠𝐢𝐧𝐬 𝐡𝐞𝐫𝐞 𝐚𝐭 Zaalima Development Pvt. Ltd… more

View image
1/3

Swathika T and 2 others reactedSwathika T and 2 others


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

2mo • 


I’m thrilled to share that I have completed my Web Development internship at Zaalima Development! 🎓
Over the last two months, I focused on building scalable applications using the MERN Stack. Here is a look at the two major projects I delivered:

🚀 1. GigConnect – Hyperlocal Freelance Marketplace A full-stack platform connecting local clients with freelancers. Features include real-time messaging, profile management, and secure payment integration. 
🔗 GitHub: https://lnkd.in/ggF-Zf3c

🤝 2. Sync Space – Collaboration Hub An all-in-one productivity tool featuring Kanban boards and live document editing. I engineered the real-time collaboration features using Socket.IO, Yjs, and Tiptap. 
🔗 GitHub: https://lnkd.in/giFy_NFy

A huge thank you to the team at Zaalima Development Pvt. Ltd Development for the mentorship and the opportunity to work on production-level code.

#MERNStack #FullStackDeveloper #OpenSource #SocketIO #WebDevelopment #ReactJS #NodeJS #Internship… more

View image
1/4

Mathiazhagan A R and 3 others reactedMathiazhagan A R and 3 others


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

2mo • 



Oracle Cloud Infrastructure 2025 Certified AI Foundations AssociateOracle Cloud Infrastructure 2025 Certified AI Foundations Associate

catalog-education.oracle.com


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

2mo • 


I’m happy to share that I’ve obtained a new certification: Certificate of Participation in AIQrew 2025 from Unstop! 

View celebration image
Celebrating a new certification

Sindhuja Kannan and 6 others reactedSindhuja Kannan and 6 others


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

2mo • 


🏥 Payer-Side Hospital SOC | Frontend Engineering

During my Frontend Developer Internship at Tecforz Innovations Pvt Ltd, I worked on the frontend of a Hospital Schedule of Charges (SOC) dashboard built for payer-side analytics.
The system focuses on operational, compliance, and network-level insights for insurers, covering hospital capacity metrics, certification tracking, and geographic specialty coverage analysis.

My work involved:
Developing scalable React components
Integrating REST APIs from a FastAPI backend
Handling analytics-heavy data flows across 26 dashboard modules
Stack used:
 React.js, Vite, Ant Design
 Chart.js, Recharts, Leaflet
 FastAPI, Python, Uvicorn

I’m grateful to Tecforz Innovations Pvt Ltd and my mentor @Sindhuja Kannan for the guidance, structured workflows, and exposure to building real health-tech systems. I was also appreciated with a ₹10,000 stipend upon successful delivery.

🔗 Code & structure:
https://lnkd.in/gfz6wp8X

#SoftwareEngineering #FrontendDevelopment #ReactJS #MERNStack
#FastAPI #HealthTech #DataVisualization #GenAI
#InternshipExperience #WebDevelopment
… more

View image
1/6

Swathika T and 3 others reactedSwathika T and 3 others

2 comments2 comments


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

3mo • Edited • 


Sharing the demo of SyncSpace 🎉 a real-time platform built to simplify the way teams work together. With collaborative documents (Yjs + Tiptap), an interactive Kanban board, live chat, notifications, and file versioning, SyncSpace brings everything into one powerful workspace.

🔗 Live Demo: https://lnkd.in/gWuXsvyq
💻 GitHub Repo: https://lnkd.in/giFy_NFy

Huge appreciation to Zaalima Development for guiding me through each phase of this project and helping me grow as a developer 🙌✨… more



4 reactions4


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

10mo • 


🚀 Successfully Completed My Generative AI Internship! 🤖
I'm thrilled to announce the completion of the Advanced Generative AI Internship Program at Innomatics Research Labs, held from 18-02-2025 to 21-03-2025.

During this immersive experience, I gained hands-on proficiency in:
 🧠 Building Conversational AI Chatbots with Memory
 📚 Implementing RAG Architectures (Retrieval-Augmented Generation)
 🛠 Designing Agentic AI Systems using LangChain

A heartfelt thank you to Kanav Bansal for the mentorship and to the entire team at Innomatics Research Labs for facilitating such a transformative learning journey!

Excited to continue exploring the world of AI and contribute to real-world solutions! 🌐✨


#GenerativeAI #LangChain #AIInternship #Chatbots #RAGArchitecture #AgenticAI #InnomaticsResearchLabs #KanavBansal #AI #CareerMilestone… more

My Generative AI Internship

1 page

Vaishnavi Sudharsanam 18-02-2025 21-03-2025 IN12510971 C411121
1 / 1


3 reactions3


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

10mo • 


📄 Grateful to Receive a Letter of Recommendation!
I’m pleased to share that I have been awarded a Letter of Recommendation from Innomatics Research Labs upon the successful completion of my internship.
Working under the guidance of Kanav Bansal was an enriching experience, allowing me to grow in the areas of Generative AI, LangChain, and Advanced Data Analysis. This recommendation stands as a testament to the hard work, collaboration, and learning I’ve gained over the past months.
Thank you to my mentors and the entire team at Innomatics Research Labs for the opportunity and continued support!

#LetterOfRecommendation #AIInternship #InnomaticsResearchLabs #CareerGrowth #LangChain #GenerativeAI #DataAnalysis #Gratitude #KanavBansal… more

Letter of Recommendation

2 pages


Date: 8th May, 2025 Letter of Recommendation To whomsoever, it may concern With great pride and pleasure, we recommend Vaishnavi Sudharsanam, Intern ID - IN12510971, who successfully completed their internship in Data Science with Generative AI from Innomatics Research Labs, from January 27, 2025, to March 21, 2025. Throughout the entire internship tenure, they have successfully completed various projects and tasks assigned in time, including: - Problem Solving using Python Programming: Achieved a 5-star Python badge on HackerRank by solving 50+ challenging problems, showcasing strong problem-solving and Python programming skills. - Keyword based Resume Screening to Enhance Recruitment Efficiency: Developed a scalable automated resume screening pipeline to streamline recruitment processes, handling 1000's of resumes in both .pdf and .docx formats - AI Code Reviewer App: Executed the development of a Python application aimed at providing users with comprehensive feedback on their Python code submissions. - Enhancing Search Engine Relevance for Video Subtitles: Engineered a Retrieval- Augmented Generation (RAG) system using the LangChain framework, leveraging advanced LLMs like Gemini 2.0 Pro to enhance subtitle-based information retrieval and semantic search capabilities. - Multi-Agentic System Development: Built an agentic system using LangGraph integrated with custom tools and external APIs to answer real-time queries like current time and astronauts in space, showcasing tool-augmented LLM capabilities.
1 / 2


0

5 reactions5

1 comment1 comment


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

10mo • 


🎉 Internship Successfully Completed! 🎉
I'm proud to share that I have completed the Advanced Data Analysis Internship Program at Innomatics Research Labs from 27-01-2025 to 17-02-2025.
During this internship, I had the opportunity to work on impactful projects and enhance my skills in:
 ✅ Python Programming
 ✅ Problem Solving
 ✅ Exploratory Data Analysis (EDA)
 ✅ Reporting and Visualization
Special thanks to my mentor Kanav Bansal and the entire team at Innomatics Research Labs for their invaluable guidance and support throughout this journey. Your mentorship made this learning experience both insightful and inspiring!

#Internship #DataAnalysis #Python #EDA #CareerGrowth #LearningJourney #InnomaticsResearchLabs #KanavBansal #Thankful #CertificateEarned… more

Advanced Data Analysis Internship Program

1 page

Vaishnavi Sudharsanam 27-01-2025 17-02-2025 C261702 IN12510971
1 / 1


2 reactions2


Like

Comment

Repost
Send
Vaishnavi S

 • You

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima

1yr • Edited • 


🚀 🎵 Audio Recognition & Subtitle Search Tool 🎧
 I'm excited to share my latest project—a powerful audio recognition tool that can transcribe audio and search through subtitle databases with remarkable accuracy! 🎯

✅ Key Features:
 🔹 Audio Transcription: Using OpenAI’s Whisper model, it converts speech into text with high precision.
 🔹 Subtitle Search: Leverages ChromaDB and SentenceTransformers to quickly find matching subtitles.
 🔹 User-Friendly Interface: Built with Gradio for smooth audio uploads and processing.
⚙️ Tech Stack:
 🔹 Python 🐍
 🔹 Whisper AI 🗣️
 🔹 FFmpeg 🎥
 🔹 ChromaDB 📚
 🔹 Gradio 🚀

🔗 Try it out: https://lnkd.in/giUkqKk4 (Active for the next 72 hours only!)
 🔗 GitHub Repository: https://lnkd.in/g3M3nFGb

💡 This project wouldn't have been possible without the support of Innomatics Research Labs during my internship. A huge thanks to Kanav Bansal for his incredible mentorship and guidance throughout this journey! 🙏
I'm excited to keep exploring AI-powered solutions and building more innovative projects. 🎯

 👉 Check it out and share your thoughts!

#ArtificialIntelligence #AI #MachineLearning #Python #WhisperAI #Gradio #ChromaDB #FFmpeg #AudioTranscription #OpenSourceProjects #InnomaticsResearchLabs #TechInnovation 🚀
… more



2 reactions2

1 comment1 comment


Like

Comment

Repost
Send

Show all
Profile language
English

Public profile & URL
www.linkedin.com/in/vaishnavi-s-pro


Who your viewers also viewed
Private to you


Someone at Karpagam Academy of Higher Education


View

Someone in the IT Services and IT Consulting industry from Greater Coimbatore Area


View

Student at St. Joseph's College Of Engineering


View

Someone at PPG Institute of Technology


View
People you may know
From your company


Jagathish kumar Uthiran 

· 3rd

Aspiring Full-Stack Developer | Proficient in React, JavaScript, and Responsive Design | Problem-Solver with Analytical Expertise | Building Scalable and User-Centric Web Applications

Message

Ibrahim A

· 3rd+

Data Analyst- MySql|Python|Excel|PowerBi|Tableau|Bussiness Analyst

Message

Sambath E

· 3rd

Data Science & Analyst | Python | SQL

Message

Elavarasan C 

· 2nd

Final Year CSE Student | Web Developer & Front-End Enthusiast | Skilled in HTML, CSS, JavaScript, React, Java & Python | Exploring UI/UX Design & Social Media Marketing


Connect

Sharon Hanna

· 3rd

Pre-final year student | AI & Data Science Undergraduate | 2 x AWS CERTIFIED | ML & NLP Enthusiast | Intern @Zaalima Development Pvt. Ltd.|

Message
Show all
You might like
Pages for you


Infosys Springboard

Education

771,845 followers


Mani & 7 other connections follow this page


Follow

GeeksforGeeks

Education

2,781,791 followers


Gabriel & 13 other connections follow this page


Follow
Show all

About

Accessibility

Talent Solutions

Community Guidelines

Careers

Marketing Solutions 

Privacy & Terms

Ad Choices

Advertising

Sales Solutions

Mobile

Small Business

Safety Center

LinkedIn Corporation © 2026

Questions?

Visit our Help Center.

Manage your account and privacy

Go to your Settings.

Recommendation transparency

Learn more about Recommended Content.

Select language


English (English)
Vaishnavi SStatus is online
MessagingYou are on the messaging overlay. Press enter to open the list of conversations.

Compose message
You are on the messaging overlay. Press enter to open the list of conversations.


0 notifications
Search



Home
My Network
Jobs
Messaging
22
Notifications

Me

For Business
Try Premium for ₹0

Vaishnavi S

Full Stack & AI Enthusiast | MERN & GenAI Specialist | Building Multi-Agent Financial Tools & Real-Time Collab Hubs | Ex-Intern @ Innomatics, Tecforz & Zaalima



Enhance profile
Add section

Open to
Skills



All

Industry Knowledge

Tools & Technologies

Other Skills
Full-Stack Development


Web Development Intern at Zaalima Development Pvt. Ltd

Generative AI


Advanced Generative AI Intern at Innomatics Research Labs


Certificate of Participation in AIQrew 2025

Web Development


Web Development Intern at Zaalima Development Pvt. Ltd

Python (Programming Language)


2 experiences at Innomatics Research Labs

MERN Stack


Web Development Intern at Zaalima Development Pvt. Ltd

Data Analysis


Advanced Data Analysis Intern at Innomatics Research Labs

Large Language Models (LLMs)


Advanced Generative AI Intern at Innomatics Research Labs

RAG (Retrieval-Augmented Generation)


Advanced Generative AI Intern at Innomatics Research Labs

LangChain


Advanced Generative AI Intern at Innomatics Research Labs

Frontend Development


Frontend Developer Intern at Tecforz Innovations Pvt Ltd

REST APIs


Frontend Developer Intern at Tecforz Innovations Pvt Ltd

React.js


Frontend Developer Intern at Tecforz Innovations Pvt Ltd

FastAPI


Frontend Developer Intern at Tecforz Innovations Pvt Ltd

Data Visualization


2 experiences at Tecforz Innovations Pvt Ltd and 1 other company

Exploratory Data Analysis (EDA)


Advanced Data Analysis Intern at Innomatics Research Labs

JavaScript


Web Development Intern at Zaalima Development Pvt. Ltd

Socket.io


Web Development Intern at Zaalima Development Pvt. Ltd

Yjs


Web Development Intern at Zaalima Development Pvt. Ltd


Who your viewers also viewed
Private to you


Someone at Karpagam Academy of Higher Education


View

Someone in the IT Services and IT Consulting industry from Greater Coimbatore Area


View

Student at St. Joseph's College Of Engineering


View

Someone at PPG Institute of Technology


View

About

Accessibility

Talent Solutions

Community Guidelines

Careers

Marketing Solutions 

Privacy & Terms

Ad Choices

Advertising

Sales Solutions

Mobile

Small Business

Safety Center

LinkedIn Corporation © 2026

Questions?

Visit our Help Center.

Manage your account and privacy

Go to your Settings.

Recommendation transparency

Learn more about Recommended Content.

Select language


English (English)
Vaishnavi SStatus is online
MessagingYou are on the messaging overlay. Press enter to open the list of conversations.

Compose message
You are on the messaging overlay. Press enter to open the list of conversations.


