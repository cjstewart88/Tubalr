class StatsController < ApplicationController
  def index
    self.overall_stats
    self.past_7_days_stats
    self.today_stats
    
    render :layout => "application", :template => "stats"
  end
  
  def overall_stats
    @overall_stats = []
    
    @overall_stats << ["searches made"              ,   Searches.count]
    @overall_stats << ["videos watched in full"     ,  VideoView.count]
    @overall_stats << ["playlists created"          ,   Playlist.count]
    @overall_stats << ["videos added to playlists"  ,      Video.count]
    @overall_stats << ["users registered"           ,       User.count]
  end
  
  def past_7_days_stats
    @past_7_days_stats = []
    
    @past_7_days_stats << ["searches made"              ,   Searches.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["videos watched in full"     ,  VideoView.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["playlists created"          ,   Playlist.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["videos added to playlists"  ,      Video.where("created_at >= ?", Date.today-7).count]
    @past_7_days_stats << ["users registered"           ,       User.where("created_at >= ?", Date.today-7).count]
  end
  
  def today_stats
    @today_stats = []
    
    @today_stats << ["searches made"              ,  Searches.where("created_at >= ?", Date.today).count]
    @today_stats << ["videos watched in full"     , VideoView.where("created_at >= ?", Date.today).count]
    @today_stats << ["playlists created"          ,  Playlist.where("created_at >= ?", Date.today).count]
    @today_stats << ["videos added to playlists"  ,     Video.where("created_at >= ?", Date.today).count]
    @today_stats << ["users registered"           ,      User.where("created_at >= ?", Date.today).count]
  end
end