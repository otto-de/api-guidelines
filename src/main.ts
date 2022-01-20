/* eslint-disable import/no-extraneous-dependencies */
// This is used to run the app locally
// It uses defautls from portal common
import "vue";
import "vuex";
import "vue-router";

import { createDefaultApp } from "@otto-ec/ottoapi-portal-common";
import reference from "@Guidelines/index";
// TODO: @tino-prahl das muss anders :)
import searchModule from "@Common/store/search/module";

/** This is used to add missing "/" route to the dev app" */
reference.routes = [...reference.routes, { path: "/", name: "home", redirect: "/guidelines" }];

createDefaultApp({ modules: [reference, searchModule] });
