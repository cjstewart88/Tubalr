class DropVideoViewsAndSearches < ActiveRecord::Migration
  def up
    drop_table :video_views
    drop_table :searches
  end
end