class User < ActiveRecord::Base
  has_many :playlists, :order => "lower(playlist_name) ASC"
  has_many :banned_videos
  
  validates_presence_of   :username
  validates_uniqueness_of :username, :case_sensitive => false

  acts_as_taggable
  acts_as_taggable_on :favorite_genres
    
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  attr_accessor :login

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :username, :background, :password, :password_confirmation, :remember_me, :login, :md5_hash
  
  def self.find_for_database_authentication(warden_conditions)
     conditions = warden_conditions.dup
     login = conditions.delete(:login)
     where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
   end
end
