class AddHdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hd, :boolean, :default => false
  end
end
