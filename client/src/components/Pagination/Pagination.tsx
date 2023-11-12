import { FC } from "react";
import styles from "./Pagination.module.scss";
import Button from "../UI/Button/Button";

interface PaginationProps {
  numberPages: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export interface IPagination extends PaginationProps {}

const Pagination: FC<PaginationProps> = ({
  changePage,
  currentPage,
  numberPages,
}) => {
  console.log("pagination", {
    changePage,
    currentPage,
    numberPages,
  });

  return (
    <div className={styles["pagination"]}>
      {Array.from({ length: numberPages > 1 ? numberPages : 1 }).map(
        (_, index) => {
          const pageNumber = index + 1;

          return (
            <Button
              key={pageNumber}
              className={styles["pagination__button"]}
              onClick={() => changePage(pageNumber)}
              disabled={currentPage === pageNumber}
              isInverted={true}
            >
              {pageNumber}
            </Button>
          );
        },
      )}
    </div>
  );
};

export default Pagination;
