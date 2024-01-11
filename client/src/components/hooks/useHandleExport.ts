import * as XLSX from "xlsx";

type ExportType = "csv" | "json" | "xml";
type ExportData = {
  exportType: ExportType;
  exportData: any;
};

const useHandleExport = () => {
  const handleExportToCSV = (exportData: ExportData["exportData"]) => {
    const csvData = exportData.map((row: any) => {
      return Object.values(row).join(",");
    });
    const csvRows = csvData.join("\n");
    const csvFile = new Blob([csvRows], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvFile);
    const downloadLink = document.createElement("a");
    downloadLink.href = csvUrl;
    downloadLink.download = "export.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleExportToJSON = (exportData: ExportData["exportData"]) => {
    const jsonFile = new Blob([JSON.stringify(exportData)], {
      type: "application/json",
    });
    const jsonUrl = URL.createObjectURL(jsonFile);
    const downloadLink = document.createElement("a");
    downloadLink.href = jsonUrl;
    downloadLink.download = "export.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleExportToExcel = (exportData: ExportData["exportData"]) => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // You can also download the Excel file if needed
    XLSX.writeFile(wb, "exported-data.xlsx");
  };

  return { handleExportToCSV, handleExportToJSON, handleExportToExcel };
};

export default useHandleExport;
