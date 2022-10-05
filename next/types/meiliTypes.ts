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

export type ArticleMeili = Omit<Article, '__typename' | 'newsCategory' | 'pressCategory'> & {
  newsCategory?: Omit<ArticleNewsCategory, '__typename' | 'articles'>
  pressCategory?: Omit<ArticlePressCategory, '__typename' | 'articles'>
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
