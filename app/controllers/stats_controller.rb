class StatsController < ApplicationController
  def index
    self.overall_stats
    self.past_7_days_stats
    self.today_stats
    self.recent_searches
    self.recent_playlists
    
    render :layout => "application", :template => "stats"
  end
  
  def overall_stats
    @overall_stats = []
    
    @overall_stats << ["Searchs Made"               ,   Searches.count]
    @overall_stats << ["Playlists Created"          ,   Playlist.count]
    @overall_stats << ["Videos Added to Playlists"  ,      Video.count]
    @overall_stats << ["Users Registered"           ,       User.count]
  end
  
  def past_7_days_stats
    @past_7_days_stats = []
    
    @past_7_days_stats << ["Searches Made"              ,   Searches.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["Playlists Created"          ,   Playlist.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["Videos Added to Playlists"  ,      Video.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["Users Registered"           ,       User.where("created_at >= ?", Date.today-7).count]
  end
  
  def today_stats
    @today_stats = []
    
    @today_stats << ["Searches Made"              ,  Searches.where("created_at >= ?", Date.today).count]
    @today_stats << ["Playlists Created"          ,  Playlist.where("created_at >= ?", Date.today).count]
    @today_stats << ["Videos Added to Playlists"  ,     Video.where("created_at >= ?", Date.today).count]
    @today_stats << ["Users Registered"           ,      User.where("created_at >= ?", Date.today).count]
  end
  
  def recent_searches
    @recent_searches    = []
    tmp_recent_searches = Searches.find(:all, :limit => 100, :order => "created_at DESC")
    
    tmp_recent_searches.each do | search |
      if search.search_type == 'just' || search.search_type == 'genre' || search.search_type == 'similar'
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
        :name   => playlist.playlist_name,
        :owner  => playlist.user.username,
        :date   => playlist.created_at,
        :url  => "/#{playlist.user.username}/playlist/#{playlist.playlist_name.gsub(" ","+")}"
      } if playlist.user.username.present?
    end
    
    return @recent_playlists
  end
end