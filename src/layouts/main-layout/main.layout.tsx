import { Outlet } from "react-router-dom";
import HeaderComponent from "../../shared/components/header/header.component";
import SideBarComponent from "../../shared/components/sidebar/sidebar.component";
import FooterComponent from "../../shared/components/footer/footer.component";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderComponent />
      <div className="flex flex-1 h-full">
        <SideBarComponent />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}