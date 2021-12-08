import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import HomeApp from "./Home-Components/HomeApp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header-Components/Header";
import Footer from "./Footer-Components/Footer";
import Changelog from "./ChangeLog-Components/Changelog";
import DocApp from "./Documentation-Components/DocApp";
import DocSingleApp from "./Doc-Single-Components/DocSingleApp";
import Faqs from "./Faqs-Components/Faqs";
import ContactApp from "./Contact-Us-Components/ContactApp";
import PricingApp from "./Pricing-Components/PricingApp";
import FeatureApp from "./Feature-Components/FeatureApp";
import AddOnsApp from "./Add-Ons-Components/AddOnsApp";
import Support from "./Support-Components/Support";
import DocArchiveApp from "./Doc-Archive-Components/DocArchiveApp";
import SerachPageApp from "./Search-Page-Components/SerachPageApp";
import TOS from "./Terms-of-Services-Components/TOS";
import PrivacyPolicyApp from "./Privacy-Policy-Components/PrivacyPolicyApp";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./Redux/rootReducer";
import ScrollTop from "./ScrollTop-Component/ScrollTop";
import NotFound from "./404-Components/NotFound";
import Animation from "./Animation-Component/Animation";
import BlogPost from './BlogPosts-Components/BlogPost';
import BlogSingle from './BlogPosts-Components/BlogSingle';
import BlogCategory from "./BlogPosts-Components/BlogCategory";
 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
 
ReactDOM.render(
  <Provider store={store}>
    <div className="page-wrapper">
      <Router>
        <ScrollTop />
        <Header />
        <Animation />
        <main className="page-content">
          <Switch>
            <Route exact path="/" component={HomeApp} />
            <Route path="/features" component={FeatureApp} />
            <Route path="/pricing" component={PricingApp} />
            <Route path="/add-ons" component={AddOnsApp} />
            <Route path="/support" component={Support} />
            <Route exact path="/documentation" component={DocApp} />
            <Route path="/doc/:docId" component={DocSingleApp} />
            <Route path="/docs-category/:archiveId" component={DocArchiveApp} />
            <Route path="/faqs" component={Faqs} />
            <Route path="/contact" component={ContactApp} />
            <Route path="/changelog" component={Changelog} />
            <Route path="/privacy-policy" component={PrivacyPolicyApp} />
            <Route path="/terms-and-conditions" component={TOS} />
            <Route path="/search" component={SerachPageApp} />
            <Route path="/blog/:blogId" component={BlogSingle} />
            <Route path="/blog" component={BlogPost} />
            <Route path="/blog-category/:blogCId" component={BlogCategory} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  </Provider>,
  document.getElementById("root")
);
 