import AntLayout from '../components/AntLayout';

export default function Login() {
  const hasProfile = false;
  const hasSideBar = false;
  return (
    <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
      <h1>
      login
    </h1>
    </AntLayout>
  );
}