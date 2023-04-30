export default {
  name: 'commoncost',
  type: 'document',
  title: 'Common Cost',
  fields: [
    {
      name: 'transportcost',
      type: 'number',
      title: 'Transport Charge Per Meter (TCPM)',
    },
    {
      name: 'WastageOfFabric',
      type: 'number',
      title: 'Wastage of Fabric/Raw Material (WOR)',
    },
    {
      name: 'IndirectFactoryOH',
      type: 'number',
      title: 'Indirect Factory Overhead (IFOH)',
    },
    {
      name: 'overhead',
      type: 'number',
      title: 'Direct Factory Overhead (DFOH)',
    },
    {
      name: 'IndirectSalesOH',
      type: 'number',
      title: 'Indirect Sales Overhead (ISOH)',
    },
    {
      name: 'CapitalInterstOH',
      type: 'number',
      title: 'Capital Intrest Overhead (CIOH)',
    },
    {
      name: 'pfi108',
      type: 'number',
      title: '108" Pillow Fabric Inches (108 PFI)',
    },
    {
      name: 'pfi90',
      type: 'number',
      title: '90" Pillow Fabric Inches (90 PFI)',
    },
    {
      name: 'ZigZagSC',
      type: 'number',
      title: 'ZigZag Pillow Stitching Cost (ZPSC)',
    },
    {
      name: 'TwoWayBedsheetStiching',
      type: 'number',
      title: '2 way Bedsheet Stitching Cost (2BSC)',
    },
    {
      name: 'ThreeWayBedsheetStiching',
      type: 'number',
      title: '3 way Bedsheet Stitching Cost (3BSC)',
    },
    {
      name: 'FourWayBedsheetStiching',
      type: 'number',
      title: '4 way Bedsheet Stitching Cost (4BSC)',
    },
    {
      name: 'PipingPillowSC',
      type: 'number',
      title: 'Piping Pillow Stitching Cost(PPSC)',
    },
    {
      name: 'OverlockPillowSC',
      type: 'number',
      title: 'Overlock Pillow Stitching Cost(OPSC)',
    },
    {
      name: 'StichingMarginInches',
      type: 'number',
      title: 'Stitching Margin Inches(SMI)',
    },
  ],
}
