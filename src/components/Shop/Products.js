import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const DummyItems = [
    {
      id: "p1",
      title: "LG Monitor",
      price: 1299,
      descirption: "24 Inch Full HD Monitor",
    },
    {
      id: "p2",
      title: "Samsung Monitor",
      price: 2199,
      descirption: "24 Inch QuadHD Monitor",
    },
  ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DummyItems.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.descirption}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
