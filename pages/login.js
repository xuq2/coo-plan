import AntLayout from "../components/AntLayout";
import LoginContainer from "../components/LoginContainer";

export default function Login() {
    return (
        <AntLayout hasProfile={false} hasSideBar={false}>
            <LoginContainer/>
        </AntLayout>
    );
}