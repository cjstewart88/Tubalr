class Event < ActiveRecord::Base
  belongs_to :user
  default_scope order('created_at DESC')

  attr_accessible :event, :query, :playlist_name, :playlist_owner, :video_id, :video_title
end
