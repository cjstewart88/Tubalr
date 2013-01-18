class ApiController < ApplicationController
  def library
    render :json => {
      :top_genres => TOP_GENRES,
      :genres     => GENRES,
      :reddit     => REDDIT
    }
  end
end