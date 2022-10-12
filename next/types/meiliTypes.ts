import {
  Article,
  ArticleNewsCategory,
  ArticlePressCategory,
  Branch,
  Ceremony,
  Debtor,
  Document,
  DocumentCategory,
  UploadFile,
} from '../graphql'

// Meilisearch doesn't nest entities in `data.attributes`, therefore in order to use Strapi types we need to `Omit` those
// attributes that are nested and replace them with their direct representations.

export type ArticleMeili = Omit<
  Article,
  '__typename' | 'newsCategory' | 'pressCategory' | 'coverMedia'
> & {
  newsCategory?: Omit<ArticleNewsCategory, '__typename' | 'articles'>
  pressCategory?: Omit<ArticlePressCategory, '__typename' | 'articles'>
  coverMedia?: UploadFile
}

export type BranchMeili = Omit<Branch, '__typename' | 'localizations'> & {
  id: string
  localizations: BranchMeili[]
}

export type CeremonyMeili = Omit<Ceremony, '__typename' | 'branch'> & {
  branch: BranchMeili
}

export type DebtorMeili = Omit<Debtor, '__typename' | 'branch'> & {
  branch: BranchMeili & {
    localizations: BranchMeili[]
  }
}

export type DocumentMeili = Omit<Document, '__typename' | 'documentCategory' | 'file'> & {
  documentCategory: Omit<DocumentCategory, '__typename' | 'documents'>
  file: Omit<UploadFile, '__typename'>
}
