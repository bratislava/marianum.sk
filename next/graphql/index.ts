import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  HomePageSectionsDynamicZoneInput: { input: any; output: any; }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any; }
  PageSectionsDynamicZoneInput: { input: any; output: any; }
  /** A time string with format HH:mm:ss.SSS */
  Time: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Scalars['String']['output']>;
  coverMedia?: Maybe<UploadFile>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  jobsCategory?: Maybe<ArticleJobsCategory>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Article>>;
  localizations_connection?: Maybe<ArticleRelationResponseCollection>;
  mediaGallery: Array<Maybe<UploadFile>>;
  mediaGallery_connection?: Maybe<UploadFileRelationResponseCollection>;
  newsCategory?: Maybe<ArticleNewsCategory>;
  perex?: Maybe<Scalars['String']['output']>;
  pressCategory?: Maybe<ArticlePressCategory>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ArticleLocalizationsArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ArticleLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ArticleMediaGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ArticleMediaGallery_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleEntity = {
  __typename?: 'ArticleEntity';
  attributes?: Maybe<Article>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ArticleEntityResponse = {
  __typename?: 'ArticleEntityResponse';
  data?: Maybe<Article>;
};

export type ArticleEntityResponseCollection = {
  __typename?: 'ArticleEntityResponseCollection';
  nodes: Array<Article>;
  pageInfo: Pagination;
};

export type ArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  jobsCategory?: InputMaybe<ArticleJobsCategoryFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ArticleFiltersInput>;
  newsCategory?: InputMaybe<ArticleNewsCategoryFiltersInput>;
  not?: InputMaybe<ArticleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  perex?: InputMaybe<StringFilterInput>;
  pressCategory?: InputMaybe<ArticlePressCategoryFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  coverMedia?: InputMaybe<Scalars['ID']['input']>;
  jobsCategory?: InputMaybe<Scalars['ID']['input']>;
  mediaGallery?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  newsCategory?: InputMaybe<Scalars['ID']['input']>;
  perex?: InputMaybe<Scalars['String']['input']>;
  pressCategory?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArticleJobsCategory = {
  __typename?: 'ArticleJobsCategory';
  articles: Array<Maybe<Article>>;
  articles_connection?: Maybe<ArticleRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ArticleJobsCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ArticleJobsCategoryArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleJobsCategoryEntity = {
  __typename?: 'ArticleJobsCategoryEntity';
  attributes?: Maybe<ArticleJobsCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ArticleJobsCategoryEntityResponse = {
  __typename?: 'ArticleJobsCategoryEntityResponse';
  data?: Maybe<ArticleJobsCategory>;
};

export type ArticleJobsCategoryEntityResponseCollection = {
  __typename?: 'ArticleJobsCategoryEntityResponseCollection';
  nodes: Array<ArticleJobsCategory>;
  pageInfo: Pagination;
};

export type ArticleJobsCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleJobsCategoryFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticleJobsCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleJobsCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleJobsCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArticleJobsCategoryRelationResponseCollection = {
  __typename?: 'ArticleJobsCategoryRelationResponseCollection';
  nodes: Array<ArticleJobsCategory>;
};

export type ArticleNewsCategory = {
  __typename?: 'ArticleNewsCategory';
  articles: Array<Maybe<Article>>;
  articles_connection?: Maybe<ArticleRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ArticleNewsCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ArticleNewsCategoryArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleNewsCategoryEntity = {
  __typename?: 'ArticleNewsCategoryEntity';
  attributes?: Maybe<ArticleNewsCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ArticleNewsCategoryEntityResponse = {
  __typename?: 'ArticleNewsCategoryEntityResponse';
  data?: Maybe<ArticleNewsCategory>;
};

export type ArticleNewsCategoryEntityResponseCollection = {
  __typename?: 'ArticleNewsCategoryEntityResponseCollection';
  nodes: Array<ArticleNewsCategory>;
  pageInfo: Pagination;
};

export type ArticleNewsCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleNewsCategoryFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticleNewsCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleNewsCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleNewsCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArticleNewsCategoryRelationResponseCollection = {
  __typename?: 'ArticleNewsCategoryRelationResponseCollection';
  nodes: Array<ArticleNewsCategory>;
};

export type ArticlePressCategory = {
  __typename?: 'ArticlePressCategory';
  articles: Array<Maybe<Article>>;
  articles_connection?: Maybe<ArticleRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ArticlePressCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ArticlePressCategoryArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticlePressCategoryEntity = {
  __typename?: 'ArticlePressCategoryEntity';
  attributes?: Maybe<ArticlePressCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ArticlePressCategoryEntityResponse = {
  __typename?: 'ArticlePressCategoryEntityResponse';
  data?: Maybe<ArticlePressCategory>;
};

export type ArticlePressCategoryEntityResponseCollection = {
  __typename?: 'ArticlePressCategoryEntityResponseCollection';
  nodes: Array<ArticlePressCategory>;
  pageInfo: Pagination;
};

export type ArticlePressCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticlePressCategoryFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticlePressCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticlePressCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticlePressCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArticlePressCategoryRelationResponseCollection = {
  __typename?: 'ArticlePressCategoryRelationResponseCollection';
  nodes: Array<ArticlePressCategory>;
};

export type ArticleRelationResponseCollection = {
  __typename?: 'ArticleRelationResponseCollection';
  nodes: Array<Article>;
};

export type Asset = {
  __typename?: 'Asset';
  assetCategory?: Maybe<AssetCategory>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  file: UploadFile;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AssetCategory = {
  __typename?: 'AssetCategory';
  assets: Array<Maybe<Asset>>;
  assets_connection?: Maybe<AssetRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type AssetCategoryAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type AssetCategoryAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AssetCategoryEntity = {
  __typename?: 'AssetCategoryEntity';
  attributes?: Maybe<AssetCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type AssetCategoryEntityResponse = {
  __typename?: 'AssetCategoryEntityResponse';
  data?: Maybe<AssetCategory>;
};

export type AssetCategoryEntityResponseCollection = {
  __typename?: 'AssetCategoryEntityResponseCollection';
  nodes: Array<AssetCategory>;
  pageInfo: Pagination;
};

export type AssetCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AssetCategoryFiltersInput>>>;
  assets?: InputMaybe<AssetFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AssetCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AssetCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AssetCategoryInput = {
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCategoryRelationResponseCollection = {
  __typename?: 'AssetCategoryRelationResponseCollection';
  nodes: Array<AssetCategory>;
};

export type AssetEntity = {
  __typename?: 'AssetEntity';
  attributes?: Maybe<Asset>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type AssetEntityResponse = {
  __typename?: 'AssetEntityResponse';
  data?: Maybe<Asset>;
};

export type AssetEntityResponseCollection = {
  __typename?: 'AssetEntityResponseCollection';
  nodes: Array<Asset>;
  pageInfo: Pagination;
};

export type AssetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AssetFiltersInput>>>;
  assetCategory?: InputMaybe<AssetCategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AssetFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AssetFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AssetInput = {
  assetCategory?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AssetRelationResponseCollection = {
  __typename?: 'AssetRelationResponseCollection';
  nodes: Array<Asset>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Branch = {
  __typename?: 'Branch';
  address?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Contact>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Branch>>;
  localizations_connection?: Maybe<BranchRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']['output']>;
  medias: Array<Maybe<UploadFile>>;
  medias_connection?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']['output']>;
  offices: Array<Maybe<Office>>;
  offices_connection?: Maybe<OfficeRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type BranchLocalizationsArgs = {
  filters?: InputMaybe<BranchFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BranchLocalizations_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BranchMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BranchMedias_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BranchOfficesArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BranchOffices_ConnectionArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BranchEntity = {
  __typename?: 'BranchEntity';
  attributes?: Maybe<Branch>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type BranchEntityResponse = {
  __typename?: 'BranchEntityResponse';
  data?: Maybe<Branch>;
};

export type BranchEntityResponseCollection = {
  __typename?: 'BranchEntityResponseCollection';
  nodes: Array<Branch>;
  pageInfo: Pagination;
};

export type BranchFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BranchFiltersInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<BranchFiltersInput>;
  offices?: InputMaybe<OfficeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BranchInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  navigateToLink?: InputMaybe<Scalars['String']['input']>;
  offices?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BranchRelationResponseCollection = {
  __typename?: 'BranchRelationResponseCollection';
  nodes: Array<Branch>;
};

export type Bundle = {
  __typename?: 'Bundle';
  additionalItems?: Maybe<Array<Maybe<ComponentBlocksBundleContentItem>>>;
  additionalServices?: Maybe<Array<Maybe<ComponentBlocksAccordionItemWithPrice>>>;
  assets?: Maybe<ComponentSectionsAssetGroup>;
  bundleItems?: Maybe<Array<Maybe<ComponentBlocksBundleContentItem>>>;
  coverMedia?: Maybe<UploadFile>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountText?: Maybe<Scalars['String']['output']>;
  discountTextShort?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Bundle>>;
  localizations_connection?: Maybe<BundleRelationResponseCollection>;
  perex?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  seo?: Maybe<ComponentGeneralSeo>;
  sidebar?: Maybe<ComponentBlocksSidebar>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Enum_Bundle_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type BundleAdditionalItemsArgs = {
  filters?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BundleAdditionalServicesArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BundleBundleItemsArgs = {
  filters?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BundleLocalizationsArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BundleLocalizations_ConnectionArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BundleEntity = {
  __typename?: 'BundleEntity';
  attributes?: Maybe<Bundle>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type BundleEntityResponse = {
  __typename?: 'BundleEntityResponse';
  data?: Maybe<Bundle>;
};

export type BundleEntityResponseCollection = {
  __typename?: 'BundleEntityResponseCollection';
  nodes: Array<Bundle>;
  pageInfo: Pagination;
};

export type BundleFiltersInput = {
  additionalItems?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  additionalServices?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<BundleFiltersInput>>>;
  assets?: InputMaybe<ComponentSectionsAssetGroupFiltersInput>;
  bundleItems?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  discountText?: InputMaybe<StringFilterInput>;
  discountTextShort?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BundleFiltersInput>;
  not?: InputMaybe<BundleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BundleFiltersInput>>>;
  perex?: InputMaybe<StringFilterInput>;
  price?: InputMaybe<FloatFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BundleInput = {
  additionalItems?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemInput>>>;
  additionalServices?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemWithPriceInput>>>;
  assets?: InputMaybe<ComponentSectionsAssetGroupInput>;
  bundleItems?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemInput>>>;
  coverMedia?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountText?: InputMaybe<Scalars['String']['input']>;
  discountTextShort?: InputMaybe<Scalars['String']['input']>;
  perex?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Enum_Bundle_Type>;
};

export type BundleRelationResponseCollection = {
  __typename?: 'BundleRelationResponseCollection';
  nodes: Array<Bundle>;
};

export type Cemetery = {
  __typename?: 'Cemetery';
  address?: Maybe<Scalars['String']['output']>;
  allowInCeremonies: Scalars['Boolean']['output'];
  allowInDebtors: Scalars['Boolean']['output'];
  assets?: Maybe<ComponentSectionsAssetGroup>;
  cemeteryCategory?: Maybe<CemeteryCategory>;
  contact?: Maybe<Contact>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  gallery?: Maybe<ComponentSectionsGallery>;
  latitude?: Maybe<Scalars['Float']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Cemetery>>;
  localizations_connection?: Maybe<CemeteryRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']['output']>;
  medias: Array<Maybe<UploadFile>>;
  medias_connection?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']['output']>;
  overrideOpeningHours?: Maybe<ComponentBlocksOpeningHoursUniversal>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  video?: Maybe<ComponentSectionsIframeSection>;
};


export type CemeteryLocalizationsArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CemeteryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CemeteryMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CemeteryMedias_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CemeteryCategory = {
  __typename?: 'CemeteryCategory';
  cemeteries: Array<Maybe<Cemetery>>;
  cemeteries_connection?: Maybe<CemeteryRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CemeteryCategoryCemeteriesArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CemeteryCategoryCemeteries_ConnectionArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CemeteryCategoryEntity = {
  __typename?: 'CemeteryCategoryEntity';
  attributes?: Maybe<CemeteryCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CemeteryCategoryEntityResponse = {
  __typename?: 'CemeteryCategoryEntityResponse';
  data?: Maybe<CemeteryCategory>;
};

export type CemeteryCategoryEntityResponseCollection = {
  __typename?: 'CemeteryCategoryEntityResponseCollection';
  nodes: Array<CemeteryCategory>;
  pageInfo: Pagination;
};

export type CemeteryCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CemeteryCategoryFiltersInput>>>;
  cemeteries?: InputMaybe<CemeteryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CemeteryCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CemeteryCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CemeteryCategoryInput = {
  cemeteries?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CemeteryCategoryRelationResponseCollection = {
  __typename?: 'CemeteryCategoryRelationResponseCollection';
  nodes: Array<CemeteryCategory>;
};

export type CemeteryEntity = {
  __typename?: 'CemeteryEntity';
  attributes?: Maybe<Cemetery>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CemeteryEntityResponse = {
  __typename?: 'CemeteryEntityResponse';
  data?: Maybe<Cemetery>;
};

export type CemeteryEntityResponseCollection = {
  __typename?: 'CemeteryEntityResponseCollection';
  nodes: Array<Cemetery>;
  pageInfo: Pagination;
};

export type CemeteryFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  allowInCeremonies?: InputMaybe<BooleanFilterInput>;
  allowInDebtors?: InputMaybe<BooleanFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CemeteryFiltersInput>>>;
  assets?: InputMaybe<ComponentSectionsAssetGroupFiltersInput>;
  cemeteryCategory?: InputMaybe<CemeteryCategoryFiltersInput>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  gallery?: InputMaybe<ComponentSectionsGalleryFiltersInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CemeteryFiltersInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CemeteryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CemeteryFiltersInput>>>;
  overrideOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  video?: InputMaybe<ComponentSectionsIframeSectionFiltersInput>;
};

export type CemeteryInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  allowInCeremonies?: InputMaybe<Scalars['Boolean']['input']>;
  allowInDebtors?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<ComponentSectionsAssetGroupInput>;
  cemeteryCategory?: InputMaybe<Scalars['ID']['input']>;
  contact?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gallery?: InputMaybe<ComponentSectionsGalleryInput>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  navigateToLink?: InputMaybe<Scalars['String']['input']>;
  overrideOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<ComponentSectionsIframeSectionInput>;
};

export type CemeteryRelationResponseCollection = {
  __typename?: 'CemeteryRelationResponseCollection';
  nodes: Array<Cemetery>;
};

export type Ceremony = {
  __typename?: 'Ceremony';
  birthYear?: Maybe<Scalars['String']['output']>;
  cemetery?: Maybe<Cemetery>;
  cemeteryNameIfOutsideMarianum?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  consentForPrivateFields?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateTime: Scalars['DateTime']['output'];
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  officiantProvidedBy?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CeremonyEntity = {
  __typename?: 'CeremonyEntity';
  attributes?: Maybe<Ceremony>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CeremonyEntityResponse = {
  __typename?: 'CeremonyEntityResponse';
  data?: Maybe<Ceremony>;
};

export type CeremonyEntityResponseCollection = {
  __typename?: 'CeremonyEntityResponseCollection';
  nodes: Array<Ceremony>;
  pageInfo: Pagination;
};

export type CeremonyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CeremonyFiltersInput>>>;
  birthYear?: InputMaybe<StringFilterInput>;
  cemetery?: InputMaybe<CemeteryFiltersInput>;
  cemeteryNameIfOutsideMarianum?: InputMaybe<StringFilterInput>;
  company?: InputMaybe<StringFilterInput>;
  consentForPrivateFields?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateTime?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CeremonyFiltersInput>;
  officiantProvidedBy?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<CeremonyFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CeremonyInput = {
  birthYear?: InputMaybe<Scalars['String']['input']>;
  cemetery?: InputMaybe<Scalars['ID']['input']>;
  cemeteryNameIfOutsideMarianum?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  consentForPrivateFields?: InputMaybe<Scalars['Boolean']['input']>;
  dateTime?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  officiantProvidedBy?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CeremonyRelationResponseCollection = {
  __typename?: 'CeremonyRelationResponseCollection';
  nodes: Array<Ceremony>;
};

export type ComponentBlocksAccordionItem = {
  __typename?: 'ComponentBlocksAccordionItem';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentBlocksAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksAccordionItemInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksAccordionItemWithPrice = {
  __typename?: 'ComponentBlocksAccordionItemWithPrice';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
};

export type ComponentBlocksAccordionItemWithPriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksAccordionItemWithPriceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksArticleItem = {
  __typename?: 'ComponentBlocksArticleItem';
  article?: Maybe<Article>;
  id: Scalars['ID']['output'];
};

export type ComponentBlocksArticleItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksArticleItemFiltersInput>>>;
  article?: InputMaybe<ArticleFiltersInput>;
  not?: InputMaybe<ComponentBlocksArticleItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksArticleItemFiltersInput>>>;
};

export type ComponentBlocksArticleItemInput = {
  article?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksAssetItem = {
  __typename?: 'ComponentBlocksAssetItem';
  asset?: Maybe<Asset>;
  id: Scalars['ID']['output'];
};

export type ComponentBlocksAssetItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAssetItemFiltersInput>>>;
  asset?: InputMaybe<AssetFiltersInput>;
  not?: InputMaybe<ComponentBlocksAssetItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAssetItemFiltersInput>>>;
};

export type ComponentBlocksAssetItemInput = {
  asset?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksBlocksCeremonyArchiveBlock = {
  __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock';
  button?: Maybe<ComponentBlocksButtonLink>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentBlocksBlocksCeremonyArchiveBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBlocksCeremonyArchiveBlockFiltersInput>>>;
  button?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  not?: InputMaybe<ComponentBlocksBlocksCeremonyArchiveBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBlocksCeremonyArchiveBlockFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksBlocksCeremonyArchiveBlockInput = {
  button?: InputMaybe<ComponentBlocksButtonLinkInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksBranchItem = {
  __typename?: 'ComponentBlocksBranchItem';
  branch?: Maybe<Branch>;
  id: Scalars['ID']['output'];
};

export type ComponentBlocksBranchItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>;
  branch?: InputMaybe<BranchFiltersInput>;
  not?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>;
};

export type ComponentBlocksBranchItemInput = {
  branch?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksBundleContentItem = {
  __typename?: 'ComponentBlocksBundleContentItem';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ComponentBlocksBundleContentItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemFiltersInput>>>;
};

export type ComponentBlocksBundleContentItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksBundleGroup = {
  __typename?: 'ComponentBlocksBundleGroup';
  bundles?: Maybe<Array<Maybe<ComponentBlocksBundleItem>>>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};


export type ComponentBlocksBundleGroupBundlesArgs = {
  filters?: InputMaybe<ComponentBlocksBundleItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentBlocksBundleGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleGroupFiltersInput>>>;
  bundles?: InputMaybe<ComponentBlocksBundleItemFiltersInput>;
  not?: InputMaybe<ComponentBlocksBundleGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleGroupFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksBundleGroupInput = {
  bundles?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksBundleItem = {
  __typename?: 'ComponentBlocksBundleItem';
  bundle?: Maybe<Bundle>;
  id: Scalars['ID']['output'];
};

export type ComponentBlocksBundleItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleItemFiltersInput>>>;
  bundle?: InputMaybe<BundleFiltersInput>;
  not?: InputMaybe<ComponentBlocksBundleItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleItemFiltersInput>>>;
};

export type ComponentBlocksBundleItemInput = {
  bundle?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksButtonLink = {
  __typename?: 'ComponentBlocksButtonLink';
  article?: Maybe<Article>;
  asset?: Maybe<Asset>;
  branch?: Maybe<Branch>;
  bundle?: Maybe<Bundle>;
  cemetery?: Maybe<Cemetery>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  managedObject?: Maybe<ManagedObject>;
  page?: Maybe<Page>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ComponentBlocksButtonLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkFiltersInput>>>;
  article?: InputMaybe<ArticleFiltersInput>;
  asset?: InputMaybe<AssetFiltersInput>;
  branch?: InputMaybe<BranchFiltersInput>;
  bundle?: InputMaybe<BundleFiltersInput>;
  cemetery?: InputMaybe<CemeteryFiltersInput>;
  label?: InputMaybe<StringFilterInput>;
  managedObject?: InputMaybe<ManagedObjectFiltersInput>;
  not?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksButtonLinkInput = {
  article?: InputMaybe<Scalars['ID']['input']>;
  asset?: InputMaybe<Scalars['ID']['input']>;
  branch?: InputMaybe<Scalars['ID']['input']>;
  bundle?: InputMaybe<Scalars['ID']['input']>;
  cemetery?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  managedObject?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksContactItem = {
  __typename?: 'ComponentBlocksContactItem';
  contact?: Maybe<Contact>;
  id: Scalars['ID']['output'];
};

export type ComponentBlocksContactItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksContactItemFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  not?: InputMaybe<ComponentBlocksContactItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksContactItemFiltersInput>>>;
};

export type ComponentBlocksContactItemInput = {
  contact?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksCta = {
  __typename?: 'ComponentBlocksCta';
  button?: Maybe<ComponentBlocksButtonLink>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<UploadFile>;
  title: Scalars['String']['output'];
};

export type ComponentBlocksCtaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksCtaFiltersInput>>>;
  button?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksCtaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksCtaFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksCtaInput = {
  button?: InputMaybe<ComponentBlocksButtonLinkInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksOfficeItem = {
  __typename?: 'ComponentBlocksOfficeItem';
  id: Scalars['ID']['output'];
  office?: Maybe<Office>;
};

export type ComponentBlocksOfficeItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOfficeItemFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksOfficeItemFiltersInput>;
  office?: InputMaybe<OfficeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOfficeItemFiltersInput>>>;
};

export type ComponentBlocksOfficeItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  office?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksOpeningHoursItem = {
  __typename?: 'ComponentBlocksOpeningHoursItem';
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

export type ComponentBlocksOpeningHoursItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>;
  time?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksOpeningHoursItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksOpeningHoursUniversal = {
  __typename?: 'ComponentBlocksOpeningHoursUniversal';
  days?: Maybe<Array<Maybe<ComponentBlocksOpeningHoursItem>>>;
  id: Scalars['ID']['output'];
};


export type ComponentBlocksOpeningHoursUniversalDaysArgs = {
  filters?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentBlocksOpeningHoursUniversalFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>>>;
  days?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>;
  not?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>>>;
};

export type ComponentBlocksOpeningHoursUniversalInput = {
  days?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksPageItem = {
  __typename?: 'ComponentBlocksPageItem';
  id: Scalars['ID']['output'];
  page?: Maybe<Page>;
};

export type ComponentBlocksPageItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageItemFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksPageItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageItemFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
};

export type ComponentBlocksPageItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentBlocksPriceListItem = {
  __typename?: 'ComponentBlocksPriceListItem';
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type ComponentBlocksPriceListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPriceListItemFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksPriceListItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPriceListItemFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
};

export type ComponentBlocksPriceListItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type ComponentBlocksSidebar = {
  __typename?: 'ComponentBlocksSidebar';
  contact?: Maybe<Contact>;
  ctaButton?: Maybe<ComponentBlocksButtonLink>;
  id: Scalars['ID']['output'];
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentBlocksSidebarFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSidebarFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  not?: InputMaybe<ComponentBlocksSidebarFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSidebarFiltersInput>>>;
  text?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksSidebarInput = {
  contact?: InputMaybe<Scalars['ID']['input']>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksSimpleCtaItem = {
  __typename?: 'ComponentBlocksSimpleCtaItem';
  button?: Maybe<ComponentBlocksButtonLink>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ComponentBlocksSimpleCtaItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>>>;
  button?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksSimpleCtaItemInput = {
  button?: InputMaybe<ComponentBlocksButtonLinkInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentBlocksSocialItem = {
  __typename?: 'ComponentBlocksSocialItem';
  icon?: Maybe<Enum_Componentblockssocialitem_Icon>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ComponentBlocksSocialItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSocialItemFiltersInput>>>;
  icon?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksSocialItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSocialItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksSocialItemInput = {
  icon?: InputMaybe<Enum_Componentblockssocialitem_Icon>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralContacts = {
  __typename?: 'ComponentGeneralContacts';
  address?: Maybe<Scalars['String']['output']>;
  addressFirstLine?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Contact>;
  contactsPage?: Maybe<Page>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  navigateToLink?: Maybe<Scalars['String']['output']>;
  openingHoursPage?: Maybe<Page>;
};

export type ComponentGeneralContactsFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  addressFirstLine?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralContactsFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  contactsPage?: InputMaybe<PageFiltersInput>;
  latitude?: InputMaybe<StringFilterInput>;
  longitude?: InputMaybe<StringFilterInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralContactsFiltersInput>;
  openingHoursPage?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralContactsFiltersInput>>>;
};

export type ComponentGeneralContactsInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressFirstLine?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['ID']['input']>;
  contactsPage?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  navigateToLink?: InputMaybe<Scalars['String']['input']>;
  openingHoursPage?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentGeneralFooter = {
  __typename?: 'ComponentGeneralFooter';
  bottomLinks?: Maybe<Array<Maybe<ComponentBlocksButtonLink>>>;
  id: Scalars['ID']['output'];
  links1?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  links2?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  links3?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  links4?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  title1?: Maybe<Scalars['String']['output']>;
  title2?: Maybe<Scalars['String']['output']>;
  title3?: Maybe<Scalars['String']['output']>;
  title4?: Maybe<Scalars['String']['output']>;
};


export type ComponentGeneralFooterBottomLinksArgs = {
  filters?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentGeneralFooterLinks1Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentGeneralFooterLinks2Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentGeneralFooterLinks3Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentGeneralFooterLinks4Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentGeneralFooterFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralFooterFiltersInput>>>;
  bottomLinks?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  links1?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  links2?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  links3?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  links4?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  not?: InputMaybe<ComponentGeneralFooterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralFooterFiltersInput>>>;
  title1?: InputMaybe<StringFilterInput>;
  title2?: InputMaybe<StringFilterInput>;
  title3?: InputMaybe<StringFilterInput>;
  title4?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralFooterInput = {
  bottomLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  links1?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  links2?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  links3?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  links4?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  title1?: InputMaybe<Scalars['String']['input']>;
  title2?: InputMaybe<Scalars['String']['input']>;
  title3?: InputMaybe<Scalars['String']['input']>;
  title4?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralHeader = {
  __typename?: 'ComponentGeneralHeader';
  contact?: Maybe<Contact>;
  faqPage?: Maybe<Page>;
  id: Scalars['ID']['output'];
};

export type ComponentGeneralHeaderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  faqPage?: InputMaybe<PageFiltersInput>;
  not?: InputMaybe<ComponentGeneralHeaderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderFiltersInput>>>;
};

export type ComponentGeneralHeaderInput = {
  contact?: InputMaybe<Scalars['ID']['input']>;
  faqPage?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentGeneralLinkItem = {
  __typename?: 'ComponentGeneralLinkItem';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  page?: Maybe<Page>;
  targetBlank: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type ComponentGeneralLinkItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  targetBlank?: InputMaybe<BooleanFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralLinkItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['ID']['input']>;
  targetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralProcedure = {
  __typename?: 'ComponentGeneralProcedure';
  downloadFile?: Maybe<UploadFile>;
  id: Scalars['ID']['output'];
  steps?: Maybe<Array<Maybe<ComponentGeneralProcedureItem>>>;
  title: Scalars['String']['output'];
};


export type ComponentGeneralProcedureStepsArgs = {
  filters?: InputMaybe<ComponentGeneralProcedureItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentGeneralProcedureFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureFiltersInput>>>;
  not?: InputMaybe<ComponentGeneralProcedureFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureFiltersInput>>>;
  steps?: InputMaybe<ComponentGeneralProcedureItemFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralProcedureInput = {
  downloadFile?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  steps?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureItemInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralProcedureItem = {
  __typename?: 'ComponentGeneralProcedureItem';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ComponentGeneralProcedureItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralProcedureItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralProcedureItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralSeo = {
  __typename?: 'ComponentGeneralSeo';
  id: Scalars['ID']['output'];
  keywords?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
};

export type ComponentGeneralSeoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralSeoFiltersInput>>>;
  keywords?: InputMaybe<StringFilterInput>;
  metaDescription?: InputMaybe<StringFilterInput>;
  metaTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralSeoFiltersInput>>>;
};

export type ComponentGeneralSeoInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralSocial = {
  __typename?: 'ComponentGeneralSocial';
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type ComponentGeneralSocialFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralSocialFiltersInput>>>;
  facebook?: InputMaybe<StringFilterInput>;
  instagram?: InputMaybe<StringFilterInput>;
  linkedin?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralSocialFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralSocialFiltersInput>>>;
  twitter?: InputMaybe<StringFilterInput>;
  youtube?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralSocialInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsAccordionGroup = {
  __typename?: 'ComponentSectionsAccordionGroup';
  accordions?: Maybe<Array<Maybe<ComponentBlocksAccordionItem>>>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsAccordionGroupAccordionsArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsAccordionGroupFiltersInput = {
  accordions?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAccordionGroupFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsAccordionGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAccordionGroupFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsAccordionGroupInput = {
  accordions?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsArticleJobsListing = {
  __typename?: 'ComponentSectionsArticleJobsListing';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsArticleJobsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsArticleJobsListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsArticleJobsListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsArticleJobsListingFiltersInput>>>;
};

export type ComponentSectionsArticleJobsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsArticleNewsListing = {
  __typename?: 'ComponentSectionsArticleNewsListing';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsArticleNewsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsArticleNewsListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsArticleNewsListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsArticleNewsListingFiltersInput>>>;
};

export type ComponentSectionsArticleNewsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsArticlePressListing = {
  __typename?: 'ComponentSectionsArticlePressListing';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsArticlePressListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlePressListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsArticlePressListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlePressListingFiltersInput>>>;
};

export type ComponentSectionsArticlePressListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsArticlesManualListing = {
  __typename?: 'ComponentSectionsArticlesManualListing';
  articles?: Maybe<Array<Maybe<ComponentBlocksArticleItem>>>;
  id: Scalars['ID']['output'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsArticlesManualListingArticlesArgs = {
  filters?: InputMaybe<ComponentBlocksArticleItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsArticlesManualListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlesManualListingFiltersInput>>>;
  articles?: InputMaybe<ComponentBlocksArticleItemFiltersInput>;
  not?: InputMaybe<ComponentSectionsArticlesManualListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlesManualListingFiltersInput>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsArticlesManualListingInput = {
  articles?: InputMaybe<Array<InputMaybe<ComponentBlocksArticleItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsAssetGroup = {
  __typename?: 'ComponentSectionsAssetGroup';
  assets?: Maybe<Array<Maybe<ComponentBlocksAssetItem>>>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsAssetGroupAssetsArgs = {
  filters?: InputMaybe<ComponentBlocksAssetItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsAssetGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetGroupFiltersInput>>>;
  assets?: InputMaybe<ComponentBlocksAssetItemFiltersInput>;
  not?: InputMaybe<ComponentSectionsAssetGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetGroupFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsAssetGroupInput = {
  assets?: InputMaybe<Array<InputMaybe<ComponentBlocksAssetItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsAssetsSection = {
  __typename?: 'ComponentSectionsAssetsSection';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsAssetsSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsAssetsSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsSectionFiltersInput>>>;
};

export type ComponentSectionsAssetsSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsBranchGroup = {
  __typename?: 'ComponentSectionsBranchGroup';
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItem>>>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsBranchGroupBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsBranchGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsBranchGroupFiltersInput>>>;
  branches?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  not?: InputMaybe<ComponentSectionsBranchGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsBranchGroupFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsBranchGroupInput = {
  branches?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsBundleListing = {
  __typename?: 'ComponentSectionsBundleListing';
  atMedicalFacility?: Maybe<ComponentBlocksBundleGroup>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  outsideMedicalFacility?: Maybe<ComponentBlocksBundleGroup>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsBundleListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsBundleListingFiltersInput>>>;
  atMedicalFacility?: InputMaybe<ComponentBlocksBundleGroupFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsBundleListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsBundleListingFiltersInput>>>;
  outsideMedicalFacility?: InputMaybe<ComponentBlocksBundleGroupFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsBundleListingInput = {
  atMedicalFacility?: InputMaybe<ComponentBlocksBundleGroupInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  outsideMedicalFacility?: InputMaybe<ComponentBlocksBundleGroupInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsBundleListingSimple = {
  __typename?: 'ComponentSectionsBundleListingSimple';
  bundles: Array<Maybe<Bundle>>;
  bundles_connection?: Maybe<BundleRelationResponseCollection>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsBundleListingSimpleBundlesArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentSectionsBundleListingSimpleBundles_ConnectionArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsBundleListingSimpleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsBundleListingSimpleFiltersInput>>>;
  bundles?: InputMaybe<BundleFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsBundleListingSimpleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsBundleListingSimpleFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsBundleListingSimpleInput = {
  bundles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsCemeteriesOpeningHours = {
  __typename?: 'ComponentSectionsCemeteriesOpeningHours';
  buttonPosition?: Maybe<Enum_Componentsectionscemeteriesopeninghours_Buttonposition>;
  id: Scalars['ID']['output'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsCemeteriesOpeningHoursFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCemeteriesOpeningHoursFiltersInput>>>;
  buttonPosition?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsCemeteriesOpeningHoursFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCemeteriesOpeningHoursFiltersInput>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsCemeteriesOpeningHoursInput = {
  buttonPosition?: InputMaybe<Enum_Componentsectionscemeteriesopeninghours_Buttonposition>;
  id?: InputMaybe<Scalars['ID']['input']>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsCeremoniesArchiveSection = {
  __typename?: 'ComponentSectionsCeremoniesArchiveSection';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsCeremoniesArchiveSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCeremoniesArchiveSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsCeremoniesArchiveSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCeremoniesArchiveSectionFiltersInput>>>;
};

export type ComponentSectionsCeremoniesArchiveSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsCeremoniesSection = {
  __typename?: 'ComponentSectionsCeremoniesSection';
  archive?: Maybe<ComponentBlocksBlocksCeremonyArchiveBlock>;
  id: Scalars['ID']['output'];
};

export type ComponentSectionsCeremoniesSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCeremoniesSectionFiltersInput>>>;
  archive?: InputMaybe<ComponentBlocksBlocksCeremonyArchiveBlockFiltersInput>;
  not?: InputMaybe<ComponentSectionsCeremoniesSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCeremoniesSectionFiltersInput>>>;
};

export type ComponentSectionsCeremoniesSectionInput = {
  archive?: InputMaybe<ComponentBlocksBlocksCeremonyArchiveBlockInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsContactGroup = {
  __typename?: 'ComponentSectionsContactGroup';
  contacts?: Maybe<Array<Maybe<ComponentBlocksContactItem>>>;
  id: Scalars['ID']['output'];
  layout: Enum_Componentsectionscontactgroup_Layout;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsContactGroupContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsContactGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsContactGroupFiltersInput>>>;
  contacts?: InputMaybe<ComponentBlocksContactItemFiltersInput>;
  layout?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsContactGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsContactGroupFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsContactGroupInput = {
  contacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  layout?: InputMaybe<Enum_Componentsectionscontactgroup_Layout>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsCtaSection = {
  __typename?: 'ComponentSectionsCtaSection';
  ctas?: Maybe<Array<Maybe<ComponentBlocksSimpleCtaItem>>>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsCtaSectionCtasArgs = {
  filters?: InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsCtaSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsCtaSectionFiltersInput>>>;
  ctas?: InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>;
  not?: InputMaybe<ComponentSectionsCtaSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsCtaSectionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsCtaSectionInput = {
  ctas?: InputMaybe<Array<InputMaybe<ComponentBlocksSimpleCtaItemInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsDebtorsSection = {
  __typename?: 'ComponentSectionsDebtorsSection';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentSectionsDebtorsSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDebtorsSectionFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsDebtorsSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDebtorsSectionFiltersInput>>>;
};

export type ComponentSectionsDebtorsSectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsDisclosuresSection = {
  __typename?: 'ComponentSectionsDisclosuresSection';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsDisclosuresSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDisclosuresSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsDisclosuresSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDisclosuresSectionFiltersInput>>>;
};

export type ComponentSectionsDisclosuresSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider';
  color: Enum_Componentsectionsdivider_Color;
  id: Scalars['ID']['output'];
};

export type ComponentSectionsDividerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsDividerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>;
};

export type ComponentSectionsDividerInput = {
  color?: InputMaybe<Enum_Componentsectionsdivider_Color>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery';
  id: Scalars['ID']['output'];
  medias: Array<Maybe<UploadFile>>;
  medias_connection?: Maybe<UploadFileRelationResponseCollection>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsGalleryMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentSectionsGalleryMedias_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsGalleryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsGalleryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsGalleryInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsHomepageReviewsSection = {
  __typename?: 'ComponentSectionsHomepageReviewsSection';
  id: Scalars['ID']['output'];
  reviews: Array<Maybe<Review>>;
  reviews_connection?: Maybe<ReviewRelationResponseCollection>;
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsHomepageReviewsSectionReviewsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentSectionsHomepageReviewsSectionReviews_ConnectionArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsHomepageReviewsSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageReviewsSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsHomepageReviewsSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageReviewsSectionFiltersInput>>>;
  reviews?: InputMaybe<ReviewFiltersInput>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsHomepageReviewsSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  reviews?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsIframeSection = {
  __typename?: 'ComponentSectionsIframeSection';
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  iframeTitle: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ComponentSectionsIframeSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsIframeSectionFiltersInput>>>;
  body?: InputMaybe<StringFilterInput>;
  iframeTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsIframeSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsIframeSectionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsIframeSectionInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  iframeTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsManualListing = {
  __typename?: 'ComponentSectionsManualListing';
  id: Scalars['ID']['output'];
  pages?: Maybe<Array<Maybe<ComponentBlocksPageItem>>>;
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  style: Enum_Componentsectionsmanuallisting_Style;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsManualListingPagesArgs = {
  filters?: InputMaybe<ComponentBlocksPageItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsManualListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsManualListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsManualListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsManualListingFiltersInput>>>;
  pages?: InputMaybe<ComponentBlocksPageItemFiltersInput>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  style?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsManualListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  pages?: InputMaybe<Array<InputMaybe<ComponentBlocksPageItemInput>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  style?: InputMaybe<Enum_Componentsectionsmanuallisting_Style>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsMapOfManagedObjects = {
  __typename?: 'ComponentSectionsMapOfManagedObjects';
  categories: Array<Maybe<ManagedObjectCategory>>;
  categories_connection?: Maybe<ManagedObjectCategoryRelationResponseCollection>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsMapOfManagedObjectsCategoriesArgs = {
  filters?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentSectionsMapOfManagedObjectsCategories_ConnectionArgs = {
  filters?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsMapOfManagedObjectsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsMapOfManagedObjectsFiltersInput>>>;
  categories?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  not?: InputMaybe<ComponentSectionsMapOfManagedObjectsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsMapOfManagedObjectsFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsMapOfManagedObjectsInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsMapSection = {
  __typename?: 'ComponentSectionsMapSection';
  categories: Array<Maybe<CemeteryCategory>>;
  categories_connection?: Maybe<CemeteryCategoryRelationResponseCollection>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsMapSectionCategoriesArgs = {
  filters?: InputMaybe<CemeteryCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentSectionsMapSectionCategories_ConnectionArgs = {
  filters?: InputMaybe<CemeteryCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsMapSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsMapSectionFiltersInput>>>;
  categories?: InputMaybe<CemeteryCategoryFiltersInput>;
  not?: InputMaybe<ComponentSectionsMapSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsMapSectionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsMapSectionInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsMenuListing = {
  __typename?: 'ComponentSectionsMenuListing';
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsMenuListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsMenuListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsMenuListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsMenuListingFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsMenuListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsNewsListing = {
  __typename?: 'ComponentSectionsNewsListing';
  id: Scalars['ID']['output'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsNewsListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsNewsListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsListingFiltersInput>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsNewsListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsOpeningHoursSection = {
  __typename?: 'ComponentSectionsOpeningHoursSection';
  id: Scalars['ID']['output'];
  offices?: Maybe<Array<Maybe<ComponentBlocksOfficeItem>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentSectionsOpeningHoursSectionOfficesArgs = {
  filters?: InputMaybe<ComponentBlocksOfficeItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSectionsOpeningHoursSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>;
  offices?: InputMaybe<ComponentBlocksOfficeItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursSectionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsOpeningHoursSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  offices?: InputMaybe<Array<InputMaybe<ComponentBlocksOfficeItemInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsProceduresSection = {
  __typename?: 'ComponentSectionsProceduresSection';
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsProceduresSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsProceduresSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsProceduresSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsProceduresSectionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsProceduresSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsProceduresShortSection = {
  __typename?: 'ComponentSectionsProceduresShortSection';
  id: Scalars['ID']['output'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsProceduresShortSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsProceduresShortSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsProceduresShortSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsProceduresShortSectionFiltersInput>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsProceduresShortSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSectionsReviewListing = {
  __typename?: 'ComponentSectionsReviewListing';
  id: Scalars['ID']['output'];
};

export type ComponentSectionsReviewListingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsReviewListingFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsReviewListingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsReviewListingFiltersInput>>>;
};

export type ComponentSectionsReviewListingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsRichtext = {
  __typename?: 'ComponentSectionsRichtext';
  button?: Maybe<ComponentBlocksButtonLink>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentSectionsRichtextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsRichtextFiltersInput>>>;
  button?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSectionsRichtextFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsRichtextFiltersInput>>>;
};

export type ComponentSectionsRichtextInput = {
  button?: InputMaybe<ComponentBlocksButtonLinkInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentSectionsUpcomingCeremoniesSection = {
  __typename?: 'ComponentSectionsUpcomingCeremoniesSection';
  id: Scalars['ID']['output'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentSectionsUpcomingCeremoniesSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsUpcomingCeremoniesSectionFiltersInput>>>;
  not?: InputMaybe<ComponentSectionsUpcomingCeremoniesSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsUpcomingCeremoniesSectionFiltersInput>>>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsUpcomingCeremoniesSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  showMoreButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Contact = {
  __typename?: 'Contact';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Contact>>;
  localizations_connection?: Maybe<ContactRelationResponseCollection>;
  phone1?: Maybe<Scalars['String']['output']>;
  phone2?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ContactLocalizationsArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContactEntity = {
  __typename?: 'ContactEntity';
  attributes?: Maybe<Contact>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ContactEntityResponse = {
  __typename?: 'ContactEntityResponse';
  data?: Maybe<Contact>;
};

export type ContactEntityResponseCollection = {
  __typename?: 'ContactEntityResponseCollection';
  nodes: Array<Contact>;
  pageInfo: Pagination;
};

export type ContactFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ContactFiltersInput>;
  not?: InputMaybe<ContactFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactFiltersInput>>>;
  phone1?: InputMaybe<StringFilterInput>;
  phone2?: InputMaybe<StringFilterInput>;
  position?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone1?: InputMaybe<Scalars['String']['input']>;
  phone2?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ContactRelationResponseCollection = {
  __typename?: 'ContactRelationResponseCollection';
  nodes: Array<Contact>;
};

export type ContentTypes = {
  __typename?: 'ContentTypes';
  available: Scalars['Boolean']['output'];
  collectionName: Scalars['String']['output'];
  contentTypeName: Scalars['String']['output'];
  endpoint: Scalars['String']['output'];
  isSingle: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  labelSingular: Scalars['String']['output'];
  name: Scalars['String']['output'];
  relatedField: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type ContentTypesNameFields = {
  __typename?: 'ContentTypesNameFields';
  default: Array<Scalars['String']['output']>;
};

export type CreateNavigation = {
  items: Array<InputMaybe<CreateNavigationItem>>;
  name: Scalars['String']['input'];
};

export type CreateNavigationItem = {
  audience?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalPath?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<InputMaybe<CreateNavigationItem>>>;
  master?: InputMaybe<Scalars['String']['input']>;
  menuAttached: Scalars['Boolean']['input'];
  order: Scalars['Int']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  related?: InputMaybe<CreateNavigationRelated>;
  title: Scalars['String']['input'];
  type: NavigationItemType;
  uiRouterKey: Scalars['String']['input'];
};

export type CreateNavigationRelated = {
  field: Scalars['String']['input'];
  ref: Scalars['String']['input'];
  refId: Scalars['String']['input'];
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Debtor = {
  __typename?: 'Debtor';
  birthDate?: Maybe<Scalars['String']['output']>;
  cemetery?: Maybe<Cemetery>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deathDate?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  graveNumber?: Maybe<Scalars['String']['output']>;
  gravePreviousNumber?: Maybe<Scalars['String']['output']>;
  graveSector?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DebtorEntity = {
  __typename?: 'DebtorEntity';
  attributes?: Maybe<Debtor>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DebtorEntityResponse = {
  __typename?: 'DebtorEntityResponse';
  data?: Maybe<Debtor>;
};

export type DebtorEntityResponseCollection = {
  __typename?: 'DebtorEntityResponseCollection';
  nodes: Array<Debtor>;
  pageInfo: Pagination;
};

export type DebtorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DebtorFiltersInput>>>;
  birthDate?: InputMaybe<StringFilterInput>;
  cemetery?: InputMaybe<CemeteryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deathDate?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  graveNumber?: InputMaybe<StringFilterInput>;
  gravePreviousNumber?: InputMaybe<StringFilterInput>;
  graveSector?: InputMaybe<StringFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DebtorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DebtorFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DebtorInput = {
  birthDate?: InputMaybe<Scalars['String']['input']>;
  cemetery?: InputMaybe<Scalars['ID']['input']>;
  deathDate?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  graveNumber?: InputMaybe<Scalars['String']['input']>;
  gravePreviousNumber?: InputMaybe<Scalars['String']['input']>;
  graveSector?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DebtorRelationResponseCollection = {
  __typename?: 'DebtorRelationResponseCollection';
  nodes: Array<Debtor>;
};

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse';
  documentId: Scalars['ID']['output'];
};

export type Disclosure = {
  __typename?: 'Disclosure';
  additionalData?: Maybe<Scalars['JSON']['output']>;
  contractNumber?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfDelivery?: Maybe<Scalars['String']['output']>;
  dateOfOrder?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  files: Array<Maybe<UploadFile>>;
  files_connection?: Maybe<UploadFileRelationResponseCollection>;
  internalInvoiceNumber?: Maybe<Scalars['String']['output']>;
  invoiceNumberOrVariableSymbol?: Maybe<Scalars['String']['output']>;
  invoicedAmount?: Maybe<Scalars['String']['output']>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedAtOverride?: Maybe<Scalars['DateTime']['output']>;
  signedBy?: Maybe<Scalars['String']['output']>;
  supplierAddress?: Maybe<Scalars['String']['output']>;
  supplierName?: Maybe<Scalars['String']['output']>;
  supplierRegistrationNumber?: Maybe<Scalars['String']['output']>;
  totalValue?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Enum_Disclosure_Type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type DisclosureFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DisclosureFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DisclosureEntity = {
  __typename?: 'DisclosureEntity';
  attributes?: Maybe<Disclosure>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DisclosureEntityResponse = {
  __typename?: 'DisclosureEntityResponse';
  data?: Maybe<Disclosure>;
};

export type DisclosureEntityResponseCollection = {
  __typename?: 'DisclosureEntityResponseCollection';
  nodes: Array<Disclosure>;
  pageInfo: Pagination;
};

export type DisclosureFiltersInput = {
  additionalData?: InputMaybe<JsonFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>;
  contractNumber?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateOfDelivery?: InputMaybe<StringFilterInput>;
  dateOfOrder?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  internalInvoiceNumber?: InputMaybe<StringFilterInput>;
  invoiceNumberOrVariableSymbol?: InputMaybe<StringFilterInput>;
  invoicedAmount?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DisclosureFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>;
  orderNumber?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  publishedAtOverride?: InputMaybe<DateTimeFilterInput>;
  signedBy?: InputMaybe<StringFilterInput>;
  supplierAddress?: InputMaybe<StringFilterInput>;
  supplierName?: InputMaybe<StringFilterInput>;
  supplierRegistrationNumber?: InputMaybe<StringFilterInput>;
  totalValue?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DisclosureInput = {
  additionalData?: InputMaybe<Scalars['JSON']['input']>;
  contractNumber?: InputMaybe<Scalars['String']['input']>;
  dateOfDelivery?: InputMaybe<Scalars['String']['input']>;
  dateOfOrder?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  internalInvoiceNumber?: InputMaybe<Scalars['String']['input']>;
  invoiceNumberOrVariableSymbol?: InputMaybe<Scalars['String']['input']>;
  invoicedAmount?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAtOverride?: InputMaybe<Scalars['DateTime']['input']>;
  signedBy?: InputMaybe<Scalars['String']['input']>;
  supplierAddress?: InputMaybe<Scalars['String']['input']>;
  supplierName?: InputMaybe<Scalars['String']['input']>;
  supplierRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  totalValue?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Enum_Disclosure_Type>;
};

export type DisclosureRelationResponseCollection = {
  __typename?: 'DisclosureRelationResponseCollection';
  nodes: Array<Disclosure>;
};

export enum Enum_Bundle_Type {
  Kremacia = 'kremacia',
  Pochovanie = 'pochovanie',
  Prirodne = 'prirodne'
}

export enum Enum_Componentblockssocialitem_Icon {
  Facebook = 'facebook',
  Instagram = 'instagram',
  Linkedin = 'linkedin',
  Twitter = 'twitter',
  Youtube = 'youtube'
}

export enum Enum_Componentsectionscemeteriesopeninghours_Buttonposition {
  Below = 'below',
  Standard = 'standard'
}

export enum Enum_Componentsectionscontactgroup_Layout {
  Condensed = 'condensed',
  Default = 'default'
}

export enum Enum_Componentsectionsdivider_Color {
  Default = 'default',
  Primary = 'primary'
}

export enum Enum_Componentsectionsmanuallisting_Style {
  Service = 'service',
  Simple = 'simple'
}

export enum Enum_Disclosure_Type {
  Faktura = 'Faktura',
  Objednavka = 'Objednavka',
  Zmluva = 'Zmluva'
}

export enum Enum_Page_Layout {
  Centered = 'centered',
  Fullwidth = 'fullwidth',
  Sidebar = 'sidebar'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type General = {
  __typename?: 'General';
  address?: Maybe<ComponentGeneralContacts>;
  cemeteryOpeningHours?: Maybe<ComponentBlocksOpeningHoursUniversal>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  footer?: Maybe<ComponentGeneralFooter>;
  header?: Maybe<ComponentGeneralHeader>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<General>>;
  localizations_connection?: Maybe<GeneralRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  socials?: Maybe<Array<Maybe<ComponentBlocksSocialItem>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type GeneralSocialsArgs = {
  filters?: InputMaybe<ComponentBlocksSocialItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GeneralEntity = {
  __typename?: 'GeneralEntity';
  attributes?: Maybe<General>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type GeneralEntityResponse = {
  __typename?: 'GeneralEntityResponse';
  data?: Maybe<General>;
};

export type GeneralEntityResponseCollection = {
  __typename?: 'GeneralEntityResponseCollection';
  nodes: Array<General>;
  pageInfo: Pagination;
};

export type GeneralFiltersInput = {
  address?: InputMaybe<ComponentGeneralContactsFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<GeneralFiltersInput>>>;
  cemeteryOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  footer?: InputMaybe<ComponentGeneralFooterFiltersInput>;
  header?: InputMaybe<ComponentGeneralHeaderFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<GeneralFiltersInput>;
  not?: InputMaybe<GeneralFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GeneralFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  socials?: InputMaybe<ComponentBlocksSocialItemFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GeneralInput = {
  address?: InputMaybe<ComponentGeneralContactsInput>;
  cemeteryOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalInput>;
  footer?: InputMaybe<ComponentGeneralFooterInput>;
  header?: InputMaybe<ComponentGeneralHeaderInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  socials?: InputMaybe<Array<InputMaybe<ComponentBlocksSocialItemInput>>>;
};

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection';
  nodes: Array<General>;
};

export type GenericMorph = Article | ArticleJobsCategory | ArticleNewsCategory | ArticlePressCategory | Asset | AssetCategory | Branch | Bundle | Cemetery | CemeteryCategory | Ceremony | ComponentBlocksAccordionItem | ComponentBlocksAccordionItemWithPrice | ComponentBlocksArticleItem | ComponentBlocksAssetItem | ComponentBlocksBlocksCeremonyArchiveBlock | ComponentBlocksBranchItem | ComponentBlocksBundleContentItem | ComponentBlocksBundleGroup | ComponentBlocksBundleItem | ComponentBlocksButtonLink | ComponentBlocksContactItem | ComponentBlocksCta | ComponentBlocksOfficeItem | ComponentBlocksOpeningHoursItem | ComponentBlocksOpeningHoursUniversal | ComponentBlocksPageItem | ComponentBlocksPriceListItem | ComponentBlocksSidebar | ComponentBlocksSimpleCtaItem | ComponentBlocksSocialItem | ComponentGeneralContacts | ComponentGeneralFooter | ComponentGeneralHeader | ComponentGeneralLinkItem | ComponentGeneralProcedure | ComponentGeneralProcedureItem | ComponentGeneralSeo | ComponentGeneralSocial | ComponentSectionsAccordionGroup | ComponentSectionsArticleJobsListing | ComponentSectionsArticleNewsListing | ComponentSectionsArticlePressListing | ComponentSectionsArticlesManualListing | ComponentSectionsAssetGroup | ComponentSectionsAssetsSection | ComponentSectionsBranchGroup | ComponentSectionsBundleListing | ComponentSectionsBundleListingSimple | ComponentSectionsCemeteriesOpeningHours | ComponentSectionsCeremoniesArchiveSection | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsCtaSection | ComponentSectionsDebtorsSection | ComponentSectionsDisclosuresSection | ComponentSectionsDivider | ComponentSectionsGallery | ComponentSectionsHomepageReviewsSection | ComponentSectionsIframeSection | ComponentSectionsManualListing | ComponentSectionsMapOfManagedObjects | ComponentSectionsMapSection | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsOpeningHoursSection | ComponentSectionsProceduresSection | ComponentSectionsProceduresShortSection | ComponentSectionsReviewListing | ComponentSectionsRichtext | ComponentSectionsUpcomingCeremoniesSection | Contact | Debtor | Disclosure | General | HomePage | I18NLocale | ManagedObject | ManagedObjectCategory | Office | Page | Partner | Procedure | Review | ReviewWorkflowsWorkflow | ReviewWorkflowsWorkflowStage | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type HomePage = {
  __typename?: 'HomePage';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  featured: Array<Maybe<ComponentBlocksCta>>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<HomePage>>;
  localizations_connection?: Maybe<HomePageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sections?: Maybe<Array<Maybe<HomePageSectionsDynamicZone>>>;
  seo?: Maybe<ComponentGeneralSeo>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type HomePageFeaturedArgs = {
  filters?: InputMaybe<ComponentBlocksCtaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HomePageEntity = {
  __typename?: 'HomePageEntity';
  attributes?: Maybe<HomePage>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type HomePageEntityResponse = {
  __typename?: 'HomePageEntityResponse';
  data?: Maybe<HomePage>;
};

export type HomePageEntityResponseCollection = {
  __typename?: 'HomePageEntityResponseCollection';
  nodes: Array<HomePage>;
  pageInfo: Pagination;
};

export type HomePageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HomePageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  featured?: InputMaybe<ComponentBlocksCtaFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<HomePageFiltersInput>;
  not?: InputMaybe<HomePageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HomePageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HomePageInput = {
  featured?: InputMaybe<Array<InputMaybe<ComponentBlocksCtaInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sections?: InputMaybe<Array<Scalars['HomePageSectionsDynamicZoneInput']['input']>>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
};

export type HomePageRelationResponseCollection = {
  __typename?: 'HomePageRelationResponseCollection';
  nodes: Array<HomePage>;
};

export type HomePageSectionsDynamicZone = ComponentSectionsArticlesManualListing | ComponentSectionsCtaSection | ComponentSectionsHomepageReviewsSection | ComponentSectionsManualListing | ComponentSectionsNewsListing | ComponentSectionsProceduresShortSection | ComponentSectionsUpcomingCeremoniesSection | Error;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocale>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type I18NLocaleInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type I18NLocaleRelationResponseCollection = {
  __typename?: 'I18NLocaleRelationResponseCollection';
  nodes: Array<I18NLocale>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  contains?: InputMaybe<Scalars['Long']['input']>;
  containsi?: InputMaybe<Scalars['Long']['input']>;
  endsWith?: InputMaybe<Scalars['Long']['input']>;
  eq?: InputMaybe<Scalars['Long']['input']>;
  eqi?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  ne?: InputMaybe<Scalars['Long']['input']>;
  nei?: InputMaybe<Scalars['Long']['input']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']['input']>;
  notContainsi?: InputMaybe<Scalars['Long']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  startsWith?: InputMaybe<Scalars['Long']['input']>;
};

export type ManagedObject = {
  __typename?: 'ManagedObject';
  address?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Contact>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<ManagedObject>>;
  localizations_connection?: Maybe<ManagedObjectRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']['output']>;
  managedObjectCategory?: Maybe<ManagedObjectCategory>;
  medias: Array<Maybe<UploadFile>>;
  medias_connection?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ManagedObjectLocalizationsArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ManagedObjectLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ManagedObjectMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ManagedObjectMedias_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ManagedObjectCategory = {
  __typename?: 'ManagedObjectCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  managedObjects: Array<Maybe<ManagedObject>>;
  managedObjects_connection?: Maybe<ManagedObjectRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ManagedObjectCategoryManagedObjectsArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ManagedObjectCategoryManagedObjects_ConnectionArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ManagedObjectCategoryEntity = {
  __typename?: 'ManagedObjectCategoryEntity';
  attributes?: Maybe<ManagedObjectCategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ManagedObjectCategoryEntityResponse = {
  __typename?: 'ManagedObjectCategoryEntityResponse';
  data?: Maybe<ManagedObjectCategory>;
};

export type ManagedObjectCategoryEntityResponseCollection = {
  __typename?: 'ManagedObjectCategoryEntityResponseCollection';
  nodes: Array<ManagedObjectCategory>;
  pageInfo: Pagination;
};

export type ManagedObjectCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ManagedObjectCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  managedObjects?: InputMaybe<ManagedObjectFiltersInput>;
  not?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ManagedObjectCategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ManagedObjectCategoryInput = {
  managedObjects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ManagedObjectCategoryRelationResponseCollection = {
  __typename?: 'ManagedObjectCategoryRelationResponseCollection';
  nodes: Array<ManagedObjectCategory>;
};

export type ManagedObjectEntity = {
  __typename?: 'ManagedObjectEntity';
  attributes?: Maybe<ManagedObject>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ManagedObjectEntityResponse = {
  __typename?: 'ManagedObjectEntityResponse';
  data?: Maybe<ManagedObject>;
};

export type ManagedObjectEntityResponseCollection = {
  __typename?: 'ManagedObjectEntityResponseCollection';
  nodes: Array<ManagedObject>;
  pageInfo: Pagination;
};

export type ManagedObjectFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ManagedObjectFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ManagedObjectFiltersInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  managedObjectCategory?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ManagedObjectFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ManagedObjectFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ManagedObjectInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  managedObjectCategory?: InputMaybe<Scalars['ID']['input']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  navigateToLink?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ManagedObjectRelationResponseCollection = {
  __typename?: 'ManagedObjectRelationResponseCollection';
  nodes: Array<ManagedObject>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createArticle?: Maybe<Article>;
  createArticleJobsCategory?: Maybe<ArticleJobsCategory>;
  createArticleNewsCategory?: Maybe<ArticleNewsCategory>;
  createArticlePressCategory?: Maybe<ArticlePressCategory>;
  createAsset?: Maybe<Asset>;
  createAssetCategory?: Maybe<AssetCategory>;
  createBranch?: Maybe<Branch>;
  createBundle?: Maybe<Bundle>;
  createCemetery?: Maybe<Cemetery>;
  createCemeteryCategory?: Maybe<CemeteryCategory>;
  createCeremony?: Maybe<Ceremony>;
  createContact?: Maybe<Contact>;
  createDebtor?: Maybe<Debtor>;
  createDisclosure?: Maybe<Disclosure>;
  createManagedObject?: Maybe<ManagedObject>;
  createManagedObjectCategory?: Maybe<ManagedObjectCategory>;
  createOffice?: Maybe<Office>;
  createPage?: Maybe<Page>;
  createPartner?: Maybe<Partner>;
  createReview?: Maybe<Review>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteArticle?: Maybe<DeleteMutationResponse>;
  deleteArticleJobsCategory?: Maybe<DeleteMutationResponse>;
  deleteArticleNewsCategory?: Maybe<DeleteMutationResponse>;
  deleteArticlePressCategory?: Maybe<DeleteMutationResponse>;
  deleteAsset?: Maybe<DeleteMutationResponse>;
  deleteAssetCategory?: Maybe<DeleteMutationResponse>;
  deleteBranch?: Maybe<DeleteMutationResponse>;
  deleteBundle?: Maybe<DeleteMutationResponse>;
  deleteCemetery?: Maybe<DeleteMutationResponse>;
  deleteCemeteryCategory?: Maybe<DeleteMutationResponse>;
  deleteCeremony?: Maybe<DeleteMutationResponse>;
  deleteContact?: Maybe<DeleteMutationResponse>;
  deleteDebtor?: Maybe<DeleteMutationResponse>;
  deleteDisclosure?: Maybe<DeleteMutationResponse>;
  deleteGeneral?: Maybe<DeleteMutationResponse>;
  deleteHomePage?: Maybe<DeleteMutationResponse>;
  deleteManagedObject?: Maybe<DeleteMutationResponse>;
  deleteManagedObjectCategory?: Maybe<DeleteMutationResponse>;
  deleteOffice?: Maybe<DeleteMutationResponse>;
  deletePage?: Maybe<DeleteMutationResponse>;
  deletePartner?: Maybe<DeleteMutationResponse>;
  deleteProcedure?: Maybe<DeleteMutationResponse>;
  deleteReview?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateArticle?: Maybe<Article>;
  updateArticleJobsCategory?: Maybe<ArticleJobsCategory>;
  updateArticleNewsCategory?: Maybe<ArticleNewsCategory>;
  updateArticlePressCategory?: Maybe<ArticlePressCategory>;
  updateAsset?: Maybe<Asset>;
  updateAssetCategory?: Maybe<AssetCategory>;
  updateBranch?: Maybe<Branch>;
  updateBundle?: Maybe<Bundle>;
  updateCemetery?: Maybe<Cemetery>;
  updateCemeteryCategory?: Maybe<CemeteryCategory>;
  updateCeremony?: Maybe<Ceremony>;
  updateContact?: Maybe<Contact>;
  updateDebtor?: Maybe<Debtor>;
  updateDisclosure?: Maybe<Disclosure>;
  updateGeneral?: Maybe<General>;
  updateHomePage?: Maybe<HomePage>;
  updateManagedObject?: Maybe<ManagedObject>;
  updateManagedObjectCategory?: Maybe<ManagedObjectCategory>;
  updateOffice?: Maybe<Office>;
  updatePage?: Maybe<Page>;
  updatePartner?: Maybe<Partner>;
  updateProcedure?: Maybe<Procedure>;
  updateReview?: Maybe<Review>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  data: ArticleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateArticleJobsCategoryArgs = {
  data: ArticleJobsCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateArticleNewsCategoryArgs = {
  data: ArticleNewsCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateArticlePressCategoryArgs = {
  data: ArticlePressCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateAssetArgs = {
  data: AssetInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateAssetCategoryArgs = {
  data: AssetCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateBranchArgs = {
  data: BranchInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateBundleArgs = {
  data: BundleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCemeteryArgs = {
  data: CemeteryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCemeteryCategoryArgs = {
  data: CemeteryCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCeremonyArgs = {
  data: CeremonyInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateContactArgs = {
  data: ContactInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateDebtorArgs = {
  data: DebtorInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateDisclosureArgs = {
  data: DisclosureInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateManagedObjectArgs = {
  data: ManagedObjectInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateManagedObjectCategoryArgs = {
  data: ManagedObjectCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOfficeArgs = {
  data: OfficeInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePartnerArgs = {
  data: PartnerInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewArgs = {
  data: ReviewInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteArticleArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteArticleJobsCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteArticleNewsCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteArticlePressCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteAssetArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteAssetCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteBranchArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteBundleArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteCemeteryArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteCemeteryCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCeremonyArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteContactArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteDebtorArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDisclosureArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteManagedObjectArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteManagedObjectCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteOfficeArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePageArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePartnerArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteProcedureArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteReviewArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  data: ArticleInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateArticleJobsCategoryArgs = {
  data: ArticleJobsCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateArticleNewsCategoryArgs = {
  data: ArticleNewsCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateArticlePressCategoryArgs = {
  data: ArticlePressCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateAssetArgs = {
  data: AssetInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateAssetCategoryArgs = {
  data: AssetCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateBranchArgs = {
  data: BranchInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateBundleArgs = {
  data: BundleInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCemeteryArgs = {
  data: CemeteryInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCemeteryCategoryArgs = {
  data: CemeteryCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCeremonyArgs = {
  data: CeremonyInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateContactArgs = {
  data: ContactInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateDebtorArgs = {
  data: DebtorInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateDisclosureArgs = {
  data: DisclosureInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateGeneralArgs = {
  data: GeneralInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateHomePageArgs = {
  data: HomePageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateManagedObjectArgs = {
  data: ManagedObjectInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateManagedObjectCategoryArgs = {
  data: ManagedObjectCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOfficeArgs = {
  data: OfficeInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePartnerArgs = {
  data: PartnerInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProcedureArgs = {
  data: ProcedureInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewArgs = {
  data: ReviewInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};

export type Navigation = {
  __typename?: 'Navigation';
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type NavigationConfig = {
  __typename?: 'NavigationConfig';
  additionalFields: Array<Maybe<Scalars['String']['output']>>;
  allowedLevels?: Maybe<Scalars['Int']['output']>;
  contentTypes?: Maybe<Array<Maybe<ContentTypes>>>;
  contentTypesNameFields?: Maybe<ContentTypesNameFields>;
};

export type NavigationDetails = {
  __typename?: 'NavigationDetails';
  documentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  items: Array<Maybe<NavigationItem>>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type NavigationItem = {
  __typename?: 'NavigationItem';
  additionalFields?: Maybe<NavigationItemAdditionalFields>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  created_by?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['String']['output'];
  externalPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  items?: Maybe<Array<Maybe<NavigationItem>>>;
  master?: Maybe<Scalars['String']['output']>;
  menuAttached: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  parent?: Maybe<NavigationItem>;
  path?: Maybe<Scalars['String']['output']>;
  related?: Maybe<NavigationItemRelated>;
  title: Scalars['String']['output'];
  type: NavigationItemType;
  uiRouterKey: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  updated_by?: Maybe<Scalars['String']['output']>;
};

export type NavigationItemAdditionalFields = {
  __typename?: 'NavigationItemAdditionalFields';
  _unused?: Maybe<Scalars['Boolean']['output']>;
};

export type NavigationItemRelated = Page;

export enum NavigationItemType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL',
  Wrapper = 'WRAPPER'
}

export enum NavigationRenderType {
  Flat = 'FLAT',
  Tree = 'TREE'
}

export type Office = {
  __typename?: 'Office';
  branch?: Maybe<Branch>;
  contacts: Array<Maybe<Contact>>;
  contacts_connection?: Maybe<ContactRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Office>>;
  localizations_connection?: Maybe<OfficeRelationResponseCollection>;
  openingHours?: Maybe<ComponentBlocksOpeningHoursUniversal>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  titleInternal: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type OfficeContactsArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfficeContacts_ConnectionArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfficeLocalizationsArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfficeLocalizations_ConnectionArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OfficeEntity = {
  __typename?: 'OfficeEntity';
  attributes?: Maybe<Office>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type OfficeEntityResponse = {
  __typename?: 'OfficeEntityResponse';
  data?: Maybe<Office>;
};

export type OfficeEntityResponseCollection = {
  __typename?: 'OfficeEntityResponseCollection';
  nodes: Array<Office>;
  pageInfo: Pagination;
};

export type OfficeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OfficeFiltersInput>>>;
  branch?: InputMaybe<BranchFiltersInput>;
  contacts?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OfficeFiltersInput>;
  not?: InputMaybe<OfficeFiltersInput>;
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OfficeFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  titleInternal?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OfficeInput = {
  branch?: InputMaybe<Scalars['ID']['input']>;
  contacts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleInternal?: InputMaybe<Scalars['String']['input']>;
};

export type OfficeRelationResponseCollection = {
  __typename?: 'OfficeRelationResponseCollection';
  nodes: Array<Office>;
};

export type Page = {
  __typename?: 'Page';
  coverMedia?: Maybe<UploadFile>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ctaButton?: Maybe<ComponentBlocksButtonLink>;
  documentId: Scalars['ID']['output'];
  layout: Enum_Page_Layout;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Page>>;
  localizations_connection?: Maybe<PageRelationResponseCollection>;
  perex?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>;
  seo?: Maybe<ComponentGeneralSeo>;
  sidebar?: Maybe<ComponentBlocksSidebar>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PageLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data?: Maybe<Page>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  nodes: Array<Page>;
  pageInfo: Pagination;
};

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  layout?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageFiltersInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  perex?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  coverMedia?: InputMaybe<Scalars['ID']['input']>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  layout?: InputMaybe<Enum_Page_Layout>;
  perex?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']['input']>>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  nodes: Array<Page>;
};

export type PageSectionsDynamicZone = ComponentSectionsAccordionGroup | ComponentSectionsArticleJobsListing | ComponentSectionsArticleNewsListing | ComponentSectionsArticlePressListing | ComponentSectionsAssetGroup | ComponentSectionsAssetsSection | ComponentSectionsBranchGroup | ComponentSectionsBundleListing | ComponentSectionsBundleListingSimple | ComponentSectionsCemeteriesOpeningHours | ComponentSectionsCeremoniesArchiveSection | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsDebtorsSection | ComponentSectionsDisclosuresSection | ComponentSectionsDivider | ComponentSectionsGallery | ComponentSectionsIframeSection | ComponentSectionsManualListing | ComponentSectionsMapOfManagedObjects | ComponentSectionsMapSection | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsOpeningHoursSection | ComponentSectionsProceduresSection | ComponentSectionsReviewListing | ComponentSectionsRichtext | Error;

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Partner = {
  __typename?: 'Partner';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  featured?: Maybe<Scalars['Boolean']['output']>;
  link: Scalars['String']['output'];
  logo: UploadFile;
  priority?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PartnerEntity = {
  __typename?: 'PartnerEntity';
  attributes?: Maybe<Partner>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PartnerEntityResponse = {
  __typename?: 'PartnerEntityResponse';
  data?: Maybe<Partner>;
};

export type PartnerEntityResponseCollection = {
  __typename?: 'PartnerEntityResponseCollection';
  nodes: Array<Partner>;
  pageInfo: Pagination;
};

export type PartnerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  featured?: InputMaybe<BooleanFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PartnerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  priority?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PartnerInput = {
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PartnerRelationResponseCollection = {
  __typename?: 'PartnerRelationResponseCollection';
  nodes: Array<Partner>;
};

export type Procedure = {
  __typename?: 'Procedure';
  atMedicalFacility?: Maybe<ComponentGeneralProcedure>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Procedure>>;
  localizations_connection?: Maybe<ProcedureRelationResponseCollection>;
  outsideMedicalFacility?: Maybe<ComponentGeneralProcedure>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProcedureEntity = {
  __typename?: 'ProcedureEntity';
  attributes?: Maybe<Procedure>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ProcedureEntityResponse = {
  __typename?: 'ProcedureEntityResponse';
  data?: Maybe<Procedure>;
};

export type ProcedureEntityResponseCollection = {
  __typename?: 'ProcedureEntityResponseCollection';
  nodes: Array<Procedure>;
  pageInfo: Pagination;
};

export type ProcedureFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProcedureFiltersInput>>>;
  atMedicalFacility?: InputMaybe<ComponentGeneralProcedureFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ProcedureFiltersInput>;
  not?: InputMaybe<ProcedureFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProcedureFiltersInput>>>;
  outsideMedicalFacility?: InputMaybe<ComponentGeneralProcedureFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProcedureInput = {
  atMedicalFacility?: InputMaybe<ComponentGeneralProcedureInput>;
  outsideMedicalFacility?: InputMaybe<ComponentGeneralProcedureInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProcedureRelationResponseCollection = {
  __typename?: 'ProcedureRelationResponseCollection';
  nodes: Array<Procedure>;
};

export enum PublicationFilter {
  HasPublishedVersion = 'HAS_PUBLISHED_VERSION',
  HasPublishedVersionDocument = 'HAS_PUBLISHED_VERSION_DOCUMENT',
  Modified = 'MODIFIED',
  NeverPublished = 'NEVER_PUBLISHED',
  NeverPublishedDocument = 'NEVER_PUBLISHED_DOCUMENT',
  PublishedWithoutDraft = 'PUBLISHED_WITHOUT_DRAFT',
  PublishedWithDraft = 'PUBLISHED_WITH_DRAFT',
  Unmodified = 'UNMODIFIED'
}

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articleJobsCategories: Array<Maybe<ArticleJobsCategory>>;
  articleJobsCategories_connection?: Maybe<ArticleJobsCategoryEntityResponseCollection>;
  articleJobsCategory?: Maybe<ArticleJobsCategory>;
  articleNewsCategories: Array<Maybe<ArticleNewsCategory>>;
  articleNewsCategories_connection?: Maybe<ArticleNewsCategoryEntityResponseCollection>;
  articleNewsCategory?: Maybe<ArticleNewsCategory>;
  articlePressCategories: Array<Maybe<ArticlePressCategory>>;
  articlePressCategories_connection?: Maybe<ArticlePressCategoryEntityResponseCollection>;
  articlePressCategory?: Maybe<ArticlePressCategory>;
  articles: Array<Maybe<Article>>;
  articles_connection?: Maybe<ArticleEntityResponseCollection>;
  asset?: Maybe<Asset>;
  assetCategories: Array<Maybe<AssetCategory>>;
  assetCategories_connection?: Maybe<AssetCategoryEntityResponseCollection>;
  assetCategory?: Maybe<AssetCategory>;
  assetFileTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  assets: Array<Maybe<Asset>>;
  assets_connection?: Maybe<AssetEntityResponseCollection>;
  branch?: Maybe<Branch>;
  branches: Array<Maybe<Branch>>;
  branches_connection?: Maybe<BranchEntityResponseCollection>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Maybe<Bundle>>;
  bundles_connection?: Maybe<BundleEntityResponseCollection>;
  cemeteries: Array<Maybe<Cemetery>>;
  cemeteries_connection?: Maybe<CemeteryEntityResponseCollection>;
  cemetery?: Maybe<Cemetery>;
  cemeteryCategories: Array<Maybe<CemeteryCategory>>;
  cemeteryCategories_connection?: Maybe<CemeteryCategoryEntityResponseCollection>;
  cemeteryCategory?: Maybe<CemeteryCategory>;
  ceremonies: Array<Maybe<Ceremony>>;
  ceremonies_connection?: Maybe<CeremonyEntityResponseCollection>;
  ceremony?: Maybe<Ceremony>;
  contact?: Maybe<Contact>;
  contacts: Array<Maybe<Contact>>;
  contacts_connection?: Maybe<ContactEntityResponseCollection>;
  debtor?: Maybe<Debtor>;
  debtors: Array<Maybe<Debtor>>;
  debtors_connection?: Maybe<DebtorEntityResponseCollection>;
  disclosure?: Maybe<Disclosure>;
  disclosures: Array<Maybe<Disclosure>>;
  disclosures_connection?: Maybe<DisclosureEntityResponseCollection>;
  general?: Maybe<General>;
  homePage?: Maybe<HomePage>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  managedObject?: Maybe<ManagedObject>;
  managedObjectCategories: Array<Maybe<ManagedObjectCategory>>;
  managedObjectCategories_connection?: Maybe<ManagedObjectCategoryEntityResponseCollection>;
  managedObjectCategory?: Maybe<ManagedObjectCategory>;
  managedObjects: Array<Maybe<ManagedObject>>;
  managedObjects_connection?: Maybe<ManagedObjectEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  office?: Maybe<Office>;
  offices: Array<Maybe<Office>>;
  offices_connection?: Maybe<OfficeEntityResponseCollection>;
  page?: Maybe<Page>;
  pages: Array<Maybe<Page>>;
  pages_connection?: Maybe<PageEntityResponseCollection>;
  partner?: Maybe<Partner>;
  partners: Array<Maybe<Partner>>;
  partners_connection?: Maybe<PartnerEntityResponseCollection>;
  procedure?: Maybe<Procedure>;
  renderNavigation: Array<Maybe<NavigationItem>>;
  renderNavigationChild: Array<Maybe<NavigationItem>>;
  review?: Maybe<Review>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  reviews: Array<Maybe<Review>>;
  reviews_connection?: Maybe<ReviewEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryArticleArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticleJobsCategoriesArgs = {
  filters?: InputMaybe<ArticleJobsCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticleJobsCategories_ConnectionArgs = {
  filters?: InputMaybe<ArticleJobsCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticleJobsCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticleNewsCategoriesArgs = {
  filters?: InputMaybe<ArticleNewsCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticleNewsCategories_ConnectionArgs = {
  filters?: InputMaybe<ArticleNewsCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticleNewsCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticlePressCategoriesArgs = {
  filters?: InputMaybe<ArticlePressCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticlePressCategories_ConnectionArgs = {
  filters?: InputMaybe<ArticlePressCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticlePressCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAssetArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAssetCategoriesArgs = {
  filters?: InputMaybe<AssetCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAssetCategories_ConnectionArgs = {
  filters?: InputMaybe<AssetCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAssetCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBranchArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBranchesArgs = {
  filters?: InputMaybe<BranchFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBranches_ConnectionArgs = {
  filters?: InputMaybe<BranchFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBundleArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBundlesArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBundles_ConnectionArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCemeteriesArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCemeteries_ConnectionArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCemeteryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCemeteryCategoriesArgs = {
  filters?: InputMaybe<CemeteryCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCemeteryCategories_ConnectionArgs = {
  filters?: InputMaybe<CemeteryCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCemeteryCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCeremoniesArgs = {
  filters?: InputMaybe<CeremonyFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCeremonies_ConnectionArgs = {
  filters?: InputMaybe<CeremonyFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCeremonyArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactsArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContacts_ConnectionArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDebtorArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDebtorsArgs = {
  filters?: InputMaybe<DebtorFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDebtors_ConnectionArgs = {
  filters?: InputMaybe<DebtorFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDisclosureArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDisclosuresArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDisclosures_ConnectionArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryGeneralArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHomePageArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryManagedObjectArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryManagedObjectCategoriesArgs = {
  filters?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryManagedObjectCategories_ConnectionArgs = {
  filters?: InputMaybe<ManagedObjectCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryManagedObjectCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryManagedObjectsArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryManagedObjects_ConnectionArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOfficeArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOfficesArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOffices_ConnectionArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPageArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPartnerArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPartners_ConnectionArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProcedureArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryRenderNavigationArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  menuOnly?: InputMaybe<Scalars['Boolean']['input']>;
  navigationIdOrSlug: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NavigationRenderType>;
};


export type QueryRenderNavigationChildArgs = {
  childUiKey: Scalars['String']['input'];
  documentId: Scalars['String']['input'];
  menuOnly?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<NavigationRenderType>;
};


export type QueryReviewArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviews_ConnectionArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationFilter?: InputMaybe<PublicationFilter>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Review = {
  __typename?: 'Review';
  author: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Review>>;
  localizations_connection?: Maybe<ReviewRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  rating: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReviewLocalizationsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewEntity = {
  __typename?: 'ReviewEntity';
  attributes?: Maybe<Review>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ReviewEntityResponse = {
  __typename?: 'ReviewEntityResponse';
  data?: Maybe<Review>;
};

export type ReviewEntityResponseCollection = {
  __typename?: 'ReviewEntityResponseCollection';
  nodes: Array<Review>;
  pageInfo: Pagination;
};

export type ReviewFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewFiltersInput>>>;
  author?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date?: InputMaybe<DateFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReviewFiltersInput>;
  not?: InputMaybe<ReviewFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  rating?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type ReviewRelationResponseCollection = {
  __typename?: 'ReviewRelationResponseCollection';
  nodes: Array<Review>;
};

export type ReviewWorkflowsWorkflow = {
  __typename?: 'ReviewWorkflowsWorkflow';
  contentTypes: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewWorkflowsWorkflowEntity = {
  __typename?: 'ReviewWorkflowsWorkflowEntity';
  attributes?: Maybe<ReviewWorkflowsWorkflow>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ReviewWorkflowsWorkflowEntityResponse = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponse';
  data?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>;
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ReviewWorkflowsWorkflowRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowRelationResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStage = {
  __typename?: 'ReviewWorkflowsWorkflowStage';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStageEntity = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntity';
  attributes?: Maybe<ReviewWorkflowsWorkflowStage>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ReviewWorkflowsWorkflowStageEntityResponse = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponse';
  data?: Maybe<ReviewWorkflowsWorkflowStage>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  workflow?: InputMaybe<Scalars['ID']['input']>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageRelationResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  contains?: InputMaybe<Scalars['Time']['input']>;
  containsi?: InputMaybe<Scalars['Time']['input']>;
  endsWith?: InputMaybe<Scalars['Time']['input']>;
  eq?: InputMaybe<Scalars['Time']['input']>;
  eqi?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  ne?: InputMaybe<Scalars['Time']['input']>;
  nei?: InputMaybe<Scalars['Time']['input']>;
  not?: InputMaybe<TimeFilterInput>;
  notContains?: InputMaybe<Scalars['Time']['input']>;
  notContainsi?: InputMaybe<Scalars['Time']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>;
  startsWith?: InputMaybe<Scalars['Time']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  ext?: Maybe<Scalars['String']['output']>;
  focalPoint?: Maybe<Scalars['JSON']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFile>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  focalPoint?: InputMaybe<JsonFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  focalPoint?: InputMaybe<Scalars['JSON']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  nodes: Array<UploadFile>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionEntityResponse = {
  __typename?: 'UsersPermissionsPermissionEntityResponse';
  data?: Maybe<UsersPermissionsPermission>;
};

export type UsersPermissionsPermissionEntityResponseCollection = {
  __typename?: 'UsersPermissionsPermissionEntityResponseCollection';
  nodes: Array<UsersPermissionsPermission>;
  pageInfo: Pagination;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsRoleRelationResponseCollection = {
  __typename?: 'UsersPermissionsRoleRelationResponseCollection';
  nodes: Array<UsersPermissionsRole>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  nodes: Array<UsersPermissionsUser>;
};

export type FlatNavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, related?: { __typename: 'Page', title: string, slug: string } | null };

export type NavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null };

export type CtaButtonFragment = { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null };

export type SidebarFragment = { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null };

export type SeoFragment = { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null };

export type CtaFragment = { __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, image?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null };

export type HeaderFragment = { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null };

export type SocialItemFragment = { __typename?: 'ComponentBlocksSocialItem', title: string, url: string, icon?: Enum_Componentblockssocialitem_Icon | null };

export type OpeningHoursFragment = { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null };

export type ContactFragment = { __typename?: 'ComponentGeneralContacts', addressFirstLine?: string | null, address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, contactsPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null };

export type FooterLinkItemFragment = { __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null };

export type FooterFragment = { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, bottomLinks?: Array<{ __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null> | null };

export type ProcedureFragment = { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null };

export type ArticlesManualListingFragment = { __typename?: 'ComponentSectionsArticlesManualListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, articles?: Array<{ __typename?: 'ComponentBlocksArticleItem', article?: { __typename: 'Article', perex?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null };

export type AccordionGroupFragment = { __typename?: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null };

export type BranchGroupFragment = { __typename?: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename: 'Branch', address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> } | null } | null> | null };

export type MenuListingFragment = { __typename?: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string };

export type MapSectionFragment = { __typename?: 'ComponentSectionsMapSection', id: string, title?: string | null, categories: Array<{ __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string } | null> };

export type MapOfManagedObjectsSectionFragment = { __typename?: 'ComponentSectionsMapOfManagedObjects', id: string, title?: string | null, categories: Array<{ __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string } | null> };

export type BundleListingFragment = { __typename?: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, atMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null> | null } | null, outsideMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null> | null } | null };

export type BundleListingSimpleFragment = { __typename?: 'ComponentSectionsBundleListingSimple', id: string, title?: string | null, description?: string | null, bundles: Array<{ __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null> };

export type ContactGroupFragment = { __typename?: 'ComponentSectionsContactGroup', id: string, title?: string | null, layout: Enum_Componentsectionscontactgroup_Layout, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null> | null };

export type AssetGroupFragment = { __typename?: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null };

export type GallerySectionFragment = { __typename?: 'ComponentSectionsGallery', id: string, title?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null> };

export type CtaSectionFragment = { __typename?: 'ComponentSectionsCtaSection', id: string, title?: string | null, ctas?: Array<{ __typename?: 'ComponentBlocksSimpleCtaItem', id: string, title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | null> | null };

export type ManualListingFragment = { __typename?: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename: 'Page', publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null> | null };

export type NewsListingFragment = { __typename?: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null };

export type CeremoniesSectionFragment = { __typename?: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | null };

export type RichtextSectionFragment = { __typename?: 'ComponentSectionsRichtext', id: string, content?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null };

export type ProceduresShortSectionFragment = { __typename?: 'ComponentSectionsProceduresShortSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null };

export type UpcomingCeremoniesSectionFragment = { __typename?: 'ComponentSectionsUpcomingCeremoniesSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null };

export type ReviewListingFragment = { __typename?: 'ComponentSectionsReviewListing', id: string };

export type HomepageReviewsSectionFragment = { __typename?: 'ComponentSectionsHomepageReviewsSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, reviews: Array<{ __typename?: 'Review', documentId: string, author: string, date: any, rating: number, description: string } | null> };

export type OpeningHoursSectionFragment = { __typename?: 'ComponentSectionsOpeningHoursSection', id: string, title?: string | null, offices?: Array<{ __typename?: 'ComponentBlocksOfficeItem', office?: { __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null } | null> | null };

export type CemeteriesOpeningHoursFragment = { __typename?: 'ComponentSectionsCemeteriesOpeningHours', id: string, title?: string | null, buttonPosition?: Enum_Componentsectionscemeteriesopeninghours_Buttonposition | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null };

export type IframeSectionFragment = { __typename?: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string };

export type UploadImageEntityFragment = { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null };

export type UploadFileEntityFragment = { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null };

export type ArticleNewsCategoryEntityFragment = { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string };

export type ArticlePressCategoryEntityFragment = { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string };

export type ArticleJobsCategoryEntityFragment = { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string };

export type ArticleSlugEntityFragment = { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null };

export type ArticleCardEntityFragment = { __typename: 'Article', perex?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null };

export type ArticleEntityFragment = { __typename: 'Article', content?: string | null, perex?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, mediaGallery: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null };

export type BranchSlugEntityFragment = { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null };

export type BranchOfficeEntityFragment = { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null };

export type BranchCardEntityFragment = { __typename: 'Branch', address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> };

export type BranchEntityFragment = { __typename: 'Branch', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> };

export type CemeteryCategoryEntityFragment = { __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string };

export type CemeterySlugEntityFragment = { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null };

export type CemeteryCardEntityFragment = { __typename: 'Cemetery', address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null };

export type CemeteryEntityFragment = { __typename: 'Cemetery', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, assets?: { __typename?: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | null, gallery?: { __typename?: 'ComponentSectionsGallery', id: string, title?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null> } | null, video?: { __typename?: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string } | null, cemeteryCategory?: { __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string } | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null };

export type CemeteryInCeremoniesDebtorsEntityFragment = { __typename: 'Cemetery', documentId: string, title: string, localizations: Array<{ __typename?: 'Cemetery', title: string, locale?: string | null } | null> };

export type BundleSlugEntityFragment = { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null };

export type BundleCardEntityFragment = { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null };

export type BundleEntityFragment = { __typename: 'Bundle', description?: string | null, perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, additionalServices?: Array<{ __typename?: 'ComponentBlocksAccordionItemWithPrice', id: string, title: string, description?: string | null } | null> | null, assets?: { __typename?: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null };

export type ContactEntityFragment = { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null };

export type AssetCategoryEntityFragment = { __typename?: 'AssetCategory', documentId: string, title: string, slug: string };

export type AssetSlugEntityFragment = { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null };

export type AssetCardEntityFragment = { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null };

export type AssetEntityFragment = { __typename: 'Asset', description?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null };

export type GeneralEntityFragment = { __typename?: 'General', header?: { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null, socials?: Array<{ __typename?: 'ComponentBlocksSocialItem', title: string, url: string, icon?: Enum_Componentblockssocialitem_Icon | null } | null> | null, address?: { __typename?: 'ComponentGeneralContacts', addressFirstLine?: string | null, address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, contactsPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null, footer?: { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, bottomLinks?: Array<{ __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null> | null } | null, cemeteryOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null };

export type OfficeEntityFragment = { __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> };

export type PartnerEntityFragment = { __typename?: 'Partner', documentId: string, title: string, link: string, featured?: boolean | null, priority?: number | null, logo: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } };

export type PageSlugEntityFragment = { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null };

export type PageCardEntityFragment = { __typename: 'Page', publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null };

export type PageEntityFragment = { __typename: 'Page', layout: Enum_Page_Layout, publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticleJobsListing', id: string } | { __typename: 'ComponentSectionsArticleNewsListing', id: string } | { __typename: 'ComponentSectionsArticlePressListing', id: string } | { __typename: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | { __typename: 'ComponentSectionsAssetsSection', id: string } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename: 'Branch', address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> } | null } | null> | null } | { __typename: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, atMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null> | null } | null, outsideMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null> | null } | null } | { __typename: 'ComponentSectionsBundleListingSimple', id: string, title?: string | null, description?: string | null, bundles: Array<{ __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null> } | { __typename: 'ComponentSectionsCemeteriesOpeningHours', id: string, title?: string | null, buttonPosition?: Enum_Componentsectionscemeteriesopeninghours_Buttonposition | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename: 'ComponentSectionsCeremoniesArchiveSection', id: string } | { __typename: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, layout: Enum_Componentsectionscontactgroup_Layout, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null> | null } | { __typename: 'ComponentSectionsDebtorsSection', id: string, description?: string | null } | { __typename: 'ComponentSectionsDisclosuresSection', id: string } | { __typename: 'ComponentSectionsDivider', id: string, color: Enum_Componentsectionsdivider_Color } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null> } | { __typename: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename: 'Page', publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsMapOfManagedObjects', id: string, title?: string | null, categories: Array<{ __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string } | null> } | { __typename: 'ComponentSectionsMapSection', id: string, title?: string | null, categories: Array<{ __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string } | null> } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename: 'ComponentSectionsOpeningHoursSection', id: string, title?: string | null, offices?: Array<{ __typename?: 'ComponentBlocksOfficeItem', office?: { __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null } | null> | null } | { __typename: 'ComponentSectionsProceduresSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsReviewListing', id: string } | { __typename: 'ComponentSectionsRichtext', id: string, content?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename?: 'Error' } | null> | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null };

export type ProceduresEntityFragment = { __typename?: 'Procedure', updatedAt?: any | null, outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null } | null };

export type ReviewEntityFragment = { __typename?: 'Review', documentId: string, author: string, date: any, rating: number, description: string };

export type CeremonyEntityFragment = { __typename?: 'Ceremony', documentId: string, dateTime: any, name?: string | null, birthYear?: string | null, type?: string | null, company?: string | null, officiantProvidedBy?: string | null, consentForPrivateFields?: boolean | null, cemeteryNameIfOutsideMarianum?: string | null, cemetery?: { __typename?: 'Cemetery', title: string, slug: string, localizations: Array<{ __typename?: 'Cemetery', title: string, slug: string, locale?: string | null } | null> } | null };

export type HomepageCeremonyEntityFragment = { __typename?: 'Ceremony', documentId: string, dateTime: any, name?: string | null, consentForPrivateFields?: boolean | null, cemeteryNameIfOutsideMarianum?: string | null, cemetery?: { __typename?: 'Cemetery', slug: string, title: string, localizations: Array<{ __typename?: 'Cemetery', slug: string, title: string } | null> } | null };

export type ManagedObjectCategoryEntityFragment = { __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string };

export type ManagedObjectSlugEntityFragment = { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null };

export type ManagedObjectEntityFragment = { __typename: 'ManagedObject', description?: string | null, address?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, documentId: string, slug: string, title: string, locale?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, managedObjectCategory?: { __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string } | null };

export type GeneralQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type GeneralQuery = { __typename?: 'Query', navigation: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: NavigationItemType, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null> | null, related?: { __typename: 'Page', title: string, slug: string } | null } | null>, general?: { __typename?: 'General', header?: { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null, socials?: Array<{ __typename?: 'ComponentBlocksSocialItem', title: string, url: string, icon?: Enum_Componentblockssocialitem_Icon | null } | null> | null, address?: { __typename?: 'ComponentGeneralContacts', addressFirstLine?: string | null, address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, contactsPage?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null, footer?: { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null } | null> | null, bottomLinks?: Array<{ __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null> | null } | null, cemeteryOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null };

export type ProceduresQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type ProceduresQuery = { __typename?: 'Query', procedures?: { __typename?: 'Procedure', updatedAt?: any | null, outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null } | null } | null };

export type PartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type PartnersQuery = { __typename?: 'Query', partners: Array<{ __typename?: 'Partner', documentId: string, title: string, link: string, featured?: boolean | null, priority?: number | null, logo: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } } | null> };

export type ReviewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', documentId: string, author: string, date: any, rating: number, description: string } | null> };

export type NewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type NewsQuery = { __typename?: 'Query', articles: Array<{ __typename: 'Article', perex?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null> };

export type ArticleBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
  slug: Scalars['String']['input'];
}>;


export type ArticleBySlugQuery = { __typename?: 'Query', articles: Array<{ __typename: 'Article', content?: string | null, perex?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, mediaGallery: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null> };

export type PageBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
  slug: Scalars['String']['input'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pages: Array<{ __typename: 'Page', layout: Enum_Page_Layout, publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticleJobsListing', id: string } | { __typename: 'ComponentSectionsArticleNewsListing', id: string } | { __typename: 'ComponentSectionsArticlePressListing', id: string } | { __typename: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | { __typename: 'ComponentSectionsAssetsSection', id: string } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename: 'Branch', address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> } | null } | null> | null } | { __typename: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, atMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null> | null } | null, outsideMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null> | null } | null } | { __typename: 'ComponentSectionsBundleListingSimple', id: string, title?: string | null, description?: string | null, bundles: Array<{ __typename: 'Bundle', perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null> } | { __typename: 'ComponentSectionsCemeteriesOpeningHours', id: string, title?: string | null, buttonPosition?: Enum_Componentsectionscemeteriesopeninghours_Buttonposition | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename: 'ComponentSectionsCeremoniesArchiveSection', id: string } | { __typename: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, layout: Enum_Componentsectionscontactgroup_Layout, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null> | null } | { __typename: 'ComponentSectionsDebtorsSection', id: string, description?: string | null } | { __typename: 'ComponentSectionsDisclosuresSection', id: string } | { __typename: 'ComponentSectionsDivider', id: string, color: Enum_Componentsectionsdivider_Color } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null> } | { __typename: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename: 'Page', publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsMapOfManagedObjects', id: string, title?: string | null, categories: Array<{ __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string } | null> } | { __typename: 'ComponentSectionsMapSection', id: string, title?: string | null, categories: Array<{ __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string } | null> } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename: 'ComponentSectionsOpeningHoursSection', id: string, title?: string | null, offices?: Array<{ __typename?: 'ComponentBlocksOfficeItem', office?: { __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null } | null> | null } | { __typename: 'ComponentSectionsProceduresSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsReviewListing', id: string } | { __typename: 'ComponentSectionsRichtext', id: string, content?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename?: 'Error' } | null> | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null> };

export type BranchBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
  slug: Scalars['String']['input'];
}>;


export type BranchBySlugQuery = { __typename?: 'Query', branches: Array<{ __typename: 'Branch', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> } | null> };

export type BranchesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type BranchesQuery = { __typename?: 'Query', branches: Array<{ __typename: 'Branch', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, offices: Array<{ __typename?: 'Office', documentId: string, title: string, branch?: { __typename: 'Branch', documentId: string, slug: string, locale?: string | null, title: string, address?: string | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts: Array<{ __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null> } | null> } | null> };

export type CemeteryBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
  slug: Scalars['String']['input'];
}>;


export type CemeteryBySlugQuery = { __typename?: 'Query', cemeteries: Array<{ __typename: 'Cemetery', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, address?: string | null, documentId: string, title: string, slug: string, locale?: string | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, assets?: { __typename?: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | null, gallery?: { __typename?: 'ComponentSectionsGallery', id: string, title?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null> } | null, video?: { __typename?: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string } | null, cemeteryCategory?: { __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string } | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null> };

export type CemeteryCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CemeteryCategoriesQuery = { __typename?: 'Query', cemeteryCategories: Array<{ __typename?: 'CemeteryCategory', documentId: string, title: string, slug: string } | null> };

export type ManagedObjectBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
  slug: Scalars['String']['input'];
}>;


export type ManagedObjectBySlugQuery = { __typename?: 'Query', managedObjects: Array<{ __typename: 'ManagedObject', description?: string | null, address?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, documentId: string, slug: string, title: string, locale?: string | null, medias: Array<{ __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null>, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, managedObjectCategory?: { __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string } | null } | null> };

export type ManagedObjectCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ManagedObjectCategoriesQuery = { __typename?: 'Query', managedObjectCategories: Array<{ __typename?: 'ManagedObjectCategory', documentId: string, title: string, slug: string } | null> };

export type BundleBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
  slug: Scalars['String']['input'];
}>;


export type BundleBySlugQuery = { __typename?: 'Query', bundles: Array<{ __typename: 'Bundle', description?: string | null, perex?: string | null, price: number, discountTextShort?: string | null, discountText?: string | null, documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null, additionalServices?: Array<{ __typename?: 'ComponentBlocksAccordionItemWithPrice', id: string, title: string, description?: string | null } | null> | null, assets?: { __typename?: 'ComponentSectionsAssetGroup', id: string, title?: string | null, assets?: Array<{ __typename?: 'ComponentBlocksAssetItem', asset?: { __typename: 'Asset', publishedAt?: any | null, documentId: string, title: string, slug: string, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, contact?: { __typename?: 'Contact', documentId: string, title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null> };

export type AssetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type AssetBySlugQuery = { __typename?: 'Query', assets: Array<{ __typename: 'Asset', description?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, file: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null }, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null> };

export type ArticlesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type ArticlesStaticPathsQuery = { __typename?: 'Query', articles: Array<{ __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null> };

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type PagesStaticPathsQuery = { __typename?: 'Query', pages: Array<{ __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null> };

export type BranchesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type BranchesStaticPathsQuery = { __typename?: 'Query', branches: Array<{ __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null> };

export type BundlesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type BundlesStaticPathsQuery = { __typename?: 'Query', bundles: Array<{ __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null> };

export type CemeteriesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type CemeteriesStaticPathsQuery = { __typename?: 'Query', cemeteries: Array<{ __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null> };

export type ManagedObjectsStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type ManagedObjectsStaticPathsQuery = { __typename?: 'Query', managedObjects: Array<{ __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null> };

export type AssetsStaticPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssetsStaticPathsQuery = { __typename?: 'Query', assets: Array<{ __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null> };

export type HomePageQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type HomePageQuery = { __typename?: 'Query', homePage?: { __typename?: 'HomePage', featured: Array<{ __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, image?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsArticlesManualListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, articles?: Array<{ __typename?: 'ComponentBlocksArticleItem', article?: { __typename: 'Article', perex?: string | null, publishedAt?: any | null, documentId: string, title: string, slug: string, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null } | null> | null } | { __typename: 'ComponentSectionsCtaSection', id: string, title?: string | null, ctas?: Array<{ __typename?: 'ComponentBlocksSimpleCtaItem', id: string, title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsHomepageReviewsSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, reviews: Array<{ __typename?: 'Review', documentId: string, author: string, date: any, rating: number, description: string } | null> } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename: 'Page', publishedAt?: any | null, perex?: string | null, documentId: string, title: string, slug: string, locale?: string | null, coverMedia?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename: 'ComponentSectionsProceduresShortSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename: 'ComponentSectionsUpcomingCeremoniesSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url?: string | null, page?: { __typename: 'Page', documentId: string, title: string, slug: string, locale?: string | null } | null, article?: { __typename: 'Article', documentId: string, title: string, slug: string, newsCategory?: { __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null, pressCategory?: { __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null, jobsCategory?: { __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null } | null, bundle?: { __typename: 'Bundle', documentId: string, title: string, slug: string, type: Enum_Bundle_Type, locale?: string | null } | null, branch?: { __typename: 'Branch', documentId: string, title: string, slug: string, locale?: string | null } | null, asset?: { __typename: 'Asset', documentId: string, title: string, slug: string, assetCategory?: { __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null } | null, cemetery?: { __typename: 'Cemetery', documentId: string, title: string, slug: string, locale?: string | null } | null, managedObject?: { __typename: 'ManagedObject', documentId: string, slug: string, title: string, locale?: string | null } | null } | null } | { __typename?: 'Error' } | null> | null } | null, procedures?: { __typename?: 'Procedure', updatedAt?: any | null, outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFile', documentId: string, url: string, name: string, size: number, ext?: string | null } | null } | null } | null };

export type HomepageCeremoniesQueryVariables = Exact<{
  dateTime: Scalars['DateTime']['input'];
}>;


export type HomepageCeremoniesQuery = { __typename?: 'Query', ceremonies: Array<{ __typename?: 'Ceremony', documentId: string, dateTime: any, name?: string | null, consentForPrivateFields?: boolean | null, cemeteryNameIfOutsideMarianum?: string | null, cemetery?: { __typename?: 'Cemetery', slug: string, title: string, localizations: Array<{ __typename?: 'Cemetery', slug: string, title: string } | null> } | null } | null> };

export type CeremoniesQueryVariables = Exact<{
  dateTime: Scalars['DateTime']['input'];
  cemeteryIdFilter?: InputMaybe<IdFilterInput>;
}>;


export type CeremoniesQuery = { __typename?: 'Query', ceremonies: Array<{ __typename?: 'Ceremony', documentId: string, dateTime: any, name?: string | null, birthYear?: string | null, type?: string | null, company?: string | null, officiantProvidedBy?: string | null, consentForPrivateFields?: boolean | null, cemeteryNameIfOutsideMarianum?: string | null, cemetery?: { __typename?: 'Cemetery', title: string, slug: string, localizations: Array<{ __typename?: 'Cemetery', title: string, slug: string, locale?: string | null } | null> } | null } | null> };

export type CemeteriesInCeremoniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CemeteriesInCeremoniesQuery = { __typename?: 'Query', cemeteries: Array<{ __typename: 'Cemetery', documentId: string, title: string, localizations: Array<{ __typename?: 'Cemetery', title: string, locale?: string | null } | null> } | null> };

export type CemeteriesInDebtorsQueryVariables = Exact<{ [key: string]: never; }>;


export type CemeteriesInDebtorsQuery = { __typename?: 'Query', cemeteries: Array<{ __typename: 'Cemetery', documentId: string, title: string, localizations: Array<{ __typename?: 'Cemetery', title: string, locale?: string | null } | null> } | null> };

export type AssetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AssetCategoriesQuery = { __typename?: 'Query', assetCategories: Array<{ __typename?: 'AssetCategory', documentId: string, title: string, slug: string } | null> };

export type ArticleNewsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticleNewsCategoriesQuery = { __typename?: 'Query', articleNewsCategories: Array<{ __typename?: 'ArticleNewsCategory', documentId: string, title: string, slug: string } | null> };

export type ArticlePressCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlePressCategoriesQuery = { __typename?: 'Query', articlePressCategories: Array<{ __typename?: 'ArticlePressCategory', documentId: string, title: string, slug: string } | null> };

export type ArticleJobsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticleJobsCategoriesQuery = { __typename?: 'Query', articleJobsCategories: Array<{ __typename?: 'ArticleJobsCategory', documentId: string, title: string, slug: string } | null> };

export type AssetFileTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type AssetFileTypesQuery = { __typename?: 'Query', assetFileTypes?: Array<string | null> | null };

export const FlatNavigationItemFragmentDoc = gql`
    fragment FlatNavigationItem on NavigationItem {
  id
  title
  path
  type
  related {
    __typename
    ... on Page {
      title
      slug
    }
  }
}
    `;
export const NavigationItemFragmentDoc = gql`
    fragment NavigationItem on NavigationItem {
  ...FlatNavigationItem
  items {
    ...FlatNavigationItem
    items {
      ...FlatNavigationItem
      items {
        ...FlatNavigationItem
        items {
          ...FlatNavigationItem
        }
      }
    }
  }
}
    ${FlatNavigationItemFragmentDoc}`;
export const PageSlugEntityFragmentDoc = gql`
    fragment PageSlugEntity on Page {
  __typename
  documentId
  title
  slug
  locale
}
    `;
export const ArticleNewsCategoryEntityFragmentDoc = gql`
    fragment ArticleNewsCategoryEntity on ArticleNewsCategory {
  documentId
  title
  slug
}
    `;
export const ArticlePressCategoryEntityFragmentDoc = gql`
    fragment ArticlePressCategoryEntity on ArticlePressCategory {
  documentId
  title
  slug
}
    `;
export const ArticleJobsCategoryEntityFragmentDoc = gql`
    fragment ArticleJobsCategoryEntity on ArticleJobsCategory {
  documentId
  title
  slug
}
    `;
export const ArticleSlugEntityFragmentDoc = gql`
    fragment ArticleSlugEntity on Article {
  __typename
  documentId
  title
  slug
  newsCategory {
    ...ArticleNewsCategoryEntity
  }
  pressCategory {
    ...ArticlePressCategoryEntity
  }
  jobsCategory {
    ...ArticleJobsCategoryEntity
  }
}
    ${ArticleNewsCategoryEntityFragmentDoc}
${ArticlePressCategoryEntityFragmentDoc}
${ArticleJobsCategoryEntityFragmentDoc}`;
export const BundleSlugEntityFragmentDoc = gql`
    fragment BundleSlugEntity on Bundle {
  __typename
  documentId
  title
  slug
  type
  locale
}
    `;
export const BranchSlugEntityFragmentDoc = gql`
    fragment BranchSlugEntity on Branch {
  __typename
  documentId
  title
  slug
  locale
}
    `;
export const AssetCategoryEntityFragmentDoc = gql`
    fragment AssetCategoryEntity on AssetCategory {
  documentId
  title
  slug
}
    `;
export const AssetSlugEntityFragmentDoc = gql`
    fragment AssetSlugEntity on Asset {
  __typename
  documentId
  title
  slug
  assetCategory {
    ...AssetCategoryEntity
  }
}
    ${AssetCategoryEntityFragmentDoc}`;
export const CemeterySlugEntityFragmentDoc = gql`
    fragment CemeterySlugEntity on Cemetery {
  __typename
  documentId
  title
  slug
  locale
}
    `;
export const ManagedObjectSlugEntityFragmentDoc = gql`
    fragment ManagedObjectSlugEntity on ManagedObject {
  __typename
  documentId
  slug
  title
  locale
}
    `;
export const CtaButtonFragmentDoc = gql`
    fragment CtaButton on ComponentBlocksButtonLink {
  label
  url
  page {
    ...PageSlugEntity
  }
  article {
    ...ArticleSlugEntity
  }
  bundle {
    ...BundleSlugEntity
  }
  branch {
    ...BranchSlugEntity
  }
  asset {
    ...AssetSlugEntity
  }
  cemetery {
    ...CemeterySlugEntity
  }
  managedObject {
    ...ManagedObjectSlugEntity
  }
}
    ${PageSlugEntityFragmentDoc}
${ArticleSlugEntityFragmentDoc}
${BundleSlugEntityFragmentDoc}
${BranchSlugEntityFragmentDoc}
${AssetSlugEntityFragmentDoc}
${CemeterySlugEntityFragmentDoc}
${ManagedObjectSlugEntityFragmentDoc}`;
export const UploadImageEntityFragmentDoc = gql`
    fragment UploadImageEntity on UploadFile {
  documentId
  url
  name
  alternativeText
  caption
  size
  width
  height
}
    `;
export const CtaFragmentDoc = gql`
    fragment Cta on ComponentBlocksCta {
  title
  description
  button {
    ...CtaButton
  }
  image {
    ...UploadImageEntity
  }
}
    ${CtaButtonFragmentDoc}
${UploadImageEntityFragmentDoc}`;
export const ArticleCardEntityFragmentDoc = gql`
    fragment ArticleCardEntity on Article {
  ...ArticleSlugEntity
  perex
  publishedAt
  coverMedia {
    ...UploadImageEntity
  }
}
    ${ArticleSlugEntityFragmentDoc}
${UploadImageEntityFragmentDoc}`;
export const ArticlesManualListingFragmentDoc = gql`
    fragment ArticlesManualListing on ComponentSectionsArticlesManualListing {
  id
  title
  showMoreButton {
    ...CtaButton
  }
  articles {
    article {
      ...ArticleCardEntity
    }
  }
}
    ${CtaButtonFragmentDoc}
${ArticleCardEntityFragmentDoc}`;
export const CtaSectionFragmentDoc = gql`
    fragment CtaSection on ComponentSectionsCtaSection {
  id
  title
  ctas {
    id
    title
    description
    button {
      ...CtaButton
    }
  }
}
    ${CtaButtonFragmentDoc}`;
export const ProceduresShortSectionFragmentDoc = gql`
    fragment ProceduresShortSection on ComponentSectionsProceduresShortSection {
  id
  title
  showMoreButton {
    ...CtaButton
  }
}
    ${CtaButtonFragmentDoc}`;
export const UpcomingCeremoniesSectionFragmentDoc = gql`
    fragment UpcomingCeremoniesSection on ComponentSectionsUpcomingCeremoniesSection {
  id
  title
  showMoreButton {
    ...CtaButton
  }
}
    ${CtaButtonFragmentDoc}`;
export const ReviewEntityFragmentDoc = gql`
    fragment ReviewEntity on Review {
  documentId
  author
  date
  rating
  description
}
    `;
export const HomepageReviewsSectionFragmentDoc = gql`
    fragment HomepageReviewsSection on ComponentSectionsHomepageReviewsSection {
  id
  title
  showMoreButton {
    ...CtaButton
  }
  reviews {
    ...ReviewEntity
  }
}
    ${CtaButtonFragmentDoc}
${ReviewEntityFragmentDoc}`;
export const SeoFragmentDoc = gql`
    fragment Seo on ComponentGeneralSeo {
  metaTitle
  metaDescription
  keywords
}
    `;
export const ArticleEntityFragmentDoc = gql`
    fragment ArticleEntity on Article {
  ...ArticleCardEntity
  content
  mediaGallery(pagination: {limit: -1}) {
    ...UploadImageEntity
  }
  seo {
    ...Seo
  }
}
    ${ArticleCardEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${SeoFragmentDoc}`;
export const BranchOfficeEntityFragmentDoc = gql`
    fragment BranchOfficeEntity on Branch {
  __typename
  documentId
  slug
  locale
  title
  address
}
    `;
export const ContactEntityFragmentDoc = gql`
    fragment ContactEntity on Contact {
  documentId
  title
  position
  email
  phone1
  phone2
}
    `;
export const OfficeEntityFragmentDoc = gql`
    fragment OfficeEntity on Office {
  documentId
  title
  branch {
    ...BranchOfficeEntity
  }
  openingHours {
    days {
      label
      time
    }
  }
  contacts {
    ...ContactEntity
  }
}
    ${BranchOfficeEntityFragmentDoc}
${ContactEntityFragmentDoc}`;
export const BranchCardEntityFragmentDoc = gql`
    fragment BranchCardEntity on Branch {
  ...BranchSlugEntity
  address
  offices {
    ...OfficeEntity
  }
}
    ${BranchSlugEntityFragmentDoc}
${OfficeEntityFragmentDoc}`;
export const BranchEntityFragmentDoc = gql`
    fragment BranchEntity on Branch {
  ...BranchCardEntity
  description
  contact {
    ...ContactEntity
  }
  medias(pagination: {limit: -1}) {
    ...UploadImageEntity
  }
  navigateToLink
  latitude
  longitude
  seo {
    ...Seo
  }
}
    ${BranchCardEntityFragmentDoc}
${ContactEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${SeoFragmentDoc}`;
export const OpeningHoursFragmentDoc = gql`
    fragment OpeningHours on ComponentBlocksOpeningHoursUniversal {
  days {
    label
    time
  }
}
    `;
export const CemeteryCardEntityFragmentDoc = gql`
    fragment CemeteryCardEntity on Cemetery {
  ...CemeterySlugEntity
  address
  overrideOpeningHours {
    ...OpeningHours
  }
}
    ${CemeterySlugEntityFragmentDoc}
${OpeningHoursFragmentDoc}`;
export const UploadFileEntityFragmentDoc = gql`
    fragment UploadFileEntity on UploadFile {
  documentId
  url
  name
  size
  ext
}
    `;
export const AssetCardEntityFragmentDoc = gql`
    fragment AssetCardEntity on Asset {
  ...AssetSlugEntity
  publishedAt
  file {
    ...UploadFileEntity
  }
}
    ${AssetSlugEntityFragmentDoc}
${UploadFileEntityFragmentDoc}`;
export const AssetGroupFragmentDoc = gql`
    fragment AssetGroup on ComponentSectionsAssetGroup {
  id
  title
  assets {
    asset {
      ...AssetCardEntity
    }
  }
}
    ${AssetCardEntityFragmentDoc}`;
export const GallerySectionFragmentDoc = gql`
    fragment GallerySection on ComponentSectionsGallery {
  id
  title
  medias(pagination: {limit: -1}) {
    ...UploadImageEntity
  }
}
    ${UploadImageEntityFragmentDoc}`;
export const IframeSectionFragmentDoc = gql`
    fragment IframeSection on ComponentSectionsIframeSection {
  id
  title
  iframeTitle
  body
  url
}
    `;
export const CemeteryCategoryEntityFragmentDoc = gql`
    fragment CemeteryCategoryEntity on CemeteryCategory {
  documentId
  title
  slug
}
    `;
export const CemeteryEntityFragmentDoc = gql`
    fragment CemeteryEntity on Cemetery {
  ...CemeteryCardEntity
  description
  contact {
    ...ContactEntity
  }
  medias(pagination: {limit: -1}) {
    ...UploadImageEntity
  }
  navigateToLink
  latitude
  longitude
  seo {
    ...Seo
  }
  assets {
    ...AssetGroup
  }
  gallery {
    ...GallerySection
  }
  video {
    ...IframeSection
  }
  cemeteryCategory {
    ...CemeteryCategoryEntity
  }
}
    ${CemeteryCardEntityFragmentDoc}
${ContactEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${SeoFragmentDoc}
${AssetGroupFragmentDoc}
${GallerySectionFragmentDoc}
${IframeSectionFragmentDoc}
${CemeteryCategoryEntityFragmentDoc}`;
export const CemeteryInCeremoniesDebtorsEntityFragmentDoc = gql`
    fragment CemeteryInCeremoniesDebtorsEntity on Cemetery {
  __typename
  documentId
  title
  localizations {
    title
    locale
  }
}
    `;
export const BundleCardEntityFragmentDoc = gql`
    fragment BundleCardEntity on Bundle {
  ...BundleSlugEntity
  perex
  price
  discountTextShort
  discountText
  coverMedia {
    ...UploadImageEntity
  }
  bundleItems {
    description
  }
  additionalItems {
    description
  }
}
    ${BundleSlugEntityFragmentDoc}
${UploadImageEntityFragmentDoc}`;
export const SidebarFragmentDoc = gql`
    fragment Sidebar on ComponentBlocksSidebar {
  title
  text
  ctaButton {
    ...CtaButton
  }
  contact {
    ...ContactEntity
  }
}
    ${CtaButtonFragmentDoc}
${ContactEntityFragmentDoc}`;
export const BundleEntityFragmentDoc = gql`
    fragment BundleEntity on Bundle {
  ...BundleCardEntity
  description
  additionalServices {
    id
    title
    description
  }
  assets {
    ...AssetGroup
  }
  sidebar {
    ...Sidebar
  }
  seo {
    ...Seo
  }
}
    ${BundleCardEntityFragmentDoc}
${AssetGroupFragmentDoc}
${SidebarFragmentDoc}
${SeoFragmentDoc}`;
export const AssetEntityFragmentDoc = gql`
    fragment AssetEntity on Asset {
  ...AssetCardEntity
  description
  seo {
    ...Seo
  }
}
    ${AssetCardEntityFragmentDoc}
${SeoFragmentDoc}`;
export const HeaderFragmentDoc = gql`
    fragment Header on ComponentGeneralHeader {
  faqPage {
    ...PageSlugEntity
  }
  contact {
    ...ContactEntity
  }
}
    ${PageSlugEntityFragmentDoc}
${ContactEntityFragmentDoc}`;
export const SocialItemFragmentDoc = gql`
    fragment SocialItem on ComponentBlocksSocialItem {
  title
  url
  icon
}
    `;
export const ContactFragmentDoc = gql`
    fragment Contact on ComponentGeneralContacts {
  addressFirstLine
  address
  openingHoursPage {
    ...PageSlugEntity
  }
  contact {
    ...ContactEntity
  }
  contactsPage {
    ...PageSlugEntity
  }
  latitude
  longitude
  navigateToLink
}
    ${PageSlugEntityFragmentDoc}
${ContactEntityFragmentDoc}`;
export const FooterLinkItemFragmentDoc = gql`
    fragment FooterLinkItem on ComponentGeneralLinkItem {
  id
  label
  page {
    ...PageSlugEntity
  }
  url
  targetBlank
}
    ${PageSlugEntityFragmentDoc}`;
export const FooterFragmentDoc = gql`
    fragment Footer on ComponentGeneralFooter {
  title1
  links1 {
    ...FooterLinkItem
  }
  title2
  links2 {
    ...FooterLinkItem
  }
  title3
  links3 {
    ...FooterLinkItem
  }
  title4
  links4 {
    ...FooterLinkItem
  }
  bottomLinks {
    ...CtaButton
  }
}
    ${FooterLinkItemFragmentDoc}
${CtaButtonFragmentDoc}`;
export const GeneralEntityFragmentDoc = gql`
    fragment GeneralEntity on General {
  header {
    ...Header
  }
  socials {
    ...SocialItem
  }
  address {
    ...Contact
  }
  footer {
    ...Footer
  }
  cemeteryOpeningHours {
    ...OpeningHours
  }
}
    ${HeaderFragmentDoc}
${SocialItemFragmentDoc}
${ContactFragmentDoc}
${FooterFragmentDoc}
${OpeningHoursFragmentDoc}`;
export const PartnerEntityFragmentDoc = gql`
    fragment PartnerEntity on Partner {
  documentId
  title
  link
  logo {
    ...UploadImageEntity
  }
  featured
  priority
}
    ${UploadImageEntityFragmentDoc}`;
export const PageCardEntityFragmentDoc = gql`
    fragment PageCardEntity on Page {
  ...PageSlugEntity
  publishedAt
  perex
  coverMedia {
    ...UploadImageEntity
  }
}
    ${PageSlugEntityFragmentDoc}
${UploadImageEntityFragmentDoc}`;
export const AccordionGroupFragmentDoc = gql`
    fragment AccordionGroup on ComponentSectionsAccordionGroup {
  id
  title
  accordions {
    id
    title
    content
  }
}
    `;
export const BranchGroupFragmentDoc = gql`
    fragment BranchGroup on ComponentSectionsBranchGroup {
  id
  title
  branches {
    branch {
      ...BranchCardEntity
    }
  }
}
    ${BranchCardEntityFragmentDoc}`;
export const BundleListingFragmentDoc = gql`
    fragment BundleListing on ComponentSectionsBundleListing {
  id
  title
  description
  atMedicalFacility {
    title
    bundles {
      bundle {
        ...BundleCardEntity
      }
    }
  }
  outsideMedicalFacility {
    title
    bundles {
      bundle {
        ...BundleCardEntity
      }
    }
  }
}
    ${BundleCardEntityFragmentDoc}`;
export const BundleListingSimpleFragmentDoc = gql`
    fragment BundleListingSimple on ComponentSectionsBundleListingSimple {
  id
  title
  description
  bundles {
    ...BundleCardEntity
  }
}
    ${BundleCardEntityFragmentDoc}`;
export const ContactGroupFragmentDoc = gql`
    fragment ContactGroup on ComponentSectionsContactGroup {
  id
  title
  layout
  contacts {
    contact {
      ...ContactEntity
    }
  }
}
    ${ContactEntityFragmentDoc}`;
export const MenuListingFragmentDoc = gql`
    fragment MenuListing on ComponentSectionsMenuListing {
  id
  title
  slug
}
    `;
export const ManualListingFragmentDoc = gql`
    fragment ManualListing on ComponentSectionsManualListing {
  id
  title
  style
  showMoreButton {
    ...CtaButton
  }
  pages {
    page {
      ...PageCardEntity
    }
  }
}
    ${CtaButtonFragmentDoc}
${PageCardEntityFragmentDoc}`;
export const NewsListingFragmentDoc = gql`
    fragment NewsListing on ComponentSectionsNewsListing {
  id
  title
  showMoreButton {
    ...CtaButton
  }
}
    ${CtaButtonFragmentDoc}`;
export const MapSectionFragmentDoc = gql`
    fragment MapSection on ComponentSectionsMapSection {
  id
  title
  categories {
    ...CemeteryCategoryEntity
  }
}
    ${CemeteryCategoryEntityFragmentDoc}`;
export const ManagedObjectCategoryEntityFragmentDoc = gql`
    fragment ManagedObjectCategoryEntity on ManagedObjectCategory {
  documentId
  title
  slug
}
    `;
export const MapOfManagedObjectsSectionFragmentDoc = gql`
    fragment MapOfManagedObjectsSection on ComponentSectionsMapOfManagedObjects {
  id
  title
  categories {
    ...ManagedObjectCategoryEntity
  }
}
    ${ManagedObjectCategoryEntityFragmentDoc}`;
export const OpeningHoursSectionFragmentDoc = gql`
    fragment OpeningHoursSection on ComponentSectionsOpeningHoursSection {
  id
  title
  offices {
    office {
      ...OfficeEntity
    }
  }
}
    ${OfficeEntityFragmentDoc}`;
export const CemeteriesOpeningHoursFragmentDoc = gql`
    fragment CemeteriesOpeningHours on ComponentSectionsCemeteriesOpeningHours {
  id
  title
  showMoreButton {
    ...CtaButton
  }
  buttonPosition
}
    ${CtaButtonFragmentDoc}`;
export const RichtextSectionFragmentDoc = gql`
    fragment RichtextSection on ComponentSectionsRichtext {
  id
  content
  button {
    ...CtaButton
  }
}
    ${CtaButtonFragmentDoc}`;
export const CeremoniesSectionFragmentDoc = gql`
    fragment CeremoniesSection on ComponentSectionsCeremoniesSection {
  id
  archive {
    title
    button {
      ...CtaButton
    }
  }
}
    ${CtaButtonFragmentDoc}`;
export const ReviewListingFragmentDoc = gql`
    fragment ReviewListing on ComponentSectionsReviewListing {
  id
}
    `;
export const PageEntityFragmentDoc = gql`
    fragment PageEntity on Page {
  ...PageCardEntity
  layout
  ctaButton {
    ...CtaButton
  }
  sidebar {
    ...Sidebar
  }
  seo {
    ...Seo
  }
  sections {
    ... on ComponentSectionsAccordionGroup {
      __typename
      ...AccordionGroup
    }
    ... on ComponentSectionsBranchGroup {
      __typename
      ...BranchGroup
    }
    ... on ComponentSectionsBundleListing {
      __typename
      ...BundleListing
    }
    ... on ComponentSectionsBundleListingSimple {
      __typename
      ...BundleListingSimple
    }
    ... on ComponentSectionsContactGroup {
      __typename
      ...ContactGroup
    }
    ... on ComponentSectionsDivider {
      __typename
      id
      color
    }
    ... on ComponentSectionsAssetGroup {
      __typename
      ...AssetGroup
    }
    ... on ComponentSectionsGallery {
      __typename
      ...GallerySection
    }
    ... on ComponentSectionsMenuListing {
      __typename
      ...MenuListing
    }
    ... on ComponentSectionsManualListing {
      __typename
      ...ManualListing
    }
    ... on ComponentSectionsNewsListing {
      __typename
      ...NewsListing
    }
    ... on ComponentSectionsMapSection {
      __typename
      ...MapSection
    }
    ... on ComponentSectionsMapOfManagedObjects {
      __typename
      ...MapOfManagedObjectsSection
    }
    ... on ComponentSectionsOpeningHoursSection {
      __typename
      ...OpeningHoursSection
    }
    ... on ComponentSectionsCemeteriesOpeningHours {
      __typename
      ...CemeteriesOpeningHours
    }
    ... on ComponentSectionsRichtext {
      __typename
      ...RichtextSection
    }
    ... on ComponentSectionsProceduresSection {
      __typename
      id
      title
    }
    ... on ComponentSectionsDebtorsSection {
      __typename
      id
      description
    }
    ... on ComponentSectionsCeremoniesSection {
      __typename
      ...CeremoniesSection
    }
    ... on ComponentSectionsCeremoniesArchiveSection {
      __typename
      id
    }
    ... on ComponentSectionsArticleNewsListing {
      __typename
      id
    }
    ... on ComponentSectionsArticlePressListing {
      __typename
      id
    }
    ... on ComponentSectionsArticleJobsListing {
      __typename
      id
    }
    ... on ComponentSectionsReviewListing {
      __typename
      ...ReviewListing
    }
    ... on ComponentSectionsDisclosuresSection {
      __typename
      id
    }
    ... on ComponentSectionsIframeSection {
      __typename
      ...IframeSection
    }
    ... on ComponentSectionsAssetsSection {
      __typename
      id
    }
  }
}
    ${PageCardEntityFragmentDoc}
${CtaButtonFragmentDoc}
${SidebarFragmentDoc}
${SeoFragmentDoc}
${AccordionGroupFragmentDoc}
${BranchGroupFragmentDoc}
${BundleListingFragmentDoc}
${BundleListingSimpleFragmentDoc}
${ContactGroupFragmentDoc}
${AssetGroupFragmentDoc}
${GallerySectionFragmentDoc}
${MenuListingFragmentDoc}
${ManualListingFragmentDoc}
${NewsListingFragmentDoc}
${MapSectionFragmentDoc}
${MapOfManagedObjectsSectionFragmentDoc}
${OpeningHoursSectionFragmentDoc}
${CemeteriesOpeningHoursFragmentDoc}
${RichtextSectionFragmentDoc}
${CeremoniesSectionFragmentDoc}
${ReviewListingFragmentDoc}
${IframeSectionFragmentDoc}`;
export const ProcedureFragmentDoc = gql`
    fragment Procedure on ComponentGeneralProcedure {
  title
  steps {
    id
    title
    description
  }
  downloadFile {
    ...UploadFileEntity
  }
}
    ${UploadFileEntityFragmentDoc}`;
export const ProceduresEntityFragmentDoc = gql`
    fragment ProceduresEntity on Procedure {
  outsideMedicalFacility {
    ...Procedure
  }
  atMedicalFacility {
    ...Procedure
  }
  updatedAt
}
    ${ProcedureFragmentDoc}`;
export const CeremonyEntityFragmentDoc = gql`
    fragment CeremonyEntity on Ceremony {
  documentId
  dateTime
  name
  birthYear
  type
  company
  officiantProvidedBy
  consentForPrivateFields
  cemetery {
    title
    slug
    localizations {
      title
      slug
      locale
    }
  }
  cemeteryNameIfOutsideMarianum
}
    `;
export const HomepageCeremonyEntityFragmentDoc = gql`
    fragment HomepageCeremonyEntity on Ceremony {
  documentId
  dateTime
  name
  consentForPrivateFields
  cemetery {
    slug
    title
    localizations {
      slug
      title
    }
  }
  cemeteryNameIfOutsideMarianum
}
    `;
export const ManagedObjectEntityFragmentDoc = gql`
    fragment ManagedObjectEntity on ManagedObject {
  ...ManagedObjectSlugEntity
  description
  address
  navigateToLink
  latitude
  longitude
  medias(pagination: {limit: -1}) {
    ...UploadImageEntity
  }
  contact {
    ...ContactEntity
  }
  seo {
    ...Seo
  }
  managedObjectCategory {
    ...ManagedObjectCategoryEntity
  }
}
    ${ManagedObjectSlugEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${ContactEntityFragmentDoc}
${SeoFragmentDoc}
${ManagedObjectCategoryEntityFragmentDoc}`;
export const GeneralDocument = gql`
    query General($locale: I18NLocaleCode!) {
  navigation: renderNavigation(
    navigationIdOrSlug: "main-navigation"
    type: TREE
    menuOnly: false
    locale: $locale
  ) {
    ...NavigationItem
  }
  general(locale: $locale) {
    ...GeneralEntity
  }
}
    ${NavigationItemFragmentDoc}
${GeneralEntityFragmentDoc}`;
export const ProceduresDocument = gql`
    query Procedures($locale: I18NLocaleCode!) {
  procedures: procedure(locale: $locale) {
    ...ProceduresEntity
  }
}
    ${ProceduresEntityFragmentDoc}`;
export const PartnersDocument = gql`
    query Partners {
  partners(pagination: {limit: -1}) {
    ...PartnerEntity
  }
}
    ${PartnerEntityFragmentDoc}`;
export const ReviewsDocument = gql`
    query Reviews($locale: I18NLocaleCode!) {
  reviews(locale: $locale, sort: ["date:desc"], pagination: {limit: -1}) {
    ...ReviewEntity
  }
}
    ${ReviewEntityFragmentDoc}`;
export const NewsDocument = gql`
    query News($locale: I18NLocaleCode!) {
  articles(locale: $locale, sort: ["publishedAt:desc"], pagination: {limit: 4}) {
    ...ArticleCardEntity
  }
}
    ${ArticleCardEntityFragmentDoc}`;
export const ArticleBySlugDocument = gql`
    query ArticleBySlug($locale: I18NLocaleCode!, $slug: String!) {
  articles(locale: $locale, filters: {slug: {eq: $slug}}) {
    ...ArticleEntity
  }
}
    ${ArticleEntityFragmentDoc}`;
export const PageBySlugDocument = gql`
    query PageBySlug($locale: I18NLocaleCode!, $slug: String!) {
  pages(locale: $locale, filters: {slug: {eq: $slug}}) {
    ...PageEntity
  }
}
    ${PageEntityFragmentDoc}`;
export const BranchBySlugDocument = gql`
    query BranchBySlug($locale: I18NLocaleCode!, $slug: String!) {
  branches(locale: $locale, filters: {slug: {eq: $slug}}) {
    ...BranchEntity
  }
}
    ${BranchEntityFragmentDoc}`;
export const BranchesDocument = gql`
    query Branches($locale: I18NLocaleCode!) {
  branches(locale: $locale, pagination: {limit: -1}) {
    ...BranchEntity
  }
}
    ${BranchEntityFragmentDoc}`;
export const CemeteryBySlugDocument = gql`
    query CemeteryBySlug($locale: I18NLocaleCode!, $slug: String!) {
  cemeteries(locale: $locale, filters: {slug: {eq: $slug}}) {
    ...CemeteryEntity
  }
}
    ${CemeteryEntityFragmentDoc}`;
export const CemeteryCategoriesDocument = gql`
    query CemeteryCategories {
  cemeteryCategories(pagination: {limit: -1}) {
    ...CemeteryCategoryEntity
  }
}
    ${CemeteryCategoryEntityFragmentDoc}`;
export const ManagedObjectBySlugDocument = gql`
    query ManagedObjectBySlug($locale: I18NLocaleCode!, $slug: String!) {
  managedObjects(locale: $locale, filters: {slug: {eq: $slug}}) {
    ...ManagedObjectEntity
  }
}
    ${ManagedObjectEntityFragmentDoc}`;
export const ManagedObjectCategoriesDocument = gql`
    query ManagedObjectCategories {
  managedObjectCategories(pagination: {limit: -1}) {
    ...ManagedObjectCategoryEntity
  }
}
    ${ManagedObjectCategoryEntityFragmentDoc}`;
export const BundleBySlugDocument = gql`
    query BundleBySlug($locale: I18NLocaleCode!, $slug: String!) {
  bundles(locale: $locale, filters: {slug: {eq: $slug}}) {
    ...BundleEntity
  }
}
    ${BundleEntityFragmentDoc}`;
export const AssetBySlugDocument = gql`
    query AssetBySlug($slug: String!) {
  assets(filters: {slug: {eq: $slug}}) {
    ...AssetEntity
  }
}
    ${AssetEntityFragmentDoc}`;
export const ArticlesStaticPathsDocument = gql`
    query ArticlesStaticPaths($locale: I18NLocaleCode) {
  articles(locale: $locale, pagination: {limit: -1}) {
    ...ArticleSlugEntity
  }
}
    ${ArticleSlugEntityFragmentDoc}`;
export const PagesStaticPathsDocument = gql`
    query PagesStaticPaths($locale: I18NLocaleCode) {
  pages(locale: $locale, pagination: {limit: -1}) {
    ...PageSlugEntity
  }
}
    ${PageSlugEntityFragmentDoc}`;
export const BranchesStaticPathsDocument = gql`
    query BranchesStaticPaths($locale: I18NLocaleCode) {
  branches(locale: $locale, pagination: {limit: -1}) {
    ...BranchSlugEntity
  }
}
    ${BranchSlugEntityFragmentDoc}`;
export const BundlesStaticPathsDocument = gql`
    query BundlesStaticPaths($locale: I18NLocaleCode) {
  bundles(locale: $locale, pagination: {limit: -1}) {
    ...BundleSlugEntity
  }
}
    ${BundleSlugEntityFragmentDoc}`;
export const CemeteriesStaticPathsDocument = gql`
    query CemeteriesStaticPaths($locale: I18NLocaleCode) {
  cemeteries(locale: $locale, pagination: {limit: -1}) {
    ...CemeterySlugEntity
  }
}
    ${CemeterySlugEntityFragmentDoc}`;
export const ManagedObjectsStaticPathsDocument = gql`
    query ManagedObjectsStaticPaths($locale: I18NLocaleCode) {
  managedObjects(locale: $locale, pagination: {limit: -1}) {
    ...ManagedObjectSlugEntity
  }
}
    ${ManagedObjectSlugEntityFragmentDoc}`;
export const AssetsStaticPathsDocument = gql`
    query AssetsStaticPaths {
  assets(pagination: {limit: -1}) {
    ...AssetSlugEntity
  }
}
    ${AssetSlugEntityFragmentDoc}`;
export const HomePageDocument = gql`
    query HomePage($locale: I18NLocaleCode) {
  homePage(locale: $locale) {
    featured {
      ...Cta
    }
    seo {
      ...Seo
    }
    sections {
      ... on ComponentSectionsManualListing {
        __typename
        ...ManualListing
      }
      ... on ComponentSectionsArticlesManualListing {
        __typename
        ...ArticlesManualListing
      }
      ... on ComponentSectionsNewsListing {
        __typename
        ...NewsListing
      }
      ... on ComponentSectionsUpcomingCeremoniesSection {
        __typename
        ...UpcomingCeremoniesSection
      }
      ... on ComponentSectionsProceduresShortSection {
        __typename
        ...ProceduresShortSection
      }
      ... on ComponentSectionsCtaSection {
        __typename
        ...CtaSection
      }
      ... on ComponentSectionsHomepageReviewsSection {
        __typename
        ...HomepageReviewsSection
      }
    }
  }
  procedures: procedure(locale: $locale) {
    ...ProceduresEntity
  }
}
    ${CtaFragmentDoc}
${SeoFragmentDoc}
${ManualListingFragmentDoc}
${ArticlesManualListingFragmentDoc}
${NewsListingFragmentDoc}
${UpcomingCeremoniesSectionFragmentDoc}
${ProceduresShortSectionFragmentDoc}
${CtaSectionFragmentDoc}
${HomepageReviewsSectionFragmentDoc}
${ProceduresEntityFragmentDoc}`;
export const HomepageCeremoniesDocument = gql`
    query HomepageCeremonies($dateTime: DateTime!) {
  ceremonies(
    filters: {dateTime: {gte: $dateTime}}
    sort: ["dateTime:asc"]
    pagination: {limit: 5}
  ) {
    ...HomepageCeremonyEntity
  }
}
    ${HomepageCeremonyEntityFragmentDoc}`;
export const CeremoniesDocument = gql`
    query Ceremonies($dateTime: DateTime!, $cemeteryIdFilter: IDFilterInput = {}) {
  ceremonies(
    pagination: {limit: -1}
    filters: {dateTime: {gte: $dateTime}, cemetery: {documentId: $cemeteryIdFilter}}
    sort: ["dateTime:asc"]
  ) {
    ...CeremonyEntity
  }
}
    ${CeremonyEntityFragmentDoc}`;
export const CemeteriesInCeremoniesDocument = gql`
    query CemeteriesInCeremonies {
  cemeteries(filters: {allowInCeremonies: {eq: true}}, pagination: {limit: -1}) {
    ...CemeteryInCeremoniesDebtorsEntity
  }
}
    ${CemeteryInCeremoniesDebtorsEntityFragmentDoc}`;
export const CemeteriesInDebtorsDocument = gql`
    query CemeteriesInDebtors {
  cemeteries(filters: {allowInDebtors: {eq: true}}, pagination: {limit: -1}) {
    ...CemeteryInCeremoniesDebtorsEntity
  }
}
    ${CemeteryInCeremoniesDebtorsEntityFragmentDoc}`;
export const AssetCategoriesDocument = gql`
    query AssetCategories {
  assetCategories(pagination: {limit: -1}) {
    ...AssetCategoryEntity
  }
}
    ${AssetCategoryEntityFragmentDoc}`;
export const ArticleNewsCategoriesDocument = gql`
    query ArticleNewsCategories {
  articleNewsCategories(pagination: {limit: -1}) {
    ...ArticleNewsCategoryEntity
  }
}
    ${ArticleNewsCategoryEntityFragmentDoc}`;
export const ArticlePressCategoriesDocument = gql`
    query ArticlePressCategories {
  articlePressCategories(pagination: {limit: -1}) {
    ...ArticlePressCategoryEntity
  }
}
    ${ArticlePressCategoryEntityFragmentDoc}`;
export const ArticleJobsCategoriesDocument = gql`
    query ArticleJobsCategories {
  articleJobsCategories(pagination: {limit: -1}) {
    ...ArticleJobsCategoryEntity
  }
}
    ${ArticleJobsCategoryEntityFragmentDoc}`;
export const AssetFileTypesDocument = gql`
    query AssetFileTypes {
  assetFileTypes
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    General(variables: GeneralQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GeneralQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GeneralQuery>(GeneralDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'General', 'query', variables);
    },
    Procedures(variables: ProceduresQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProceduresQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProceduresQuery>(ProceduresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Procedures', 'query', variables);
    },
    Partners(variables?: PartnersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PartnersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartnersQuery>(PartnersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Partners', 'query', variables);
    },
    Reviews(variables: ReviewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ReviewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReviewsQuery>(ReviewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Reviews', 'query', variables);
    },
    News(variables: NewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewsQuery>(NewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'News', 'query', variables);
    },
    ArticleBySlug(variables: ArticleBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ArticleBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleBySlugQuery>(ArticleBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticleBySlug', 'query', variables);
    },
    PageBySlug(variables: PageBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PageBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBySlugQuery>(PageBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PageBySlug', 'query', variables);
    },
    BranchBySlug(variables: BranchBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BranchBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchBySlugQuery>(BranchBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BranchBySlug', 'query', variables);
    },
    Branches(variables: BranchesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BranchesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchesQuery>(BranchesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Branches', 'query', variables);
    },
    CemeteryBySlug(variables: CemeteryBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CemeteryBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteryBySlugQuery>(CemeteryBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteryBySlug', 'query', variables);
    },
    CemeteryCategories(variables?: CemeteryCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CemeteryCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteryCategoriesQuery>(CemeteryCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteryCategories', 'query', variables);
    },
    ManagedObjectBySlug(variables: ManagedObjectBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ManagedObjectBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ManagedObjectBySlugQuery>(ManagedObjectBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ManagedObjectBySlug', 'query', variables);
    },
    ManagedObjectCategories(variables?: ManagedObjectCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ManagedObjectCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ManagedObjectCategoriesQuery>(ManagedObjectCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ManagedObjectCategories', 'query', variables);
    },
    BundleBySlug(variables: BundleBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BundleBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BundleBySlugQuery>(BundleBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BundleBySlug', 'query', variables);
    },
    AssetBySlug(variables: AssetBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssetBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssetBySlugQuery>(AssetBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AssetBySlug', 'query', variables);
    },
    ArticlesStaticPaths(variables?: ArticlesStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ArticlesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticlesStaticPathsQuery>(ArticlesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticlesStaticPaths', 'query', variables);
    },
    PagesStaticPaths(variables?: PagesStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PagesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesStaticPaths', 'query', variables);
    },
    BranchesStaticPaths(variables?: BranchesStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BranchesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchesStaticPathsQuery>(BranchesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BranchesStaticPaths', 'query', variables);
    },
    BundlesStaticPaths(variables?: BundlesStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BundlesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BundlesStaticPathsQuery>(BundlesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BundlesStaticPaths', 'query', variables);
    },
    CemeteriesStaticPaths(variables?: CemeteriesStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CemeteriesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesStaticPathsQuery>(CemeteriesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteriesStaticPaths', 'query', variables);
    },
    ManagedObjectsStaticPaths(variables?: ManagedObjectsStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ManagedObjectsStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ManagedObjectsStaticPathsQuery>(ManagedObjectsStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ManagedObjectsStaticPaths', 'query', variables);
    },
    AssetsStaticPaths(variables?: AssetsStaticPathsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssetsStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssetsStaticPathsQuery>(AssetsStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AssetsStaticPaths', 'query', variables);
    },
    HomePage(variables?: HomePageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<HomePageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomePageQuery>(HomePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomePage', 'query', variables);
    },
    HomepageCeremonies(variables: HomepageCeremoniesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<HomepageCeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomepageCeremoniesQuery>(HomepageCeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomepageCeremonies', 'query', variables);
    },
    Ceremonies(variables: CeremoniesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CeremoniesQuery>(CeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Ceremonies', 'query', variables);
    },
    CemeteriesInCeremonies(variables?: CemeteriesInCeremoniesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CemeteriesInCeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesInCeremoniesQuery>(CemeteriesInCeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteriesInCeremonies', 'query', variables);
    },
    CemeteriesInDebtors(variables?: CemeteriesInDebtorsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CemeteriesInDebtorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesInDebtorsQuery>(CemeteriesInDebtorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteriesInDebtors', 'query', variables);
    },
    AssetCategories(variables?: AssetCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssetCategoriesQuery>(AssetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AssetCategories', 'query', variables);
    },
    ArticleNewsCategories(variables?: ArticleNewsCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ArticleNewsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleNewsCategoriesQuery>(ArticleNewsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticleNewsCategories', 'query', variables);
    },
    ArticlePressCategories(variables?: ArticlePressCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ArticlePressCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticlePressCategoriesQuery>(ArticlePressCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticlePressCategories', 'query', variables);
    },
    ArticleJobsCategories(variables?: ArticleJobsCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ArticleJobsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleJobsCategoriesQuery>(ArticleJobsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticleJobsCategories', 'query', variables);
    },
    AssetFileTypes(variables?: AssetFileTypesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssetFileTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssetFileTypesQuery>(AssetFileTypesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AssetFileTypes', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;