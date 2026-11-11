import { useState ,useEffect} from 'react';

import Product from '../../components/ProductCard/productCard';
import ProductForm from '../../components/productForm/ProductForm';

import './ProductPage.css';
function ProductsPage({
  products = [],
  onProductAdded,
  onProductUpdated,
  onProductDeleted,
  selectedProductId,
}) {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');

useEffect(() => {
  if (selectedProductId === null) return;

  const element = document.getElementById(
    `product-${selectedProductId}`
  );

  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}, [selectedProductId, products]);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function openAddForm() {
    setSelectedProduct(null);
    setShowForm(true);
    setError('');
  }

  function openEditForm(product) {
    setSelectedProduct(product);
    setShowForm(true);
    setError('');
  }

  async function handleSave(product) {
    if (selectedProduct) {
      await onProductUpdated(selectedProduct.id, product);
    } else {
      await onProductAdded(product);
    }

    setShowForm(false);
    setSelectedProduct(null);
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      setError('');
      await onProductDeleted(product.id);
    } catch (err) {
      setError(err.message || 'Could not delete product.');
    }
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Products</h2>
          <p>Manage and organize your products.</p>
        </div>

        <button
          className="primary-button"
          onClick={openAddForm}
        >
          + Add Product
        </button>
      </div>

      <div className="products-toolbar">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>{filteredProducts.length} products</span>
      </div>

      {error && <p className="form-error">{error}</p>}

      {filteredProducts.length === 0 ? (
        <p className="empty-message">
          {search ? 'No matching products found.' : 'No products available.'}
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Product
    key={product.id}
    product={product}
    onEdit={openEditForm}
    onDelete={handleDelete}
    selected={String(product.id) === String(selectedProductId)}
  />
          ))}
        </div>
      )}

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default ProductsPage;