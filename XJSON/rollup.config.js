module.exports = [
  {
    input: 'src/index.js',
    output:[
      {
        file: 'dist/index.cjs.js',
        format: 'cjs'
      }
    ]
  },
  {
    input: 'src/index.js',
    output:[
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      }
    ]
  }
];
