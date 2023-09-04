import { getProducts } from "@/services/products"
import type { NextApiRequest, NextApiResponse } from "next"

const getProductsApiRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { category } = req.query
    const products = await getProducts(category as string)
    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).send("")
  }
}

export default getProductsApiRoute
