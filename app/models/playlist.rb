class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :videos, :order => "track_number ASC", :dependent => :destroy

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

  def reorder_tracks(sorted_video_ids)
    # Load all the videos from the database at once (but only the required fields)
    # Store them in a hash for fast in-memory lookup.
    videos_cache = {}.tap do |vc|
      videos.select([:id, :video_id, :track_number]).each { |v| vc[v[:video_id]] = v }
    end

    # Iterate over list of video_ids, assigning a new track_number to each
    current_index = 0
    sorted_video_ids.each do |video_id|
      next unless video = videos_cache[video_id]
      video.update_attribute(:track_number, current_index)
      current_index += 1

      videos_cache.delete(video_id)
    end

    # For any remaining videos, assign them at the end of the list.
    # This should never be reached, but catches potential cases where
    # the frontend may not have known about all playlist videos.
    videos_cache.each do |video_id, video|
      video.update_attribute(:track_number, current_index)
      current_index += 1
    end
  end

end
