module ApplicationHelper

  def search_options
    options = {}

    if request.path.index('/just/')
      options[:searchType] = 'just'
    elsif request.path.index('/similar/')
      options[:searchType] = 'similar'
    elsif request.path.index('/r/')
      options[:searchType] = 'subreddit'
      options[:subReddit]  = params[:subreddit]
    elsif request.path.index('/video/')
      options[:searchType] = 'video'
      options[:videoID]    = params[:video_id]
    end

    if params[:artist_band]
      params[:artist_band] = params[:artist_band].gsub('+',' ')
    end

    options[:search] = params[:artist_band]

    js_output(options)
  end

  def js_output(input)
    ActiveSupport::JSON.encode(input).html_safe
  end

end