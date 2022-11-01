import { readFile, utils } from "xlsx";
import { getCemeteryIdBySlug } from "./get-cemetery-id-by-slug";
import moment from "moment/moment";
import "moment-timezone";
import assert from "assert";

export const parseCeremoniesXlsx = (
  filePath: string,
  cemeteriesSlugIdMap: Record<string, number>
) => {
  const workBook = readFile(filePath);

  const sheetNames = workBook.Workbook.Sheets.filter(
    ({ Hidden }) => Hidden === 0
  ).map(({ name }) => name);

  sheetNames.forEach((sheetName) => {
    const parsedDate = moment.tz(
      sheetName,
      "DD.MM.YYYY",
      true, // Strict mode ensures the date is in correct format.
      "Europe/Bratislava"
    );

    if (!parsedDate.isValid()) {
      throw new Error(
        `Názov zošitu "${sheetName}" neobsahuje platný dátum. Dátum musí byť v tvare 01.01.2022.`
      );
    }
  });

  return sheetNames.map((sheetName) => {
    const sheet = workBook.Sheets[sheetName];

    const data = utils.sheet_to_json(sheet, {
      header: 1,
      raw: false,
    }) as unknown[][];

    // Verifying the header is the best way to check whether the file uploaded is in a format we need.
    const header = data[0];
    const expectedHeader = [
      "Číslo obradu",
      "Deň",
      "Čas",
      "Typ",
      "Meno zosnulého",
      "Rok narodenia",
      "Miesto konania",
      "Pohrebná služba",
      "Obradníka zabezpečuje",
      "Tabuľa",
      "Web",
    ];
    assert.deepStrictEqual(
      header,
      expectedHeader,
      `Hlavička zošitu "${sheetName}" sa nezhoduje.\nOčakávaná hlavička: ${JSON.stringify(
        expectedHeader
      )}\nPrijatá hlavička: ${JSON.stringify(header)}`
    );

    const parsedData = data
      .splice(1)
      .filter((row) => row.length !== 0 /* Filter empty rows */)
      .map((row, index) => {
        const [
          ,
          ,
          time,
          type,
          name,
          birthYear,
          cemeterySlug,
          company,
          officiantProvidedBy,
          ,
          consentForPrivateFieldsRaw,
        ] = row.map(String);

        const parsedDateTime = moment.tz(
          `${sheetName} ${time}`,
          "DD.MM.YYYY H:mm",
          true, // Strict mode ensures the date is in correct format.
          "Europe/Bratislava"
        );

        if (!parsedDateTime.isValid()) {
          throw new Error(
            `Čas na riadku ${
              index + 2
            } "${time}" nie je platný. Čas musí byť v tvare 9:00.`
          );
        }

        const dateTime = parsedDateTime.toISOString();
        const cemeteryId = getCemeteryIdBySlug(
          cemeterySlug,
          cemeteriesSlugIdMap,
          `Cintorín na riadku ${
            index + 3
          } v zošite "${sheetName}" s "slug" "${cemeterySlug}" neexistuje alebo jeho hodnota "allowInCeremonies" nie je nastavená na "true".`
        );
        const consentForPrivateFields = consentForPrivateFieldsRaw === "A";

        return {
          dateTime,
          name: consentForPrivateFields ? name : undefined,
          birthYear: consentForPrivateFields ? birthYear : undefined,
          type: consentForPrivateFields ? type : undefined,
          company,
          officiantProvidedBy,
          cemetery: cemeteryId,
          consentForPrivateFields,
        };
      });

    return { day: sheetName, data: parsedData };
  });
};
