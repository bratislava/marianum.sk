import { readFile, utils } from "xlsx";
import { getBranchIdBySlug } from "./get-branch-id-by-slug";
import * as assert from "assert";

export const parseDebtorsXlsx = (
  filePath: string,
  branchesSlugIdMap: Record<string, number>
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
    [, "Hrob. miesto", , "Údaje o zomrelom"],
    [
      "p. č.",
      "sekcia",
      "číslo",
      "priezvisko",
      "meno",
      "dátum narodenia",
      "dátum úmrtia",
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
  return dataWithoutHeader.map((row, index) => {
    const [
      ,
      graveSection,
      graveNumber,
      lastName,
      firstName,
      birthDate,
      deathDate,
      branchSlug,
    ] = row.map(String);

    const branchId = getBranchIdBySlug(
      branchSlug,
      branchesSlugIdMap,
      `Pobočka na riadku ${
        index + 3
      } s "slug" "${branchSlug}" neexistuje alebo jej hodnota "allowInDebtors" nie je nastavená na "true".`
    );
    return {
      graveSection,
      graveNumber,
      firstName,
      lastName,
      birthDate,
      deathDate,
      branch: branchId,
    };
  });
};
