import React from "react";
import Navbar from "../components/Navbar";
import Flyer from "../components/Flyer";
import Deals from "../components/Deals";
import Footer from "../components/Footer";
import ShopRedirect from "../components/shopRedirect";
import CategoryList from "../components/CategoryList";


function Home() {
  return (

    <div>
      <Navbar />
      <ShopRedirect />
      <CategoryList />
      <Deals />
      <Footer />
    </div>
  );
}


export default Home;