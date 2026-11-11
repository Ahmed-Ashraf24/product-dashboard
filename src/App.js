import { useState,useEffect } from 'react';
import './App.css';
import './theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import { getProducts,  addProduct,
  updateProduct,
  deleteProduct, } from './services/productService';
import ProductsPage from './pages/ProductPage/ProductPage';
import DashboardPage from './pages/DashboardPage/DashboardPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const [selectedProductId, setSelectedProductId] = useState(null);
const [settings, setSettings] = useState(getInitialSettings);

  async function loadProducts() {
    try {
      setError('');
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  }
const defaultSettings = {
  name: 'Dashboard Owner',
  theme: 'light',
  currency: 'USD',
};

function getInitialSettings() {
  try {
    const saved = localStorage.getItem('productHubSettings');

    if (!saved) return defaultSettings;

    const parsed = JSON.parse(saved);

    return {
      name: typeof parsed.name === 'string'
        ? parsed.name
        : defaultSettings.name,

      theme: ['light', 'dark'].includes(parsed.theme)
        ? parsed.theme
        : defaultSettings.theme,

      currency: ['USD', 'EGP', 'EUR'].includes(parsed.currency)
        ? parsed.currency
        : defaultSettings.currency,
    };
  } catch {
    return defaultSettings;
  }
}

function handleSaveSettings() {
  localStorage.setItem(
    'productHubSettings',
    JSON.stringify(settings)
  );
}

  useEffect(() => {
    loadProducts();
  }, []);
useEffect(() => {
  document.body.dataset.theme = settings.theme;
}, [settings.theme]);

  async function handleAddProduct(product) {
    await addProduct(product);
    await loadProducts();
  }

  async function handleUpdateProduct(id, product) {
    await updateProduct(id, product);
    await loadProducts();
  }

  async function handleDeleteProduct(id) {
    await deleteProduct(id);
    await loadProducts();
  }


  return (
    <div className="App">
     <NavBar
    onMenuClick={() => setSidebarOpen((current) => !current)}
  activePage={activePage}
  products={products}
  onNavigate={setActivePage}
  onSelectProduct={setSelectedProductId}
  displayName={settings.name}
/>

      <div className="dashboard-layout">
        {sidebarOpen && (
          <SideBar
            activePage={activePage}
            onNavigate={setActivePage}
          />
        )}

        <main className="main-content">
          {loading ? (
            <p className="loading-message">Loading products...</p>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button className="primary-button" onClick={loadProducts}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              {activePage === 'Dashboard' && (
                <DashboardPage products={products} />
              )}

              {activePage === 'Products' && (
               <ProductsPage
  products={products}
  onProductAdded={handleAddProduct}
  onProductUpdated={handleUpdateProduct}
  onProductDeleted={handleDeleteProduct}
  selectedProductId={selectedProductId}
  onClearSelectedProduct={() => setSelectedProductId(null)}
/>
              )}
              {activePage === 'Analytics' && (
  <AnalyticsPage products={products} />
)}
{activePage === 'Settings' && (
  <SettingsPage
      settings={settings}
    onSettingsChange={setSettings}
    onSave={handleSaveSettings} />
)}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;