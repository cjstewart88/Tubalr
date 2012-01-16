class StatsController < ApplicationController
  def index
    self.overall_stats
    self.weekly_stats
    self.recent_searches
    self.recent_favorites
    
    render :layout => "application", :template => "stats"
  end
  
  def overall_stats
    @overall_stats = []
    
    @overall_stats << ["Searchs"   ,    Searches.count]
    @overall_stats << ["Favorites" ,   Favorites.count]
    @overall_stats << ["Users"     ,        User.count]
  end
  
  def weekly_stats
    @weekly_stats = []
    
    @weekly_stats << ["Searches"  ,     Searches.where("created_at >= ?", Date.today-7).count]
    @weekly_stats << ["Favorites" ,    Favorites.where("created_at >= ?", Date.today-7).count]
    @weekly_stats << ["Users"     ,         User.where("created_at >= ?", Date.today-7).count]
    
    top_weekly_searches = Searches.where("created_at >= ?", Date.today-7).group("what").count
    top_weekly_searches.delete("Enter Artist or Band Here")
    @top_weekly_searches = top_weekly_searches.sort_by{ |k, v| -v }[0...5] 
  end
  
  def recent_searches
    @recent_searches    = []
    tmp_recent_searches = Searches.find(:all, :limit => 100, :order => "created_at DESC")
    
    tmp_recent_searches.each do | search |
      if search.search_type != 'favorites'
        if @recent_searches.select {|s| s[:what] == search.what.gsub("+"," ") && s[:who] == search.who }.length == 0
          @recent_searches << {
            :what => search.what.gsub("+"," "),
            :date => search.created_at.strftime("%D"),
            :type => search.search_type,
            :url  => "/#{search.search_type}/#{search.what.gsub(" ","+")}",
            :who  => search.who
          }
        end
      end
    end
    
    return @recent_searches
  end
  
  def recent_favorites
    @recent_favorites    = []
    tmp_recent_favorites = Favorites.find(:all, :limit => 100, :order => "created_at DESC")
    
    tmp_recent_favorites.each do | favorite |      
      tmp_user = User.where(["id = ?", favorite.user_id]).first()
      
      if !tmp_user.nil?
        @recent_favorites << {
          :what => favorite.video_title,
          :date => favorite.created_at.strftime("%D"),
          :url  => "/#{tmp_user.username.gsub(" ","%20")}/favorites",
          :who  => User.where(["id = ?", favorite.user_id]).first().username
        }
      end
    end
    
    return @recent_favorites
  end  
end