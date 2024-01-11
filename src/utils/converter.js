const converter = {
  fieldToTypeInt: (field) => {
    const typeOfField = typeof field;
    switch (typeOfField) {
      case "boolean":
        return 1;
      case "number":
        return 2;
      case "string":
        return 3;
      case "undefined":
        return 4;
      case "object":
        if (field === null) {
          return 0;
        }
        if (Array.isArray(field)) {
          return 6;
        }
        if (Buffer.isBuffer(field)) {
          return 7;
        }
        return 5
      default:
        throw new Error(`Unsupported type. Please contact us with this error : ${docType}`)
    }
  }
}
export default  converter;
