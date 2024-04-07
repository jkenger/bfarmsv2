import { useAuth } from "@/components/context/auth-provider";
import Main from "@/components/wrappers/Main";

const AccountSettings = () => {
  const { user } = useAuth();
  const pageTitle = "Account Settings";
  const desc = "Update your account settings here.";
  console.log(user);
  return (
    <>
      <Main.Header>
        <Main.Heading
          title={pageTitle}
          desc={desc}
          access="admin"
        ></Main.Heading>
      </Main.Header>
      <Main.Content>
        <div>Profile</div>
      </Main.Content>
    </>
  );
};

export default AccountSettings;
