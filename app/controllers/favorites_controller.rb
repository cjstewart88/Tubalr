class FavoritesController < ApplicationController
  def init
    @username = params[:username]

    render :layout => "application", :template => "index"
  end
end
