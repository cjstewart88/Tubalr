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

end