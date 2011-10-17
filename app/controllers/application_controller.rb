class ApplicationController < ActionController::Base
  #before_filter :ensure_domain

  protect_from_forgery
  
  def index
    render :layout => "application", :template => "index"
  end
  
  def player
    Searches.create({  
      :search_type => params[:search_type],
      :what => params[:search],
      :who  => request.remote_ip
    })
    
    render :template => "player", :layout => false
  end
  
  def ensure_domain
    if Rails.env.production? && request.url != "http://www.tubalr.com"
      redirect_to "http://www.tubalr.com"
    end
  end
end
