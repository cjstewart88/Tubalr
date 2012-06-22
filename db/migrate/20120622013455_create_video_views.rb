class CreateVideoViews < ActiveRecord::Migration
  def change
    create_table :video_views do |t|
      t.string :video_id
      t.string :who

      t.timestamps
    end
  end
end
