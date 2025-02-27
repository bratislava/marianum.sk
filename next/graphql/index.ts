import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  HomePageSectionsDynamicZoneInput: any;
  I18NLocaleCode: any;
  JSON: any;
  PageSectionsDynamicZoneInput: any;
  Upload: any;
};

export type Application = {
  __typename?: 'Application';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ApplicationEntity = {
  __typename?: 'ApplicationEntity';
  attributes?: Maybe<Application>;
  id?: Maybe<Scalars['ID']>;
};

export type ApplicationEntityResponse = {
  __typename?: 'ApplicationEntityResponse';
  data?: Maybe<ApplicationEntity>;
};

export type ApplicationEntityResponseCollection = {
  __typename?: 'ApplicationEntityResponseCollection';
  data: Array<ApplicationEntity>;
  meta: ResponseCollectionMeta;
};

export type ApplicationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ApplicationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  data?: InputMaybe<JsonFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ApplicationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ApplicationFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ApplicationInput = {
  data?: InputMaybe<Scalars['JSON']>;
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Scalars['String']>;
  coverMedia?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  jobsCategory?: Maybe<ArticleJobsCategoryEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ArticleRelationResponseCollection>;
  mediaGallery?: Maybe<UploadFileRelationResponseCollection>;
  newsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  perex?: Maybe<Scalars['String']>;
  pressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ArticleLocalizationsArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ArticleMediaGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticleEntity = {
  __typename?: 'ArticleEntity';
  attributes?: Maybe<Article>;
  id?: Maybe<Scalars['ID']>;
};

export type ArticleEntityResponse = {
  __typename?: 'ArticleEntityResponse';
  data?: Maybe<ArticleEntity>;
};

export type ArticleEntityResponseCollection = {
  __typename?: 'ArticleEntityResponseCollection';
  data: Array<ArticleEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
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
  content?: InputMaybe<Scalars['String']>;
  coverMedia?: InputMaybe<Scalars['ID']>;
  jobsCategory?: InputMaybe<Scalars['ID']>;
  mediaGallery?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  newsCategory?: InputMaybe<Scalars['ID']>;
  perex?: InputMaybe<Scalars['String']>;
  pressCategory?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ArticleJobsCategory = {
  __typename?: 'ArticleJobsCategory';
  articles?: Maybe<ArticleRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ArticleJobsCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticleJobsCategoryEntity = {
  __typename?: 'ArticleJobsCategoryEntity';
  attributes?: Maybe<ArticleJobsCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type ArticleJobsCategoryEntityResponse = {
  __typename?: 'ArticleJobsCategoryEntityResponse';
  data?: Maybe<ArticleJobsCategoryEntity>;
};

export type ArticleJobsCategoryEntityResponseCollection = {
  __typename?: 'ArticleJobsCategoryEntityResponseCollection';
  data: Array<ArticleJobsCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticleJobsCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleJobsCategoryFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticleJobsCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleJobsCategoryFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleJobsCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ArticleNewsCategory = {
  __typename?: 'ArticleNewsCategory';
  articles?: Maybe<ArticleRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ArticleNewsCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticleNewsCategoryEntity = {
  __typename?: 'ArticleNewsCategoryEntity';
  attributes?: Maybe<ArticleNewsCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type ArticleNewsCategoryEntityResponse = {
  __typename?: 'ArticleNewsCategoryEntityResponse';
  data?: Maybe<ArticleNewsCategoryEntity>;
};

export type ArticleNewsCategoryEntityResponseCollection = {
  __typename?: 'ArticleNewsCategoryEntityResponseCollection';
  data: Array<ArticleNewsCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticleNewsCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleNewsCategoryFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticleNewsCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleNewsCategoryFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleNewsCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ArticlePressCategory = {
  __typename?: 'ArticlePressCategory';
  articles?: Maybe<ArticleRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ArticlePressCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticlePressCategoryEntity = {
  __typename?: 'ArticlePressCategoryEntity';
  attributes?: Maybe<ArticlePressCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type ArticlePressCategoryEntityResponse = {
  __typename?: 'ArticlePressCategoryEntityResponse';
  data?: Maybe<ArticlePressCategoryEntity>;
};

export type ArticlePressCategoryEntityResponseCollection = {
  __typename?: 'ArticlePressCategoryEntityResponseCollection';
  data: Array<ArticlePressCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticlePressCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticlePressCategoryFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticlePressCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticlePressCategoryFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticlePressCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ArticleRelationResponseCollection = {
  __typename?: 'ArticleRelationResponseCollection';
  data: Array<ArticleEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  nei?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Branch = {
  __typename?: 'Branch';
  address?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<BranchRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']>;
  medias?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']>;
  offices?: Maybe<OfficeRelationResponseCollection>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type BranchLocalizationsArgs = {
  filters?: InputMaybe<BranchFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type BranchMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type BranchOfficesArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BranchEntity = {
  __typename?: 'BranchEntity';
  attributes?: Maybe<Branch>;
  id?: Maybe<Scalars['ID']>;
};

export type BranchEntityResponse = {
  __typename?: 'BranchEntityResponse';
  data?: Maybe<BranchEntity>;
};

export type BranchEntityResponseCollection = {
  __typename?: 'BranchEntityResponseCollection';
  data: Array<BranchEntity>;
  meta: ResponseCollectionMeta;
};

export type BranchFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BranchFiltersInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<BranchFiltersInput>;
  offices?: InputMaybe<OfficeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BranchInput = {
  address?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  navigateToLink?: InputMaybe<Scalars['String']>;
  offices?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BranchRelationResponseCollection = {
  __typename?: 'BranchRelationResponseCollection';
  data: Array<BranchEntity>;
};

export type Bundle = {
  __typename?: 'Bundle';
  additionalItems?: Maybe<Array<Maybe<ComponentBlocksBundleContentItem>>>;
  additionalServices?: Maybe<Array<Maybe<ComponentBlocksAccordionItemWithPrice>>>;
  bundleItems?: Maybe<Array<Maybe<ComponentBlocksBundleContentItem>>>;
  coverMedia?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  discountText?: Maybe<Scalars['String']>;
  discountTextShort?: Maybe<Scalars['String']>;
  documents?: Maybe<ComponentSectionsDocumentGroup>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<BundleRelationResponseCollection>;
  perex?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<ComponentGeneralSeo>;
  sidebar?: Maybe<ComponentBlocksSidebar>;
  slug: Scalars['String'];
  title: Scalars['String'];
  type: Enum_Bundle_Type;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type BundleAdditionalItemsArgs = {
  filters?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type BundleAdditionalServicesArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type BundleBundleItemsArgs = {
  filters?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type BundleLocalizationsArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BundleEntity = {
  __typename?: 'BundleEntity';
  attributes?: Maybe<Bundle>;
  id?: Maybe<Scalars['ID']>;
};

export type BundleEntityResponse = {
  __typename?: 'BundleEntityResponse';
  data?: Maybe<BundleEntity>;
};

export type BundleEntityResponseCollection = {
  __typename?: 'BundleEntityResponseCollection';
  data: Array<BundleEntity>;
  meta: ResponseCollectionMeta;
};

export type BundleFiltersInput = {
  additionalItems?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  additionalServices?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<BundleFiltersInput>>>;
  bundleItems?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  discountText?: InputMaybe<StringFilterInput>;
  discountTextShort?: InputMaybe<StringFilterInput>;
  documents?: InputMaybe<ComponentSectionsDocumentGroupFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
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
  bundleItems?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemInput>>>;
  coverMedia?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  discountText?: InputMaybe<Scalars['String']>;
  discountTextShort?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<ComponentSectionsDocumentGroupInput>;
  perex?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Bundle_Type>;
};

export type BundleRelationResponseCollection = {
  __typename?: 'BundleRelationResponseCollection';
  data: Array<BundleEntity>;
};

export type Cemetery = {
  __typename?: 'Cemetery';
  address?: Maybe<Scalars['String']>;
  allowInCeremonies: Scalars['Boolean'];
  allowInDebtors: Scalars['Boolean'];
  contact?: Maybe<ContactEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CemeteryRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']>;
  medias?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']>;
  overrideOpeningHours?: Maybe<ComponentBlocksOpeningHoursUniversal>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String'];
  title: Scalars['String'];
  type?: Maybe<Enum_Cemetery_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CemeteryLocalizationsArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CemeteryMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CemeteryEntity = {
  __typename?: 'CemeteryEntity';
  attributes?: Maybe<Cemetery>;
  id?: Maybe<Scalars['ID']>;
};

export type CemeteryEntityResponse = {
  __typename?: 'CemeteryEntityResponse';
  data?: Maybe<CemeteryEntity>;
};

export type CemeteryEntityResponseCollection = {
  __typename?: 'CemeteryEntityResponseCollection';
  data: Array<CemeteryEntity>;
  meta: ResponseCollectionMeta;
};

export type CemeteryFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  allowInCeremonies?: InputMaybe<BooleanFilterInput>;
  allowInDebtors?: InputMaybe<BooleanFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CemeteryFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CemeteryFiltersInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CemeteryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CemeteryFiltersInput>>>;
  overrideOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CemeteryInput = {
  address?: InputMaybe<Scalars['String']>;
  allowInCeremonies?: InputMaybe<Scalars['Boolean']>;
  allowInDebtors?: InputMaybe<Scalars['Boolean']>;
  contact?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  navigateToLink?: InputMaybe<Scalars['String']>;
  overrideOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalInput>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Cemetery_Type>;
};

export type CemeteryRelationResponseCollection = {
  __typename?: 'CemeteryRelationResponseCollection';
  data: Array<CemeteryEntity>;
};

export type Ceremony = {
  __typename?: 'Ceremony';
  birthYear?: Maybe<Scalars['String']>;
  cemetery?: Maybe<CemeteryEntityResponse>;
  company?: Maybe<Scalars['String']>;
  consentForPrivateFields?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dateTime: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  officiantProvidedBy?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CeremonyEntity = {
  __typename?: 'CeremonyEntity';
  attributes?: Maybe<Ceremony>;
  id?: Maybe<Scalars['ID']>;
};

export type CeremonyEntityResponse = {
  __typename?: 'CeremonyEntityResponse';
  data?: Maybe<CeremonyEntity>;
};

export type CeremonyEntityResponseCollection = {
  __typename?: 'CeremonyEntityResponseCollection';
  data: Array<CeremonyEntity>;
  meta: ResponseCollectionMeta;
};

export type CeremonyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CeremonyFiltersInput>>>;
  birthYear?: InputMaybe<StringFilterInput>;
  cemetery?: InputMaybe<CemeteryFiltersInput>;
  company?: InputMaybe<StringFilterInput>;
  consentForPrivateFields?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateTime?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  importId?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CeremonyFiltersInput>;
  officiantProvidedBy?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<CeremonyFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CeremonyInput = {
  birthYear?: InputMaybe<Scalars['String']>;
  cemetery?: InputMaybe<Scalars['ID']>;
  company?: InputMaybe<Scalars['String']>;
  consentForPrivateFields?: InputMaybe<Scalars['Boolean']>;
  dateTime?: InputMaybe<Scalars['DateTime']>;
  importId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  officiantProvidedBy?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksAccordionItem = {
  __typename?: 'ComponentBlocksAccordionItem';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksAccordionItemWithPrice = {
  __typename?: 'ComponentBlocksAccordionItemWithPrice';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  price?: Maybe<Scalars['Float']>;
  title: Scalars['String'];
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
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  price?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksArticleItem = {
  __typename?: 'ComponentBlocksArticleItem';
  article?: Maybe<ArticleEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentBlocksArticleItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksArticleItemFiltersInput>>>;
  article?: InputMaybe<ArticleFiltersInput>;
  not?: InputMaybe<ComponentBlocksArticleItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksArticleItemFiltersInput>>>;
};

export type ComponentBlocksBlocksCeremonyArchiveBlock = {
  __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock';
  button?: Maybe<ComponentBlocksButtonLink>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksBranchItem = {
  __typename?: 'ComponentBlocksBranchItem';
  branch?: Maybe<BranchEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentBlocksBranchItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>;
  branch?: InputMaybe<BranchFiltersInput>;
  not?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBranchItemFiltersInput>>>;
};

export type ComponentBlocksBundleContentItem = {
  __typename?: 'ComponentBlocksBundleContentItem';
  description: Scalars['String'];
  id: Scalars['ID'];
};

export type ComponentBlocksBundleContentItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemFiltersInput>>>;
};

export type ComponentBlocksBundleContentItemInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksBundleGroup = {
  __typename?: 'ComponentBlocksBundleGroup';
  bundles?: Maybe<Array<Maybe<ComponentBlocksBundleItem>>>;
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type ComponentBlocksBundleGroupBundlesArgs = {
  filters?: InputMaybe<ComponentBlocksBundleItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentBlocksBundleItem = {
  __typename?: 'ComponentBlocksBundleItem';
  bundle?: Maybe<BundleEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentBlocksBundleItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleItemFiltersInput>>>;
  bundle?: InputMaybe<BundleFiltersInput>;
  not?: InputMaybe<ComponentBlocksBundleItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleItemFiltersInput>>>;
};

export type ComponentBlocksButtonLink = {
  __typename?: 'ComponentBlocksButtonLink';
  id: Scalars['ID'];
  label: Scalars['String'];
  page?: Maybe<PageEntityResponse>;
};

export type ComponentBlocksButtonLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
};

export type ComponentBlocksButtonLinkInput = {
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksContactItem = {
  __typename?: 'ComponentBlocksContactItem';
  contact?: Maybe<ContactEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentBlocksContactItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksContactItemFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  not?: InputMaybe<ComponentBlocksContactItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksContactItemFiltersInput>>>;
};

export type ComponentBlocksCta = {
  __typename?: 'ComponentBlocksCta';
  button?: Maybe<ComponentBlocksButtonLink>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title: Scalars['String'];
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
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksDocumentItem = {
  __typename?: 'ComponentBlocksDocumentItem';
  document?: Maybe<DocumentEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentBlocksDocumentItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksDocumentItemFiltersInput>>>;
  document?: InputMaybe<DocumentFiltersInput>;
  not?: InputMaybe<ComponentBlocksDocumentItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksDocumentItemFiltersInput>>>;
};

export type ComponentBlocksDocumentItemInput = {
  document?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksOfficeItem = {
  __typename?: 'ComponentBlocksOfficeItem';
  id: Scalars['ID'];
  office?: Maybe<OfficeEntityResponse>;
};

export type ComponentBlocksOfficeItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOfficeItemFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksOfficeItemFiltersInput>;
  office?: InputMaybe<OfficeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOfficeItemFiltersInput>>>;
};

export type ComponentBlocksOpeningHoursItem = {
  __typename?: 'ComponentBlocksOpeningHoursItem';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type ComponentBlocksOpeningHoursItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>;
  time?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksOpeningHoursItemInput = {
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksOpeningHoursUniversal = {
  __typename?: 'ComponentBlocksOpeningHoursUniversal';
  days?: Maybe<Array<Maybe<ComponentBlocksOpeningHoursItem>>>;
  id: Scalars['ID'];
};


export type ComponentBlocksOpeningHoursUniversalDaysArgs = {
  filters?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentBlocksOpeningHoursUniversalFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>>>;
  days?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>;
  not?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>>>;
};

export type ComponentBlocksOpeningHoursUniversalInput = {
  days?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemInput>>>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksPageItem = {
  __typename?: 'ComponentBlocksPageItem';
  id: Scalars['ID'];
  page?: Maybe<PageEntityResponse>;
};

export type ComponentBlocksPageItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageItemFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksPageItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageItemFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
};

export type ComponentBlocksPriceListItem = {
  __typename?: 'ComponentBlocksPriceListItem';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type ComponentBlocksSidebar = {
  __typename?: 'ComponentBlocksSidebar';
  contact?: Maybe<ContactEntityResponse>;
  ctaButton?: Maybe<ComponentBlocksButtonLink>;
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
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
  contact?: InputMaybe<Scalars['ID']>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksSimpleCtaItem = {
  __typename?: 'ComponentBlocksSimpleCtaItem';
  button?: Maybe<ComponentBlocksButtonLink>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ComponentBlocksSimpleCtaItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>>>;
  button?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksSocialItem = {
  __typename?: 'ComponentBlocksSocialItem';
  icon?: Maybe<Enum_Componentblockssocialitem_Icon>;
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
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
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralContacts = {
  __typename?: 'ComponentGeneralContacts';
  address?: Maybe<Scalars['String']>;
  addressFirstLine?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactEntityResponse>;
  contactsPage?: Maybe<PageEntityResponse>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  navigateToLink?: Maybe<Scalars['String']>;
  openingHoursPage?: Maybe<PageEntityResponse>;
};

export type ComponentGeneralContactsInput = {
  address?: InputMaybe<Scalars['String']>;
  addressFirstLine?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Scalars['ID']>;
  contactsPage?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  navigateToLink?: InputMaybe<Scalars['String']>;
  openingHoursPage?: InputMaybe<Scalars['ID']>;
};

export type ComponentGeneralFooter = {
  __typename?: 'ComponentGeneralFooter';
  bottomLinks?: Maybe<Array<Maybe<ComponentBlocksButtonLink>>>;
  id: Scalars['ID'];
  links1?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  links2?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  links3?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  links4?: Maybe<Array<Maybe<ComponentGeneralLinkItem>>>;
  title1?: Maybe<Scalars['String']>;
  title2?: Maybe<Scalars['String']>;
  title3?: Maybe<Scalars['String']>;
  title4?: Maybe<Scalars['String']>;
};


export type ComponentGeneralFooterBottomLinksArgs = {
  filters?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGeneralFooterLinks1Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGeneralFooterLinks2Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGeneralFooterLinks3Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentGeneralFooterLinks4Args = {
  filters?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGeneralFooterInput = {
  bottomLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  links1?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  links2?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  links3?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  links4?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemInput>>>;
  title1?: InputMaybe<Scalars['String']>;
  title2?: InputMaybe<Scalars['String']>;
  title3?: InputMaybe<Scalars['String']>;
  title4?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralHeader = {
  __typename?: 'ComponentGeneralHeader';
  contact?: Maybe<ContactEntityResponse>;
  faqPage?: Maybe<PageEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentGeneralHeaderInput = {
  contact?: InputMaybe<Scalars['ID']>;
  faqPage?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentGeneralLinkItem = {
  __typename?: 'ComponentGeneralLinkItem';
  id: Scalars['ID'];
  label: Scalars['String'];
  page?: Maybe<PageEntityResponse>;
  targetBlank: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
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
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['ID']>;
  targetBlank?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralProcedure = {
  __typename?: 'ComponentGeneralProcedure';
  downloadFile?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  steps?: Maybe<Array<Maybe<ComponentGeneralProcedureItem>>>;
  title: Scalars['String'];
};


export type ComponentGeneralProcedureStepsArgs = {
  filters?: InputMaybe<ComponentGeneralProcedureItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGeneralProcedureInput = {
  downloadFile?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  steps?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureItemInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralProcedureItem = {
  __typename?: 'ComponentGeneralProcedureItem';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ComponentGeneralProcedureItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralProcedureItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralProcedureItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralProcedureItemInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralSeo = {
  __typename?: 'ComponentGeneralSeo';
  id: Scalars['ID'];
  keywords?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
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
  id?: InputMaybe<Scalars['ID']>;
  keywords?: InputMaybe<Scalars['String']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralSocial = {
  __typename?: 'ComponentGeneralSocial';
  facebook?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type ComponentSectionsAccordionGroup = {
  __typename?: 'ComponentSectionsAccordionGroup';
  accordions?: Maybe<Array<Maybe<ComponentBlocksAccordionItem>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsAccordionGroupAccordionsArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsArticleJobsListing = {
  __typename?: 'ComponentSectionsArticleJobsListing';
  id: Scalars['ID'];
};

export type ComponentSectionsArticleNewsListing = {
  __typename?: 'ComponentSectionsArticleNewsListing';
  id: Scalars['ID'];
};

export type ComponentSectionsArticlePressListing = {
  __typename?: 'ComponentSectionsArticlePressListing';
  id: Scalars['ID'];
};

export type ComponentSectionsArticlesManualListing = {
  __typename?: 'ComponentSectionsArticlesManualListing';
  articles?: Maybe<Array<Maybe<ComponentBlocksArticleItem>>>;
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsArticlesManualListingArticlesArgs = {
  filters?: InputMaybe<ComponentBlocksArticleItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsBranchGroup = {
  __typename?: 'ComponentSectionsBranchGroup';
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItem>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsBranchGroupBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsBundleListing = {
  __typename?: 'ComponentSectionsBundleListing';
  atMedicalFacility?: Maybe<ComponentBlocksBundleGroup>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  outsideMedicalFacility?: Maybe<ComponentBlocksBundleGroup>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsBundleListingSimple = {
  __typename?: 'ComponentSectionsBundleListingSimple';
  bundles?: Maybe<BundleRelationResponseCollection>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsBundleListingSimpleBundlesArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsCemeteriesOpeningHours = {
  __typename?: 'ComponentSectionsCemeteriesOpeningHours';
  buttonPosition?: Maybe<Enum_Componentsectionscemeteriesopeninghours_Buttonposition>;
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsCeremoniesArchiveSection = {
  __typename?: 'ComponentSectionsCeremoniesArchiveSection';
  id: Scalars['ID'];
};

export type ComponentSectionsCeremoniesSection = {
  __typename?: 'ComponentSectionsCeremoniesSection';
  archive?: Maybe<ComponentBlocksBlocksCeremonyArchiveBlock>;
  id: Scalars['ID'];
};

export type ComponentSectionsContactGroup = {
  __typename?: 'ComponentSectionsContactGroup';
  contacts?: Maybe<Array<Maybe<ComponentBlocksContactItem>>>;
  id: Scalars['ID'];
  layout: Enum_Componentsectionscontactgroup_Layout;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsContactGroupContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsCtaSection = {
  __typename?: 'ComponentSectionsCtaSection';
  ctas?: Maybe<Array<Maybe<ComponentBlocksSimpleCtaItem>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsCtaSectionCtasArgs = {
  filters?: InputMaybe<ComponentBlocksSimpleCtaItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsDebtorsSection = {
  __typename?: 'ComponentSectionsDebtorsSection';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentSectionsDisclosuresSection = {
  __typename?: 'ComponentSectionsDisclosuresSection';
  id: Scalars['ID'];
};

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider';
  color: Enum_Componentsectionsdivider_Color;
  id: Scalars['ID'];
};

export type ComponentSectionsDocumentGroup = {
  __typename?: 'ComponentSectionsDocumentGroup';
  documents?: Maybe<Array<Maybe<ComponentBlocksDocumentItem>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsDocumentGroupDocumentsArgs = {
  filters?: InputMaybe<ComponentBlocksDocumentItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsDocumentGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentGroupFiltersInput>>>;
  documents?: InputMaybe<ComponentBlocksDocumentItemFiltersInput>;
  not?: InputMaybe<ComponentSectionsDocumentGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentGroupFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsDocumentGroupInput = {
  documents?: InputMaybe<Array<InputMaybe<ComponentBlocksDocumentItemInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsDocumentsSection = {
  __typename?: 'ComponentSectionsDocumentsSection';
  id: Scalars['ID'];
};

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery';
  id: Scalars['ID'];
  medias?: Maybe<UploadFileRelationResponseCollection>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsGalleryMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsHomepageReviewsSection = {
  __typename?: 'ComponentSectionsHomepageReviewsSection';
  id: Scalars['ID'];
  reviews?: Maybe<ReviewRelationResponseCollection>;
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsHomepageReviewsSectionReviewsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsIframeSection = {
  __typename?: 'ComponentSectionsIframeSection';
  body?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  iframeTitle: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ComponentSectionsManualListing = {
  __typename?: 'ComponentSectionsManualListing';
  id: Scalars['ID'];
  pages?: Maybe<Array<Maybe<ComponentBlocksPageItem>>>;
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  style: Enum_Componentsectionsmanuallisting_Style;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsManualListingPagesArgs = {
  filters?: InputMaybe<ComponentBlocksPageItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsMapOfManagedObjects = {
  __typename?: 'ComponentSectionsMapOfManagedObjects';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsMapSection = {
  __typename?: 'ComponentSectionsMapSection';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsMenuListing = {
  __typename?: 'ComponentSectionsMenuListing';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsNewsListing = {
  __typename?: 'ComponentSectionsNewsListing';
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsOpeningHoursSection = {
  __typename?: 'ComponentSectionsOpeningHoursSection';
  id: Scalars['ID'];
  offices?: Maybe<Array<Maybe<ComponentBlocksOfficeItem>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsOpeningHoursSectionOfficesArgs = {
  filters?: InputMaybe<ComponentBlocksOfficeItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsPartnersSection = {
  __typename?: 'ComponentSectionsPartnersSection';
  featuredPartnersTitle: Scalars['String'];
  id: Scalars['ID'];
  otherPartnersTitle: Scalars['String'];
};

export type ComponentSectionsProceduresSection = {
  __typename?: 'ComponentSectionsProceduresSection';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsProceduresShortSection = {
  __typename?: 'ComponentSectionsProceduresShortSection';
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsReviewListing = {
  __typename?: 'ComponentSectionsReviewListing';
  id: Scalars['ID'];
};

export type ComponentSectionsRichtext = {
  __typename?: 'ComponentSectionsRichtext';
  button?: Maybe<ComponentBlocksButtonLink>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentSectionsUpcomingCeremoniesSection = {
  __typename?: 'ComponentSectionsUpcomingCeremoniesSection';
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};

export type Contact = {
  __typename?: 'Contact';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ContactRelationResponseCollection>;
  phone1?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ContactLocalizationsArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ContactEntity = {
  __typename?: 'ContactEntity';
  attributes?: Maybe<Contact>;
  id?: Maybe<Scalars['ID']>;
};

export type ContactEntityResponse = {
  __typename?: 'ContactEntityResponse';
  data?: Maybe<ContactEntity>;
};

export type ContactEntityResponseCollection = {
  __typename?: 'ContactEntityResponseCollection';
  data: Array<ContactEntity>;
  meta: ResponseCollectionMeta;
};

export type ContactFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ContactFiltersInput>;
  not?: InputMaybe<ContactFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactFiltersInput>>>;
  phone1?: InputMaybe<StringFilterInput>;
  phone2?: InputMaybe<StringFilterInput>;
  position?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']>;
  phone1?: InputMaybe<Scalars['String']>;
  phone2?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContactRelationResponseCollection = {
  __typename?: 'ContactRelationResponseCollection';
  data: Array<ContactEntity>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  contains?: InputMaybe<Scalars['Date']>;
  containsi?: InputMaybe<Scalars['Date']>;
  endsWith?: InputMaybe<Scalars['Date']>;
  eq?: InputMaybe<Scalars['Date']>;
  eqi?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nei?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']>;
  notContainsi?: InputMaybe<Scalars['Date']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  startsWith?: InputMaybe<Scalars['Date']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  nei?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type Debtor = {
  __typename?: 'Debtor';
  birthDate?: Maybe<Scalars['String']>;
  cemetery?: Maybe<CemeteryEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deathDate?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  graveNumber?: Maybe<Scalars['String']>;
  gravePreviousNumber?: Maybe<Scalars['String']>;
  graveSector?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DebtorEntity = {
  __typename?: 'DebtorEntity';
  attributes?: Maybe<Debtor>;
  id?: Maybe<Scalars['ID']>;
};

export type DebtorEntityResponse = {
  __typename?: 'DebtorEntityResponse';
  data?: Maybe<DebtorEntity>;
};

export type DebtorEntityResponseCollection = {
  __typename?: 'DebtorEntityResponseCollection';
  data: Array<DebtorEntity>;
  meta: ResponseCollectionMeta;
};

export type DebtorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DebtorFiltersInput>>>;
  birthDate?: InputMaybe<StringFilterInput>;
  cemetery?: InputMaybe<CemeteryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deathDate?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  graveNumber?: InputMaybe<StringFilterInput>;
  gravePreviousNumber?: InputMaybe<StringFilterInput>;
  graveSector?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  importId?: InputMaybe<StringFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DebtorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DebtorFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DebtorInput = {
  birthDate?: InputMaybe<Scalars['String']>;
  cemetery?: InputMaybe<Scalars['ID']>;
  deathDate?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  graveNumber?: InputMaybe<Scalars['String']>;
  gravePreviousNumber?: InputMaybe<Scalars['String']>;
  graveSector?: InputMaybe<Scalars['String']>;
  importId?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type Disclosure = {
  __typename?: 'Disclosure';
  additionalData?: Maybe<Scalars['JSON']>;
  contractNumber?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dateOfDelivery?: Maybe<Scalars['String']>;
  dateOfOrder?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  internalInvoiceNumber?: Maybe<Scalars['String']>;
  invoiceNumberOrVariableSymbol?: Maybe<Scalars['String']>;
  invoicedAmount?: Maybe<Scalars['String']>;
  orderNumber?: Maybe<Scalars['String']>;
  publishedAtOverride?: Maybe<Scalars['DateTime']>;
  signedBy?: Maybe<Scalars['String']>;
  supplierAddress?: Maybe<Scalars['String']>;
  supplierName?: Maybe<Scalars['String']>;
  supplierRegistrationNumber?: Maybe<Scalars['String']>;
  totalValue?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Disclosure_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type DisclosureFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type DisclosureEntity = {
  __typename?: 'DisclosureEntity';
  attributes?: Maybe<Disclosure>;
  id?: Maybe<Scalars['ID']>;
};

export type DisclosureEntityResponse = {
  __typename?: 'DisclosureEntityResponse';
  data?: Maybe<DisclosureEntity>;
};

export type DisclosureEntityResponseCollection = {
  __typename?: 'DisclosureEntityResponseCollection';
  data: Array<DisclosureEntity>;
  meta: ResponseCollectionMeta;
};

export type DisclosureFiltersInput = {
  additionalData?: InputMaybe<JsonFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>;
  contractNumber?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateOfDelivery?: InputMaybe<StringFilterInput>;
  dateOfOrder?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  importId?: InputMaybe<StringFilterInput>;
  internalInvoiceNumber?: InputMaybe<StringFilterInput>;
  invoiceNumberOrVariableSymbol?: InputMaybe<StringFilterInput>;
  invoicedAmount?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DisclosureFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DisclosureFiltersInput>>>;
  orderNumber?: InputMaybe<StringFilterInput>;
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
  additionalData?: InputMaybe<Scalars['JSON']>;
  contractNumber?: InputMaybe<Scalars['String']>;
  dateOfDelivery?: InputMaybe<Scalars['String']>;
  dateOfOrder?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  importId?: InputMaybe<Scalars['String']>;
  internalInvoiceNumber?: InputMaybe<Scalars['String']>;
  invoiceNumberOrVariableSymbol?: InputMaybe<Scalars['String']>;
  invoicedAmount?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
  publishedAtOverride?: InputMaybe<Scalars['DateTime']>;
  signedBy?: InputMaybe<Scalars['String']>;
  supplierAddress?: InputMaybe<Scalars['String']>;
  supplierName?: InputMaybe<Scalars['String']>;
  supplierRegistrationNumber?: InputMaybe<Scalars['String']>;
  totalValue?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Disclosure_Type>;
};

export type Document = {
  __typename?: 'Document';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  documentCategory?: Maybe<DocumentCategoryEntityResponse>;
  file: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DocumentCategory = {
  __typename?: 'DocumentCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  documents?: Maybe<DocumentRelationResponseCollection>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type DocumentCategoryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type DocumentCategoryEntity = {
  __typename?: 'DocumentCategoryEntity';
  attributes?: Maybe<DocumentCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type DocumentCategoryEntityResponse = {
  __typename?: 'DocumentCategoryEntityResponse';
  data?: Maybe<DocumentCategoryEntity>;
};

export type DocumentCategoryEntityResponseCollection = {
  __typename?: 'DocumentCategoryEntityResponseCollection';
  data: Array<DocumentCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type DocumentCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DocumentCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documents?: InputMaybe<DocumentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DocumentCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DocumentCategoryFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DocumentCategoryInput = {
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DocumentEntity = {
  __typename?: 'DocumentEntity';
  attributes?: Maybe<Document>;
  id?: Maybe<Scalars['ID']>;
};

export type DocumentEntityResponse = {
  __typename?: 'DocumentEntityResponse';
  data?: Maybe<DocumentEntity>;
};

export type DocumentEntityResponseCollection = {
  __typename?: 'DocumentEntityResponseCollection';
  data: Array<DocumentEntity>;
  meta: ResponseCollectionMeta;
};

export type DocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentCategory?: InputMaybe<DocumentCategoryFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DocumentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DocumentInput = {
  description?: InputMaybe<Scalars['String']>;
  documentCategory?: InputMaybe<Scalars['ID']>;
  file?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DocumentRelationResponseCollection = {
  __typename?: 'DocumentRelationResponseCollection';
  data: Array<DocumentEntity>;
};

export enum Enum_Bundle_Type {
  Kremacia = 'kremacia',
  Pochovanie = 'pochovanie',
  Prirodne = 'prirodne'
}

export enum Enum_Cemetery_Type {
  Civilny = 'civilny',
  Historicky = 'historicky',
  Vojensky = 'vojensky'
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

export enum Enum_Managedobject_Type {
  Fontana = 'fontana',
  HmlovaFontana = 'hmlova_fontana',
  PitnaFontana = 'pitna_fontana',
  Rozprasovac = 'rozprasovac',
  Studna = 'studna'
}

export enum Enum_Page_Layout {
  Centered = 'centered',
  Fullwidth = 'fullwidth',
  Sidebar = 'sidebar'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  nei?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type General = {
  __typename?: 'General';
  address?: Maybe<ComponentGeneralContacts>;
  cemeteryOpeningHours?: Maybe<ComponentBlocksOpeningHoursUniversal>;
  createdAt?: Maybe<Scalars['DateTime']>;
  footer?: Maybe<ComponentGeneralFooter>;
  header?: Maybe<ComponentGeneralHeader>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<GeneralRelationResponseCollection>;
  socials?: Maybe<Array<Maybe<ComponentBlocksSocialItem>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type GeneralSocialsArgs = {
  filters?: InputMaybe<ComponentBlocksSocialItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GeneralEntity = {
  __typename?: 'GeneralEntity';
  attributes?: Maybe<General>;
  id?: Maybe<Scalars['ID']>;
};

export type GeneralEntityResponse = {
  __typename?: 'GeneralEntityResponse';
  data?: Maybe<GeneralEntity>;
};

export type GeneralInput = {
  address?: InputMaybe<ComponentGeneralContactsInput>;
  cemeteryOpeningHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalInput>;
  footer?: InputMaybe<ComponentGeneralFooterInput>;
  header?: InputMaybe<ComponentGeneralHeaderInput>;
  socials?: InputMaybe<Array<InputMaybe<ComponentBlocksSocialItemInput>>>;
};

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection';
  data: Array<GeneralEntity>;
};

export type GenericMorph = Application | Article | ArticleJobsCategory | ArticleNewsCategory | ArticlePressCategory | Branch | Bundle | Cemetery | Ceremony | ComponentBlocksAccordionItem | ComponentBlocksAccordionItemWithPrice | ComponentBlocksArticleItem | ComponentBlocksBlocksCeremonyArchiveBlock | ComponentBlocksBranchItem | ComponentBlocksBundleContentItem | ComponentBlocksBundleGroup | ComponentBlocksBundleItem | ComponentBlocksButtonLink | ComponentBlocksContactItem | ComponentBlocksCta | ComponentBlocksDocumentItem | ComponentBlocksOfficeItem | ComponentBlocksOpeningHoursItem | ComponentBlocksOpeningHoursUniversal | ComponentBlocksPageItem | ComponentBlocksPriceListItem | ComponentBlocksSidebar | ComponentBlocksSimpleCtaItem | ComponentBlocksSocialItem | ComponentGeneralContacts | ComponentGeneralFooter | ComponentGeneralHeader | ComponentGeneralLinkItem | ComponentGeneralProcedure | ComponentGeneralProcedureItem | ComponentGeneralSeo | ComponentGeneralSocial | ComponentSectionsAccordionGroup | ComponentSectionsArticleJobsListing | ComponentSectionsArticleNewsListing | ComponentSectionsArticlePressListing | ComponentSectionsArticlesManualListing | ComponentSectionsBranchGroup | ComponentSectionsBundleListing | ComponentSectionsBundleListingSimple | ComponentSectionsCemeteriesOpeningHours | ComponentSectionsCeremoniesArchiveSection | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsCtaSection | ComponentSectionsDebtorsSection | ComponentSectionsDisclosuresSection | ComponentSectionsDivider | ComponentSectionsDocumentGroup | ComponentSectionsDocumentsSection | ComponentSectionsGallery | ComponentSectionsHomepageReviewsSection | ComponentSectionsIframeSection | ComponentSectionsManualListing | ComponentSectionsMapOfManagedObjects | ComponentSectionsMapSection | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsOpeningHoursSection | ComponentSectionsPartnersSection | ComponentSectionsProceduresSection | ComponentSectionsProceduresShortSection | ComponentSectionsReviewListing | ComponentSectionsRichtext | ComponentSectionsUpcomingCeremoniesSection | Contact | Debtor | Disclosure | Document | DocumentCategory | General | HomePage | I18NLocale | ManagedObject | Office | Page | Partner | Procedure | Review | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type HomePage = {
  __typename?: 'HomePage';
  createdAt?: Maybe<Scalars['DateTime']>;
  featured: Array<Maybe<ComponentBlocksCta>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<HomePageRelationResponseCollection>;
  sections?: Maybe<Array<Maybe<HomePageSectionsDynamicZone>>>;
  seo?: Maybe<ComponentGeneralSeo>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type HomePageFeaturedArgs = {
  filters?: InputMaybe<ComponentBlocksCtaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type HomePageEntity = {
  __typename?: 'HomePageEntity';
  attributes?: Maybe<HomePage>;
  id?: Maybe<Scalars['ID']>;
};

export type HomePageEntityResponse = {
  __typename?: 'HomePageEntityResponse';
  data?: Maybe<HomePageEntity>;
};

export type HomePageInput = {
  featured?: InputMaybe<Array<InputMaybe<ComponentBlocksCtaInput>>>;
  sections?: InputMaybe<Array<Scalars['HomePageSectionsDynamicZoneInput']>>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
};

export type HomePageRelationResponseCollection = {
  __typename?: 'HomePageRelationResponseCollection';
  data: Array<HomePageEntity>;
};

export type HomePageSectionsDynamicZone = ComponentSectionsArticlesManualListing | ComponentSectionsCtaSection | ComponentSectionsHomepageReviewsSection | ComponentSectionsManualListing | ComponentSectionsNewsListing | ComponentSectionsProceduresShortSection | ComponentSectionsUpcomingCeremoniesSection | Error;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  nei?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  nei?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  nei?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type ManagedObject = {
  __typename?: 'ManagedObject';
  address?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ManagedObjectRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']>;
  medias?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String'];
  title: Scalars['String'];
  type?: Maybe<Enum_Managedobject_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ManagedObjectLocalizationsArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ManagedObjectMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ManagedObjectEntity = {
  __typename?: 'ManagedObjectEntity';
  attributes?: Maybe<ManagedObject>;
  id?: Maybe<Scalars['ID']>;
};

export type ManagedObjectEntityResponse = {
  __typename?: 'ManagedObjectEntityResponse';
  data?: Maybe<ManagedObjectEntity>;
};

export type ManagedObjectEntityResponseCollection = {
  __typename?: 'ManagedObjectEntityResponseCollection';
  data: Array<ManagedObjectEntity>;
  meta: ResponseCollectionMeta;
};

export type ManagedObjectFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ManagedObjectFiltersInput>>>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ManagedObjectFiltersInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  navigateToLink?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ManagedObjectFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ManagedObjectFiltersInput>>>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ManagedObjectInput = {
  address?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  navigateToLink?: InputMaybe<Scalars['String']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Managedobject_Type>;
};

export type ManagedObjectRelationResponseCollection = {
  __typename?: 'ManagedObjectRelationResponseCollection';
  data: Array<ManagedObjectEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createApplication?: Maybe<ApplicationEntityResponse>;
  createArticle?: Maybe<ArticleEntityResponse>;
  createArticleJobsCategory?: Maybe<ArticleJobsCategoryEntityResponse>;
  createArticleLocalization?: Maybe<ArticleEntityResponse>;
  createArticleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  createArticlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  createBranch?: Maybe<BranchEntityResponse>;
  createBranchLocalization?: Maybe<BranchEntityResponse>;
  createBundle?: Maybe<BundleEntityResponse>;
  createBundleLocalization?: Maybe<BundleEntityResponse>;
  createCemetery?: Maybe<CemeteryEntityResponse>;
  createCemeteryLocalization?: Maybe<CemeteryEntityResponse>;
  createCeremony?: Maybe<CeremonyEntityResponse>;
  createContact?: Maybe<ContactEntityResponse>;
  createContactLocalization?: Maybe<ContactEntityResponse>;
  createDebtor?: Maybe<DebtorEntityResponse>;
  createDisclosure?: Maybe<DisclosureEntityResponse>;
  createDocument?: Maybe<DocumentEntityResponse>;
  createDocumentCategory?: Maybe<DocumentCategoryEntityResponse>;
  createGeneralLocalization?: Maybe<GeneralEntityResponse>;
  createHomePageLocalization?: Maybe<HomePageEntityResponse>;
  createManagedObject?: Maybe<ManagedObjectEntityResponse>;
  createManagedObjectLocalization?: Maybe<ManagedObjectEntityResponse>;
  createOffice?: Maybe<OfficeEntityResponse>;
  createOfficeLocalization?: Maybe<OfficeEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  createPageLocalization?: Maybe<PageEntityResponse>;
  createPartner?: Maybe<PartnerEntityResponse>;
  createProcedureLocalization?: Maybe<ProcedureEntityResponse>;
  createReview?: Maybe<ReviewEntityResponse>;
  createReviewLocalization?: Maybe<ReviewEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteApplication?: Maybe<ApplicationEntityResponse>;
  deleteArticle?: Maybe<ArticleEntityResponse>;
  deleteArticleJobsCategory?: Maybe<ArticleJobsCategoryEntityResponse>;
  deleteArticleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  deleteArticlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  deleteBranch?: Maybe<BranchEntityResponse>;
  deleteBundle?: Maybe<BundleEntityResponse>;
  deleteCemetery?: Maybe<CemeteryEntityResponse>;
  deleteCeremony?: Maybe<CeremonyEntityResponse>;
  deleteContact?: Maybe<ContactEntityResponse>;
  deleteDebtor?: Maybe<DebtorEntityResponse>;
  deleteDisclosure?: Maybe<DisclosureEntityResponse>;
  deleteDocument?: Maybe<DocumentEntityResponse>;
  deleteDocumentCategory?: Maybe<DocumentCategoryEntityResponse>;
  deleteGeneral?: Maybe<GeneralEntityResponse>;
  deleteHomePage?: Maybe<HomePageEntityResponse>;
  deleteManagedObject?: Maybe<ManagedObjectEntityResponse>;
  deleteOffice?: Maybe<OfficeEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePartner?: Maybe<PartnerEntityResponse>;
  deleteProcedure?: Maybe<ProcedureEntityResponse>;
  deleteReview?: Maybe<ReviewEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateApplication?: Maybe<ApplicationEntityResponse>;
  updateArticle?: Maybe<ArticleEntityResponse>;
  updateArticleJobsCategory?: Maybe<ArticleJobsCategoryEntityResponse>;
  updateArticleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  updateArticlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  updateBranch?: Maybe<BranchEntityResponse>;
  updateBundle?: Maybe<BundleEntityResponse>;
  updateCemetery?: Maybe<CemeteryEntityResponse>;
  updateCeremony?: Maybe<CeremonyEntityResponse>;
  updateContact?: Maybe<ContactEntityResponse>;
  updateDebtor?: Maybe<DebtorEntityResponse>;
  updateDisclosure?: Maybe<DisclosureEntityResponse>;
  updateDocument?: Maybe<DocumentEntityResponse>;
  updateDocumentCategory?: Maybe<DocumentCategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateGeneral?: Maybe<GeneralEntityResponse>;
  updateHomePage?: Maybe<HomePageEntityResponse>;
  updateManagedObject?: Maybe<ManagedObjectEntityResponse>;
  updateOffice?: Maybe<OfficeEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  updatePartner?: Maybe<PartnerEntityResponse>;
  updateProcedure?: Maybe<ProcedureEntityResponse>;
  updateReview?: Maybe<ReviewEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateApplicationArgs = {
  data: ApplicationInput;
};


export type MutationCreateArticleArgs = {
  data: ArticleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateArticleJobsCategoryArgs = {
  data: ArticleJobsCategoryInput;
};


export type MutationCreateArticleLocalizationArgs = {
  data?: InputMaybe<ArticleInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateArticleNewsCategoryArgs = {
  data: ArticleNewsCategoryInput;
};


export type MutationCreateArticlePressCategoryArgs = {
  data: ArticlePressCategoryInput;
};


export type MutationCreateBranchArgs = {
  data: BranchInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBranchLocalizationArgs = {
  data?: InputMaybe<BranchInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBundleArgs = {
  data: BundleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBundleLocalizationArgs = {
  data?: InputMaybe<BundleInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCemeteryArgs = {
  data: CemeteryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCemeteryLocalizationArgs = {
  data?: InputMaybe<CemeteryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCeremonyArgs = {
  data: CeremonyInput;
};


export type MutationCreateContactArgs = {
  data: ContactInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateContactLocalizationArgs = {
  data?: InputMaybe<ContactInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateDebtorArgs = {
  data: DebtorInput;
};


export type MutationCreateDisclosureArgs = {
  data: DisclosureInput;
};


export type MutationCreateDocumentArgs = {
  data: DocumentInput;
};


export type MutationCreateDocumentCategoryArgs = {
  data: DocumentCategoryInput;
};


export type MutationCreateGeneralLocalizationArgs = {
  data?: InputMaybe<GeneralInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateHomePageLocalizationArgs = {
  data?: InputMaybe<HomePageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateManagedObjectArgs = {
  data: ManagedObjectInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateManagedObjectLocalizationArgs = {
  data?: InputMaybe<ManagedObjectInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateOfficeArgs = {
  data: OfficeInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateOfficeLocalizationArgs = {
  data?: InputMaybe<OfficeInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageLocalizationArgs = {
  data?: InputMaybe<PageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePartnerArgs = {
  data: PartnerInput;
};


export type MutationCreateProcedureLocalizationArgs = {
  data?: InputMaybe<ProcedureInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateReviewArgs = {
  data: ReviewInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateReviewLocalizationArgs = {
  data?: InputMaybe<ReviewInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteArticleJobsCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteArticleNewsCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteArticlePressCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBranchArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteBundleArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteCemeteryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteCeremonyArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteDebtorArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDisclosureArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDocumentCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteManagedObjectArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteOfficeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePartnerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProcedureArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateApplicationArgs = {
  data: ApplicationInput;
  id: Scalars['ID'];
};


export type MutationUpdateArticleArgs = {
  data: ArticleInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateArticleJobsCategoryArgs = {
  data: ArticleJobsCategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateArticleNewsCategoryArgs = {
  data: ArticleNewsCategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateArticlePressCategoryArgs = {
  data: ArticlePressCategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateBranchArgs = {
  data: BranchInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateBundleArgs = {
  data: BundleInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateCemeteryArgs = {
  data: CemeteryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateCeremonyArgs = {
  data: CeremonyInput;
  id: Scalars['ID'];
};


export type MutationUpdateContactArgs = {
  data: ContactInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateDebtorArgs = {
  data: DebtorInput;
  id: Scalars['ID'];
};


export type MutationUpdateDisclosureArgs = {
  data: DisclosureInput;
  id: Scalars['ID'];
};


export type MutationUpdateDocumentArgs = {
  data: DocumentInput;
  id: Scalars['ID'];
};


export type MutationUpdateDocumentCategoryArgs = {
  data: DocumentCategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateGeneralArgs = {
  data: GeneralInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateHomePageArgs = {
  data: HomePageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateManagedObjectArgs = {
  data: ManagedObjectInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateOfficeArgs = {
  data: OfficeInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePartnerArgs = {
  data: PartnerInput;
  id: Scalars['ID'];
};


export type MutationUpdateProcedureArgs = {
  data: ProcedureInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateReviewArgs = {
  data: ReviewInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type NavigationItem = {
  __typename?: 'NavigationItem';
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['String']>;
  externalPath?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  items?: Maybe<Array<Maybe<NavigationItem>>>;
  master?: Maybe<Scalars['Int']>;
  menuAttached: Scalars['Boolean'];
  order: Scalars['Int'];
  parent?: Maybe<NavigationItem>;
  path?: Maybe<Scalars['String']>;
  related?: Maybe<NavigationItemRelatedData>;
  title: Scalars['String'];
  type: Scalars['String'];
  uiRouterKey: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['String']>;
};

export type NavigationItemRelated = Page;

export type NavigationItemRelatedData = {
  __typename?: 'NavigationItemRelatedData';
  attributes?: Maybe<NavigationItemRelated>;
  id: Scalars['Int'];
};

export enum NavigationRenderType {
  Flat = 'FLAT',
  Rfr = 'RFR',
  Tree = 'TREE'
}

export type Office = {
  __typename?: 'Office';
  branch?: Maybe<BranchEntityResponse>;
  contacts?: Maybe<ContactRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<OfficeRelationResponseCollection>;
  openingHours?: Maybe<ComponentBlocksOpeningHoursUniversal>;
  title: Scalars['String'];
  titleInternal: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type OfficeContactsArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type OfficeLocalizationsArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OfficeEntity = {
  __typename?: 'OfficeEntity';
  attributes?: Maybe<Office>;
  id?: Maybe<Scalars['ID']>;
};

export type OfficeEntityResponse = {
  __typename?: 'OfficeEntityResponse';
  data?: Maybe<OfficeEntity>;
};

export type OfficeEntityResponseCollection = {
  __typename?: 'OfficeEntityResponseCollection';
  data: Array<OfficeEntity>;
  meta: ResponseCollectionMeta;
};

export type OfficeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OfficeFiltersInput>>>;
  branch?: InputMaybe<BranchFiltersInput>;
  contacts?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OfficeFiltersInput>;
  not?: InputMaybe<OfficeFiltersInput>;
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OfficeFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  titleInternal?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OfficeInput = {
  branch?: InputMaybe<Scalars['ID']>;
  contacts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  openingHours?: InputMaybe<ComponentBlocksOpeningHoursUniversalInput>;
  title?: InputMaybe<Scalars['String']>;
  titleInternal?: InputMaybe<Scalars['String']>;
};

export type OfficeRelationResponseCollection = {
  __typename?: 'OfficeRelationResponseCollection';
  data: Array<OfficeEntity>;
};

export type Page = {
  __typename?: 'Page';
  coverMedia?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ctaButton?: Maybe<ComponentBlocksButtonLink>;
  layout: Enum_Page_Layout;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PageRelationResponseCollection>;
  perex?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>;
  seo?: Maybe<ComponentGeneralSeo>;
  sidebar?: Maybe<ComponentBlocksSidebar>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data?: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  data: Array<PageEntity>;
  meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
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
  coverMedia?: InputMaybe<Scalars['ID']>;
  ctaButton?: InputMaybe<ComponentBlocksButtonLinkInput>;
  layout?: InputMaybe<Enum_Page_Layout>;
  perex?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type PageSectionsDynamicZone = ComponentSectionsAccordionGroup | ComponentSectionsArticleJobsListing | ComponentSectionsArticleNewsListing | ComponentSectionsArticlePressListing | ComponentSectionsBranchGroup | ComponentSectionsBundleListing | ComponentSectionsBundleListingSimple | ComponentSectionsCemeteriesOpeningHours | ComponentSectionsCeremoniesArchiveSection | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsDebtorsSection | ComponentSectionsDisclosuresSection | ComponentSectionsDivider | ComponentSectionsDocumentGroup | ComponentSectionsDocumentsSection | ComponentSectionsGallery | ComponentSectionsIframeSection | ComponentSectionsManualListing | ComponentSectionsMapOfManagedObjects | ComponentSectionsMapSection | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsOpeningHoursSection | ComponentSectionsPartnersSection | ComponentSectionsProceduresSection | ComponentSectionsReviewListing | ComponentSectionsRichtext | Error;

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Partner = {
  __typename?: 'Partner';
  createdAt?: Maybe<Scalars['DateTime']>;
  featured?: Maybe<Scalars['Boolean']>;
  link: Scalars['String'];
  logo: UploadFileEntityResponse;
  priority?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PartnerEntity = {
  __typename?: 'PartnerEntity';
  attributes?: Maybe<Partner>;
  id?: Maybe<Scalars['ID']>;
};

export type PartnerEntityResponse = {
  __typename?: 'PartnerEntityResponse';
  data?: Maybe<PartnerEntity>;
};

export type PartnerEntityResponseCollection = {
  __typename?: 'PartnerEntityResponseCollection';
  data: Array<PartnerEntity>;
  meta: ResponseCollectionMeta;
};

export type PartnerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  featured?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PartnerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PartnerFiltersInput>>>;
  priority?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PartnerInput = {
  featured?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['ID']>;
  priority?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Procedure = {
  __typename?: 'Procedure';
  atMedicalFacility?: Maybe<ComponentGeneralProcedure>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ProcedureRelationResponseCollection>;
  outsideMedicalFacility?: Maybe<ComponentGeneralProcedure>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProcedureEntity = {
  __typename?: 'ProcedureEntity';
  attributes?: Maybe<Procedure>;
  id?: Maybe<Scalars['ID']>;
};

export type ProcedureEntityResponse = {
  __typename?: 'ProcedureEntityResponse';
  data?: Maybe<ProcedureEntity>;
};

export type ProcedureInput = {
  atMedicalFacility?: InputMaybe<ComponentGeneralProcedureInput>;
  outsideMedicalFacility?: InputMaybe<ComponentGeneralProcedureInput>;
};

export type ProcedureRelationResponseCollection = {
  __typename?: 'ProcedureRelationResponseCollection';
  data: Array<ProcedureEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  application?: Maybe<ApplicationEntityResponse>;
  applications?: Maybe<ApplicationEntityResponseCollection>;
  article?: Maybe<ArticleEntityResponse>;
  articleJobsCategories?: Maybe<ArticleJobsCategoryEntityResponseCollection>;
  articleJobsCategory?: Maybe<ArticleJobsCategoryEntityResponse>;
  articleNewsCategories?: Maybe<ArticleNewsCategoryEntityResponseCollection>;
  articleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  articlePressCategories?: Maybe<ArticlePressCategoryEntityResponseCollection>;
  articlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  articles?: Maybe<ArticleEntityResponseCollection>;
  branch?: Maybe<BranchEntityResponse>;
  branches?: Maybe<BranchEntityResponseCollection>;
  bundle?: Maybe<BundleEntityResponse>;
  bundles?: Maybe<BundleEntityResponseCollection>;
  cemeteries?: Maybe<CemeteryEntityResponseCollection>;
  cemetery?: Maybe<CemeteryEntityResponse>;
  ceremonies?: Maybe<CeremonyEntityResponseCollection>;
  ceremony?: Maybe<CeremonyEntityResponse>;
  contact?: Maybe<ContactEntityResponse>;
  contacts?: Maybe<ContactEntityResponseCollection>;
  debtor?: Maybe<DebtorEntityResponse>;
  debtors?: Maybe<DebtorEntityResponseCollection>;
  disclosure?: Maybe<DisclosureEntityResponse>;
  disclosures?: Maybe<DisclosureEntityResponseCollection>;
  document?: Maybe<DocumentEntityResponse>;
  documentCategories?: Maybe<DocumentCategoryEntityResponseCollection>;
  documentCategory?: Maybe<DocumentCategoryEntityResponse>;
  documentFiletypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  documents?: Maybe<DocumentEntityResponseCollection>;
  general?: Maybe<GeneralEntityResponse>;
  homePage?: Maybe<HomePageEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  managedObject?: Maybe<ManagedObjectEntityResponse>;
  managedObjects?: Maybe<ManagedObjectEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  office?: Maybe<OfficeEntityResponse>;
  offices?: Maybe<OfficeEntityResponseCollection>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  partner?: Maybe<PartnerEntityResponse>;
  partners?: Maybe<PartnerEntityResponseCollection>;
  procedure?: Maybe<ProcedureEntityResponse>;
  renderNavigation: Array<Maybe<NavigationItem>>;
  renderNavigationChild: Array<Maybe<NavigationItem>>;
  review?: Maybe<ReviewEntityResponse>;
  reviews?: Maybe<ReviewEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryApplicationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryApplicationsArgs = {
  filters?: InputMaybe<ApplicationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryArticleJobsCategoriesArgs = {
  filters?: InputMaybe<ArticleJobsCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryArticleJobsCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryArticleNewsCategoriesArgs = {
  filters?: InputMaybe<ArticleNewsCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryArticleNewsCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryArticlePressCategoriesArgs = {
  filters?: InputMaybe<ArticlePressCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryArticlePressCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBranchArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryBranchesArgs = {
  filters?: InputMaybe<BranchFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBundleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryBundlesArgs = {
  filters?: InputMaybe<BundleFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCemeteriesArgs = {
  filters?: InputMaybe<CemeteryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCemeteryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryCeremoniesArgs = {
  filters?: InputMaybe<CeremonyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCeremonyArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryContactArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryContactsArgs = {
  filters?: InputMaybe<ContactFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDebtorArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDebtorsArgs = {
  filters?: InputMaybe<DebtorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDisclosureArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDisclosuresArgs = {
  filters?: InputMaybe<DisclosureFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDocumentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDocumentCategoriesArgs = {
  filters?: InputMaybe<DocumentCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryDocumentCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryManagedObjectArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryManagedObjectsArgs = {
  filters?: InputMaybe<ManagedObjectFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOfficeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryOfficesArgs = {
  filters?: InputMaybe<OfficeFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPartnerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPartnersArgs = {
  filters?: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryProcedureArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryRenderNavigationArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  menuOnly?: InputMaybe<Scalars['Boolean']>;
  navigationIdOrSlug: Scalars['String'];
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NavigationRenderType>;
};


export type QueryRenderNavigationChildArgs = {
  childUiKey: Scalars['String'];
  id: Scalars['String'];
  menuOnly?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<NavigationRenderType>;
};


export type QueryReviewArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryReviewsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Review = {
  __typename?: 'Review';
  author: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  date: Scalars['Date'];
  description: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ReviewRelationResponseCollection>;
  rating: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ReviewLocalizationsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ReviewEntity = {
  __typename?: 'ReviewEntity';
  attributes?: Maybe<Review>;
  id?: Maybe<Scalars['ID']>;
};

export type ReviewEntityResponse = {
  __typename?: 'ReviewEntityResponse';
  data?: Maybe<ReviewEntity>;
};

export type ReviewEntityResponseCollection = {
  __typename?: 'ReviewEntityResponseCollection';
  data: Array<ReviewEntity>;
  meta: ResponseCollectionMeta;
};

export type ReviewFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewFiltersInput>>>;
  author?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date?: InputMaybe<DateFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ReviewFiltersInput>;
  not?: InputMaybe<ReviewFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewFiltersInput>>>;
  rating?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewInput = {
  author?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Int']>;
};

export type ReviewRelationResponseCollection = {
  __typename?: 'ReviewRelationResponseCollection';
  data: Array<ReviewEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nei?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type FlatNavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null };

export type NavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null };

export type CtaButtonFragment = { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null };

export type SidebarFragment = { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null };

export type SeoFragment = { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null };

export type CtaFragment = { __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null };

export type HeaderFragment = { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null };

export type SocialItemFragment = { __typename?: 'ComponentBlocksSocialItem', title: string, url: string, icon?: Enum_Componentblockssocialitem_Icon | null };

export type OpeningHoursFragment = { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null };

export type ContactFragment = { __typename?: 'ComponentGeneralContacts', addressFirstLine?: string | null, address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, contactsPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null };

export type FooterLinkItemFragment = { __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null };

export type FooterFragment = { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, bottomLinks?: Array<{ __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null };

export type ProcedureFragment = { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null };

export type ArticlesManualListingFragment = { __typename?: 'ComponentSectionsArticlesManualListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, articles?: Array<{ __typename?: 'ComponentBlocksArticleItem', article?: { __typename?: 'ArticleEntityResponse', data?: { __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', title: string, perex?: string | null, publishedAt?: any | null, slug: string, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null };

export type AccordionGroupFragment = { __typename?: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null };

export type BranchGroupFragment = { __typename?: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, address?: string | null, slug: string, locale?: string | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null } | null } | null } | null> | null };

export type PartnersSectionFragment = { __typename?: 'ComponentSectionsPartnersSection', id: string, featuredPartnersTitle: string, otherPartnersTitle: string };

export type MenuListingFragment = { __typename?: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string };

export type MapSectionFragment = { __typename?: 'ComponentSectionsMapSection', id: string, title?: string | null };

export type MapOfManagedObjectsSectionFragment = { __typename?: 'ComponentSectionsMapOfManagedObjects', id: string, title?: string | null };

export type BundleListingFragment = { __typename?: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, atMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null } | null, outsideMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null } | null };

export type BundleListingSimpleFragment = { __typename?: 'ComponentSectionsBundleListingSimple', id: string, title?: string | null, description?: string | null, bundles?: { __typename?: 'BundleRelationResponseCollection', data: Array<{ __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null }> } | null };

export type ContactGroupFragment = { __typename?: 'ComponentSectionsContactGroup', id: string, title?: string | null, layout: Enum_Componentsectionscontactgroup_Layout, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null> | null };

export type DocumentGroupFragment = { __typename?: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, publishedAt?: any | null, slug: string, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null };

export type CtaSectionFragment = { __typename?: 'ComponentSectionsCtaSection', id: string, title?: string | null, ctas?: Array<{ __typename?: 'ComponentBlocksSimpleCtaItem', id: string, title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null> | null };

export type ManualListingFragment = { __typename?: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null };

export type NewsListingFragment = { __typename?: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type CeremoniesSectionFragment = { __typename?: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null };

export type RichtextSectionFragment = { __typename?: 'ComponentSectionsRichtext', id: string, content?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type ProceduresShortSectionFragment = { __typename?: 'ComponentSectionsProceduresShortSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type UpcomingCeremoniesSectionFragment = { __typename?: 'ComponentSectionsUpcomingCeremoniesSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type ReviewListingFragment = { __typename?: 'ComponentSectionsReviewListing', id: string };

export type HomepageReviewsSectionFragment = { __typename?: 'ComponentSectionsHomepageReviewsSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, reviews?: { __typename?: 'ReviewRelationResponseCollection', data: Array<{ __typename?: 'ReviewEntity', id?: string | null, attributes?: { __typename?: 'Review', author: string, date: any, rating: number, description: string } | null }> } | null };

export type OpeningHoursSectionFragment = { __typename?: 'ComponentSectionsOpeningHoursSection', id: string, title?: string | null, offices?: Array<{ __typename?: 'ComponentBlocksOfficeItem', office?: { __typename?: 'OfficeEntityResponse', data?: { __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null } | null } | null } | null> | null };

export type CemeteriesOpeningHoursFragment = { __typename?: 'ComponentSectionsCemeteriesOpeningHours', id: string, title?: string | null, buttonPosition?: Enum_Componentsectionscemeteriesopeninghours_Buttonposition | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type IframeSectionFragment = { __typename?: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string };

export type UploadImageEntityFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null };

export type UploadFileEntityFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null };

export type ArticleNewsCategoryEntityFragment = { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null };

export type ArticlePressCategoryEntityFragment = { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null };

export type ArticleJobsCategoryEntityFragment = { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null };

export type ArticleSlugEntityFragment = { __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', slug: string, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null };

export type ArticleCardEntityFragment = { __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', title: string, perex?: string | null, publishedAt?: any | null, slug: string, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null };

export type ArticleEntityFragment = { __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', content?: string | null, title: string, perex?: string | null, publishedAt?: any | null, slug: string, mediaGallery?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null };

export type BranchSlugEntityFragment = { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null } | null };

export type BranchOfficeEntityFragment = { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null };

export type BranchCardEntityFragment = { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, address?: string | null, slug: string, locale?: string | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null };

export type BranchEntityFragment = { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, address?: string | null, slug: string, locale?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null };

export type CemeterySlugEntityFragment = { __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', slug: string, type?: Enum_Cemetery_Type | null, locale?: string | null } | null };

export type CemeteryCardEntityFragment = { __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', title: string, address?: string | null, slug: string, type?: Enum_Cemetery_Type | null, locale?: string | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null };

export type CemeteryEntityFragment = { __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', type?: Enum_Cemetery_Type | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, address?: string | null, slug: string, locale?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null };

export type CemeteryInCeremoniesDebtorsEntityFragment = { __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', title: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, locale?: string | null } | null }> } | null } | null };

export type BundleCardEntityFragment = { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null };

export type BundleEntityFragment = { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', description?: string | null, title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, additionalServices?: Array<{ __typename?: 'ComponentBlocksAccordionItemWithPrice', id: string, title: string, description?: string | null, price?: number | null } | null> | null, documents?: { __typename?: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, publishedAt?: any | null, slug: string, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null };

export type BundleSlugEntityFragment = { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', slug: string, type: Enum_Bundle_Type, locale?: string | null } | null };

export type ContactEntityFragment = { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null };

export type DocumentCategoryEntityFragment = { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null };

export type DocumentSlugEntityFragment = { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', slug: string, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null };

export type DocumentCardEntityFragment = { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, publishedAt?: any | null, slug: string, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null };

export type DocumentEntityFragment = { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', description?: string | null, title: string, publishedAt?: any | null, slug: string, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null };

export type GeneralEntityFragment = { __typename?: 'GeneralEntity', attributes?: { __typename?: 'General', header?: { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, socials?: Array<{ __typename?: 'ComponentBlocksSocialItem', title: string, url: string, icon?: Enum_Componentblockssocialitem_Icon | null } | null> | null, address?: { __typename?: 'ComponentGeneralContacts', addressFirstLine?: string | null, address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, contactsPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, footer?: { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, bottomLinks?: Array<{ __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null } | null, cemeteryOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null };

export type OfficeEntityFragment = { __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null };

export type PartnerEntityFragment = { __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title: string, link: string, featured?: boolean | null, priority?: number | null, logo: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } } | null };

export type PageSlugEntityFragment = { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null };

export type PageCardEntityFragment = { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null };

export type PageEntityFragment = { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout: Enum_Page_Layout, title: string, slug: string, publishedAt?: any | null, perex?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticleJobsListing', id: string } | { __typename: 'ComponentSectionsArticleNewsListing', id: string } | { __typename: 'ComponentSectionsArticlePressListing', id: string } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, address?: string | null, slug: string, locale?: string | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, atMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null } | null, outsideMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null } | null } | { __typename: 'ComponentSectionsBundleListingSimple', id: string, title?: string | null, description?: string | null, bundles?: { __typename?: 'BundleRelationResponseCollection', data: Array<{ __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null }> } | null } | { __typename: 'ComponentSectionsCemeteriesOpeningHours', id: string, title?: string | null, buttonPosition?: Enum_Componentsectionscemeteriesopeninghours_Buttonposition | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsCeremoniesArchiveSection', id: string } | { __typename: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, layout: Enum_Componentsectionscontactgroup_Layout, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDebtorsSection', id: string, description?: string | null } | { __typename: 'ComponentSectionsDisclosuresSection', id: string } | { __typename: 'ComponentSectionsDivider', id: string, color: Enum_Componentsectionsdivider_Color } | { __typename: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, publishedAt?: any | null, slug: string, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDocumentsSection', id: string } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null } | { __typename: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsMapOfManagedObjects', id: string, title?: string | null } | { __typename: 'ComponentSectionsMapSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsOpeningHoursSection', id: string, title?: string | null, offices?: Array<{ __typename?: 'ComponentBlocksOfficeItem', office?: { __typename?: 'OfficeEntityResponse', data?: { __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsPartnersSection', id: string, featuredPartnersTitle: string, otherPartnersTitle: string } | { __typename: 'ComponentSectionsProceduresSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsReviewListing', id: string } | { __typename: 'ComponentSectionsRichtext', id: string, content?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename?: 'Error' } | null> | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null };

export type ProceduresEntityFragment = { __typename?: 'ProcedureEntity', attributes?: { __typename?: 'Procedure', updatedAt?: any | null, outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null } | null };

export type ReviewEntityFragment = { __typename?: 'ReviewEntity', id?: string | null, attributes?: { __typename?: 'Review', author: string, date: any, rating: number, description: string } | null };

export type CeremonyEntityFragment = { __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, birthYear?: string | null, type?: string | null, company?: string | null, officiantProvidedBy?: string | null, consentForPrivateFields?: boolean | null, cemetery?: { __typename?: 'CemeteryEntityResponse', data?: { __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, slug: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, slug: string, locale?: string | null } | null }> } | null } | null } | null } | null } | null };

export type HomepageCeremonyEntityFragment = { __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, consentForPrivateFields?: boolean | null, cemetery?: { __typename?: 'CemeteryEntityResponse', data?: { __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', slug: string, title: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', slug: string, title: string } | null }> } | null } | null } | null } | null } | null };

export type ManagedObjectSlugEntityFragment = { __typename: 'ManagedObjectEntity', id?: string | null, attributes?: { __typename?: 'ManagedObject', slug: string, type?: Enum_Managedobject_Type | null, locale?: string | null } | null };

export type ManagedObjectEntityFragment = { __typename: 'ManagedObjectEntity', id?: string | null, attributes?: { __typename?: 'ManagedObject', title: string, description?: string | null, address?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, slug: string, type?: Enum_Managedobject_Type | null, locale?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null };

export type GeneralQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type GeneralQuery = { __typename?: 'Query', navigation: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Page', title: string, slug: string } | null } | null } | null>, general?: { __typename?: 'GeneralEntityResponse', data?: { __typename?: 'GeneralEntity', attributes?: { __typename?: 'General', header?: { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, socials?: Array<{ __typename?: 'ComponentBlocksSocialItem', title: string, url: string, icon?: Enum_Componentblockssocialitem_Icon | null } | null> | null, address?: { __typename?: 'ComponentGeneralContacts', addressFirstLine?: string | null, address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, contactsPage?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, footer?: { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, bottomLinks?: Array<{ __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null } | null, cemeteryOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null } | null } | null };

export type ProceduresQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type ProceduresQuery = { __typename?: 'Query', procedures?: { __typename?: 'ProcedureEntityResponse', data?: { __typename?: 'ProcedureEntity', attributes?: { __typename?: 'Procedure', updatedAt?: any | null, outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null } | null } | null } | null };

export type PartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type PartnersQuery = { __typename?: 'Query', partners?: { __typename?: 'PartnerEntityResponseCollection', data: Array<{ __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title: string, link: string, featured?: boolean | null, priority?: number | null, logo: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } } | null }> } | null };

export type ReviewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews?: { __typename?: 'ReviewEntityResponseCollection', data: Array<{ __typename?: 'ReviewEntity', id?: string | null, attributes?: { __typename?: 'Review', author: string, date: any, rating: number, description: string } | null }> } | null };

export type NewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type NewsQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', title: string, perex?: string | null, publishedAt?: any | null, slug: string, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type ArticleBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type ArticleBySlugQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', content?: string | null, title: string, perex?: string | null, publishedAt?: any | null, slug: string, mediaGallery?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type PageBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout: Enum_Page_Layout, title: string, slug: string, publishedAt?: any | null, perex?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticleJobsListing', id: string } | { __typename: 'ComponentSectionsArticleNewsListing', id: string } | { __typename: 'ComponentSectionsArticlePressListing', id: string } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, address?: string | null, slug: string, locale?: string | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, atMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null } | null, outsideMedicalFacility?: { __typename?: 'ComponentBlocksBundleGroup', title: string, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null } | null } | { __typename: 'ComponentSectionsBundleListingSimple', id: string, title?: string | null, description?: string | null, bundles?: { __typename?: 'BundleRelationResponseCollection', data: Array<{ __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null }> } | null } | { __typename: 'ComponentSectionsCemeteriesOpeningHours', id: string, title?: string | null, buttonPosition?: Enum_Componentsectionscemeteriesopeninghours_Buttonposition | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsCeremoniesArchiveSection', id: string } | { __typename: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, layout: Enum_Componentsectionscontactgroup_Layout, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDebtorsSection', id: string, description?: string | null } | { __typename: 'ComponentSectionsDisclosuresSection', id: string } | { __typename: 'ComponentSectionsDivider', id: string, color: Enum_Componentsectionsdivider_Color } | { __typename: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, publishedAt?: any | null, slug: string, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDocumentsSection', id: string } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null } | { __typename: 'ComponentSectionsIframeSection', id: string, title?: string | null, iframeTitle: string, body?: string | null, url: string } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsMapOfManagedObjects', id: string, title?: string | null } | { __typename: 'ComponentSectionsMapSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsOpeningHoursSection', id: string, title?: string | null, offices?: Array<{ __typename?: 'ComponentBlocksOfficeItem', office?: { __typename?: 'OfficeEntityResponse', data?: { __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsPartnersSection', id: string, featuredPartnersTitle: string, otherPartnersTitle: string } | { __typename: 'ComponentSectionsProceduresSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsReviewListing', id: string } | { __typename: 'ComponentSectionsRichtext', id: string, content?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename?: 'Error' } | null> | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null }> } | null };

export type BranchBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type BranchBySlugQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, address?: string | null, slug: string, locale?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null }> } | null };

export type BranchesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type BranchesQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, address?: string | null, slug: string, locale?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, offices?: { __typename?: 'OfficeRelationResponseCollection', data: Array<{ __typename?: 'OfficeEntity', id?: string | null, attributes?: { __typename?: 'Office', title: string, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null, title: string, address?: string | null } | null } | null } | null, openingHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null, contacts?: { __typename?: 'ContactRelationResponseCollection', data: Array<{ __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null }> } | null } | null }> } | null } | null }> } | null };

export type CemeteryBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type CemeteryBySlugQuery = { __typename?: 'Query', cemeteries?: { __typename?: 'CemeteryEntityResponseCollection', data: Array<{ __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', type?: Enum_Cemetery_Type | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, address?: string | null, slug: string, locale?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null }> } | null };

export type CemeteriesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type CemeteriesQuery = { __typename?: 'Query', cemeteries?: { __typename?: 'CemeteryEntityResponseCollection', data: Array<{ __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', type?: Enum_Cemetery_Type | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, address?: string | null, slug: string, locale?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, overrideOpeningHours?: { __typename?: 'ComponentBlocksOpeningHoursUniversal', days?: Array<{ __typename?: 'ComponentBlocksOpeningHoursItem', label?: string | null, time?: string | null } | null> | null } | null } | null }> } | null };

export type ManagedObjectBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type ManagedObjectBySlugQuery = { __typename?: 'Query', managedObjects?: { __typename?: 'ManagedObjectEntityResponseCollection', data: Array<{ __typename: 'ManagedObjectEntity', id?: string | null, attributes?: { __typename?: 'ManagedObject', title: string, description?: string | null, address?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, slug: string, type?: Enum_Managedobject_Type | null, locale?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null }> } | null };

export type ManagedObjectsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type ManagedObjectsQuery = { __typename?: 'Query', managedObjects?: { __typename?: 'ManagedObjectEntityResponseCollection', data: Array<{ __typename: 'ManagedObjectEntity', id?: string | null, attributes?: { __typename?: 'ManagedObject', title: string, description?: string | null, address?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, slug: string, type?: Enum_Managedobject_Type | null, locale?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null }> } | null };

export type BundleBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type BundleBySlugQuery = { __typename?: 'Query', bundles?: { __typename?: 'BundleEntityResponseCollection', data: Array<{ __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', description?: string | null, title: string, slug: string, perex?: string | null, price: number, type: Enum_Bundle_Type, discountTextShort?: string | null, discountText?: string | null, additionalServices?: Array<{ __typename?: 'ComponentBlocksAccordionItemWithPrice', id: string, title: string, description?: string | null, price?: number | null } | null> | null, documents?: { __typename?: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, publishedAt?: any | null, slug: string, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, position?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null, additionalItems?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null }> } | null };

export type DocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type DocumentBySlugQuery = { __typename?: 'Query', documents?: { __typename?: 'DocumentEntityResponseCollection', data: Array<{ __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', description?: string | null, title: string, publishedAt?: any | null, slug: string, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null }, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type ArticlesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type ArticlesStaticPathsQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', slug: string, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type PagesStaticPathsQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null }> } | null };

export type BranchesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type BranchesStaticPathsQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null } | null }> } | null };

export type BundlesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type BundlesStaticPathsQuery = { __typename?: 'Query', bundles?: { __typename?: 'BundleEntityResponseCollection', data: Array<{ __typename: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', slug: string, type: Enum_Bundle_Type, locale?: string | null } | null }> } | null };

export type CemeteriesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type CemeteriesStaticPathsQuery = { __typename?: 'Query', cemeteries?: { __typename?: 'CemeteryEntityResponseCollection', data: Array<{ __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', slug: string, type?: Enum_Cemetery_Type | null, locale?: string | null } | null }> } | null };

export type ManagedObjectsStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type ManagedObjectsStaticPathsQuery = { __typename?: 'Query', managedObjects?: { __typename?: 'ManagedObjectEntityResponseCollection', data: Array<{ __typename: 'ManagedObjectEntity', id?: string | null, attributes?: { __typename?: 'ManagedObject', slug: string, type?: Enum_Managedobject_Type | null, locale?: string | null } | null }> } | null };

export type DocumentsStaticPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentsStaticPathsQuery = { __typename?: 'Query', documents?: { __typename?: 'DocumentEntityResponseCollection', data: Array<{ __typename: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', slug: string, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type HomePageQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type HomePageQuery = { __typename?: 'Query', homePage?: { __typename?: 'HomePageEntityResponse', data?: { __typename?: 'HomePageEntity', attributes?: { __typename?: 'HomePage', featured: Array<{ __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsArticlesManualListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, articles?: Array<{ __typename?: 'ComponentBlocksArticleItem', article?: { __typename?: 'ArticleEntityResponse', data?: { __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', title: string, perex?: string | null, publishedAt?: any | null, slug: string, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null, jobsCategory?: { __typename?: 'ArticleJobsCategoryEntityResponse', data?: { __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsCtaSection', id: string, title?: string | null, ctas?: Array<{ __typename?: 'ComponentBlocksSimpleCtaItem', id: string, title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsHomepageReviewsSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, reviews?: { __typename?: 'ReviewRelationResponseCollection', data: Array<{ __typename?: 'ReviewEntity', id?: string | null, attributes?: { __typename?: 'Review', author: string, date: any, rating: number, description: string } | null }> } | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsProceduresShortSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsUpcomingCeremoniesSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename?: 'Error' } | null> | null } | null } | null } | null, procedures?: { __typename?: 'ProcedureEntityResponse', data?: { __typename?: 'ProcedureEntity', attributes?: { __typename?: 'Procedure', updatedAt?: any | null, outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null } | null } | null } | null };

export type HomepageCeremoniesQueryVariables = Exact<{
  dateTime: Scalars['DateTime'];
}>;


export type HomepageCeremoniesQuery = { __typename?: 'Query', ceremonies?: { __typename?: 'CeremonyEntityResponseCollection', data: Array<{ __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, consentForPrivateFields?: boolean | null, cemetery?: { __typename?: 'CemeteryEntityResponse', data?: { __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', slug: string, title: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', slug: string, title: string } | null }> } | null } | null } | null } | null } | null }> } | null };

export type CeremoniesQueryVariables = Exact<{
  dateTime: Scalars['DateTime'];
  cemeteryIdFilter?: InputMaybe<IdFilterInput>;
}>;


export type CeremoniesQuery = { __typename?: 'Query', ceremonies?: { __typename?: 'CeremonyEntityResponseCollection', data: Array<{ __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, birthYear?: string | null, type?: string | null, company?: string | null, officiantProvidedBy?: string | null, consentForPrivateFields?: boolean | null, cemetery?: { __typename?: 'CemeteryEntityResponse', data?: { __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, slug: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, slug: string, locale?: string | null } | null }> } | null } | null } | null } | null } | null }> } | null };

export type CemeteriesInCeremoniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CemeteriesInCeremoniesQuery = { __typename?: 'Query', cemeteries?: { __typename?: 'CemeteryEntityResponseCollection', data: Array<{ __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', title: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, locale?: string | null } | null }> } | null } | null }> } | null };

export type CemeteriesInDebtorsQueryVariables = Exact<{ [key: string]: never; }>;


export type CemeteriesInDebtorsQuery = { __typename?: 'Query', cemeteries?: { __typename?: 'CemeteryEntityResponseCollection', data: Array<{ __typename: 'CemeteryEntity', id?: string | null, attributes?: { __typename?: 'Cemetery', title: string, localizations?: { __typename?: 'CemeteryRelationResponseCollection', data: Array<{ __typename?: 'CemeteryEntity', attributes?: { __typename?: 'Cemetery', title: string, locale?: string | null } | null }> } | null } | null }> } | null };

export type DocumentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentCategoriesQuery = { __typename?: 'Query', documentCategories?: { __typename?: 'DocumentCategoryEntityResponseCollection', data: Array<{ __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null }> } | null };

export type ArticleNewsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticleNewsCategoriesQuery = { __typename?: 'Query', articleNewsCategories?: { __typename?: 'ArticleNewsCategoryEntityResponseCollection', data: Array<{ __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null }> } | null };

export type ArticlePressCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlePressCategoriesQuery = { __typename?: 'Query', articlePressCategories?: { __typename?: 'ArticlePressCategoryEntityResponseCollection', data: Array<{ __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null }> } | null };

export type ArticleJobsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticleJobsCategoriesQuery = { __typename?: 'Query', articleJobsCategories?: { __typename?: 'ArticleJobsCategoryEntityResponseCollection', data: Array<{ __typename?: 'ArticleJobsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleJobsCategory', title: string, slug: string } | null }> } | null };

export type DocumentFiletypesQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentFiletypesQuery = { __typename?: 'Query', documentFiletypes?: Array<string | null> | null };

export const FlatNavigationItemFragmentDoc = gql`
    fragment FlatNavigationItem on NavigationItem {
  id
  title
  path
  type
  related {
    id
    attributes {
      __typename
      ... on Page {
        title
        slug
      }
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
    fragment PageSlugEntity on PageEntity {
  __typename
  attributes {
    slug
    locale
  }
}
    `;
export const CtaButtonFragmentDoc = gql`
    fragment CtaButton on ComponentBlocksButtonLink {
  label
  page {
    data {
      ...PageSlugEntity
    }
  }
}
    ${PageSlugEntityFragmentDoc}`;
export const UploadImageEntityFragmentDoc = gql`
    fragment UploadImageEntity on UploadFileEntity {
  id
  attributes {
    url
    name
    alternativeText
    caption
    size
    width
    height
  }
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
    data {
      ...UploadImageEntity
    }
  }
}
    ${CtaButtonFragmentDoc}
${UploadImageEntityFragmentDoc}`;
export const ArticleNewsCategoryEntityFragmentDoc = gql`
    fragment ArticleNewsCategoryEntity on ArticleNewsCategoryEntity {
  id
  attributes {
    title
    slug
  }
}
    `;
export const ArticlePressCategoryEntityFragmentDoc = gql`
    fragment ArticlePressCategoryEntity on ArticlePressCategoryEntity {
  id
  attributes {
    title
    slug
  }
}
    `;
export const ArticleJobsCategoryEntityFragmentDoc = gql`
    fragment ArticleJobsCategoryEntity on ArticleJobsCategoryEntity {
  id
  attributes {
    title
    slug
  }
}
    `;
export const ArticleSlugEntityFragmentDoc = gql`
    fragment ArticleSlugEntity on ArticleEntity {
  __typename
  id
  attributes {
    slug
    newsCategory {
      data {
        ...ArticleNewsCategoryEntity
      }
    }
    pressCategory {
      data {
        ...ArticlePressCategoryEntity
      }
    }
    jobsCategory {
      data {
        ...ArticleJobsCategoryEntity
      }
    }
  }
}
    ${ArticleNewsCategoryEntityFragmentDoc}
${ArticlePressCategoryEntityFragmentDoc}
${ArticleJobsCategoryEntityFragmentDoc}`;
export const ArticleCardEntityFragmentDoc = gql`
    fragment ArticleCardEntity on ArticleEntity {
  ...ArticleSlugEntity
  attributes {
    title
    perex
    publishedAt
    coverMedia {
      data {
        ...UploadImageEntity
      }
    }
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
      data {
        ...ArticleCardEntity
      }
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
    fragment ReviewEntity on ReviewEntity {
  id
  attributes {
    author
    date
    rating
    description
  }
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
    data {
      ...ReviewEntity
    }
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
    fragment ArticleEntity on ArticleEntity {
  ...ArticleCardEntity
  attributes {
    content
    mediaGallery {
      data {
        ...UploadImageEntity
      }
    }
    seo {
      ...Seo
    }
  }
}
    ${ArticleCardEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${SeoFragmentDoc}`;
export const BranchSlugEntityFragmentDoc = gql`
    fragment BranchSlugEntity on BranchEntity {
  __typename
  id
  attributes {
    slug
    locale
  }
}
    `;
export const BranchOfficeEntityFragmentDoc = gql`
    fragment BranchOfficeEntity on BranchEntity {
  __typename
  id
  attributes {
    slug
    locale
    title
    address
  }
}
    `;
export const ContactEntityFragmentDoc = gql`
    fragment ContactEntity on ContactEntity {
  id
  attributes {
    title
    position
    email
    phone1
    phone2
  }
}
    `;
export const OfficeEntityFragmentDoc = gql`
    fragment OfficeEntity on OfficeEntity {
  id
  attributes {
    title
    branch {
      data {
        ...BranchOfficeEntity
      }
    }
    openingHours {
      days {
        label
        time
      }
    }
    contacts {
      data {
        ...ContactEntity
      }
    }
  }
}
    ${BranchOfficeEntityFragmentDoc}
${ContactEntityFragmentDoc}`;
export const BranchCardEntityFragmentDoc = gql`
    fragment BranchCardEntity on BranchEntity {
  ...BranchSlugEntity
  attributes {
    title
    address
    offices {
      data {
        ...OfficeEntity
      }
    }
  }
}
    ${BranchSlugEntityFragmentDoc}
${OfficeEntityFragmentDoc}`;
export const BranchEntityFragmentDoc = gql`
    fragment BranchEntity on BranchEntity {
  ...BranchCardEntity
  attributes {
    description
    contact {
      data {
        ...ContactEntity
      }
    }
    medias {
      data {
        ...UploadImageEntity
      }
    }
    navigateToLink
    latitude
    longitude
    seo {
      ...Seo
    }
  }
}
    ${BranchCardEntityFragmentDoc}
${ContactEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${SeoFragmentDoc}`;
export const CemeterySlugEntityFragmentDoc = gql`
    fragment CemeterySlugEntity on CemeteryEntity {
  __typename
  id
  attributes {
    slug
    type
    locale
  }
}
    `;
export const OpeningHoursFragmentDoc = gql`
    fragment OpeningHours on ComponentBlocksOpeningHoursUniversal {
  days {
    label
    time
  }
}
    `;
export const CemeteryCardEntityFragmentDoc = gql`
    fragment CemeteryCardEntity on CemeteryEntity {
  ...CemeterySlugEntity
  attributes {
    title
    address
    overrideOpeningHours {
      ...OpeningHours
    }
  }
}
    ${CemeterySlugEntityFragmentDoc}
${OpeningHoursFragmentDoc}`;
export const CemeteryEntityFragmentDoc = gql`
    fragment CemeteryEntity on CemeteryEntity {
  ...CemeteryCardEntity
  attributes {
    type
    description
    contact {
      data {
        ...ContactEntity
      }
    }
    medias {
      data {
        ...UploadImageEntity
      }
    }
    navigateToLink
    latitude
    longitude
    seo {
      ...Seo
    }
  }
}
    ${CemeteryCardEntityFragmentDoc}
${ContactEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${SeoFragmentDoc}`;
export const CemeteryInCeremoniesDebtorsEntityFragmentDoc = gql`
    fragment CemeteryInCeremoniesDebtorsEntity on CemeteryEntity {
  __typename
  id
  attributes {
    title
    localizations {
      data {
        attributes {
          title
          locale
        }
      }
    }
  }
}
    `;
export const BundleCardEntityFragmentDoc = gql`
    fragment BundleCardEntity on BundleEntity {
  __typename
  id
  attributes {
    title
    slug
    perex
    price
    type
    discountTextShort
    discountText
    coverMedia {
      data {
        ...UploadImageEntity
      }
    }
    bundleItems {
      description
    }
    additionalItems {
      description
    }
  }
}
    ${UploadImageEntityFragmentDoc}`;
export const DocumentCategoryEntityFragmentDoc = gql`
    fragment DocumentCategoryEntity on DocumentCategoryEntity {
  id
  attributes {
    title
    slug
  }
}
    `;
export const DocumentSlugEntityFragmentDoc = gql`
    fragment DocumentSlugEntity on DocumentEntity {
  __typename
  id
  attributes {
    slug
    documentCategory {
      data {
        ...DocumentCategoryEntity
      }
    }
  }
}
    ${DocumentCategoryEntityFragmentDoc}`;
export const UploadFileEntityFragmentDoc = gql`
    fragment UploadFileEntity on UploadFileEntity {
  id
  attributes {
    url
    name
    size
    ext
  }
}
    `;
export const DocumentCardEntityFragmentDoc = gql`
    fragment DocumentCardEntity on DocumentEntity {
  ...DocumentSlugEntity
  attributes {
    title
    publishedAt
    file {
      data {
        ...UploadFileEntity
      }
    }
  }
}
    ${DocumentSlugEntityFragmentDoc}
${UploadFileEntityFragmentDoc}`;
export const DocumentGroupFragmentDoc = gql`
    fragment DocumentGroup on ComponentSectionsDocumentGroup {
  id
  title
  documents {
    document {
      data {
        ...DocumentCardEntity
      }
    }
  }
}
    ${DocumentCardEntityFragmentDoc}`;
export const SidebarFragmentDoc = gql`
    fragment Sidebar on ComponentBlocksSidebar {
  title
  text
  ctaButton {
    ...CtaButton
  }
  contact {
    data {
      ...ContactEntity
    }
  }
}
    ${CtaButtonFragmentDoc}
${ContactEntityFragmentDoc}`;
export const BundleEntityFragmentDoc = gql`
    fragment BundleEntity on BundleEntity {
  ...BundleCardEntity
  attributes {
    description
    additionalServices {
      id
      title
      description
      price
    }
    documents {
      ...DocumentGroup
    }
    sidebar {
      ...Sidebar
    }
    seo {
      ...Seo
    }
  }
}
    ${BundleCardEntityFragmentDoc}
${DocumentGroupFragmentDoc}
${SidebarFragmentDoc}
${SeoFragmentDoc}`;
export const BundleSlugEntityFragmentDoc = gql`
    fragment BundleSlugEntity on BundleEntity {
  __typename
  id
  attributes {
    slug
    type
    locale
  }
}
    `;
export const DocumentEntityFragmentDoc = gql`
    fragment DocumentEntity on DocumentEntity {
  ...DocumentCardEntity
  attributes {
    description
    seo {
      ...Seo
    }
  }
}
    ${DocumentCardEntityFragmentDoc}
${SeoFragmentDoc}`;
export const HeaderFragmentDoc = gql`
    fragment Header on ComponentGeneralHeader {
  faqPage {
    data {
      ...PageSlugEntity
    }
  }
  contact {
    data {
      ...ContactEntity
    }
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
    data {
      ...PageSlugEntity
    }
  }
  contact {
    data {
      ...ContactEntity
    }
  }
  contactsPage {
    data {
      ...PageSlugEntity
    }
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
    data {
      ...PageSlugEntity
    }
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
    label
    page {
      data {
        ...PageSlugEntity
      }
    }
  }
}
    ${FooterLinkItemFragmentDoc}
${PageSlugEntityFragmentDoc}`;
export const GeneralEntityFragmentDoc = gql`
    fragment GeneralEntity on GeneralEntity {
  attributes {
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
}
    ${HeaderFragmentDoc}
${SocialItemFragmentDoc}
${ContactFragmentDoc}
${FooterFragmentDoc}
${OpeningHoursFragmentDoc}`;
export const PartnerEntityFragmentDoc = gql`
    fragment PartnerEntity on PartnerEntity {
  id
  attributes {
    title
    link
    logo {
      data {
        ...UploadImageEntity
      }
    }
    featured
    priority
  }
}
    ${UploadImageEntityFragmentDoc}`;
export const PageCardEntityFragmentDoc = gql`
    fragment PageCardEntity on PageEntity {
  __typename
  id
  attributes {
    title
    slug
    publishedAt
    perex
    coverMedia {
      data {
        ...UploadImageEntity
      }
    }
  }
}
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
      data {
        ...BranchCardEntity
      }
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
        data {
          ...BundleCardEntity
        }
      }
    }
  }
  outsideMedicalFacility {
    title
    bundles {
      bundle {
        data {
          ...BundleCardEntity
        }
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
    data {
      ...BundleCardEntity
    }
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
      data {
        ...ContactEntity
      }
    }
  }
}
    ${ContactEntityFragmentDoc}`;
export const PartnersSectionFragmentDoc = gql`
    fragment PartnersSection on ComponentSectionsPartnersSection {
  id
  featuredPartnersTitle
  otherPartnersTitle
}
    `;
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
      data {
        ...PageCardEntity
      }
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
}
    `;
export const MapOfManagedObjectsSectionFragmentDoc = gql`
    fragment MapOfManagedObjectsSection on ComponentSectionsMapOfManagedObjects {
  id
  title
}
    `;
export const OpeningHoursSectionFragmentDoc = gql`
    fragment OpeningHoursSection on ComponentSectionsOpeningHoursSection {
  id
  title
  offices {
    office {
      data {
        ...OfficeEntity
      }
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
export const IframeSectionFragmentDoc = gql`
    fragment IframeSection on ComponentSectionsIframeSection {
  id
  title
  iframeTitle
  body
  url
}
    `;
export const PageEntityFragmentDoc = gql`
    fragment PageEntity on PageEntity {
  ...PageCardEntity
  attributes {
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
      ... on ComponentSectionsDocumentGroup {
        __typename
        ...DocumentGroup
      }
      ... on ComponentSectionsGallery {
        __typename
        id
        title
        medias(pagination: {limit: -1}) {
          data {
            ...UploadImageEntity
          }
        }
      }
      ... on ComponentSectionsPartnersSection {
        __typename
        ...PartnersSection
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
      ... on ComponentSectionsDocumentsSection {
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
${DocumentGroupFragmentDoc}
${UploadImageEntityFragmentDoc}
${PartnersSectionFragmentDoc}
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
    data {
      ...UploadFileEntity
    }
  }
}
    ${UploadFileEntityFragmentDoc}`;
export const ProceduresEntityFragmentDoc = gql`
    fragment ProceduresEntity on ProcedureEntity {
  attributes {
    outsideMedicalFacility {
      ...Procedure
    }
    atMedicalFacility {
      ...Procedure
    }
    updatedAt
  }
}
    ${ProcedureFragmentDoc}`;
export const CeremonyEntityFragmentDoc = gql`
    fragment CeremonyEntity on CeremonyEntity {
  id
  attributes {
    dateTime
    name
    birthYear
    type
    company
    officiantProvidedBy
    consentForPrivateFields
    cemetery {
      data {
        attributes {
          title
          slug
          localizations {
            data {
              attributes {
                title
                slug
                locale
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const HomepageCeremonyEntityFragmentDoc = gql`
    fragment HomepageCeremonyEntity on CeremonyEntity {
  id
  attributes {
    dateTime
    name
    consentForPrivateFields
    cemetery {
      data {
        attributes {
          slug
          title
          localizations {
            data {
              attributes {
                slug
                title
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const ManagedObjectSlugEntityFragmentDoc = gql`
    fragment ManagedObjectSlugEntity on ManagedObjectEntity {
  __typename
  id
  attributes {
    slug
    type
    locale
  }
}
    `;
export const ManagedObjectEntityFragmentDoc = gql`
    fragment ManagedObjectEntity on ManagedObjectEntity {
  ...ManagedObjectSlugEntity
  attributes {
    title
    description
    address
    navigateToLink
    latitude
    longitude
    medias {
      data {
        ...UploadImageEntity
      }
    }
    contact {
      data {
        ...ContactEntity
      }
    }
    seo {
      ...Seo
    }
  }
}
    ${ManagedObjectSlugEntityFragmentDoc}
${UploadImageEntityFragmentDoc}
${ContactEntityFragmentDoc}
${SeoFragmentDoc}`;
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
    data {
      ...GeneralEntity
    }
  }
}
    ${NavigationItemFragmentDoc}
${GeneralEntityFragmentDoc}`;
export const ProceduresDocument = gql`
    query Procedures($locale: I18NLocaleCode!) {
  procedures: procedure(locale: $locale) {
    data {
      ...ProceduresEntity
    }
  }
}
    ${ProceduresEntityFragmentDoc}`;
export const PartnersDocument = gql`
    query Partners {
  partners(pagination: {limit: -1}) {
    data {
      ...PartnerEntity
    }
  }
}
    ${PartnerEntityFragmentDoc}`;
export const ReviewsDocument = gql`
    query Reviews($locale: I18NLocaleCode!) {
  reviews(locale: $locale, sort: ["date:desc"], pagination: {limit: -1}) {
    data {
      ...ReviewEntity
    }
  }
}
    ${ReviewEntityFragmentDoc}`;
export const NewsDocument = gql`
    query News($locale: I18NLocaleCode!) {
  articles(locale: $locale, sort: ["publishedAt:desc"], pagination: {limit: 4}) {
    data {
      ...ArticleCardEntity
    }
  }
}
    ${ArticleCardEntityFragmentDoc}`;
export const ArticleBySlugDocument = gql`
    query ArticleBySlug($locale: I18NLocaleCode!, $slug: String!) {
  articles(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...ArticleEntity
    }
  }
}
    ${ArticleEntityFragmentDoc}`;
export const PageBySlugDocument = gql`
    query PageBySlug($locale: I18NLocaleCode!, $slug: String!) {
  pages(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...PageEntity
    }
  }
}
    ${PageEntityFragmentDoc}`;
export const BranchBySlugDocument = gql`
    query BranchBySlug($locale: I18NLocaleCode!, $slug: String!) {
  branches(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...BranchEntity
    }
  }
}
    ${BranchEntityFragmentDoc}`;
export const BranchesDocument = gql`
    query Branches($locale: I18NLocaleCode!) {
  branches(locale: $locale, pagination: {limit: -1}) {
    data {
      ...BranchEntity
    }
  }
}
    ${BranchEntityFragmentDoc}`;
export const CemeteryBySlugDocument = gql`
    query CemeteryBySlug($locale: I18NLocaleCode!, $slug: String!) {
  cemeteries(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...CemeteryEntity
    }
  }
}
    ${CemeteryEntityFragmentDoc}`;
export const CemeteriesDocument = gql`
    query Cemeteries($locale: I18NLocaleCode!) {
  cemeteries(locale: $locale, sort: ["title:asc"], pagination: {limit: -1}) {
    data {
      ...CemeteryEntity
    }
  }
}
    ${CemeteryEntityFragmentDoc}`;
export const ManagedObjectBySlugDocument = gql`
    query ManagedObjectBySlug($locale: I18NLocaleCode!, $slug: String!) {
  managedObjects(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...ManagedObjectEntity
    }
  }
}
    ${ManagedObjectEntityFragmentDoc}`;
export const ManagedObjectsDocument = gql`
    query ManagedObjects($locale: I18NLocaleCode!) {
  managedObjects(locale: $locale, sort: ["title:asc"], pagination: {limit: -1}) {
    data {
      ...ManagedObjectEntity
    }
  }
}
    ${ManagedObjectEntityFragmentDoc}`;
export const BundleBySlugDocument = gql`
    query BundleBySlug($locale: I18NLocaleCode!, $slug: String!) {
  bundles(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...BundleEntity
    }
  }
}
    ${BundleEntityFragmentDoc}`;
export const DocumentBySlugDocument = gql`
    query DocumentBySlug($slug: String!) {
  documents(filters: {slug: {eq: $slug}}) {
    data {
      ...DocumentEntity
    }
  }
}
    ${DocumentEntityFragmentDoc}`;
export const ArticlesStaticPathsDocument = gql`
    query ArticlesStaticPaths($locale: I18NLocaleCode) {
  articles(locale: $locale, pagination: {limit: -1}) {
    data {
      ...ArticleSlugEntity
    }
  }
}
    ${ArticleSlugEntityFragmentDoc}`;
export const PagesStaticPathsDocument = gql`
    query PagesStaticPaths($locale: I18NLocaleCode) {
  pages(locale: $locale, pagination: {limit: -1}) {
    data {
      ...PageSlugEntity
    }
  }
}
    ${PageSlugEntityFragmentDoc}`;
export const BranchesStaticPathsDocument = gql`
    query BranchesStaticPaths($locale: I18NLocaleCode) {
  branches(locale: $locale, pagination: {limit: -1}) {
    data {
      ...BranchSlugEntity
    }
  }
}
    ${BranchSlugEntityFragmentDoc}`;
export const BundlesStaticPathsDocument = gql`
    query BundlesStaticPaths($locale: I18NLocaleCode) {
  bundles(locale: $locale, pagination: {limit: -1}) {
    data {
      ...BundleSlugEntity
    }
  }
}
    ${BundleSlugEntityFragmentDoc}`;
export const CemeteriesStaticPathsDocument = gql`
    query CemeteriesStaticPaths($locale: I18NLocaleCode) {
  cemeteries(locale: $locale, pagination: {limit: -1}) {
    data {
      ...CemeterySlugEntity
    }
  }
}
    ${CemeterySlugEntityFragmentDoc}`;
export const ManagedObjectsStaticPathsDocument = gql`
    query ManagedObjectsStaticPaths($locale: I18NLocaleCode) {
  managedObjects(locale: $locale, pagination: {limit: -1}) {
    data {
      ...ManagedObjectSlugEntity
    }
  }
}
    ${ManagedObjectSlugEntityFragmentDoc}`;
export const DocumentsStaticPathsDocument = gql`
    query DocumentsStaticPaths {
  documents(pagination: {limit: -1}) {
    data {
      ...DocumentSlugEntity
    }
  }
}
    ${DocumentSlugEntityFragmentDoc}`;
export const HomePageDocument = gql`
    query HomePage($locale: I18NLocaleCode) {
  homePage(locale: $locale) {
    data {
      attributes {
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
    }
  }
  procedures: procedure(locale: $locale) {
    data {
      ...ProceduresEntity
    }
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
    data {
      ...HomepageCeremonyEntity
    }
  }
}
    ${HomepageCeremonyEntityFragmentDoc}`;
export const CeremoniesDocument = gql`
    query Ceremonies($dateTime: DateTime!, $cemeteryIdFilter: IDFilterInput = {}) {
  ceremonies(
    pagination: {limit: -1}
    filters: {dateTime: {gte: $dateTime}, cemetery: {id: $cemeteryIdFilter}}
    sort: ["dateTime:asc"]
  ) {
    data {
      ...CeremonyEntity
    }
  }
}
    ${CeremonyEntityFragmentDoc}`;
export const CemeteriesInCeremoniesDocument = gql`
    query CemeteriesInCeremonies {
  cemeteries(filters: {allowInCeremonies: {eq: true}}, pagination: {limit: -1}) {
    data {
      ...CemeteryInCeremoniesDebtorsEntity
    }
  }
}
    ${CemeteryInCeremoniesDebtorsEntityFragmentDoc}`;
export const CemeteriesInDebtorsDocument = gql`
    query CemeteriesInDebtors {
  cemeteries(filters: {allowInDebtors: {eq: true}}, pagination: {limit: -1}) {
    data {
      ...CemeteryInCeremoniesDebtorsEntity
    }
  }
}
    ${CemeteryInCeremoniesDebtorsEntityFragmentDoc}`;
export const DocumentCategoriesDocument = gql`
    query DocumentCategories {
  documentCategories(pagination: {limit: -1}) {
    data {
      ...DocumentCategoryEntity
    }
  }
}
    ${DocumentCategoryEntityFragmentDoc}`;
export const ArticleNewsCategoriesDocument = gql`
    query ArticleNewsCategories {
  articleNewsCategories(pagination: {limit: -1}) {
    data {
      ...ArticleNewsCategoryEntity
    }
  }
}
    ${ArticleNewsCategoryEntityFragmentDoc}`;
export const ArticlePressCategoriesDocument = gql`
    query ArticlePressCategories {
  articlePressCategories(pagination: {limit: -1}) {
    data {
      ...ArticlePressCategoryEntity
    }
  }
}
    ${ArticlePressCategoryEntityFragmentDoc}`;
export const ArticleJobsCategoriesDocument = gql`
    query ArticleJobsCategories {
  articleJobsCategories(pagination: {limit: -1}) {
    data {
      ...ArticleJobsCategoryEntity
    }
  }
}
    ${ArticleJobsCategoryEntityFragmentDoc}`;
export const DocumentFiletypesDocument = gql`
    query DocumentFiletypes {
  documentFiletypes
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    General(variables: GeneralQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GeneralQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GeneralQuery>(GeneralDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'General', 'query');
    },
    Procedures(variables: ProceduresQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProceduresQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProceduresQuery>(ProceduresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Procedures', 'query');
    },
    Partners(variables?: PartnersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PartnersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PartnersQuery>(PartnersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Partners', 'query');
    },
    Reviews(variables: ReviewsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReviewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReviewsQuery>(ReviewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Reviews', 'query');
    },
    News(variables: NewsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewsQuery>(NewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'News', 'query');
    },
    ArticleBySlug(variables: ArticleBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ArticleBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleBySlugQuery>(ArticleBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticleBySlug', 'query');
    },
    PageBySlug(variables: PageBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBySlugQuery>(PageBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PageBySlug', 'query');
    },
    BranchBySlug(variables: BranchBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BranchBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchBySlugQuery>(BranchBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BranchBySlug', 'query');
    },
    Branches(variables: BranchesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BranchesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchesQuery>(BranchesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Branches', 'query');
    },
    CemeteryBySlug(variables: CemeteryBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CemeteryBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteryBySlugQuery>(CemeteryBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteryBySlug', 'query');
    },
    Cemeteries(variables: CemeteriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CemeteriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesQuery>(CemeteriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Cemeteries', 'query');
    },
    ManagedObjectBySlug(variables: ManagedObjectBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ManagedObjectBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ManagedObjectBySlugQuery>(ManagedObjectBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ManagedObjectBySlug', 'query');
    },
    ManagedObjects(variables: ManagedObjectsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ManagedObjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ManagedObjectsQuery>(ManagedObjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ManagedObjects', 'query');
    },
    BundleBySlug(variables: BundleBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BundleBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BundleBySlugQuery>(BundleBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BundleBySlug', 'query');
    },
    DocumentBySlug(variables: DocumentBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DocumentBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DocumentBySlugQuery>(DocumentBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DocumentBySlug', 'query');
    },
    ArticlesStaticPaths(variables?: ArticlesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ArticlesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticlesStaticPathsQuery>(ArticlesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticlesStaticPaths', 'query');
    },
    PagesStaticPaths(variables?: PagesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesStaticPaths', 'query');
    },
    BranchesStaticPaths(variables?: BranchesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BranchesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchesStaticPathsQuery>(BranchesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BranchesStaticPaths', 'query');
    },
    BundlesStaticPaths(variables?: BundlesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BundlesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BundlesStaticPathsQuery>(BundlesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BundlesStaticPaths', 'query');
    },
    CemeteriesStaticPaths(variables?: CemeteriesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CemeteriesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesStaticPathsQuery>(CemeteriesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteriesStaticPaths', 'query');
    },
    ManagedObjectsStaticPaths(variables?: ManagedObjectsStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ManagedObjectsStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ManagedObjectsStaticPathsQuery>(ManagedObjectsStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ManagedObjectsStaticPaths', 'query');
    },
    DocumentsStaticPaths(variables?: DocumentsStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DocumentsStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DocumentsStaticPathsQuery>(DocumentsStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DocumentsStaticPaths', 'query');
    },
    HomePage(variables?: HomePageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomePageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomePageQuery>(HomePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomePage', 'query');
    },
    HomepageCeremonies(variables: HomepageCeremoniesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomepageCeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomepageCeremoniesQuery>(HomepageCeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomepageCeremonies', 'query');
    },
    Ceremonies(variables: CeremoniesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CeremoniesQuery>(CeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Ceremonies', 'query');
    },
    CemeteriesInCeremonies(variables?: CemeteriesInCeremoniesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CemeteriesInCeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesInCeremoniesQuery>(CemeteriesInCeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteriesInCeremonies', 'query');
    },
    CemeteriesInDebtors(variables?: CemeteriesInDebtorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CemeteriesInDebtorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesInDebtorsQuery>(CemeteriesInDebtorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CemeteriesInDebtors', 'query');
    },
    DocumentCategories(variables?: DocumentCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DocumentCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DocumentCategoriesQuery>(DocumentCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DocumentCategories', 'query');
    },
    ArticleNewsCategories(variables?: ArticleNewsCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ArticleNewsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleNewsCategoriesQuery>(ArticleNewsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticleNewsCategories', 'query');
    },
    ArticlePressCategories(variables?: ArticlePressCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ArticlePressCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticlePressCategoriesQuery>(ArticlePressCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticlePressCategories', 'query');
    },
    ArticleJobsCategories(variables?: ArticleJobsCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ArticleJobsCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleJobsCategoriesQuery>(ArticleJobsCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ArticleJobsCategories', 'query');
    },
    DocumentFiletypes(variables?: DocumentFiletypesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DocumentFiletypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DocumentFiletypesQuery>(DocumentFiletypesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DocumentFiletypes', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
