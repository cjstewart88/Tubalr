class LastfmController < ApplicationController
  before_filter :authenticate_user!

  def grant_access
    token = params[:token]

    rockstar    = Rockstar::Auth.new
    session_key = rockstar.session(token).key

    current_user.lastfm_session_key = session_key
    current_user.save

    flash[:notice] = "Last.fm access has been granted!"

    redirect_to "/users/edit"
  end

  def revoke_access
    current_user.lastfm_session_key = nil
    current_user.save

    flash[:notice] = "Last.fm access has been removed!"

    redirect_to "/users/edit"
  end

  def scrobble
    with_exception_handeling do
      Rockstar::Track.scrobble(
        :session_key  => current_user.lastfm_session_key,
        :track        => params[:track]   || extract_track(params[:video_title]),
        :artist       => params[:artist]  || extract_artist(params[:video_title]),
        :time         => Time.new
      )
    end
  end

  def update_now_playing
    with_exception_handeling do
      Rockstar::Track.updateNowPlaying(
        :session_key  => current_user.lastfm_session_key,
        :track        => params[:track]   || extract_track(params[:video_title]),
        :artist       => params[:artist]  || extract_artist(params[:video_title])
      )
    end
  end

  def with_exception_handeling
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

    render :json => { :success => false, :lastfmDisconnected => true }
  rescue UnavailableError => e
    # Last.fm is down... not much we can do here
    render :json => { :success => false }
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
