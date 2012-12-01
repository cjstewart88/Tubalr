class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :videos, :order => "track_number ASC"

  def reorder(video, track_number)
    if track_number < 0
      track_number = 0
    end
    if track_number > (videos.count - 1)
      track_number = (videos.count - 1)
    end
    video.update_attributes(track_number: track_number)
    videos_to_order = videos - [video]
    offset = 0
    videos_to_order.each_with_index do |other, i|
      if i == track_number
        offset = 1
      end
      other.update_attributes(track_number: i + offset)
    end
  end

  def reorder_tracks(tracks)

    tracks.each do |item|
      reorder(Video.find_by_video_id(item[:videoID]), item[:track_number])
    end
  end
end
