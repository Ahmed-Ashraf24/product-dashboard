import './ProductCard.css';
function Product({ product, onEdit, onDelete, selected }) {
  return (
    <div  id={`product-${product.id}`}
      className={`card-container ${selected ? 'selected-product' : ''}`}>
      <img
        src={product.imageUrl || '/placeholder.png'}
        alt={product.name}
        className="product-image"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = '/placeholder.png';
        }}
      />

      <span className="product-name">{product.name}</span>

      <div className="product-info">
        <span className="product-price">
          ${Number(product.price).toLocaleString()}
        </span>

        <div className="product-availability">
          <span>Available</span>
        </div>
      </div>

      <div className="product-action">
        <button
          className="edit-button"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(product)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Product; 