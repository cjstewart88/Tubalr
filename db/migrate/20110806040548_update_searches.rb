class UpdateSearches < ActiveRecord::Migration
  def self.up
    add_column :searches, :search_type, :string
  end

  def self.down
    remove_column :searches, :search_type
  end
end