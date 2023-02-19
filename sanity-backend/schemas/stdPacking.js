
export default {
    name: 'stdPacking',
    type: 'document',
      title: 'Standard Packing',
    fields: [
      {
        name: 'designName',
        type: 'string',
        title: 'Design Name'
      },
      {
        name: 'pvcBox',
        type: 'number',
        title: 'PVC/Box'
      },
      {
        name: 'stiffner',
        type: 'number',
        title: 'stiffner'
      },
      {
        name: 'insert',
        type: 'number',
        title: 'insert'
      },
      {
        name: 'photo',
        type: 'number',
        title: 'Photo'
      },
      {
        name: 'wastePercentage',
        type: 'number',
        title: 'Waste Percentage'
      },
    ]
  }