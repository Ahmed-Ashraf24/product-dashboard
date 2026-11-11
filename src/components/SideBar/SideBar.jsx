import './SideBar.css';
const menuItems = [
  'Dashboard',
  'Products',
  'Analytics',
  'Settings'
];

function SideBar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-logo">ProductHub</h3>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item}
            className={`sidebar-item ${
              activePage === item ? 'active' : ''
            }`}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;