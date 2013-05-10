class CreateWatchedVideos < ActiveRecord::Migration
  def change
    create_table :watched_videos do |t|
      t.string :video_id
      t.string :video_title
      t.integer :user_id
      t.string :user_agent

      t.timestamps
    end
  end
end
