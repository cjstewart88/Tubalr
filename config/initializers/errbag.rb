Errbag.configure do
  ignore_environments 'development', 'test'
  auth_token ENV["#{Rails.env.upcase}_ERRBAG_AUTH_TOKEN"]
end