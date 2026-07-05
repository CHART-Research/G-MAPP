const simData = {
  bookshelf: [
    {
      webm: './static/videos/sim/bookshelf/apf_label.webm',
      mp4: './static/videos/sim/bookshelf/apf_label.mp4',
      poster: './static/videos/sim/bookshelf/apf_label.jpg',
      caption: 'Artificial Potential Fields (APF)'
    },
    {
      webm: './static/videos/sim/bookshelf/mfi_label.webm',
      mp4: './static/videos/sim/bookshelf/mfi_label.mp4',
      poster: './static/videos/sim/bookshelf/mfi_label.jpg',
      caption: 'Magnetic Fields Inspired'
    },
    {
      webm: './static/videos/sim/bookshelf/multi_label.webm',
      mp4: './static/videos/sim/bookshelf/multi_label.mp4',
      poster: './static/videos/sim/bookshelf/multi_label.jpg',
      caption: 'MULTI (Ours)'
    },
  ],
  complex: [
    {
      webm: './static/videos/sim/complex/apf_label.webm',
      mp4: './static/videos/sim/complex/apf_label.mp4',
      poster: './static/videos/sim/complex/apf_label.jpg',
      caption: 'Artificial Potential Fields (APF)'
    },
    {
      webm: './static/videos/sim/complex/mfi_label.webm',
      mp4: './static/videos/sim/complex/mfi_label.mp4',
      poster: './static/videos/sim/complex/mfi_label.jpg',
      caption: 'Magnetic Fields Inspired'
    },
    {
      webm: './static/videos/sim/complex/multi_label.webm',
      mp4: './static/videos/sim/complex/multi_label.mp4',
      poster: './static/videos/sim/complex/multi_label.jpg',
      caption: 'MULTI (Ours)'
    },
  ],
  

};

function renderSim(key) {
  const container = document.getElementById('sim-videos');
  container.innerHTML = '';
  simData[key].forEach((v, i) => {
    const col = document.createElement('div');
    col.className = 'column';
    col.innerHTML = `
      <video poster="${v.poster}"
             id="${key}-video-${i}"
             autoplay
             controls
             muted
             loop
             playsinline
             height="100%">
        <source src="${v.webm}" type="video/webm">
        <source src="${v.mp4}" type="video/mp4">
      </video>
    `;
    container.appendChild(col);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sim-selector').addEventListener('click', (e) => {
    const btn = e.target.closest('.sim-btn');
    if (!btn) return;
    document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('is-active', 'is-info'));
    btn.classList.add('is-active', 'is-info');
    renderSim(btn.dataset.sim);
  });

  renderSim('complex');
  renderSim('bookshelf');
});