import { combineReducers } from "redux";
import { apiReducer, FeatureSeoReducer, AddonsReducer, PricingReducer, MoneyBackReducer, SupportReducer, ChangeLogReducer } from "./reducer";

export default combineReducers({
	apiReducer,
	FeatureSeoReducer,
	AddonsReducer,
	PricingReducer,
	MoneyBackReducer,
	ChangeLogReducer,
	SupportReducer,
});
