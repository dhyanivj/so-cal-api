import Head from "next/head";
import { createClient } from "next-sanity";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import withAuth from "../../utils/withAuth";
import Navbar from "@/components/Navbar";

function Home({
  priceData,
  ptype,
  standardPack,
  bedsheetSize,
  commoncost,
  fabricPrice,
  stitchingCost,
  costType,
}) {
  const [discountType, setDiscountType] = useState("blr");
  const outputRef = useRef(null);
  // packing checkbox
  const [stdPacking, setStdPacking] = useState();
  const [ldPacking, setLdPacking] = useState();
  const [taiwanPacking, setTaiwanPacking] = useState();
  const [taiwanPhotoPacking, setTaiwanPhotoPacking] = useState();
  const [isDownloading, setIsDownloading] = useState();

  //checked on print
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(true);
  const [isChecked4, setIsChecked4] = useState(true);
  const [isChecked5, setIsChecked5] = useState(true);
  const [isChecked6, setIsChecked6] = useState(true);
  const [isChecked7, setIsChecked7] = useState(true);
  const [isChecked8, setIsChecked8] = useState(true);

  //table discount type
  const [al_1plus2_90x100, setAl_1plus2_90x100] = useState(discountType);
  const [al_1plus1_60x90, setAl_1plus1_60x90] = useState(discountType);
  const [al_1plus2_90x108, setAl_1plus2_90x108] = useState(discountType);
  const [al_1plus4_90x100, setAl_1plus4_90x100] = useState(discountType);
  const [al_1plus4_90x108, setAl_1plus4_90x108] = useState(discountType);
  const [sanity_1plus2_90x100, setSanity_1plus2_90x100] =
    useState(discountType);
  const [satiny_1plus1_60x90, setSatiny_1plus1_60x90] = useState(discountType);
  const [satiny_1plus2_90x108, setSatiny_1plus2_90x108] =
    useState(discountType);

  console.log(al_1plus2_90x100);
  const [hideonprint, setHideonprint] = useState();

  //standard size
  const [stdSize, setStdSize] = useState("");

  // party form name states
  const [inputValue, setInputValue] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyDetail1, setPartyDetail1] = useState("");
  const [partyDetail2, setPartyDetail2] = useState("");
  const [pdfDetail1, setPdfDetail1] = useState("");
  const [pdfDetail2, setPdfDetail2] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    setStdPacking(true);
    setLdPacking(false);
    setTaiwanPacking(false);
    setTaiwanPhotoPacking(false);
    setIsDownloading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setHideonprint("hidden");
    // Create a new jsPDF instance with A3 size and unit in pt

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a3",
    });

    // Get the output div as a DOM element
    const output = outputRef.current;

    //date in pdf name
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString().slice(-2);
    const dateString = `${day}-${month}-${year}`;
    const fileName = `sleepingowls-rate-card-${dateString}.pdf`;

    // Add the output div to the PDF document with auto-scaling
    pdf.html(output, {
      callback: () => {
        // Get the table wrapper div as a DOM element
        const tableWrapper = document.querySelector(".table-wrapper");

        // Add the table wrapper div to the PDF document with auto-scaling
        pdf.html(tableWrapper, {
          x: 0,
          y: 0,
          scaleFactor: pdf.internal.pageSize.width / output.offsetWidth, // Scale factor to fit content within page size
          callback: () => {
            pdf.save(fileName);
          },
        });
        setIsDownloading(false);
        setHideonprint("");
      },
    });
  };

  //whatsapp function

  const generatePDF = () => {
    return new Promise((resolve, reject) => {
      // Create a new jsPDF instance with A3 size and unit in pt
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a3",
      });

      // Get the output div as a DOM element
      const output = outputRef.current;

      //date in pdf name
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear().toString().slice(-2);
      const dateString = `${day}-${month}-${year}`;
      const fileName = `sleepingowls-rate-card-${dateString}.pdf`;

      // Add the output div to the PDF document with auto-scaling
      pdf.html(output, {
        callback: () => {
          // Get the table wrapper div as a DOM element
          const tableWrapper = document.querySelector(".table-wrapper");

          // Add the table wrapper div to the PDF document with auto-scaling
          pdf.html(tableWrapper, {
            x: 0,
            y: 0,
            scaleFactor: pdf.internal.pageSize.width / output.offsetWidth, // Scale factor to fit content within page size
            callback: () => {
              // Resolve the Promise with the PDF file as a Blob
              resolve(pdf.output("blob"));
            },
          });
        },
      });
    });
  };

  // whatsapp share
  const sharePDFViaWhatsApp = async () => {
    try {
      // Generate the PDF file
      const pdfBlob = await generatePDF();

      // Create a URL for the PDF file
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a WhatsApp message with the PDF file as an attachment
      const message = `Check out my rate card!`;
      const file = new File([pdfBlob], "rate-card.pdf", {
        type: "application/pdf",
      });
      const formData = new FormData();
      formData.append("text", message);
      formData.append("blob", file);

      // Open the WhatsApp share URL with the message and attachment
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        message
      )}&attachment=${encodeURIComponent(pdfUrl)}`;
      window.open(shareUrl, "_blank");

      // Clean up the URL object
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(standardPack);

  const allure90x100Ld = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x100]
  );

  const allure60x90Ld = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][al_1plus1_60x90]
  );

  const allure90x108Ld = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x108]
  );

  const allure90x108Ld_1plus4 = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 4) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 4) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][al_1plus4_90x108]
  );

  const allure90x100Ld_1plus4 = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 4) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 4) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][al_1plus4_90x100]
  );

  const satiny90x100Ld = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][sanity_1plus2_90x100]
  );

  const satiny60x90Ld = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus1_60x90]
  );

  const satiny90x108Ld = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus2_90x108]
  );

  // for taiwan

  const allure90x100taiwan = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x100]
  );

  const allure60x90taiwan = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][al_1plus1_60x90]
  );

  const allure90x108taiwan = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x108]
  );
  const allure90x108taiwan_1plus4 = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 4) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 4) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][al_1plus4_90x108]
  );

  const satiny90x100taiwan = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][sanity_1plus2_90x100]
  );

  const satiny60x90taiwan = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus1_60x90]
  );

  const satiny90x108taiwan = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus2_90x108]
  );

  // for taiwanPhoto

  const allure90x100taiwanPhoto = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x100]
  );

  const allure60x90taiwanPhoto = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][al_1plus1_60x90]
  );

  const allure90x108taiwanPhoto = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x108]
  );
  const allure90x108taiwanPhoto_1plus4 = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 4) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 4) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][al_1plus4_90x108]
  );

  const satiny90x100taiwanPhoto = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][sanity_1plus2_90x100]
  );

  const satiny60x90taiwanPhoto = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus1_60x90]
  );

  const satiny90x108taiwanPhoto = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus2_90x108]
  );

  // std packing

  const allure90x100stdPacking = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x100]
  );
  const allure90x108stdPacking = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][al_1plus2_90x108]
  );
  const allure90x108stdPacking_1plus4 = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 4) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 4) +
      (standardPack[3].insert +
        standardPack[3].photo +
        standardPack[3].pvcBox +
        standardPack[3].stiffner) *
        (1 + standardPack[3].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][al_1plus4_90x108]
  );
  const allure90x100stdPacking_1plus4 = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 4) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 4) +
      (standardPack[3].insert +
        standardPack[3].photo +
        standardPack[3].pvcBox +
        standardPack[3].stiffner) *
        (1 + standardPack[3].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][al_1plus4_90x100]
  );

  const allure60x90stdPacking = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].AllureFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      (standardPack[4].insert +
        standardPack[4].photo +
        standardPack[4].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][al_1plus1_60x90]
  );

  const satiny90x100stdPacking = Math.round(
    (((bedsheetSize[0].size90100 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][sanity_1plus2_90x100]
  );
  const satiny90x108stdPacking = Math.round(
    (((bedsheetSize[0].size90108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus2_90x108]
  );
  const satiny60x90stdPacking = Math.round(
    (((bedsheetSize[0].size6090 + stitchingCost[0].pillowMeterCost) *
      (fabricPrice[0].satinyFabricPrice + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost) +
      (standardPack[4].insert +
        standardPack[4].photo +
        standardPack[4].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][satiny_1plus1_60x90]
  );

  return (
    <>
      <Head>
        <title>Print Rates</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="w-100 bg-blue-300">
        <div className="flex justify-center  gap-6 p-5">
          <div className="bg-white rounded-lg shadow p-5 px-14 discount-form ">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-field">
                  <label className="form-label font-semibold">
                    Discount type
                  </label>
                  <select
                    className="select"
                    name="discountType"
                    value={discountType}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDiscountType(value);
                      setAl_1plus2_90x100(value);
                      setAl_1plus1_60x90(value);
                      setAl_1plus2_90x108(value);
                      setAl_1plus4_90x100(value);
                      setAl_1plus4_90x108(value);
                      setSanity_1plus2_90x100(value);
                      setSatiny_1plus1_60x90(value);
                      setSatiny_1plus2_90x108(value);
                    }}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </div>
                <div className="mb-4 mt-3">
                  <label
                    htmlFor="packing"
                    className="form-label mb-2 font-semibold"
                  >
                    Packing Type
                  </label>
                  <div role="group" aria-labelledby="checkbox-group">
                    <label className="flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        name="packing"
                        checked={stdPacking}
                        onChange={(e) => setStdPacking(e.target.checked)}
                        className="checkbox"
                      />
                      <span>Std. Packing</span>
                    </label>
                    <label className="flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        name="packing"
                        checked={ldPacking}
                        onChange={(e) => setLdPacking(e.target.checked)}
                        className="checkbox"
                      />
                      <span>LD</span>
                    </label>
                    <label className="flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        name="packing"
                        checked={taiwanPacking}
                        onChange={(e) => setTaiwanPacking(e.target.checked)}
                        className="checkbox"
                      />
                      <span>Taiwan</span>
                    </label>
                    <label className="flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        name="packing"
                        checked={taiwanPhotoPacking}
                        onChange={(e) =>
                          setTaiwanPhotoPacking(e.target.checked)
                        }
                        className="checkbox"
                      />
                      <span>Taiwan + Photo</span>
                    </label>
                  </div>
                  <div></div>
                </div>
                <label className="flex cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    name="packing"
                    className="switch"
                    checked={stdSize}
                    onChange={(e) => setStdSize(e.target.checked)}
                  />
                  <span className="font-bold">Standard Design</span>
                </label>

                <div className="form-field pt-5">
                  <div className="form-control flex-col">
                    <button
                      type="submit"
                      className="btn btn-primary w-full font-bold"
                    >
                      <img
                        src="./download-icon.png"
                        alt="downloadbtn"
                        width={25}
                        className="mr-4"
                      />
                      {isDownloading ? (
                        <div className="download-animation">
                          <div className="line line-1"></div>
                          <div className="line line-2"></div>
                          <div className="line line-3"></div>
                        </div>
                      ) : (
                        "Download PDF"
                      )}
                    </button>

                    <button
                      className="btn btn-success w-full font-bold"
                      onClick={sharePDFViaWhatsApp}
                      type="button"
                    >
                      Whatsapp Share
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* ------------------Party Name form  ------------------- */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                <div className="form-group">
                  <div className="form-field">
                    <label className="form-label font-semibold">
                      Party Name
                    </label>
                    <input
                      placeholder="Enter Name"
                      type="text"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      className="input max-w-full"
                    />

                    {/* --------- More Party Details ------------- */}
                    <label className="form-label font-semibold mt-4 text-gray-900">
                      Other Details
                    </label>
                    <input
                      placeholder="More Details"
                      type="text"
                      value={partyDetail1}
                      onChange={(event) => setPartyDetail1(event.target.value)}
                      className="input max-w-full "
                    />
                    <input
                      placeholder="More Details"
                      type="text"
                      value={partyDetail2}
                      onChange={(event) => setPartyDetail2(event.target.value)}
                      className="input max-w-full mt-4"
                    />
                  </div>
                  <div className="form-field pt-2">
                    <div className="form-control justify-between">
                      <button
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={() => {
                          setPartyName(inputValue);
                          setPdfDetail1(partyDetail1);
                          setPdfDetail2(partyDetail2);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------End Party Name form  ------------------- */}
        </div>
      </div>
      {/* table */}
      <div>
        <div className="table-wrapper" ref={outputRef}>
          <div className="flex flex-row items-center ">
            <div>
              <img
                src="./logo.png"
                alt="logo"
                width={150}
                className="ml-16 mt-10"
              />
            </div>
            <div className="ml-80">
              {today}
              <p className="mt-3">
                <span className="font-bold"> {partyName}</span>
              </p>
              <p>{pdfDetail1}</p>
              <p>{pdfDetail2}</p>
            </div>
          </div>
          <table border="1" className="table card bg-white p-5 m-5">
            <tbody>
              <tr>
                <th></th>
                <th></th>
                <th>Design</th>
                <th>Size</th>
                {stdPacking ? (
                  <td>
                    <th>Std. Packing</th>
                  </td>
                ) : (
                  ""
                )}
                {ldPacking ? (
                  <td>
                    <th>LD Packing</th>
                  </td>
                ) : (
                  ""
                )}
                {taiwanPacking ? (
                  <td>
                    <th>Taiwan Packing</th>
                  </td>
                ) : (
                  ""
                )}
                {taiwanPhotoPacking ? (
                  <td>
                    <th>Taiwan+photo Packing</th>
                  </td>
                ) : (
                  ""
                )}
              </tr>

              <tr className={`${isChecked ? `` : `${hideonprint}`}`}>
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    value={al_1plus2_90x100}
                    onChange={(e) => setAl_1plus2_90x100(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Allure(1+2)</td>
                <td>90 x 100</td>
                {stdPacking ? <td>{allure90x100stdPacking}</td> : ""}
                {ldPacking ? <td> {allure90x100Ld}</td> : ""}
                {taiwanPacking ? <td> {allure90x100taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {allure90x100taiwanPhoto}</td> : ""}
              </tr>

              <tr className={`${isChecked2 ? `` : `${hideonprint}`}`}>
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked2}
                    onChange={(e) => setIsChecked2(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    name="discountType"
                    value={al_1plus1_60x90}
                    onChange={(e) => setAl_1plus1_60x90(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Allure(1+1)</td>
                <td>60 x 90</td>
                {stdPacking ? <td>{allure60x90stdPacking}</td> : ""}
                {ldPacking ? (
                  <td>
                    <p>{allure60x90Ld}</p>
                  </td>
                ) : (
                  ""
                )}
                {taiwanPacking ? <td> {allure60x90taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {allure60x90taiwanPhoto}</td> : ""}
              </tr>
              <tr
                className={`${isChecked3 ? "" : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked3}
                    onChange={(e) => setIsChecked3(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    name="discountType"
                    value={al_1plus2_90x108}
                    onChange={(e) => setAl_1plus2_90x108(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Allure(1+2)</td>
                <td>90 x 108</td>
                {stdPacking ? <td>{allure90x108stdPacking}</td> : ""}
                {ldPacking ? <td> {allure90x108Ld}</td> : ""}
                {taiwanPacking ? <td>{allure90x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {allure90x108taiwanPhoto}</td> : ""}
              </tr>

              <tr
                className={`${isChecked4 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked4}
                    onChange={(e) => setIsChecked4(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    name="discountType"
                    value={al_1plus4_90x100}
                    onChange={(e) => setAl_1plus4_90x100(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td className="bg-grey-100">Allure(1+4)(?)</td>
                <td>90 x 100</td>
                {stdPacking ? <td>{allure90x100stdPacking_1plus4}</td> : ""}
                {ldPacking ? <td> {allure90x100Ld_1plus4}</td> : ""}
                {taiwanPacking ? <td>{allure90x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {allure90x108taiwanPhoto}</td> : ""}
              </tr>

              <tr
                className={`${isChecked5 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                } `}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked5}
                    onChange={(e) => setIsChecked5(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    name="discountType"
                    value={al_1plus4_90x108}
                    onChange={(e) => setAl_1plus4_90x108(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Allure(1+4)</td>
                <td>90 x 108</td>
                {stdPacking ? <td>{allure90x108stdPacking_1plus4}</td> : ""}
                {ldPacking ? <td> {allure90x108Ld_1plus4}</td> : ""}
                {taiwanPacking ? <td>{allure90x108taiwan_1plus4}</td> : ""}
                {taiwanPhotoPacking ? (
                  <td> {allure90x108taiwanPhoto_1plus4}</td>
                ) : (
                  ""
                )}
              </tr>

              <tr className={`${isChecked6 ? `` : `${hideonprint}`}`}>
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked6}
                    onChange={(e) => setIsChecked6(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    name="discountType"
                    value={sanity_1plus2_90x100}
                    onChange={(e) => setSanity_1plus2_90x100(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Satiny (1+2)</td>
                <td>90 x 100</td>
                {stdPacking ? <td>{satiny90x100stdPacking}</td> : ""}
                {ldPacking ? (
                  <td>
                    <p>{satiny90x100Ld}</p>
                  </td>
                ) : (
                  ""
                )}
                {taiwanPacking ? <td>{satiny90x100taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {satiny90x100taiwanPhoto}</td> : ""}
              </tr>

              <tr className={`${isChecked7 ? `` : `${hideonprint}`}`}>
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked7}
                    onChange={(e) => setIsChecked7(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select w-20 ${hideonprint}`}
                    name="discountType"
                    value={satiny_1plus1_60x90}
                    onChange={(e) => setSatiny_1plus1_60x90(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Satiny (1+1)</td>
                <td>60 x 90</td>
                {stdPacking ? <td>{satiny60x90stdPacking}</td> : ""}
                {ldPacking ? (
                  <td>
                    <p>{satiny60x90Ld}</p>
                  </td>
                ) : (
                  ""
                )}
                {taiwanPacking ? <td> {satiny60x90taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td>{satiny60x90taiwanPhoto}</td> : ""}
              </tr>

              <tr
                className={`${isChecked8 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked8}
                    onChange={(e) => setIsChecked8(e.target.checked)}
                  />
                </td>
                <td>
                  <select
                    className={`select ${hideonprint}`}
                    name="discountType"
                    value={satiny_1plus2_90x108}
                    onChange={(e) => setSatiny_1plus2_90x108(e.target.value)}
                  >
                    <option value="c2c">C2C</option>
                    <option value="glr">GLR</option>
                    <option value="blr">BLR</option>
                    <option value="slr">SLR</option>
                    <option value="plr">PLR</option>
                  </select>
                </td>
                <td>Satiny(1+2)</td>
                <td>90 x 108</td>
                {stdPacking ? <td>{satiny90x108stdPacking}</td> : ""}
                {ldPacking ? <td> {satiny90x108Ld}</td> : ""}
                {taiwanPacking ? <td> {satiny90x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {satiny90x108taiwanPhoto}</td> : ""}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = createClient({
    projectId: "eo3yixtt",
    dataset: "production",
    useCdn: true,
  });

  const query = `*[] {

  }`;
  const priceData = await client.fetch(query);
  const ptype = await client.fetch('*[_type == "packingType"]');
  const standardPack = await client.fetch('*[_type == "stdPacking"]');
  const commoncost = await client.fetch('*[_type == "commoncost"]');
  const stitchingCost = await client.fetch('*[_type == "stitchingCost"]');
  const fabricPrice = await client.fetch('*[_type == "fabricPrice"]');
  const bedsheetSize = await client.fetch('*[_type == "bedsheetSize"]');
  const costType = await client.fetch('*[_type == "costType"]');
  // Pass data to the page via props
  return {
    props: {
      priceData,
      ptype,
      standardPack,
      commoncost,
      stitchingCost,
      bedsheetSize,
      fabricPrice,
      costType,
    },
  };
}
//
export default withAuth(Home);
