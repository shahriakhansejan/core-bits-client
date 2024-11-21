import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import AssetPDF from "./AssetPDF";

const AssetModal = ({ asset }) => {
  return (
    <div className="modal-box w-11/12 max-w-5xl h-screen">
        <span className="flex justify-end mr-2"><button onClick={()=>document.getElementById(asset._id).close()} className="text-3xl">X</button></span>
      <h3 className="text-lg font-bold mb-4">Asset PDF Preview</h3>

      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <AssetPDF asset={asset} />
      </PDFViewer>

      <div className="mt-4 flex justify-end space-x-4">
        <PDFDownloadLink
          document={<AssetPDF asset={asset} />}
          fileName={`${asset.asset_name}_Details.pdf`}
        >
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default AssetModal;
