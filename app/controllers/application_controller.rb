class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def index
    render :layout => "application", :action => "index"
  end
  
  def player
    render "player", :layout => false
  end
end
