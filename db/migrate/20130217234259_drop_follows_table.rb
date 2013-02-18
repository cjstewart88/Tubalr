class DropFollowsTable < ActiveRecord::Migration
  def up
    drop_table :follows
  end

  def down
  end
end
