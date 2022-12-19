import { readFile, utils } from "xlsx";
import { getCemeteryIdBySlug } from "./get-cemetery-id-by-slug";
import * as assert from "assert";

export const parseDebtorsXlsx = (
  filePath: string,
  cemeteriesSlugIdMap: Record<string, number>,
  importId: string
) => {
  const workBook = readFile(filePath);
  // Only the first sheet is used.
  const sheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
  }) as unknown[][];

  // Verifying the header is the best way to check whether the file uploaded is in a format we need.
  const header = data.slice(0, 2);
  const expectedHeader = [
    ["Hrobové miesto", , , , "Údaje o zosnulom"],
    [
      "Cintorín",
      "Sektor",
      "Číslo",
      "Predošlé číslo",
      "Priezvisko",
      "Meno",
      "Dátum narodenia",
      "Dátum úmrtia",
    ],
  ];
  assert.deepStrictEqual(
    header,
    expectedHeader,
    `Hlavička zošitu sa nezhoduje.\nOčakávaná hlavička: ${JSON.stringify(
      expectedHeader
    )}\nPrijatá hlavička: ${JSON.stringify(header)}`
  );

  const dataWithoutHeader = data.slice(2);
  return dataWithoutHeader
    .filter((row) => row.length !== 0 /* Filter empty rows */)
    .map((row, index) => {
      const [
        cemeterySlug,
        graveSector,
        graveNumber,
        gravePreviousNumber,
        lastName,
        firstName,
        birthDate,
        deathDate,
      ] = row.map(String);

      const cemeteryId = getCemeteryIdBySlug(
        cemeterySlug,
        cemeteriesSlugIdMap,
        `Cintorín na riadku ${
          index + 3
        } s "slug" "${cemeterySlug}" neexistuje alebo jeho hodnota "allowInDebtors" nie je nastavená na "true".`
      );
      return {
        graveSector,
        graveNumber,
        gravePreviousNumber,
        firstName,
        lastName,
        birthDate,
        deathDate,
        cemetery: cemeteryId,
        importId,
      };
    });
};
