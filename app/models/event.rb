class Event < ActiveRecord::Base
  belongs_to :user

  attr_accessible :event, :query, :playlist_name, :playlist_owner, :video_id, :video_title
end
