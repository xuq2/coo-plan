import AntLayout from '../components/AntLayout';
import LoginContainer from '../components/LoginContainer';

export default function Login() {
  const hasProfile = false;
  const hasSideBar = false;
  return (
    <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
      <LoginContainer/>
    </AntLayout>
  );
}