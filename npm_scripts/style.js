const replace = require('replace-in-file');
const options = {

  //Single file
  files: './build/index.html',

  //Replacement to make (string or regex)
  replace: 'style.min.css',
  with: 'style.css',

  //Specify if empty/invalid file paths are allowed, defaults to false.
  //If set to true these paths will fail silently and no error will be thrown.
  allowEmptyPaths: false,
};

replace(options);