export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  status: 'In Stock' | 'Out of Stock' | 'Low Stock'
}
