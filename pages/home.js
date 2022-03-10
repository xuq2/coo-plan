import { Layout } from "antd";
import AntLayout from "../components/AntLayout";
export default function Home() {
  const hasProfile = true;
  const hasSideBar = true;
  return (
    <>
      <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
        <h1>lhome</h1>
      </AntLayout>
    </>
  );
}
