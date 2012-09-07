class ExploreController < ApplicationController
  def index
    self.recent_searches
    self.recent_playlists
    self.recent_videos_added_to_playlists
    
    render :layout => "application", :template => "explore"
  end
  
  def recently_watched
    response  = []
    videos    = VideoView.limit(params[:limit]).order("created_at desc")
    
    videos.each do | video |
      response.push(video["video_id"])
    end

    render :json => response
  end
  
  def recent_searches
    @recent_searches    = []
    tmp_recent_searches = Searches.find(:all, :limit => 100, :order => "created_at DESC")
  
    tmp_recent_searches.each do | search |
      if search.search_type == 'just' || search.search_type == 'genre' || search.search_type == 'similar' || search.search_type == 'multi'
        if @recent_searches.select {|s| s[:what] == search.what.gsub("+"," ") && s[:who] == search.who }.length == 0
          @recent_searches << {
            :what => search.what.gsub("+"," "),
            :date => search.created_at,
            :type => search.search_type,
            :url  => "/#{search.search_type}/#{search.what.gsub(" ","+")}",
            :who  => search.who
          } 
        end
      end
    end
  
    return @recent_searches
  end

  def recent_playlists
    @recent_playlists     = []
    tmp_recent_playlists  = Playlist.find(:all, :limit => 100, :order => "created_at DESC")
  
    tmp_recent_playlists.each do | playlist |
      @recent_playlists << {
        :name       => playlist.playlist_name,
        :owner      => playlist.user.username,
        :date       => playlist.created_at,
        :url        => "/#{playlist.user.username}/playlist/#{playlist.playlist_name.gsub("/","%2F")}",
        :owner_url  => "/#{playlist.user.username}/playlists"
      } if playlist.user.present?
    end
  
    return @recent_playlists
  end

  def recent_videos_added_to_playlists
    @recent_videos_added_to_playlists     = []
    tmp_recent_videos_added_to_playlists  = Video.find(:all, :limit => 100, :order => "created_at DESC")
  
    tmp_recent_videos_added_to_playlists.each do | video |
      @recent_videos_added_to_playlists << {
        :title          => video.video_title,
        :playlist_name  => video.playlist.playlist_name,
        :owner          => video.playlist.user.username,
        :date           => video.created_at,
        :url            => "/video/#{video.video_id}",
        :owner_url      => "/#{video.playlist.user.username}/playlists",
        :playlist_url   => "/#{video.playlist.user.username}/playlist/#{video.playlist.playlist_name.gsub("/","%2F")}"
      } if video.playlist.user.present?
    end
  
    return @recent_videos_added_to_playlists
  end
  
  def get_random_playlists
    playlists = []
    
    playlists_records = Playlist.includes(:videos).where(:id => Video.connection.select_values("SELECT playlist_id FROM videos GROUP BY videos.playlist_id HAVING COUNT(*) > 5 ORDER BY random()")).limit(params[:limit])
    
    playlists_records.each do | playlist |
      playlist_owner = User.find(playlist[:user_id])
      
      playlists << {
        :playlist_url   => "/#{playlist_owner[:username]}/playlist/#{playlist[:playlist_name]}",
        :playlist_name  => (playlist[:playlist_name] == "Favorites" ? "#{playlist_owner[:username]}'s Favorites" : playlist[:playlist_name])
      }
    end
    
    render :json => playlists
  end
end