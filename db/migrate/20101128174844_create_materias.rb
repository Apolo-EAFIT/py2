class CreateMaterias < ActiveRecord::Migration
  def self.up
    create_table :subjects do |t|
      t.string :name
      t.string :code
      t.string :program
      t.integer :credits
      t.integer :umes
      t.string :description
      t.string :professor
      t.string :homepage

      t.timestamps
    end
  end

  def self.down
    drop_table :subjects
  end
end
