"use client";

import { FC, useEffect, useState } from "react";
import styles from "../AdminPage.module.scss";
import AdminTableUsers from "@/components/AdminTable/AdminTableUsers/AdminTableUsers";
import { User, UserPrivate } from "@/types/user";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import UserService from "@/services/user";

const AdminUsersPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const userService = new UserService();

  const updateData = async () => {
    const users = await userService.getAll();

    setUsers(users);
  };

  useEffect(() => {
    updateData();
  }, []);

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
