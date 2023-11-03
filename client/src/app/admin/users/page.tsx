"use client";

import { FC, useEffect, useState } from "react";
import styles from "../AdminPage.module.scss";
import AdminTableUsers from "@/components/AdminTable/AdminTableUsers/AdminTableUsers";
import { RoleName, UserPrivate } from "@/types/user";
import Search from "@/components/Search/Search";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import UserService from "@/services/user";
// todo types
const AdminUsersPage: FC = () => {
  const [users, setUsers] = useState<UserPrivate[]>([]);

  const userService = new UserService();

  const updateData = async () => {
    const users = await userService.getAll();

    setUsers(
      users.map((item) => ({ ...item, createdAt: new Date(item.createdAt) })),
    );
    console.log("users", users);
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
