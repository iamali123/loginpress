import { GETAPI, GET_FEATURE_SEO_API, GET_ADDONS_API, GET_PPRICING_API,  GET_MONETBACK_API, GET_CHANGELOG_API, GET_SUPPORT_API } from "./constants";

export function apiReducer(state = [], action) {
	//  console.log("api response", action)
	switch (action.type) {
		case GETAPI:
			state = action.payload;
			return state;
		default:
			return state;
	}
}
export function FeatureSeoReducer(SEOstate = [], action) {
	switch (action.type) {
		case GET_FEATURE_SEO_API:
			SEOstate = action.payload;
			return SEOstate;
		default:
			return SEOstate;
	}
}
export function AddonsReducer(Addonstate = [], action) {
	switch (action.type) {
		case GET_ADDONS_API:
			Addonstate = action.payload;
			return Addonstate;
		default:
			return Addonstate;
	}
}
export function PricingReducer(Pricingstate = [], action) {
	switch (action.type) {
		case GET_PPRICING_API:
			Pricingstate = action.payload;
			return Pricingstate;
		default:
			return Pricingstate;
	}
}
export function MoneyBackReducer(MoneyBackstate = [], action) {
	switch (action.type) {
		case GET_MONETBACK_API:
			MoneyBackstate = action.payload;
			return MoneyBackstate;
		default:
			return MoneyBackstate;
	}
}
export function ChangeLogReducer(ChangeLogstate = [], action) {

	switch (action.type) {
		case GET_CHANGELOG_API:
			ChangeLogstate = action.payload;
			return ChangeLogstate;
		default:
			return ChangeLogstate;
	}
}
export function SupportReducer(Supportstate = [], action) {

	switch (action.type) {
		case GET_SUPPORT_API:
			Supportstate = action.payload;
			return Supportstate;
		default:
			return Supportstate;
	}
}
