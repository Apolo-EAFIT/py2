require 'rexml/document'
include REXML

class SubjectsController < BaseController
  def index
  end

  def list
    @materias = Subject.all
  end

  def show
    @materia = Subject.find(params[:id])
  end

  def load_from_ws
  end

  def load_from_xml
    begin
      @materias = Subject.load_from_xml

      @materias.elements.each("materias/materia") do |m|
        materia = Subject.find_by_code(m.attributes["codigo"])
        materia = Subject.new if(materia == nil)
        materia.name =        m.attributes["nombre"]
        materia.code =        m.attributes["codigo"]
        materia.credits =     m.attributes["creditos"]
        materia.umes =        m.attributes["umes"]
        materia.professor =   m.elements["profesor"].attributes["nombre"]
        materia.description = m.elements["descripcion"].text
        materia.homepage =    m.elements["homepage"].attributes["url"]
        materia.program =     m.elements["programa"].attributes["url"]

        materia.save
      end

    rescue Exception => e
      puts "Error ---- #{e.message} ------"
    end
    redirect_to :action => :list
  end
end
