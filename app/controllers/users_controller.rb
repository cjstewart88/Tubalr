class UsersController < ApplicationController

  def index
    @user = User.where(:username =>  params[:username]).first
    
    @profile_owner = user_signed_in? && @user && @user.username == current_user.username

    render :layout => "application", :template => "profile"
  end

end