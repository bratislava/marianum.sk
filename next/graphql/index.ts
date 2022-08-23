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
  cemeteryType?: Maybe<Enum_Branch_Cemeterytype>;
  contact?: Maybe<ContactEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<BranchRelationResponseCollection>;
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
  cemeteryType?: InputMaybe<StringFilterInput>;
  contact?: InputMaybe<ContactFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BranchFiltersInput>;
  not?: InputMaybe<BranchFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BranchFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BranchInput = {
  address?: InputMaybe<Scalars['String']>;
  cemeteryType?: InputMaybe<Enum_Branch_Cemeterytype>;
  contact?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Branch_Type>;
};

export type BranchRelationResponseCollection = {
  __typename?: 'BranchRelationResponseCollection';
  data: Array<BranchEntity>;
};

export type ComponentBlocksAccordionItem = {
  __typename?: 'ComponentBlocksAccordionItem';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksAccordionItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksAccordionItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
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

export type ComponentBlocksButtonLink = {
  __typename?: 'ComponentBlocksButtonLink';
  id: Scalars['ID'];
  label: Scalars['String'];
  targetBlank?: Maybe<Scalars['Boolean']>;
  url: Scalars['String'];
};

export type ComponentBlocksButtonLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksButtonLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksButtonLinkFiltersInput>>>;
  targetBlank?: InputMaybe<BooleanFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksButtonLinkInput = {
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  targetBlank?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
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

export type ComponentBlocksSidepanel = {
  __typename?: 'ComponentBlocksSidepanel';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
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
  contactsLink?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  featuredOpeningHours?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  navigateToLink?: Maybe<Scalars['String']>;
  openingHoursLink?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type ComponentGeneralContactsInput = {
  address?: InputMaybe<Scalars['String']>;
  contactsLink?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  featuredOpeningHours?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  navigateToLink?: InputMaybe<Scalars['String']>;
  openingHoursLink?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
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
  faqLink?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type ComponentGeneralHeaderInput = {
  faqLink?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralLinkItem = {
  __typename?: 'ComponentGeneralLinkItem';
  id: Scalars['ID'];
  label: Scalars['String'];
  targetBlank: Scalars['Boolean'];
  url: Scalars['String'];
};

export type ComponentGeneralLinkItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemFiltersInput>>>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralLinkItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkItemFiltersInput>>>;
  targetBlank?: InputMaybe<BooleanFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralLinkItemInput = {
  id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  targetBlank?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentGeneralProcedure = {
  __typename?: 'ComponentGeneralProcedure';
  downloadLink?: Maybe<Scalars['String']>;
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
  downloadLink?: InputMaybe<Scalars['String']>;
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
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsBranchGroupBranchesArgs = {
  filters?: InputMaybe<ComponentBlocksBranchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsCeremoniesSection = {
  __typename?: 'ComponentSectionsCeremoniesSection';
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
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

export type ComponentSectionsReviewsSection = {
  __typename?: 'ComponentSectionsReviewsSection';
  id: Scalars['ID'];
  showMoreButton?: Maybe<ComponentBlocksButtonLink>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsRichtext = {
  __typename?: 'ComponentSectionsRichtext';
  button?: Maybe<ComponentBlocksButtonLink>;
  id: Scalars['ID'];
  markdown?: Maybe<Scalars['String']>;
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

export type Document = {
  __typename?: 'Document';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  file: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DocumentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DocumentInput = {
  description?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
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

export enum Enum_Componentsectionsmanuallisting_Style {
  Article = 'article',
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
  header?: InputMaybe<ComponentGeneralHeaderInput>;
  social?: InputMaybe<ComponentGeneralSocialInput>;
};

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection';
  data: Array<GeneralEntity>;
};

export type GenericMorph = Branch | ComponentBlocksAccordionItem | ComponentBlocksBranchItem | ComponentBlocksButtonLink | ComponentBlocksContactItem | ComponentBlocksCta | ComponentBlocksDocumentItem | ComponentBlocksPageItem | ComponentBlocksPriceListItem | ComponentBlocksSidebar | ComponentBlocksSidepanel | ComponentBlocksSimpleCtaItem | ComponentGeneralContacts | ComponentGeneralFooter | ComponentGeneralHeader | ComponentGeneralLinkItem | ComponentGeneralProcedure | ComponentGeneralProcedureItem | ComponentGeneralSocial | ComponentSectionsAccordionGroup | ComponentSectionsBranchGroup | ComponentSectionsCeremoniesSection | ComponentSectionsContactGroup | ComponentSectionsCtaSection | ComponentSectionsDocumentGroup | ComponentSectionsGallery | ComponentSectionsManualListing | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsProceduresSection | ComponentSectionsProceduresShortSection | ComponentSectionsReviewsSection | ComponentSectionsRichtext | Contact | Document | General | HomePage | I18NLocale | Page | Partner | Procedure | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type HomePage = {
  __typename?: 'HomePage';
  createdAt?: Maybe<Scalars['DateTime']>;
  featured: Array<Maybe<ComponentBlocksCta>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<HomePageRelationResponseCollection>;
  sections?: Maybe<Array<Maybe<HomePageSectionsDynamicZone>>>;
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
};

export type HomePageRelationResponseCollection = {
  __typename?: 'HomePageRelationResponseCollection';
  data: Array<HomePageEntity>;
};

export type HomePageSectionsDynamicZone = ComponentSectionsCeremoniesSection | ComponentSectionsCtaSection | ComponentSectionsManualListing | ComponentSectionsNewsListing | ComponentSectionsProceduresShortSection | ComponentSectionsReviewsSection | Error;

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
  createBranch?: Maybe<BranchEntityResponse>;
  createBranchLocalization?: Maybe<BranchEntityResponse>;
  createContact?: Maybe<ContactEntityResponse>;
  createContactLocalization?: Maybe<ContactEntityResponse>;
  createDocument?: Maybe<DocumentEntityResponse>;
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
  deleteBranch?: Maybe<BranchEntityResponse>;
  deleteContact?: Maybe<ContactEntityResponse>;
  deleteDocument?: Maybe<DocumentEntityResponse>;
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
  updateBranch?: Maybe<BranchEntityResponse>;
  updateContact?: Maybe<ContactEntityResponse>;
  updateDocument?: Maybe<DocumentEntityResponse>;
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


export type MutationCreateBranchArgs = {
  data: BranchInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBranchLocalizationArgs = {
  data?: InputMaybe<BranchInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
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


export type MutationCreateDocumentArgs = {
  data: DocumentInput;
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


export type MutationDeleteBranchArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteDocumentArgs = {
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


export type MutationUpdateBranchArgs = {
  data: BranchInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateContactArgs = {
  data: ContactInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateDocumentArgs = {
  data: DocumentInput;
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
  sidebar?: InputMaybe<ComponentBlocksSidebarInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type PageSectionsDynamicZone = ComponentSectionsAccordionGroup | ComponentSectionsBranchGroup | ComponentSectionsContactGroup | ComponentSectionsDocumentGroup | ComponentSectionsGallery | ComponentSectionsManualListing | ComponentSectionsMenuListing | ComponentSectionsNewsListing | ComponentSectionsRichtext | Error;

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
  branch?: Maybe<BranchEntityResponse>;
  branches?: Maybe<BranchEntityResponseCollection>;
  contact?: Maybe<ContactEntityResponse>;
  contacts?: Maybe<ContactEntityResponseCollection>;
  document?: Maybe<DocumentEntityResponse>;
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


export type QueryDocumentArgs = {
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

export type CtaButtonFragment = { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null };

export type SidebarFragment = { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null };

export type CtaFragment = { __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null };

export type UploadImageEntityFragment = { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null };

export type BranchEntityFragment = { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string, slug: string, type: Enum_Branch_Type, cemeteryType?: Enum_Branch_Cemeterytype | null, description?: string | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null };

export type ContactEntityFragment = { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null };

export type PageEntityFragment = { __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, layout: Enum_Page_Layout, perex?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, description?: string | null } | null> | null } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsRichtext', id: string, markdown?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null } | { __typename?: 'Error' } | null> | null } | null };

export type FlatNavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null };

export type NavigationItemFragment = { __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null };

export type NavigationQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type NavigationQuery = { __typename?: 'Query', navigation: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, items?: Array<{ __typename?: 'NavigationItem', id: number, title: string, path?: string | null, type: string, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null> | null, related?: { __typename?: 'NavigationItemRelatedData', id: number, attributes?: { __typename: 'Branch', title: string, slug: string } | { __typename: 'Page', title: string, slug: string } | null } | null } | null>, general?: { __typename?: 'GeneralEntityResponse', data?: { __typename?: 'GeneralEntity', attributes?: { __typename?: 'General', header?: { __typename?: 'ComponentGeneralHeader', faqLink?: string | null, phoneNumber?: string | null } | null } | null } | null } | null };

export type PageBySlugQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
  slug: Scalars['String'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', title: string, slug: string, publishedAt?: any | null, layout: Enum_Page_Layout, perex?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, sidebar?: { __typename?: 'ComponentBlocksSidebar', title?: string | null, text?: string | null, ctaButton?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string, name?: string | null, email?: string | null, phone1?: string | null, phone2?: string | null } | null } | null } | null } | null, coverMedia?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordionGroup', id: string, title?: string | null, accordions?: Array<{ __typename?: 'ComponentBlocksAccordionItem', id: string, title?: string | null, description?: string | null } | null> | null } | { __typename: 'ComponentSectionsBranchGroup', id: string, title?: string | null, branches?: Array<{ __typename?: 'ComponentBlocksBranchItem', branch?: { __typename?: 'BranchEntityResponse', data?: { __typename?: 'BranchEntity', id?: string | null, attributes?: { __typename?: 'Branch', title: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsContactGroup', id: string, title?: string | null, contacts?: Array<{ __typename?: 'ComponentBlocksContactItem', contact?: { __typename?: 'ContactEntityResponse', data?: { __typename?: 'ContactEntity', id?: string | null, attributes?: { __typename?: 'Contact', title: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsDocumentGroup', id: string, title?: string | null, documents?: Array<{ __typename?: 'ComponentBlocksDocumentItem', document?: { __typename?: 'DocumentEntityResponse', data?: { __typename?: 'DocumentEntity', id?: string | null, attributes?: { __typename?: 'Document', title: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', id: string, title?: string | null, medias?: { __typename?: 'UploadFileRelationResponseCollection', data: Array<{ __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null }> } | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsMenuListing', id: string, title?: string | null, slug: string } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsRichtext', id: string, markdown?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null } | { __typename?: 'Error' } | null> | null } | null }> } | null };

export type PagesStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type PagesStaticPathsQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug: string, locale?: string | null } | null }> } | null };

export type HomePageQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type HomePageQuery = { __typename?: 'Query', homePage?: { __typename?: 'HomePageEntityResponse', data?: { __typename?: 'HomePageEntity', attributes?: { __typename?: 'HomePage', featured: Array<{ __typename?: 'ComponentBlocksCta', title: string, description?: string | null, button?: { __typename?: 'ComponentBlocksButtonLink', label: string, url: string, targetBlank?: boolean | null } | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, name: string, alternativeText?: string | null, caption?: string | null, size: number, width?: number | null, height?: number | null } | null } | null } | null } | null>, sections?: Array<{ __typename: 'ComponentSectionsCeremoniesSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsCtaSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsManualListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsNewsListing', id: string, title?: string | null } | { __typename: 'ComponentSectionsProceduresShortSection', id: string, title?: string | null } | { __typename: 'ComponentSectionsReviewsSection', id: string, title?: string | null } | { __typename?: 'Error' } | null> | null } | null } | null } | null };

export const CtaButtonFragmentDoc = gql`
    fragment CtaButton on ComponentBlocksButtonLink {
  label
  url
  targetBlank
}
    `;
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
  id
  attributes {
    title
    slug
    type
    cemeteryType
    description
    contact {
      data {
        ...ContactEntity
      }
    }
  }
}
    ${ContactEntityFragmentDoc}`;
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
export const PageEntityFragmentDoc = gql`
    fragment PageEntity on PageEntity {
  id
  attributes {
    title
    slug
    publishedAt
    layout
    perex
    ctaButton {
      ...CtaButton
    }
    sidebar {
      ...Sidebar
    }
    coverMedia {
      data {
        ...UploadImageEntity
      }
    }
    sections {
      ... on ComponentSectionsAccordionGroup {
        __typename
        id
        title
        accordions {
          id
          title
          description
        }
      }
      ... on ComponentSectionsBranchGroup {
        __typename
        id
        title
        branches {
          branch {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
      ... on ComponentSectionsContactGroup {
        __typename
        id
        title
        contacts {
          contact {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
      ... on ComponentSectionsDocumentGroup {
        __typename
        id
        title
        documents {
          document {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
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
      ... on ComponentSectionsMenuListing {
        __typename
        id
        title
        slug
      }
      ... on ComponentSectionsManualListing {
        __typename
        id
        title
      }
      ... on ComponentSectionsNewsListing {
        __typename
        id
        title
      }
      ... on ComponentSectionsRichtext {
        __typename
        id
        markdown
        button {
          label
          url
          targetBlank
        }
      }
    }
  }
}
    ${CtaButtonFragmentDoc}
${SidebarFragmentDoc}
${UploadImageEntityFragmentDoc}`;
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
export const NavigationDocument = gql`
    query Navigation($locale: I18NLocaleCode!) {
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
      attributes {
        header {
          faqLink
          phoneNumber
        }
      }
    }
  }
}
    ${NavigationItemFragmentDoc}`;
export const PageBySlugDocument = gql`
    query PageBySlug($locale: I18NLocaleCode!, $slug: String!) {
  pages(locale: $locale, filters: {slug: {eq: $slug}}) {
    data {
      ...PageEntity
    }
  }
}
    ${PageEntityFragmentDoc}`;
export const PagesStaticPathsDocument = gql`
    query PagesStaticPaths($locale: I18NLocaleCode) {
  pages(locale: $locale) {
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
export const HomePageDocument = gql`
    query HomePage($locale: I18NLocaleCode) {
  homePage(locale: $locale) {
    data {
      attributes {
        featured {
          ...Cta
        }
        sections {
          ... on ComponentSectionsManualListing {
            __typename
            id
            title
          }
          ... on ComponentSectionsNewsListing {
            __typename
            id
            title
          }
          ... on ComponentSectionsCeremoniesSection {
            __typename
            id
            title
          }
          ... on ComponentSectionsProceduresShortSection {
            __typename
            id
            title
          }
          ... on ComponentSectionsCtaSection {
            __typename
            id
            title
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
}
    ${CtaFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Navigation(variables: NavigationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NavigationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NavigationQuery>(NavigationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Navigation', 'query');
    },
    PageBySlug(variables: PageBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBySlugQuery>(PageBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PageBySlug', 'query');
    },
    PagesStaticPaths(variables?: PagesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesStaticPaths', 'query');
    },
    HomePage(variables?: HomePageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomePageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomePageQuery>(HomePageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomePage', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;