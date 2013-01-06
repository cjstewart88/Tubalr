class RanameMd5HashToMd5Email < ActiveRecord::Migration
  def self.up
    rename_column :users, :md5_hash, :md5_email
  end

  def down
  end
end
