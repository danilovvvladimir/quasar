"use client";

import { FC, use } from "react";
import styles from "../AdminTable.module.scss";
import { User } from "@/types/user";
import { getShortEmail } from "@/utils/getShortEmail";
import Loader from "@/components/Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Toggler from "@/components/UI/Toggler/Toggler";
import UserService from "@/services/user";

interface AdminTableUsersProps {
  users: User[];
}

const AdminTableUsers: FC<AdminTableUsersProps> = ({ users }) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();

  if (!currentUser) {
    return <Loader />;
  }

  const setUserToAdmin = async (userId: string) => {
    await userService.toggleAdminRole(true, userId);
  };

  const setAdminToUser = async (userId: string) => {
    await userService.toggleAdminRole(false, userId);
  };

  return (
    <div className={styles["admin-table__users"]}>
      <div className={styles["admin-table__users-header"]}>
        <div className={styles["admin-table__users-header-email"]}>Email</div>
        <div className={styles["admin-table__users-header-register"]}>
          Дата Регистрации
        </div>
        <div className={styles["admin-table__users-header-orders"]}>Заказы</div>
        <div className={styles["admin-table__users-header-reviews"]}>
          Отзывы
        </div>
        {currentUser.role === "SUPERADMIN" && (
          <div className={styles["admin-table__users-header-actions"]}>
            Действия
          </div>
        )}
      </div>
      <div className={styles["admin-table__users-rows"]}>
        {users.map((user) => (
          <div key={user.id} className={styles["admin-table__users-row"]}>
            <div
              title={user.email}
              className={styles["admin-table__users-row-email"]}
            >
              {getShortEmail(user.email)}
            </div>
            <div className={styles["admin-table__users-row-register"]}>
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div className={styles["admin-table__users-row-orders"]}>
              {user.orders.length}
            </div>
            <div className={styles["admin-table__users-row-reviews"]}>
              {user.reviews.length}
            </div>
            {currentUser.role === "SUPERADMIN" && (
              <div className={styles["admin-table__users-row-actions"]}>
                <div className={styles["admin-table__users-action"]}>
                  {user.role === "SUPERADMIN" ? (
                    <Toggler isToggle={true} disabled={true} accented={true} />
                  ) : (
                    <Toggler
                      isToggle={user.role === "ADMIN"}
                      onToggleOn={() => setUserToAdmin(user.id)}
                      onToggleOff={() => setAdminToUser(user.id)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableUsers;
