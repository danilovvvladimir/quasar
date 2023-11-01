"use client";

import { FC, useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Image from "next/image";
import styles from "./Search.module.scss";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (newSearchTerm: string) => void;
}

const Search: FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  const [value, setValue] = useState<string>(searchTerm);

  return (
    <div className={styles["search-bar"]}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles["search-bar__input"]}
        placeholder="Поиск по товарам..."
      />
      <Button
        className={styles["search-bar__button"]}
        onClick={() => setSearchTerm(value)}
      >
        <Image src="/search.svg" alt="search" width={24} height={24} />
      </Button>
    </div>
  );
};

export default Search;
