import Head from "next/head";
import { createClient } from "next-sanity";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import Navbar from "@/components/Navbar";

function blr({
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
  const [isChecked9, setIsChecked9] = useState(true);
  const [isChecked10, setIsChecked10] = useState(true);
  const [isChecked11, setIsChecked11] = useState(true);
  const [isChecked12, setIsChecked12] = useState(true);
  const [isChecked13, setIsChecked13] = useState(true);
  const [isChecked14, setIsChecked14] = useState(true);

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
  const [gandeur_90x108, setGandeur_90x108] = useState(discountType);
  const [gandeur_108x108, setGandeur_108x108] = useState(discountType);
  const [satiny_108x108, setSatiny_108x108] = useState(discountType);
  const [vbc_108x108, setVbc_108x108] = useState(discountType);
  const [c210w_54x90, setC210w_54x90] = useState(discountType);

  console.log(al_1plus2_90x100);
  const [hideonprint, setHideonprint] = useState();

  //standard size
  const [stdSize, setStdSize] = useState("");

  // party form name states
  const [inputValue, setInputValue] = useState("");
  const [partyName, setPartyName] = useState("BLR Pvt. Ltd");
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

  console.log(priceData);

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

  const wastageFabricCutting = 3;
  const bedsheetSize54 = (54 + 1 + wastageFabricCutting) / 39.4;
  const bedsheetSize90 = (90 + 1 + wastageFabricCutting) / 39.4;
  const bedsheetSize108 = (108 + 1 + wastageFabricCutting) / 39.4;

  //grandeur price
  const grandeur90x108stdPacking = Math.round(
    (((bedsheetSize90 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric90Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][gandeur_90x108]
  );

  const grandeur90x108Ld = Math.round(
    (((bedsheetSize90 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric90Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][gandeur_90x108]
  );

  const grandeur90x108taiwan = Math.round(
    (((bedsheetSize90 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric90Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][gandeur_90x108]
  );

  const grandeur90x108taiwanPhoto = Math.round(
    (((bedsheetSize90 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric90Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][gandeur_90x108]
  );

  //END grandeur 90 price

  //grandeur 108 price
  const grandeur108x108stdPacking = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][gandeur_108x108]
  );

  const grandeur108x108Ld = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][gandeur_108x108]
  );

  const grandeur108x108taiwan = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][gandeur_108x108]
  );

  const grandeur108x108taiwanPhoto = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].GrandeurFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][gandeur_108x108]
  );

  //END grandeur 108' price

  //Satiny 108 price
  const satiny108x108stdPacking = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].SatinyFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][satiny_108x108]
  );

  const satiny108x108Ld = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].SatinyFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][satiny_108x108]
  );

  const satiny108x108taiwan = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].SatinyFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][satiny_108x108]
  );

  const satiny108x108taiwanPhoto = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].SatinyFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][satiny_108x108]
  );

  //END Satiny 108' price

  //VBC 108 price
  const vbc108x108stdPacking = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].VBCFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][vbc_108x108]
  );

  const vbc108x108Ld = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].VBCFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][vbc_108x108]
  );

  const vbc108x108taiwan = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].VBCFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][vbc_108x108]
  );

  const vbc108x108taiwanPhoto = Math.round(
    (((bedsheetSize108 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].VBCFabric108Price + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][vbc_108x108]
  );

  //END VBC 108' price

  //Colors 210 (White) 54*90
  const c210w_54x90stdPacking = Math.round(
    (((bedsheetSize54 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].Colors210W + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      (standardPack[0].insert +
        standardPack[0].photo +
        standardPack[0].pvcBox +
        standardPack[0].stiffner) *
        (1 + standardPack[0].wastePercentage / 100)) *
      commoncost[0].overhead) /
      costType[0][c210w_54x90]
  );

  const c210w_54x90Ld = Math.round(
    (((bedsheetSize54 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].Colors210W + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].ld) *
      commoncost[0].overhead) /
      costType[0][c210w_54x90]
  );

  const c210w_54x90taiwan = Math.round(
    (((bedsheetSize54 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].Colors210W + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwan) *
      commoncost[0].overhead) /
      costType[0][c210w_54x90]
  );

  const c210w_54x90taiwanPhoto = Math.round(
    (((bedsheetSize54 + stitchingCost[0].pillowMeterCost * 2) *
      (fabricPrice[0].Colors210W + commoncost[0].transportcost) +
      (stitchingCost[0].besheetStichingCost +
        stitchingCost[0].pillowStitchingCost * 2) +
      ptype[0].taiwanPhoto) *
      commoncost[0].overhead) /
      costType[0][c210w_54x90]
  );

  //Colors 210 (White) 54*90

  //END princing formula
  const styles = {
    display: "none",
  };

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
                <div className="form-field hidden">
                  <label className="form-label font-semibold">
                    Discount type
                  </label>
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
                <td></td>
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
                <td></td>
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
                <td></td>
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
                <td></td>
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
                <td></td>
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
                <td></td>
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
                <td></td>
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
                <td></td>
                <td>Satiny(1+2)</td>
                <td>90 x 108</td>
                {stdPacking ? <td>{satiny90x108stdPacking}</td> : ""}
                {ldPacking ? <td> {satiny90x108Ld}</td> : ""}
                {taiwanPacking ? <td> {satiny90x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {satiny90x108taiwanPhoto}</td> : ""}
              </tr>
              {/* Grandeur 90'  */}
              <tr
                className={`${isChecked9 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked9}
                    onChange={(e) => setIsChecked9(e.target.checked)}
                  />
                </td>
                <td></td>
                <td>Grandeur 90" </td>
                <td>90 x 108</td>
                {stdPacking ? <td>{grandeur90x108stdPacking}</td> : ""}
                {ldPacking ? <td> {grandeur90x108Ld}</td> : ""}
                {taiwanPacking ? <td> {grandeur90x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? (
                  <td> {grandeur90x108taiwanPhoto}</td>
                ) : (
                  ""
                )}
              </tr>
              {/* END  Grandeur 90'  */}
              {/* Grandeur 108'  */}
              <tr
                className={`${isChecked10 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked10}
                    onChange={(e) => setIsChecked10(e.target.checked)}
                  />
                </td>
                <td></td>
                <td>Grandeur 108" </td>
                <td>108 x 108</td>
                {stdPacking ? <td>{grandeur108x108stdPacking}</td> : ""}
                {ldPacking ? <td> {grandeur108x108Ld}</td> : ""}
                {taiwanPacking ? <td> {grandeur108x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? (
                  <td> {grandeur108x108taiwanPhoto}</td>
                ) : (
                  ""
                )}
              </tr>
              {/* END  Grandeur 108'  */}

              {/* Satiny 108'  */}
              <tr
                className={`${isChecked11 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked11}
                    onChange={(e) => setIsChecked11(e.target.checked)}
                  />
                </td>
                <td></td>
                <td>Satiny 108" </td>
                <td>108 x 108</td>
                {stdPacking ? <td>{satiny108x108stdPacking}</td> : ""}
                {ldPacking ? <td> {satiny108x108Ld}</td> : ""}
                {taiwanPacking ? <td> {satiny108x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {satiny108x108taiwanPhoto}</td> : ""}
              </tr>
              {/* END  Satiny 108'  */}

              {/* VBC 108'  */}
              <tr
                className={`${isChecked12 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked12}
                    onChange={(e) => setIsChecked12(e.target.checked)}
                  />
                </td>
                <td></td>
                <td>VBC 108" </td>
                <td>108 x 108</td>
                {stdPacking ? <td>{vbc108x108stdPacking}</td> : ""}
                {ldPacking ? <td> {vbc108x108Ld}</td> : ""}
                {taiwanPacking ? <td> {vbc108x108taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {vbc108x108taiwanPhoto}</td> : ""}
              </tr>
              {/* END  VBC 108'  */}

              {/* Colors 210 (White)  */}
              <tr
                className={`${isChecked13 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked13}
                    onChange={(e) => setIsChecked13(e.target.checked)}
                  />
                </td>
                <td></td>
                <td>Colors 210 (White) </td>
                <td>54 x 90</td>
                {stdPacking ? <td>{c210w_54x90stdPacking}</td> : ""}
                {ldPacking ? <td> {c210w_54x90Ld}</td> : ""}
                {taiwanPacking ? <td> {c210w_54x90taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {c210w_54x90taiwanPhoto}</td> : ""}
              </tr>
              {/* END  Colors 210 (White)  */}

              {/* Colors 210 (White) 90x108  */}
              <tr
                className={`${isChecked14 ? `` : `${hideonprint}`} ${
                  stdSize ? "hidden" : ""
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${hideonprint}`}
                    checked={isChecked14}
                    onChange={(e) => setIsChecked14(e.target.checked)}
                  />
                </td>
                <td></td>
                <td>Colors 210 (White) </td>
                <td>90 x 108</td>
                {stdPacking ? <td>{c210w_54x90stdPacking}</td> : ""}
                {ldPacking ? <td> {c210w_54x90Ld}</td> : ""}
                {taiwanPacking ? <td> {c210w_54x90taiwan}</td> : ""}
                {taiwanPhotoPacking ? <td> {c210w_54x90taiwanPhoto}</td> : ""}
              </tr>
              {/* END  Colors 210 (White)  */}
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
export default blr;
