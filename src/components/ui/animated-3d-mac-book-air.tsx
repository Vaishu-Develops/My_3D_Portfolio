import React from 'react';

const Macbook: React.FC = () => {
  // Base classes for keys, animation will be added via custom-animate-keys
  const keyBaseClasses = "w-[6px] h-[6px] bg-[#444] float-left m-[1px] rounded-[2px] shadow-[0_-2px_0_#222] macbook-key custom-animate-keys";
  // Note: macbook-key applies transform: translateZ(-2px) from index.css
  // custom-animate-keys applies the animation.

  return (
    // `perspective` is applied by `macbook-container` class from index.css
    <div className="macbook-container w-[150px] h-[96px] relative mx-auto">
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
            {/* Webcam dot */}
            <div className="w-[3px] h-[3px] rounded-full bg-black absolute left-1/2 top-[4px] ml-[-1.5px]"></div>
            {/* VS Code Dark Editor Screen */}
            <div className="w-[130px] h-[74px] m-[10px] rounded-[1px] overflow-hidden relative" style={{ background: '#0d1117' }}>
              {/* Title bar */}
              <div className="flex items-center gap-1 px-1.5 py-0.5" style={{ background: '#161b22', borderBottom: '1px solid #21262d' }}>
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-1 h-1 rounded-full" style={{ background: '#ffbd2e' }} />
                  <div className="w-1 h-1 rounded-full" style={{ background: '#28c840' }} />
                </div>
                <div className="flex-1 text-center" style={{ fontSize: '3.5px', color: '#58a6ff', fontFamily: 'monospace' }}>portfolio.tsx</div>
              </div>
              {/* Code lines */}
              <div className="px-1.5 pt-0.5" style={{ fontFamily: 'monospace', fontSize: '4px', lineHeight: '1.6' }}>
                <div><span style={{ color: '#ff7b72' }}>import</span> <span style={{ color: '#e6edf3' }}>React</span> <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>'react'</span></div>
                <div><span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#79c0ff' }}>Vaishnavi</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#e6edf3' }}>()</span> <span style={{ color: '#ff7b72' }}>=&gt;</span> <span style={{ color: '#e6edf3' }}>{'{'}</span></div>
                <div className="pl-2"><span style={{ color: '#ff7b72' }}>return</span> <span style={{ color: '#e6edf3' }}>(</span></div>
                <div className="pl-3"><span style={{ color: '#7ee787' }}>&lt;AI</span> <span style={{ color: '#79c0ff' }}>fullstack</span><span style={{ color: '#7ee787' }}>&gt;</span></div>
                <div className="pl-4" style={{ color: '#a5d6ff' }}>Build. Learn. Innovate</div>
                <div className="pl-3"><span style={{ color: '#7ee787' }}>&lt;/AI&gt;</span></div>
                <div className="pl-2"><span style={{ color: '#e6edf3' }}>)</span></div>
                <div><span style={{ color: '#e6edf3' }}>{'}'}</span></div>
                {/* Blinking cursor line */}
                <div style={{ color: '#58a6ff' }}>
                  <span style={{ color: '#ff7b72' }}>export</span> <span style={{ color: '#ff7b72' }}>default</span>
                  <span style={{ display: 'inline-block', width: '2px', height: '5px', background: '#58a6ff', marginLeft: '1px', verticalAlign: 'middle', animation: 'cursorBlink 1s step-end infinite' }} />
                </div>
              </div>
              {/* Screen glare */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(-135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 47%, rgba(255,255,255,0) 48%)' }} />
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

export { Macbook };
export default Macbook;
