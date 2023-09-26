import { FC } from "react";
import "../ProfilePage.scss";
import Button from "@/components/UI/Button/Button";

const ProfileInfoPage: FC = () => {
  return (
    <section className="p-pi">
      {/* p-profile__submenu */}
      {/* go-back */}
      <div className="p-pi__wrapper">
        <h1 className="title p-pi__title">Ваши данные на QUASAR</h1>
        {/* profile svg mock */}
        <div className="p-pi__inputs">email username password</div>
        <div className="p-pi__disclaimer">
          Имя на QUASAR – публичное имя вашего аккаунта. Оно отображается в
          ваших отзывах, комментариях, оценках или ответах. Если вы измените
          его, новое имя появится не только в новом, но и в старом контенте.
        </div>
        <Button>Сохранить</Button>
      </div>
    </section>
  );
};

export default ProfileInfoPage;
