import FetchJson from "@/lib/fetchJson"

export const getCategories = async () => {
  const apiUrl = "https://dummyjson.com/products/categories"
  const categories: any = await FetchJson.get(apiUrl)
  return categories
}

export const getProducts = async (category: string) => {
  const apiUrl = `https://dummyjson.com/products/category/${category}`
  const apiResponse = await FetchJson.get(apiUrl)
  return (apiResponse as any).products
}
