require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(:default, Rails.env) if defined?(Bundler)

module Tubalr
  class Application < Rails::Application
    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    config.assets.precompile += %w( *.css *.js )
    config.assets.enabled = true
    config.assets.paths << "#{Rails.root}/vendor/assets/fonts"
  end
end
