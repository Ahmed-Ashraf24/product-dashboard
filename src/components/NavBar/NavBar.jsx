import { useState } from 'react';
import './NavBar.css';
function NavBar({
  onMenuClick,
  activePage,
  products = [],
  onNavigate,
  onSelectProduct,
    displayName = 'Dashboard Owner',
}) {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelect(product) {
    setSearch('');
    setShowResults(false);
    onNavigate('Products');
    onSelectProduct(product.id);
  }

  return (
    <nav className="navbar dashboard-navbar">
      <button
        className="menu-button"
        onClick={onMenuClick}
      >
        ☰
      </button>

      <h5 className="page-title">{activePage}</h5>

      <div className="navbar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => {
            // Allow a result click before closing the dropdown.
            setTimeout(() => setShowResults(false), 150);
          }}
        />

        {showResults && search.trim() !== '' && (
          <div className="search-results">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  className="search-result-item"
                  onMouseDown={() => handleSelect(product)}
                >
                  <span>{product.name}</span>
                  <small>${Number(product.price).toLocaleString()}</small>
                </button>
              ))
            ) : (
              <p className="search-no-results">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>

       <div className="user-profile">
      <span>{displayName || 'Dashboard Owner'}</span>
      <div className="avatar">
        {(displayName || 'D').trim().charAt(0).toUpperCase()}
      </div>
    </div>
    </nav>
  );
}

export default NavBar;