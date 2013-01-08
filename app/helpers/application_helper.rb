module ApplicationHelper
  def search_options
    options = {}

    if @playlist_name
      options[:searchType]          = array_or_string_for_javascript('customPlaylist')
      options[:customPlaylistOwner] = array_or_string_for_javascript(url_encode(escape_javascript(@username)))
      options[:customPlaylistName]  = array_or_string_for_javascript(url_encode(escape_javascript(@playlist_name)))
      options[:persistentSorting]   = @is_playlist_owner
    elsif request.path.index('/just/')
      options[:searchType] = array_or_string_for_javascript('just')
    elsif request.path.index('/similar/')
      options[:searchType] = array_or_string_for_javascript('similar')
    elsif request.path.index('/r/')
      options[:searchType] = array_or_string_for_javascript('reddit')
      options[:subReddit]  = array_or_string_for_javascript(params[:subreddit])
    elsif request.path.index('/video/')
      options[:searchType] = array_or_string_for_javascript('video')
      options[:videoID]    = array_or_string_for_javascript(params[:video_id])
    end

    if params[:artist_band]
      params[:artist_band] = params[:artist_band].gsub('+',' ')
    end

    options[:search] = array_or_string_for_javascript(escape_javascript(params[:artist_band]))

    options_for_javascript(options)
  end

  def show_user_bg
    # Show user background if user signed in and background not blank
    if @user && !(@user.background.blank?)
      "background: #4C4C4C url('#{@user.background}') no-repeat center center fixed;" 
    elsif user_signed_in? && !(current_user.background.blank?) 
      "background: #4C4C4C url('#{current_user.background}') no-repeat center center fixed;" 
    end  
  end

  def user_object
    @user || current_user 
  end

  def timeline_event(event)
    case event.event
    when 'watchedVideo' 
      "Watched #{link_to(event.video_title, '/video/'+event.video_id)}."
    when 'just'  
      "Searched for \"#{link_to(CGI::unescape(event.query), '/just/'+CGI.escape(event.query))}\"."
    when 'similar'
      "Searched for artist and bands similar to \"#{link_to(CGI::unescape(event.query), '/similar/'+CGI.escape(event.query))}\"."
    when 'reddit'
      "Enjoyed the top videos on #{link_to('/r/'+ event.query.sub('/r/',''), '/r/'+CGI.escape(event.query))}."
    when 'customPlaylist'
      if user_signed_in? && CGI::unescape(event.playlist_owner) == current_user.username
        "Jammed out to your own playlist, \"#{link_to(CGI::unescape(event.playlist_name), '/'+event.playlist_owner+'/playlist/'+event.playlist_name)}\"."
      elsif CGI::unescape(event.playlist_owner) == @user.username
        "Jammed out to his own playlist, \"#{link_to(CGI::unescape(event.playlist_name), '/'+event.playlist_owner+'/playlist/'+event.playlist_name)}\"."
      else 
        "Checked out #{link_to(CGI::unescape(event.playlist_owner), '/'+event.playlist_owner+'/profile')}'s playlist, \"#{link_to(CGI::unescape(event.playlist_name), '/'+event.playlist_owner+'/playlist/'+event.playlist_name)}\"."
      end
    when 'genre'
      "Enjoyed some #{link_to(event.query, '/just/'+CGI.escape(event.query))}."
    end.html_safe
  end
end