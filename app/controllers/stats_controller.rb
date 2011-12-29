class StatsController < ApplicationController
  def index
    self.general
    self.recent_searches
    self.recent_favorites
    render :layout => "application", :template => "stats"
  end
  
  def general
    @general = []
    
    @general << ["Searchs"  ,   Searches.count]
    @general << ["Favorites",  Favorites.count]
    @general << ["Users"    ,       User.count]
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
      @recent_favorites << {
        :what => favorite.video_title,
        :date => favorite.created_at.strftime("%D"),
        :url  => "/#{User.where(["id = ?", favorite.user_id]).first().username.gsub(" ","%20")}/favorites",
        :who  => User.where(["id = ?", favorite.user_id]).first().username
      }
    end
    
    return @recent_favorites
  end  
end