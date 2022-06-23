const SidebarNav = () => {
  return (
    <div className="sidebarnav-container">
      <ul className="sidebarnav-list">
        <li className="sidebarnav-item">
          <button className="sidebarnav-button">DASHBOARD</button>
        </li>
        <li className="sidebarnav-item">
          <button className="sidebarnav-button">BOOKINGS</button>
        </li>
        <li className="sidebarnav-item">
          <button className="sidebarnav-button">PRODUCTS</button>
        </li>
        <li className="sidebarnav-item">
          <button className="sidebarnav-button">CUSTOMERS</button>
        </li>
        <li className="sidebarnav-item">
          <button className="sidebarnav-button">REPORTS</button>
        </li>
        <li className="sidebarnav-item">
          <button className="sidebarnav-button">SETTINGS</button>
        </li>
      </ul>
    </div>
  )
}

export default SidebarNav
