(() => {
  'use strict';

  const STAGE_WIDTH = 1440;
  const STAGE_HEIGHT = 3120;
  const viewport = document.getElementById('viewport');
  const stage = document.getElementById('designStage');
  if (!viewport || !stage) return;

  const fitStage = () => {
    const vv = window.visualViewport;
    const availableWidth = Math.max(1, vv ? vv.width : (window.innerWidth || document.documentElement.clientWidth));
    const availableHeight = Math.max(1, vv ? vv.height : (window.innerHeight || document.documentElement.clientHeight));

    // MASTER rule: preserve 1440x3120 proportions and fill the usable phone viewport.
    // No crop, no independent X/Y stretch, no scroll.
    const scale = Math.min(availableWidth / STAGE_WIDTH, availableHeight / STAGE_HEIGHT);
    const renderedWidth = STAGE_WIDTH * scale;
    const renderedHeight = STAGE_HEIGHT * scale;
    const offsetX = (availableWidth - renderedWidth) / 2;
    const offsetY = (availableHeight - renderedHeight) / 2;

    document.documentElement.style.setProperty('--stage-scale', String(scale));
    document.documentElement.style.setProperty('--stage-x', `${offsetX}px`);
    document.documentElement.style.setProperty('--stage-y', `${offsetY}px`);
    stage.dataset.scale = scale.toFixed(6);
  };

  fitStage();
  requestAnimationFrame(fitStage);
  window.addEventListener('load', fitStage, { once: true });
  window.addEventListener('resize', fitStage, { passive: true });
  window.addEventListener('orientationchange', fitStage, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fitStage, { passive: true });
    window.visualViewport.addEventListener('scroll', fitStage, { passive: true });
  }
  document.documentElement.dataset.appReady = 'true';
})();
