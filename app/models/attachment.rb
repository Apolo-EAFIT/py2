class Attachment < ActiveRecord::Base
  belongs_to :attachable, :polymorphic => true
  has_attached_file :source,
                    :url  => "/uploads/attachments/:id/:style-:basename.:extension",
                    :path => ":rails_root/public//uploads/attachments/:id/:style-:basename.:extension"
  
  validates_attachment_presence :source
  validates_attachment_size :source, :less_than => 10.megabytes
end
