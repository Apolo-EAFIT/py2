class AddAttachmentsSourceToAttachment < ActiveRecord::Migration
  def self.up
    add_column :attachments, :source_file_name, :string
    add_column :attachments, :source_content_type, :string
    add_column :attachments, :source_file_size, :integer
    add_column :attachments, :source_updated_at, :datetime
  end

  def self.down
    remove_column :attachments, :source_file_name
    remove_column :attachments, :source_content_type
    remove_column :attachments, :source_file_size
    remove_column :attachments, :source_updated_at
  end
end
