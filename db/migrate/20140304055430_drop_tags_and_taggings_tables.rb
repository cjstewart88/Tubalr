class DropTagsAndTaggingsTables < ActiveRecord::Migration
  def up
    drop_table :tags
    drop_table :taggings
  end
end
