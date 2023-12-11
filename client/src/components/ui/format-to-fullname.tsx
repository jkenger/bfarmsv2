type Props = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

function FormatToFullName({
  firstName = "",
  middleName = "",
  lastName = "",
}: Props) {
  const fullName =
    (firstName && lastName) || lastName
      ? `${lastName}, ${firstName} ${middleName ? middleName[0] + "." : ""}`
      : "No name found";
  return <>{fullName}</>;
}

export default FormatToFullName;
