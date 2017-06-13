defmodule Osame.Country do
  use Osame.Web, :model

  schema "countries" do
    field :name, :string
    field :image_url, :string

    field :users_count, :integer

    field :elo, :float
    field :wins_count, :integer
    field :losses_count, :integer

    has_many :users, Osame.User

    timestamps
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :image_url])
    |> validate_required([:name, :image_url])
  end
end
