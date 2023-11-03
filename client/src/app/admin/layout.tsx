import { Metadata } from "next";
import styles from "./AdminPage.module.scss";
import AdminNavigation from "@/components/AdminNavigation/AdminNavigation";
import { ADMIN_PAGE_METADATA_TITLE } from "@/constants/metadata";

export const metadata: Metadata = {
  title: ADMIN_PAGE_METADATA_TITLE,
  description: ADMIN_PAGE_METADATA_TITLE,
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles["admin"]}>
      <AdminNavigation />
      {children}
    </section>
  );
}
