# to register a new user:
#   method: POST
#   route:  /api/registrations?username=USERNAME_HERE&email=EMAIL_HERE&password=PASSWORD_HERE

class Api::RegistrationsController < ApplicationController
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

  private

  def ensure_json
    render :status => 406, :json => { :message => "The request must be json" } if request.format != :json
  end
end