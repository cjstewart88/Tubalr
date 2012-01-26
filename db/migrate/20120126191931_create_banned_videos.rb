class CreateBannedVideos < ActiveRecord::Migration
  def change
    create_table :banned_videos do |t|
      t.integer :user_id
      t.string :video_id
      
      t.timestamps
    end
  end
end
