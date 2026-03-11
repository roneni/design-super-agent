import { useState } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  size?: string
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item])
  }

  const count = items.length

  return { items, addItem, count }
}
