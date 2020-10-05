let root = document.documentElement;
let ang = 0;

function mainloop() {

  ang = ang + 5;
  if (ang > 360){ang=0;}

  root.style.setProperty('--gradang', `${ang}deg`);

  requestAnimationFrame(mainloop);
}
requestAnimationFrame(mainloop);
