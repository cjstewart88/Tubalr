class Video < ActiveRecord::Base
  belongs_to :playlist

  before_create :init_track_number

  def init_track_number
    self.track_number = self.playlist.videos.count
  end
end
