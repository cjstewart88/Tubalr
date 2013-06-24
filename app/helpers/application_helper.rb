module ApplicationHelper
  def search_options
    options = {}

    if @playlist_name
      options[:searchType]          = array_or_string_for_javascript('customPlaylist')
      options[:customPlaylistOwner] = array_or_string_for_javascript(url_encode(escape_javascript(@username)))
      options[:customPlaylistName]  = array_or_string_for_javascript(url_encode(escape_javascript(@playlist_name)))
      options[:persistentSorting]   = @is_playlist_owner
    elsif @dj
      options[:searchType]  = array_or_string_for_javascript('dj')
      options[:djUsername]  = array_or_string_for_javascript(@dj)
      options[:djListener]  = array_or_string_for_javascript((user_signed_in? ? dj_username : 'guest' ))
    elsif request.path.index('/just/')
      options[:searchType] = array_or_string_for_javascript('just')
    elsif request.path.index('/similar/')
      options[:searchType] = array_or_string_for_javascript('similar')
    elsif request.path.index('/r/')
      options[:searchType] = array_or_string_for_javascript('subreddit')
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

  def dj_username
    current_user.username.delete("^a-zA-Z0-9").downcase
  end

  def clean_up_link(link)
    link = link.sub(/\/just\/|.*playlist\//, "")
    URI.unescape(link)
  end

end