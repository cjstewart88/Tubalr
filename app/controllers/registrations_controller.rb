class RegistrationsController < Devise::RegistrationsController

  before_filter :authenticate_user!, :only => [:update]

  def sign_up(resource_name, resource)
    sign_in(resource_name, resource)
  end

  def update
    # required for settings form to submit when password is left blank
    if params[:user][:password].blank?
      params[:user].delete("password")
      params[:user].delete("password_confirmation")
    end

    @user = User.find(current_user.id)

    params[:user][:md5_email] = Digest::MD5.hexdigest(params[:user][:email])
    params[:user][:hd]        = (params[:user][:hd] == "true" ? true : false)
    params[:user][:resume_last_playlist] = (params[:user][:resume_last_playlist] == "true" ? true : false)

    if @user.update_attributes(params[:user])
      set_flash_message :notice, :updated
      # Sign in the user bypassing validation in case his password changed
      sign_in @user, :bypass => true
      redirect_to after_update_path_for(@user)
    else
      render "edit"
    end
  end

end
