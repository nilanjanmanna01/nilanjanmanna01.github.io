# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll"
gem "jekyll-theme-chirpy", "~> 7.6"

# These are already pulled in transitively as runtime dependencies of
# jekyll-theme-chirpy, but are listed explicitly here for clarity.
gem "jekyll-feed"
gem "jekyll-seo-tag"
gem "jekyll-sitemap"

gem "webrick", "~> 1.8" # required for `jekyll serve` on Ruby >= 3

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
