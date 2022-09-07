import { readFile, utils } from "xlsx";
import { format, parse, isValid } from "date-fns";
import { sk } from "date-fns/locale";
import { getBranchBySlug } from "./get-branch-by-slug";
import removeAccents from "remove-accents";

export const parseCeremoniesXlsx = (
  filePath: string,
  branchesIdMap: Record<string, number>
) => {
  const workBook = readFile(filePath);

  const sheetNames = workBook.Workbook.Sheets.filter(
    ({ Hidden }) => Hidden === 0
  ).map(({ name }) => name);

  sheetNames.forEach((sheetName) => {
    const parsedDate = parse(sheetName, "dd.MM.yyyy", new Date());
    if (!isValid(parsedDate)) {
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

      const parsedDateTime = parse(
        `${sheetName} ${time}`,
        "dd.MM.yyyy H:mm",
        new Date(),
        { locale: sk }
      ); // TODO: timezone
      if (!isValid(parsedDateTime)) {
        throw new Error(
          `Čas na riadku ${
            index + 2
          } "${time}" nie je platný. Čas musí byť v tvare 9:00.`
        );
      }

      const dateTime = parsedDateTime.toISOString();
      const branch = getBranchBySlug(
        branchSlug,
        branchesIdMap,
        `Pobočka na riadku ${
          index + 3
        } v zošite "${sheetName}" s "slug" "${branchSlug}" neexistuje alebo jej hodnota "allowInCeremonies" nie je nastavená na "true".`
      );
      const showOnWeb = showOnWebRaw === "A";
      const nameNormalized = removeAccents(name).toLocaleLowerCase("sk-SK");

      return {
        dateTime,
        name: showOnWeb ? name : undefined,
        nameNormalized: showOnWeb ? nameNormalized : undefined,
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
