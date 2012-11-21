class ApplicationController < ActionController::Base
  protect_from_forgery
    
  before_filter :ensure_domain

  APP_DOMAIN = 'www.tubalr.com'

  def ensure_domain
    if Rails.env.production? && request.env['HTTP_HOST'] != APP_DOMAIN
      redirect_to "http://#{APP_DOMAIN}#{request.fullpath}", :status => 301
    end
  end
  
  def index
    render :layout => "application", :template => "index"
  end
end