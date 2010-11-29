class Attachment < ActiveRecord::Base
  include Common
  
  belongs_to :attachable, :polymorphic => true
  
  has_attached_file :source,
                    :url  => "/uploads/attachments/:id/:style-:basename.:extension",
                    :path => ":rails_root/public//uploads/attachments/:id/:style-:basename.:extension"
  
  validates_attachment_presence :source
  validates_attachment_size :source, :less_than => 10.megabytes
  
  def check_trusted_domain
    options.domains.any? do |domain|
      request.referer =~ create_escaped_regexp(domain)
    end
  end
    
  def is_image?
    %w(png bmp jpg jpeg gif).any? do |ext|
      source_file_name.downcase =~ create_escaped_regexp(ext)
    end
  end
  
  def extension
    source_file_name.split(".").last
  end
  
end
