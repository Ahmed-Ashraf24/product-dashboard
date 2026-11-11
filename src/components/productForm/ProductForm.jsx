import { useState } from 'react';
import './ProductForm.css';
function ProductForm({ product, onSave, onCancel }) {
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(
    product?.price !== undefined ? String(product.price) : ''
  );
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || price === '' || Number(price) <= 0) {
      setError('Enter a product name and a valid positive price.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      await onSave({
        name: name.trim(),
        price: Number(price),
        imageUrl: imageUrl.trim(),
      });
    } catch (err) {
      setError(err.message || 'Could not save product.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>

        <label>Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />

        <label>Price</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />

        <label>Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? 'Saving...'
              : isEditing
                ? 'Save Changes'
                : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;