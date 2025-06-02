import ExpiredTable from "./ExpiredTable";
import { SiteHeader } from "@/components/site-header";

const breadcrumbItems = [{ label: "Expired IDs" }];

const ExpiredTablePage = () => {
  return (
    <div>
      <SiteHeader breadcrumbItems={breadcrumbItems}>
        <ExpiredTable />
      </SiteHeader>
    </div>
  );
};

export default ExpiredTablePage;
