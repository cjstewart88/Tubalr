class StatsController < ApplicationController
  def recent_searches
    @recent_searches    = []
    tmp_recent_searches = Searches.find(:all, :limit => 200, :order => "created_at DESC")
    
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
    
    render :layout => "application", :template => "stats"
  end
end