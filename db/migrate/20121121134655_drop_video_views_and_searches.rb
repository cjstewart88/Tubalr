class DropVideoViewsAndSearches < ActiveRecord::Migration
  def up
    drop_table :video_views if self.table_exists?(:video_views)
    drop_table :searches if self.table_exists?(:searches)
  end
end