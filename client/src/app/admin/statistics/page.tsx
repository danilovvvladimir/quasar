import { FC } from "react";
import "../AdminStatiscticsPage.scss";

const AdminStatiscticsPage: FC = () => {
  return (
    <section className="admin-statistics">
      {/* admin-statistics__submenu */}
      <div className="admin-statistics__wrapper">
        <div className="admin-statistics__users"></div>
        <div className="admin-statistics__orders"></div>
        <div className="admin-statistics__reviews"></div>
        <div className="admin-statistics__total"></div>
      </div>
    </section>
  );
};

export default AdminStatiscticsPage;
