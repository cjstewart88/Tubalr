class DropFavoritesTable < ActiveRecord::Migration
  def up
    drop_table :favorites
  end
end
