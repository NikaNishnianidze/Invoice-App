import { Outlet } from "react-router-dom";
import Heeader from "../components/Header";

export default function Layout() {
  return (
    <>
      <Heeader />
      <Outlet />
    </>
  );
}
