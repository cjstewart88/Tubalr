# Params to pass:
#
# {
#   user_id:        integer,  REQUIRED must be the user_id of the person triggering the event
#   event:          string,   REQUIRED can be 'watchedVideo', 'just', 'similar', 'genre', 'dj', 'reddit', or 'customPlaylist'
#   query:          string,   required IF event IS 'just', 'similar', 'genre', 'dj', 'reddit', or 'customPlaylist'
#   playlist_name:  string,   required ony IF event IS 'customPlaylist'
#   playlist_owner: string,   required ony IF event IS 'customPlaylist'
#   video_id:       string,   required ony IF event IS 'watchedVideo'
#   video_title:    string    required ony IF event IS 'watchedVideo'
# }
#
# Examples of creating params
#
# Watched Video - Only report videos watched in full, meaning it reached the end of the video
# {
#   event:        'watchedVideo',
#   video_id:     'jk39ke4j6c',
#   video_title:  'Band of Horses - Infinite Arms'
# }
#
# Custom Playlist
# {
#   event:          'customPlaylist',
#   playlist_name:  'Random Indie Jams',
#   playlist_owner: 'cody'
# }
#
# Similar Search
# {
#   event:  'similar',
#   query:  'My Morning Jacket'
# }
#
# Reddit Search
# {
#   event:  'reddit',
#   query:  '/r/metal'
# }

class EventsController < ApplicationController
  before_filter :validate_current_user

  def create
    event = JSON.parse(params[:event])
    current_user.events.create(event)
    head 201
  end

  private

  def validate_current_user
    head 403 and return unless user_signed_in?
  end
end