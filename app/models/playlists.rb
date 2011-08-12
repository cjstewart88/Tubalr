class Playlists < ActiveRecord::Base
  has_many :videos
  
  def self.videos(playlist_id)
    return Videos.where(["playlist_id = ?",playlist_id])
  end
end
