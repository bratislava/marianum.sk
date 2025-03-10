import type { Attribute, Schema } from '@strapi/strapi';

export interface BlocksAccordionItem extends Schema.Component {
  collectionName: 'components_blocks_accordion_items';
  info: {
    displayName: 'accordion item';
    icon: 'chevron-down';
  };
  attributes: {
    content: Attribute.RichText;
    title: Attribute.String;
  };
}

export interface BlocksAccordionItemWithPrice extends Schema.Component {
  collectionName: 'components_blocks_accordion_item_with_prices';
  info: {
    description: '';
    displayName: 'accordion item with price';
    icon: 'chevron-down';
  };
  attributes: {
    description: Attribute.RichText;
    price: Attribute.Decimal;
    title: Attribute.String & Attribute.Required;
  };
}

export interface BlocksArticleItem extends Schema.Component {
  collectionName: 'components_blocks_article_items';
  info: {
    displayName: 'article item';
    icon: 'newspaper';
  };
  attributes: {
    article: Attribute.Relation<
      'blocks.article-item',
      'oneToOne',
      'api::article.article'
    >;
  };
}

export interface BlocksBlocksCeremonyArchiveBlock extends Schema.Component {
  collectionName: 'components_blocks_blocks_ceremony_archive_blocks';
  info: {
    displayName: 'blocks - ceremony archive block';
  };
  attributes: {
    button: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

export interface BlocksBranchItem extends Schema.Component {
  collectionName: 'components_blocks_branch_items';
  info: {
    displayName: 'branch item';
    icon: 'cross';
  };
  attributes: {
    branch: Attribute.Relation<
      'blocks.branch-item',
      'oneToOne',
      'api::branch.branch'
    >;
  };
}

export interface BlocksBundleContentItem extends Schema.Component {
  collectionName: 'components_blocks_bundle_content_items';
  info: {
    displayName: 'bundle content item';
    icon: 'check';
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
  };
}

export interface BlocksBundleGroup extends Schema.Component {
  collectionName: 'components_blocks_bundle_groups';
  info: {
    displayName: 'bundle group';
    icon: 'gift';
  };
  attributes: {
    bundles: Attribute.Component<'blocks.bundle-item', true>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface BlocksBundleItem extends Schema.Component {
  collectionName: 'components_blocks_bundle_items';
  info: {
    displayName: 'bundle item';
    icon: 'gift';
  };
  attributes: {
    bundle: Attribute.Relation<
      'blocks.bundle-item',
      'oneToOne',
      'api::bundle.bundle'
    >;
  };
}

export interface BlocksButtonLink extends Schema.Component {
  collectionName: 'components_blocks_button_links';
  info: {
    description: '';
    displayName: 'button link';
    icon: 'arrow-right';
  };
  attributes: {
    article: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::article.article'
    >;
    branch: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::branch.branch'
    >;
    bundle: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::bundle.bundle'
    >;
    cemetery: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::cemetery.cemetery'
    >;
    document: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::document.document'
    >;
    label: Attribute.String & Attribute.Required;
    page: Attribute.Relation<
      'blocks.button-link',
      'oneToOne',
      'api::page.page'
    >;
    plausibleId: Attribute.String;
    url: Attribute.String;
  };
}

export interface BlocksContactItem extends Schema.Component {
  collectionName: 'components_blocks_contact_items';
  info: {
    displayName: 'contact item';
    icon: 'address-card';
  };
  attributes: {
    contact: Attribute.Relation<
      'blocks.contact-item',
      'oneToOne',
      'api::contact.contact'
    >;
  };
}

export interface BlocksCta extends Schema.Component {
  collectionName: 'components_blocks_ctas';
  info: {
    description: '';
    displayName: 'cta';
    icon: 'compress-arrows-alt';
  };
  attributes: {
    button: Attribute.Component<'blocks.button-link'>;
    description: Attribute.Text;
    image: Attribute.Media<'images'>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface BlocksDocumentItem extends Schema.Component {
  collectionName: 'components_blocks_document_items';
  info: {
    displayName: 'document item';
    icon: 'file';
  };
  attributes: {
    document: Attribute.Relation<
      'blocks.document-item',
      'oneToOne',
      'api::document.document'
    >;
  };
}

export interface BlocksOfficeItem extends Schema.Component {
  collectionName: 'components_blocks_office_items';
  info: {
    displayName: 'office item';
    icon: 'house-damage';
  };
  attributes: {
    office: Attribute.Relation<
      'blocks.office-item',
      'oneToOne',
      'api::office.office'
    >;
  };
}

export interface BlocksOpeningHoursItem extends Schema.Component {
  collectionName: 'components_blocks_opening_hours_items';
  info: {
    description: '';
    displayName: 'opening hours item';
    icon: 'clock';
  };
  attributes: {
    label: Attribute.String;
    time: Attribute.String;
  };
}

export interface BlocksOpeningHoursUniversal extends Schema.Component {
  collectionName: 'components_blocks_opening_hours_universals';
  info: {
    displayName: 'opening hours universal';
    icon: 'clock';
  };
  attributes: {
    days: Attribute.Component<'blocks.opening-hours-item', true>;
  };
}

export interface BlocksPageItem extends Schema.Component {
  collectionName: 'components_blocks_page_items';
  info: {
    displayName: 'page item';
    icon: 'passport';
  };
  attributes: {
    page: Attribute.Relation<'blocks.page-item', 'oneToOne', 'api::page.page'>;
  };
}

export interface BlocksPriceListItem extends Schema.Component {
  collectionName: 'components_blocks_price_list_items';
  info: {
    displayName: 'price list item';
    icon: 'list';
  };
  attributes: {
    label: Attribute.Text;
    price: Attribute.Decimal;
  };
}

export interface BlocksSidebar extends Schema.Component {
  collectionName: 'components_blocks_sidebars';
  info: {
    displayName: 'sidebar';
    icon: 'align-right';
  };
  attributes: {
    contact: Attribute.Relation<
      'blocks.sidebar',
      'oneToOne',
      'api::contact.contact'
    >;
    ctaButton: Attribute.Component<'blocks.button-link'>;
    text: Attribute.Text;
    title: Attribute.Text;
  };
}

export interface BlocksSimpleCtaItem extends Schema.Component {
  collectionName: 'components_blocks_simple_cta_items';
  info: {
    displayName: 'simple cta item';
    icon: 'bullhorn';
  };
  attributes: {
    button: Attribute.Component<'blocks.button-link'>;
    description: Attribute.Text;
    title: Attribute.String & Attribute.Required;
  };
}

export interface BlocksSocialItem extends Schema.Component {
  collectionName: 'components_blocks_social_items';
  info: {
    description: '';
    displayName: 'social item';
    icon: 'globe-europe';
  };
  attributes: {
    icon: Attribute.Enumeration<
      ['facebook', 'instagram', 'youtube', 'linkedin', 'twitter']
    >;
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface GeneralContacts extends Schema.Component {
  collectionName: 'components_general_contacts';
  info: {
    description: '';
    displayName: 'contacts';
    icon: 'address-book';
  };
  attributes: {
    address: Attribute.Text;
    addressFirstLine: Attribute.String;
    contact: Attribute.Relation<
      'general.contacts',
      'oneToOne',
      'api::contact.contact'
    >;
    contactsPage: Attribute.Relation<
      'general.contacts',
      'oneToOne',
      'api::page.page'
    >;
    latitude: Attribute.String;
    longitude: Attribute.String;
    navigateToLink: Attribute.String;
    openingHoursPage: Attribute.Relation<
      'general.contacts',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface GeneralFooter extends Schema.Component {
  collectionName: 'components_general_footers';
  info: {
    description: '';
    displayName: 'footer';
    icon: 'columns';
  };
  attributes: {
    bottomLinks: Attribute.Component<'blocks.button-link', true> &
      Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    links1: Attribute.Component<'general.link-item', true>;
    links2: Attribute.Component<'general.link-item', true>;
    links3: Attribute.Component<'general.link-item', true>;
    links4: Attribute.Component<'general.link-item', true>;
    title1: Attribute.String;
    title2: Attribute.String;
    title3: Attribute.String;
    title4: Attribute.String;
  };
}

export interface GeneralHeader extends Schema.Component {
  collectionName: 'components_general_headers';
  info: {
    description: '';
    displayName: 'header';
    icon: 'heading';
  };
  attributes: {
    contact: Attribute.Relation<
      'general.header',
      'oneToOne',
      'api::contact.contact'
    >;
    faqPage: Attribute.Relation<'general.header', 'oneToOne', 'api::page.page'>;
  };
}

export interface GeneralLinkItem extends Schema.Component {
  collectionName: 'components_general_link_items';
  info: {
    description: '';
    displayName: 'link item';
    icon: 'link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    page: Attribute.Relation<'general.link-item', 'oneToOne', 'api::page.page'>;
    targetBlank: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    url: Attribute.String;
  };
}

export interface GeneralProcedure extends Schema.Component {
  collectionName: 'components_general_procedures';
  info: {
    description: '';
    displayName: 'procedure';
    icon: 'list-ol';
  };
  attributes: {
    downloadFile: Attribute.Media<'files'>;
    steps: Attribute.Component<'general.procedure-item', true>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface GeneralProcedureItem extends Schema.Component {
  collectionName: 'components_general_procedure_items';
  info: {
    description: '';
    displayName: 'procedure item';
    icon: 'check-circle';
  };
  attributes: {
    description: Attribute.Text;
    title: Attribute.String & Attribute.Required;
  };
}

export interface GeneralSeo extends Schema.Component {
  collectionName: 'components_general_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    keywords: Attribute.String;
    metaDescription: Attribute.Text;
    metaTitle: Attribute.String;
  };
}

export interface GeneralSocial extends Schema.Component {
  collectionName: 'components_general_socials';
  info: {
    displayName: 'social';
    icon: 'globe';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    linkedin: Attribute.String;
    twitter: Attribute.String;
    youtube: Attribute.String;
  };
}

export interface SectionsAccordionGroup extends Schema.Component {
  collectionName: 'components_sections_accordion_groups';
  info: {
    displayName: 'accordion group';
    icon: 'chevron-down';
  };
  attributes: {
    accordions: Attribute.Component<'blocks.accordion-item', true>;
    title: Attribute.String;
  };
}

export interface SectionsArticleJobsListing extends Schema.Component {
  collectionName: 'components_sections_article_jobs_listings';
  info: {
    displayName: 'article jobs listing';
    icon: 'newspaper';
  };
  attributes: {};
}

export interface SectionsArticleNewsListing extends Schema.Component {
  collectionName: 'components_sections_article_news_listings';
  info: {
    displayName: 'article news listing';
    icon: 'newspaper';
  };
  attributes: {};
}

export interface SectionsArticlePressListing extends Schema.Component {
  collectionName: 'components_sections_article_press_listings';
  info: {
    displayName: 'article press listing';
    icon: 'newspaper';
  };
  attributes: {};
}

export interface SectionsArticlesManualListing extends Schema.Component {
  collectionName: 'components_sections_articles_manual_listings';
  info: {
    description: '';
    displayName: 'articles manual listing';
    icon: 'newspaper';
  };
  attributes: {
    articles: Attribute.Component<'blocks.article-item', true>;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

export interface SectionsBranchGroup extends Schema.Component {
  collectionName: 'components_sections_branch_groups';
  info: {
    description: '';
    displayName: 'branch group';
    icon: 'church';
  };
  attributes: {
    branches: Attribute.Component<'blocks.branch-item', true>;
    title: Attribute.String;
  };
}

export interface SectionsBundleListing extends Schema.Component {
  collectionName: 'components_sections_bundle_listings';
  info: {
    description: '';
    displayName: 'bundle listing';
    icon: 'gift';
  };
  attributes: {
    atMedicalFacility: Attribute.Component<'blocks.bundle-group'>;
    description: Attribute.Text;
    outsideMedicalFacility: Attribute.Component<'blocks.bundle-group'>;
    title: Attribute.String;
  };
}

export interface SectionsBundleListingSimple extends Schema.Component {
  collectionName: 'components_sections_bundle_listing_simples';
  info: {
    description: '';
    displayName: 'bundle listing simple';
    icon: 'align-justify';
  };
  attributes: {
    bundles: Attribute.Relation<
      'sections.bundle-listing-simple',
      'oneToMany',
      'api::bundle.bundle'
    >;
    description: Attribute.Text;
    title: Attribute.String;
  };
}

export interface SectionsCemeteriesOpeningHours extends Schema.Component {
  collectionName: 'components_sections_cemeteries_opening_hours';
  info: {
    description: '';
    displayName: 'cemeteries opening hours';
    icon: 'clock';
  };
  attributes: {
    buttonPosition: Attribute.Enumeration<['standard', 'below']> &
      Attribute.DefaultTo<'standard'>;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

export interface SectionsCeremoniesArchiveSection extends Schema.Component {
  collectionName: 'components_sections_ceremonies_archive_sections';
  info: {
    description: '';
    displayName: 'ceremonies archive section';
    icon: 'feather-alt';
  };
  attributes: {};
}

export interface SectionsCeremoniesSection extends Schema.Component {
  collectionName: 'components_sections_ceremonies_sections';
  info: {
    description: '';
    displayName: 'ceremonies section';
    icon: 'feather-alt';
  };
  attributes: {
    archive: Attribute.Component<'blocks.blocks-ceremony-archive-block'>;
  };
}

export interface SectionsContactGroup extends Schema.Component {
  collectionName: 'components_sections_contact_groups';
  info: {
    description: '';
    displayName: 'contact group';
    icon: 'address-card';
  };
  attributes: {
    contacts: Attribute.Component<'blocks.contact-item', true>;
    layout: Attribute.Enumeration<['default', 'condensed']> &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    title: Attribute.String;
  };
}

export interface SectionsCtaSection extends Schema.Component {
  collectionName: 'components_sections_cta_sections';
  info: {
    description: '';
    displayName: 'cta section';
    icon: 'bullhorn';
  };
  attributes: {
    ctas: Attribute.Component<'blocks.simple-cta-item', true> &
      Attribute.SetMinMax<
        {
          max: 2;
          min: 1;
        },
        number
      >;
    title: Attribute.String;
  };
}

export interface SectionsDebtorsSection extends Schema.Component {
  collectionName: 'components_sections_debtors_section';
  info: {
    description: '';
    displayName: 'debtors section';
    icon: 'euro-sign';
  };
  attributes: {
    description: Attribute.Text;
  };
}

export interface SectionsDisclosuresSection extends Schema.Component {
  collectionName: 'components_sections_disclosures_sections';
  info: {
    description: '';
    displayName: 'Disclosures section';
  };
  attributes: {};
}

export interface SectionsDivider extends Schema.Component {
  collectionName: 'components_sections_dividers';
  info: {
    description: '';
    displayName: 'divider';
    icon: 'bacon';
  };
  attributes: {
    color: Attribute.Enumeration<['default', 'primary']> &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
  };
}

export interface SectionsDocumentGroup extends Schema.Component {
  collectionName: 'components_sections_document_groups';
  info: {
    displayName: 'document group';
    icon: 'file-invoice';
  };
  attributes: {
    documents: Attribute.Component<'blocks.document-item', true>;
    title: Attribute.String;
  };
}

export interface SectionsDocumentsSection extends Schema.Component {
  collectionName: 'components_sections_documents_sections';
  info: {
    displayName: 'documents section';
    icon: 'book';
  };
  attributes: {};
}

export interface SectionsGallery extends Schema.Component {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'gallery';
    icon: 'images';
  };
  attributes: {
    medias: Attribute.Media<'images' | 'videos', true>;
    title: Attribute.String;
  };
}

export interface SectionsHomepageReviewsSection extends Schema.Component {
  collectionName: 'components_sections_homepage_reviews_sections';
  info: {
    description: '';
    displayName: 'homepage reviews section';
    icon: 'star-half-alt';
  };
  attributes: {
    reviews: Attribute.Relation<
      'sections.homepage-reviews-section',
      'oneToMany',
      'api::review.review'
    >;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

export interface SectionsIframeSection extends Schema.Component {
  collectionName: 'components_sections_iframe_sections';
  info: {
    displayName: 'iframe section';
    icon: 'code';
  };
  attributes: {
    body: Attribute.RichText;
    iframeTitle: Attribute.String & Attribute.Required;
    title: Attribute.String;
    url: Attribute.String & Attribute.Required;
  };
}

export interface SectionsManualListing extends Schema.Component {
  collectionName: 'components_sections_manual_listings';
  info: {
    description: '';
    displayName: 'manual listing';
    icon: 'hand-lizard';
  };
  attributes: {
    pages: Attribute.Component<'blocks.page-item', true>;
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    style: Attribute.Enumeration<['simple', 'service']> &
      Attribute.Required &
      Attribute.DefaultTo<'simple'>;
    title: Attribute.String;
  };
}

export interface SectionsMapOfManagedObjects extends Schema.Component {
  collectionName: 'components_sections_map_of_managed_objects';
  info: {
    description: '';
    displayName: 'Map of managed objects section';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionsMapSection extends Schema.Component {
  collectionName: 'components_sections_map_sections';
  info: {
    displayName: 'map section';
    icon: 'map-marked-alt';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionsMenuListing extends Schema.Component {
  collectionName: 'components_sections_menu_listings';
  info: {
    description: '';
    displayName: 'menu listing';
    icon: 'th-list';
  };
  attributes: {
    slug: Attribute.String & Attribute.Required;
    title: Attribute.String;
  };
}

export interface SectionsNewsListing extends Schema.Component {
  collectionName: 'components_sections_news_listings';
  info: {
    description: '';
    displayName: 'news listing';
    icon: 'newspaper';
  };
  attributes: {
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

export interface SectionsOpeningHoursSection extends Schema.Component {
  collectionName: 'components_sections_opening_hours_sections';
  info: {
    displayName: 'opening hours section';
    icon: 'clock';
  };
  attributes: {
    offices: Attribute.Component<'blocks.office-item', true> &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Attribute.String;
  };
}

export interface SectionsPartnersSection extends Schema.Component {
  collectionName: 'components_sections_partners_sections';
  info: {
    description: '';
    displayName: 'partners section';
    icon: 'handshake';
  };
  attributes: {
    featuredPartnersTitle: Attribute.String & Attribute.Required;
    otherPartnersTitle: Attribute.String & Attribute.Required;
  };
}

export interface SectionsProceduresSection extends Schema.Component {
  collectionName: 'components_sections_procedures_sections';
  info: {
    displayName: 'procedures section';
    icon: 'project-diagram';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionsProceduresShortSection extends Schema.Component {
  collectionName: 'components_sections_procedures_short_sections';
  info: {
    description: '';
    displayName: 'procedures short section';
    icon: 'project-diagram';
  };
  attributes: {
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

export interface SectionsReviewListing extends Schema.Component {
  collectionName: 'components_sections_review_listings';
  info: {
    displayName: 'review listing';
    icon: 'star-half-alt';
  };
  attributes: {};
}

export interface SectionsRichtext extends Schema.Component {
  collectionName: 'components_sections_richtexts';
  info: {
    description: '';
    displayName: 'richtext';
    icon: 'align-left';
  };
  attributes: {
    button: Attribute.Component<'blocks.button-link'>;
    content: Attribute.RichText;
  };
}

export interface SectionsUpcomingCeremoniesSection extends Schema.Component {
  collectionName: 'components_sections_upcoming_ceremonies_sections';
  info: {
    description: '';
    displayName: 'upcoming ceremonies section';
    icon: 'feather-alt';
  };
  attributes: {
    showMoreButton: Attribute.Component<'blocks.button-link'>;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.accordion-item': BlocksAccordionItem;
      'blocks.accordion-item-with-price': BlocksAccordionItemWithPrice;
      'blocks.article-item': BlocksArticleItem;
      'blocks.blocks-ceremony-archive-block': BlocksBlocksCeremonyArchiveBlock;
      'blocks.branch-item': BlocksBranchItem;
      'blocks.bundle-content-item': BlocksBundleContentItem;
      'blocks.bundle-group': BlocksBundleGroup;
      'blocks.bundle-item': BlocksBundleItem;
      'blocks.button-link': BlocksButtonLink;
      'blocks.contact-item': BlocksContactItem;
      'blocks.cta': BlocksCta;
      'blocks.document-item': BlocksDocumentItem;
      'blocks.office-item': BlocksOfficeItem;
      'blocks.opening-hours-item': BlocksOpeningHoursItem;
      'blocks.opening-hours-universal': BlocksOpeningHoursUniversal;
      'blocks.page-item': BlocksPageItem;
      'blocks.price-list-item': BlocksPriceListItem;
      'blocks.sidebar': BlocksSidebar;
      'blocks.simple-cta-item': BlocksSimpleCtaItem;
      'blocks.social-item': BlocksSocialItem;
      'general.contacts': GeneralContacts;
      'general.footer': GeneralFooter;
      'general.header': GeneralHeader;
      'general.link-item': GeneralLinkItem;
      'general.procedure': GeneralProcedure;
      'general.procedure-item': GeneralProcedureItem;
      'general.seo': GeneralSeo;
      'general.social': GeneralSocial;
      'sections.accordion-group': SectionsAccordionGroup;
      'sections.article-jobs-listing': SectionsArticleJobsListing;
      'sections.article-news-listing': SectionsArticleNewsListing;
      'sections.article-press-listing': SectionsArticlePressListing;
      'sections.articles-manual-listing': SectionsArticlesManualListing;
      'sections.branch-group': SectionsBranchGroup;
      'sections.bundle-listing': SectionsBundleListing;
      'sections.bundle-listing-simple': SectionsBundleListingSimple;
      'sections.cemeteries-opening-hours': SectionsCemeteriesOpeningHours;
      'sections.ceremonies-archive-section': SectionsCeremoniesArchiveSection;
      'sections.ceremonies-section': SectionsCeremoniesSection;
      'sections.contact-group': SectionsContactGroup;
      'sections.cta-section': SectionsCtaSection;
      'sections.debtors-section': SectionsDebtorsSection;
      'sections.disclosures-section': SectionsDisclosuresSection;
      'sections.divider': SectionsDivider;
      'sections.document-group': SectionsDocumentGroup;
      'sections.documents-section': SectionsDocumentsSection;
      'sections.gallery': SectionsGallery;
      'sections.homepage-reviews-section': SectionsHomepageReviewsSection;
      'sections.iframe-section': SectionsIframeSection;
      'sections.manual-listing': SectionsManualListing;
      'sections.map-of-managed-objects': SectionsMapOfManagedObjects;
      'sections.map-section': SectionsMapSection;
      'sections.menu-listing': SectionsMenuListing;
      'sections.news-listing': SectionsNewsListing;
      'sections.opening-hours-section': SectionsOpeningHoursSection;
      'sections.partners-section': SectionsPartnersSection;
      'sections.procedures-section': SectionsProceduresSection;
      'sections.procedures-short-section': SectionsProceduresShortSection;
      'sections.review-listing': SectionsReviewListing;
      'sections.richtext': SectionsRichtext;
      'sections.upcoming-ceremonies-section': SectionsUpcomingCeremoniesSection;
    }
  }
}
