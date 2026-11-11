import './AnalyticsPage.css';
function AnalyticsPage({ products = [] }) {
  const totalProducts = products.length;

  const prices = products.map((product) =>
    Number(product.price) || 0
  );

  const totalValue = prices.reduce((sum, price) => sum + price, 0);

  const averagePrice = totalProducts
    ? totalValue / totalProducts
    : 0;

  const mostExpensive = products.length
    ? products.reduce((max, product) =>
        Number(product.price) > Number(max.price) ? product : max
      )
    : null;

  const cheapest = products.length
    ? products.reduce((min, product) =>
        Number(product.price) < Number(min.price) ? product : min
      )
    : null;

  const sortedProducts = [...products].sort(
    (a, b) => Number(b.price) - Number(a.price)
  );

  const maxPrice = Math.max(...prices, 1);

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Analytics</h2>
          <p>Understand your product inventory at a glance.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Products</p>
          <h3>{totalProducts}</h3>
        </div>

        <div className="stat-card">
          <p>Total Product Value</p>
          <h3>${totalValue.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}</h3>
        </div>

        <div className="stat-card">
          <p>Average Price</p>
          <h3>${averagePrice.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}</h3>
        </div>
      </div>

      {/* Highest and Lowest */}
      <div className="analytics-highlights">
        <div className="dashboard-section">
          <p className="analytics-label">Most Expensive Product</p>

          {mostExpensive ? (
            <>
              <h3>{mostExpensive.name}</h3>
              <strong>
                ${Number(mostExpensive.price).toLocaleString()}
              </strong>
            </>
          ) : (
            <p>No products available.</p>
          )}
        </div>

        <div className="dashboard-section">
          <p className="analytics-label">Cheapest Product</p>

          {cheapest ? (
            <>
              <h3>{cheapest.name}</h3>
              <strong>
                ${Number(cheapest.price).toLocaleString()}
              </strong>
            </>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      {/* Price distribution */}
      <section className="dashboard-section analytics-chart">
        <div className="section-heading">
          <h3>Product Price Distribution</h3>
          <span>Highest to lowest</span>
        </div>

        {sortedProducts.length === 0 ? (
          <p className="empty-message">No products available.</p>
        ) : (
          <div className="price-chart">
            {sortedProducts.map((product) => {
              const price = Number(product.price) || 0;
              const percentage = (price / maxPrice) * 100;

              return (
                <div className="price-chart-item" key={product.id}>
                  <div className="price-chart-info">
                    <span>{product.name}</span>
                    <strong>${price.toLocaleString()}</strong>
                  </div>

                  <div className="price-chart-track">
                    <div
                      className="price-chart-bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default AnalyticsPage;