class Api::SessionsController < Api::BaseController
  before_filter :ensure_json, :only => :create
  skip_before_filter :verify_authenticity_token
  respond_to :json

  def create
    email_or_username = params[:email_or_username]
    password          = params[:password]

    if email_or_username.nil? or password.nil?
      render :status => 400, :json => { :message => "The request must contain the user email/username and password." }
      return
    end

    @user = User.where('email = :email_or_username OR username = :email_or_username', { email_or_username: email_or_username }).first

    if @user.nil?
      logger.info("User #{email_or_username} failed signin, user cannot be found.")
      render :status => 401, :json => { :message => "Invalid email/username or passoword." }
      return
    end

    @user.ensure_authentication_token!

    if not @user.valid_password?(password)
      logger.info("User #{email_or_username} failed signin, password \"#{password}\" is invalid")
      render :status => 401, :json => { :message => "Invalid email/username or password." }
    else
      render :status => 200, :json => {
        :id               => @user.id,
        :token            => @user.authentication_token,
        :username         => @user.username,
        :email            => @user.email,
        :favorite_genres  => @user.favorite_genres.collect{ | g | g.name },
        :playlists        => get_user_playlists,
        :banned_videos    => @user.banned_videos.map(&:video_id)
      }
    end
  end

  def destroy
    @user = User.find_by_authentication_token(params[:id])

    if @user.nil?
      logger.info("Token not found.")
      render :status => 404, :json => { :message => "Invalid token." }
    else
      @user.reset_authentication_token!
      render :status => 200, :json => { :id => @user.id, :token => params[:id] }
    end
  end
end