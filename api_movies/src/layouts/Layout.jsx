import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SimpleBottomNavigation from "../components/Footer";

const Layout = () => {
  return <>
    <header>
        <Header />
    </header>

    <main>
        <Outlet />
    </main>

    <footer>
        <SimpleBottomNavigation />
    </footer>
    
    </>
}

export default Layout;