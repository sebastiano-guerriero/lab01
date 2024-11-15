let rivCanvas = document.getElementsByClassName('js-riv-canvas');

const r1 = new rive.Rive({
  src: 'https://anim-icons.s3.amazonaws.com/9/rotate-layer.riv',
  canvas: rivCanvas[0],
  autoplay: false,
  onLoad: () => {
    r1.resizeDrawingSurfaceToCanvas();
    triggerAnim(r1, rivCanvas[0].closest('button'), 'rotateLayer');
  }
});

const r2 = new rive.Rive({
  src: 'https://anim-icons.s3.amazonaws.com/9/bring-to-front.riv',
  canvas: rivCanvas[1],
  autoplay: false,
  onLoad: () => {
    r2.resizeDrawingSurfaceToCanvas();
    triggerAnim(r2, rivCanvas[1].closest('button'), 'bringToFront');
  }
});

const r3 = new rive.Rive({
  src: 'https://anim-icons.s3.amazonaws.com/9/replace-layer.riv',
  canvas: rivCanvas[2],
  autoplay: false,
  onLoad: () => {
    r3.resizeDrawingSurfaceToCanvas();
    triggerAnim(r3, rivCanvas[2].closest('button'), 'replaceLayer');
  }
});

const r4 = new rive.Rive({
  src: 'https://anim-icons.s3.amazonaws.com/9/open-prototype.riv',
  canvas: rivCanvas[3],
  autoplay: false,
  onLoad: () => {
    r4.resizeDrawingSurfaceToCanvas();
    triggerAnim(r4, rivCanvas[3].closest('button'), 'openPrototype');
  }
});

const r5 = new rive.Rive({
  src: 'https://anim-icons.s3.amazonaws.com/9/view-hotkeys.riv',
  canvas: rivCanvas[4],
  autoplay: false,
  onLoad: () => {
    r5.resizeDrawingSurfaceToCanvas();
    triggerAnim(r5, rivCanvas[4].closest('button'), 'viewHotkeys');
  }
});

function triggerAnim(rivObj, btn, stateMachine) {
  btn.addEventListener('mouseenter', function() {
    rivObj.play(stateMachine);
  });
  
  btn.addEventListener('mouseleave', function() {
    rivObj.reset({stateMachines: stateMachine});
  });
}