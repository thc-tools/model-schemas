'use strict'

const Ajv = require('ajv');
const fs = require('fs');

const schemaLocation = "../model-data-schema.json";
const compliantModelLocation = "./compliant-model.json";
const nonCompliantModelLocation = "./non-compliant-model.json";

// test models
const compliantModel = JSON.parse(fs.readFileSync(compliantModelLocation));
const nonCompliantModel = JSON.parse(fs.readFileSync(nonCompliantModelLocation));

// schema
const schema = JSON.parse(fs.readFileSync(schemaLocation));


// initializing
const ajv =new Ajv({allErrors:true});

// compiling model
const schemaValide = ajv.compile(schema);


const isCompliantValide = schemaValide(compliantModel);

if(isCompliantValide) {
    console.log("passing validity test for compliant model");
}else{
    console.log("something went wrong with the validation of the compliant model");
    console.log(schemaValide.errors);
}

const isNonCompliantValide = schemaValide(nonCompliantModel);

if(!isNonCompliantValide) {
    console.log("passing validity test for non-compliant model");
}else{
    console.log("something went wrong with the validation of the non-compliant model");
    console.log(schemaValide.errors);
}