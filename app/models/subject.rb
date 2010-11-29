require 'rexml/document'

class Subject < ActiveRecord::Base
  validates_uniqueness_of :code
  has_many :attachments, :as => :attachable

  def self.load_from_xml
    REXML::Document.new(File.new("public/materias.xml"))
  end

end
