class RemoveMusicTastesFromUser < ActiveRecord::Migration
  def up
    remove_column :users, :music_tastes
  end

  def down
    add_column :users, :music_tastes, :text
  end
end
