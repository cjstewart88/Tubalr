module ApplicationHelper
  def search_options
    options = {}

    if @playlist_name
      options[:searchType]          = array_or_string_for_javascript('customPlaylist')
      options[:customPlaylistOwner] = array_or_string_for_javascript(escape_javascript(@username))
      options[:customPlaylistName]  = array_or_string_for_javascript(url_encode(escape_javascript(@playlist_name)))
    elsif request.path.index('just')
      options[:searchType] = array_or_string_for_javascript('justSearch')
    elsif request.path.index('similar')
      options[:searchType] = array_or_string_for_javascript('similarSearch')
    elsif request.path.index('video')
      options[:searchType] = array_or_string_for_javascript('singleVideo')
      options[:videoID]    = array_or_string_for_javascript(params[:video_id])
    end

    options[:search] = array_or_string_for_javascript(escape_javascript(params[:artist_band]))

    options_for_javascript(options)
  end
end