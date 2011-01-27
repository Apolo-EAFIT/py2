class User < ActiveRecord::Base
  has_many :attachments, :as => :attachable
  
  
  def self.random_users(lim=16)
      if Rails.env == "development" # use SQLite
        User.find(:all, { :order => "RANDOM()", :limit => lim, :include => :avatar})
      else                        # use MySQL
        User.find(:all, { :order => "RAND()", :limit => lim, :include => :avatar})
      end
    end
  
  
end
