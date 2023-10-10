"use client";

import { FC, use } from "react";
import styles from "../AdminTable.module.scss";
import { UserPrivate } from "@/types/user";
import { getShortEmail } from "@/utils/getShortEmail";

interface AdminTableUsersProps {
  users: UserPrivate[];
}

const AdminTableUsers: FC<AdminTableUsersProps> = ({ users }) => {
  return (
    <div className={styles["admin-table__users"]}>
      <div className={styles["admin-table__users-header"]}>
        <div className={styles["admin-table__users-header-email"]}>Email</div>
        <div className={styles["admin-table__users-header-register"]}>
          Register Date
        </div>
        <div className={styles["admin-table__users-header-orders"]}>Orders</div>
        <div className={styles["admin-table__users-header-reviews"]}>
          Reviews
        </div>
        <div className={styles["admin-table__users-header-actions"]}>
          Actions
        </div>
      </div>
      <div className={styles["admin-table__users-rows"]}>
        {users.map((user) => (
          <div key={user.id} className={styles["admin-table__users-row"]}>
            <div className={styles["admin-table__users-row-email"]}>
              {/* {user.email} */}
              {getShortEmail(user.email)}
            </div>
            <div className={styles["admin-table__users-row-register"]}>
              {user.createdAt.toLocaleDateString()}
            </div>
            <div className={styles["admin-table__users-row-orders"]}>
              {user.ordersCount}
            </div>
            <div className={styles["admin-table__users-row-reviews"]}>
              {user.reviewsCount}
            </div>
            <div className={styles["admin-table__users-row-actions"]}>
              <div
                className={styles["admin-table__users-action"]}
                onClick={() => console.log(user.id)}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2636 2L16.9136 5.6567L9.15479 13.4298L10.7221 15L18.4809 7.22687L22.1309 10.8836V2H13.2636Z"
                    fill="#001A34"
                  />
                  <path
                    d="M19.9128 19.7778H4.38586V4.22222H12.1493L9.93118 2H4.38586C3.16256 2 2.16772 2.99667 2.16772 4.22222V19.7778C2.16772 21.0033 3.16256 22 4.38586 22H19.9128C21.1361 22 22.1309 21.0033 22.1309 19.7778V14.2222L19.9128 12V19.7778Z"
                    fill="#001A34"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableUsers;
