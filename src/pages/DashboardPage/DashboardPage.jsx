import './DashboardPage.css';
function DashboardPage({ products = [] }) {
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (total, product) => total + Number(product.price || 0),
    0
  );

  const averagePrice = totalProducts
    ? totalValue / totalProducts
    : 0;

  const recentProducts = products.slice(-5).reverse();

  const stats = [
    { title: 'Total Products', value: totalProducts },
    {
      title: 'Total Product Value',
      value: `$${totalValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
    },
    {
      title: 'Average Price',
      value: `$${averagePrice.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Here's what's happening with your products.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <p>{stat.title}</p>
            <h3>{stat.value}</h3>
          </div>
        ))}
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <h3>Recent Products</h3>
          <span>{totalProducts} products in total</span>
        </div>

        {recentProducts.length === 0 ? (
          <p className="empty-message">No products found.</p>
        ) : (
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Product ID</th>
                </tr>
              </thead>

              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${Number(product.price).toLocaleString()}</td>
                    <td>#{product.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;