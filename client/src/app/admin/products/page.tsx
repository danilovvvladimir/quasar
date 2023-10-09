import { FC } from "react";
import styles from "../AdminPage.module.scss";
import AdminTable from "@/components/AdminTableProducts/AdminTableProducts";

const AdminProductsPage: FC = () => {
  return (
    <section className="admin-products">
      <div className="admin-products__wrapper">
        {/* search */}
        {/* create */}
        {/* table */}
        <AdminTable />
      </div>
    </section>
  );
};

export default AdminProductsPage;
