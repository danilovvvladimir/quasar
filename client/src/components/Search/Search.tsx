import { FC } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Image from "next/image";
import styles from "./Search.module.scss";

const Search: FC = () => {
  return (
    <div className={styles["search-bar"]}>
      <Input
        className={styles["search-bar__input"]}
        placeholder="Поиск по товарам..."
      />
      <Button className={styles["search-bar__button"]}>
        <Image src="/search.svg" alt="search" width={24} height={24} />
      </Button>
    </div>
  );
};

export default Search;
