import { useAuth } from "@/components/context/auth-provider";

import Main from "@/components/wrappers/Main";
import { UpdateAccountForm } from "./form/UpdateAccount";
import { UpdatePasswordForm } from "./form/UpdatePassword";
import { Separator } from "@/components/ui/separator";

const AccountSection = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="text-semibold text-md">{title}</div>
    {desc && <span className="text-muted-foreground text-xs">{desc}</span>}
    <Separator className="mt-2" />
    {children}
  </div>
);

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
        <div className="flex flex-col gap-6">
          {/* Toggle 2FA */}
          <AccountSection title="Two-factor authentication"></AccountSection>

          {/* Update account */}
          <AccountSection
            title="Account"
            desc="Update your account information"
          >
            <UpdateAccountForm
              toEditItem={{
                id: user?.id || "",
                email: user?.email || "",
                username: user?.username || "",
              }}
            />
          </AccountSection>
          {/* Update Password */}
          <AccountSection title="Change Password">
            <UpdatePasswordForm id={user?.id} />
          </AccountSection>
        </div>
      </Main.Content>
    </>
  );
};

export default AccountSettings;
