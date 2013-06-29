ENV["DEVELOPMENT_LASTFM_API_KEY"] = "2e62e5b28a2187c3df17c39490510316"
ENV["DEVELOPMENT_LASTFM_SECRET"]  = "8eb1258d3ed854c0365061d06d7cfa9e"

Rockstar.lastfm = { :api_key => ENV["#{Rails.env.upcase}_LASTFM_API_KEY"], :api_secret => ENV["#{Rails.env.upcase}_LASTFM_SECRET"] }