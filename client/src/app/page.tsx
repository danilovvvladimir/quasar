"use client";

import { FC } from "react";
import "./HomePage.scss";
import Navbar from "@/components/Navbar/Navbar";
import Filters from "@/components/Filters/Filters";

const HomePage: FC = () => {
  const MIN_PRICE = 500;
  const MAX_PRICE = 5000;
  const CATEGORIES = ["Футболки", "Обувь", "Худи", "Шорты", "Кофты"];

  return (
    <section className="home-page">
      <div className="home-page__wrapper">
        <Filters
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          categories={CATEGORIES}
        />
        <div className="content">
          <div className="search">seacrh</div>
          <div className="search">products</div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
