import { Layout } from "antd"
import { AntHeader } from "../components/AntHeader"
import AntLayout from "../components/AntLayout";
import Copyright from "../components/Copyright"
import SideBar from "../components/SideBar"
const { Content } = Layout;
export default function Home(props) {
    const hasProfile = true;
    const hasSideBar = true;
    return(
        <>
        <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
        <h1>
      lhome
    </h1>
        </AntLayout>
        
      </>
    )
}