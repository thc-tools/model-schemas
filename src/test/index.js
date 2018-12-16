'use strict'

const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const schemaLocation = path.join(__dirname, "../schemas", "model-data-schema.json");
const compliantModelLocation = path.join(__dirname, "data/compliant-model.json");
const nonCompliantModelLocation =  path.join(__dirname,"data/non-compliant-model.json");
var $RefParser = require('json-schema-ref-parser');
//TODO : improves those tests by using a js test framework

// test models
const compliantModel = JSON.parse(fs.readFileSync(compliantModelLocation));
const nonCompliantModel = JSON.parse(fs.readFileSync(nonCompliantModelLocation));

// schema
const schema = JSON.parse(fs.readFileSync(schemaLocation));

console.log(schema);

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
    console.log(isNonCompliantValide);
    console.log(schemaValide.errors);
}