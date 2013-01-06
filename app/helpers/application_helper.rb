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
end