(() => {

  const INITIAL_PRODUCTS = [
    { id: 'v1', name: 'Tomate', stock: 35, desc: 'Tomate fresco para ensalada', img: 'https://picsum.photos/seed/tomate/400/300' },
    { id: 'v2', name: 'Papa criolla', stock: 18, desc: 'Papa criolla lista para cocinar', img: 'https://picsum.photos/seed/papa/400/300' },
    { id: 'v3', name: 'Lechuga', stock: 12, desc: 'Lechuga fresca y crocante', img: 'https://picsum.photos/seed/lechuga/400/300' },
    { id: 'v4', name: 'Zanahoria', stock: 42, desc: 'Zanahoria fresca y dulce', img: 'https://picsum.photos/seed/zanahoria/400/300' },
    { id: 'v5', name: 'Cebolla larga', stock: 8, desc: 'Cebolla ideal para guisos', img: 'https://picsum.photos/seed/cebolla/400/300' }
  ];

  const STORAGE_KEY = 'inventario_verduras_v1';

  const qs = s => document.querySelector(s);
  const productListEl = qs('#product-list');
  const alertListEl = qs('#alert-list');

  const viewInventoryBtn = qs('#view-inventory');
  const viewAlertsBtn = qs('#view-alerts');

  const inventoryView = qs('#inventory-view');
  const alertsView = qs('#alerts-view');

  let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || INITIAL_PRODUCTS;

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  // Render inventario
  function renderProducts() {
    productListEl.innerHTML = '';
    const template = qs('#product-card-template');

    products.forEach(p => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('.product-img').src = p.img;
      clone.querySelector('.product-name').textContent = p.name;
      clone.querySelector('.product-desc').textContent = p.desc;
      clone.querySelector('.stock-value').textContent = p.stock;

      clone.querySelector('.entry').addEventListener('click', () => adjustStock(p.id, +1));
      clone.querySelector('.exit').addEventListener('click', () => adjustStock(p.id, -1));

      productListEl.appendChild(clone);
    });
  }

  // Ajuste de stock
  function adjustStock(id, change) {
    const item = products.find(p => p.id === id);
    if (!item) return;

    const newStock = item.stock + change;
    if (newStock < 0) return alert('No puedes tener stock negativo.');

    item.stock = newStock;
    save();
    renderProducts();
    renderAlerts();
  }

  // Render alertas
  function renderAlerts() {
    alertListEl.innerHTML = '';
    const template = qs('#alert-item-template');

    const lowStock = products.filter(p => p.stock <= 10);

    if (lowStock.length === 0) {
      alertListEl.innerHTML = '<p>No hay productos con bajo inventario ✔️</p>';
      return;
    }

    lowStock.forEach(p => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('.alert-text').textContent = `${p.name} — inventario bajo`;
      clone.querySelector('.alert-stock').textContent = `${p.stock} unidades`;

      alertListEl.appendChild(clone);
    });
  }

  // Cambio de vista
  viewInventoryBtn.addEventListener('click', () => {
    inventoryView.classList.remove('hidden');
    alertsView.classList.add('hidden');
    viewInventoryBtn.classList.add('active');
    viewAlertsBtn.classList.remove('active');
  });

  viewAlertsBtn.addEventListener('click', () => {
    inventoryView.classList.add('hidden');
    alertsView.classList.remove('hidden');
    viewInventoryBtn.classList.remove('active');
    viewAlertsBtn.classList.add('active');
  });

  // Init
  renderProducts();
  renderAlerts();

})();
