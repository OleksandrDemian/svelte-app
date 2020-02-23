const SVELTE_REPO = "sveltejs/template";
const SAPPER_REPO = "sveltejs/sapper-template#rollup";

const SVELTE_REPO_WEBPACK = "sveltejs/template-webpack";
const SAPPER_REPO_WEBPACK = "sveltejs/sapper-template#webpack";

const getRepo = ({ bundler, isSapper }) => {
    if(isSapper){
        if(bundler == "rollup") return SAPPER_REPO;
        if(bundler == "webpack") return SAPPER_REPO_WEBPACK;
    } else {
        if(bundler == "rollup") return SVELTE_REPO;
        if(bundler == "webpack") return SVELTE_REPO_WEBPACK;
    }

    throw "Cannot find repo for bundler: " + bundler + ", isSapper: " + isSapper;
}

module.exports = {
    SVELTE_REPO,
    SAPPER_REPO,
    SVELTE_REPO_WEBPACK,
    SAPPER_REPO_WEBPACK,
    getRepo
}