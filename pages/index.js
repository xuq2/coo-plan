import AntLayout from '../components/AntLayout';
import LoginContainer from '../components/LoginContainer';
import LoginLayout from '../components/LoginLayout';

export default function Login() {
  const hasProfile = false;
  const hasSideBar = false;
  return (
    <LoginLayout hasProfile={hasProfile}>
      <LoginContainer/>
    </LoginLayout>
  );
}