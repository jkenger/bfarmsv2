import { Badge } from "./badge";

type Props = {
  status: string;
};

function IsNew({ status }: Props) {
  return status === "new" ? <Badge className="text-xs">New</Badge> : "";
}

export default IsNew;
