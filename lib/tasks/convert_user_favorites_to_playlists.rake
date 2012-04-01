namespace :db  do
  desc 'Convert user favorites into favorites playlist for each user that has favorites.'
  task :convert_user_favorites_to_playlists => :environment do
    User.all.each do | user |
      user_favorites = Favorites.where(:user_id => user.id)
      
      if user_favorites.count != 0
        favorites_playlist = user.playlists.create(:playlist_name => "Favorites")
        
        user_favorites.each do | favorite |
          favorites_playlist.videos.create(:video_title => favorite.video_title, :video_id => favorite.video_id)
        end
      end
    end
  end
end