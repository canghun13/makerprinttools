(() => {
  const index = document.querySelector('.tool-nav-list');
  if (!index) return;

  const links = [...index.querySelectorAll('a[data-section]')];
  const setActive = id => links.forEach(link => {
    if (link.dataset.section === id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const syncHash = () => {
    const id = location.hash.slice(1);
    if (links.some(link => link.dataset.section === id)) setActive(id);
  };

  syncHash();
  addEventListener('hashchange', syncHash);

  if (!('IntersectionObserver' in window)) return;
  const sections = links.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible) setActive(visible.target.id);
  }, { rootMargin: '-110px 0px -55% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
})();
