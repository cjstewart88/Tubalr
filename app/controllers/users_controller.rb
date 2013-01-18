class UsersController < ApplicationController
  def profile
    @user = User.where(:username =>  params[:username]).first

    @profile_owner = user_signed_in? && @user && @user.username == current_user.username
  end

  def list
    @users = User.paginate(:page => params[:page]).order('playlists_count DESC')
  end
end