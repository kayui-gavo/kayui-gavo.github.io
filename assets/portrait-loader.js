(() => {
  const image = document.querySelector('.portrait');
  if (!image) return;

  const script = document.currentScript;
  if (!script || !script.src) return;

  const base = new URL('portrait-data/', script.src);
  const parts = ['p01.txt', 'p02.txt', 'p03.txt', 'p04.txt', 'p05.txt', 'p06.txt'];

  Promise.all(
    parts.map((name) =>
      fetch(new URL(name, base)).then((response) => {
        if (!response.ok) throw new Error(`portrait part ${response.status}`);
        return response.text();
      })
    )
  )
    .then((chunks) => {
      image.src = `data:image/webp;base64,${chunks.join('')}`;
    })
    .catch(() => {
      // Keep the lightweight fallback image if any part fails to load.
    });
})();
