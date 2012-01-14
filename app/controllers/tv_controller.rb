class TvController < ApplicationController
  def index
    render :layout => "tv", :template => "tv/index"
  end
end