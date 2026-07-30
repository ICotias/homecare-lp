// Reveal on scroll
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Lightbox for image screenshots (not videos).
  // A home não tem galeria nem lightbox, então tudo aqui é opcional.
  const lb=document.getElementById('lightbox');
  if(lb){
    const lbImg=lb.querySelector('img');
    document.querySelectorAll('.shots .phone img, .gallery .phone img').forEach(img=>{
      img.style.cursor='zoom-in';
      img.addEventListener('click',()=>{lbImg.src=img.src;lb.classList.add('open')});
    });
    lb.addEventListener('click',()=>lb.classList.remove('open'));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});
  }

  // Pause other videos when one plays
  const vids=document.querySelectorAll('video');
  vids.forEach(v=>v.addEventListener('play',()=>vids.forEach(o=>{if(o!==v)o.pause()})));

  // Player custom: clique alterna play/pause, barra de progresso e tela cheia
  vids.forEach(v=>{
    const ph=v.closest('.phone'); if(!ph) return;
    const bar=document.createElement('div'); bar.className='vbar';
    const fill=document.createElement('div'); fill.className='vfill'; bar.appendChild(fill);
    const fs=document.createElement('button'); fs.className='vfs'; fs.type='button';
    fs.setAttribute('aria-label','Tela cheia'); fs.textContent='⤢';
    ph.append(bar,fs);
    v.tabIndex=0;

    const toggle=()=>{ v.paused ? v.play() : v.pause() };
    v.addEventListener('click',toggle);
    v.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle()} });
    v.addEventListener('play',()=>ph.classList.add('playing'));
    v.addEventListener('pause',()=>ph.classList.remove('playing'));
    v.addEventListener('ended',()=>{ph.classList.remove('playing');fill.style.width='0';v.load()});
    v.addEventListener('timeupdate',()=>{ if(v.duration) fill.style.width=(v.currentTime/v.duration*100)+'%' });

    bar.addEventListener('click',e=>{
      e.stopPropagation();
      const r=bar.getBoundingClientRect();
      if(v.duration) v.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*v.duration;
    });

    fs.addEventListener('click',e=>{
      e.stopPropagation();
      if(!v.requestFullscreen && v.webkitEnterFullscreen){ v.webkitEnterFullscreen() }      // iPhone
      else if(v.requestFullscreen){ v.requestFullscreen() }
      else if(v.webkitRequestFullscreen){ v.webkitRequestFullscreen() }
    });
  });
