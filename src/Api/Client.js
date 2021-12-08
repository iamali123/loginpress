export const GRAPHQL_API = "https://beta.loginpress.pro/graphql"

export const QUERY = `{
      logo: loginpressThemeSettings {
        loginpressGeneralSettings {
          loginpressLogo {
            mediaItemUrl
            altText
          }
        }
      }
      mainmenu: menus(where: {id: 10}) {
		nodes {
		  count
		  id
		  databaseId
		  name
		  slug
		  menuItems {
			edges {
			  node {
				id
				url
				path
				cssClasses
				description
				label
				target
				parentId
				navMenuItem {
				  loginpressSpanIcon {
					sourceUrl
					altText
				  }
				}
				childItems {
				  nodes {
					id
					url
					path
					cssClasses
					description
					label
					target
					parentId
					navMenuItem {
					  loginpressSpanIcon {
						sourceUrl
						altText
					  }
					}
				  }
				}
			  }
			}
		  }
		}
	  }
	  
      smallmenu: menus(where: {id: 137}) {
        nodes {
          name
          menuItems {
            edges {
              node {
                id
                url
                cssClasses
                description
                label
                target
                parentId
              }
            }
          }
        }
      }

	  page(id: "home", idType: URI) {
		seo {
		  title
		  canonical
		  focuskw
		  metaDesc
		  metaKeywords
		  metaRobotsNofollow
		  metaRobotsNoindex
		  opengraphDescription
		  opengraphPublisher
		  opengraphSiteName
		  opengraphTitle
		  opengraphType
		  opengraphUrl
		  twitterDescription
		  twitterTitle
		  breadcrumbs {
			text
			url
		  }
		  cornerstone
		  opengraphAuthor
		  opengraphImage {
			title
			sourceUrl
			caption
		  }
		  twitterImage {
			sourceUrl
			title
			caption
			description
			sizes
		  }
		}
		slug
		title
		homePageMeta {
		  heroSection {
			title
			description
			goProCta {
			  text
			  openInNewTab
			  link
			}
			videoCta {
			  text
			  videoLink
			}
			features {
			  fieldGroupName
			  title
			  image {
				sourceUrl
				title
			  }
			}
			bannerImage {
			  sourceUrl
			  title
			}
		  }
		  brandsSection {
			fieldGroupName
			title
			logos {
			  image {
				sourceUrl
				title
			  }
			}
		  }
		  downloadSection {
			title
			description
			currentDownloads
			image {
			  title
			  sourceUrl
			}
		  }
		  topFeaturesSection {
			title
			description
			features {
			  title
			  description
			  image {
				sourceUrl
				title
			  }
			}
		  }
		  testimonialsSection {
			title
			description
			testimonial {
			  title
			  description
			  reviewBy
			  stars
			}
			viewMoreCta {
			  text
			  link
			  openInNewTab
			}
		  }
		  faqSection {
			getInTouchCta {
			  text
			  openInNewTab
			  link
			}
		  }
		}
	  }
 faqs {
      edges {
        node {
          title
          content
        }
      }
    }
    acfOptionsArchiveSeo {
        archiveSeo {
            faq {
                canonical
                fieldGroupName
                metadesc
                metakeywords
                metarobotsnofollow
                metarobotsnoindex
                opengraphauthor
                opengraphdescription
                opengraphpublisher
                opengraphsitename
                opengraphtitle
                opengraphtype
                opengraphurl
                title
                twitterdescription
                twittertitle
              }
        }
      }
	 
	  
		docsCategory {
		  edges {
			node {
			  name
			  uri
			  docs {
				nodes {
				  title
				  uri
				}
			  }
			}
		  }
		}
		acfOptionsArchiveSeo {
		  archiveSeo {
			documentation {
			  canonical
			  fieldGroupName
			  metadesc
			  metakeywords
			  metarobotsnofollow
			  metarobotsnoindex
			  opengraphauthor
			  opengraphdescription
			  opengraphpublisher
			  opengraphsitename
			  opengraphtitle
			  opengraphtype
			  opengraphurl
			  title
			  twitterdescription
			  twittertitle
			}
		  }
		}
			  
		
	  gravityFormsForm(id: "2", idType: DATABASE_ID) {
		formFields {
		  nodes {
			id
			type
			cssClass
			... on TextField {
			  label
			  placeholder
        isRequired
			}
			... on EmailField {
        label
			  placeholder
        isRequired
			}
			... on SelectField {
        isRequired
        label
			  choices {
				isSelected
				text
				value
			  }
			}
			... on WebsiteField {
			  label
			  placeholder
        isRequired
			}
			... on TextAreaField {
			  label
			  placeholder
        isRequired
			}
		  }
		}
	  }
  loginpressThemeSettings {
    loginpressGeneralSettings {
      footer {
        footerArea1
        quickLinks {
          menuLink
          menuText
        }
        supportLinks {
          menuLink
          menuText
        }
        socialLinks {
		  label
          socialIconClass
          socialLink
        }
        footerBar: footerBar {
          copyrightNote
          ctaLinks {
            ctaText
            ctaLink
          }
        }
      }
    }
  }

}`;
export const Feature_SEO_QUERY = `{ 
		page(idType: URI, id: "features") {
			seo {
				title
				canonical
				focuskw
				metaDesc
				metaKeywords
				metaRobotsNofollow
				metaRobotsNoindex
				opengraphDescription
				opengraphPublisher
				opengraphSiteName
				opengraphTitle
				opengraphType
				opengraphUrl
				twitterDescription
				twitterTitle
				breadcrumbs {
				  text
				  url
				}
				cornerstone
				opengraphAuthor
				opengraphImage {
				  title
				  sourceUrl
				  caption
				}
				twitterImage {
				  sourceUrl
				  title
				  caption
				  description
				  sizes
				}
			  }
		  slug
		  title
		  features {
			featureMainHeading
			featurePageSubtext
			featureDetails {
			  name
			  description
			  beforeImage {
				animationClass
				image {
				  title
				  sourceUrl
				}
			  }
			  image {
				animationClass
				image {
				  title
				  sourceUrl
				}
			  }
			  youtubeLink
			}
		  }
		}
		}`;
	export	const ADDONS_QUERY = `{ 
			page(id: "add-ons", idType: URI) {
				seo {
					title
					canonical
					focuskw
					metaDesc
					metaKeywords
					metaRobotsNofollow
					metaRobotsNoindex
					opengraphDescription
					opengraphPublishedTime
					opengraphPublisher
					opengraphSiteName
					opengraphTitle
					opengraphType
					opengraphUrl
					twitterDescription
					twitterTitle
					breadcrumbs {
					  text
					  url
					}
					cornerstone
					opengraphAuthor
					twitterImage {
					  sourceUrl
					  title
					  altText
					  caption
					  description
					}
					opengraphImage {
					  altText
					  sourceUrl
					  title
					  caption
					}
				  }
				slug
				title
				addons {
				  title
				  description
				  addonDetails {
					name
					description
					youtubeLink
					background {
					  animationClass
					  background {
						sourceUrl
					  }
					}
					image {
					  animationClass
					  image {
						title
						sourceUrl
					  }
					}
				  }
				}
			  }
	}`;
export	const PRICING_QUERY = `{ 
		page(id: "pricing", idType: URI) {
			seo {
			  canonical
			  focuskw
			  fullHead
			  metaDesc
			  metaKeywords
			  metaRobotsNofollow
			  metaRobotsNoindex
			  opengraphAuthor
			  opengraphDescription
			  opengraphModifiedTime
			  opengraphPublishedTime
			  opengraphPublisher
			  opengraphSiteName
			  opengraphTitle
			  opengraphType
			  opengraphUrl
			  title
			  twitterDescription
			  twitterTitle
			}
			slug
			title
			  pricingPage {
				subTitle
				prices {
				  title
				  currency
				  amount
				  amountFraction
				  highlighted
				  features {
					feature
				  }
				  buyNowCta {
					text
					link
					openInNewTab
				  }
				  learnMoreCta {
					text
					link
					openInNewTab
				  }
				  renewal
				}
			  }
			}
}`;
export const MONEY_BACK = `{ 
	loginpressThemeSettings {
		loginpressGeneralSettings {
		   guarantee {
			title
			subtext
			guaranteeCard {
			  heading
			  subtext
			  image {
				sourceUrl
				title
			  }
			}
			beforeImage {
			  animationClass
			  image {
				sourceUrl
				title
			  }
			}
		  }
		}
	  }
}`;

export const CHANGELOG_QUERY = `{
	changelogs(where: {orderby: {field: DATE, order: DESC}}, first: 10, after: "") {
		edges {
		  node {
			date
			title
			changelogCategories {
			  nodes {
				label: name
				class: slug
			  }
			}
			changeLog {
			  logContent {
				type
				content
			  }
			}
		  }
		  cursor
		}
		pageInfo {
		  endCursor
		  hasNextPage
		  startCursor
		}
	  }
	  acfOptionsArchiveSeo {
		  archiveSeo {
			changeLog {
			  canonical
			  fieldGroupName
			  metadesc
			  metakeywords
			  metarobotsnofollow
			  metarobotsnoindex
			  opengraphauthor
			  opengraphdescription
			  opengraphpublisher
			  opengraphsitename
			  opengraphtitle
			  opengraphtype
			  opengraphurl
			  title
			  twitterdescription
			  twittertitle
			}
		  }
		}
		}`;

	export const SUPPORT_QUERY = `{
		page(id: "support", idType: URI) {
			seo {
			  title
			  canonical
			  focuskw
			  metaDesc
			  metaKeywords
			  metaRobotsNofollow
			  metaRobotsNoindex
			  opengraphDescription
			  opengraphPublisher
			  opengraphSiteName
			  opengraphTitle
			  opengraphType
			  opengraphUrl
			  twitterDescription
			  twitterTitle
			  breadcrumbs {
				text
				url
			  }
			  cornerstone
			  opengraphAuthor
			  opengraphImage {
				title
				sourceUrl
				caption
			  }
			  twitterImage {
				sourceUrl
				title
				caption
				description
				sizes
			  }
			}
			support {
			  heading
			  subHeading
			  section {
				title
				link
				openInNewTab
				image {
				  title
				  sourceUrl
				}
			  }
			}
		  }
	}`