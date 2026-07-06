import { useState } from "react";
import "./App.css";

function App() {

  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 65000,
      image: "https://via.placeholder.com/250"
    },
    {
      id: 2,
      name: "Mobile",
      category: "Electronics",
      price: 25000,
      image: "https://via.placeholder.com/250"
    },
    {
      id: 3,
      name: "Shoes",
      category: "Fashion",
      price: 3000,
      image: "https://via.placeholder.com/250"
    },
    {
      id: 4,
      name: "T-Shirt",
      category: "Fashion",
      price: 1200,
      image: "https://via.placeholder.com/250"
    },
    {
      id: 5,
      name: "Watch",
      category: "Accessories",
      price: 5000,
      image: "https://via.placeholder.com/250"
    },
    {
      id: 6,
      name: "Headphones",
      category: "Electronics",
      price: 3500,
      image: "https://via.placeholder.com/250"
    }
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "All" || product.category === category;

    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="container">

      <h1>🛍 Product Catalog</h1>

      <div className="top">

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Accessories</option>
        </select>

      </div>

      <div className="products">

        {filteredProducts.map((item) => (

          <div className="card" key={item.id}>

            <img src={item.image} alt={item.name} />

            <h2>{item.name}</h2>

            <p>{item.category}</p>

            <h3>₹ {item.price}</h3>

            <button>Buy Now</button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;