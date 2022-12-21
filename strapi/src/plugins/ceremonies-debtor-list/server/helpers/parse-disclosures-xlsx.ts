import { readFile, utils } from "xlsx";
import * as assert from "assert";

export const parseDisclosuresXlsx = (filePath: string, importId: string) => {
  const workBook = readFile(filePath);
  // Only the first sheet is used.
  const sheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
  }) as unknown[][];

  // Verifying the header is the best way to check whether the file uploaded is in a format we need.
  const header = data[0];
  const expectedHeader = [
    "Typ dokumentu",
    "Interné číslo faktúry",
    "Číslo faktúry/variabilný symbol",
    "Číslo objednávky",
    "Číslo zmluvy",
    "Popis fakturovaného plnenia",
    "Dodávateľ: meno + priezvisko/obchodný názov",
    "Dodávateľ: adresa/sídlo",
    "Dodávateľ: IČO",
    "Dátum vyhotovenia objednávky",
    "Celková hodnota objednaného plnenia",
    "Fakturovaná suma",
    "Dátum doručenia faktúry",
    "Za objednávateľa podpísal meno + priezvisko",
  ];
  assert.deepStrictEqual(
    header,
    expectedHeader,
    `Hlavička zošitu sa nezhoduje.\nOčakávaná hlavička: ${JSON.stringify(
      expectedHeader
    )}\nPrijatá hlavička: ${JSON.stringify(header)}`
  );

  const dataWithoutHeader = data.slice(1);
  return dataWithoutHeader
    .filter((row) => row.length !== 0 /* Filter empty rows */)
    .map((row, index) => {
      const [
        type,
        internalInvoiceNumber,
        invoiceNumberOrVariableSymbol,
        orderNumber,
        contractNumber,
        description,
        supplierName,
        supplierAddress,
        supplierRegistrationNumber,
        dateOfOrder,
        totalValue,
        invoicedAmount,
        dateOfDelivery,
        signedBy,
      ] = row.map(String);

      if (!["Zmluva", "Objednávka", "Faktúra"].includes(type)) {
        throw new Error(
          `Typ dokumentu na riadku ${
            index + 2
          } musí byť jeden z "Zmluva", "Objednávka", Faktúra", bol: "${type}".`
        );
      }

      return {
        type,
        internalInvoiceNumber,
        invoiceNumberOrVariableSymbol,
        orderNumber,
        contractNumber,
        description,
        supplierName,
        supplierAddress,
        supplierRegistrationNumber,
        dateOfOrder,
        totalValue,
        invoicedAmount,
        dateOfDelivery,
        signedBy,
        importId,
      };
    });
};
