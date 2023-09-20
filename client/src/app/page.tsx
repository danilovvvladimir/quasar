import { FC } from "react";
import "./HomePage.scss";
import Navbar from "@/components/Navbar/Navbar";

const HomePage: FC = () => {
  return (
    <section className="home-page">
      <div className="container">
        <Navbar />
      </div>
    </section>
  );
};

export default HomePage;
