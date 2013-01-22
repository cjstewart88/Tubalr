class Api::RegistrationsController < Api::BaseController
  before_filter :ensure_json
  respond_to :json

  def create
    params[:md5_email] = Digest::MD5.hexdigest(params[:email])

    user = User.new(params)
    user.ensure_authentication_token!

    if user.save
      render :json => user.as_json["user"].merge(:auth_token => user.authentication_token), :status => 201
      return
    else
      warden.custom_failure!
      render :json => user.errors, :status => 422
    end
  end
end