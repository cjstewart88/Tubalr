class RegistrationsController < Devise::RegistrationsController
  before_filter :authenticate_user!, :only => [:update]

  def create
    resource_params["md5_email"] = Digest::MD5.hexdigest(resource_params["email"])

    build_resource

    if resource.save
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_up(resource_name, resource)
        respond_with resource, :location => after_sign_up_path_for(resource)
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
        expire_session_data_after_sign_in!
        respond_with resource, :location => after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      respond_with resource
    end
  end

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

    if params[:user][:favorite_genres]
      @user.favorite_genre_list = params[:user][:favorite_genres].join(',')
    else
      @user.favorite_genre_list = []
    end

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