import { readFile, utils } from "xlsx";
import { getBranchBySlug } from "./get-branch-by-slug";
import moment from "moment/moment";
import "moment-timezone";
import assert from "assert";

export const parseCeremoniesXlsx = (
  filePath: string,
  branchesSlugIdMap: Record<string, number>
) => {
  const workBook = readFile(filePath);

  const sheetNames = workBook.Workbook.Sheets.filter(
    ({ Hidden }) => Hidden === 0
  ).map(({ name }) => name);

  sheetNames.forEach((sheetName) => {
    const parsedDate = moment.tz(sheetName, "dd.MM.yyyy", "Europe/Bratislava");

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
      "Čas",
      "Meno zosnulého",
      "R. nar.",
      "Obrad",
      "Pohrebná služba",
      "Obradníka zabezpečuje",
      "tabuľa",
      "WEB",
      "Cintorín",
    ];
    assert.deepStrictEqual(
      header,
      expectedHeader,
      `Hlavička zošitu "${sheetName}" sa nezhoduje.\nOčakávaná hlavička: ${JSON.stringify(
        expectedHeader
      )}\nPrijatá hlavička: ${JSON.stringify(header)}`
    );

    const parsedData = data.splice(1).map((row, index) => {
      const [
        time,
        name,
        birthYear,
        type,
        company,
        officiantProvidedBy,
        ,
        showOnWebRaw,
        branchSlug,
      ] = row.map(String);

      const parsedDateTime = moment.tz(
        `${sheetName} ${time}`,
        "dd.MM.yyyy H:mm",
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
      const branch = getBranchBySlug(
        branchSlug,
        branchesSlugIdMap,
        `Pobočka na riadku ${
          index + 3
        } v zošite "${sheetName}" s "slug" "${branchSlug}" neexistuje alebo jej hodnota "allowInCeremonies" nie je nastavená na "true".`
      );
      const showOnWeb = showOnWebRaw === "A";

      return {
        dateTime,
        name: showOnWeb ? name : undefined,
        birthYear: showOnWeb ? birthYear : undefined,
        type: showOnWeb ? type : undefined,
        company,
        officiantProvidedBy,
        branch,
      };
    });

    return { day: sheetName, data: parsedData };
  });
};
