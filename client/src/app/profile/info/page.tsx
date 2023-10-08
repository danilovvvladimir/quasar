import { FC } from "react";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Image from "next/image";
import styles from "../ProfilePage.module.scss";

interface ProfileInfoPageProps {}

const ProfileInfoPage: FC = () => {
  return (
    <div className={styles["profile-info"]}>
      <h1 className={`title ${styles["profile-info__title"]}`}>
        Ваши данные на QUASAR
      </h1>
      <Image
        src="/profile-mock.svg"
        alt="Profile Mock"
        width={150}
        height={150}
      />
      <div className={styles["profile-info__inputs"]}>
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        {/* <Input placeholder="Password"/> */}
      </div>
      <div className={styles["profile-info__disclaimer"]}>
        Имя на QUASAR – публичное имя вашего аккаунта. Оно отображается в ваших
        отзывах, комментариях, оценках или ответах. Если вы измените его, новое
        имя появится не только в новом, но и в старом контенте.
      </div>
      <Button className={styles["profile-info__button"]}>Сохранить</Button>
    </div>
  );
};

export default ProfileInfoPage;
