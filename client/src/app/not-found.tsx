import { FC } from "react";
import "./NotFoundPage.scss";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";

const NotFoundPage: FC = () => {
  return (
    <section className="not-found">
      <div className="not-found__wrapper">
        <h1 className="title">Error! Page not found!</h1>
        <Image src="/not-found.svg" alt="not-found" width={400} height={400} />

        <Button>Go back</Button>
      </div>
    </section>
  );
};

export default NotFoundPage;
