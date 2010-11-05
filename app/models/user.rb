class User < ActiveRecord::Base
  has_many :attachments, :as => :attachable
end
