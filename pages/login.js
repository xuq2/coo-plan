import LoginContainer from "../components/LoginContainer";
import LoginLayout from "../components/LoginLayout";

export default function Login() {
    return (
        <LoginLayout hasProfile={false} hasSideBar={false}>
            <LoginContainer/>
        </LoginLayout>
    );
}