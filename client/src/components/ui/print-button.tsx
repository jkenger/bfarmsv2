import React from "react";
import { Button } from "./button";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import { IconProperties } from "@/types/common";

type Props = {
  printRef: React.MutableRefObject<any>;
  children: React.ReactNode;
};

function PrintButton({ printRef, children }: Props) {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: "",
  });
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex  justify-between gap-4"
      onClick={handlePrint}
    >
      <span>{children}</span>
      <Printer size={IconProperties.SIZE_ICON} />{" "}
    </Button>
  );
}

export default PrintButton;
