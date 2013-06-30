class LastfmController < ApplicationController
  before_filter :authenticate_user!

  def grant_access
    begin
      token = params[:token]

      rockstar    = Rockstar::Auth.new
      session_key = rockstar.session(token).key

      current_user.lastfm_session_key = session_key
      current_user.save

      flash[:notice] = "Last.fm access has been granted!"
    rescue => e
      flash[:notice] = "Hmm, something went wrong, try again."
    ensure
      redirect_to "/users/edit"
    end
  end

  def revoke_access
    current_user.lastfm_session_key = nil
    current_user.save

    flash[:notice] = "Last.fm access has been removed!"

    redirect_to "/users/edit"
  end

  def scrobble
    with_exception_handling do
      Rockstar::Track.scrobble(
        :session_key  => current_user.lastfm_session_key,
        :artist       => extract_artist(params[:video_title]),
        :track        => extract_track(params[:video_title]),
        :time         => Time.now
      )
    end
  end

  def update_now_playing
    with_exception_handling do
      Rockstar::Track.updateNowPlaying(
        :session_key  => current_user.lastfm_session_key,
        :artist       => extract_artist(params[:video_title]),
        :track        => extract_track(params[:video_title]),
        :duration     => params[:video_duration]
      )
    end
  end

  def with_exception_handling
    if extract_artist(params[:video_title]).nil? || extract_track(params[:video_title]).nil?
      render :json => { :success => false }
    else
      yield

      render :json => { :success => true }
    end
  rescue BadSessionError => e
    # Handle this ... remove the users lastfm_session_key because its invalid and we don't want to continue trying to scrobble
    # if it will continue to fail
    current_user.lastfm_session_key = nil
    current_user.save

    render :json => { :success => false, :message => "Your Last.fm account has been disconnected, you're no longer scrobbling. Visit your setting to reconnect it." }
  rescue UnavailableError => e
    # Last.fm is down... not much we can do here
    render :json => { :success => false, :message => "Last.FM appears to be down right now, sorry that scrobble didn't make it through." }
  rescue => e
    # Who knows what went wrong, more than likely invalid track or artist
    render :json => { :success => false }
  end

  def extract_artist(video_title)
    video_title.split('-')[0] || nil
  end

  def extract_track(video_title)
    video_title.split('-')[1] || nil
  end
end
