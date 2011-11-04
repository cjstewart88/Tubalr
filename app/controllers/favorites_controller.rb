class FavoritesController < ApplicationController
  def init
    @user_id = params[:user_id]

    render :layout => "application", :template => "index"
  end
end
