const navigationItems = [
  { label: 'Overview', icon: '▦', active: true },
  { label: 'Products', icon: '□', active: false },
  { label: 'Orders', icon: '▤', active: false },
  { label: 'Customers', icon: '♙', active: false },
  { label: 'Settings', icon: '⚙', active: false },
]

function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-gray-200 bg-white p-4 md:min-h-screen md:w-60 md:border-r md:border-b-0">
      <div className="mb-5 hidden px-3 py-2 md:block">
        <h2 className="text-xl font-bold text-indigo-600">ShopAdmin</h2>
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex gap-2 overflow-x-auto md:flex-col">
          {navigationItems.map((item) => (
            <li key={item.label} className="shrink-0 md:w-full">
              <a
                href="#"
                aria-current={item.active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  item.active
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar