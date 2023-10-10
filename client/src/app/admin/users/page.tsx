import { FC } from "react";
import styles from "../AdminPage.module.scss";
import AdminTableUsers from "@/components/AdminTable/AdminTableUsers/AdminTableUsers";
import { RoleName, UserPrivate } from "@/types/user";
import Search from "@/components/Search/Search";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";

const AdminUsersPage: FC = () => {
  const users: UserPrivate[] = [
    {
      id: "12414",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "mockemail@gmail.com",
      ordersCount: 12,
      reviewsCount: 2,
      role: RoleName.USER,
      username: "abobus",
    },
    {
      id: "12414421",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "mockesafafsafafsafafsafsafafsafasfafasmail@gmail.com",
      ordersCount: 12,
      reviewsCount: 2,
      role: RoleName.USER,
      username: "abobus",
    },
  ];

  return (
    <section className={styles["admin-users"]}>
      <div className={styles["admin-users__wrapper"]}>
        <div className={styles["admin-users__controls"]}>
          <SearchAdmin />
        </div>
        <AdminTableUsers users={users} />
      </div>
    </section>
  );
};

export default AdminUsersPage;
