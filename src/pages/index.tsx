import { GetServerSideProps } from "next"
import FetchJson from "@/lib/fetchJson"
import { ChangeEvent, useState } from "react"
import { getProducts, getCategories } from "@/services/products"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoryList = await getCategories()
  const initialCategory = categoryList[0]
  const initialProductList = await getProducts(initialCategory)
  const token = (context.req as any).session?.data?.accessToken
  return {
    props: {
      token: token || null,
      initialCategory: initialCategory,
      categoryList: categoryList,
      initialProductList: initialProductList,
    },
  }
}

const HomePage = ({
  token,
  initialCategory,
  categoryList,
  initialProductList,
}: {
  token: string
  initialCategory: string
  categoryList: any
  initialProductList: any
}) => {
  const [category, setCategory] = useState(initialCategory)
  const [products, setProducts] = useState(initialProductList)

  const onCategoryChangeHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    const apiUrl = `/api/products?category=${category}`
    const products: any = await FetchJson.get(apiUrl)
    setCategory(category)
    setProducts(products)
  }

  return (
    <div className="px-36 py-24">
      <h3 className="text-white mb-6 font-bold text-4xl">Product List</h3>
      <h5 className="text-white mb-3 font-bold text-xl">Access token</h5>
      <p className="text-white mb-9 text-sm break-words">{token || ""}</p>
      <div className="col-span-full">
        <label
          htmlFor="category"
          className="block mb-2 font-medium text-white text-lg"
        >
          Select the category
        </label>
        <div className="mt-2">
          <select
            id="category"
            name="category"
            className="border border-gray-300 rounded-lg p-2.5 mb-9  cursor-pointer w-60"
            onChange={onCategoryChangeHandler}
            value={category}
          >
            {categoryList.map((category: any) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      {products.map((product: any) => (
        <div
          key={product.id}
          className="bg-white p-6 rounded-lg shadow-lg mb-9"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {product.title}
          </h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage
