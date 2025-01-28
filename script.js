const content = document.getElementById('content');
const loader = document.getElementById('loader');

let page = 1;
const limit = 10;

const loadData = async (page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];
      for (let i = 0; i < limit; i++) {
        data.push(`Item ${(page - 1) * limit + i + 1}`);
      }
      resolve(data);
    }, 1000);
  });
};

const renderData = (items) => {
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    content.appendChild(div);
  });
};

const loadMore = async () => {
  loader.style.display = 'block';
  const data = await loadData(page, limit);
  renderData(data);
  page++;
  loader.style.display = 'none';
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMore();
  }
}, { threshold: 1.0 });

observer.observe(loader);

loadMore();
