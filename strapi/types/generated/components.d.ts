import type { Schema, Struct } from '@strapi/strapi'

export interface BlocksAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordion_items'
  info: {
    displayName: 'accordion item'
    icon: 'chevron-down'
  }
  attributes: {
    content: Schema.Attribute.RichText
    title: Schema.Attribute.String
  }
}

export interface BlocksAccordionItemWithPrice extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordion_item_with_prices'
  info: {
    description: ''
    displayName: 'accordion item with price'
    icon: 'chevron-down'
  }
  attributes: {
    description: Schema.Attribute.RichText
    price: Schema.Attribute.Decimal
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksArticleItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_article_items'
  info: {
    displayName: 'article item'
    icon: 'newspaper'
  }
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>
  }
}

export interface BlocksAssetItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_asset_items'
  info: {
    displayName: 'document item'
    icon: 'file'
  }
  attributes: {
    asset: Schema.Attribute.Relation<'oneToOne', 'api::asset.asset'>
  }
}

export interface BlocksBlocksCeremonyArchiveBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_blocks_ceremony_archive_blocks'
  info: {
    displayName: 'blocks - ceremony archive block'
  }
  attributes: {
    button: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

export interface BlocksBranchItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_branch_items'
  info: {
    displayName: 'branch item'
    icon: 'cross'
  }
  attributes: {
    branch: Schema.Attribute.Relation<'oneToOne', 'api::branch.branch'>
  }
}

export interface BlocksBundleContentItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_bundle_content_items'
  info: {
    displayName: 'bundle content item'
    icon: 'check'
  }
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksBundleGroup extends Struct.ComponentSchema {
  collectionName: 'components_blocks_bundle_groups'
  info: {
    displayName: 'bundle group'
    icon: 'gift'
  }
  attributes: {
    bundles: Schema.Attribute.Component<'blocks.bundle-item', true>
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksBundleItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_bundle_items'
  info: {
    displayName: 'bundle item'
    icon: 'gift'
  }
  attributes: {
    bundle: Schema.Attribute.Relation<'oneToOne', 'api::bundle.bundle'>
  }
}

export interface BlocksButtonLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_button_links'
  info: {
    description: ''
    displayName: 'button link'
    icon: 'arrow-right'
  }
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>
    asset: Schema.Attribute.Relation<'oneToOne', 'api::asset.asset'>
    branch: Schema.Attribute.Relation<'oneToOne', 'api::branch.branch'>
    bundle: Schema.Attribute.Relation<'oneToOne', 'api::bundle.bundle'>
    cemetery: Schema.Attribute.Relation<'oneToOne', 'api::cemetery.cemetery'>
    label: Schema.Attribute.String & Schema.Attribute.Required
    managedObject: Schema.Attribute.Relation<'oneToOne', 'api::managed-object.managed-object'>
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    url: Schema.Attribute.String
  }
}

export interface BlocksContactItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_items'
  info: {
    displayName: 'contact item'
    icon: 'address-card'
  }
  attributes: {
    contact: Schema.Attribute.Relation<'oneToOne', 'api::contact.contact'>
  }
}

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas'
  info: {
    description: ''
    displayName: 'cta'
    icon: 'compress-arrows-alt'
  }
  attributes: {
    button: Schema.Attribute.Component<'blocks.button-link', false>
    description: Schema.Attribute.Text
    image: Schema.Attribute.Media<'images'>
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksOfficeItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_office_items'
  info: {
    displayName: 'office item'
    icon: 'house-damage'
  }
  attributes: {
    office: Schema.Attribute.Relation<'oneToOne', 'api::office.office'>
  }
}

export interface BlocksOpeningHoursItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_opening_hours_items'
  info: {
    description: ''
    displayName: 'opening hours item'
    icon: 'clock'
  }
  attributes: {
    label: Schema.Attribute.String
    time: Schema.Attribute.String
  }
}

export interface BlocksOpeningHoursUniversal extends Struct.ComponentSchema {
  collectionName: 'components_blocks_opening_hours_universals'
  info: {
    displayName: 'opening hours universal'
    icon: 'clock'
  }
  attributes: {
    days: Schema.Attribute.Component<'blocks.opening-hours-item', true>
  }
}

export interface BlocksPageItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_page_items'
  info: {
    displayName: 'page item'
    icon: 'passport'
  }
  attributes: {
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
  }
}

export interface BlocksPriceListItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_price_list_items'
  info: {
    displayName: 'price list item'
    icon: 'list'
  }
  attributes: {
    label: Schema.Attribute.Text
    price: Schema.Attribute.Decimal
  }
}

export interface BlocksSidebar extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sidebars'
  info: {
    displayName: 'sidebar'
    icon: 'align-right'
  }
  attributes: {
    contact: Schema.Attribute.Relation<'oneToOne', 'api::contact.contact'>
    ctaButton: Schema.Attribute.Component<'blocks.button-link', false>
    text: Schema.Attribute.Text
    title: Schema.Attribute.Text
  }
}

export interface BlocksSimpleCtaItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_simple_cta_items'
  info: {
    displayName: 'simple cta item'
    icon: 'bullhorn'
  }
  attributes: {
    button: Schema.Attribute.Component<'blocks.button-link', false>
    description: Schema.Attribute.Text
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksSocialItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_social_items'
  info: {
    description: ''
    displayName: 'social item'
    icon: 'globe-europe'
  }
  attributes: {
    icon: Schema.Attribute.Enumeration<['facebook', 'instagram', 'youtube', 'linkedin', 'twitter']>
    title: Schema.Attribute.String & Schema.Attribute.Required
    url: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface GeneralContacts extends Struct.ComponentSchema {
  collectionName: 'components_general_contacts'
  info: {
    description: ''
    displayName: 'contacts'
    icon: 'address-book'
  }
  attributes: {
    address: Schema.Attribute.Text
    addressFirstLine: Schema.Attribute.String
    contact: Schema.Attribute.Relation<'oneToOne', 'api::contact.contact'>
    contactsPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    latitude: Schema.Attribute.String
    longitude: Schema.Attribute.String
    navigateToLink: Schema.Attribute.String
    openingHoursPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
  }
}

export interface GeneralFooter extends Struct.ComponentSchema {
  collectionName: 'components_general_footers'
  info: {
    description: ''
    displayName: 'footer'
    icon: 'columns'
  }
  attributes: {
    bottomLinks: Schema.Attribute.Component<'blocks.button-link', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2
        },
        number
      >
    links1: Schema.Attribute.Component<'general.link-item', true>
    links2: Schema.Attribute.Component<'general.link-item', true>
    links3: Schema.Attribute.Component<'general.link-item', true>
    links4: Schema.Attribute.Component<'general.link-item', true>
    title1: Schema.Attribute.String
    title2: Schema.Attribute.String
    title3: Schema.Attribute.String
    title4: Schema.Attribute.String
  }
}

export interface GeneralHeader extends Struct.ComponentSchema {
  collectionName: 'components_general_headers'
  info: {
    description: ''
    displayName: 'header'
    icon: 'heading'
  }
  attributes: {
    contact: Schema.Attribute.Relation<'oneToOne', 'api::contact.contact'>
    faqPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
  }
}

export interface GeneralLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_general_link_items'
  info: {
    description: ''
    displayName: 'link item'
    icon: 'link'
  }
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    targetBlank: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>
    url: Schema.Attribute.String
  }
}

export interface GeneralProcedure extends Struct.ComponentSchema {
  collectionName: 'components_general_procedures'
  info: {
    description: ''
    displayName: 'procedure'
    icon: 'list-ol'
  }
  attributes: {
    downloadFile: Schema.Attribute.Media<'files'>
    steps: Schema.Attribute.Component<'general.procedure-item', true>
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface GeneralProcedureItem extends Struct.ComponentSchema {
  collectionName: 'components_general_procedure_items'
  info: {
    description: ''
    displayName: 'procedure item'
    icon: 'check-circle'
  }
  attributes: {
    description: Schema.Attribute.Text
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface GeneralSeo extends Struct.ComponentSchema {
  collectionName: 'components_general_seos'
  info: {
    displayName: 'seo'
    icon: 'search'
  }
  attributes: {
    keywords: Schema.Attribute.String
    metaDescription: Schema.Attribute.Text
    metaTitle: Schema.Attribute.String
  }
}

export interface GeneralSocial extends Struct.ComponentSchema {
  collectionName: 'components_general_socials'
  info: {
    displayName: 'social'
    icon: 'globe'
  }
  attributes: {
    facebook: Schema.Attribute.String
    instagram: Schema.Attribute.String
    linkedin: Schema.Attribute.String
    twitter: Schema.Attribute.String
    youtube: Schema.Attribute.String
  }
}

export interface SectionsAccordionGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_accordion_groups'
  info: {
    displayName: 'accordion group'
    icon: 'chevron-down'
  }
  attributes: {
    accordions: Schema.Attribute.Component<'blocks.accordion-item', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsArticleJobsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_jobs_listings'
  info: {
    displayName: 'article jobs listing'
    icon: 'newspaper'
  }
  attributes: {}
}

export interface SectionsArticleNewsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_news_listings'
  info: {
    displayName: 'article news listing'
    icon: 'newspaper'
  }
  attributes: {}
}

export interface SectionsArticlePressListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_press_listings'
  info: {
    displayName: 'article press listing'
    icon: 'newspaper'
  }
  attributes: {}
}

export interface SectionsArticlesManualListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_articles_manual_listings'
  info: {
    description: ''
    displayName: 'articles manual listing'
    icon: 'newspaper'
  }
  attributes: {
    articles: Schema.Attribute.Component<'blocks.article-item', true>
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

export interface SectionsAssetGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_asset_groups'
  info: {
    description: ''
    displayName: 'Document group'
    icon: 'file-invoice'
  }
  attributes: {
    assets: Schema.Attribute.Component<'blocks.asset-item', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsAssetsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_assets_sections'
  info: {
    description: ''
    displayName: 'Documents section'
    icon: 'book'
  }
  attributes: {}
}

export interface SectionsBranchGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_branch_groups'
  info: {
    description: ''
    displayName: 'branch group'
    icon: 'church'
  }
  attributes: {
    branches: Schema.Attribute.Component<'blocks.branch-item', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsBundleListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_bundle_listings'
  info: {
    description: ''
    displayName: 'bundle listing'
    icon: 'gift'
  }
  attributes: {
    atMedicalFacility: Schema.Attribute.Component<'blocks.bundle-group', false>
    description: Schema.Attribute.Text
    outsideMedicalFacility: Schema.Attribute.Component<'blocks.bundle-group', false>
    title: Schema.Attribute.String
  }
}

export interface SectionsBundleListingSimple extends Struct.ComponentSchema {
  collectionName: 'components_sections_bundle_listing_simples'
  info: {
    description: ''
    displayName: 'bundle listing simple'
    icon: 'align-justify'
  }
  attributes: {
    bundles: Schema.Attribute.Relation<'oneToMany', 'api::bundle.bundle'>
    description: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsCemeteriesOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_sections_cemeteries_opening_hours'
  info: {
    description: ''
    displayName: 'cemeteries opening hours'
    icon: 'clock'
  }
  attributes: {
    buttonPosition: Schema.Attribute.Enumeration<['standard', 'below']> &
      Schema.Attribute.DefaultTo<'standard'>
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

export interface SectionsCeremoniesArchiveSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_ceremonies_archive_sections'
  info: {
    description: ''
    displayName: 'ceremonies archive section'
    icon: 'feather-alt'
  }
  attributes: {}
}

export interface SectionsCeremoniesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_ceremonies_sections'
  info: {
    description: ''
    displayName: 'ceremonies section'
    icon: 'feather-alt'
  }
  attributes: {
    archive: Schema.Attribute.Component<'blocks.blocks-ceremony-archive-block', false>
  }
}

export interface SectionsContactGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_groups'
  info: {
    description: ''
    displayName: 'contact group'
    icon: 'address-card'
  }
  attributes: {
    contacts: Schema.Attribute.Component<'blocks.contact-item', true>
    layout: Schema.Attribute.Enumeration<['default', 'condensed']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>
    title: Schema.Attribute.String
  }
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections'
  info: {
    description: ''
    displayName: 'cta section'
    icon: 'bullhorn'
  }
  attributes: {
    ctas: Schema.Attribute.Component<'blocks.simple-cta-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2
          min: 1
        },
        number
      >
    title: Schema.Attribute.String
  }
}

export interface SectionsDebtorsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_debtors_section'
  info: {
    description: ''
    displayName: 'debtors section'
    icon: 'euro-sign'
  }
  attributes: {
    description: Schema.Attribute.Text
  }
}

export interface SectionsDisclosuresSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_disclosures_sections'
  info: {
    description: ''
    displayName: 'Disclosures section'
  }
  attributes: {}
}

export interface SectionsDivider extends Struct.ComponentSchema {
  collectionName: 'components_sections_dividers'
  info: {
    description: ''
    displayName: 'divider'
    icon: 'bacon'
  }
  attributes: {
    color: Schema.Attribute.Enumeration<['default', 'primary']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>
  }
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries'
  info: {
    displayName: 'gallery'
    icon: 'images'
  }
  attributes: {
    medias: Schema.Attribute.Media<'images' | 'videos', true>
    title: Schema.Attribute.String
  }
}

export interface SectionsHomepageReviewsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_homepage_reviews_sections'
  info: {
    description: ''
    displayName: 'homepage reviews section'
    icon: 'star-half-alt'
  }
  attributes: {
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

export interface SectionsIframeSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_iframe_sections'
  info: {
    displayName: 'iframe section'
    icon: 'code'
  }
  attributes: {
    body: Schema.Attribute.RichText
    iframeTitle: Schema.Attribute.String & Schema.Attribute.Required
    title: Schema.Attribute.String
    url: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsManualListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_manual_listings'
  info: {
    description: ''
    displayName: 'manual listing'
    icon: 'hand-lizard'
  }
  attributes: {
    pages: Schema.Attribute.Component<'blocks.page-item', true>
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    style: Schema.Attribute.Enumeration<['simple', 'service']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'simple'>
    title: Schema.Attribute.String
  }
}

export interface SectionsMapOfManagedObjects extends Struct.ComponentSchema {
  collectionName: 'components_sections_map_of_managed_objects'
  info: {
    description: ''
    displayName: 'Map of managed objects section'
  }
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::managed-object-category.managed-object-category'
    >
    title: Schema.Attribute.String
  }
}

export interface SectionsMapSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_map_sections'
  info: {
    description: ''
    displayName: 'map of cemeteries section'
    icon: 'map-marked-alt'
  }
  attributes: {
    categories: Schema.Attribute.Relation<'oneToMany', 'api::cemetery-category.cemetery-category'>
    title: Schema.Attribute.String
  }
}

export interface SectionsMenuListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_menu_listings'
  info: {
    description: ''
    displayName: 'menu listing'
    icon: 'th-list'
  }
  attributes: {
    slug: Schema.Attribute.String & Schema.Attribute.Required
    title: Schema.Attribute.String
  }
}

export interface SectionsNewsListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_news_listings'
  info: {
    description: ''
    displayName: 'news listing'
    icon: 'newspaper'
  }
  attributes: {
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

export interface SectionsOpeningHoursSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_opening_hours_sections'
  info: {
    displayName: 'opening hours section'
    icon: 'clock'
  }
  attributes: {
    offices: Schema.Attribute.Component<'blocks.office-item', true> &
      Schema.Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    title: Schema.Attribute.String
  }
}

export interface SectionsProceduresSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_procedures_sections'
  info: {
    displayName: 'procedures section'
    icon: 'project-diagram'
  }
  attributes: {
    title: Schema.Attribute.String
  }
}

export interface SectionsProceduresShortSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_procedures_short_sections'
  info: {
    description: ''
    displayName: 'procedures short section'
    icon: 'project-diagram'
  }
  attributes: {
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

export interface SectionsReviewListing extends Struct.ComponentSchema {
  collectionName: 'components_sections_review_listings'
  info: {
    displayName: 'review listing'
    icon: 'star-half-alt'
  }
  attributes: {}
}

export interface SectionsRichtext extends Struct.ComponentSchema {
  collectionName: 'components_sections_richtexts'
  info: {
    description: ''
    displayName: 'richtext'
    icon: 'align-left'
  }
  attributes: {
    button: Schema.Attribute.Component<'blocks.button-link', false>
    content: Schema.Attribute.RichText
  }
}

export interface SectionsUpcomingCeremoniesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_upcoming_ceremonies_sections'
  info: {
    description: ''
    displayName: 'upcoming ceremonies section'
    icon: 'feather-alt'
  }
  attributes: {
    showMoreButton: Schema.Attribute.Component<'blocks.button-link', false>
    title: Schema.Attribute.String
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.accordion-item': BlocksAccordionItem
      'blocks.accordion-item-with-price': BlocksAccordionItemWithPrice
      'blocks.article-item': BlocksArticleItem
      'blocks.asset-item': BlocksAssetItem
      'blocks.blocks-ceremony-archive-block': BlocksBlocksCeremonyArchiveBlock
      'blocks.branch-item': BlocksBranchItem
      'blocks.bundle-content-item': BlocksBundleContentItem
      'blocks.bundle-group': BlocksBundleGroup
      'blocks.bundle-item': BlocksBundleItem
      'blocks.button-link': BlocksButtonLink
      'blocks.contact-item': BlocksContactItem
      'blocks.cta': BlocksCta
      'blocks.office-item': BlocksOfficeItem
      'blocks.opening-hours-item': BlocksOpeningHoursItem
      'blocks.opening-hours-universal': BlocksOpeningHoursUniversal
      'blocks.page-item': BlocksPageItem
      'blocks.price-list-item': BlocksPriceListItem
      'blocks.sidebar': BlocksSidebar
      'blocks.simple-cta-item': BlocksSimpleCtaItem
      'blocks.social-item': BlocksSocialItem
      'general.contacts': GeneralContacts
      'general.footer': GeneralFooter
      'general.header': GeneralHeader
      'general.link-item': GeneralLinkItem
      'general.procedure': GeneralProcedure
      'general.procedure-item': GeneralProcedureItem
      'general.seo': GeneralSeo
      'general.social': GeneralSocial
      'sections.accordion-group': SectionsAccordionGroup
      'sections.article-jobs-listing': SectionsArticleJobsListing
      'sections.article-news-listing': SectionsArticleNewsListing
      'sections.article-press-listing': SectionsArticlePressListing
      'sections.articles-manual-listing': SectionsArticlesManualListing
      'sections.asset-group': SectionsAssetGroup
      'sections.assets-section': SectionsAssetsSection
      'sections.branch-group': SectionsBranchGroup
      'sections.bundle-listing': SectionsBundleListing
      'sections.bundle-listing-simple': SectionsBundleListingSimple
      'sections.cemeteries-opening-hours': SectionsCemeteriesOpeningHours
      'sections.ceremonies-archive-section': SectionsCeremoniesArchiveSection
      'sections.ceremonies-section': SectionsCeremoniesSection
      'sections.contact-group': SectionsContactGroup
      'sections.cta-section': SectionsCtaSection
      'sections.debtors-section': SectionsDebtorsSection
      'sections.disclosures-section': SectionsDisclosuresSection
      'sections.divider': SectionsDivider
      'sections.gallery': SectionsGallery
      'sections.homepage-reviews-section': SectionsHomepageReviewsSection
      'sections.iframe-section': SectionsIframeSection
      'sections.manual-listing': SectionsManualListing
      'sections.map-of-managed-objects': SectionsMapOfManagedObjects
      'sections.map-section': SectionsMapSection
      'sections.menu-listing': SectionsMenuListing
      'sections.news-listing': SectionsNewsListing
      'sections.opening-hours-section': SectionsOpeningHoursSection
      'sections.procedures-section': SectionsProceduresSection
      'sections.procedures-short-section': SectionsProceduresShortSection
      'sections.review-listing': SectionsReviewListing
      'sections.richtext': SectionsRichtext
      'sections.upcoming-ceremonies-section': SectionsUpcomingCeremoniesSection
    }
  }
}
