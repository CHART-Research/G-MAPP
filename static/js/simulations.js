const simData = {
  bookshelf: {
    description: 'A bookshelf scene testing fine-grained obstacle avoidance in a static, densely packed environment with local minima. N<sub>o</sub>= 65,084 obstacles',
    videos: [
      {
        webm: './static/videos/sim/bookshelf/apf_label.webm',
        mp4: './static/videos/sim/bookshelf/apf_label.mp4',
        poster: './static/videos/sim/bookshelf/apf_label.jpg',
        caption: 'Artificial Potential Field (APF) agents struggle with a classic local-minimum problem.'
      },
      {
        webm: './static/videos/sim/bookshelf/mfi_label.webm',
        mp4: './static/videos/sim/bookshelf/mfi_label.mp4',
        poster: './static/videos/sim/bookshelf/mfi_label.jpg',
        caption: 'Magnetic Fields Inspired (MFI) agents struggle with goal convergence on targets behind densely packed walls.'
      },
      {
        webm: './static/videos/sim/bookshelf/multi_label.webm',
        mp4: './static/videos/sim/bookshelf/multi_label.mp4',
        poster: './static/videos/sim/bookshelf/multi_label.jpg',
        caption: 'G-MAPP (Ours) can switch between agents to achieve faster convergence by parallelizing planning across high-fidelity environments.'
      },
    ]
  },
  complex: {
    description: 'A larger, more topologically complex scene evaluating planner robustness in the presence of narrow passages and fast-moving obstacles. N<sub>o</sub>= 116,216 obstacles',
    videos: [
      {
        webm: './static/videos/sim/complex/apf_label.webm',
        mp4: './static/videos/sim/complex/apf_label.mp4',
        poster: './static/videos/sim/complex/apf_label.jpg',
        caption: 'Artificial Potential Field (APF) agents can easily hit robot joint limits or be perturbed by moving objects in the environment.'
      },
      {
        webm: './static/videos/sim/complex/mfi_label.webm',
        mp4: './static/videos/sim/complex/mfi_label.mp4',
        poster: './static/videos/sim/complex/mfi_label.jpg',
        caption: 'Magnetic Fields Inspired (MFI) agents can ignore obstacle motion orthogonal to the velocity of the control point, resulting in unexpected collisions.'
      },
      {
        webm: './static/videos/sim/complex/multi_label.webm',
        mp4: './static/videos/sim/complex/multi_label.mp4',
        poster: './static/videos/sim/complex/multi_label.jpg',
        caption: 'G-MAPP (Ours) uses an ensemble of agents to switch between broad-phase and narrow-phase control modes to achieve safe motion in dynamic, cluttered scenes.'
      },
    ]
  },
};

function renderSim(key) {
  const sim = simData[key];

  const descEl = document.getElementById('sim-description');
  // descEl.textContent = sim.description;
  descEl.innerHTML = sim.description;

  const container = document.getElementById('sim-videos');
  container.innerHTML = '';
  sim.videos.forEach((v, i) => {
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
      <p class="has-text-centered mt-2">${v.caption}</p>
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

  const defaultBtn = document.querySelector('.sim-btn.is-active') || document.querySelector('.sim-btn');
  renderSim(defaultBtn.dataset.sim);
});