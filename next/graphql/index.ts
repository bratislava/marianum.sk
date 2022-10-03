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
  DateTime: any;
  HomePageSectionsDynamicZoneInput: any;
  I18NLocaleCode: any;
  JSON: any;
  PageSectionsDynamicZoneInput: any;
  Upload: any;
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Scalars['String']>;
  coverMedia?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
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
  mediaGallery?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  newsCategory?: InputMaybe<Scalars['ID']>;
  perex?: InputMaybe<Scalars['String']>;
  pressCategory?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
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
  allowInCeremonies: Scalars['Boolean'];
  allowInDebtors: Scalars['Boolean'];
  cemeteryType?: Maybe<Enum_Branch_Cemeterytype>;
  contact?: Maybe<ContactEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<BranchRelationResponseCollection>;
  longitude?: Maybe<Scalars['Float']>;
  medias?: Maybe<UploadFileRelationResponseCollection>;
  navigateToLink?: Maybe<Scalars['String']>;
  openingHoursOverride?: Maybe<Scalars['String']>;
  seo?: Maybe<ComponentGeneralSeo>;
  slug: Scalars['String'];
  title: Scalars['String'];
  type: Enum_Branch_Type;
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
  allowInCeremonies?: InputMaybe<BooleanFilterInput>;
  allowInDebtors?: InputMaybe<BooleanFilterInput>;
  and?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  cemeteryType?: InputMaybe<StringFilterInput>;
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
  openingHoursOverride?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  seo?: InputMaybe<ComponentGeneralSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BranchInput = {
  address?: InputMaybe<Scalars['String']>;
  allowInCeremonies?: InputMaybe<Scalars['Boolean']>;
  allowInDebtors?: InputMaybe<Scalars['Boolean']>;
  cemeteryType?: InputMaybe<Enum_Branch_Cemeterytype>;
  contact?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  navigateToLink?: InputMaybe<Scalars['String']>;
  openingHoursOverride?: InputMaybe<Scalars['String']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Branch_Type>;
};

export type BranchRelationResponseCollection = {
  __typename?: 'BranchRelationResponseCollection';
  data: Array<BranchEntity>;
};

export type Bundle = {
  __typename?: 'Bundle';
  additionalServices?: Maybe<Array<Maybe<ComponentBlocksAccordionItemWithPrice>>>;
  bundleContent?: Maybe<Array<Maybe<ComponentBlocksBundleContentItem>>>;
  coverMedia?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
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
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type BundleAdditionalServicesArgs = {
  filters?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type BundleBundleContentArgs = {
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
  additionalServices?: InputMaybe<ComponentBlocksAccordionItemWithPriceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<BundleFiltersInput>>>;
  bundleContent?: InputMaybe<ComponentBlocksBundleContentItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
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
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BundleInput = {
  additionalServices?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemWithPriceInput>>>;
  bundleContent?: InputMaybe<Array<InputMaybe<ComponentBlocksBundleContentItemInput>>>;
  coverMedia?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<ComponentSectionsDocumentGroupInput>;
  perex?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentGeneralSeoInput>;
  sidebar?: InputMaybe<ComponentBlocksSidebarInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BundleRelationResponseCollection = {
  __typename?: 'BundleRelationResponseCollection';
  data: Array<BundleEntity>;
};

export type Ceremony = {
  __typename?: 'Ceremony';
  birthYear?: Maybe<Scalars['String']>;
  branch?: Maybe<BranchEntityResponse>;
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
  branch?: InputMaybe<BranchFiltersInput>;
  company?: InputMaybe<StringFilterInput>;
  consentForPrivateFields?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateTime?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CeremonyFiltersInput>;
  officiantProvidedBy?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<CeremonyFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CeremonyInput = {
  birthYear?: InputMaybe<Scalars['String']>;
  branch?: InputMaybe<Scalars['ID']>;
  company?: InputMaybe<Scalars['String']>;
  consentForPrivateFields?: InputMaybe<Scalars['Boolean']>;
  dateTime?: InputMaybe<Scalars['DateTime']>;
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

export type ComponentGeneralContacts = {
  __typename?: 'ComponentGeneralContacts';
  address?: Maybe<Scalars['String']>;
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

export type ComponentGeneralSocialInput = {
  facebook?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  instagram?: InputMaybe<Scalars['String']>;
  linkedin?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<Scalars['String']>;
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

export type ComponentSectionsBranchGroup = {
  __typename?: 'ComponentSectionsBranchGroup';
  branches?: Maybe<Array<Maybe<ComponentBlocksBranchItem>>>;
  id: Scalars['ID'];
  showOpeningHours?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsBranchGroupBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsBundleListing = {
  __typename?: 'ComponentSectionsBundleListing';
  bundles?: Maybe<Array<Maybe<ComponentBlocksBundleItem>>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsBundleListingBundlesArgs = {
  filters?: InputMaybe<ComponentBlocksBundleItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  title?: Maybe<Scalars['String']>;
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

export type ComponentSectionsPublicDisclosureSection = {
  __typename?: 'ComponentSectionsPublicDisclosureSection';
  id: Scalars['ID'];
};

export type ComponentSectionsReviewsSection = {
  __typename?: 'ComponentSectionsReviewsSection';
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
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
  name?: Maybe<Scalars['String']>;
  phone1?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
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
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContactFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactFiltersInput>>>;
  phone1?: InputMaybe<StringFilterInput>;
  phone2?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone1?: InputMaybe<Scalars['String']>;
  phone2?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ContactRelationResponseCollection = {
  __typename?: 'ContactRelationResponseCollection';
  data: Array<ContactEntity>;
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
  branch?: Maybe<BranchEntityResponse>;
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
  branch?: InputMaybe<BranchFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deathDate?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  graveNumber?: InputMaybe<StringFilterInput>;
  gravePreviousNumber?: InputMaybe<StringFilterInput>;
  graveSector?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DebtorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DebtorFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DebtorInput = {
  birthDate?: InputMaybe<Scalars['String']>;
  branch?: InputMaybe<Scalars['ID']>;
  deathDate?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  graveNumber?: InputMaybe<Scalars['String']>;
  gravePreviousNumber?: InputMaybe<Scalars['String']>;
  graveSector?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
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

export enum Enum_Branch_Cemeterytype {
  Civilny = 'civilny',
  Historicky = 'historicky',
  Vojensky = 'vojensky'
}

export enum Enum_Branch_Type {
  Cintorin = 'cintorin',
  Pobocka = 'pobocka'
}

export enum Enum_Componentsectionsdivider_Color {
  Default = 'default',
  Primary = 'primary'
}

export enum Enum_Componentsectionsmanuallisting_Style {
  Service = 'service',
  Simple = 'simple'
}

export enum Enum_Page_Layout {
  Article = 'article',
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
  contact?: Maybe<ComponentGeneralContacts>;
  createdAt?: Maybe<Scalars['DateTime']>;
  footer?: Maybe<ComponentGeneralFooter>;
  generalOpeningHours?: Maybe<Scalars['String']>;
  header?: Maybe<ComponentGeneralHeader>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<GeneralRelationResponseCollection>;
  social?: Maybe<ComponentGeneralSocial>;
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  contact?: InputMaybe<ComponentGeneralContactsInput>;
  footer?: InputMaybe<ComponentGeneralFooterInput>;
  generalOpeningHours?: InputMaybe<Scalars['String']>;
  header?: InputMaybe<ComponentGeneralHeaderInput>;
  social?: InputMaybe<ComponentGeneralSocialInput>;
};

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection';
  data: Array<GeneralEntity>;
};

export type GenericMorph = Article | ArticleNewsCategory | ArticlePressCategory | Branch | Bundle | Ceremony | ComponentBlocksAccordionItem | ComponentBlocksAccordionItemWithPrice | ComponentBlocksBlocksCeremonyArchiveBlock | ComponentBlocksBranchItem | ComponentBlocksBundleContentItem | ComponentBlocksBundleItem | ComponentBlocksButtonLink | ComponentBlocksContactItem | ComponentBlocksCta | ComponentBlocksDocumentItem | ComponentBlocksPageItem | ComponentBlocksPriceListItem | ComponentBlocksSidebar | ComponentBlocksSimpleCtaItem | ComponentGeneralContacts | ComponentGeneralFooter | ComponentGeneralHeader | ComponentGeneralLinkItem | ComponentGeneralProcedure | ComponentGeneralProcedureItem | ComponentGeneralSeo | ComponentGeneralSocial | ComponentSectionsAccordionGroup | ComponentSectionsBranchGroup | ComponentSectionsBundleListing | ComponentSectionsCeremoniesArchiveSection | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsCtaSection | ComponentSectionsDebtorsSection | ComponentSectionsDivider | ComponentSectionsDocumentGroup | ComponentSectionsGallery | ComponentSectionsManualListing | ComponentSectionsMapSection | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsPartnersSection | ComponentSectionsProceduresSection | ComponentSectionsProceduresShortSection | ComponentSectionsPublicDisclosureSection | ComponentSectionsReviewsSection | ComponentSectionsRichtext | ComponentSectionsUpcomingCeremoniesSection | Contact | Debtor | Document | DocumentCategory | General | HomePage | I18NLocale | Page | Partner | Procedure | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

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

export type HomePageSectionsDynamicZone = ComponentSectionsCtaSection | ComponentSectionsManualListing | ComponentSectionsNewsListing | ComponentSectionsProceduresShortSection | ComponentSectionsReviewsSection | ComponentSectionsUpcomingCeremoniesSection | Error;

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
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createArticle?: Maybe<ArticleEntityResponse>;
  createArticleLocalization?: Maybe<ArticleEntityResponse>;
  createArticleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  createArticlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  createBranch?: Maybe<BranchEntityResponse>;
  createBranchLocalization?: Maybe<BranchEntityResponse>;
  createBundle?: Maybe<BundleEntityResponse>;
  createBundleLocalization?: Maybe<BundleEntityResponse>;
  createCeremony?: Maybe<CeremonyEntityResponse>;
  createContact?: Maybe<ContactEntityResponse>;
  createContactLocalization?: Maybe<ContactEntityResponse>;
  createDebtor?: Maybe<DebtorEntityResponse>;
  createDocument?: Maybe<DocumentEntityResponse>;
  createDocumentCategory?: Maybe<DocumentCategoryEntityResponse>;
  createGeneralLocalization?: Maybe<GeneralEntityResponse>;
  createHomePageLocalization?: Maybe<HomePageEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  createPageLocalization?: Maybe<PageEntityResponse>;
  createPartner?: Maybe<PartnerEntityResponse>;
  createProcedureLocalization?: Maybe<ProcedureEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteArticle?: Maybe<ArticleEntityResponse>;
  deleteArticleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  deleteArticlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  deleteBranch?: Maybe<BranchEntityResponse>;
  deleteBundle?: Maybe<BundleEntityResponse>;
  deleteCeremony?: Maybe<CeremonyEntityResponse>;
  deleteContact?: Maybe<ContactEntityResponse>;
  deleteDebtor?: Maybe<DebtorEntityResponse>;
  deleteDocument?: Maybe<DocumentEntityResponse>;
  deleteDocumentCategory?: Maybe<DocumentCategoryEntityResponse>;
  deleteGeneral?: Maybe<GeneralEntityResponse>;
  deleteHomePage?: Maybe<HomePageEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePartner?: Maybe<PartnerEntityResponse>;
  deleteProcedure?: Maybe<ProcedureEntityResponse>;
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
  updateArticle?: Maybe<ArticleEntityResponse>;
  updateArticleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  updateArticlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  updateBranch?: Maybe<BranchEntityResponse>;
  updateBundle?: Maybe<BundleEntityResponse>;
  updateCeremony?: Maybe<CeremonyEntityResponse>;
  updateContact?: Maybe<ContactEntityResponse>;
  updateDebtor?: Maybe<DebtorEntityResponse>;
  updateDocument?: Maybe<DocumentEntityResponse>;
  updateDocumentCategory?: Maybe<DocumentCategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateGeneral?: Maybe<GeneralEntityResponse>;
  updateHomePage?: Maybe<HomePageEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  updatePartner?: Maybe<PartnerEntityResponse>;
  updateProcedure?: Maybe<ProcedureEntityResponse>;
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


export type MutationCreateArticleArgs = {
  data: ArticleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
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


export type MutationDeleteArticleArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
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


export type MutationUpdateArticleArgs = {
  data: ArticleInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
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

export type NavigationItemRelated = Branch | Page;

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

export type PageSectionsDynamicZone = ComponentSectionsAccordionGroup | ComponentSectionsBranchGroup | ComponentSectionsBundleListing | ComponentSectionsCeremoniesArchiveSection | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsDebtorsSection | ComponentSectionsDivider | ComponentSectionsDocumentGroup | ComponentSectionsGallery | ComponentSectionsManualListing | ComponentSectionsMapSection | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsPartnersSection | ComponentSectionsProceduresSection | ComponentSectionsPublicDisclosureSection | ComponentSectionsRichtext | Error;

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
  link?: Maybe<Scalars['String']>;
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
  article?: Maybe<ArticleEntityResponse>;
  articleNewsCategories?: Maybe<ArticleNewsCategoryEntityResponseCollection>;
  articleNewsCategory?: Maybe<ArticleNewsCategoryEntityResponse>;
  articlePressCategories?: Maybe<ArticlePressCategoryEntityResponseCollection>;
  articlePressCategory?: Maybe<ArticlePressCategoryEntityResponse>;
  articles?: Maybe<ArticleEntityResponseCollection>;
  branch?: Maybe<BranchEntityResponse>;
  branches?: Maybe<BranchEntityResponseCollection>;
  bundle?: Maybe<BundleEntityResponse>;
  bundles?: Maybe<BundleEntityResponseCollection>;
  ceremonies?: Maybe<CeremonyEntityResponseCollection>;
  ceremony?: Maybe<CeremonyEntityResponse>;
  contact?: Maybe<ContactEntityResponse>;
  contacts?: Maybe<ContactEntityResponseCollection>;
  debtor?: Maybe<DebtorEntityResponse>;
  debtors?: Maybe<DebtorEntityResponseCollection>;
  document?: Maybe<DocumentEntityResponse>;
  documentCategories?: Maybe<DocumentCategoryEntityResponseCollection>;
  documentCategory?: Maybe<DocumentCategoryEntityResponse>;
  documents?: Maybe<DocumentEntityResponseCollection>;
  general?: Maybe<GeneralEntityResponse>;
  homePage?: Maybe<HomePageEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  partner?: Maybe<PartnerEntityResponse>;
  partners?: Maybe<PartnerEntityResponseCollection>;
  procedure?: Maybe<ProcedureEntityResponse>;
  renderNavigation: Array<Maybe<NavigationItem>>;
  renderNavigationChild: Array<Maybe<NavigationItem>>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
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
  placeholder?: Maybe<Scalars['String']>;
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
  placeholder?: InputMaybe<StringFilterInput>;
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
  placeholder?: InputMaybe<Scalars['String']>;
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

export type CtaButtonFragment = { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null };

export type SidebarFragment = { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null };

export type SeoFragment = { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null };

export type CtaFragment = { __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null };

export type HeaderFragment = { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null };

export type SocialFragment = { __typename?: 'ComponentGeneralSocial', facebook?: string | null, instagram?: string | null, youtube?: string | null, linkedin?: string | null, twitter?: string | null };

export type ContactFragment = { __typename?: 'ComponentGeneralContacts', address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, contactsPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null };

export type FooterLinkItemFragment = { __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null };

export type FooterFragment = { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null };

export type ProcedureFragment = { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null };

export type AccordionGroupFragment = { __typename?: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null };

export type BranchGroupFragment = { __typename?: 'ComponentSectionsBranchGroup', id: string, title?: string | null, showOpeningHours?: boolean | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, slug: string, address?: string | null, openingHoursOverride?: string | null } | null } | null } | null } | null> | null };

export type PartnersSectionFragment = { __typename?: 'ComponentSectionsPartnersSection', id: string, featuredPartnersTitle: string, otherPartnersTitle: string };

export type MapSectionFragment = { __typename?: 'ComponentSectionsMapSection', id: string, title?: string | null };

export type BundleListingFragment = { __typename?: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleContent?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type ContactGroupFragment = { __typename?: 'ComponentSectionsContactGroup', id: string, title?: string | null, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null> | null };

export type DocumentGroupFragment = { __typename?: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, slug: string, publishedAt?: any | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null } | null } | null } | null> | null };

export type CtaSectionFragment = { __typename?: 'ComponentSectionsCtaSection', id: string, title?: string | null, ctas?: Array<{ __typename?: 'ComponentBlocksSimpleCtaItem', id: string, title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null> | null };

export type ManualListingFragment = { __typename?: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null };

export type CeremoniesSectionFragment = { __typename?: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null };

export type UpcomingCeremoniesSectionFragment = { __typename?: 'ComponentSectionsUpcomingCeremoniesSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null };

export type UploadImageEntityFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null };

export type UploadFileEntityFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null };

export type ArticleNewsCategoryEntityFragment = { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null };

export type ArticlePressCategoryEntityFragment = { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null };

export type ArticleCardEntityFragment = { __typename?: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', title: string, slug: string, perex?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null } | null };

export type ArticleEntityFragment = { __typename?: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', content?: string | null, title: string, slug: string, perex?: string | null, publishedAt?: any | null, mediaGallery?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null } | null };

export type BranchCardEntityFragment = { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, slug: string, address?: string | null, openingHoursOverride?: string | null } | null };

export type BranchEntityFragment = { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', type: Enum_Branch_Type, cemeteryType?: Enum_Branch_Cemeterytype | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, slug: string, address?: string | null, openingHoursOverride?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null };

export type BranchInCeremoniesDebtorsEntityFragment = { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, locale?: string | null } | null }> } | null } | null };

export type BundleCardEntityFragment = { __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleContent?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null };

export type BundleEntityFragment = { __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', description?: string | null, title: string, slug: string, perex?: string | null, price: number, additionalServices?: Array<{ __typename?: 'ComponentBlocksAccordionItemWithPrice', id: string, title: string, description?: string | null, price?: number | null } | null> | null, documents?: { __typename?: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, slug: string, publishedAt?: any | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null } | null } | null } | null> | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleContent?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null };

export type ContactEntityFragment = { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null };

export type DocumentCategoryEntityFragment = { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null };

export type DocumentCardEntityFragment = { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, slug: string, publishedAt?: any | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null };

export type DocumentEntityFragment = { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', description?: string | null, title: string, slug: string, publishedAt?: any | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null };

export type PartnerEntityFragment = { __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title: string, link?: string | null, featured?: boolean | null, priority?: number | null, logo: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } } | null };

export type PageSlugEntityFragment = { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null };

export type PageCardEntityFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null };

export type PageEntityFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout: Enum_Page_Layout, title: string, slug: string, publishedAt?: any | null, perex?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, showOpeningHours?: boolean | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, slug: string, address?: string | null, openingHoursOverride?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleContent?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsCeremoniesArchiveSection', id: string } | { __typename: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDebtorsSection', id: string, description?: string | null } | { __typename: 'ComponentSectionsDivider', id: string, color: Enum_Componentsectionsdivider_Color } | { __typename: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, slug: string, publishedAt?: any | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsMapSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsPartnersSection', id: string, featuredPartnersTitle: string, otherPartnersTitle: string } | { __typename: 'ComponentSectionsProceduresSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsPublicDisclosureSection', id: string } | { __typename: 'ComponentSectionsRichtext', id: string, content?: string | null } | { __typename?: 'Error' } | null> | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null };

export type ProceduresEntityFragment = { __typename?: 'ProcedureEntity', attributes?: { __typename?: 'Procedure', outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null } | null };

export type CeremonyEntityFragment = { __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, birthYear?: string | null, type?: string | null, company?: string | null, officiantProvidedBy?: string | null, consentForPrivateFields?: boolean | null, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, slug: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, slug: string, locale?: string | null } | null }> } | null } | null } | null } | null } | null };

export type HomepageCeremonyEntityFragment = { __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', slug: string, title: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', slug: string, title: string } | null }> } | null } | null } | null } | null } | null };

export type FlatNavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null };

export type NavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null };

export type GeneralEntityFragment = { __typename?: 'GeneralEntity', attributes?: { __typename?: 'General', generalOpeningHours?: string | null, header?: { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, social?: { __typename?: 'ComponentGeneralSocial', facebook?: string | null, instagram?: string | null, youtube?: string | null, linkedin?: string | null, twitter?: string | null } | null, contact?: { __typename?: 'ComponentGeneralContacts', address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, contactsPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, footer?: { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null } | null } | null };

export type GeneralQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type GeneralQuery = { __typename?: 'Query', navigation: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null>, general?: { __typename?: 'GeneralEntityResponse', data?: { __typename?: 'GeneralEntity', attributes?: { __typename?: 'General', generalOpeningHours?: string | null, header?: { __typename?: 'ComponentGeneralHeader', faqPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, social?: { __typename?: 'ComponentGeneralSocial', facebook?: string | null, instagram?: string | null, youtube?: string | null, linkedin?: string | null, twitter?: string | null } | null, contact?: { __typename?: 'ComponentGeneralContacts', address?: string | null, latitude?: string | null, longitude?: string | null, navigateToLink?: string | null, openingHoursPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, contactsPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, footer?: { __typename?: 'ComponentGeneralFooter', title1?: string | null, title2?: string | null, title3?: string | null, title4?: string | null, links1?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links2?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links3?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null, links4?: Array<{ __typename?: 'ComponentGeneralLinkItem', id: string, label: string, url?: string | null, targetBlank: boolean, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null> | null } | null } | null } | null } | null };

export type ProceduresQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type ProceduresQuery = { __typename?: 'Query', procedures?: { __typename?: 'ProcedureEntityResponse', data?: { __typename?: 'ProcedureEntity', attributes?: { __typename?: 'Procedure', outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null } | null } | null } | null };

export type PartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type PartnersQuery = { __typename?: 'Query', partners?: { __typename?: 'PartnerEntityResponseCollection', data: Array<{ __typename?: 'PartnerEntity', id?: string | null, attributes?: { __typename?: 'Partner', title: string, link?: string | null, featured?: boolean | null, priority?: number | null, logo: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } } | null }> } | null };

export type NewsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type NewsQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename?: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', title: string, slug: string, perex?: string | null, publishedAt?: any | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type ArticleBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type ArticleBySlugQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename?: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', content?: string | null, title: string, slug: string, perex?: string | null, publishedAt?: any | null, mediaGallery?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, newsCategory?: { __typename?: 'ArticleNewsCategoryEntityResponse', data?: { __typename?: 'ArticleNewsCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticleNewsCategory', title: string, slug: string } | null } | null } | null, pressCategory?: { __typename?: 'ArticlePressCategoryEntityResponse', data?: { __typename?: 'ArticlePressCategoryEntity', id?: string | null, attributes?: { __typename?: 'ArticlePressCategory', title: string, slug: string } | null } | null } | null } | null }> } | null };

export type PageBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', layout: Enum_Page_Layout, title: string, slug: string, publishedAt?: any | null, perex?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, content?: string | null } | null> | null } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, showOpeningHours?: boolean | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, slug: string, address?: string | null, openingHoursOverride?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsBundleListing', id: string, title?: string | null, description?: string | null, bundles?: Array<{ __typename?: 'ComponentBlocksBundleItem', bundle?: { __typename?: 'BundleEntityResponse', data?: { __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', title: string, slug: string, perex?: string | null, price: number, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleContent?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null } | null } | null } | null> | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsCeremoniesArchiveSection', id: string } | { __typename: 'ComponentSectionsCeremoniesSection', id: string, archive?: { __typename?: 'ComponentBlocksBlocksCeremonyArchiveBlock', title?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDebtorsSection', id: string, description?: string | null } | { __typename: 'ComponentSectionsDivider', id: string, color: Enum_Componentsectionsdivider_Color } | { __typename: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, slug: string, publishedAt?: any | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsMapSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsPartnersSection', id: string, featuredPartnersTitle: string, otherPartnersTitle: string } | { __typename: 'ComponentSectionsProceduresSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsPublicDisclosureSection', id: string } | { __typename: 'ComponentSectionsRichtext', id: string, content?: string | null } | { __typename?: 'Error' } | null> | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null }> } | null };

export type BranchBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type BranchBySlugQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', type: Enum_Branch_Type, cemeteryType?: Enum_Branch_Cemeterytype | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, slug: string, address?: string | null, openingHoursOverride?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null }> } | null };

export type BranchesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type BranchesQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', type: Enum_Branch_Type, cemeteryType?: Enum_Branch_Cemeterytype | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, slug: string, address?: string | null, openingHoursOverride?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null }> } | null };

export type CemeteriesQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type CemeteriesQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', type: Enum_Branch_Type, cemeteryType?: Enum_Branch_Cemeterytype | null, description?: string | null, navigateToLink?: string | null, latitude?: number | null, longitude?: number | null, title: string, slug: string, address?: string | null, openingHoursOverride?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null } | null }> } | null };

export type BundleBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type BundleBySlugQuery = { __typename?: 'Query', bundles?: { __typename?: 'BundleEntityResponseCollection', data: Array<{ __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', description?: string | null, title: string, slug: string, perex?: string | null, price: number, additionalServices?: Array<{ __typename?: 'ComponentBlocksAccordionItemWithPrice', id: string, title: string, description?: string | null, price?: number | null } | null> | null, documents?: { __typename?: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string, slug: string, publishedAt?: any | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null } | null } | null } | null> | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, bundleContent?: Array<{ __typename?: 'ComponentBlocksBundleContentItem', description: string } | null> | null } | null }> } | null };

export type DocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type DocumentBySlugQuery = { __typename?: 'Query', documents?: { __typename?: 'DocumentEntityResponseCollection', data: Array<{ __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', description?: string | null, title: string, slug: string, publishedAt?: any | null, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, documentCategory?: { __typename?: 'DocumentCategoryEntityResponse', data?: { __typename?: 'DocumentCategoryEntity', id?: string | null, attributes?: { __typename?: 'DocumentCategory', title: string, slug: string } | null } | null } | null, file: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } } | null }> } | null };

export type ArticlesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type ArticlesStaticPathsQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename?: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', slug: string, locale?: string | null } | null }> } | null };

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type PagesStaticPathsQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null }> } | null };

export type BranchesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type BranchesStaticPathsQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', slug: string, locale?: string | null } | null }> } | null };

export type BundlesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type BundlesStaticPathsQuery = { __typename?: 'Query', bundles?: { __typename?: 'BundleEntityResponseCollection', data: Array<{ __typename?: 'BundleEntity', id?: string | null, attributes?: { __typename?: 'Bundle', slug: string, locale?: string | null } | null }> } | null };

export type DocumentsStaticPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentsStaticPathsQuery = { __typename?: 'Query', documents?: { __typename?: 'DocumentEntityResponseCollection', data: Array<{ __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', slug: string } | null }> } | null };

export type HomePageQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type HomePageQuery = { __typename?: 'Query', homePage?: { __typename?: 'HomePageEntityResponse', data?: { __typename?: 'HomePageEntity', attributes?: { __typename?: 'HomePage', featured: Array<{ __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null>, seo?: { __typename?: 'ComponentGeneralSeo', metaTitle?: string | null, metaDescription?: string | null, keywords?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsCtaSection', id: string, title?: string | null, ctas?: Array<{ __typename?: 'ComponentBlocksSimpleCtaItem', id: string, title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null, style: Enum_Componentsectionsmanuallisting_Style, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageItem', page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, perex?: string | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsProceduresShortSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsReviewsSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsUpcomingCeremoniesSection', id: string, title?: string | null, showMoreButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null } | null } | null } | null } | { __typename?: 'Error' } | null> | null } | null } | null } | null, procedures?: { __typename?: 'ProcedureEntityResponse', data?: { __typename?: 'ProcedureEntity', attributes?: { __typename?: 'Procedure', outsideMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null, atMedicalFacility?: { __typename?: 'ComponentGeneralProcedure', title: string, steps?: Array<{ __typename?: 'ComponentGeneralProcedureItem', id: string, title: string, description?: string | null } | null> | null, downloadFile?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, size: number, ext?: string | null } | null } | null } | null } | null } | null } | null } | null };

export type HomepageCeremoniesQueryVariables = Exact<{
  dateTime: Scalars['DateTime'];
}>;


export type HomepageCeremoniesQuery = { __typename?: 'Query', ceremonies?: { __typename?: 'CeremonyEntityResponseCollection', data: Array<{ __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', slug: string, title: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', slug: string, title: string } | null }> } | null } | null } | null } | null } | null }> } | null };

export type CeremoniesQueryVariables = Exact<{
  dateTime: Scalars['DateTime'];
  branchIdFilter?: InputMaybe<IdFilterInput>;
}>;


export type CeremoniesQuery = { __typename?: 'Query', ceremonies?: { __typename?: 'CeremonyEntityResponseCollection', data: Array<{ __typename?: 'CeremonyEntity', id?: string | null, attributes?: { __typename?: 'Ceremony', dateTime: any, name?: string | null, birthYear?: string | null, type?: string | null, company?: string | null, officiantProvidedBy?: string | null, consentForPrivateFields?: boolean | null, branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, slug: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, slug: string, locale?: string | null } | null }> } | null } | null } | null } | null } | null }> } | null };

export type BranchesInCeremoniesQueryVariables = Exact<{ [key: string]: never; }>;


export type BranchesInCeremoniesQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, locale?: string | null } | null }> } | null } | null }> } | null };

export type BranchesInDebtorsQueryVariables = Exact<{ [key: string]: never; }>;


export type BranchesInDebtorsQuery = { __typename?: 'Query', branches?: { __typename?: 'BranchEntityResponseCollection', data: Array<{ __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, localizations?: { __typename?: 'BranchRelationResponseCollection', data: Array<{ __typename?: 'BranchEntity', attributes?: { __typename?: 'Branch', title: string, locale?: string | null } | null }> } | null } | null }> } | null };

export const PageSlugEntityFragmentDoc = gql`
    fragment PageSlugEntity on PageEntity {
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
export const UpcomingCeremoniesSectionFragmentDoc = gql`
    fragment UpcomingCeremoniesSection on ComponentSectionsUpcomingCeremoniesSection {
  id
  title
  showMoreButton {
    ...CtaButton
  }
}
    ${CtaButtonFragmentDoc}`;
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
export const ArticleCardEntityFragmentDoc = gql`
    fragment ArticleCardEntity on ArticleEntity {
  id
  attributes {
    title
    slug
    perex
    publishedAt
    coverMedia {
      data {
        ...UploadImageEntity
      }
    }
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
  }
}
    ${UploadImageEntityFragmentDoc}
${ArticleNewsCategoryEntityFragmentDoc}
${ArticlePressCategoryEntityFragmentDoc}`;
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
export const BranchCardEntityFragmentDoc = gql`
    fragment BranchCardEntity on BranchEntity {
  id
  attributes {
    title
    slug
    address
    openingHoursOverride
  }
}
    `;
export const ContactEntityFragmentDoc = gql`
    fragment ContactEntity on ContactEntity {
  id
  attributes {
    title
    name
    email
    phone1
    phone2
  }
}
    `;
export const BranchEntityFragmentDoc = gql`
    fragment BranchEntity on BranchEntity {
  ...BranchCardEntity
  attributes {
    type
    cemeteryType
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
export const BranchInCeremoniesDebtorsEntityFragmentDoc = gql`
    fragment BranchInCeremoniesDebtorsEntity on BranchEntity {
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
  id
  attributes {
    title
    slug
    perex
    price
    coverMedia {
      data {
        ...UploadImageEntity
      }
    }
    bundleContent {
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
  id
  attributes {
    title
    slug
    publishedAt
    documentCategory {
      data {
        ...DocumentCategoryEntity
      }
    }
    file {
      data {
        ...UploadFileEntity
      }
    }
  }
}
    ${DocumentCategoryEntityFragmentDoc}
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
  showOpeningHours
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
  bundles {
    bundle {
      data {
        ...BundleCardEntity
      }
    }
  }
  showMoreButton {
    ...CtaButton
  }
}
    ${BundleCardEntityFragmentDoc}
${CtaButtonFragmentDoc}`;
export const ContactGroupFragmentDoc = gql`
    fragment ContactGroup on ComponentSectionsContactGroup {
  id
  title
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
export const MapSectionFragmentDoc = gql`
    fragment MapSection on ComponentSectionsMapSection {
  id
  title
}
    `;
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
        medias {
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
        id
        title
        slug
      }
      ... on ComponentSectionsManualListing {
        __typename
        ...ManualListing
      }
      ... on ComponentSectionsNewsListing {
        __typename
        id
        title
      }
      ... on ComponentSectionsMapSection {
        __typename
        ...MapSection
      }
      ... on ComponentSectionsPublicDisclosureSection {
        __typename
        id
      }
      ... on ComponentSectionsRichtext {
        __typename
        id
        content
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
${ContactGroupFragmentDoc}
${DocumentGroupFragmentDoc}
${UploadImageEntityFragmentDoc}
${PartnersSectionFragmentDoc}
${ManualListingFragmentDoc}
${MapSectionFragmentDoc}
${CeremoniesSectionFragmentDoc}`;
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
    branch {
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
    branch {
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
      ... on Branch {
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
    }
  }
}
    ${FlatNavigationItemFragmentDoc}`;
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
export const SocialFragmentDoc = gql`
    fragment Social on ComponentGeneralSocial {
  facebook
  instagram
  youtube
  linkedin
  twitter
}
    `;
export const ContactFragmentDoc = gql`
    fragment Contact on ComponentGeneralContacts {
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
}
    ${FooterLinkItemFragmentDoc}`;
export const GeneralEntityFragmentDoc = gql`
    fragment GeneralEntity on GeneralEntity {
  attributes {
    header {
      ...Header
    }
    social {
      ...Social
    }
    contact {
      ...Contact
    }
    footer {
      ...Footer
    }
    generalOpeningHours
  }
}
    ${HeaderFragmentDoc}
${SocialFragmentDoc}
${ContactFragmentDoc}
${FooterFragmentDoc}`;
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
  partners {
    data {
      ...PartnerEntity
    }
  }
}
    ${PartnerEntityFragmentDoc}`;
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
  branches(locale: $locale) {
    data {
      ...BranchEntity
    }
  }
}
    ${BranchEntityFragmentDoc}`;
export const CemeteriesDocument = gql`
    query Cemeteries($locale: I18NLocaleCode!) {
  branches(
    locale: $locale
    filters: {type: {eq: "cintorin"}}
    sort: ["title:asc"]
  ) {
    data {
      ...BranchEntity
    }
  }
}
    ${BranchEntityFragmentDoc}`;
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
  articles(locale: $locale, pagination: {limit: 10000}) {
    data {
      id
      attributes {
        slug
        locale
      }
    }
  }
}
    `;
export const PagesStaticPathsDocument = gql`
    query PagesStaticPaths($locale: I18NLocaleCode) {
  pages(locale: $locale, pagination: {limit: 10000}) {
    data {
      id
      attributes {
        slug
        locale
      }
    }
  }
}
    `;
export const BranchesStaticPathsDocument = gql`
    query BranchesStaticPaths($locale: I18NLocaleCode) {
  branches(locale: $locale, pagination: {limit: 10000}) {
    data {
      id
      attributes {
        slug
        locale
      }
    }
  }
}
    `;
export const BundlesStaticPathsDocument = gql`
    query BundlesStaticPaths($locale: I18NLocaleCode) {
  bundles(locale: $locale, pagination: {limit: 10000}) {
    data {
      id
      attributes {
        slug
        locale
      }
    }
  }
}
    `;
export const DocumentsStaticPathsDocument = gql`
    query DocumentsStaticPaths {
  documents(pagination: {limit: 10000}) {
    data {
      id
      attributes {
        slug
      }
    }
  }
}
    `;
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
          ... on ComponentSectionsNewsListing {
            __typename
            id
            title
          }
          ... on ComponentSectionsUpcomingCeremoniesSection {
            __typename
            ...UpcomingCeremoniesSection
          }
          ... on ComponentSectionsProceduresShortSection {
            __typename
            id
            title
            showMoreButton {
              ...CtaButton
            }
          }
          ... on ComponentSectionsCtaSection {
            __typename
            ...CtaSection
          }
          ... on ComponentSectionsReviewsSection {
            __typename
            id
            title
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
${UpcomingCeremoniesSectionFragmentDoc}
${CtaButtonFragmentDoc}
${CtaSectionFragmentDoc}
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
    query Ceremonies($dateTime: DateTime!, $branchIdFilter: IDFilterInput = {}) {
  ceremonies(
    pagination: {limit: -1}
    filters: {dateTime: {gte: $dateTime}, branch: {id: $branchIdFilter}}
    sort: ["dateTime:asc"]
  ) {
    data {
      ...CeremonyEntity
    }
  }
}
    ${CeremonyEntityFragmentDoc}`;
export const BranchesInCeremoniesDocument = gql`
    query BranchesInCeremonies {
  branches(filters: {allowInCeremonies: {eq: true}}) {
    data {
      ...BranchInCeremoniesDebtorsEntity
    }
  }
}
    ${BranchInCeremoniesDebtorsEntityFragmentDoc}`;
export const BranchesInDebtorsDocument = gql`
    query BranchesInDebtors {
  branches(filters: {allowInDebtors: {eq: true}}) {
    data {
      ...BranchInCeremoniesDebtorsEntity
    }
  }
}
    ${BranchInCeremoniesDebtorsEntityFragmentDoc}`;

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
    Cemeteries(variables: CemeteriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CemeteriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CemeteriesQuery>(CemeteriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Cemeteries', 'query');
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
    BranchesInCeremonies(variables?: BranchesInCeremoniesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BranchesInCeremoniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchesInCeremoniesQuery>(BranchesInCeremoniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BranchesInCeremonies', 'query');
    },
    BranchesInDebtors(variables?: BranchesInDebtorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BranchesInDebtorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BranchesInDebtorsQuery>(BranchesInDebtorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BranchesInDebtors', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;