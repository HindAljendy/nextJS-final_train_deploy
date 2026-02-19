interface Tprops {
  params?: { products: string[] }
}

const ProductsPage = ({ params }: Tprops) => {
  //console.log(params);
  return (
    <div className="fix-height ">
      <h1>  ProductsPage</h1>
      <h5>All routes segment:</h5>
      <ul>
        {
          params?.products?.map(route => (
            <li>{route}</li>
          ))
        }
      </ul>

    </div>
  )
}

export default ProductsPage