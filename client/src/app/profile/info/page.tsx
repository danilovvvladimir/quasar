import { FC } from "react";
import "../ProfilePage.scss";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Image from "next/image";

interface ProfileInfoPageProps {}

const ProfileInfoPage: FC = () => {
  return (
    <div className="profile-info">
      <h1 className="title profile-info__title">Ваши данные на QUASAR</h1>
      {/* profile svg mock */}
      <Image
        src="/profile-mock.svg"
        alt="Profile Mock"
        width={150}
        height={150}
      />
      <div className="profile-info__inputs">
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        {/* <Input placeholder="Username"/> */}
      </div>
      <div className="profile-info__disclaimer">
        Имя на QUASAR – публичное имя вашего аккаунта. Оно отображается в ваших
        отзывах, комментариях, оценках или ответах. Если вы измените его, новое
        имя появится не только в новом, но и в старом контенте.
      </div>
      <Button className="profile-info__button">Сохранить</Button>
    </div>
  );
};

export default ProfileInfoPage;
