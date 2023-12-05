import { useNavigate, useRouteError } from "react-router-dom";
import img from "@/assets/images/not-found.svg";
import { Button } from "@/components/ui/button";
import { Links } from "@/types/common";

type Error = {
  status: number;
  message: string;
};

function Error() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  if (error?.status === 404) {
    return (
      <div className="flex justify-center items-center h-[80vh] p-4">
        <div className="text-center space-y-4">
          <img src={img} alt="not found" className="max-w-md" />
          <h1 className="font-semibold  text-xl">Ohh! Page Not Found</h1>
          <p>we can't seem to find the page you are looking for</p>
          <Button variant="link" onClick={() => navigate(-1)}>
            {" "}
            Go Back{" "}
          </Button>
          <Button variant="link" onClick={() => navigate(Links.ROOT)}>
            Home Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-[500px] px-4 bg-background place-content-center">
      <div className="text-center">
        <h1 className="font-black text-red-500 text-9xl">500</h1>

        <p className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-muted-foreground">
          Oops! Something went wrong on our end. Please try again later..
        </p>

        <Button onClick={() => navigate(-1)} variant="link">
          Home Page
        </Button>
      </div>
    </div>
  );
}

export default Error;
