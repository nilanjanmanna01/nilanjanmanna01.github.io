# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll"

# Required by _config.yml's `plugins:` list. This site uses a hand-written
# custom theme, not a theme gem, so these are declared explicitly rather than
# pulled in transitively from a theme's gemspec.
gem "jekyll-feed"
gem "jekyll-seo-tag"
gem "jekyll-sitemap"
gem "jekyll-archives"
gem "jekyll-paginate"

gem "webrick", "~> 1.8" # required for `jekyll serve` on Ruby >= 3

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
