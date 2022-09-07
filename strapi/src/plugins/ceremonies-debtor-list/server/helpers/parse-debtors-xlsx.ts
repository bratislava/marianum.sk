import { readFile, utils } from "xlsx";
import { getBranchBySlug } from "./get-branch-by-slug";
import removeAccents from "remove-accents";

export const parseDebtorsXlsx = (
  filePath: string,
  branchesIdMap: Record<string, number>
) => {
  const workBook = readFile(filePath);
  const sheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
  }) as unknown[][];

  // TODO: Validate header

  const dataWithoutHeaders = data.slice(2);
  return dataWithoutHeaders.map((row, index) => {
    const [
      ,
      graveSection,
      graveNumber,
      firstName,
      lastName,
      birthDate,
      deathDate,
      branchSlug,
    ] = row.map(String);

    const branch = getBranchBySlug(
      branchSlug,
      branchesIdMap,
      `Pobočka na riadku ${
        index + 3
      } s "slug" "${branchSlug}" neexistuje alebo jej hodnota "allowInDebtors" nie je nastavená na "true".`
    );
    const nameNormalized = removeAccents(
      [firstName, lastName].join(" ")
    ).toLocaleLowerCase("sk-SK");

    return {
      graveSection,
      graveNumber,
      firstName,
      lastName,
      nameNormalized,
      birthDate,
      deathDate,
      branch,
    };
  });
};
