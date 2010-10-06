# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_py2_session',
  :secret      => '552ed3ebe747466f3c57e0cba987e3c3d887a75689d3c00c6fe62d89d23109f2d4caacdaf842ab5347b30df45a8f1a8ce983571a5d28b631e5154b9a0acf49fe'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
