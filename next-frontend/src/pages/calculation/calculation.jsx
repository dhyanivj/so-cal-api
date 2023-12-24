import React, { useEffect, useState } from 'react';
import sanityClient from '../api/sanity';

const calculation = () => {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    // Example query to fetch data from Sanity
    sanityClient.fetch('*[_type == "packingType"]').then(data => {
      setSanityData(data);
    });
  }, []);

  // Shorthand for determining FabricBedsheetMeter based on bedsheetSize
  const calculateFabricBedsheetMeter = (bedsheetSize) =>
    bedsheetSize === '60x90' ? 60 : bedsheetSize === '90x100' ? 100 : bedsheetSize === '90x108' ? 108 : 0;

  // Function to calculate fabric cost
  const fabricCost = (fabricWastage, fabricRate, bedsheetSize, stitchingMargin, fabricPillow, NumberofPillow, transportCost) => {
    const FabricBedsheetMeter = calculateFabricBedsheetMeter(bedsheetSize);
    return (
      ((FabricBedsheetMeter + stitchingMargin) + (fabricPillow * NumberofPillow) / 39.4) + fabricWastage
    ) * (fabricRate + transportCost);
  };

  // Function to calculate stitching cost
  function stitchingCost(quantity, stitchingRate) {
    // Add your logic for stitching cost calculation
  }

  // Function to calculate packing cost
  function packingCost(quantity, packingRate) {
    // Add your logic for packing cost calculation
  }

  return (
    <div>
      <p>Fabric Cost: {fabricCost(10, 5)}</p>
      <p>Stitching Cost: {stitchingCost(10, 2)}</p>
      <p>Packing Cost: {packingCost(10, 1)}</p>
      {/* Display Sanity data */}
      {sanityData && (
        <div>
          <h2>Sanity Data</h2>
          {/* Render your Sanity data here */}
        </div>
      )}
    </div>
  );
};

export default calculation;
