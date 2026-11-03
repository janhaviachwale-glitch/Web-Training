import { useState } from 'react'
import DashboardHeader from './components/DashboardHeader'
import ProductGrid from './components/ProductGrid'
import Sidebar from './components/Sidebar'

function App() {
  const [showMessage, setShowMessage] = useState(false)

  const handleAddProduct = () => {
    setShowMessage(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <DashboardHeader onAddProduct={handleAddProduct} />

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  All Products
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your product inventory
                </p>
              </div>

              <p className="text-sm font-medium text-gray-600">
                6 Products
              </p>
            </div>

            {showMessage && (
              <p
                role="status"
                className="mb-5 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700"
              >
                Add Product functionality will be implemented in a future update.
              </p>
            )}

            <ProductGrid />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App