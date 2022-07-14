import { useState } from "react";
import { XMLParser } from "fast-xml-parser";

const Form = () => {
  const [fileName, setFileName] = useState("");
  const [invoice, setInvoice] = useState({});
  const loadXmlContent = function (event) {
    setFileName(event.target.value);
    const reader = new FileReader();
    reader.onload = convertXmlToJs;
    reader.readAsText(event.target.files[0]);
  };
  const convertXmlToJs = (event) => {
    const parser = new XMLParser();
    const temp1 = parser.parse(event.target.result);
    console.log(temp1);
    //Datos de provider
    const providerName =
      temp1.Invoice["cac:AccountingSupplierParty"]["cac:Party"][
        "cac:PartyLegalEntity"
      ]["cbc:RegistrationName"];
    const ruc =
      temp1.Invoice["cac:AccountingSupplierParty"]["cac:Party"][
        "cac:PartyIdentification"
      ]["cbc:ID"];
    const operationId = temp1.Invoice["cbc:ID"];
    const providerAddress =
      temp1.Invoice["cac:AccountingSupplierParty"]["cac:Party"][
        "cac:PartyLegalEntity"
      ]["cac:RegistrationAddress"]["cac:AddressLine"]["cbc:Line"];
    const district =
      temp1.Invoice["cac:AccountingSupplierParty"]["cac:Party"][
        "cac:PartyLegalEntity"
      ]["cac:RegistrationAddress"]["cbc:District"];
    const cityName =
      temp1.Invoice["cac:AccountingSupplierParty"]["cac:Party"][
        "cac:PartyLegalEntity"
      ]["cac:RegistrationAddress"]["cbc:CityName"];
    const region =
      temp1.Invoice["cac:AccountingSupplierParty"]["cac:Party"][
        "cac:PartyLegalEntity"
      ]["cac:RegistrationAddress"]["cbc:CountrySubentity"];
    //datos de client
    const client =
      temp1.Invoice["cac:AccountingCustomerParty"]["cac:Party"][
        "cac:PartyLegalEntity"
      ]["cbc:RegistrationName"];
    const dni =
      temp1.Invoice["cac:AccountingCustomerParty"]["cac:Party"][
        "cac:PartyIdentification"
      ]["cbc:ID"];
    //datos de venta
    const date = temp1.Invoice["cbc:IssueDate"];
    const time = temp1.Invoice["cbc:IssueTime"];
    const textPriceAmount = temp1.Invoice["cbc:Note"][0];
    const note = temp1.Invoice["cbc:Note"][1];
    const priceAmount =
      temp1.Invoice["cac:InvoiceLine"]["cac:Price"]["cbc:PriceAmount"];
    const itemDescription =
      temp1.Invoice["cac:InvoiceLine"]["cac:Item"]["cbc:Description"];
    const currencyType = temp1.Invoice["cbc:DocumentCurrencyCode"];
    setInvoice({
      providerName,
      ruc,
      operationId,
      providerAddress,
      district,
      cityName,
      region,
      client,
      dni,
      date,
      time,
      textPriceAmount,
      currencyType,
      note,
      priceAmount,
      itemDescription,
    });
  };
  return (
    <>
      <label htmlFor="fileInput">Selecciona tu archivo XML</label>
      <input
        type="file"
        id="fileInput"
        accept=".xml"
        onChange={loadXmlContent}
      />
      <h1>{fileName}</h1>
      <h2>{JSON.stringify(invoice)}</h2>
    </>
  );
};

export default Form;
