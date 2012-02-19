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
    
  def genres
    render :layout => "application", :template => "genres"
  end
  
  def users
    @users = []
    
    Favorites.group("user_id").count.each do | user_id, count |
      if count >= 10
        user = User.where("id = ?", user_id).first
        @users << {
          :username       => user[:username], 
          :music_tastes   => user[:music_tastes],
          :number_of_favs => count
        } if !user[:music_tastes].nil?
      end
    end  

    render :layout => "application", :template => "users"
  end
end