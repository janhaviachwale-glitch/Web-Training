interface DashboardHeaderProps {
  onAddProduct: () => void
}

function DashboardHeader({ onAddProduct }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Product Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor your products
        </p>
      </div>

      <button
        type="button"
        onClick={onAddProduct}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        + Add Product
      </button>
    </header>
  )
}

export default DashboardHeader