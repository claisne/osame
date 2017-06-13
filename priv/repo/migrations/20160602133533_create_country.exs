defmodule Osame.Repo.Migrations.CreateCountry do
  use Ecto.Migration

  def change do
    create table(:countries) do
      add :name, :string, null: false
      add :image_url, :string, null: false

      add :users_count, :integer, default: 0, null: false

      add :elo, :float, null: false, default: 1000.0
      add :wins_count, :integer, default: 0, null: false
      add :losses_count, :integer, default: 0, null: false


      timestamps
    end

    create unique_index :countries, [:name]
    create unique_index :countries, [:image_url]
  end
end
