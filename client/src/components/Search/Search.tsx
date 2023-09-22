import { FC } from "react";
import "./Search.scss";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Image from "next/image";

const Search: FC = () => {
  return (
    <div className="search-bar">
      <Input className="search-bar__input" placeholder="Поиск по товарам..." />
      <Button className="search-bar__button">
        <Image src="/search.svg" alt="search" width={24} height={24} />
      </Button>
    </div>
  );
};

export default Search;
