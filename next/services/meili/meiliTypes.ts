import {
  Article,
  ArticleNewsCategory,
  ArticlePressCategory,
  Cemetery,
  Ceremony,
  Debtor,
  Disclosure,
  Document,
  DocumentCategory,
  UploadFile,
} from '@graphql'

// Meilisearch doesn't nest entities in `data.attributes`, therefore in order to use Strapi types we need to `Omit` those
// attributes that are nested and replace them with their direct representations.

export type ArticleMeili = Omit<
  Article,
  '__typename' | 'newsCategory' | 'pressCategory' | 'coverMedia'
> & {
  id: string
  newsCategory?: Omit<ArticleNewsCategory, '__typename' | 'articles'>
  pressCategory?: Omit<ArticlePressCategory, '__typename' | 'articles'>
  coverMedia?: UploadFile
}

export type CemeteryMeili = Omit<Cemetery, '__typename' | 'localizations'> & {
  id: string
  localizations: CemeteryMeili[]
}

export type CeremonyMeili = Omit<Ceremony, '__typename' | 'cemetery'> & {
  id: string
  cemetery: CemeteryMeili
}

export type DebtorMeili = Omit<Debtor, '__typename' | 'cemetery'> & {
  id: string
  cemetery: CemeteryMeili & {
    localizations: CemeteryMeili[]
  }
}

export type DocumentMeili = Omit<Document, '__typename' | 'documentCategory' | 'file'> & {
  id: string
  documentCategory: Omit<DocumentCategory, '__typename' | 'documents'>
  file: Omit<UploadFile, '__typename'>
}

export type DisclosureMeili = Omit<Disclosure, '__typename' | 'files'> & {
  id: string
  files: Omit<UploadFile, '__typename'>[]
}
