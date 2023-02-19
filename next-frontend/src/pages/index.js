import Head from "next/head";
import { createClient } from "next-sanity";
import { useState, useRef } from "react";
import jsPDF from "jspdf";

export default function Home({ priceData }) {
  const [discountType, setDiscountType] = useState("blr");
  const outputRef = useRef(null);

  // packing checkbox 
  const [stdPacking, setStdPacking] = useState(false);
  const [ldPacking, setLdPacking] = useState(true);
  const [taiwanPacking, setTaiwanPacking] = useState(false);
  const [taiwanPhotoPacking, setTaiwanPhotoPacking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new jsPDF instance with A4 size and unit in pt
    const pdf = new jsPDF("p", "pt", "a4");

    // Get the output div as a DOM element
    const output = outputRef.current;

    // Add the output div to the PDF document with auto-scaling
    pdf.html(output, {
      callback: () => {
        // Get the table wrapper div as a DOM element
        const tableWrapper = document.querySelector(".table-wrapper");

        // Add the table wrapper div to the PDF document with auto-scaling
        pdf.html(tableWrapper, {
          x: 0,
          y: 0,
          callback: () => {
            pdf.save("`sleepingowls-rate-card+${downloadDate}`.pdf");
          },
        });
      },
    });
  };

  console.log(priceData);

  // glr / blr 

  
 
  const c2cRate =
   Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
   (priceData[1].AllureFabricPrice + priceData[4].transportcost) +
   (priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
   priceData[7].ld) *
 priceData[4].overhead)  ;


//  const updateData =  `priceData[3].${discountType}`

const updateData =  priceData[3][discountType]

console.log(updateData)
console.log("data")


const glrRate = updateData;
//  const blrRate = c2cRate / priceData[3].blr;
//  const slrRate = c2cRate / priceData[3].slr;
//  const plrRate = c2cRate / priceData[3].plr;


 const allure90x100Ld = (Math.round(((priceData[2].size90100 +( priceData[1].pillowMeterCost*2)) *
 (priceData[1].AllureFabricPrice 
  + priceData[4].transportcost  ) +
 (priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
 priceData[7].ld) *
priceData[4].overhead/priceData[3][discountType] ));

const allure60x90Ld = (Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
(priceData[1].AllureFabricPrice 
 + priceData[4].transportcost) +
(priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
priceData[7].ld) *
priceData[4].overhead/priceData[3][discountType])) ;

const allure90x108Ld = (Math.round(((priceData[2].size90108 + (priceData[1].pillowMeterCost * 2)) *
(priceData[1].AllureFabricPrice 
 + priceData[4].transportcost
 ) +
(priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
priceData[7].ld) *
priceData[4].overhead/priceData[3][discountType])) ;

 const satiny90x100Ld = (Math.round(((priceData[2].size90100 +( priceData[1].pillowMeterCost*2)) *
 (priceData[1].satinyFabricPrice 
  + priceData[4].transportcost  ) +
 (priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
 priceData[7].ld) *
priceData[4].overhead/priceData[3][discountType] ));

const satiny60x90Ld = (Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
(priceData[1].satinyFabricPrice 
 + priceData[4].transportcost) +
(priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
priceData[7].ld) *
priceData[4].overhead/priceData[3][discountType])) ;

const satiny90x108Ld = (Math.round(((priceData[2].size90108 + (priceData[1].pillowMeterCost * 2)) *
(priceData[1].satinyFabricPrice 
 + priceData[4].transportcost
 ) +
(priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
priceData[7].ld) *
priceData[4].overhead/priceData[3][discountType])) ;

// for taiwan 

 const allure90x100taiwan = (Math.round(((priceData[2].size90100 +( priceData[1].pillowMeterCost*2)) *
 (priceData[1].AllureFabricPrice 
  + priceData[4].transportcost  ) +
 (priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
 priceData[7].taiwan) *
priceData[4].overhead/priceData[3][discountType] ));

const allure60x90taiwan = (Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
(priceData[1].AllureFabricPrice 
 + priceData[4].transportcost) +
(priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
priceData[7].taiwan) *
priceData[4].overhead/priceData[3][discountType])) ;

const allure90x108taiwan = (Math.round(((priceData[2].size90108 + (priceData[1].pillowMeterCost * 2)) *
(priceData[1].AllureFabricPrice 
 + priceData[4].transportcost
 ) +
(priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
priceData[7].taiwan) *
priceData[4].overhead/priceData[3][discountType])) ;

 const satiny90x100taiwan = (Math.round(((priceData[2].size90100 +( priceData[1].pillowMeterCost*2)) *
 (priceData[1].satinyFabricPrice 
  + priceData[4].transportcost  ) +
 (priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
 priceData[7].taiwan) *
priceData[4].overhead/priceData[3][discountType] ));

const satiny60x90taiwan = (Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
(priceData[1].satinyFabricPrice 
 + priceData[4].transportcost) +
(priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
priceData[7].taiwan) *
priceData[4].overhead/priceData[3][discountType])) ;

const satiny90x108taiwan = (Math.round(((priceData[2].size90108 + (priceData[1].pillowMeterCost * 2)) *
(priceData[1].satinyFabricPrice 
 + priceData[4].transportcost
 ) +
(priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
priceData[7].taiwan) *
priceData[4].overhead/priceData[3][discountType])) ;


// for taiwanPhoto 

 const allure90x100taiwanPhoto = (Math.round(((priceData[2].size90100 +( priceData[1].pillowMeterCost*2)) *
 (priceData[1].AllureFabricPrice 
  + priceData[4].transportcost  ) +
 (priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
 priceData[7].taiwanPhoto) *
priceData[4].overhead/priceData[3][discountType] ));

const allure60x90taiwanPhoto = (Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
(priceData[1].AllureFabricPrice 
 + priceData[4].transportcost) +
(priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
priceData[7].taiwanPhoto) *
priceData[4].overhead/priceData[3][discountType])) ;

const allure90x108taiwanPhoto = (Math.round(((priceData[2].size90108 + (priceData[1].pillowMeterCost * 2)) *
(priceData[1].AllureFabricPrice 
 + priceData[4].transportcost
 ) +
(priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
priceData[7].taiwanPhoto) *
priceData[4].overhead/priceData[3][discountType])) ;

 const satiny90x100taiwanPhoto = (Math.round(((priceData[2].size90100 +( priceData[1].pillowMeterCost*2)) *
 (priceData[1].satinyFabricPrice 
  + priceData[4].transportcost  ) +
 (priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
 priceData[7].taiwanPhoto) *
priceData[4].overhead/priceData[3][discountType] ));

const satiny60x90taiwanPhoto = (Math.round(((priceData[2].size6090 + priceData[1].pillowMeterCost) *
(priceData[1].satinyFabricPrice 
 + priceData[4].transportcost) +
(priceData[1].besheetStichingCost + priceData[1].pillowStitchingCost) +
priceData[7].taiwanPhoto) *
priceData[4].overhead/priceData[3][discountType])) ;

const satiny90x108taiwanPhoto = (Math.round(((priceData[2].size90108 + (priceData[1].pillowMeterCost * 2)) *
(priceData[1].satinyFabricPrice 
 + priceData[4].transportcost
 ) +
(priceData[1].besheetStichingCost + (priceData[1].pillowStitchingCost*2)) +
priceData[7].taiwanPhoto) *
priceData[4].overhead/priceData[3][discountType])) ;


return (
    <>
      <Head>
        <title>Print Rates</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="output w-100" ref={outputRef}>
       </div>

      {/* table */}
     <div className="table-wrapper ">
     <table border="1" className="table card ">
        <tbody>
          <tr>
            <th>Design</th>
            <th>Size</th>
            {stdPacking ? <td> <th>Std. Packing</th></td> : "" }
            {ldPacking ? <td> <th>LD Packing</th></td> : "" }
            {taiwanPacking ? <td> <th>Taiwan Packing</th></td> : "" }
            {taiwanPhotoPacking ? <td> <th>Taiwan+photo Packing</th></td> : "" }
          </tr>
          <tr>
            <td>Allure</td>
            <td>90 x 100</td>
            {stdPacking ? <td> <p>stdpack checked</p></td> : "" }
             {ldPacking ? <td> {allure90x100Ld}</td> : "" }
             {taiwanPacking ? <td> {allure90x100taiwan}</td> : "" }
             {taiwanPhotoPacking ? <td> {allure90x100taiwanPhoto}</td> : "" }
          </tr>
          <tr>
            <td>Allure</td>
            <td>60 x 90</td>
            {stdPacking ? <td> <p>stdpack checked</p></td> : "" }
             {ldPacking ? <td> <p>{allure60x90Ld}</p></td> : "" }
             {taiwanPacking ? <td> {allure60x90taiwan}</td> : "" }
             {taiwanPhotoPacking ? <td> {allure60x90taiwanPhoto}</td> : "" }
          </tr>
          <tr>
            <td>Allure</td>
            <td>90 x 108</td>
            {stdPacking ? <td> <p>stdpack checked</p></td> : "" }
             {ldPacking ? <td> {allure90x108Ld}</td> : "" }
             {taiwanPacking ? <td>{allure90x108taiwan}</td> : "" }
             {taiwanPhotoPacking ? <td> {allure90x108taiwanPhoto}</td> : "" }
          </tr>
          <tr>
            <td>Satiny</td>
            <td>90 x 100</td>
             {stdPacking ? <td> <p>stdpack checked</p></td> : "" }
             {ldPacking ? <td> <p>{satiny90x100Ld}</p></td> : "" }
             {taiwanPacking ? <td>{satiny90x100taiwan}</td> : "" }
             {taiwanPhotoPacking ? <td> {satiny90x100taiwanPhoto}</td> : "" }
          </tr>
          <tr>
            <td>Satiny</td>
            <td>60 x 90</td>
            {stdPacking ? <td> <p>stdpack checked</p></td> : "" }
            {ldPacking ? <td> <p>{satiny60x90Ld}</p></td> : "" }
            {taiwanPacking ? <td> {satiny60x90taiwan}</td> : "" }
            {taiwanPhotoPacking ? <td>{satiny60x90taiwanPhoto}</td> : "" }
          </tr>
          <tr>
            <td>Satiny</td>
            <td>90 x 108</td>
            {stdPacking ? <td> <p>stdpack checked</p></td> : "" }
            {ldPacking ? <td> {satiny90x108Ld}</td> : "" }
            {taiwanPacking ? <td> {satiny90x108taiwan}</td> : "" }
            {taiwanPhotoPacking ? <td> {satiny90x108taiwanPhoto}</td> : "" }
          </tr>
        </tbody>
      </table>
     </div>
      {/* table ends */}

      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 p-5">
        <div className="flex flex-col items-center">
          {/* <h1 className="text-3xl font-semibold">Download Rate List</h1> */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Discount type</label>
              <select
                className="select"
                name="discountType"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="c2c">C2C</option>
                <option value="glr">GLR</option>
                <option value="blr">BLR</option>
                <option value="slr">SLR</option>
                <option value="plr">PLR</option>
          
              </select>
            </div>
            <div className="mb-4 mt-3">
                <label htmlFor="packing" className="form-label mb-2" >
                  Packing Type
                </label>
                <div role="group" aria-labelledby="checkbox-group">
                  <label className="flex cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="packing"
                      checked={stdPacking}
                      onChange = { (e) => 
                        setStdPacking(e.target.checked)}
                      className="checkbox"
                    />
                    <span>Std. Packing</span>
                  </label>
                  <label className="flex cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="packing"
                      checked={ldPacking}
                      onChange = { (e) => 
                        setLdPacking(e.target.checked)}
                      className="checkbox"
                    />
                    <span>LD</span>
                  </label>
                  <label className="flex cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="packing"
                      checked={taiwanPacking}
                      onChange = { (e) => 
                        setTaiwanPacking(e.target.checked)}
                      className="checkbox"
                    />
                    <span>Taiwan</span>
                  </label>
                  <label className="flex cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="packing"
                      checked={taiwanPhotoPacking}
                      onChange = { (e) => 
                        setTaiwanPhotoPacking(e.target.checked)}
                    
                      className="checkbox"
                    />
                    <span>Taiwan + Photo</span>
                  </label>
                </div>
              </div>

            <div className="form-field pt-5">
              <div className="form-control justify-between">
                <button
                  type="submit"
                  className="btn btn-primary w-full font-bold"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </form>
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

  const query = `*[]`;
  const priceData = await client.fetch(query);

  // Pass data to the page via props
  return { props: { priceData } };
}
